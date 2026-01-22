import { Phone, HelpCircle, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hidden lg:flex fixed right-4 md:right-8 lg:right-[88px] top-[442px] z-40 flex-col items-start gap-4">
      {/* Contact Section */}
      <div className="flex flex-col items-center gap-3 px-3 py-4 rounded-full border border-gray-200 bg-white shadow-[2px_4px_12px_0_rgba(9,9,11,0.06)]">
        <Phone className="w-6 h-6 text-gray-950" />
        <div className="h-px w-full bg-gray-200" />
        <HelpCircle className="w-6 h-6 text-gray-950" />
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center p-3 h-12 w-12 rounded-3xl border border-gray-200 bg-white shadow-[2px_4px_12px_0_rgba(9,9,11,0.06)] hover:bg-gray-50 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 text-gray-950" />
      </button>
    </div>
  );
}
