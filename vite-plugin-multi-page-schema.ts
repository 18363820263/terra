import type { Plugin } from 'vite';
import { getSchemaForRoute } from './src/worker/schema';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

/**
 * Static HTML content as fallback when SSR fails
 * Includes all important h1, h2, h3 tags and content for SEO
 */
const STATIC_HTML_BY_ROUTE: Record<string, string> = {
  '/': `<main class="min-h-screen bg-white">
  <section class="relative w-full">
    <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-semibold text-center">Global Cross-border Stablecoin Payment Service Provider</h1>
    <p class="text-white/70 text-base md:text-lg lg:text-xl font-light text-center">Based on USDT, USDC and other stablecoins, providing fast, secure and compliant end-to-end payment platform to help merchants upgrade their digital operations</p>
    <a href="/cooperation" class="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 text-white font-medium">Learn More</a>
  </section>
  <section class="w-full max-w-[1200px] px-4">
    <h2 class="text-gray-950 text-2xl md:text-3xl lg:text-4xl font-medium text-center">Global Business Coverage</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div><strong class="block text-2xl font-medium">50+</strong><span class="text-sm text-gray-500">Countries & regions</span></div>
      <div><strong class="block text-2xl font-medium">30+</strong><span class="text-sm text-gray-500">Currencies</span></div>
      <div><strong class="block text-2xl font-medium">20+</strong><span class="text-sm text-gray-500">Payment methods</span></div>
      <div><strong class="block text-2xl font-medium">99.9%</strong><span class="text-sm text-gray-500">System uptime</span></div>
    </div>
  </section>
  <section class="w-full">
    <h2 class="text-gray-950 text-4xl font-medium text-center">Why Choose TerraziPay?</h2>
    <p class="text-gray-400 text-base font-light text-center">Blockchain-based stablecoin payment solutions provide secure, fast and cost-effective payment services for merchants worldwide.</p>
    <div>
      <h3 class="text-gray-950 text-xl md:text-2xl font-medium">Security & Compliance</h3>
      <p class="text-gray-400 text-base font-light">Composite bank-level security standards, compliance with global financial regulations, ensuring fund safety</p>
    </div>
    <div>
      <h3 class="text-gray-950 text-xl md:text-2xl font-medium">Fast Settlement</h3>
      <p class="text-gray-400 text-base font-light">Blockchain-based technology providing stablecoin payment secondary confirmation services, 7*24 hours service</p>
    </div>
  </section>
  <section class="w-full max-w-[1200px] px-4">
    <h2 class="text-gray-950 text-4xl font-medium text-center">Security System</h2>
    <p class="text-gray-400 text-base font-light text-center">Multi-layered security architecture ensuring transaction safety</p>
  </section>
  <section class="w-full max-w-[1200px] px-4">
    <h2 class="text-gray-950 text-4xl font-medium text-center">Product Ecosystem</h2>
    <p class="text-gray-400 text-base font-light text-center">Comprehensive payment solutions for different business scenarios</p>
  </section>
  <section class="w-full">
    <h2 class="text-white text-4xl font-medium text-center">Success Stories</h2>
    <p class="text-white/50 text-base font-light text-center">Real customer success cases and business growth</p>
  </section>
  <section class="w-full max-w-[1200px] px-4">
    <h2 class="text-gray-950 text-4xl font-medium text-center">Stablecoin Advantages</h2>
    <p class="text-gray-400 text-base font-light text-center">Key benefits of using stablecoin payments</p>
  </section>
  <section class="w-full max-w-[1200px] px-4">
    <h2 class="text-gray-950 text-4xl font-medium text-center">Merchant Stories</h2>
  </section>
  <section class="w-full">
    <h2 class="text-gray-950 text-4xl font-medium text-center">Financial Partners</h2>
  </section>
</main>`,
  '/agentic-pay': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Agentic Pay – Payment Layer for AI Agents</h1><p class="text-base md:text-lg text-gray-700 mb-4">Agentic Pay is TerraziPay\'s next-generation payment infrastructure for AI agents. It provides instant stablecoin settlement, atomic ledgers and full-chain traceability so that autonomous agents can safely send and receive payments.</p><p class="text-base md:text-lg text-gray-700 mb-4">With support for USDT and USDC on multiple blockchains, Agentic Pay enables pay-as-you-go pricing, micro-transactions and programmable settlement logic for complex multi-party AI workflows.</p><a href="/cooperation" class="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 text-white font-medium">Talk to us about Agentic Pay</a></section></main>',
  '/cooperation': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Business Cooperation & Partnership</h1><p class="text-base md:text-lg text-gray-700 mb-4">Get in touch with TerraziPay for business cooperation, payment integration, or long-term partnership opportunities. Our team will respond within 2 hours and provide 7×24 technical support.</p><p class="text-base md:text-lg text-gray-700 mb-4">Business cooperation email: <a href="mailto:payoffice@starbit.net.cn" class="text-blue-600 underline">payoffice@starbit.net.cn</a>, technical support email: <a href="mailto:support@starbit.net.cn" class="text-blue-600 underline">support@starbit.net.cn</a>.</p><p class="text-base md:text-lg text-gray-700">Please fill in the online application form on this page. We will contact you as soon as possible and provide a tailored stablecoin payment solution for your business.</p></section></main>',
  '/about': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">About TerraziPay</h1><p class="text-base md:text-lg text-gray-700 mb-4">TerraziPay is a fintech company headquartered in Hong Kong, focusing on stablecoin-based cross-border payment solutions. We provide next-generation global settlement and salary payment services for merchants worldwide.</p><p class="text-base md:text-lg text-gray-700 mb-4">TerraziPay supports multiple mainstream blockchain networks including Ethereum, TRON, BNB Chain, Solana, Polygon and Arbitrum. The annual transaction volume has exceeded 1 billion and continues to grow steadily.</p><p class="text-base md:text-lg text-gray-700">We have established offices in Hong Kong, the United States, Malaysia and Mexico, and will continue to expand our global footprint to help more enterprises enjoy the efficiency and transparency of stablecoin payments.</p></section></main>',
  '/blogs': '<main class="min-h-screen bg-white"><section class="w-full max-w-[1200px] mx-auto px-4 py-16"><h1 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">TerraziPay Blog – Stablecoin Payments, Blockchain & Agentic Economy</h1><p class="text-base md:text-lg text-gray-700 mb-4">Discover in-depth articles about stablecoin payment technology, blockchain infrastructure, and the emerging AI agent economy. We share practical guides, product updates and industry insights to help enterprises understand and apply on-chain payments.</p><p class="text-base md:text-lg text-gray-700">Browse our latest blog articles below, or follow TerraziPay to stay updated on cross-border stablecoin payments and Agentic Pay product progress.</p></section></main>',
};

