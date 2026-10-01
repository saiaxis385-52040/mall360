import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProductImage } from '../ui/ProductImage';
import { SizeGuideModal } from '../ui/SizeGuideModal';
import {
  ArrowLeft,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Check,
  Share2,
  Copy,
  Clock,
  Eye,
  ShoppingBag,
  Flame,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  onBackToDrops: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBackToDrops,
  onSelectProduct,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [copiedCoupon, setCopiedCoupon] = useState<boolean>(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setPincodeStatus(`Available for fast dispatch! Estimated delivery in 2-3 business days. Cash on delivery eligible.`);
    } else {
      setPincodeStatus(`Please enter a valid 5-6 digit postal code.`);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2200);
    }, 300);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#71717A] mb-6 overflow-x-auto pb-1">
          <button
            onClick={onBackToDrops}
            className="hover:text-[#008450] transition-colors flex items-center gap-1 font-medium cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Drops Catalog</span>
          </button>
          <span>/</span>
          <span className="text-[#3F3F46] font-medium shrink-0">{product.category}</span>
          <span>/</span>
          <span className="text-[#131814] font-semibold truncate max-w-[260px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Product Hero Grid (Left: Gallery, Right: Contiguous Purchase Module) */}
        <div className="bg-white rounded-[12px] border border-[#EEEEEF] shadow-sm p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Left Column: Multi-Angle Interactive Gallery with Logo Reload Ring */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 py-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-[6px] overflow-hidden border-2 transition-all cursor-pointer bg-[#F5F5F4] shrink-0 ${
                    selectedImage === img
                      ? 'border-[#008450] ring-1 ring-[#008450]'
                      : 'border-transparent hover:border-[#C9CBCC]'
                  }`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.title} view angle ${idx + 1}`}
                    loaderSize="xs"
                    containerClassName="w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Photo with Stylish Mall360 Logo Reload Ring */}
            <div className="flex-1 relative rounded-[10px] overflow-hidden bg-[#F5F5F4] border border-[#EEEEEF] aspect-[3/4] max-h-[580px]">
              <ProductImage
                key={selectedImage}
                src={selectedImage}
                alt={product.title}
                loaderSize="lg"
                containerClassName="w-full h-full"
              />

              {/* Status and Urgency Badges */}
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-2 pointer-events-none">
                {product.badge && (
                  <Badge variant="brand" className="shadow-sm">
                    {product.badge}
                  </Badge>
                )}
                {product.stockLeft && (
                  <span className="bg-[#8C1F20] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-300 animate-pulse" />
                    <span>Only {product.stockLeft} Left in Batch</span>
                  </span>
                )}
              </div>

              {/* Wishlist Icon Button */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-white/95 hover:bg-white text-[#131814] shadow-md transition-transform active:scale-90 cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted ? 'fill-[#632668] text-[#632668]' : 'text-[#334155]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand Kicker with Middle Dots */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#008450] tracking-wider uppercase mb-2">
                <span>MALL360 STUDIO</span>
                <span className="text-[#C9CBCC]">·</span>
                <span>{product.category}</span>
                <span className="text-[#C9CBCC]">·</span>
                <span className="text-[#71717A] font-mono">{product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#131814] leading-tight mb-2.5">
                {product.title}
              </h1>

              {/* Rating Summary Bar */}
              <div className="flex items-center gap-3 text-xs mb-4 pb-3 border-b border-[#EEEEEF]">
                <div className="flex items-center gap-1 bg-[#FEF3C7] text-[#B45309] px-2 py-0.5 rounded-[4px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="tabular-nums">{product.rating}</span>
                </div>
                <span className="text-[#71717A]">
                  Based on <strong>{product.reviewCount}</strong> verified buyer reviews
                </span>
                <span className="text-[#C9CBCC]">·</span>
                <span className="text-[#008450] font-medium">{product.fit} Cut</span>
              </div>

              {/* Price & Savings Row */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-black text-3xl text-[#131814] tabular-nums">
                  ${product.price}
                </span>
                <span className="text-base text-[#71717A] line-through tabular-nums">
                  ${product.originalPrice}
                </span>
                <span className="text-xs font-bold text-[#008450] bg-[#B0FADD]/60 px-2.5 py-1 rounded-[4px]">
                  SAVE {discountPercent}% OFF
                </span>
                <span className="text-xs text-[#71717A] ml-auto hidden sm:inline">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Live Activity Urgency Banner */}
              <div className="bg-[#F1F8FF] border border-[#BFDBFE] rounded-[6px] p-2.5 mb-6 flex items-center gap-2 text-xs text-[#1E3A8A]">
                <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>
                  <strong>{product.viewersCount} non-conformists</strong> viewing right now · <strong>{product.unitsSoldLast24h} sold</strong> in the last 24h
                </span>
              </div>

              {/* Color Details */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#334155] uppercase tracking-wider">
                    Color: <span className="text-[#131814] font-semibold">{product.color}</span>
                  </span>
                  <span className="text-[#71717A]">Pre-shrunk, color-locked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full border-2 border-[#131814] p-0.5 shadow-sm"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span className="text-xs font-medium text-[#4A4F54]">{product.fabric}</span>
                </div>
              </div>

              {/* Size Selector with Responsive Size Guide Modal Trigger Button */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2.5">
                  <span className="font-bold text-[#334155] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Select Size:</span>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-[4px] bg-[#008450] text-white font-display font-bold text-xs shadow-sm">
                      {selectedSize}
                    </span>
                  </span>

                  {/* Open Size Guide Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setShowSizeModal(true)}
                    aria-label="Open Size Guide"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#632668] hover:text-[#813288] bg-[#FDEFFE] hover:bg-[#F9CCFD]/60 active:scale-95 px-3 py-1.5 rounded-[6px] border border-[#F290FA]/60 hover:border-[#D652E1] transition-all cursor-pointer shadow-veirdo-sm"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#632668]" />
                    <span>Open Size Guide</span>
                  </button>
                </div>

                {/* Size options buttons */}
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-11 px-3.5 rounded-[6px] text-xs font-bold transition-all border cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#131814] text-white border-[#131814] shadow-veirdo-sm ring-1 ring-[#131814]'
                          : 'bg-white text-[#334155] border-[#C9CBCC] hover:border-[#131814]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Single Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center border border-[#C9CBCC] rounded-[6px] overflow-hidden bg-white shrink-0 h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 h-full bg-[#F2F2F2] hover:bg-[#EEEEEF] text-base font-bold text-[#131814] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold tabular-nums text-[#131814] min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 h-full bg-[#F2F2F2] hover:bg-[#EEEEEF] text-base font-bold text-[#131814] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Single Primary Action Button following Clear Path to Action principle */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAdd}
                  isLoading={isAdding}
                  className="flex-1 shadow-veirdo-sm h-12 text-sm uppercase tracking-wider font-extrabold"
                >
                  {addedSuccess ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-white" />
                      <span>Added to Bag!</span>
                    </span>
                  ) : (
                    <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </Button>
              </div>

              {/* Fast Delivery Checker */}
              <div className="bg-[#FAF9F6] p-4 rounded-[8px] border border-[#EEEEEF] mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#334155] block mb-2">
                  Check Doorstep Delivery & COD
                </span>
                <form onSubmit={handleCheckDelivery} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter postal code (e.g. 10001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 text-xs border border-[#C9CBCC] bg-white rounded-[5px] px-3 py-2 focus:outline-none focus:border-[#008450]"
                  />
                  <Button type="submit" variant="outline" size="sm">
                    Check
                  </Button>
                </form>
                {pincodeStatus && (
                  <p className="text-xs mt-2 text-[#00653D] font-medium flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#00DA85] shrink-0" />
                    <span>{pincodeStatus}</span>
                  </p>
                )}
              </div>

              {/* Promo Coupon Card */}
              <div className="flex items-center justify-between p-3 rounded-[6px] bg-[#FDEFFE] border border-[#EF7BF9]/50 text-xs mb-6">
                <div>
                  <span className="font-bold text-[#632668] block">Use Coupon: MALL360</span>
                  <span className="text-[#813288] text-[11px]">Get 15% instant discount at checkout</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCoupon('MALL360')}
                  className="px-3 py-1.5 bg-[#632668] hover:bg-[#813288] text-white rounded-[4px] font-bold text-[11px] cursor-pointer flex items-center gap-1"
                >
                  {copiedCoupon ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Signal Pillars */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EEEEEF] text-center text-xs text-[#51575C]">
                <div className="p-2 bg-[#FAFAFA] rounded border border-[#EEEEEF]">
                  <ShieldCheck className="w-4 h-4 text-[#008450] mx-auto mb-1" />
                  <span className="font-bold text-[#131814] block">100% Cotton</span>
                  <span className="text-[10px] text-[#71717A]">{product.gsm} GSM Weight</span>
                </div>
                <div className="p-2 bg-[#FAFAFA] rounded border border-[#EEEEEF]">
                  <Truck className="w-4 h-4 text-[#008450] mx-auto mb-1" />
                  <span className="font-bold text-[#131814] block">24h Dispatch</span>
                  <span className="text-[10px] text-[#71717A]">Tracked Delivery</span>
                </div>
                <div className="p-2 bg-[#FAFAFA] rounded border border-[#EEEEEF]">
                  <RefreshCw className="w-4 h-4 text-[#008450] mx-auto mb-1" />
                  <span className="font-bold text-[#131814] block">7-Day Swap</span>
                  <span className="text-[10px] text-[#71717A]">Doorstep Reverse</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details, Technical Specs & Reviews Tabs */}
        <div className="bg-white rounded-[12px] border border-[#EEEEEF] shadow-sm overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#EEEEEF] bg-[#FAFAFA] px-4 sm:px-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'border-[#008450] text-[#008450]'
                  : 'border-transparent text-[#51575C] hover:text-[#131814]'
              }`}
            >
              Description & Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#008450] text-[#008450]'
                  : 'border-transparent text-[#51575C] hover:text-[#131814]'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-[#008450] text-[#008450]'
                  : 'border-transparent text-[#51575C] hover:text-[#131814]'
              }`}
            >
              Buyer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-base text-[#131814] mb-2">
                    About this Drop
                  </h3>
                  <p className="text-sm text-[#3F3F46] leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#008450] mb-3">
                    Architectural Details & Construction
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#334155]">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#00DA85] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FAF9F6] p-4 rounded-[8px] border border-[#EEEEEF] text-xs space-y-1 text-[#51575C]">
                  <p><strong>Wash & Care Instructions:</strong> {product.washCare}</p>
                  <p><strong>Fit Advice:</strong> Designed with an authentic {product.fit.toLowerCase()} drop. Choose your true size for the intended drape, or size down for a standard tailored fit.</p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA] w-1/3">Fabric Weight</td>
                      <td className="py-3 px-4 text-[#131814] font-semibold">{product.gsm} GSM Heavyweight</td>
                    </tr>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA]">Material Composition</td>
                      <td className="py-3 px-4 text-[#131814] font-semibold">{product.fabric}</td>
                    </tr>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA]">Cut / Fit Type</td>
                      <td className="py-3 px-4 text-[#131814] font-semibold">{product.fit} Cut with Drop Shoulders</td>
                    </tr>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA]">Neckline Construction</td>
                      <td className="py-3 px-4 text-[#131814] font-semibold">{product.neckline}</td>
                    </tr>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA]">Sleeve Style</td>
                      <td className="py-3 px-4 text-[#131814] font-semibold">{product.sleeveType}</td>
                    </tr>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA]">Country of Origin</td>
                      <td className="py-3 px-4 text-[#131814] font-semibold">{product.countryOfOrigin}</td>
                    </tr>
                    <tr className="border-b border-[#EEEEEF]">
                      <td className="py-3 px-4 font-bold text-[#51575C] bg-[#FAFAFA]">Care Instructions</td>
                      <td className="py-3 px-4 text-[#131814]">{product.washCare}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EEEEEF]">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#131814]">
                      Customer Feedback
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-[#E8781C]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-sm text-[#131814]">{product.rating} out of 5</span>
                      <span className="text-xs text-[#71717A]">({product.reviewCount} total ratings)</span>
                    </div>
                  </div>
                  <span className="text-xs bg-[#B0FADD]/40 text-[#00653D] px-3 py-1.5 rounded-full font-bold">
                    98% of buyers recommend this drop
                  </span>
                </div>

                {/* Individual reviews list */}
                <div className="space-y-4">
                  {product.reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-[8px] bg-[#FAFAFA] border border-[#EEEEEF]">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#131814]">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] bg-[#008450] text-white px-1.5 py-0.2 rounded font-bold">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#71717A]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs mb-2">
                        <div className="flex text-[#E8781C]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-[#00653D]">
                          Fit verdict: {rev.fitFeedback}
                        </span>
                      </div>
                      <p className="text-xs text-[#334155] leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Drops Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#008450] block mb-1">
                Complete The Rotation
              </span>
              <h3 className="font-display font-bold text-xl text-[#131814]">
                Related Streetwear Drops
              </h3>
            </div>
            <button
              onClick={onBackToDrops}
              className="text-xs font-bold text-[#008450] hover:text-[#00653D] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all drops</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectProduct(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-[#EEEEEF] rounded-[8px] overflow-hidden hover:border-[#008450] transition-all cursor-pointer group shadow-sm hover:shadow-veirdo-sm"
              >
                <div className="aspect-[3/4] bg-[#F5F5F4] overflow-hidden">
                  <ProductImage
                    src={rel.image}
                    alt={rel.title}
                    loaderSize="sm"
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5">
                  <div className="text-[11px] text-[#71717A] mb-1 font-medium">
                    {rel.category} · {rel.gsm} GSM
                  </div>
                  <h4 className="font-display font-semibold text-xs text-[#131814] truncate mb-2 group-hover:text-[#008450] transition-colors">
                    {rel.title}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-sm text-[#131814] tabular-nums">${rel.price}</span>
                    <span className="text-xs text-[#71717A] line-through tabular-nums">${rel.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Reusable Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        product={product}
        measurements={product.sizeChart}
        selectedSize={selectedSize}
        onSelectSize={(sz) => setSelectedSize(sz as 'S' | 'M' | 'L' | 'XL' | 'XXL')}
      />
    </div>
  );
};
