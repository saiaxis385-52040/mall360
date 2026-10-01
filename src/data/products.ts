export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  fitFeedback: string;
}

export interface ProductDimension {
  chest: string;
  length: string;
  shoulder: string;
  sleeve: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: 'Oversized Tees' | 'Acid Wash' | 'Winter Hoodies' | 'Graphic Tees';
  fit: 'Oversized' | 'Relaxed' | 'Boxy';
  price: number;
  originalPrice: number;
  gsm: number;
  fabric: string;
  color: string;
  colorHex: string;
  image: string;
  gallery: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockLeft?: number;
  badge?: string;
  description: string;
  details: string[];
  washCare: string;
  neckline: string;
  sleeveType: string;
  countryOfOrigin: string;
  modelStats: string;
  viewersCount: number;
  unitsSoldLast24h: number;
  reviewsList: ProductReview[];
  sizeChart: Record<string, ProductDimension>;
}

export const PRODUCTS: Product[] = [
  {
    id: 'mall360-01',
    sku: 'M360-TYPO-240-BNE',
    title: 'Stay Sick Red Heavyweight Oversized Graphic Tee',
    category: 'Oversized Tees',
    fit: 'Oversized',
    price: 32,
    originalPrice: 48,
    gsm: 240,
    fabric: '100% Super-Combed Compact Cotton',
    color: 'Bone Off-White',
    colorHex: '#F6F5F2',
    image: '/src/assets/images/product_oversized_graphic_tee_1790827652079.jpg',
    gallery: [
      '/src/assets/images/product_oversized_graphic_tee_1790827652079.jpg',
      '/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg',
      '/src/assets/images/product_acid_wash_tee_1790827671459.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 428,
    inStock: true,
    badge: 'Exclusive Drop',
    description: 'A signature Mall360 statement piece engineered from 240 GSM ultra-compact combed yarn. Boasts an archival typographic high-density screenprint across the upper shoulder blades that will not crack or blister through repeated washing. The relaxed drop-shoulder cut gives an architectural drape without ballooning at the hem.',
    details: [
      '240 GSM 100% Combed Compact Cotton',
      'Plastisol + High-Density Cured Screenprint',
      'Double-stitched 1.25" rib knit crew collar',
      'Pre-washed and enzyme treated to eliminate shrinkage',
      'Zero synthetic blend guarantees maximum breathability'
    ],
    washCare: 'Machine wash cold (30°C) with similar tones. Turn inside out before washing. Do not tumble dry. Iron on reverse only.',
    neckline: '1.25-inch Heavy Ribbed Crew Neck',
    sleeveType: 'Elbow-Length Drop Shoulder',
    countryOfOrigin: 'Crafted in Tirupur, India',
    modelStats: 'Model is 6\'1" (185cm) with 39" chest wearing size L for intentional streetwear drape',
    viewersCount: 47,
    unitsSoldLast24h: 38,
    sizeChart: {
      'S': { chest: '42 in', length: '28.5 in', shoulder: '21 in', sleeve: '9.2 in' },
      'M': { chest: '44 in', length: '29.5 in', shoulder: '22 in', sleeve: '9.6 in' },
      'L': { chest: '46 in', length: '30.5 in', shoulder: '23 in', sleeve: '10.0 in' },
      'XL': { chest: '48 in', length: '31.5 in', shoulder: '24 in', sleeve: '10.4 in' },
      'XXL': { chest: '50 in', length: '32.5 in', shoulder: '25 in', sleeve: '10.8 in' },
    },
    reviewsList: [
      {
        id: 'rev-101',
        author: 'Devon K.',
        rating: 5,
        date: '2 days ago',
        verified: true,
        comment: 'The collar does not sag or curl up like ordinary fast fashion blanks. 240 GSM weight holds an immaculate boxy silhouette.',
        fitFeedback: 'Perfect Oversized'
      },
      {
        id: 'rev-102',
        author: 'Marcus Vance',
        rating: 5,
        date: '1 week ago',
        verified: true,
        comment: 'Print texture is crazy good. Crisp rubberized lettering with deep color contrast. Definitely getting the charcoal colorway next.',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'mall360-02',
    sku: 'M360-ACID-260-CHR',
    title: 'Artisanal Mineral Acid Wash Drop-Shoulder Tee',
    category: 'Acid Wash',
    fit: 'Relaxed',
    price: 36,
    originalPrice: 52,
    gsm: 260,
    fabric: '100% Mineral Salt-Washed Raw Cotton',
    color: 'Charcoal Mineral Fade',
    colorHex: '#2A2D30',
    image: '/src/assets/images/product_acid_wash_tee_1790827671459.jpg',
    gallery: [
      '/src/assets/images/product_acid_wash_tee_1790827671459.jpg',
      '/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg',
      '/src/assets/images/product_cyberpunk_hoodie_1790827683918.jpg',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    stockLeft: 7,
    badge: 'Artisan Batch',
    description: 'Individually dipped in a custom volcanic mineral wash bath. No two shirts share identical marbling or cloud striations. Heavy 260 GSM single jersey provides a weathered, vintage tactile hand feel while remaining surprisingly soft on the skin.',
    details: [
      '260 GSM Heavyweight Raw Single Jersey',
      'Artisanal hand-applied mineral wash finish',
      'Blind hem stitch on sleeves and bottom hem',
      'Distressed micro-frayed neck binding for genuine vintage aesthetics',
      'Color-fast treatment preserves the smoky cloud patina'
    ],
    washCare: 'Hand wash or gentle cycle in cold water. Wash separately for first two laundry cycles. Dry in shade.',
    neckline: 'Raw-Edge Reinforced Ribbed Neck',
    sleeveType: 'Relaxed Extended Slouch Sleeve',
    countryOfOrigin: 'Crafted in Ahmedabad, India',
    modelStats: 'Model is 5\'11" (180cm) with 38" chest wearing size M',
    viewersCount: 63,
    unitsSoldLast24h: 24,
    sizeChart: {
      'M': { chest: '43 in', length: '29 in', shoulder: '21.5 in', sleeve: '9.4 in' },
      'L': { chest: '45 in', length: '30 in', shoulder: '22.5 in', sleeve: '9.8 in' },
      'XL': { chest: '47 in', length: '31 in', shoulder: '23.5 in', sleeve: '10.2 in' },
      'XXL': { chest: '49 in', length: '32 in', shoulder: '24.5 in', sleeve: '10.6 in' },
    },
    reviewsList: [
      {
        id: 'rev-201',
        author: 'Julian R.',
        rating: 5,
        date: '3 days ago',
        verified: true,
        comment: 'The mineral wash is authentic. Does not look like fake digital printing at all. It feels like a prized 90s band tee.',
        fitFeedback: 'Runs Slightly Big'
      },
      {
        id: 'rev-202',
        author: 'Siddharth M.',
        rating: 4,
        date: '2 weeks ago',
        verified: true,
        comment: 'Solid fabric weight. The charcoal hue is subtle and matches perfectly with beige cargo pants.',
        fitFeedback: 'Perfect Oversized'
      }
    ]
  },
  {
    id: 'mall360-03',
    sku: 'M360-HOOD-380-EMR',
    title: 'Brutalist 380 GSM Heavy French Terry Boxy Hoodie',
    category: 'Winter Hoodies',
    fit: 'Boxy',
    price: 68,
    originalPrice: 95,
    gsm: 380,
    fabric: '100% Combed French Terry Loopknit',
    color: 'Forest Racing Emerald',
    colorHex: '#0D3827',
    image: '/src/assets/images/product_cyberpunk_hoodie_1790827683918.jpg',
    gallery: [
      '/src/assets/images/product_cyberpunk_hoodie_1790827683918.jpg',
      '/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg',
      '/src/assets/images/product_oversized_graphic_tee_1790827652079.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewCount: 189,
    inStock: true,
    badge: 'Winter Core',
    description: 'Built for freezing urban climates and severe silhouettes. Tailored from 380 GSM heavyweight French Terry with zero polyester fill. Features a double-layered rigid crossover hood that stands erect without flimsy drawstrings, bar-tacked kangaroo pocket, and hidden interior phone sleeve.',
    details: [
      '380 GSM Heavyweight French Terry Loopknit',
      'Structured double-ply hood (holds rigid upright posture)',
      'Drawstring-free minimalist crossover neckline',
      'Side ribbed ribbed action panels for mobility',
      'Deep kangaroo pouch pocket with reinforced bartacks'
    ],
    washCare: 'Cold wash inside out. Lay flat to dry to maintain shape. Do not bleach. Cool iron if necessary.',
    neckline: 'Architectural Crossover Double-Layer Hood',
    sleeveType: 'Full Length with Heavy Ribbed Cuffs',
    countryOfOrigin: 'Engineered in Ludhiana, India',
    modelStats: 'Model is 6\'2" (188cm) with 41" chest wearing size L',
    viewersCount: 82,
    unitsSoldLast24h: 49,
    sizeChart: {
      'S': { chest: '46 in', length: '27.5 in', shoulder: '22 in', sleeve: '24 in' },
      'M': { chest: '48 in', length: '28.5 in', shoulder: '23 in', sleeve: '24.5 in' },
      'L': { chest: '50 in', length: '29.5 in', shoulder: '24 in', sleeve: '25 in' },
      'XL': { chest: '52 in', length: '30.5 in', shoulder: '25 in', sleeve: '25.5 in' },
    },
    reviewsList: [
      {
        id: 'rev-301',
        author: 'Arjun Sen',
        rating: 5,
        date: 'Yesterday',
        verified: true,
        comment: 'Best hoodie on the market hands down. The hood stands up on its own without collapsing. Zero cheap drawstring clutter.',
        fitFeedback: 'Perfect Boxy Cut'
      },
      {
        id: 'rev-302',
        author: 'Kasper N.',
        rating: 5,
        date: '5 days ago',
        verified: true,
        comment: 'Pure 380 GSM French Terry goodness. Heavyweight feel that insulates without making you sweaty indoors.',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'mall360-04',
    sku: 'M360-MONO-240-ECR',
    title: 'Architectural Monolith Heavyweight Graphic Tee',
    category: 'Graphic Tees',
    fit: 'Oversized',
    price: 34,
    originalPrice: 46,
    gsm: 240,
    fabric: '100% Ring-Spun Unbleached Cotton',
    color: 'Raw Natural Ecru',
    colorHex: '#ECE7DD',
    image: '/src/assets/images/product_oversized_graphic_tee_1790827652079.jpg',
    gallery: [
      '/src/assets/images/product_oversized_graphic_tee_1790827652079.jpg',
      '/src/assets/images/product_acid_wash_tee_1790827671459.jpg',
      '/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 164,
    inStock: true,
    badge: 'Brutalist Drop',
    description: 'Inspired by raw brutalist architecture and mathematical grids. Crafted on unbleached raw ecru cotton that celebrates natural speckling and fiber variations. Screen-printed with archival matte ink that softens with age.',
    details: [
      '240 GSM Unbleached Ring-Spun Cotton',
      'Matte soft-hand pigment print',
      'Twin-needle hem and armhole detailing',
      'Side split vents for fluid lower-hem drape',
      'Anti-pilling enzyme treated yarn'
    ],
    washCare: 'Machine wash cold with mild detergent. Do not dry clean. Hang dry in shade.',
    neckline: '1.25" Dense Rib Knit Collar',
    sleeveType: 'Wide Cut Drop Shoulder',
    countryOfOrigin: 'Crafted in Tirupur, India',
    modelStats: 'Model is 6\'0" (183cm) wearing size M for relaxed street fit',
    viewersCount: 31,
    unitsSoldLast24h: 17,
    sizeChart: {
      'S': { chest: '42 in', length: '28 in', shoulder: '21 in', sleeve: '9 in' },
      'M': { chest: '44 in', length: '29 in', shoulder: '22 in', sleeve: '9.5 in' },
      'L': { chest: '46 in', length: '30 in', shoulder: '23 in', sleeve: '10 in' },
      'XL': { chest: '48 in', length: '31 in', shoulder: '24 in', sleeve: '10.5 in' },
    },
    reviewsList: [
      {
        id: 'rev-401',
        author: 'Lucas P.',
        rating: 5,
        date: '4 days ago',
        verified: true,
        comment: 'The natural ecru color looks much more premium than stark bleached white. Subtle architectural graphics on point.',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'mall360-05',
    sku: 'M360-SMK-250-GRY',
    title: 'Smoky Cloud Acid Wash Relaxed Fit Tee',
    category: 'Acid Wash',
    fit: 'Oversized',
    price: 35,
    originalPrice: 50,
    gsm: 250,
    fabric: '100% Stone-Washed Jersey Cotton',
    color: 'Smoke Storm Grey',
    colorHex: '#474D52',
    image: '/src/assets/images/product_acid_wash_tee_1790827671459.jpg',
    gallery: [
      '/src/assets/images/product_acid_wash_tee_1790827671459.jpg',
      '/src/assets/images/product_cyberpunk_hoodie_1790827683918.jpg',
      '/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewCount: 220,
    inStock: true,
    badge: 'Trending Now',
    description: 'Tumbled with organic pumice stone and reactive dyes to generate a high-contrast smoky nebula effect. Cut in a wider chest circumference with dropped armholes, ensuring no armpit constriction even during active wear.',
    details: [
      '250 GSM Pure Stone-Washed Jersey Cotton',
      'Reactive pigment dye lock resists color leeching',
      'Tonal neck taping for itch-free all-day wear',
      'Relaxed drop-shoulder cut',
      'Heavy double-stitched hemline'
    ],
    washCare: 'Cold water wash only. Do not soak. Line dry inside-out away from direct sun.',
    neckline: 'Thick Bound Crew Collar',
    sleeveType: 'Relaxed Drop Sleeve',
    countryOfOrigin: 'Crafted in Surat, India',
    modelStats: 'Model is 5\'10" (178cm) wearing size L for exaggerated streetwear drape',
    viewersCount: 55,
    unitsSoldLast24h: 32,
    sizeChart: {
      'S': { chest: '43 in', length: '28.5 in', shoulder: '21.5 in', sleeve: '9.3 in' },
      'M': { chest: '45 in', length: '29.5 in', shoulder: '22.5 in', sleeve: '9.7 in' },
      'L': { chest: '47 in', length: '30.5 in', shoulder: '23.5 in', sleeve: '10.1 in' },
      'XL': { chest: '49 in', length: '31.5 in', shoulder: '24.5 in', sleeve: '10.5 in' },
      'XXL': { chest: '51 in', length: '32.5 in', shoulder: '25.5 in', sleeve: '10.9 in' },
    },
    reviewsList: [
      {
        id: 'rev-501',
        author: 'Rohan Joshi',
        rating: 5,
        date: '6 days ago',
        verified: true,
        comment: 'Color is insane in sunlight! Soft yet very heavy. Wore it to a concert and got multiple compliments.',
        fitFeedback: 'Perfect Oversized'
      }
    ]
  },
  {
    id: 'mall360-06',
    sku: 'M360-PULL-360-PIN',
    title: 'Deep Pine Thermal Brushed Heavyweight Pullover',
    category: 'Winter Hoodies',
    fit: 'Boxy',
    price: 64,
    originalPrice: 88,
    gsm: 360,
    fabric: '100% Thermal Brushed Cotton Fleece',
    color: 'Midnight Pine Green',
    colorHex: '#143428',
    image: '/src/assets/images/product_cyberpunk_hoodie_1790827683918.jpg',
    gallery: [
      '/src/assets/images/product_cyberpunk_hoodie_1790827683918.jpg',
      '/src/assets/images/hero_streetwear_veirdo_1790827637825.jpg',
      '/src/assets/images/product_oversized_graphic_tee_1790827652079.jpg',
    ],
    sizes: ['M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 95,
    inStock: true,
    badge: 'Last Few Left',
    description: 'Engineered for bitter seasonal winds. The interior is mechanically sheared with brass wire bristles to produce a plush cashmere-like brushed fleece pile that traps ambient body warmth while remaining completely breathable.',
    details: [
      '360 GSM Brushed Back Cotton Fleece',
      'Ultra-dense thermal fleece inner lining',
      'Engineered stretch ribbed side panels for unrestricted reach',
      'Bar-tack reinforced stress points',
      'Hidden kangaroo media pocket with headphone cord port'
    ],
    washCare: 'Machine wash delicate cold. Do not wring or twist. Tumble dry ultra low or dry flat.',
    neckline: 'Double-Layer Ergonomic Contoured Hood',
    sleeveType: 'Heavy Spun-Rib Cuff Full Sleeve',
    countryOfOrigin: 'Crafted in Tirupur, India',
    modelStats: 'Model is 6\'1" (185cm) wearing size L',
    viewersCount: 41,
    unitsSoldLast24h: 21,
    sizeChart: {
      'M': { chest: '47 in', length: '28 in', shoulder: '22.5 in', sleeve: '24 in' },
      'L': { chest: '49 in', length: '29 in', shoulder: '23.5 in', sleeve: '24.5 in' },
      'XL': { chest: '51 in', length: '30 in', shoulder: '24.5 in', sleeve: '25 in' },
    },
    reviewsList: [
      {
        id: 'rev-601',
        author: 'Elijah B.',
        rating: 5,
        date: '1 week ago',
        verified: true,
        comment: 'The fleece on the inside is softer than any sweatshirt I own. The pine green shade is very rich.',
        fitFeedback: 'True to Size'
      }
    ]
  }
];

export const CATEGORIES = ['All Products', 'Oversized Tees', 'Acid Wash', 'Winter Hoodies', 'Graphic Tees'] as const;
export const FITS = ['All Fits', 'Oversized', 'Relaxed', 'Boxy'] as const;
