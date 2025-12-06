export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace("/oauth/", "");

  // TRATAMENTO DE ERRO GLOBAL
  try {
    // 1. Iniciar Login
    if (path === "auth") {
      if (!env.GITHUB_CLIENT_ID) return new Response("Erro: GITHUB_CLIENT_ID não configurado na Cloudflare.", { status: 500 });
      
      return Response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&state=${Date.now()}`,
        302
      );
    }

    // 2. Callback (Volta do GitHub)
    if (path === "callback") {
      const code = url.searchParams.get("code");
      
      if (!code) return new Response("Erro: Nenhum código recebido do GitHub.", { status: 400 });

      // Troca o código pelo token
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "User-Agent": "Discursivas-Blog-Auth"
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const result = await response.json();

      // Se o GitHub devolveu erro (ex: chave errada)
      if (result.error) {
        return new Response(`Erro do GitHub: ${result.error_description || result.error}`, { status: 400 });
      }

      const token = result.access_token;
      const provider = "github";

      // Script que fecha a janela e loga
      const body = `
        <!DOCTYPE html>
        <html><body>
        <p>Autenticando... (Se esta tela não fechar, verifique o console)</p>
        <script>
          window.opener.postMessage(
            'authorization:${provider}:success:${JSON.stringify({
              token: "${token}",
              provider: "${provider}",
            })}',
            "*"
          );
          window.close();
        </script>
        </body></html>
      `;

      return new Response(body, {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    return new Response("Rota não encontrada: " + path, { status: 404 });

  } catch (err) {
    // Se o script quebrar, mostra o erro na tela branca
    return new Response(`ERRO CRÍTICO NO SCRIPT: ${err.message}`, { status: 500 });
  }
}