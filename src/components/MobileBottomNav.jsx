import React from 'react';
import { Home, Utensils, Search, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

export const MobileBottomNav = ({ onOpenCart, onOpenCategories, onFocusSearch }) => {
  const { totalItems, totalPrice } = useCart();
  const { setActiveCategory, setSearchQuery } = useMenu();

  const handleHomeClick = () => {
    setActiveCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const safeTotal = (Number(totalPrice) || 0).toLocaleString();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e1219]/95 backdrop-blur-xl border-t border-amber-900/40 shadow-2xl px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
        >
          <Home className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-bold mt-1">الرئيسية</span>
        </button>

        {/* Categories */}
        <button
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">الأقسام</span>
        </button>

        {/* Cart - Center Highlight */}
        <button
          onClick={onOpenCart}
          className="relative -top-3 flex flex-col items-center justify-center"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/40 flex items-center justify-center active:scale-95 transition-transform">
            <div className="w-full h-full bg-[#0d0f12] rounded-full flex items-center justify-center relative">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d0f12] animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          <span className="text-[10px] font-black text-amber-300 mt-0.5">
            {totalItems > 0 ? `${safeTotal} ج` : 'السلة'}
          </span>
        </button>

        {/* Search */}
        <button
          onClick={onFocusSearch}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">بحث</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/201066568284?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D9%8A%D9%88%20%D9%82%D8%B5%D8%B1%20%D8%A7%D9%84%D9%85%D9%86%D8%AF%D9%8A"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 text-emerald-400 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">واتساب</span>
        </a>
      </div>
    </nav>
  );
};
