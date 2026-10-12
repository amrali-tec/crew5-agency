import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ChevronUp, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

export default function WhatsAppButton() {
  const { settings } = useData();
  const { language, isRTL } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const saudiNumber = (settings.whatsapp || '+966568121909').replace(/[^0-9]/g, '');
  const egyptNumber = (settings.whatsappEgypt || '+201094439468').replace(/[^0-9]/g, '');

  const saudiText = encodeURIComponent(
    language === 'en'
      ? 'Hello Crew5 Agency Saudi Branch, I would like to inquire about your services.'
      : 'مرحباً كرو فايف فرع السعودية، أود الاستفسار عن خدماتكم وبدء مشروع.'
  );

  const egyptText = encodeURIComponent(
    language === 'en'
      ? 'Hello Crew5 Agency Egypt Branch, I would like to inquire about your services.'
      : 'مرحباً كرو فايف فرع مصر، أود الاستفسار عن خدماتكم وبدء مشروع.'
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'right-6' : 'left-6'} z-40`} ref={menuRef}>
      
      {/* Popover Branch Selection */}
      {menuOpen && (
        <div className={`absolute bottom-16 ${isRTL ? 'right-0' : 'left-0'} mb-2 w-72 p-4 rounded-2xl bg-dark-950/98 border border-white/10 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 space-y-2.5 z-50`}>
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{language === 'en' ? 'Choose WhatsApp Branch' : 'اختر فرع الواتساب'}</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Saudi Option */}
          <a
            href={`https://wa.me/${saudiNumber}?text=${saudiText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/5 hover:border-[#25D366]/40 flex items-center justify-between text-xs font-bold text-white transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🇸🇦</span>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="block text-slate-200 group-hover:text-emerald-300">
                  {language === 'en' ? 'Saudi Arabia Office (Riyadh)' : 'فرع السعودية (الرياض)'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono dir-ltr block">+966 56 812 1909</span>
              </div>
            </div>
            <Send className={`w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-180' : ''}`} />
          </a>

          {/* Egypt Option */}
          <a
            href={`https://wa.me/${egyptNumber}?text=${egyptText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/5 hover:border-[#25D366]/40 flex items-center justify-between text-xs font-bold text-white transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🇪🇬</span>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="block text-slate-200 group-hover:text-emerald-300">
                  {language === 'en' ? 'Egypt Office (New Cairo)' : 'فرع مصر (القاهرة الجديدة)'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono dir-ltr block">+20 109 443 9468</span>
              </div>
            </div>
            <Send className={`w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-180' : ''}`} />
          </a>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="WhatsApp Support"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
        </div>
        <span className="text-xs sm:text-sm font-bold hidden sm:inline-block">
          {language === 'en' ? 'WhatsApp Direct' : 'محادثة واتساب فورية'}
        </span>
      </button>
    </div>
  );
}
