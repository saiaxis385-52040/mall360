import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../data/products';
import { Badge } from '../ui/Badge';
import { Logo } from '../ui/Logo';
import { ProductImage } from '../ui/ProductImage';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize);
      setIsAdding(false);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 1600);
    }, 200);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white border border-[#EEEEEF] rounded-[8px] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#C9CBCC] shadow-veirdo-sm hover:shadow-veirdo-purple cursor-pointer"
    >
      {/* Visual Slot: 3:4 Aspect Ratio Image with Company Logo Reload Ring */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F4]">
        <ProductImage
          src={product.image}
          alt={product.title}
          loaderSize="md"
          containerClassName="w-full h-full"
          className="group-hover:scale-105"
        />

        {/* Top Badges & Wishlist Action */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <Badge
              variant={
                product.badge.includes('Limited')
                  ? 'urgent'
                  : product.badge.includes('Best')
                  ? 'brand'
                  : 'purple'
              }
              className="pointer-events-auto"
            >
              {product.badge}
            </Badge>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="p-1.5 rounded-full bg-white/90 hover:bg-white text-[#131814] shadow-sm pointer-events-auto transition-transform active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-[#632668] text-[#632668]' : 'text-[#334155]'
              }`}
            />
          </button>
        </div>

        {/* Stock urgency indicator */}
        {product.stockLeft && (
          <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
            <span className="bg-[#131814]/85 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px]">
              Only {product.stockLeft} left
            </span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 hover:bg-white text-[#131814] font-display text-xs font-semibold py-2 px-3 rounded-[6px] shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#008450]" />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Unboxed Metadata with clean typographic separators */}
          <div className="flex items-center gap-2 text-xs text-[#51575C] mb-1 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-[#C9CBCC]">·</span>
            <span>{product.gsm} GSM</span>
            <span aria-hidden="true" className="text-[#C9CBCC]">·</span>
            <span className="text-[#008450] font-semibold">{product.fit} Cut</span>
          </div>

          {/* Product Title */}
          <h2 className="font-display font-semibold text-sm sm:text-base text-[#131814] line-clamp-1 group-hover:text-[#008450] transition-colors mb-1.5">
            {product.title}
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-1.5 text-xs text-[#51575C] mb-2.5">
            <div className="flex items-center text-[#E8781C]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-semibold text-[#131814] tabular-nums">
                {product.rating}
              </span>
            </div>
            <span className="text-[#74797D]">({product.reviewCount})</span>
          </div>
        </div>

        <div>
          {/* Price Row (Tabular Figures) */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display font-bold text-lg text-[#131814] tabular-nums">
              ${product.price}
            </span>
            <span className="text-xs text-[#74797D] line-through tabular-nums">
              ${product.originalPrice}
            </span>
            <span className="text-xs font-semibold text-[#008450] tabular-nums">
              Save {discountPercent}%
            </span>
          </div>

          {/* Size Pills & Quick Add */}
          <div className="pt-2 border-t border-[#EEEEEF] flex items-center justify-between gap-2">
            {/* Size options */}
            <div className="flex items-center gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`w-6 h-6 rounded-[4px] text-[11px] font-semibold transition-colors flex items-center justify-center cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#131814] text-white'
                      : 'bg-[#F2F2F2] text-[#334155] hover:bg-[#EEEEEF]'
                  }`}
                  title={`Size ${size}`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-[#74797D] font-medium">+1</span>
              )}
            </div>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`p-2 rounded-[6px] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                showAdded
                  ? 'bg-[#008450] text-white'
                  : 'bg-[#F1F8FF] hover:bg-[#008450] text-[#00653D] hover:text-white border border-[#B0FADD]'
              }`}
              title="Add selected size to bag"
            >
              {isAdding ? (
                <Logo variant="loader" size="xs" isLoading theme="dark" />
              ) : showAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-display font-medium">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
