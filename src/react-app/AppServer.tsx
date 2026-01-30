import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom/server";
import { LanguageProvider } from "./locales/LanguageContext";
import { AppRoutes } from "./AppRoutes";

// Create a QueryClient with SSR-safe defaults (no refetching, no retries)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

interface AppServerProps {
  url: string;
}

/**
 * Server-side App entry for SSR/SSG rendering.
 * Uses StaticRouter instead of BrowserRouter and shares the same route tree.
 * 
 * NOTE: Toaster/Sonner/TooltipProvider are client-only interactive components,
 * so they're excluded from SSR to avoid import issues and reduce bundle size.
 */
export function AppServer({ url }: AppServerProps) {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

