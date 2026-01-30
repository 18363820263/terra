import { Hono } from "hono";
import { getSchemaForRoute } from "./schema";

/** Paths that have their own pre-rendered index.html for SEO */
const ROUTES_WITH_HTML = ["/about", "/cooperation", "/agentic-pay", "/blogs"];

/**
 * Static HTML content for SEO - embedded directly in Worker to bypass ASSETS caching issues
 * Includes all important h1, h2, h3 tags and content
 */
const STATIC_HTML_BY_ROUTE: Record<string, string> = {
  '/about': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">About TerraziPay</h1><p class="text-base md:text-lg text-gray-700 mb-4">TerraziPay is a fintech company headquartered in Hong Kong, focusing on stablecoin-based cross-border payment solutions. We provide next-generation global settlement and salary payment services for merchants worldwide.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2><p class="text-base md:text-lg text-gray-700 mb-4">TerraziPay supports multiple mainstream blockchain networks including Ethereum, TRON, BNB Chain, Solana, Polygon and Arbitrum. The annual transaction volume has exceeded 1 billion and continues to grow steadily.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Global Presence</h2><p class="text-base md:text-lg text-gray-700">We have established offices in Hong Kong, the United States, Malaysia and Mexico, and will continue to expand our global footprint to help more enterprises enjoy the efficiency and transparency of stablecoin payments.</p></section></main>',
  '/cooperation': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Business Cooperation & Partnership</h1><p class="text-base md:text-lg text-gray-700 mb-4">Get in touch with TerraziPay for business cooperation, payment integration, or long-term partnership opportunities. Our team will respond within 2 hours and provide 7×24 technical support.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2><p class="text-base md:text-lg text-gray-700 mb-4">Business cooperation email: <a href="mailto:payoffice@starbit.net.cn" class="text-blue-600 underline">payoffice@starbit.net.cn</a>, technical support email: <a href="mailto:support@starbit.net.cn" class="text-blue-600 underline">support@starbit.net.cn</a>.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Apply Now</h2><p class="text-base md:text-lg text-gray-700">Please fill in the online application form on this page. We will contact you as soon as possible and provide a tailored stablecoin payment solution for your business.</p></section></main>',
  '/agentic-pay': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Agentic Pay – Payment Layer for AI Agents</h1><p class="text-base md:text-lg text-gray-700 mb-4">Agentic Pay is TerraziPay\'s next-generation payment infrastructure for AI agents. It provides instant stablecoin settlement, atomic ledgers and full-chain traceability so that autonomous agents can safely send and receive payments.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Features</h2><p class="text-base md:text-lg text-gray-700 mb-4">With support for USDT and USDC on multiple blockchains, Agentic Pay enables pay-as-you-go pricing, micro-transactions and programmable settlement logic for complex multi-party AI workflows.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Get Started</h2><a href="/cooperation" class="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 text-white font-medium">Talk to us about Agentic Pay</a></section></main>',
  '/blogs': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">TerraziPay Blog – Stablecoin Payments, Blockchain & Agentic Economy</h1><p class="text-base md:text-lg text-gray-700 mb-4">Discover in-depth articles about stablecoin payment technology, blockchain infrastructure, and the emerging AI agent economy. We share practical guides, product updates and industry insights to help enterprises understand and apply on-chain payments.</p><h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Latest Articles</h2><p class="text-base md:text-lg text-gray-700">Browse our latest blog articles below, or follow TerraziPay to stay updated on cross-border stablecoin payments and Agentic Pay product progress.</p></section></main>',
};

const app = new Hono<{ Bindings: Env }>();

// API routes
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Main handler: Worker controls all routing
app.all("*", async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const assets = (c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }).ASSETS;
  if (!assets) return c.notFound();

  // Helper: create response with no-cache headers
  const createNoCacheResponse = (html: string, route: string, method?: string) => {
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
        ...(method ? { "X-Render-Method": method } : {}),
      },
    });
  };

  // For known routes: generate HTML directly in Worker (bypasses ASSETS caching issues)
  if (c.req.method === "GET" && pathname !== "/" && ROUTES_WITH_HTML.includes(pathname)) {
    // Get base HTML template from ASSETS (root index.html)
    const rootRequest = new Request(new URL("/index.html", url.origin).toString());
    const rootRes = await assets.fetch(rootRequest);
    
    if (rootRes.ok) {
      let html = await rootRes.text();
      
      // Get route-specific static content
      const staticContent = STATIC_HTML_BY_ROUTE[pathname];
      if (staticContent) {
        // Inject static HTML into #root
        html = html.replace(
          '<div id="root"></div>',
          `<div id="root">${staticContent}</div>`
        );
      }
      
      // Generate route-specific Schema.org data
      const schemas = getSchemaForRoute(pathname, 'en-US');
      const schemaScripts = schemas
        .map((schema) => `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`)
        .join('\n    ');
      
      // Replace schema placeholder with route-specific schemas
      html = html.replace(
        /<!-- Schema\.org structured data[^>]*-->[\s\S]*?(?=<script type="module")/,
        `<!-- Schema.org structured data (route: ${pathname}) -->\n    ${schemaScripts}\n    `
      );
      
      return createNoCacheResponse(html, pathname, "worker-generated");
    }
  }

  // For static assets (JS, CSS, images, etc.) and root path: serve from ASSETS
  const assetRes = await assets.fetch(c.req.raw);
  
  if (assetRes.ok) {
    return assetRes;
  }
  
  // For 404s on HTML pages: serve root index.html (SPA fallback)
  const accept = c.req.header("Accept") || "";
  if (assetRes.status === 404 && accept.includes("text/html")) {
    const rootRequest = new Request(new URL("/index.html", url.origin).toString());
    const rootRes = await assets.fetch(rootRequest);
    if (rootRes.ok) {
      const html = await rootRes.text();
      return createNoCacheResponse(html, "/ (spa-fallback)", "spa-fallback");
    }
  }

  return assetRes;
});

export default app;
