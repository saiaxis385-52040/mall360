import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Sparkles, Award, Scissors } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: '240+ GSM Heavyweight',
      metric: '100% Combed Cotton',
      description: 'Denser knit structure that retains silhouette wash after wash. Drop-shoulder tailoring without side torquing.',
    },
    {
      icon: Award,
      title: 'Zero Cracking Screenprints',
      metric: 'Plastisol & Puff Inks',
      description: 'High-density pigment curing that resists heat and abrasive laundry cycles for over 50+ wash tests.',
    },
    {
      icon: Truck,
      title: '24-Hour Dispatch',
      metric: '48h to 72h Doorstep',
      description: 'Live order tracking with automated SMS milestones and reliable Cash on Delivery verification.',
    },
    {
      icon: RefreshCw,
      title: '7-Day Hassle-Free Swap',
      metric: 'Zero Questions Asked',
      description: 'Not sure about the oversized fit? Doorstep reverse pickup with instant credit or replacement.',
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 border-t border-[#EEEEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-[#008450] uppercase tracking-wider block mb-1">
            Manufacturing Standard
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#131814] tracking-tight">
            Engineered differently from fast-fashion blanks.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFA] border border-[#EEEEEF] p-5 rounded-[8px] flex flex-col justify-between hover:border-[#C9CBCC] transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-[6px] bg-[#B0FADD]/40 text-[#00653D] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-[#131814] mb-1">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#008450] block mb-2">
                    {pillar.metric}
                  </span>
                  <p className="text-xs text-[#51575C] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
