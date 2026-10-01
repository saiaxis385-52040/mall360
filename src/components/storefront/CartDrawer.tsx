import React, { useState } from 'react';
import {
  X,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ShoppingBag,
  Bookmark,
  CheckCircle2,
  Truck,
  MapPin,
  Gift,
  Coins,
  Plus,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { Product, PRODUCTS } from '../../data/products';
import { UserProfile, Address } from '../../types/user';
import { Button } from '../ui/Button';
import { ProductImage } from '../ui/ProductImage';
import { Badge } from '../ui/Badge';

export interface CartItem {
  id: string;
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
  selected?: boolean;
}

export interface SavedForLaterItem {
  id: string;
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, quantity: number) => void;
  onUpdateSize?: (id: string, oldSize: string, newSize: 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
  onRemoveItem: (id: string, size: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  user?: UserProfile;
  onOpenProfile?: (tab?: 'addresses' | 'orders' | 'wallet') => void;
  onAddToCart?: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  user,
  onOpenProfile,
  onAddToCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('MALL15');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Flipkart SuperCoins redemption state
  const [redeemCoins, setRedeemCoins] = useState(false);

  // Amazon Gift order checkbox
  const [isGiftOrder, setIsGiftOrder] = useState(false);

  // Amazon/Flipkart "Saved for Later" list state with persistence
  const [savedForLater, setSavedForLater] = useState<SavedForLaterItem[]>(() => {
    try {
      const saved = localStorage.getItem('mall360_saved_for_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected for checkout state per item (Amazon/Flipkart style)
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  // Selected items calculation
  const activeItems = items.filter((it) => selectedIds[`${it.id}-${it.size}`] !== false);
  const totalItemCount = activeItems.reduce((acc, it) => acc + it.quantity, 0);

  // Price calculations
  const rawSubtotal = activeItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const rawOriginalTotal = activeItems.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price * 1.4) * item.quantity,
    0
  );
  const mrpSavings = Math.max(0, rawOriginalTotal - rawSubtotal);

  // Coupon
  const couponDiscount =
    appliedCoupon === 'MALL360' || appliedCoupon === 'MALL15' ? rawSubtotal * 0.15 : 0;

  // SuperCoins Discount (Flipkart style: 200 coins = $4.00 off)
  const coinsDiscount = redeemCoins ? 4.0 : 0;

  const freeShippingThreshold = 49;
  const isFreeShipping = rawSubtotal - couponDiscount - coinsDiscount >= freeShippingThreshold || activeItems.length === 0;
  const shippingFee = activeItems.length === 0 ? 0 : isFreeShipping ? 0 : 5.99;

  const finalPayable = Math.max(0, rawSubtotal - couponDiscount - coinsDiscount + shippingFee);
  const totalSavings = mrpSavings + couponDiscount + coinsDiscount + (isFreeShipping && activeItems.length > 0 ? 5.99 : 0);

  const amountNeededForFreeShipping = Math.max(
    0,
    freeShippingThreshold - (rawSubtotal - couponDiscount - coinsDiscount)
  );

  // Save for later handler (moves from cart to saved for later)
  const handleSaveForLater = (item: CartItem) => {
    const updatedSaved = [
      ...savedForLater.filter((s) => !(s.id === item.id && s.size === item.size)),
      { id: item.id, product: item.product, size: item.size },
    ];
    setSavedForLater(updatedSaved);
    localStorage.setItem('mall360_saved_for_later', JSON.stringify(updatedSaved));
    onRemoveItem(item.id, item.size);
  };

  // Move back to cart
  const handleMoveToCart = (savedItem: SavedForLaterItem) => {
    onAddToCart?.(savedItem.product, savedItem.size);
    const updated = savedForLater.filter(
      (s) => !(s.id === savedItem.id && s.size === savedItem.size)
    );
    setSavedForLater(updated);
    localStorage.setItem('mall360_saved_for_later', JSON.stringify(updated));
  };

  const handleDeleteSaved = (savedItem: SavedForLaterItem) => {
    const updated = savedForLater.filter(
      (s) => !(s.id === savedItem.id && s.size === savedItem.size)
    );
    setSavedForLater(updated);
    localStorage.setItem('mall360_saved_for_later', JSON.stringify(updated));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'MALL360' || clean === 'MALL15') {
      setAppliedCoupon(clean);
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon. Try MALL15 for 15% off.');
    }
  };

  const defaultAddress = user?.addresses.find((a) => a.isDefault) || user?.addresses[0];

  // Recommended add-ons (Amazon "Frequently Bought Together")
  const recommendedAddons = PRODUCTS.filter(
    (p) => !items.some((it) => it.id === p.id)
  ).slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:px-5 py-3.5 border-b border-[#EEEEEF] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[6px] bg-[#008450] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-[#131814]">
                Your Shopping Bag
              </h2>
              <span className="text-[11px] text-[#51575C]">
                {items.length} {items.length === 1 ? 'item' : 'items'} in bag
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EEEEEF] text-[#334155] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Flipkart-Style Delivery Address Header Banner */}
        {defaultAddress && (
          <div className="bg-[#FAFAFA] px-4 py-2.5 border-b border-[#EEEEEF] flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <MapPin className="w-3.5 h-3.5 text-[#008450] shrink-0" />
              <div className="truncate">
                <span className="text-[#51575C]">Deliver to: </span>
                <strong className="text-[#131814]">{defaultAddress.name}</strong>,{' '}
                <span className="text-[#51575C] font-mono">{defaultAddress.pincode}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenProfile?.('addresses')}
              className="text-[#008450] font-bold text-[11px] hover:underline shrink-0 ml-2 cursor-pointer"
            >
              Change
            </button>
          </div>
        )}

        {/* Free Shipping Progress Indicator (Amazon/Flipkart Tier) */}
        <div className="bg-[#F1F8FF] px-4 py-2.5 border-b border-[#BFDBFE]/60 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            {isFreeShipping ? (
              <span className="text-[#00653D] flex items-center gap-1">
                🎉 Congratulations! You unlocked FREE Express Delivery!
              </span>
            ) : (
              <span className="text-[#1E3A8A]">
                Add <span className="font-bold text-[#008450]">${amountNeededForFreeShipping.toFixed(2)}</span> more for Free Shipping
              </span>
            )}
            <span className="text-[11px] text-[#1E3A8A] font-bold">
              ${freeShippingThreshold} Goal
            </span>
          </div>

          <div className="w-full bg-[#BFDBFE] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#008450] h-full transition-all duration-300 rounded-full"
              style={{
                width: `${Math.min(100, ((rawSubtotal - couponDiscount) / freeShippingThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Scrollable Items Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F4] flex items-center justify-center mx-auto text-[#74797D]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#131814]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#51575C] max-w-xs mx-auto mt-1">
                  Explore our 240+ GSM heavyweight streetwear drops and limited edition acid washes.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={onContinueShopping}>
                Explore Drops
              </Button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {/* Select All Checkbox (Amazon/Flipkart style) */}
              <div className="flex items-center justify-between pb-2 border-b border-[#EEEEEF] text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#334155]">
                  <input
                    type="checkbox"
                    checked={activeItems.length === items.length}
                    onChange={(e) => {
                      const allChecked = e.target.checked;
                      const nextMap: Record<string, boolean> = {};
                      items.forEach((it) => {
                        nextMap[`${it.id}-${it.size}`] = allChecked;
                      });
                      setSelectedIds(nextMap);
                    }}
                    className="rounded text-[#008450] focus:ring-[#008450]"
                  />
                  <span>Select All Items ({items.length})</span>
                </label>

                <span className="text-[11px] text-[#51575C]">
                  {activeItems.length} selected for checkout
                </span>
              </div>

              {/* Items List */}
              {items.map((item) => {
                const itemKey = `${item.id}-${item.size}`;
                const isSelected = selectedIds[itemKey] !== false;

                return (
                  <div
                    key={itemKey}
                    className={`p-3.5 rounded-[8px] border transition-all ${
                      isSelected
                        ? 'border-[#EEEEEF] bg-white shadow-sm'
                        : 'border-[#EEEEEF]/60 bg-[#FAFAFA] opacity-60'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Item selection checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          setSelectedIds({
                            ...selectedIds,
                            [itemKey]: e.target.checked,
                          })
                        }
                        className="mt-1 rounded text-[#008450] focus:ring-[#008450] cursor-pointer"
                      />

                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 rounded-[6px] overflow-hidden bg-[#FAFAFA] border border-[#EEEEEF] shrink-0">
                        <ProductImage
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display font-bold text-xs text-[#131814] line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id, item.size)}
                            className="text-[#74797D] hover:text-[#EF4444] transition-colors p-0.5 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Size Switcher & Stock badge */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {/* Size selector dropdown */}
                          <div className="flex items-center gap-1 text-[11px] bg-[#FAFAFA] border border-[#C9CBCC] rounded px-1.5 py-0.5">
                            <span className="text-[#51575C]">Size:</span>
                            <select
                              value={item.size}
                              onChange={(e) =>
                                onUpdateSize?.(
                                  item.id,
                                  item.size,
                                  e.target.value as any
                                )
                              }
                              className="font-bold text-[#131814] bg-transparent focus:outline-none cursor-pointer"
                            >
                              {item.product.sizes.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>

                          <span className="text-[10px] font-bold text-[#008450] bg-[#B0FADD]/40 px-1.5 py-0.5 rounded">
                            In Stock · 24h Ship
                          </span>
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-display font-bold text-sm text-[#131814]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-[11px] text-[#74797D] line-through">
                                ${(item.product.originalPrice * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Stepper controls */}
                          <div className="flex items-center border border-[#C9CBCC] rounded-[4px] bg-white overflow-hidden shadow-veirdo-sm">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.size, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#EEEEEF] text-[#334155] font-bold cursor-pointer transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-[#131814]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.size, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#EEEEEF] text-[#334155] font-bold cursor-pointer transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Amazon / Flipkart "Save for Later" Action */}
                        <div className="mt-2 pt-2 border-t border-[#EEEEEF] flex items-center gap-3 text-[11px]">
                          <button
                            type="button"
                            onClick={() => handleSaveForLater(item)}
                            className="text-[#51575C] hover:text-[#008450] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Bookmark className="w-3 h-3" />
                            <span>Save for Later</span>
                          </button>
                          <span>·</span>
                          <span className="text-[#51575C]">7-Day Replacement Guarantee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Flipkart / Amazon "Saved for Later" Section */}
          {savedForLater.length > 0 && (
            <div className="pt-4 border-t border-[#EEEEEF] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#334155] flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#008450]" />
                  <span>Saved for Later ({savedForLater.length})</span>
                </h4>
                <span className="text-[10px] text-[#51575C]">Amazon/Flipkart Style</span>
              </div>

              <div className="space-y-2.5">
                {savedForLater.map((saved) => (
                  <div
                    key={`${saved.id}-${saved.size}`}
                    className="p-3 rounded-[8px] border border-[#EEEEEF] bg-[#FAFAFA] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={saved.product.image}
                        alt={saved.product.title}
                        className="w-12 h-12 rounded object-cover border border-[#EEEEEF] shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-[#131814] truncate">
                          {saved.product.title}
                        </h5>
                        <p className="text-[11px] text-[#51575C]">
                          Size {saved.size} · ${saved.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveToCart(saved)}
                      >
                        Move to Bag
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSaved(saved)}
                        className="p-1.5 text-[#74797D] hover:text-[#EF4444] cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amazon "Frequently Bought Together / Add-ons" */}
          {recommendedAddons.length > 0 && items.length > 0 && (
            <div className="pt-4 border-t border-[#EEEEEF] space-y-2.5">
              <span className="text-xs font-bold text-[#334155] uppercase tracking-wider block">
                Customers Also Bought (1-Click Add)
              </span>

              <div className="grid grid-cols-3 gap-2">
                {recommendedAddons.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-2 rounded-[6px] border border-[#EEEEEF] bg-white flex flex-col justify-between"
                  >
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-full h-16 object-cover rounded mb-1"
                    />
                    <p className="text-[10px] font-bold text-[#131814] line-clamp-1">
                      {rec.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] font-extrabold text-[#008450]">
                        ${rec.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAddToCart?.(rec, 'L')}
                        className="p-1 rounded bg-[#F1F8FF] hover:bg-[#008450] text-[#008450] hover:text-white transition-colors cursor-pointer"
                        title="Add to Cart"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coupon Code Section */}
          {items.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#74797D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (MALL15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-[#FAFAFA] border border-[#C9CBCC] rounded-[6px] text-xs font-mono uppercase focus:outline-none focus:border-[#008450]"
                  />
                </div>
                <Button variant="outline" size="sm" type="submit">
                  Apply
                </Button>
              </form>

              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between text-xs text-[#00653D] bg-[#B0FADD]/40 px-3 py-1.5 rounded-[4px]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coupon '{appliedCoupon}' applied (15% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-[#51575C] hover:text-[#EF4444] text-[10px] uppercase font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-[#EF4444] mt-1 font-medium">{couponError}</p>
              )}
            </div>
          )}

          {/* Flipkart SuperCoins & Amazon Gift Options */}
          {items.length > 0 && (
            <div className="p-3 bg-[#FAFAFA] rounded-[8px] border border-[#EEEEEF] space-y-2 text-xs">
              {/* SuperCoins Checkbox (Flipkart Style) */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#D97706]" />
                  <span>
                    Use <strong>200 SuperCoins</strong> for <strong>$4.00 Instant Off</strong>
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={redeemCoins}
                  onChange={(e) => setRedeemCoins(e.target.checked)}
                  className="rounded text-[#008450] focus:ring-[#008450]"
                />
              </label>

              {/* Amazon Gift Order Checkbox */}
              <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-[#EEEEEF]">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#632668]" />
                  <span>This order contains a gift (Free note & hide invoice price)</span>
                </div>
                <input
                  type="checkbox"
                  checked={isGiftOrder}
                  onChange={(e) => setIsGiftOrder(e.target.checked)}
                  className="rounded text-[#008450] focus:ring-[#008450]"
                />
              </label>
            </div>
          )}
        </div>

        {/* Detailed Price Breakdown & Checkout Sticky Footer (Flipkart / Amazon style) */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EEEEEF] bg-white space-y-3 shrink-0 shadow-lg">
            {/* Price Details Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#51575C]">
                <span>Total MRP ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
                <span className="tabular-nums">${rawOriginalTotal.toFixed(2)}</span>
              </div>

              {mrpSavings > 0 && (
                <div className="flex justify-between text-[#008450] font-semibold">
                  <span>Discount on MRP</span>
                  <span className="tabular-nums">-${mrpSavings.toFixed(2)}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#008450] font-semibold">
                  <span>Coupon Savings ({appliedCoupon})</span>
                  <span className="tabular-nums">-${couponDiscount.toFixed(2)}</span>
                </div>
              )}

              {coinsDiscount > 0 && (
                <div className="flex justify-between text-[#008450] font-semibold">
                  <span>SuperCoins Redeemed</span>
                  <span className="tabular-nums">-${coinsDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#51575C]">
                <span>Delivery Fee</span>
                {isFreeShipping ? (
                  <span className="text-[#008450] font-bold">
                    <span className="line-through text-[#74797D] mr-1">$5.99</span>
                    FREE
                  </span>
                ) : (
                  <span className="tabular-nums">${shippingFee.toFixed(2)}</span>
                )}
              </div>

              <div className="pt-2 border-t border-[#EEEEEF] flex justify-between items-baseline">
                <span className="font-display font-bold text-sm text-[#131814]">
                  Total Payable Amount
                </span>
                <span className="font-display font-black text-lg text-[#131814] tabular-nums">
                  ${finalPayable.toFixed(2)}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="bg-[#B0FADD]/40 border border-[#00DA85] p-1.5 rounded-[4px] text-center text-[11px] font-bold text-[#00653D]">
                  🎉 You will save ${totalSavings.toFixed(2)} on this order!
                </div>
              )}
            </div>

            {/* Primary Action CTA */}
            <Button
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2 text-sm font-bold shadow-veirdo-md"
              disabled={activeItems.length === 0}
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
            >
              <span>Place Order ({totalItemCount} Items)</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#74797D] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#008450]" />
                100% Safe Payments
              </span>
              <span>·</span>
              <span>7-Day Easy Replacement</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
