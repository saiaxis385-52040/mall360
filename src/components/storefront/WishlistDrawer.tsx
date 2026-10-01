import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../data/products';
import { Button } from '../ui/Button';
import { ProductImage } from '../ui/ProductImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
      >
        <div className="p-4 sm:p-5 border-b border-[#EEEEEF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#632668] fill-[#632668]" />
            <h2 className="font-display font-bold text-lg text-[#131814]">
              Saved Drops ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EEEEEF] text-[#334155] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#EEEEEF]">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#FDEFFE] flex items-center justify-center text-[#632668] mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#131814] mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-[#51575C] max-w-xs mb-6">
                Save your favorite streetwear cuts and limited drops to buy later.
              </p>
              <Button variant="primary" onClick={onClose}>
                Browse Drops
              </Button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  loaderSize="xs"
                  containerClassName="w-20 h-24 rounded-[6px] bg-[#F5F5F4] shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-semibold text-xs sm:text-sm text-[#131814] line-clamp-1">
                        {product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="text-[#74797D] hover:text-[#8C1F20] transition-colors p-1 cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#51575C] mt-1 block">
                      {product.gsm} GSM · {product.fit} Cut
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EEEEEF]">
                    <span className="font-display font-bold text-sm text-[#131814] tabular-nums">
                      ${product.price}
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                    >
                      <span>Choose Size</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
