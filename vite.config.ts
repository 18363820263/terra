import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { schemaInjectionPlugin } from "./vite-plugin-schema";
import { multiPageSchemaPlugin } from "./vite-plugin-multi-page-schema";

export default defineConfig(({ mode }) => {
	// Temporarily disable Cloudflare plugin for local development/SSR
	// Set ENABLE_CLOUDFLARE=true to enable it
	const enableCloudflare = process.env.ENABLE_CLOUDFLARE === 'true';
	
	return {
		plugins: [
			react(),
			...(enableCloudflare ? [cloudflare()] : []),
			schemaInjectionPlugin(),
			multiPageSchemaPlugin()
		],
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
		preview: {
			port: 4173,
			// Ensure preview uses the correct directory (dist/client for Cloudflare Workers)
			// Vite preview looks for 'dist' by default, but our build outputs to 'dist/client'
			// We'll handle this in the preview command instead
		},
		build: {
			// Cloudflare plugin sets outDir to 'dist/client', but we make it explicit
			outDir: 'dist/client',
		},
		ssr: {
			// Mark image files as external in SSR to avoid import errors
			noExternal: ['react', 'react-dom', 'react-router-dom'],
		},
	}
});
