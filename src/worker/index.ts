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
    const routeMarker = `(route: ${pathname})`;
    const pathsToTry = [pathname + "/index.html", pathname + "/"];
    const env = c.env as Env & { WORKER_PUBLIC_ORIGIN?: string };
    const originsToTry =
      env.WORKER_PUBLIC_ORIGIN && url.origin !== env.WORKER_PUBLIC_ORIGIN
        ? [url.origin, env.WORKER_PUBLIC_ORIGIN]
        : [url.origin];
    for (const base of originsToTry) {
      for (const p of pathsToTry) {
        const assetUrl = new URL(p, base);
        const assetRequest = new Request(assetUrl.toString(), { method: "GET", headers: { Accept: "text/html" } });
        const res = await assets.fetch(assetRequest);
        if (res.ok) {
          const html = await res.text();
          if (!html.includes(routeMarker)) continue;
          const headers = new Headers(res.headers);
          headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
          headers.set("Pragma", "no-cache");
          headers.set("Expires", "0");
          headers.set("Content-Type", "text/html; charset=utf-8");
          headers.set("X-Served-Route", pathname);
          headers.set("X-Worker-Executed", "true");
          return new Response(html, { status: 200, headers });
        }
      }
    }
  }

  // Static files and / → serve from assets (SPA fallback for 404)
  return assets.fetch(c.req.raw);
});

export default app;
