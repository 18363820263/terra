import { Hono } from "hono";
import { getSchemaForRoute } from "./schema";

/** Paths that have their own pre-rendered index.html for SEO */
const ROUTES_WITH_HTML = ["/about", "/cooperation", "/agentic-pay", "/blogs"];

/**
 * Static HTML content for SEO - embedded directly in Worker to bypass ASSETS caching issues
 * Full page content matching actual React components
 */
const STATIC_HTML_BY_ROUTE: Record<string, string> = {
  '/about': `<main class="flex flex-col items-center">
    <!-- Hero Banner -->
    <section class="relative w-full h-[320px] overflow-hidden">
      <img src="/assets/banner-2-BTcnDaqs.jpg" alt="About background" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center px-4 md:px-8 lg:px-[120px] pt-[120px]">
        <div class="w-full max-w-[1200px] flex flex-col items-center gap-6">
          <h1 class="text-white text-3xl md:text-4xl font-medium leading-tight text-center">About Us</h1>
          <div class="h-px w-full bg-white/20"></div>
          <div class="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span class="text-white/70 text-sm md:text-base font-light">Innovation</span>
            <span class="text-white/70 text-sm md:text-base font-light">Passion</span>
            <span class="text-white/70 text-sm md:text-base font-light">Professionalism</span>
            <span class="text-white/70 text-sm md:text-base font-light">Integrity</span>
            <span class="text-white/70 text-sm md:text-base font-light">Enterprise</span>
          </div>
        </div>
      </div>
    </section>
    <!-- Main Content Section -->
    <section class="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
      <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
        <div class="w-full lg:w-[680px] flex-shrink-0 relative">
          <img src="/assets/about-cover-BVD8fO_O.jpg" alt="TerraziPay Building" class="w-full h-full rounded-2xl object-cover" />
        </div>
        <div class="flex-1 flex flex-col gap-8 lg:gap-10">
          <div class="flex flex-col gap-3">
            <h3 class="text-gray-950 text-xl md:text-2xl font-medium leading-9">What is TerraziPay?</h3>
            <p class="text-gray-400 text-sm md:text-base font-light leading-6">TerraziPay, headquartered in Hong Kong, is a fintech company positioned with stablecoin payment solutions. We focus on providing next-generation cross-border payment and salary payment solutions based on stablecoins for merchants such as overseas cross-border e-commerce, trade, Web3 projects, digital entertainment/game overseas, and freelance platforms. We are targeting the trillion-dollar global cross-border B2B payment market and all future on-chain enterprise financial services.</p>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="text-gray-950 text-xl md:text-2xl font-medium leading-9">Blockchain Network Support</h3>
            <p class="text-gray-400 text-sm md:text-base font-light leading-6">You can choose mainstream blockchain networks to receive stablecoins according to your needs. Currently supporting ETH, TRON, BNB Chain (BSC), Solana, Polygon, Arbitrum, etc. More network options will be added in the future.</p>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="text-gray-950 text-xl md:text-2xl font-medium leading-9">Transaction Scale</h3>
            <p class="text-gray-400 text-sm md:text-base font-light leading-6">Up to now, TerraziPay has provided cross-border settlement services in emerging markets for global enterprise users. The platforms annual transaction volume has exceeded 1 billion, and it has been maintaining a steady upward trend. In the future, we look forward to accompanying you.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Stats Section -->
    <section class="w-full bg-gray-50 py-12 md:py-16">
      <div class="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          <div class="flex flex-col items-center gap-2"><div class="text-blue-600 text-3xl md:text-4xl font-medium">10,000,000+</div><div class="text-gray-400 text-sm">Daily Transactions</div></div>
          <div class="flex flex-col items-center gap-2"><div class="text-blue-600 text-3xl md:text-4xl font-medium">10,000+</div><div class="text-gray-400 text-sm">Merchants</div></div>
          <div class="flex flex-col items-center gap-2"><div class="text-blue-600 text-3xl md:text-4xl font-medium">1,000+</div><div class="text-gray-400 text-sm">Service Team</div></div>
          <div class="flex flex-col items-center gap-2"><div class="text-blue-600 text-3xl md:text-4xl font-medium">50+</div><div class="text-gray-400 text-sm">Global Coverage</div></div>
          <div class="flex flex-col items-center gap-2"><div class="text-blue-600 text-3xl md:text-4xl font-medium">4+</div><div class="text-gray-400 text-sm">Branches</div></div>
        </div>
      </div>
    </section>
    <!-- Core Advantages Section -->
    <section class="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
      <h2 class="text-3xl md:text-4xl font-medium text-gray-950 text-center mb-10">「 Core Advantages 」</h2>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
          <h3 class="text-gray-950 text-lg md:text-2xl font-medium text-center">Compliance & Security</h3>
          <p class="text-gray-400 text-sm md:text-base font-light text-center">Strictly follow global laws and regulations, adopt bank-level security measures to ensure user asset security.</p>
        </div>
        <div class="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
          <h3 class="text-gray-950 text-lg md:text-2xl font-medium text-center">Efficient & Stable</h3>
          <p class="text-gray-400 text-sm md:text-base font-light text-center">Adopt distributed architecture design, support high concurrent transactions, stable and reliable system, fast response speed.</p>
        </div>
        <div class="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
          <h3 class="text-gray-950 text-lg md:text-2xl font-medium text-center">Global Coverage</h3>
          <p class="text-gray-400 text-sm md:text-base font-light text-center">Serving more than 50 countries and regions, supporting multi-language and multi-currency transactions.</p>
        </div>
        <div class="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
          <h3 class="text-gray-950 text-lg md:text-2xl font-medium text-center">Zero Threshold Access</h3>
          <p class="text-gray-400 text-sm md:text-base font-light text-center">Provide simple and easy-to-use API interfaces and SDKs, enterprises can quickly access, reducing development costs.</p>
        </div>
        <div class="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
          <h3 class="text-gray-950 text-lg md:text-2xl font-medium text-center">Cost Clarity</h3>
          <p class="text-gray-400 text-sm md:text-base font-light text-center">Simple and transparent cost structure, no hidden costs.</p>
        </div>
        <div class="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
          <h3 class="text-gray-950 text-lg md:text-2xl font-medium text-center">Flexible Settlement</h3>
          <p class="text-gray-400 text-sm md:text-base font-light text-center">Supports D0 settlement (7*24 hours withdrawal at any time) and multi-chain selection.</p>
        </div>
      </div>
    </section>
    <!-- Vision & Mission Section -->
    <section class="w-full bg-gray-900 relative overflow-hidden">
      <img src="/assets/about-future-3qGrUzPX.png" alt="" class="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div class="relative max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-12 md:py-16 flex flex-col gap-8">
        <div class="flex flex-col gap-3">
          <h3 class="text-white text-base font-semibold">Vision:</h3>
          <p class="text-white/70 text-base font-light leading-6">To become the world's trusted and convenient stablecoin payment solution.</p>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="text-white text-base font-semibold">Mission:</h3>
          <p class="text-white/70 text-base font-light leading-6">Through blockchain technology, break the barriers of cross-border payments, providing faster, cheaper, and more transparent payment settlement services for enterprises and individuals than traditional financial systems.</p>
        </div>
      </div>
    </section>
    <!-- Global Layout Section -->
    <section class="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
      <h2 class="text-3xl md:text-4xl font-medium text-gray-950 text-center mb-12">「 Global Layout 」</h2>
      <div class="w-full flex flex-col lg:flex-row items-start gap-8">
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-2">
              <h3 class="text-gray-950 text-xl md:text-2xl font-medium">Hong Kong Headquarters</h3>
              <p class="text-gray-400 text-sm md:text-base font-light">International Finance Centre, 8 Finance Street, Central, Hong Kong SAR</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-2">
              <h3 class="text-gray-950 text-xl md:text-2xl font-medium">USA Branch</h3>
              <p class="text-gray-400 text-sm md:text-base font-light">New York Stock Exchange, 11 Wall Street, Manhattan, New York, USA</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-2">
              <h3 class="text-gray-950 text-xl md:text-2xl font-medium">Malaysia Branch</h3>
              <p class="text-gray-400 text-sm md:text-base font-light">Petronas Twin Towers, Kuala Lumpur, Malaysia</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-2">
              <h3 class="text-gray-950 text-xl md:text-2xl font-medium">Mexico Branch</h3>
              <p class="text-gray-400 text-sm md:text-base font-light">Torre Reforma, 156 Paseo de la Reforma, Mexico City, Mexico</p>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-[489px] flex-shrink-0">
          <img src="/assets/about-map-DW2E-xjl.png" alt="Global map" class="w-full h-auto" />
        </div>
      </div>
    </section>
  </main>`,
  '/cooperation': `<main class="flex flex-col items-center">
    <section class="relative w-full min-h-screen overflow-hidden bg-gray-900">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-20 pt-32">
        <h1 class="text-white text-3xl md:text-4xl font-medium mb-6">Get Your Solution</h1>
        <p class="text-white/70 text-lg mb-4">Response within 2 hours - Customer Service Manager will respond to your inquiry</p>
        <p class="text-white/70 text-lg mb-8">7*24 hours online support</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-white text-2xl font-medium mb-6">Quick Access</h2>
            <div class="flex flex-col gap-4 mb-8">
              <a href="#" class="text-blue-400 hover:text-blue-300">Merchant Onboarding</a>
              <a href="#" class="text-blue-400 hover:text-blue-300">API Documentation</a>
            </div>
            <h2 class="text-white text-2xl font-medium mb-6">Contact Information</h2>
            <div class="flex flex-col gap-4">
              <p class="text-white/70">Business Cooperation: <a href="mailto:payoffice@starbit.net.cn" class="text-blue-400">payoffice@starbit.net.cn</a></p>
              <p class="text-white/70">Technical Support: <a href="mailto:support@starbit.net.cn" class="text-blue-400">support@starbit.net.cn</a></p>
            </div>
          </div>
          <div class="bg-white/10 rounded-2xl p-8">
            <h2 class="text-white text-2xl font-medium mb-6">Applicant Information</h2>
            <form class="flex flex-col gap-4">
              <input type="text" placeholder="Name" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" />
              <input type="text" placeholder="Company Name" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" />
              <input type="text" placeholder="Industry" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" />
              <input type="email" placeholder="Email" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" />
              <input type="tel" placeholder="Contact Phone" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" />
              <input type="text" placeholder="Estimated Monthly Sales" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" />
              <textarea placeholder="Detailed Business Description" rows="4" class="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"></textarea>
              <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">Become a Service Provider</button>
            </form>
            <p class="text-white/50 text-sm mt-4">Please fill in your real situation, we will contact you as soon as possible after receiving your application</p>
          </div>
        </div>
      </div>
    </section>
  </main>`,
  '/agentic-pay': `<main class="flex flex-col items-center">
    <section class="relative w-full min-h-[600px] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-20 pt-32 text-center">
        <span class="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">AI Agent Economy</span>
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">The Payment Layer for the AI Agent Economy</h1>
        <p class="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-8">Supporting instant stablecoin settlement, atomic ledgers, and full-chain traceability, providing a trusted transaction foundation for global AI agents.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="/cooperation" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full">Join Waitlist</a>
          <a href="#features" class="border border-white/30 hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full">Learn More</a>
        </div>
      </div>
    </section>
    <section id="features" class="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
      <h2 class="text-3xl md:text-4xl font-medium text-gray-950 text-center mb-6">The Challenge</h2>
      <p class="text-gray-600 text-center max-w-3xl mx-auto mb-16">Current payment systems are designed for humans, not for machine-to-machine transactions. AI agents need instant, programmable, and transparent payment infrastructure to operate autonomously in the digital economy.</p>
      <h2 class="text-3xl md:text-4xl font-medium text-gray-950 text-center mb-6">Our Solution</h2>
      <p class="text-gray-600 text-center max-w-3xl mx-auto mb-12">Agentic Pay provides the payment infrastructure specifically designed for AI agents and autonomous systems.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-gray-50 rounded-2xl p-6">
          <h3 class="text-gray-950 text-xl font-medium mb-3">KYA (Know Your Agent)</h3>
          <p class="text-gray-500">Identity verification and reputation system for AI agents, ensuring trust in autonomous transactions.</p>
        </div>
        <div class="bg-gray-50 rounded-2xl p-6">
          <h3 class="text-gray-950 text-xl font-medium mb-3">Instant Settlement</h3>
          <p class="text-gray-500">Real-time stablecoin payments with blockchain confirmation, enabling immediate value transfer.</p>
        </div>
        <div class="bg-gray-50 rounded-2xl p-6">
          <h3 class="text-gray-950 text-xl font-medium mb-3">Atomic Ledger</h3>
          <p class="text-gray-500">Guaranteed transaction atomicity ensuring all-or-nothing execution for complex multi-party settlements.</p>
        </div>
        <div class="bg-gray-50 rounded-2xl p-6">
          <h3 class="text-gray-950 text-xl font-medium mb-3">Pay-as-you-go Pricing</h3>
          <p class="text-gray-500">Micro-transaction support with usage-based billing, perfect for AI API calls and agent services.</p>
        </div>
      </div>
    </section>
    <section class="w-full bg-gray-50 py-16 md:py-20">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0">
        <h2 class="text-3xl md:text-4xl font-medium text-gray-950 text-center mb-12">Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-gray-950 text-xl font-medium mb-3">AI-to-AI Commerce</h3>
            <p class="text-gray-500">Enable autonomous agents to buy and sell services from each other without human intervention.</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-gray-950 text-xl font-medium mb-3">Agent Workforce Payments</h3>
            <p class="text-gray-500">Pay AI agents for completed tasks with instant settlement and performance-based compensation.</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-gray-950 text-xl font-medium mb-3">API Usage Billing</h3>
            <p class="text-gray-500">Automatically bill for AI API calls with micro-transaction support and usage-based pricing.</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-gray-950 text-xl font-medium mb-3">Cross-border AI Services</h3>
            <p class="text-gray-500">Enable global AI services with instant cross-border stablecoin payments.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full bg-blue-600 py-16 md:py-20">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 text-center">
        <h2 class="text-white text-3xl md:text-4xl font-medium mb-6">Ready to Build the Future?</h2>
        <p class="text-white/80 text-lg mb-8">Join the waitlist and be among the first to access Agentic Pay when we launch.</p>
        <a href="/cooperation" class="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-gray-100">Get Started</a>
      </div>
    </section>
  </main>`,
  '/blogs': `<main class="flex flex-col items-center">
    <section class="relative w-full overflow-hidden bg-gray-900 py-20 pt-32">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 text-center">
        <h1 class="text-white text-4xl md:text-5xl font-bold mb-6">Insights & Updates</h1>
        <p class="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">Stay informed with the latest trends in stablecoin payments, blockchain technology, and the AI agent economy.</p>
      </div>
    </section>
    <section class="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img src="/blog/AI_Pay_01_(Product_Intro)_1.png" alt="Agentic Pay Introduction" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h2 class="text-gray-950 text-xl font-medium mb-3">Introducing Agentic Pay: Payment Infrastructure for AI Agents</h2>
            <p class="text-gray-500 mb-4">Learn how Agentic Pay is revolutionizing payments for the AI agent economy with instant settlement and atomic ledgers.</p>
            <a href="/blogs/agentic-pay-intro" class="text-blue-600 font-medium">Read More →</a>
          </div>
        </article>
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img src="/blog/AI_Pay_02_(Tech_Blog)_1.png" alt="Technical Deep Dive" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h2 class="text-gray-950 text-xl font-medium mb-3">Technical Deep Dive: Building Atomic Ledgers for AI Transactions</h2>
            <p class="text-gray-500 mb-4">A technical exploration of how we built atomic transaction guarantees for complex multi-party AI settlements.</p>
            <a href="/blogs/atomic-ledgers" class="text-blue-600 font-medium">Read More →</a>
          </div>
        </article>
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img src="/blog/Stablecoin_Review_1.png" alt="Stablecoin Review" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h2 class="text-gray-950 text-xl font-medium mb-3">Stablecoin Payments: A Complete Guide for Businesses</h2>
            <p class="text-gray-500 mb-4">Everything you need to know about integrating stablecoin payments into your business operations.</p>
            <a href="/blogs/stablecoin-guide" class="text-blue-600 font-medium">Read More →</a>
          </div>
        </article>
      </div>
    </section>
    <section class="w-full bg-blue-600 py-16 md:py-20">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 text-center">
        <h2 class="text-white text-3xl md:text-4xl font-medium mb-6">Ready to Transform Your Payments?</h2>
        <p class="text-white/80 text-lg mb-8">Get in touch with our team to learn how TerraziPay can help your business.</p>
        <a href="/cooperation" class="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-gray-100">Contact Us</a>
      </div>
    </section>
  </main>`,
};

