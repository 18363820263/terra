import { Hono } from "hono";

/** Paths that have their own index.html (serve them so "View Source" shows the correct page) */
const ROUTES_WITH_HTML = ["/about", "/cooperation", "/agentic-pay", "/blogs"];

const app = new Hono<{ Bindings: Env }>();

// API routes
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Serve route-specific index.html for these paths (avoid SPA fallback returning root index.html)
app.all("*", async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname;
  const assets = (c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }).ASSETS;
  if (!assets) return c.notFound();

  if (c.req.method === "GET" && ROUTES_WITH_HTML.includes(pathname)) {
    const assetUrl = new URL(pathname + "/index.html", c.req.url);
    const res = await assets.fetch(new Request(assetUrl));
    if (res.ok) return res;
  }

  // Static files and / → serve from assets (SPA fallback for 404)
  return assets.fetch(c.req.raw);
});

export default app;
