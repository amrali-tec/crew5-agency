import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Cookie, Settings, Check, X, 
  ExternalLink, Sparkles, Lock, BarChart3, 
  Megaphone, Palette, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

const STORAGE_KEY = 'crew5_cookie_consent';
const CONSENT_VERSION = '1.0';

export default function CookieConsent() {
  const { language, t, isRTL } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true
  });

  useEffect(() => {
    // Check if consent has already been given
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.version === CONSENT_VERSION) {
          setPreferences(parsed.preferences || {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
          });
          return;
        }
      } catch (e) {}
    }

    // Show banner after brief delay for smooth page load
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Global event listener to open cookie settings anytime from footer or anywhere
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener('crew5:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('crew5:open-cookie-settings', handleOpenSettings);
  }, []);

  const saveConsent = (prefs) => {
    const consentData = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      preferences: prefs
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);

    // Dispatch event so external scripts / pixels can react
    window.dispatchEvent(new CustomEvent('crew5:cookie-consent-updated', { detail: consentData }));
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveConsent(allEnabled);
  };

  const handleRejectNonEssential = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveConsent(onlyNecessary);
  };

  const handleSaveCustom = () => {
    saveConsent({
      ...preferences,
      necessary: true // strictly necessary is always true
    });
  };

  const toggleCategory = (cat) => {
    if (cat === 'necessary') return; // locked
    setPreferences(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  return (
    <>
      {/* 1. FLOATING COOKIE CONSENT BANNER */}
      {showBanner && !showModal && (
        <div 
          className={`fixed bottom-4 sm:bottom-6 ${isRTL ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-50 max-w-lg w-[calc(100vw-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-400`}
        >
          <div className="relative p-5 sm:p-6 rounded-3xl bg-dark-900/95 border border-brand-green/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl space-y-4">
            
            {/* Header with Icon and Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-green/15 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-neon shrink-0">
                  <Cookie className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                    <span>{t('cookies.bannerTitle')}</span>
                  </h4>
                  <span className="text-[10px] text-brand-green font-bold block">
                    {language === 'en' ? 'Enterprise Privacy & Security' : 'حماية الخصوصية والأمان الرقمي'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBanner(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t('cookies.bannerDesc')}{' '}
              <Link to="/privacy-policy" className="text-brand-green hover:underline font-bold inline-flex items-center gap-0.5">
                {t('cookies.viewPolicy')}
              </Link>
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl bg-brand-green hover:bg-[#00c864] text-dark-950 font-bold text-xs shadow-neon transition-all duration-200 cursor-pointer active:scale-95 text-center"
              >
                {t('cookies.acceptAll')}
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs transition-all duration-200 cursor-pointer text-center"
              >
                {t('cookies.rejectNonEssential')}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowBanner(false);
                  setShowModal(true);
                }}
                className="py-2.5 px-3 rounded-xl text-slate-400 hover:text-brand-green hover:bg-brand-green/10 border border-transparent hover:border-brand-green/30 font-bold text-xs transition-all duration-200 cursor-pointer flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t('cookies.customize')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. COOKIE PREFERENCES MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/80 backdrop-blur-md animate-in fade-in duration-200">
          
          <div 
            className="fixed inset-0"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-900 border border-brand-green/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 custom-scrollbar space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center shadow-neon">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {t('cookies.preferencesTitle')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t('cookies.preferencesDesc')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories List */}
            <div className="space-y-3.5">
              
              {/* Category 1: Strictly Necessary (Always ON) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {t('cookies.categories.necessary.title')}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green font-bold border border-brand-green/30 inline-block mt-0.5">
                        {t('cookies.alwaysActive')}
                      </span>
                    </div>
                  </div>

                  {/* Locked Switch */}
                  <div className="relative inline-flex items-center cursor-not-allowed opacity-80">
                    <div className="w-12 h-6.5 bg-brand-green rounded-full p-1 transition-colors">
                      <div className={`w-4.5 h-4.5 bg-dark-950 rounded-full shadow-md transform transition-transform ${isRTL ? '-translate-x-5.5' : 'translate-x-5.5'}`} />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  {t('cookies.categories.necessary.desc')}
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-brand-cyan flex items-center justify-center shrink-0">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {t('cookies.categories.analytics.title')}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-brand-cyan font-bold border border-cyan-500/30 inline-block mt-0.5">
                        {t('cookies.recommended')}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => toggleCategory('analytics')}
                    className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors cursor-pointer ${
                      preferences.analytics ? 'bg-brand-green' : 'bg-slate-700'
                    }`}
                    role="switch"
                    aria-checked={preferences.analytics}
                  >
                    <span
                      className={`inline-block w-5 h-5 transform bg-dark-950 rounded-full shadow-md transition-transform ${
                        preferences.analytics 
                          ? (isRTL ? '-translate-x-6' : 'translate-x-6') 
                          : (isRTL ? '-translate-x-1' : 'translate-x-1')
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  {t('cookies.categories.analytics.desc')}
                </p>
              </div>

              {/* Category 3: Marketing & Ads */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-brand-amber flex items-center justify-center shrink-0">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {t('cookies.categories.marketing.title')}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        Google Ads, Meta Pixel, TikTok, Snap
                      </span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => toggleCategory('marketing')}
                    className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors cursor-pointer ${
                      preferences.marketing ? 'bg-brand-green' : 'bg-slate-700'
                    }`}
                    role="switch"
                    aria-checked={preferences.marketing}
                  >
                    <span
                      className={`inline-block w-5 h-5 transform bg-dark-950 rounded-full shadow-md transition-transform ${
                        preferences.marketing 
                          ? (isRTL ? '-translate-x-6' : 'translate-x-6') 
                          : (isRTL ? '-translate-x-1' : 'translate-x-1')
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  {t('cookies.categories.marketing.desc')}
                </p>
              </div>

              {/* Category 4: User Experience & Preferences */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {t('cookies.categories.preferences.title')}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        Dark / Light Moods & Chat Memory
                      </span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => toggleCategory('preferences')}
                    className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors cursor-pointer ${
                      preferences.preferences ? 'bg-brand-green' : 'bg-slate-700'
                    }`}
                    role="switch"
                    aria-checked={preferences.preferences}
                  >
                    <span
                      className={`inline-block w-5 h-5 transform bg-dark-950 rounded-full shadow-md transition-transform ${
                        preferences.preferences 
                          ? (isRTL ? '-translate-x-6' : 'translate-x-6') 
                          : (isRTL ? '-translate-x-1' : 'translate-x-1')
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  {t('cookies.categories.preferences.desc')}
                </p>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="py-2.5 px-5 rounded-xl bg-brand-green hover:bg-[#00c864] text-dark-950 font-bold text-xs shadow-neon transition-all cursor-pointer active:scale-95"
              >
                {t('cookies.acceptAll')}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-all cursor-pointer"
                >
                  {t('cookies.savePreferences')}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-3 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
