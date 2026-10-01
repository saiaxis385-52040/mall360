import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS } from '../../data/products';
import { ProductImage } from '../ui/ProductImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.fit.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-2xl rounded-[12px] shadow-2xl overflow-hidden border border-[#EEEEEF]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EEEEEF] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#74797D]" />
          <input
            type="text"
            autoFocus
            placeholder="Search oversized tees, 240 GSM, acid wash, hoodies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base text-[#131814] placeholder-[#74797D] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#74797D] hover:text-[#131814] p-1 cursor-pointer text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#EEEEEF] text-[#334155] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-[#EEEEEF]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#74797D] pb-2">
            {query.trim() ? `Search Results (${filteredProducts.length})` : 'Popular Recommendations'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#51575C]">
              No streetwear items match &quot;{query}&quot;. Try searching for &quot;Acid Wash&quot;, &quot;240 GSM&quot;, or &quot;Hoodie&quot;.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between gap-3 hover:bg-[#F1F8FF] px-2 rounded-[6px] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <ProductImage
                    src={product.image}
                    alt={product.title}
                    loaderSize="xs"
                    containerClassName="w-12 h-14 rounded-[4px] bg-[#F5F5F4] shrink-0"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#131814] group-hover:text-[#008450] transition-colors line-clamp-1">
                      {product.title}
                    </h4>
                    <span className="text-[11px] text-[#51575C]">
                      {product.category} · {product.gsm} GSM · {product.fit} Cut
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-[#131814] tabular-nums">
                    ${product.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#74797D] group-hover:text-[#008450] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
