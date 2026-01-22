import { Hono } from "hono";
import { getSchemaForRoute } from "./schema";

const app = new Hono<{ Bindings: Env }>();

// API routes
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Middleware to inject Schema.org structured data into HTML responses
app.use("*", async (c, next) => {
  await next();

  // Only process HTML responses
  const contentType = c.res.headers.get("content-type");
  if (!contentType?.includes("text/html")) {
    return;
  }

  // Get the HTML content
  const html = await c.res.text();

  // Get the current path and detect language (default to en-US)
  const path = new URL(c.req.url).pathname;
  const language = "en-US"; // TODO: Detect from Accept-Language header or URL

  // Generate Schema for this route
  const schemas = getSchemaForRoute(path, language);

  // Create JSON-LD script tags
  const schemaScripts = schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    )
    .join("\n");

  // Inject Schema into the <head> section
  const modifiedHtml = html.replace("</head>", `${schemaScripts}\n</head>`);

  // Return modified HTML
  return c.html(modifiedHtml);
});

export default app;
