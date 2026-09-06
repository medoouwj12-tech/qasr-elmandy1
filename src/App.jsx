import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MenuProvider, useMenu } from './context/MenuContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { InstallAppPrompt } from './components/InstallAppPrompt';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingCartBar } from './components/FloatingCartBar';
import { ShoppingBag, UtensilsCrossed, Sparkles, ChefHat } from 'lucide-react';

const MainMenuContent = () => {
  const { filteredProducts, activeCategory, categories, searchQuery } = useMenu();
  const { isCartOpen, setIsCartOpen, totalItems, totalPrice } = useCart();

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const safeProducts = Array.isArray(filteredProducts) ? filteredProducts : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const activeCategoryObj = safeCategories.find((c) => c.id === activeCategory);

  const safeTotalPrice = (Number(totalPrice) || 0).toLocaleString();

  const handleOpenCategories = () => {
    const el = document.getElementById('category-nav');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    const el = document.getElementById('main-search-input');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => el.focus(), 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0f12] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* PWA / Mobile App Install Prompt */}
      <InstallAppPrompt />

      {/* Header */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Category Navigation Bar */}
      <CategoryNav />

      {/* Hero Banner Section */}
      <section className="relative py-8 md:py-12 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#12161f] via-[#0d0f12] to-[#0d0f12]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>أصالة الطهي العربي والخليجي • طازج يومياً</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              أهلاً بكم في منيو <span className="text-gold-gradient">قصر المندي</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              اختر وجباتك المفضلة من المندي، المشويات، والصواني الملوكية، واطلب مباشرة عبر الواتساب ليصلك الطلب في أسرع وقت.
            </p>
          </div>
        </div>
      </section>

      {/* Main Products Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 pt-6 pb-32 md:py-8 w-full">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 space-x-reverse">
            <ChefHat className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              {activeCategory === 'all'
                ? 'جميع الوجبات والأصناف'
                : activeCategoryObj
                ? activeCategoryObj.name_ar
                : 'الأصناف المتاحة'}
            </h3>
            {searchQuery && (
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold">
                نتائج البحث: "{searchQuery}"
              </span>
            )}
          </div>

          <span className="text-xs text-slate-400 font-bold">
            عدد الأصناف: ({safeProducts.length})
          </span>
        </div>

        {/* Products Grid */}
        {safeProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 glass-card rounded-2xl max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-600 border border-slate-800">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-200">لم يتم العثور على وجبات</h4>
              <p className="text-xs text-slate-400 mt-1">
                جرب البحث بكلمات أخرى أو اختر قسماً آخر من المنيو
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile Sticky Floating Cart Bar */}
      <FloatingCartBar onOpenCart={() => setIsCartOpen(true)} />

      {/* Desktop Floating Cart Button */}
      {totalItems > 0 && (
        <div className="hidden md:block fixed bottom-6 left-8 z-30 animate-fade-in">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black px-5 py-3.5 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center space-x-3 space-x-reverse border-2 border-amber-300 active:scale-95 transition-all cursor-pointer"
          >
            <div className="bg-slate-950 text-amber-300 text-xs font-black w-7 h-7 rounded-full flex items-center justify-center">
              {totalItems}
            </div>
            <span className="text-sm font-black">سلة الطلبات ({safeTotalPrice} ج.م)</span>
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCategories={handleOpenCategories}
        onFocusSearch={handleFocusSearch}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WhatsAppCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <MenuProvider>
        <CartProvider>
          <MainMenuContent />
        </CartProvider>
      </MenuProvider>
    </ErrorBoundary>
  );
}
