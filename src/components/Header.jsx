import React from 'react';
import { Crown, Search, ShoppingBag, ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

export const Header = ({ onOpenAdmin, onOpenCart }) => {
  const { totalItems, totalPrice } = useCart();
  const { searchQuery, setSearchQuery } = useMenu();

  const safeTotalPrice = (Number(totalPrice) || 0).toLocaleString();

  return (
    <header className="sticky top-0 z-30 bg-[#0d0f12]/95 backdrop-blur-md border-b border-amber-900/30 shadow-2xl">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-amber-950/80 via-yellow-900/50 to-amber-950/80 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-semibold text-emerald-400">مفتوح الآن لاستقبال طلباتكم</span>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <a href="tel:01066568284" className="flex items-center space-x-1 space-x-reverse hover:text-amber-400 transition-colors">
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span dir="ltr">01066568284</span>
          </a>
          <span className="opacity-40">|</span>
          <button
            onClick={onOpenAdmin}
            className="flex items-center space-x-1 space-x-reverse text-amber-300 hover:text-amber-100 bg-amber-900/40 hover:bg-amber-800/60 px-2 py-0.5 rounded transition-all text-[11px]"
          >
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>لوحة التحكم</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 p-0.5 shadow-lg shadow-amber-900/40 flex items-center justify-center">
              <div className="w-full h-full bg-[#12161f] rounded-[10px] flex items-center justify-center">
                <Crown className="w-7 h-7 text-amber-400 animate-pulse-glow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-y-1">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                  قصر المندي
                </h1>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                  🔥 (ابو شنب فى المشاوي بيتقال عليه حكاوي)
                </span>
              </div>
              <p className="text-xs text-amber-400/90 font-bold mt-0.5">Qasr Al-Mandi • أصالة المذاق العربي والمشاوي البلدي</p>
            </div>
          </div>

          {/* Mobile Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="md:hidden relative bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-2 space-x-reverse transition-all active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="bg-slate-950 text-amber-400 font-extrabold text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar & Desktop Cart */}
        <div className="flex items-center space-x-3 space-x-reverse flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن وجبتك المفضلة (مندي، كفتة، طرب، سمان...)"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161a23] border border-amber-500/20 rounded-xl pr-10 pl-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>

          <button
            onClick={onOpenCart}
            className="hidden md:flex items-center space-x-2.5 space-x-reverse bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>السلة</span>
            {totalItems > 0 && (
              <span className="bg-slate-950 text-amber-300 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                {totalItems} ({safeTotalPrice} ج.م)
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
