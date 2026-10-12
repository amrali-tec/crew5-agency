import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowLeft, Sparkles, PhoneCall, ChevronDown,
  Calculator, Search, Shield, Zap, FileText, Layers,
  Compass, ArrowUpRight, Globe
} from 'lucide-react';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const interactiveTools = [
    {
      title: language === 'en' ? 'Project Cost Estimator' : 'طلب عرض سعر مخصص',
      desc: language === 'en' ? 'Customize requirements & generate official PDF proposal' : 'خصّص متطلبات مشروعك واستلم عرض سعر رسمي مفصل',
      path: '/estimator',
      icon: FileText,
      badge: language === 'en' ? 'Popular' : 'الأكثر طلباً'
    },
    {
      title: language === 'en' ? 'Digital Audit Tool' : 'أداة الفحص والتدقيق الرقمي',
      desc: language === 'en' ? 'Live diagnostics for speed, SEO & conversion rate' : 'فحص فوري للسرعة، السيو، ومعدل تحويل موقعك',
      path: '/audit',
      icon: Search,
      badge: language === 'en' ? 'Free' : 'مجاني'
    },
    {
      title: language === 'en' ? 'Client Project Tracker' : 'بوابة تتبع مشاريع العملاء',
      desc: language === 'en' ? 'Track real-time milestones and approved deliverables' : 'متابعة مراحل الإنجاز والملفات المسلمة لحظياً',
      path: '/track',
      icon: Shield,
      badge: language === 'en' ? 'Portal' : 'للعملاء'
    }
  ];

  const mainLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.projects'), path: '/projects' },
    { label: t('nav.blog'), path: '/blog' }
  ];

  const isToolActive = ['/estimator', '/audit', '/track'].includes(location.pathname);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between gap-4 xl:gap-8 flex-nowrap">
          
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0 whitespace-nowrap">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-green to-[#00B359] flex items-center justify-center p-0.5 shadow-neon group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-950 rounded-[14px] flex items-center justify-center">
                <span className="font-montserrat font-black text-xl sm:text-2xl text-brand-green">5</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-black text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                Crew<span className="text-brand-green text-glow">5</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green font-bold tracking-normal">Agency</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium -mt-1 hidden sm:block">
                {language === 'en' ? 'Creative Digital Transformation' : 'وكالة الإبداع والتحول الرقمي'}
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links (Spacious Glass Capsule) */}
          <nav className="hidden xl:flex items-center gap-2 xl:gap-3 bg-dark-900/80 border border-white/10 rounded-full px-5 xl:px-7 py-2 backdrop-blur-2xl shadow-2xl shrink-0 flex-nowrap">
            
            {/* Main Links */}
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 xl:px-4 py-2 rounded-full text-sm xl:text-[15px] font-bold transition-all duration-200 whitespace-nowrap relative ${
                    isActive
                      ? 'text-brand-green bg-brand-green/15 shadow-neon/20 font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-green shadow-neon"></span>
                  )}
                </Link>
              );
            })}

            {/* Smart Tools Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`px-3.5 xl:px-4 py-2 rounded-full text-sm xl:text-[15px] font-bold flex items-center gap-2 transition-all duration-200 whitespace-nowrap ${
                  isToolActive || toolsDropdownOpen
                    ? 'text-brand-green bg-brand-green/15 shadow-neon/20 font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4 text-brand-green animate-pulse" />
                <span>{t('nav.smartTools')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-brand-green' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {toolsDropdownOpen && (
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 p-3.5 rounded-3xl bg-dark-900 border border-brand-green/40 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 space-y-2 ${isRTL ? 'text-right' : 'text-left'} z-[100]`}
                >
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 border-b border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-brand-green font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Interactive Digital Tools' : 'أدوات رقمية تفاعلية'}</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-ping"></span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {interactiveTools.map((tool) => {
                      const Icon = tool.icon;
                      const isSelected = location.pathname === tool.path;
                      return (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={() => setToolsDropdownOpen(false)}
                          className={`p-3.5 rounded-2xl flex items-center gap-3.5 transition-all group ${
                            isSelected
                              ? 'bg-brand-green/20 border border-brand-green/50 shadow-neon/10'
                              : 'bg-white/[0.04] hover:bg-brand-green/10 border border-white/[0.08] hover:border-brand-green/30'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                            isSelected 
                              ? 'bg-brand-green text-dark-950 shadow-neon' 
                              : 'bg-white/5 border border-white/10 text-brand-green group-hover:bg-brand-green group-hover:text-dark-950 transition-colors'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors truncate">
                                {tool.title}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green font-bold border border-brand-green/30 shrink-0">
                                {tool.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-1 group-hover:text-slate-300">
                              {tool.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* 3. Action CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3 shrink-0 whitespace-nowrap flex-nowrap">
            
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3.5 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-green/40 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-brand-green" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <Link
              to="/estimator"
              className="px-4 py-2 rounded-full text-xs xl:text-sm font-bold text-brand-green hover:bg-brand-green/10 border border-brand-green/30 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('nav.estimator')}</span>
            </Link>

            <Button
              to="/contact"
              variant="glow"
              size="md"
              icon={ArrowLeft}
              iconPosition="right"
              className="whitespace-nowrap shrink-0"
            >
              {t('common.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Toggle & Lang Button */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-brand-green flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-brand-green hover:border-brand-green/40 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute inset-x-0 top-full bg-dark-950/98 border-b border-white/10 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          
          <div className="space-y-1">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-brand-green/15 text-brand-green border border-brand-green/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Smart Tools Box */}
          <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-3">
            <span className="text-xs font-bold text-slate-400 block mb-2">{t('nav.smartTools')}</span>
            <div className="grid grid-cols-1 gap-2">
              {interactiveTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-brand-green/10 flex items-center justify-between text-xs font-bold text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-brand-green" />
                      <span>{tool.title}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-green/20 text-brand-green">
                      {tool.badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action CTAs & Language */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-brand-green" />
              <span>{language === 'ar' ? 'Switch to English (EN)' : 'التحويل إلى العربية'}</span>
            </button>

            <Button
              to="/contact"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={ArrowLeft}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('common.getStarted')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
