import { Hono } from "hono";

/** Paths that have their own index.html (serve them so "View Source" shows the correct page) */
const ROUTES_WITH_HTML = ["/about", "/cooperation", "/agentic-pay", "/blogs"];

const app = new Hono<{ Bindings: Env }>();

// API routes
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Serve route-specific index.html for these paths (avoid SPA fallback returning root index.html)
app.all("*", async (c) => {
  const url = new URL(c.req.url);
  // Normalize: strip trailing slash so "/about/" matches ROUTES_WITH_HTML
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const assets = (c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }).ASSETS;
  if (!assets) return c.notFound();

  if (c.req.method === "GET" && pathname !== "/" && ROUTES_WITH_HTML.includes(pathname)) {
    // Fetch pre-rendered index.html; base URL on incoming request so ASSETS binding resolves path (see CF docs)
    const pathsToTry = [pathname + "/index.html", pathname + "/"];
    for (const p of pathsToTry) {
      const assetUrl = new URL(p, c.req.url);
      const assetRequest = new Request(assetUrl, { method: "GET", headers: { Accept: "text/html" } });
      const res = await assets.fetch(assetRequest);
      if (res.ok) {
        const html = await res.text();
        const headers = new Headers(res.headers);
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        headers.set("Content-Type", "text/html; charset=utf-8");
        headers.set("X-Served-Route", pathname);
        return new Response(html, { status: 200, headers });
      }
    }
  }

  // Static files and / → serve from assets (SPA fallback for 404)
  return assets.fetch(c.req.raw);
});

export default app;
