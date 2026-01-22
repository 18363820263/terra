import React from "react";

export default function PartnerLogo({ icon }: { icon: string }) {
  return (
    <div className="flex-shrink-0 w-[280px] h-28 flex items-center justify-center rounded-2xl bg-gray-50">
      <div className="px-6 py-2">
        <img src={icon} alt="partner logo" />
      </div>
    </div>
  );
}
