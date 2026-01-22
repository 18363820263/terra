import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => {
	return {
		plugins: [react(), cloudflare()],
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
