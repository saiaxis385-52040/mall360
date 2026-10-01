import React, { useState, useEffect } from 'react';
import { X, Ruler, Check, Info, HelpCircle } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

export interface GarmentMeasurement {
  size: string;
  length: string | number;
  chest: string | number;
  shoulder: string | number;
  sleeve: string | number;
  weightGuide?: string;
}

export interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Accepts an array of GarmentMeasurement objects OR a dictionary of sizes.
   * e.g. [ { size: 'S', length: 28, chest: 42, shoulder: 20, sleeve: 8.5 }, ... ]
   */
  measurements?:
    | GarmentMeasurement[]
    | Record<
        string,
        {
          length: string | number;
          chest: string | number;
          shoulder: string | number;
          sleeve: string | number;
          weightGuide?: string;
        }
      >;
  /** Optional product object for convenience */
  product?: {
    title?: string;
    fit?: string;
    modelStats?: string;
    sizeChart?: Record<
      string,
      {
        length: string | number;
        chest: string | number;
        shoulder: string | number;
        sleeve: string | number;
      }
    >;
  };
  title?: string;
  categoryOrFit?: string;
  modelStats?: string;
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
}

type Unit = 'in' | 'cm';

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  measurements,
  product,
  title,
  categoryOrFit,
  modelStats,
  selectedSize = 'M',
  onSelectSize,
}) => {
  const [unit, setUnit] = useState<Unit>('in');
  const [activeTab, setActiveTab] = useState<'matrix' | 'howToMeasure'>('matrix');

  // Normalize measurements into a standardized GarmentMeasurement array
  const normalizedRows: GarmentMeasurement[] = React.useMemo(() => {
    // 1. If explicit array is provided
    if (Array.isArray(measurements)) {
      return measurements;
    }

    // 2. If object dictionary is provided
    if (measurements && typeof measurements === 'object') {
      return Object.entries(measurements).map(([sz, val]) => ({
        size: sz,
        length: val.length,
        chest: val.chest,
        shoulder: val.shoulder,
        sleeve: val.sleeve,
        weightGuide: val.weightGuide,
      }));
    }

    // 3. Fallback to product.sizeChart if provided
    if (product?.sizeChart) {
      return Object.entries(product.sizeChart).map(([sz, val]) => ({
        size: sz,
        length: val.length,
        chest: val.chest,
        shoulder: val.shoulder,
        sleeve: val.sleeve,
      }));
    }

    // Default standard streetwear measurements if none supplied
    return [
      { size: 'S', chest: 42, length: 28, shoulder: 20, sleeve: 8.5, weightGuide: '55–65 kg' },
      { size: 'M', chest: 44, length: 29, shoulder: 21, sleeve: 9.0, weightGuide: '65–75 kg' },
      { size: 'L', chest: 46, length: 30, shoulder: 22, sleeve: 9.5, weightGuide: '75–85 kg' },
      { size: 'XL', chest: 48, length: 31, shoulder: 23, sleeve: 10.0, weightGuide: '85–95 kg' },
      { size: 'XXL', chest: 50, length: 32, shoulder: 24, sleeve: 10.5, weightGuide: '95–110 kg' },
    ];
  }, [measurements, product]);

  const displayTitle = title || product?.title || 'Garment Size Guide & Measurements';
  const displayFit = categoryOrFit || product?.fit || 'Oversized';
  const displayModelStats = modelStats || product?.modelStats || 'Model is 6\'1" (185 cm) wearing size L';

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format dimensions (length, chest, shoulder, sleeve) in inches or centimeters
  const formatDim = (val: string | number, targetUnit: Unit): string => {
    const num = typeof val === 'number' ? val : parseFloat(val);
    if (isNaN(num)) return String(val);
    if (targetUnit === 'cm') {
      return (num * 2.54).toFixed(1) + ' cm';
    }
    return num.toFixed(1) + '″';
  };

  const defaultWeightGuide: Record<string, string> = {
    S: '55 – 65 kg (120–143 lbs)',
    M: '65 – 75 kg (143–165 lbs)',
    L: '75 – 85 kg (165–187 lbs)',
    XL: '85 – 95 kg (187–209 lbs)',
    XXL: '95 – 110 kg (209–242 lbs)',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Semi-translucent backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#090D0A]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Container - Defined radius-xl (12px) border radius & shadow-veirdo-md elevation */}
      <div className="relative w-full max-w-2xl bg-white rounded-[12px] border border-[#EEEEEF] shadow-veirdo-md overflow-hidden z-10 flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#EEEEEF] bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-[#B0FADD]/50 border border-[#54F5B6] flex items-center justify-center text-[#00653D] shrink-0">
              <Ruler className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="size-guide-modal-title"
                  className="font-display font-bold text-sm sm:text-base text-[#131814] tracking-tight"
                >
                  Size Guide & Measurements
                </h3>
                <Badge variant="brand">{displayFit} Cut</Badge>
              </div>
              <p className="text-[11px] text-[#51575C] line-clamp-1 max-w-xs sm:max-w-md">
                {displayTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close size guide modal"
            className="w-8 h-8 rounded-full bg-[#EEEEEF]/70 hover:bg-[#EEEEEF] flex items-center justify-center text-[#74797D] hover:text-[#131814] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar: View Tabs & Unit Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-2.5 bg-[#F5F5F4] border-b border-[#EEEEEF] text-xs shrink-0">
          {/* View Tabs */}
          <div className="flex items-center gap-1 bg-[#EEEEEF] p-0.5 rounded-[6px] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-white text-[#131814] shadow-sm font-semibold'
                  : 'text-[#51575C] hover:text-[#131814]'
              }`}
            >
              Measurements Matrix
            </button>
            <button
              onClick={() => setActiveTab('howToMeasure')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                activeTab === 'howToMeasure'
                  ? 'bg-white text-[#131814] shadow-sm font-semibold'
                  : 'text-[#51575C] hover:text-[#131814]'
              }`}
            >
              How to Measure
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] font-semibold text-[#51575C] uppercase tracking-wider">
              Unit:
            </span>
            <div className="inline-flex rounded-[4px] border border-[#C9CBCC] bg-white p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-[3px] text-xs font-semibold cursor-pointer transition-colors ${
                  unit === 'in'
                    ? 'bg-[#008450] text-white shadow-veirdo-sm'
                    : 'text-[#334155] hover:bg-[#EEEEEF]'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-[3px] text-xs font-semibold cursor-pointer transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#008450] text-white shadow-veirdo-sm'
                    : 'text-[#334155] hover:bg-[#EEEEEF]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'matrix' ? (
            <>
              {/* Model Spec Box */}
              <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-[#F1F8FF] rounded-[8px] border border-[#BFDBFE] text-xs text-[#1E3A8A]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#2563EB]" />
                <div className="space-y-0.5">
                  <p className="font-semibold">
                    Editorial Model Fit:{' '}
                    <span className="font-normal">{displayModelStats}</span>
                  </p>
                  <p className="text-[11px] text-[#334155] leading-relaxed">
                    Designed with an engineered drop-shoulder streetwear silhouette. For signature boxy drape, select your regular size. For standard classic fit, consider sizing down by one.
                  </p>
                </div>
              </div>

              {/* Table of Garment Measurements (Length, Chest, Shoulder, Sleeve) */}
              <div className="overflow-x-auto rounded-[8px] border border-[#EEEEEF] shadow-veirdo-sm bg-white">
                <table className="w-full text-left border-collapse text-xs min-w-[520px]">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EEEEEF] text-[#74797D] uppercase font-semibold text-[11px] tracking-wider">
                      <th className="py-2.5 px-3 sticky left-0 bg-[#FAFAFA] z-10 shadow-[1px_0_0_0_#EEEEEF]">
                        Size
                      </th>
                      <th className="py-2.5 px-3">Length</th>
                      <th className="py-2.5 px-3">Chest</th>
                      <th className="py-2.5 px-3">Shoulder</th>
                      <th className="py-2.5 px-3">Sleeve</th>
                      <th className="py-2.5 px-3">Recommended Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEEEEF]">
                    {normalizedRows.map((row) => {
                      const isCurrent = selectedSize === row.size;
                      return (
                        <tr
                          key={row.size}
                          onClick={() => onSelectSize?.(row.size)}
                          className={`transition-colors cursor-pointer group ${
                            isCurrent
                              ? 'bg-[#B0FADD]/35 hover:bg-[#B0FADD]/50'
                              : 'hover:bg-[#F5F5F4]'
                          }`}
                        >
                          {/* Sticky Size Column for Mobile Horizontal Scroll */}
                          <td
                            className={`py-2.5 px-3 font-display font-bold sticky left-0 z-10 shadow-[1px_0_0_0_#EEEEEF] ${
                              isCurrent ? 'bg-[#D1FBEA]' : 'bg-white group-hover:bg-[#F5F5F4]'
                            }`}
                          >
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] text-xs ${
                                isCurrent
                                  ? 'bg-[#008450] text-white shadow-veirdo-sm'
                                  : 'bg-[#EEEEEF] text-[#131814] group-hover:bg-[#E2E8F0]'
                              }`}
                            >
                              {row.size}
                              {isCurrent && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-[#131814] tabular-nums">
                            {formatDim(row.length, unit)}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-[#131814] tabular-nums">
                            {formatDim(row.chest, unit)}
                          </td>
                          <td className="py-2.5 px-3 text-[#334155] tabular-nums">
                            {formatDim(row.shoulder, unit)}
                          </td>
                          <td className="py-2.5 px-3 text-[#334155] tabular-nums">
                            {formatDim(row.sleeve, unit)}
                          </td>
                          <td className="py-2.5 px-3 text-[#51575C] text-[11px]">
                            {row.weightGuide || defaultWeightGuide[row.size] || '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Fit Guidance Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-[6px] border border-[#EEEEEF] bg-[#FAFAFA]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#008450] block mb-0.5">
                    Signature Oversized
                  </span>
                  <p className="text-xs font-bold text-[#131814]">True to Size</p>
                  <p className="text-[11px] text-[#51575C] mt-0.5">
                    Roomy drop-shoulder silhouette with heavy drape.
                  </p>
                </div>

                <div className="p-3 rounded-[6px] border border-[#EEEEEF] bg-[#FAFAFA]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#632668] block mb-0.5">
                    Classic Regular Fit
                  </span>
                  <p className="text-xs font-bold text-[#131814]">Size Down by 1</p>
                  <p className="text-[11px] text-[#51575C] mt-0.5">
                    Closer fit through torso with standard shoulder line.
                  </p>
                </div>

                <div className="p-3 rounded-[6px] border border-[#EEEEEF] bg-[#FAFAFA]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] block mb-0.5">
                    Baggy Skater Drape
                  </span>
                  <p className="text-xs font-bold text-[#131814]">Size Up by 1</p>
                  <p className="text-[11px] text-[#51575C] mt-0.5">
                    Ultra-relaxed volume and extended streetwear hem.
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* How to Measure Tab */
            <div className="space-y-5">
              <div className="bg-[#F5F5F4] rounded-[8px] p-5 sm:p-6 border border-[#EEEEEF] flex flex-col md:flex-row items-center justify-around gap-6">
                {/* SVG Garment Silhouette with Measurement Guides */}
                <div className="w-52 h-52 sm:w-56 sm:h-56 relative shrink-0">
                  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                    {/* T-Shirt Garment Outline */}
                    <path
                      d="M70 30 C75 42, 125 42, 130 30 L165 48 L152 82 L132 72 L132 175 L68 175 L68 72 L48 82 L35 48 Z"
                      fill="#FFFFFF"
                      stroke="#131814"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />

                    {/* [A] Chest Line (Pit-to-pit) */}
                    <line x1="68" y1="88" x2="132" y2="88" stroke="#00DA85" strokeWidth="2.5" strokeDasharray="3 3" />
                    <circle cx="68" cy="88" r="3" fill="#00DA85" />
                    <circle cx="132" cy="88" r="3" fill="#00DA85" />
                    <rect x="92" y="80" width="16" height="16" rx="3" fill="#008450" />
                    <text x="100" y="92" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>

                    {/* [B] Body Length Line */}
                    <line x1="100" y1="36" x2="100" y2="175" stroke="#632668" strokeWidth="2.5" strokeDasharray="3 3" />
                    <circle cx="100" cy="36" r="3" fill="#632668" />
                    <circle cx="100" cy="175" r="3" fill="#632668" />
                    <rect x="106" y="125" width="16" height="16" rx="3" fill="#632668" />
                    <text x="114" y="137" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">B</text>

                    {/* [C] Shoulder Span */}
                    <line x1="50" y1="48" x2="150" y2="48" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="3 3" />
                    <circle cx="50" cy="48" r="3" fill="#2563EB" />
                    <circle cx="150" cy="48" r="3" fill="#2563EB" />
                    <rect x="92" y="40" width="16" height="16" rx="3" fill="#2563EB" />
                    <text x="100" y="52" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">C</text>

                    {/* [D] Sleeve Length */}
                    <line x1="130" y1="30" x2="165" y2="48" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="3 3" />
                    <circle cx="130" cy="30" r="3" fill="#EA580C" />
                    <circle cx="165" cy="48" r="3" fill="#EA580C" />
                    <rect x="150" y="24" width="16" height="16" rx="3" fill="#EA580C" />
                    <text x="158" y="36" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">D</text>
                  </svg>
                </div>

                {/* Legend list */}
                <div className="space-y-3 flex-1 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-[4px] bg-[#008450] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      A
                    </span>
                    <div>
                      <strong className="text-[#131814] block">Chest (Pit-to-Pit):</strong>
                      <span className="text-[#51575C]">
                        Lay your favorite tee flat. Measure across horizontally 1 inch below the armpit seam.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-[4px] bg-[#632668] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      B
                    </span>
                    <div>
                      <strong className="text-[#131814] block">Garment Body Length:</strong>
                      <span className="text-[#51575C]">
                        Measure vertically from the highest point of the shoulder (HPS) seam straight to the bottom hem.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-[4px] bg-[#2563EB] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      C
                    </span>
                    <div>
                      <strong className="text-[#131814] block">Drop Shoulder Span:</strong>
                      <span className="text-[#51575C]">
                        Measure across the back from the outer drop-shoulder seam to the opposite seam.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-[4px] bg-[#EA580C] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      D
                    </span>
                    <div>
                      <strong className="text-[#131814] block">Sleeve Length:</strong>
                      <span className="text-[#51575C]">
                        Measure along the top edge of the sleeve from the shoulder junction down to the cuff edge.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-shrunk cotton note */}
              <div className="p-3.5 sm:p-4 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2.5 sm:gap-3">
                <HelpCircle className="w-5 h-5 shrink-0 text-[#D97706]" />
                <div>
                  <p className="font-semibold text-[#78350F]">Pre-Shrunk 240+ GSM Cotton Guarantee</p>
                  <p className="mt-0.5 text-[11px] text-[#92400E] leading-relaxed">
                    Our streetwear blanks undergo cold bio-washing prior to precision cutting. Dimensions remain stable within &plusmn;0.5 inches after standard cold machine washing and line drying.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-[#EEEEEF] bg-[#FAFAFA] shrink-0">
          <div className="text-xs text-[#51575C]">
            Selected Size:
            <span className="font-display font-extrabold text-[#008450] text-sm ml-1.5">
              {selectedSize}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
              }}
            >
              Confirm Size {selectedSize}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
