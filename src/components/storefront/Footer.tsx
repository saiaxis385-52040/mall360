import React, { useState } from 'react';
import { Logo } from '../ui/Logo';
import { RuixenGradientFooter } from '../ui/ruixen-gradient-footer';
import {
  ArrowUp,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Check,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onCategoryClick?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategoryClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Veirdo signature continuous marquee text
  const marqueePhrase = 'FIND YOUR FLIP SIDE · ';
  const marqueeRepeats = Array(12).fill(marqueePhrase);

  // Gradient stops matching Veirdo #00aa68 emerald and white aura
  const veirdoStops = [
    { offset: 0, color: '#00aa68' },
    { offset: 0.5, color: '#00aa68' },
    { offset: 0.88, color: '#33f3a8' },
    { offset: 1, color: '#33f3a800' },
  ];

  return (
    <div id="shopify-section-footer" className="w-full">
      {/* 1. Veirdo Top Breadcrumbs Ribbon */}
      <div className="bg-[#FFFFFF] border-t border-b border-[#EEEEEF] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <button
            onClick={() => onCategoryClick?.('All Products')}
            className="text-[#131814] font-medium hover:underline cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#AFB2B4]" />
          <span className="text-[#AFB2B4] font-medium">Premium Streetwear & Heavyweight Drops</span>
        </div>
      </div>

      {/* 2. Main Veirdo Official Footer Wrapper (.footer-wrapper background: #00aa68) */}
      <RuixenGradientFooter
        gradientHeight="32vh"
        minReveal={0.03}
        bars={11}
        blur={20}
        stops={veirdoStops}
        className="footer-wrapper relative overflow-hidden font-body text-white selection:bg-[#131814] selection:text-white"
        style={{ backgroundColor: '#00aa68' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          {/* Top Section: Giant Veirdo Hero Title & Subscribe Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-12 border-b border-white/20">
            {/* Left Column: Bold Headline & Brand Logo */}
            <div className="lg:col-span-6 space-y-4">
              <div className="mb-2">
                <Logo variant="full" size="lg" theme="light" />
              </div>

              {/* Exact Veirdo .footer-title styling */}
              <h2
                className="footer-title font-display font-black text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white uppercase tracking-tight"
                style={{
                  textShadow: '1px 1px 0px rgba(0, 0, 0, 0.40)',
                }}
              >
                JOIN OUR
                <br />
                MALL360 FAM
              </h2>

              <p className="text-xs sm:text-sm text-white/90 max-w-md leading-relaxed font-medium">
                Get early drop passes for 1-of-500 limited editions, secret archives, and architectural
                heavyweight drops.
              </p>
            </div>

            {/* Right Column: Veirdo Subscribe Bar + "SPOT US ON" */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              {/* Subscribe Box */}
              <div>
                <span className="block text-xs font-display font-extrabold uppercase tracking-widest text-white mb-2">
                  Subscribe to Newsletter
                </span>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white text-[#131814] placeholder-[#74797D] px-4 py-3 rounded-[6px] text-xs font-medium focus:outline-none shadow-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#131814] hover:bg-black text-white font-display font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-[6px] transition-all duration-150 shrink-0 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>SUBSCRIBED</span>
                      </>
                    ) : (
                      <>
                        <span>SUBSCRIBE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>

                {subscribed && (
                  <p className="text-xs text-white font-bold mt-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Welcome to the Fam! Secret drop access sent to your inbox.</span>
                  </p>
                )}
              </div>

              {/* SPOT US ON Section (Direct from Veirdo) */}
              <div>
                <span className="block text-xs font-display font-extrabold uppercase tracking-widest text-white mb-2.5">
                  Spot us on
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { name: 'INSTAGRAM', icon: Instagram, url: 'https://instagram.com' },
                    { name: 'LINKEDIN', icon: Linkedin, url: 'https://linkedin.com' },
                    { name: 'TWITTER', icon: Twitter, url: 'https://twitter.com' },
                    { name: 'WHATSAPP', icon: MessageCircle, url: 'https://whatsapp.com' },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white/15 hover:bg-white text-white hover:text-[#00aa68] font-display font-extrabold text-[11px] tracking-wider uppercase transition-all duration-150 border border-white/25 hover:border-white shadow-sm"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Nav Section: Categories, Company, Customers (Veirdo Link Architecture with High-Contrast Complementary Styling) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-b border-white/20">
            {/* Column 1: CATEGORIES */}
            <div className="space-y-3.5">
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white flex items-center gap-2 pb-2 border-b border-white/25">
                <span className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]" />
                Categories
              </h3>
              <ul className="space-y-2.5 text-[13px] sm:text-sm font-bold">
                {[
                  { label: 'OVERSIZED T-SHIRTS', cat: 'Oversized Tees' },
                  { label: 'NEW ARRIVALS', cat: 'All Products' },
                  { label: 'BEST SELLERS', cat: 'All Products' },
                  { label: 'CLASSIC FIT T-SHIRT', cat: 'Oversized Tees' },
                  { label: 'CARGOS', cat: 'All Products' },
                  { label: 'WINTER-WEAR', cat: 'Winter Hoodies' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => onCategoryClick?.(item.cat)}
                      className="text-[#FFE600] hover:text-white hover:translate-x-1.5 transition-all text-left flex items-center gap-1.5 cursor-pointer group"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.35)' }}
                    >
                      <span className="text-[#FFE600] group-hover:text-white text-xs opacity-75 group-hover:opacity-100 transition-all">▸</span>
                      <span className="group-hover:underline underline-offset-4">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: COMPANY */}
            <div className="space-y-3.5">
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white flex items-center gap-2 pb-2 border-b border-white/25">
                <span className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]" />
                Company
              </h3>
              <ul className="space-y-2.5 text-[13px] sm:text-sm font-bold">
                {[
                  'ABOUT-US',
                  'BLOG',
                  'PRIVACY POLICY',
                  'TERMS & CONDITIONS',
                  'WORK WITH US',
                ].map((item, idx) => (
                  <li key={idx}>
                    <span
                      className="text-[#FFE600] hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer group"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.35)' }}
                    >
                      <span className="text-[#FFE600] group-hover:text-white text-xs opacity-75 group-hover:opacity-100 transition-all">▸</span>
                      <span className="group-hover:underline underline-offset-4">{item}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: CUSTOMERS */}
            <div className="space-y-3.5">
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white flex items-center gap-2 pb-2 border-b border-white/25">
                <span className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]" />
                Customers
              </h3>
              <ul className="space-y-2.5 text-[13px] sm:text-sm font-bold">
                {[
                  'CONTACT US',
                  'FAQs',
                  'SHIPPING POLICY',
                  'REFUND POLICY',
                ].map((item, idx) => (
                  <li key={idx}>
                    <span
                      className="text-[#FFE600] hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer group"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.35)' }}
                    >
                      <span className="text-[#FFE600] group-hover:text-white text-xs opacity-75 group-hover:opacity-100 transition-all">▸</span>
                      <span className="group-hover:underline underline-offset-4">{item}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Signature Veirdo Marquee Banner: "FIND YOUR FLIP SIDE" - Large Rolling Headline in Vibrant Streetwear Yellow */}
          <div className="py-8 sm:py-12 lg:py-14 border-t border-b border-white/20 overflow-hidden select-none bg-black/10">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {marqueeRepeats.map((phrase, idx) => (
                <span
                  key={idx}
                  className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 inline-block text-[#FFE600] hover:text-[#FFF500] transition-colors"
                  style={{
                    textShadow: '2px 2px 0px rgba(0, 0, 0, 0.40)',
                  }}
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Bottom Strip: Copyright © VEIRDO / MALL360 */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/90">
            <div>
              Copyright © MALL360 (Inspired by VEIRDO) {new Date().getFullYear()} · All Rights Reserved
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-white/15 border border-white/25">
                240+ GSM Combed Cotton
              </span>
              <span className="px-2.5 py-1 rounded bg-white/15 border border-white/25">
                7-Day Easy Doorstep Exchange
              </span>
            </div>
          </div>
        </div>

        {/* Floating Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-6 right-6 z-40 bg-[#131814] hover:bg-black text-white p-3 rounded-full shadow-2xl border border-white/20 transition-all duration-200 hover:-translate-y-1 active:scale-90 cursor-pointer flex items-center justify-center group"
          title="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </RuixenGradientFooter>
    </div>
  );
};
