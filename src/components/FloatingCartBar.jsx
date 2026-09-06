import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCartBar = ({ onOpenCart }) => {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  const safeTotal = (Number(totalPrice) || 0).toLocaleString();

  return (
    <div className="md:hidden fixed bottom-[66px] left-3 right-3 z-30 animate-in slide-in-from-bottom-5 duration-300">
      <div
        onClick={onOpenCart}
        className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 p-3 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform border border-amber-300/40"
      >
        {/* Cart Info */}
        <div className="flex items-center space-x-2.5 space-x-reverse">
          <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-sm shadow">
            {totalItems}
          </div>
          <div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <span className="text-xs font-black">وجبات في السلة</span>
              <Sparkles className="w-3 h-3 text-slate-900" />
            </div>
            <div className="text-xs font-extrabold text-slate-900">
              الإجمالي: <span className="text-sm font-black">{safeTotal} ج.م</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center space-x-1.5 space-x-reverse bg-slate-950 text-amber-400 px-3.5 py-2 rounded-xl text-xs font-black shadow-sm">
          <span>إتمام الطلب</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
