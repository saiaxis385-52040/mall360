import React from 'react';
import { Filter, SlidersHorizontal, Check } from 'lucide-react';
import { CATEGORIES, FITS } from '../../data/products';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedFit: string;
  onSelectFit: (fit: string) => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  onSortChange: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  totalProducts: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedFit,
  onSelectFit,
  sortBy,
  onSortChange,
  totalProducts,
}) => {
  return (
    <div className="bg-white border-b border-[#EEEEEF] sticky top-16 z-30 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs (Segmented interactive buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#131814] text-white shadow-veirdo-sm'
                      : 'bg-[#F2F2F2] text-[#334155] hover:bg-[#EEEEEF] hover:text-[#131814]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Fit selector & Sort */}
          <div className="flex items-center gap-3 self-end lg:self-auto text-xs">
            {/* Fit filter */}
            <div className="flex items-center gap-1 bg-[#F2F2F2] p-1 rounded-[6px]">
              <span className="text-[#74797D] px-2 font-medium hidden sm:inline">Cut:</span>
              {FITS.map((fit) => (
                <button
                  key={fit}
                  onClick={() => onSelectFit(fit)}
                  className={`px-2.5 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
                    selectedFit === fit
                      ? 'bg-white text-[#131814] shadow-sm font-semibold'
                      : 'text-[#51575C] hover:text-[#131814]'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="text-[#51575C] font-medium hidden sm:inline">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-white border border-[#C9CBCC] rounded-[5px] px-2.5 py-1.5 text-xs text-[#131814] font-medium focus:outline-none focus:border-[#008450] cursor-pointer"
              >
                <option value="featured">Featured Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Product count display */}
            <span className="text-[#74797D] tabular-nums font-medium pl-1">
              ({totalProducts})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
