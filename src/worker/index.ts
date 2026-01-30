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

  // For route-specific HTML pages: aggressively bypass cache
  if (c.req.method === "GET" && pathname !== "/" && ROUTES_WITH_HTML.includes(pathname)) {
    // Use Cache API to delete any cached version of this request
    const cache = caches.default;
    try {
      await cache.delete(c.req.raw);
    } catch (e) {
      // Ignore cache delete errors
    }
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
          // Aggressive cache bypass headers
          headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0");
          headers.set("Pragma", "no-cache");
          headers.set("Expires", "0");
          headers.set("Content-Type", "text/html; charset=utf-8");
          // Cloudflare-specific headers to prevent caching
          headers.set("CF-Cache-Status", "BYPASS");
          headers.set("CDN-Cache-Control", "no-store");
          // Add timestamp to make each response unique (changes cache key)
          headers.set("X-Response-Time", Date.now().toString());
          headers.set("X-Served-Route", pathname);
          headers.set("X-Worker-Executed", "true");
          // Vary header to ensure different cache keys for different requests
          headers.set("Vary", "Accept, Accept-Encoding, User-Agent");
          return new Response(html, { status: 200, headers });
        }
      }
    }
  }

  // Static files and / → serve from assets (SPA fallback for 404)
  return assets.fetch(c.req.raw);
});

export default app;
