import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Package,
  MapPin,
  Coins,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  LogOut,
  Users,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { UserProfile } from '../../types/user';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  user?: UserProfile;
  onOpenProfile: (tab?: 'orders' | 'addresses' | 'profile' | 'wallet') => void;
  onOpenFullProfile?: (tab?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  user,
  onOpenProfile,
  onOpenFullProfile,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'All Drops', category: 'All Products' },
    { label: 'Oversized Tees', category: 'Oversized Tees' },
    { label: 'Acid Wash', category: 'Acid Wash' },
    { label: 'Winter Hoodies', category: 'Winter Hoodies' },
    { label: 'Graphic Tees', category: 'Graphic Tees' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EEEEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Mall360 Emblem */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectCategory('All Products')}
            className="flex items-center gap-2 text-left group cursor-pointer"
            aria-label="Mall360 Homepage"
          >
            <Logo variant="full" size="md" theme="dark" />
          </button>
        </div>

        {/* Zone 2: 4-6 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className={`text-sm font-medium transition-colors whitespace-nowrap py-1 border-b-2 cursor-pointer ${
                activeCategory === item.category
                  ? 'text-[#008450] border-[#008450] font-semibold'
                  : 'text-[#334155] border-transparent hover:text-[#131814] hover:border-[#C9CBCC]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary interactive controls (Search, Wishlist, Profile & Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#334155] hover:text-[#131814] hover:bg-[#F1F8FF] rounded-[6px] transition-colors cursor-pointer"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#334155] hover:text-[#131814] hover:bg-[#F1F8FF] rounded-[6px] transition-colors relative cursor-pointer"
            aria-label="View wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#632668] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Amazon / Flipkart Style Account & Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-[6px] hover:bg-[#F1F8FF] transition-all cursor-pointer group text-left"
              aria-label="Account and Profile Menu"
              aria-expanded={isDropdownOpen}
            >
              {user ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#008450]"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#FAFAFA] border border-[#EEEEEF] flex items-center justify-center text-[#334155]">
                  <User className="w-4 h-4" />
                </div>
              )}

              <div className="hidden lg:flex flex-col leading-tight">
                <span className="text-[10px] text-[#74797D] font-medium leading-none">
                  Hello, {user ? user.name.split(' ')[0] : 'Sign In'}
                </span>
                <span className="text-xs font-bold text-[#131814] flex items-center gap-0.5">
                  <span>Accounts & Lists</span>
                  <ChevronDown className="w-3 h-3 text-[#74797D] group-hover:text-[#131814] transition-transform" />
                </span>
              </div>
            </button>

            {/* Amazon & Flipkart Style Dropdown Card */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-[10px] border border-[#EEEEEF] shadow-veirdo-lg p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {user && (
                  <div className="p-2.5 bg-[#F1F8FF] rounded-[6px] border border-[#BFDBFE]/60 mb-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#131814] truncate">
                        {user.name}
                      </strong>
                      <span className="text-[9px] font-bold text-[#00653D] bg-[#B0FADD] px-1.5 py-0.5 rounded">
                        PLUS
                      </span>
                    </div>
                    <span className="text-[11px] text-[#51575C] truncate block">{user.email}</span>

                    <div className="mt-2 pt-1.5 border-t border-[#BFDBFE]/60 flex items-center justify-between text-[11px]">
                      <span className="text-[#1E3A8A] font-semibold flex items-center gap-1">
                        <Coins className="w-3 h-3 text-[#D97706]" />
                        {user.superCoins} Coins
                      </span>
                      <span className="text-[#008450] font-bold">${user.walletBalance.toFixed(2)} Pay</span>
                    </div>
                  </div>
                )}

                <div className="space-y-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenFullProfile) {
                        onOpenFullProfile('orders');
                      } else {
                        onOpenProfile('orders');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] hover:bg-[#FAFAFA] text-[#334155] hover:text-[#131814] font-medium transition-colors text-left cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-[#008450]" />
                    <span>Your Orders & Purchases</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenFullProfile) {
                        onOpenFullProfile('refer');
                      } else {
                        onOpenProfile('wallet');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] hover:bg-[#FAFAFA] text-[#334155] hover:text-[#131814] font-medium transition-colors text-left cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#008450]" />
                    <div className="flex items-center justify-between flex-1">
                      <span>Refer & Earn</span>
                      <span className="text-[10px] font-bold text-[#00653D] bg-[#B0FADD] px-1.5 py-0.2 rounded">
                        Get $10
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenFullProfile) {
                        onOpenFullProfile('addresses');
                      } else {
                        onOpenProfile('addresses');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] hover:bg-[#FAFAFA] text-[#334155] hover:text-[#131814] font-medium transition-colors text-left cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#008450]" />
                    <span>Saved Addresses ({user?.addresses.length || 0})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenFullProfile) {
                        onOpenFullProfile('wallet');
                      } else {
                        onOpenProfile('wallet');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] hover:bg-[#FAFAFA] text-[#334155] hover:text-[#131814] font-medium transition-colors text-left cursor-pointer"
                  >
                    <Coins className="w-4 h-4 text-[#D97706]" />
                    <span>SuperCoins & Wallet Balance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenFullProfile) {
                        onOpenFullProfile('settings');
                      } else {
                        onOpenProfile('profile');
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] hover:bg-[#FAFAFA] text-[#334155] hover:text-[#131814] font-medium transition-colors text-left cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#008450]" />
                    <span>Profile Details & Security</span>
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-[#EEEEEF]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenFullProfile) {
                        onOpenFullProfile('orders');
                      } else {
                        onOpenProfile('profile');
                      }
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs text-[#008450] font-bold hover:bg-[#F1F8FF] text-left cursor-pointer"
                  >
                    <span>Manage Full Account</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#131814] hover:bg-[#008450] text-white px-3.5 py-2 rounded-[6px] text-xs font-semibold transition-all shadow-veirdo-sm cursor-pointer group"
            aria-label="View cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#54F5B6] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#00DA85] text-[#131814] rounded-full px-1.5 py-0.2 text-[11px] font-bold min-w-[18px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
