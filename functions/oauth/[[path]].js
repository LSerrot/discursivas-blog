export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace("/oauth/", "");

  try {
    // 1. Rota de Autorização (Vai pro GitHub)
    if (path === "auth") {
      const clientId = env.GITHUB_CLIENT_ID;
      if (!clientId) return new Response("ERRO: GITHUB_CLIENT_ID ausente.", { status: 500 });
      
      const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&state=${Date.now()}`;
      return Response.redirect(redirectUrl, 302);
    }

    // 2. Rota de Callback (Volta do GitHub)
    if (path === "callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("ERRO: Código não recebido do GitHub.", { status: 400 });

      // Troca o código pelo Token
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

      if (result.error) {
        return new Response(`ERRO GITHUB: ${result.error_description || result.error}`, { status: 400 });
      }

      const token = result.access_token;
      const provider = "github";
      
      // Prepara os dados para o Javascript injetado
      const messageData = JSON.stringify({ token: token, provider: provider });

      // HTML QUE VAI RODAR DENTRO DA JANELINHA
      const body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Autenticando...</title>
          <style>
            body { background: #111; color: #fff; font-family: sans-serif; padding: 20px; text-align: center; }
            button { background: #E07720; color: #fff; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px; font-size: 16px; margin-top: 20px; }
            .success { color: #4ade80; font-size: 1.2em; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="success">✅ Conectado ao GitHub!</div>
          <p>Enviando credenciais para o painel...</p>
          
          <button id="retryBtn" onclick="sendMsg()">CLIQUE AQUI SE NÃO FECHAR</button>

          <script>
            function sendMsg() {
              const provider = "${provider}";
              const data = ${messageData};
              
              // 1. Manda o "Oi" (Handshake)
              window.opener.postMessage("authorizing:" + provider, "*");
              
              // 2. Manda o Token (Success)
              window.opener.postMessage(
                "authorization:" + provider + ":success:" + JSON.stringify(data),
                "*"
              );
            }

            // Tenta enviar automaticamente assim que carrega
            window.onload = function() {
                sendMsg();
                // Tenta de novo a cada 1 segundo por segurança
                setInterval(sendMsg, 1000);
                
                // Fecha a janela após 3 segundos (dá tempo do postMessage rodar)
                setTimeout(() => { window.close() }, 3000);
            };
          </script>
        </body>
        </html>
      `;

      return new Response(body, {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    return new Response("Rota não encontrada: " + path, { status: 404 });

  } catch (err) {
    return new Response(`ERRO CRÍTICO DE SCRIPT: ${err.message}`, { status: 500 });
  }
}