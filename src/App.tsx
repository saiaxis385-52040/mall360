/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from './data/products';
import { INITIAL_USER_PROFILE } from './data/mockUser';
import { UserProfile, Order } from './types/user';
import { Header } from './components/storefront/Header';
import { AnnouncementBanner } from './components/storefront/AnnouncementBanner';
import { HeroSection } from './components/storefront/HeroSection';
import { FilterBar } from './components/storefront/FilterBar';
import { ProductCard } from './components/storefront/ProductCard';
import { ProductDetailPage } from './components/storefront/ProductDetailPage';
import { CartDrawer, CartItem } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { SearchModal } from './components/storefront/SearchModal';
import { WishlistDrawer } from './components/storefront/WishlistDrawer';
import { ProfileModal } from './components/storefront/ProfileModal';
import { UserProfileSection } from './components/storefront/UserProfileSection';
import { ReferAndEarnSection } from './components/storefront/ReferAndEarnSection';
import { TrustSection } from './components/storefront/TrustSection';
import { Footer } from './components/storefront/Footer';
import { SplashScreen } from './components/ui/SplashScreen';
import { SectionLoader } from './components/ui/SectionLoader';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'storefront' | 'profile'>('storefront');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedFit, setSelectedFit] = useState<string>('All Fits');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const [loadingSectionName, setLoadingSectionName] = useState('All Drops');

  // Active PDP Product state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState<
    'orders' | 'addresses' | 'profile' | 'wallet' | 'refer' | 'payments' | 'settings'
  >('orders');

  // Amazon / Flipkart User Profile with persistence
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mall360_user_profile');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Cart & Wishlist state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mall360_cart');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'mall360-01',
              product: PRODUCTS[0],
              size: 'L',
              quantity: 1,
            },
          ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mall360_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1]];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mall360_user_profile', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('mall360_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mall360_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  const handleOpenProfile = (
    tab: 'orders' | 'addresses' | 'profile' | 'wallet' | 'refer' | 'payments' | 'settings' = 'orders'
  ) => {
    setProfileInitialTab(tab);
    setIsProfileOpen(true);
  };

  const handleOpenFullProfile = (tab?: string) => {
    setSelectedProduct(null);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { id: product.id, product, size, quantity }];
    });
    showToast(`Added ${product.title.split(' ')[0]} (${size}) to Bag!`);
  };

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const handleUpdateSize = (
    id: string,
    oldSize: string,
    newSize: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  ) => {
    setCart((prev) => {
      const targetIndex = prev.findIndex((item) => item.id === id && item.size === oldSize);
      if (targetIndex === -1) return prev;
      const target = prev[targetIndex];

      const existingWithNewSizeIndex = prev.findIndex(
        (item) => item.id === id && item.size === newSize
      );
      if (existingWithNewSizeIndex !== -1 && existingWithNewSizeIndex !== targetIndex) {
        const next = prev.filter((_, idx) => idx !== targetIndex);
        const mergedIndex = next.findIndex((item) => item.id === id && item.size === newSize);
        next[mergedIndex] = {
          ...next[mergedIndex],
          quantity: next[mergedIndex].quantity + target.quantity,
        };
        return next;
      }

      const next = [...prev];
      next[targetIndex] = { ...target, size: newSize };
      return next;
    });
    showToast(`Updated size to ${newSize}`);
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  // Repeat Order from Profile
  const handleRepeatOrder = (order: Order) => {
    order.items.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId) || PRODUCTS[0];
      handleAddToCart(prod, item.size as any, item.quantity);
    });
    setIsProfileOpen(false);
    setIsCartOpen(true);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Saved`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isProductWishlisted = (id: string) => wishlist.some((p) => p.id === id);

  // Filter & Sorting Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesFit = selectedFit === 'All Fits' || product.fit === selectedFit;
    return matchesCategory && matchesFit;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const cartTotalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Logo-powered section and category navigation loader
  const handleNavigateSection = (category: string, scrollToCatalog: boolean = false) => {
    setCurrentView('storefront');
    setLoadingSectionName(category);
    setIsSectionLoading(true);

    setTimeout(() => {
      setSelectedProduct(null); // Return to catalog view
      setSelectedCategory(category);
      setIsSectionLoading(false);
      if (scrollToCatalog) {
        const catalogElement = document.getElementById('catalog-section');
        if (catalogElement) {
          catalogElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 450);
  };

  // Logo-powered Product Details Page Loader
  const handleOpenProductDetails = (product: Product) => {
    setCurrentView('storefront');
    setLoadingSectionName(product.title);
    setIsSectionLoading(true);

    setTimeout(() => {
      setSelectedProduct(product);
      setIsSectionLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 380);
  };

  return (
    <div className="min-h-screen bg-white text-[#131814] flex flex-col font-body selection:bg-[#00DA85] selection:text-[#062A1D]">
      {/* 1. App-wide Brand Splash Screen Animation on Initial Launch */}
      <SplashScreen />

      {/* 2. Top Global Announcement Bar */}
      <AnnouncementBanner />

      {/* 3. Global Responsive Header with Profile & Cart */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => handleNavigateSection(cat, false)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        user={user}
        onOpenProfile={handleOpenProfile}
        onOpenFullProfile={handleOpenFullProfile}
      />

      {/* 4. Smooth Section Loader Transition */}
      <SectionLoader
        isVisible={isSectionLoading}
        sectionName={loadingSectionName}
      />

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#131814] text-white px-4 py-2.5 rounded-[6px] shadow-veirdo-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-from-bottom-2 duration-150 border border-[#00DA85]">
          <span className="w-2 h-2 rounded-full bg-[#00DA85] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'profile' ? (
          /* Full Flipkart / Amazon User Profile Section */
          <UserProfileSection
            user={user}
            onUpdateUser={setUser}
            onBackToStorefront={() => setCurrentView('storefront')}
            onRepeatOrder={handleRepeatOrder}
            onShowToast={showToast}
          />
        ) : selectedProduct ? (
          /* Dedicated PDP View */
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            isWishlisted={isProductWishlisted(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBackToDrops={() => setSelectedProduct(null)}
            onSelectProduct={(p: Product) => handleOpenProductDetails(p)}
          />
        ) : (
          /* Catalog / Landing Storefront View */
          <>
            <HeroSection
              onShopClick={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreAcidWash={() => handleNavigateSection('Acid Wash', true)}
            />

            {/* Filter Bar */}
            <FilterBar
              selectedCategory={selectedCategory}
              selectedFit={selectedFit}
              sortBy={sortBy}
              onSelectCategory={(cat: string) => handleNavigateSection(cat, true)}
              onSelectFit={setSelectedFit}
              onSortChange={setSortBy}
              totalProducts={filteredProducts.length}
            />

            {/* Product Grid Section */}
            <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#EEEEEF]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#131814]">
                      {selectedCategory === 'All Products' ? 'All Streetwear Drops' : selectedCategory}
                    </h2>
                    <span className="bg-[#B0FADD] text-[#00653D] text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                      240+ GSM
                    </span>
                  </div>
                  <p className="text-xs text-[#51575C] mt-1">
                    Heavy combed cotton garments engineered with signature drop-shoulder drapes.
                  </p>
                </div>

                <div className="mt-3 sm:mt-0 text-xs font-semibold text-[#51575C]">
                  Showing <strong className="text-[#131814]">{filteredProducts.length}</strong> styles
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <p className="text-sm font-bold text-[#131814]">No products match your current filters.</p>
                  <p className="text-xs text-[#51575C]">Try switching categories or clearing your fit preference.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All Products');
                      setSelectedFit('All Fits');
                    }}
                    className="text-xs font-bold text-[#008450] hover:underline cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={isProductWishlisted(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onQuickView={handleOpenProductDetails}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Refer & Earn Section: UNBOXED, NO CARD as strictly requested */}
            <ReferAndEarnSection user={user} onCopySuccess={showToast} />

            {/* Trust Signals Section */}
            <TrustSection />
          </>
        )}
      </main>

      {/* Global E-Commerce Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateSize={handleUpdateSize}
        onRemoveItem={handleRemoveFromCart}
        onAddToCart={handleAddToCart}
        user={user}
        onOpenProfile={handleOpenProfile}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => {
          setIsCartOpen(false);
          handleNavigateSection('All Products', true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onQuickView={(p) => {
          setIsWishlistOpen(false);
          handleOpenProductDetails(p);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          handleOpenProductDetails(p);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        totalAmount={cartTotalAmount}
        user={user}
        onOrderComplete={(newOrder) => {
          if (newOrder) {
            setUser((prev) => ({
              ...prev,
              orders: [newOrder, ...prev.orders],
              superCoins: prev.superCoins + Math.round(newOrder.totalAmount * 0.5),
            }));
          }
          setCart([]);
          localStorage.removeItem('mall360_cart');
          showToast('🎉 Order placed! You can track it in Your Orders.');
        }}
      />

      {/* Amazon & Flipkart Style Account & Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={setUser}
        initialTab={profileInitialTab}
        onRepeatOrder={handleRepeatOrder}
      />

      {/* Redesigned Premier Footer with Running Marquee Rail */}
      <Footer onCategoryClick={(cat) => handleNavigateSection(cat, true)} />
    </div>
  );
}
