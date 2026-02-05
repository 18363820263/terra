import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Cooperation from "./pages/cooperation";
import About from "./pages/about";
import AgenticPay from "./pages/agentic-pay";
import Blogs from "./pages/blogs";
import BlogArticle from "./pages/blogs/article";
import Cases from "./pages/cases";
import NotFound from "./pages/NotFound";

/**
 * Shared route configuration for both client-side (BrowserRouter) and server-side (StaticRouter) rendering
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/agentic-pay" element={<AgenticPay />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blogs/:slug" element={<BlogArticle />} />
    <Route path="/cases" element={<Cases />} />
    <Route path="/cooperation" element={<Cooperation />} />
    <Route path="/about" element={<About />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
