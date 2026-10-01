import React, { useState } from 'react';
import { X, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#131814] text-[#B0FADD] text-xs py-2 px-4 border-b border-[#00653D]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-6 overflow-hidden">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#00DA85]" />
            <span className="font-medium text-white">Free Express Shipping on Orders Above $49</span>
          </div>
          <span className="hidden md:inline text-[#74797D]">·</span>
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00DA85]" />
            <span className="text-[#AFB2B4]">Cash on Delivery Available</span>
          </div>
          <span className="hidden lg:inline text-[#74797D]">·</span>
          <div className="hidden lg:flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-[#00DA85]" />
            <span className="text-[#AFB2B4]">7-Day Easy Doorstep Exchange</span>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-[#AFB2B4] hover:text-white p-1 transition-colors cursor-pointer ml-2"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