const app = new Hono<{ Bindings: Env }>();

/** Site configuration for SEO */
const SITE_URL = "https://terrazipay.com";
const ALL_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/cooperation", priority: "0.9", changefreq: "monthly" },
  { path: "/agentic-pay", priority: "0.9", changefreq: "weekly" },
  { path: "/blogs", priority: "0.8", changefreq: "daily" },
];

// API routes
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Sitemap.xml - Dynamic sitemap for SEO
app.get("/sitemap.xml", () => {
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const urls = ALL_ROUTES.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
});

// Robots.txt - Guide search engine crawlers
app.get("/robots.txt", () => {
  const robotsTxt = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
});

// Main handler: Worker controls all routing
app.all("*", async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const assets = (c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }).ASSETS;
  if (!assets) return c.notFound();

  // Helper: inject canonical URL into HTML <head>
  const injectCanonical = (html: string, canonicalPath: string): string => {
    const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    
    // Check if canonical already exists
    if (html.includes('rel="canonical"')) {
      // Replace existing canonical
      return html.replace(/<link rel="canonical"[^>]*\/>/, canonicalTag);
    }
    
    // Insert after <meta charset> or at the start of <head>
    if (html.includes('<meta charset')) {
      return html.replace(/(<meta charset[^>]*>)/, `$1\n\t\t${canonicalTag}`);
    }
    return html.replace(/<head>/, `<head>\n\t\t${canonicalTag}`);
  };

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
        // Replace entire #root content (root index.html already has SSR content inside)
        // Find <div id="root"> and </body>, replace everything between them
        const rootStart = html.indexOf('<div id="root">');
        const bodyEnd = html.indexOf('</body>');
        if (rootStart !== -1 && bodyEnd !== -1) {
          // Find the closing </div> that's right before </body> (with optional whitespace)
          const beforeBody = html.substring(0, bodyEnd);
          const lastDivClose = beforeBody.lastIndexOf('</div>');
          if (lastDivClose > rootStart) {
            html = html.substring(0, rootStart) + 
                   `<div id="root">${staticContent}</div>` + 
                   html.substring(lastDivClose + 6); // 6 = length of '</div>'
          }
        }
      }
      
      // Generate route-specific Schema.org data
      const schemas = getSchemaForRoute(pathname, 'en-US');
      const schemaScripts = schemas
        .map((schema) => `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`)
        .join('\n    ');
      
      // Replace schema section (matches "(route: /)" or any route marker)
      html = html.replace(
        /<!-- Schema\.org structured data \(route: [^)]*\) -->[\s\S]*?(?=<script type="module")/,
        `<!-- Schema.org structured data (route: ${pathname}) -->\n    ${schemaScripts}\n    `
      );
      
      // Inject canonical URL
      html = injectCanonical(html, pathname);
      
      return createNoCacheResponse(html, pathname, "worker-generated");
    }
  }

  // For static assets (JS, CSS, images, etc.) and root path: serve from ASSETS
  const assetRes = await assets.fetch(c.req.raw);
  
  if (assetRes.ok) {
    // For HTML responses (root page), inject canonical
    const contentType = assetRes.headers.get("Content-Type") || "";
    if (contentType.includes("text/html")) {
      let html = await assetRes.text();
      html = injectCanonical(html, pathname);
      return createNoCacheResponse(html, pathname, "assets-with-canonical");
    }
    return assetRes;
  }
  
  // For 404s on HTML pages: serve root index.html (SPA fallback)
  const accept = c.req.header("Accept") || "";
  if (assetRes.status === 404 && accept.includes("text/html")) {
    const rootRequest = new Request(new URL("/index.html", url.origin).toString());
    const rootRes = await assets.fetch(rootRequest);
    if (rootRes.ok) {
      let html = await rootRes.text();
      // For SPA fallback, use the requested path as canonical (client-side routing will handle it)
      html = injectCanonical(html, pathname);
      return createNoCacheResponse(html, pathname + " (spa-fallback)", "spa-fallback");
    }
  }

  return assetRes;
});

export default app;