const routes = [
  '/',
  '/agentic-pay',
  '/about',
  '/cooperation',
  '/blogs',
];

/** Routes that have their own index.html (excluding root) */
const ROUTES_WITH_HTML = routes.filter((r) => r !== '/');

/** Only run SSR once per build (closeBundle can be called multiple times by Vite) */
let ssrRunPromise: Promise<void> | null = null;

/**
 * Inject static HTML into HTML files (fallback when SSR fails)
 */
function injectStaticHTML(distDir: string, indexHtmlPath: string) {
  const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

  routes.forEach((route) => {
    const language = 'en-US';
    const schemas = getSchemaForRoute(route, language);

    // Create JSON-LD script tags
    const schemaScripts = schemas
      .map(
        (schema) =>
          `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
      )
      .join('\n    ');

    // Replace the build-time injected schemas with route-specific schemas
    let htmlWithSchemas = indexHtml.replace(
      /<!-- Schema\.org structured data \(common schemas injected at build time\) -->[\s\S]*?(?=<script type="module")/,
      `<!-- Schema.org structured data (route: ${route}) -->\n    ${schemaScripts}\n    `
    );

    // Inject static HTML into #root for SEO
    const staticHtml = STATIC_HTML_BY_ROUTE[route];
    const finalHtml = staticHtml
      ? htmlWithSchemas.replace(
          '<div id="root"></div>',
          `<div id="root">${staticHtml}</div>`
        )
      : htmlWithSchemas;

    // Determine output path
    let outputPath: string;
    if (route === '/') {
      outputPath = indexHtmlPath; // Overwrite the main index.html
    } else {
      // Create directory for the route
      const routeDir = join(distDir, route);
      mkdirSync(routeDir, { recursive: true });
      outputPath = join(routeDir, 'index.html');
    }

    // Write the modified HTML
    writeFileSync(outputPath, finalHtml, 'utf-8');
    console.log(`✓ Generated ${outputPath} with route-specific Schema and static HTML`);
  });
}

/**
 * Vite plugin to generate separate HTML files for each route with:
 * - route-specific Schema.org structured data
 * - full server-rendered React HTML inside #root (or static HTML fallback)
 */
export function multiPageSchemaPlugin(): Plugin {
  return {
    name: 'vite-plugin-multi-page-schema',

    configurePreviewServer(server) {
      // Serve route-specific index.html for each path so "View Source" shows the correct page
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? '/';
        const normalized = pathname.endsWith('/') ? pathname.slice(0, -1) || '/' : pathname;
        if (ROUTES_WITH_HTML.includes(normalized)) {
          const root = join(process.cwd(), 'dist/client');
          const htmlPath = join(root, normalized, 'index.html');
          if (existsSync(htmlPath)) {
            const html = readFileSync(htmlPath, 'utf-8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
            return;
          }
        }
        next();
      });
    },

    async closeBundle() {
      // After the build is complete, generate route-specific HTML files
      const distDir = join(process.cwd(), 'dist/client');
      const indexHtmlPath = join(distDir, 'index.html');

      // Check if the file exists before trying to read it
      if (!existsSync(indexHtmlPath)) {
        console.log('⏭️  Skipping SSR - index.html not yet built');
        return;
      }

      // On CI/Cloudflare, optionally skip SSR (set SKIP_SSR=1 to force static fallback)
      const skipSSR = process.env.SKIP_SSR === '1';
      if (skipSSR) {
        console.log('⏭️  Skipping SSR (SKIP_SSR=1), using static HTML for SEO...');
        injectStaticHTML(distDir, indexHtmlPath);
        return;
      }

      // Run SSR only once per build (closeBundle can be called multiple times)
      if (!ssrRunPromise) {
        ssrRunPromise = (async () => {
          const ssrScriptPath = join(process.cwd(), 'scripts/ssr-render.ts');
          const tsxCliPath = join(process.cwd(), 'node_modules/tsx/dist/cli.mjs');
          const useDirectNode = existsSync(tsxCliPath);
          const spawnCommand = useDirectNode ? process.execPath : (process.platform === 'win32' ? 'pnpm' : 'npx');
          const spawnArgs = useDirectNode
            ? [tsxCliPath, '-r', 'tsconfig-paths/register', ssrScriptPath]
            : process.platform === 'win32'
              ? ['exec', 'tsx', '-r', 'tsconfig-paths/register', ssrScriptPath]
              : ['tsx', '-r', 'tsconfig-paths/register', ssrScriptPath];

          const SSR_TIMEOUT = 180000; // 3 minutes for CI (single run now)
          const ssrSuccess = await new Promise<boolean>((resolve) => {
            const timeout = setTimeout(() => {
              console.error(`⏱️  SSR script timeout after ${SSR_TIMEOUT / 1000}s, using fallback`);
              resolve(false);
            }, SSR_TIMEOUT);

            let output = '';
            const child = spawn(spawnCommand, spawnArgs, {
              stdio: ['inherit', 'pipe', 'pipe'],
              cwd: process.cwd(),
              shell: false,
            });

            child.stdout?.on('data', (data) => {
              const text = data.toString();
              output += text;
              process.stdout.write(text);
            });
            child.stderr?.on('data', (data) => {
              const text = data.toString();
              output += text;
              process.stderr.write(text);
            });
            child.on('close', (code) => {
              clearTimeout(timeout);
              if (code !== 0) {
                console.error(`\n⚠️  SSR script exited with code ${code}`);
                console.error('Last 500 chars of output:', output.slice(-500));
              }
              resolve(code === 0);
            });
            child.on('error', (err) => {
              clearTimeout(timeout);
              console.error('SSR script spawn error:', err);
              resolve(false);
            });
          });

          if (!ssrSuccess) {
            console.log('⚠️  SSR failed, using static HTML fallback');
            console.log('📝 Injecting static HTML with all h tags and content for SEO...');
            injectStaticHTML(distDir, indexHtmlPath);
          } else {
            console.log('✅ SSR completed successfully - HTML files contain full React-rendered content');
          }
        })();
      }
      await ssrRunPromise;
    },
  };
}
