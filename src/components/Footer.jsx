import React from 'react';
import { Crown, Phone, MapPin, Clock, QrCode } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBERS } from '../data/initialData';

export const Footer = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#0a0c0f] border-t border-slate-800 text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & About */}
        <div className="space-y-3">
          <div className="flex flex-col space-y-1 text-amber-400">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Crown className="w-6 h-6" />
              <span className="text-lg font-black text-white">مطعم قصر المندي</span>
            </div>
            <span className="text-amber-400 font-extrabold text-xs">🔥 (ابو شنب فى المشاوي بيتقال عليه حكاوي)</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            أرقى وجبات المندي الخليجي والمشويات البلدي على أصولها. نضمن لكم الجودة والتجهيز الفاخر بأعلى معايير النظافة والطازج يومياً.
          </p>
          <div className="pt-1 flex items-center space-x-2 space-x-reverse text-amber-300 font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>نعمل طوال أيام الأسبوع: من 11 صباحاً حتى 2 صباحاً</span>
          </div>
        </div>

        {/* Official Contact & WhatsApp */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white border-b border-amber-500/20 pb-2">
            أرقام الطلبات والواتساب الرسمية
          </h4>
          <div className="space-y-2">
            {OFFICIAL_WHATSAPP_NUMBERS.map((num) => (
              <a
                key={num.number}
                href={`https://wa.me/2${num.number}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 space-x-reverse bg-[#12161f] p-2.5 rounded-xl border border-slate-800 hover:border-amber-500/40 text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">{num.label}:</span>
                <span className="font-mono text-amber-300" dir="ltr">
                  {num.display}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* QR Code & Direct Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white border-b border-amber-500/20 pb-2">
            منيو الإلكتروني QR Code
          </h4>
          <div className="flex items-center space-x-3 space-x-reverse bg-[#12161f] p-3 rounded-xl border border-slate-800">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <QrCode className="w-10 h-10" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">امسح الكود واستعرض المنيو</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                تصفح سريع بدون تحميل على جميع الهواتف الذكية
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenAdmin}
              className="text-xs text-amber-400 hover:underline flex items-center space-x-1 space-x-reverse"
            >
              <span>دخول إدارة المطعم (Control Panel)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
        <p>© 2026 جميع الحقوق محفوظة لمطعم قصر المندي (Qasr Al-Mandi)</p>
        <p>تصميم وتطوير نظام المنيو الإلكتروني التفاعلي السريع</p>
      </div>
    </footer>
  );
};
