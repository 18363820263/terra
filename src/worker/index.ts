import { Hono } from "hono";

/** Paths that have their own pre-rendered index.html for SEO */
const ROUTES_WITH_HTML = ["/about", "/cooperation", "/agentic-pay", "/blogs"];

const app = new Hono<{ Bindings: Env }>();

// API routes
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Main handler: Worker controls all routing (SPA fallback is disabled in wrangler.json)
app.all("*", async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const assets = (c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }).ASSETS;
  if (!assets) return c.notFound();

  // Helper: create response with no-cache headers
  const createNoCacheResponse = (html: string, route: string, debug?: string) => {
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
        "CDN-Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Served-Route": route,
        "X-Worker-Executed": "true",
        ...(debug ? { "X-Debug": debug } : {}),
      },
    });
  };

  // For known routes: serve their pre-rendered index.html directly
  if (c.req.method === "GET" && pathname !== "/" && ROUTES_WITH_HTML.includes(pathname)) {
    const routeMarker = `(route: ${pathname})`;
    const debugInfo: string[] = [];
    
    // Try multiple URL formats to find the route-specific index.html
    const pathsToTry = [
      pathname + "/index.html",           // /about/index.html
      pathname + "/",                      // /about/
      pathname,                            // /about
    ];
    
    for (const tryPath of pathsToTry) {
      // Method 1: Use path-only URL (relative to origin)
      const assetUrl = new URL(tryPath, c.req.url).toString();
      const assetRequest = new Request(assetUrl);
      const res = await assets.fetch(assetRequest);
      const status = res.status;
      
      debugInfo.push(`${tryPath}:${status}`);
      
      if (res.ok) {
        const html = await res.text();
        const hasMarker = html.includes(routeMarker);
        debugInfo.push(`hasMarker:${hasMarker}`);
        
        if (hasMarker) {
          return createNoCacheResponse(html, pathname, debugInfo.join('|'));
        }
      }
    }
    
    // Fallback: serve root index.html (SPA mode)
    const rootRequest = new Request(new URL("/index.html", url.origin).toString(), { method: "GET" });
    const rootRes = await assets.fetch(rootRequest);
    if (rootRes.ok) {
      const html = await rootRes.text();
      return createNoCacheResponse(html, pathname + " (fallback)", debugInfo.join('|'));
    }
  }

  // For static assets (JS, CSS, images, etc.): serve directly from ASSETS
  const assetRes = await assets.fetch(c.req.raw);
  
  // If asset found, return it
  if (assetRes.ok) {
    return assetRes;
  }
  
  // For 404s on HTML pages: serve root index.html (SPA fallback)
  // This handles client-side routing for unknown paths
  const accept = c.req.header("Accept") || "";
  if (assetRes.status === 404 && accept.includes("text/html")) {
    const rootRequest = new Request(new URL("/index.html", url.origin).toString(), { method: "GET" });
    const rootRes = await assets.fetch(rootRequest);
    if (rootRes.ok) {
      const html = await rootRes.text();
      return createNoCacheResponse(html, "/ (spa-fallback)");
    }
  }

  // Return the original response (404 or other)
  return assetRes;
});

export default app;
