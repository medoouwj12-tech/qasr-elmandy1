import React, { useState, useEffect } from 'react';
import { Download, Share, X, Smartphone, Sparkles } from 'lucide-react';

export const InstallAppPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (already installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user previously dismissed prompt today
    const dismissedTime = localStorage.getItem('qasr_app_prompt_dismissed');
    if (dismissedTime && Date.now() - Number(dismissedTime) < 24 * 60 * 60 * 1000) {
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If on iOS and not standalone, show prompt after a short delay
    if (isIosDevice) {
      const timer = setTimeout(() => setShowPrompt(true), 2500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('qasr_app_prompt_dismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <>
      {/* Floating Install Bar */}
      <div className="fixed top-14 left-0 right-0 z-40 px-3 md:px-6 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="max-w-xl mx-auto bg-gradient-to-r from-[#171c26] via-[#12161f] to-[#171c26] border border-amber-500/40 rounded-2xl p-3 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 pointer-events-auto backdrop-blur-lg">
          {/* App Info */}
          <div className="flex items-center space-x-3 space-x-reverse min-w-0">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-[#0d0f12] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src="/icons/icon-192.png" alt="قصر المندي" className="w-full h-full object-cover" />
              </div>
              <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <h4 className="text-sm font-black text-white truncate">تطبيق قصر المندي</h4>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                  تطبيق الهاتف
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                ثبت التطبيق لتصفح سريع وطلب فوري بدون إنترنت
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 space-x-reverse shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-amber-500/30 flex items-center space-x-1.5 space-x-reverse transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تثبيت</span>
            </button>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#12161f] border border-amber-500/30 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">تثبيت التطبيق على آيفون (iOS)</h3>
              <p className="text-xs text-slate-300 mt-1">
                اتبع الخطوتين التاليتين لإضافة تطبيق قصر المندي لشاشتك الرئيسية:
              </p>
            </div>

            <div className="space-y-2.5 text-right text-xs text-slate-200 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-start space-x-2 space-x-reverse">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  اضغط على زر المشاركة <Share className="w-3.5 h-3.5 inline mx-1 text-amber-400" /> في أسفل المتصفح (سفاري).
                </div>
              </div>
              <div className="flex items-start space-x-2 space-x-reverse">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  اختر <strong className="text-amber-300">«إضافة إلى الصفحة الرئيسية» (Add to Home Screen)</strong>.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl transition-all"
            >
              تم، فهمت
            </button>
          </div>
        </div>
      )}
    </>
  );
};
