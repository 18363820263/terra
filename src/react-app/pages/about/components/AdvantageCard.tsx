import { LucideIcon } from "lucide-react";

export default function AdvantageCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#F7F9FC] rounded-xl p-8 hover:shadow-lg transition-shadow text-center">
      <div className="w-full mb-6 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full">
          <Icon className="w-14 h-14 text-blue-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
