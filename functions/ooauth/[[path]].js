export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace("/oauth/", "");

  if (path === "auth") {
    return Response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&state=${Date.now()}`,
      302
    );
  }

  if (path === "callback") {
    const code = url.searchParams.get("code");
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const result = await response.json();
    const body = `
      <script>
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: result.access_token, provider: "github" })}',
          "*"
        );
      </script>
    `;
    return new Response(body, { headers: { "content-type": "text/html;charset=UTF-8" } });
  }
  return new Response("Not found", { status: 404 });
}