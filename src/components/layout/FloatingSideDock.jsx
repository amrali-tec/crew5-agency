import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Bot, Globe, ArrowUp, Send, X, 
  Sparkles, CheckCircle2, Sun, Moon, Palette, Check,
  Eye, Shield, Zap, Cloud
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function FloatingSideDock() {
  const { settings } = useData();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { 
    theme, 
    setTheme, 
    toggleTheme, 
    isDark, 
    darkMood, 
    lightMood, 
    setDarkMood, 
    setLightMood,
    DARK_MOODS,
    LIGHT_MOODS
  } = useTheme();

  const [whatsappMenuOpen, setWhatsappMenuOpen] = useState(false);
  const [paletteMenuOpen, setPaletteMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const dockRef = useRef(null);

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

  // Monitor scroll position for Scroll-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close WhatsApp & Theme popovers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setWhatsappMenuOpen(false);
        setPaletteMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenAiBot = () => {
    window.dispatchEvent(new CustomEvent('crew5:open-ai-bot'));
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic RTL / LTR classes
  const dockPositionClass = isRTL ? 'right-3 sm:right-5' : 'left-3 sm:left-5';
  const tooltipClass = isRTL 
    ? 'right-full mr-3.5 slide-in-from-right-2 text-right' 
    : 'left-full ml-3.5 slide-in-from-left-2 text-left';
  const popoverClass = isRTL 
    ? 'right-full mr-4 slide-in-from-right-3 text-right' 
    : 'left-full ml-4 slide-in-from-left-3 text-left';

  return (
    <div 
      ref={dockRef}
      className={`fixed ${dockPositionClass} top-1/2 -translate-y-1/2 z-40 flex flex-col items-center transition-all duration-300`}
      style={{ touchAction: 'none' }}
    >
      {/* 1. THE MAIN FLOATING CAPSULE */}
      <div className="relative flex flex-col items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-dark-950/95 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 hover:border-brand-green/30">
        
        {/* BUTTON 1: WhatsApp Direct */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setWhatsappMenuOpen(!whatsappMenuOpen);
              setPaletteMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredButton('whatsapp')}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-dark-950 border border-[#25D366]/40 flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.25)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 group cursor-pointer"
            aria-label="WhatsApp Support"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-dark-950 animate-ping"></span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-dark-950"></span>
          </button>

          {/* Tooltip */}
          {hoveredButton === 'whatsapp' && !whatsappMenuOpen && (
            <div className={`absolute ${tooltipClass} top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-dark-950/95 border border-[#25D366]/40 text-[#25D366] text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in duration-150 pointer-events-none z-50`}>
              <span>{language === 'en' ? 'WhatsApp Direct' : 'محادثة واتساب فورية'}</span>
            </div>
          )}

          {/* WhatsApp Branches Popover */}
          {whatsappMenuOpen && (
            <div className={`absolute ${popoverClass} top-1/2 -translate-y-1/2 w-72 p-3.5 rounded-2xl bg-dark-900 border border-[#25D366]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in fade-in duration-200 space-y-2.5 z-50`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{language === 'en' ? 'Choose WhatsApp Branch' : 'اختر فرع الواتساب'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setWhatsappMenuOpen(false)}
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
                onClick={() => setWhatsappMenuOpen(false)}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-[#25D366]/20 border border-white/[0.06] hover:border-[#25D366]/50 flex items-center justify-between text-xs font-bold text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🇸🇦</span>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <span className="block text-slate-200 group-hover:text-emerald-300">
                      {language === 'en' ? 'Saudi Arabia (Riyadh)' : 'فرع السعودية (الرياض)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono dir-ltr block">+966 56 812 1909</span>
                  </div>
                </div>
                <Send className={`w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? '' : 'rotate-180'}`} />
              </a>

              {/* Egypt Option */}
              <a
                href={`https://wa.me/${egyptNumber}?text=${egyptText}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsappMenuOpen(false)}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-[#25D366]/20 border border-white/[0.06] hover:border-[#25D366]/50 flex items-center justify-between text-xs font-bold text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🇪🇬</span>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <span className="block text-slate-200 group-hover:text-emerald-300">
                      {language === 'en' ? 'Egypt (New Cairo)' : 'فرع مصر (القاهرة الجديدة)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono dir-ltr block">+20 109 443 9468</span>
                  </div>
                </div>
                <Send className={`w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? '' : 'rotate-180'}`} />
              </a>
            </div>
          )}
        </div>

        {/* BUTTON 2: Crew5 AI Smart Assistant */}
        <div className="relative">
          <button
            type="button"
            onClick={handleOpenAiBot}
            onMouseEnter={() => setHoveredButton('ai')}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-green/15 hover:bg-brand-green text-brand-green hover:text-dark-950 border border-brand-green/40 flex items-center justify-center transition-all duration-300 shadow-neon hover:shadow-neon-lg hover:scale-110 active:scale-95 group cursor-pointer"
            aria-label="Crew5 AI Assistant"
          >
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-green border-2 border-dark-950 animate-ping"></span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-green border-2 border-dark-950"></span>
          </button>

          {/* Tooltip */}
          {hoveredButton === 'ai' && (
            <div className={`absolute ${tooltipClass} top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-dark-950/95 border border-brand-green/40 text-brand-green text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in duration-150 pointer-events-none z-50 flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              <span>{language === 'en' ? 'Crew5 AI Assistant' : 'مساعد كرو فايف الذكي'}</span>
            </div>
          )}
        </div>

        {/* BUTTON 3: Theme Atmosphere & Eye-Care Studio (Palette 🎨) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setPaletteMenuOpen(!paletteMenuOpen);
              setWhatsappMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredButton('theme')}
            onMouseLeave={() => setHoveredButton(null)}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer shadow-md ${
              isDark
                ? 'bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-dark-950 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-indigo-500/15 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
            }`}
            aria-label="Theme Atmosphere & Eye-Care Studio"
          >
            <Palette className="w-4 h-4 text-brand-green group-hover:rotate-45 transition-transform duration-300" />
          </button>

          {/* Tooltip */}
          {hoveredButton === 'theme' && !paletteMenuOpen && (
            <div className={`absolute ${tooltipClass} top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-dark-950/95 border border-white/15 text-white text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in duration-150 pointer-events-none z-50 flex items-center gap-1.5`}>
              <Palette className="w-3.5 h-3.5 text-brand-green" />
              <span>{language === 'en' ? 'Theme Atmosphere & Eye-Care' : 'مخصص الأجواء والراحة البصرية'}</span>
            </div>
          )}

          {/* Theme Studio Popover */}
          {paletteMenuOpen && (
            <div className={`absolute ${popoverClass} top-1/2 -translate-y-1/2 w-80 p-4 rounded-3xl bg-dark-900 border border-brand-green/40 shadow-[0_25px_60px_rgba(0,0,0,0.98)] backdrop-blur-2xl animate-in fade-in duration-200 space-y-3.5 z-50`}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-black text-white">
                  <Palette className="w-4 h-4 text-brand-green" />
                  <span>{language === 'en' ? 'Atmosphere & Eye-Care Studio' : 'مخصص الأجواء والراحة البصرية'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPaletteMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/5">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-dark-850 text-brand-green shadow-md border border-brand-green/30' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Dark Mode' : 'الوضع الليلي'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !isDark 
                      ? 'bg-white text-emerald-700 shadow-md border border-emerald-300' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'en' ? 'Light Mode' : 'الوضع النهاري'}</span>
                </button>
              </div>

              {/* Atmospheres List */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400 block px-1">
                  {isDark 
                    ? (language === 'en' ? 'Dark Depths & Tones' : 'عمق درجات الوضع الليلي:')
                    : (language === 'en' ? 'Light Tones & Eye Protection' : 'درجات النهاري وتخفيف الإشعاع:')}
                </span>

                <div className="space-y-1.5">
                  {(isDark ? DARK_MOODS : LIGHT_MOODS).map((m) => {
                    const isSelected = (isDark ? darkMood : lightMood) === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          if (isDark) setDarkMood(m.id);
                          else setLightMood(m.id);
                        }}
                        className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-green/15 border-brand-green text-white shadow-neon/20'
                            : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/[0.06] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: m.bg }}
                          >
                            {isSelected && <Check className="w-3 h-3 text-brand-green stroke-[3]" />}
                          </span>
                          <span className={isSelected ? 'text-brand-green' : 'text-slate-200'}>
                            {language === 'en' ? m.nameEn : m.nameAr}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                          {m.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* BUTTON 4: Language Toggle (English / العربية) */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleLanguage}
            onMouseEnter={() => setHoveredButton('lang')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.05] hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 hover:border-brand-green/40 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer shadow-md"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4 text-brand-green group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-[9px] font-black font-montserrat uppercase leading-none mt-0.5 text-slate-300 group-hover:text-brand-green">
              {language === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>

          {/* Tooltip */}
          {hoveredButton === 'lang' && (
            <div className={`absolute ${tooltipClass} top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-dark-950/95 border border-white/15 text-white text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in duration-150 pointer-events-none z-50`}>
              <span>{language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}</span>
            </div>
          )}
        </div>

        {/* BUTTON 5: Scroll To Top (Conditional) */}
        {showScrollTop && (
          <div className="relative animate-in fade-in zoom-in-50 duration-200">
            <button
              type="button"
              onClick={handleScrollToTop}
              onMouseEnter={() => setHoveredButton('top')}
              onMouseLeave={() => setHoveredButton(null)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-dark-900 hover:bg-brand-green/20 text-slate-400 hover:text-brand-green border border-white/10 hover:border-brand-green/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer shadow-md"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Tooltip */}
            {hoveredButton === 'top' && (
              <div className={`absolute ${tooltipClass} top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-dark-950/95 border border-white/15 text-slate-300 text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in duration-150 pointer-events-none z-50`}>
                <span>{language === 'en' ? 'Back to Top' : 'العودة للأعلى'}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
