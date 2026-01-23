import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { schemaInjectionPlugin } from "./vite-plugin-schema";
import { multiPageSchemaPlugin } from "./vite-plugin-multi-page-schema";

export default defineConfig(({ mode }) => {
	return {
		plugins: [react(), cloudflare(), schemaInjectionPlugin(), multiPageSchemaPlugin()],
		resolve: {
			alias: {
				"@": "/src/react-app",
			},
		},
		define: {
			"process.env.NODE_ENV": `"${mode}"`,
		},
		server: {
			port: 23456,
		},
	}
});
