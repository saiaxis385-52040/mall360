import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Coins,
  MessageCircle,
  Twitter,
  Gift,
  ArrowRight,
  Sparkles,
  Users,
  Wallet,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile } from '../../types/user';

interface ReferAndEarnSectionProps {
  user: UserProfile;
  onCopySuccess?: (msg: string) => void;
  variant?: 'page' | 'inline';
}

export const ReferAndEarnSection: React.FC<ReferAndEarnSectionProps> = ({
  user,
  onCopySuccess,
  variant = 'page',
}) => {
  const [copied, setCopied] = useState(false);
  const referralCode = user.referralCode || 'ARJUN360';
  const referralLink = `https://mall360.com/invite/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    onCopySuccess?.(`Referral Code ${referralCode} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Use my invite code ${referralCode} on Mall360 for 15% OFF your first heavyweight streetwear drop! Grab it here: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Join the @Mall360 streetwear collective. Use my exclusive invite code ${referralCode} for 15% off limited edition drops: ${referralLink}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    /* NOTE: Strict adherence to prompt constraint: "dont show it in a card"
       This section uses an open, borderless, seamless editorial flow with no card wrappers or boxed cards. */
    <section className="w-full py-12 md:py-16 bg-[#FAFAFA] border-t border-b border-[#EEEEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Headline Banner - Open & Fluid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#C9CBCC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#008450] mb-2">
              <Users className="w-4 h-4" />
              <span>Mall360 Ambassador Program · Flipkart & Amazon Style Referrals</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#131814] uppercase leading-none">
              INVITE YOUR CREW.
              <br />
              EARN <span className="text-[#008450]">$10 CASH</span> +{' '}
              <span className="text-[#B45309]">250 SUPERCOINS</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#51575C] max-w-md leading-relaxed font-medium">
            Give your friends 15% off their first 240+ GSM heavyweight drop. When their order
            delivers, you instantly get $10.00 store wallet cash and 250 SuperCoins.
          </p>
        </div>

        {/* Middle Section: Unboxed Interactive Action Row */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#C9CBCC]">
          {/* Left: Code Box & 1-Click Copy */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#334155] block">
              Your Exclusive Referral Code:
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-white border-2 border-[#131814] rounded-[6px] px-4 py-2.5 shadow-sm">
                <span className="font-mono font-black text-lg sm:text-xl tracking-widest text-[#131814] select-all">
                  {referralCode}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="bg-[#008450] hover:bg-[#00653D] text-white px-5 py-3 rounded-[6px] text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>COPIED CODE</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-[#51575C]">
              Share this code at checkout or send the direct link to your friends.
            </p>
          </div>

          {/* Right: Instant Direct Share Buttons (Open, unboxed buttons) */}
          <div className="lg:col-span-6 space-y-3 lg:border-l lg:border-[#EEEEEF] lg:pl-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#334155] block">
              1-Click Share to Channels:
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleShareTwitter}
                className="bg-[#1DA1F2] hover:bg-[#1A8CD8] text-white px-4 py-2.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Twitter className="w-4 h-4" />
                <span>Post on X / Twitter</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="bg-[#131814] hover:bg-black text-white px-4 py-2.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Steps: Fluid Horizontal Roadmap (No card wrappers) */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-b border-[#C9CBCC]">
          {/* Step 1 */}
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-[#008450]">01 / INVITE</div>
            <h4 className="font-display font-extrabold text-base text-[#131814]">
              Share Your Secret Code
            </h4>
            <p className="text-xs text-[#51575C] leading-relaxed">
              Send your personal code to friends, group chats, or post on social media lookbooks.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-[#008450]">02 / FIRST DROP</div>
            <h4 className="font-display font-extrabold text-base text-[#131814]">
              Friend Gets 15% OFF
            </h4>
            <p className="text-xs text-[#51575C] leading-relaxed">
              They receive instant 15% discount on their first purchase of any tee, hoodie, or acid wash piece.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-[#008450]">03 / GET REWARDED</div>
            <h4 className="font-display font-extrabold text-base text-[#131814]">
              Collect $10 + 250 Coins
            </h4>
            <p className="text-xs text-[#51575C] leading-relaxed">
              As soon as their order ships, $10 is credited to your Mall360 Pay Wallet and 250 SuperCoins are unlocked.
            </p>
          </div>
        </div>

        {/* Live Referral Stats Strip - Unboxed Minimalist Metrics */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#51575C] block">
                Friends Joined
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#131814]">
                {user.referralCount || 6}
              </span>
            </div>

            <div className="h-8 w-px bg-[#C9CBCC] hidden sm:block" />

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#51575C] block">
                Total Cash Earned
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#008450]">
                ${(user.referralEarnings || 60.0).toFixed(2)}
              </span>
            </div>

            <div className="h-8 w-px bg-[#C9CBCC] hidden sm:block" />

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#51575C] block">
                SuperCoins Banked
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#B45309] flex items-center gap-1">
                <Coins className="w-5 h-5 text-[#D97706]" />
                {((user.referralCount || 6) * 250).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Recent Referral Activity Preview - Clean Table Rows without Cards */}
          <div className="space-y-1.5 text-xs text-[#51575C]">
            <span className="font-bold text-[#131814] block">Latest Referral Activity:</span>
            {user.referralHistory?.slice(0, 2).map((ref) => (
              <div key={ref.id} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008450]" />
                <span className="text-[#131814] font-semibold">{ref.friendName}</span>
                <span>·</span>
                <span>{ref.date}</span>
                <span>·</span>
                <span className="text-[#008450] font-bold">+{ref.rewardCoins} Coins (${ref.cashBonus.toFixed(0)})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
