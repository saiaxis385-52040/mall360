import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProductImage } from '../ui/ProductImage';

interface HeroSectionProps {
  onShopClick: () => void;
  onExploreAcidWash: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onExploreAcidWash,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] border-b border-[#EEEEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Brand Headline */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008450] tracking-wider uppercase mb-3">
              <span>Mall360 Drop 2026 Archive</span>
              <span aria-hidden="true" className="text-[#C9CBCC]">·</span>
              <span className="text-[#334155]">Heavyweight 240+ GSM Cotton</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#131814] tracking-tight leading-[1.08] mb-5 text-balance">
              Raw fits crafted for the non-conformist.
            </h1>

            <p className="text-base sm:text-lg text-[#3F3F46] max-w-xl leading-relaxed mb-8">
              Engineered by Mall360 with drop-shoulder geometry, double-needle structural ribbing, and artisanal mineral acid washes. Built to outlast seasonal trends.
            </p>

            {/* Exactly ONE primary CTA as required by design rules */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onShopClick}
                className="group"
              >
                <span>Shop New Drops</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <button
                onClick={onExploreAcidWash}
                className="text-sm font-semibold text-[#632668] hover:text-[#813288] py-2 px-3 underline underline-offset-4 decoration-[#F290FA] transition-colors cursor-pointer"
              >
                Discover Acid Wash Collection
              </button>
            </div>

            {/* Trust Signal metrics */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#EEEEEF] w-full max-w-md">
              <div>
                <p className="font-display font-extrabold text-2xl text-[#131814] tabular-nums">240<span className="text-sm text-[#008450]">GSM</span></p>
                <p className="text-xs text-[#51575C] mt-0.5">Heavy Combed Cotton</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl text-[#131814] tabular-nums">100k<span className="text-sm text-[#008450]">+</span></p>
                <p className="text-xs text-[#51575C] mt-0.5">Verified Deliveries</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl text-[#131814] tabular-nums">4.9<span className="text-sm text-[#008450]">/5</span></p>
                <p className="text-xs text-[#51575C] mt-0.5">Average Customer Score</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Company Logo Reload Ring */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[12px] overflow-hidden shadow-veirdo-sm border border-[#EEEEEF] aspect-[16/10] sm:aspect-[16/11] bg-[#F1F8FF]">
              <ProductImage
                src="/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg"
                alt="Mall360 Streetwear Drop 2026 oversized collection"
                loaderSize="lg"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div>
                  <span className="font-display font-bold text-sm block">Editorial Lookbook 2026</span>
                  <span className="text-white/80">Oversized Relaxed Drops</span>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-[4px] font-semibold text-white">
                  Limited Batch
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
