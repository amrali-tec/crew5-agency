import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpLeft, Linkedin, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { settings } = useData();
  const { language, t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const contactEmail = settings.email || settings.contact?.email || 'info@crew5.agency';
  const saudiPhone = settings.phoneDisplay || settings.phone || '+966 56 812 1909';
  const egyptPhone = settings.phoneEgyptDisplay || settings.phoneEgypt || '+20 109 443 9468';
  const saudiAddress = language === 'en' 
    ? (settings.addressEn || 'Riyadh, Kingdom of Saudi Arabia')
    : (settings.address || 'الرياض، المملكة العربية السعودية');
  const egyptAddress = language === 'en'
    ? (settings.addressEgyptEn || 'Building 18, El Narges St, 5th District, 5th Settlement, New Cairo, Egypt')
    : (settings.addressEgypt || 'مبنى 18، شارع النرجس، الحي الخامس، التجمع الخامس، القاهرة الجديدة، مصر');

  const socialLinks = settings.socialLinks || {};

  return (
    <footer className="bg-dark-950 border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Col 1: Brand Info (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-green to-[#00B359] flex items-center justify-center p-0.5 shadow-neon">
                <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-montserrat font-extrabold text-xl text-brand-green">5</span>
                </div>
              </div>
              <span className="font-montserrat font-black text-2xl tracking-tight text-white">
                Crew<span className="text-brand-green text-glow">5</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-brand-green/20 text-brand-green font-semibold tracking-normal mx-1">Agency</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green/40 hover:bg-brand-green/10 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green/40 hover:bg-brand-green/10 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green/40 hover:bg-brand-green/10 transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green/40 hover:bg-brand-green/10 transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Fast Navigation (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/ceo-message" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {language === 'en' ? 'CEO Message' : 'كلمة الرئيس التنفيذي'}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.estimator')}
                </Link>
              </li>
              <li>
                <Link to="/audit" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.audit')}
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.track')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-1.5 group">
                  <ArrowUpLeft className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${!isRTL ? 'rotate-90' : ''}`} />
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              {t('footer.ourServices')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/web-development" className="text-slate-400 hover:text-brand-green transition-colors">
                  {language === 'en' ? 'Web & Store Development' : 'تطوير المواقع والمتاجر'}
                </Link>
              </li>
              <li>
                <Link to="/services/brand-identity" className="text-slate-400 hover:text-brand-green transition-colors">
                  {language === 'en' ? 'Brand Identity & Design' : 'تصميم وبناء الهويات'}
                </Link>
              </li>
              <li>
                <Link to="/services/seo-optimization" className="text-slate-400 hover:text-brand-green transition-colors">
                  {language === 'en' ? 'SEO Search Optimization' : 'تحسين محركات البحث SEO'}
                </Link>
              </li>
              <li>
                <Link to="/services/video-editing" className="text-slate-400 hover:text-brand-green transition-colors">
                  {language === 'en' ? 'Cinematic Video Production' : 'الإنتاج المرئي والمونتاج'}
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="text-slate-400 hover:text-brand-green transition-colors">
                  {language === 'en' ? 'Paid Ads & Marketing' : 'الحملات الإعلانية الممولة'}
                </Link>
              </li>
              <li>
                <Link to="/services/social-media-management" className="text-slate-400 hover:text-brand-green transition-colors">
                  {language === 'en' ? 'Social Media Management' : 'إدارة وسائل التواصل'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Branches & Contact (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              {t('footer.branchesTitle')}
            </h3>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{t('common.email')}</span>
                <a href={`mailto:${contactEmail}`} className="text-white font-bold hover:text-brand-green transition-colors dir-ltr font-mono">
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Saudi Branch */}
            <div className="p-3 rounded-xl bg-dark-900 border border-brand-green/20 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-green flex items-center gap-1.5">
                  <span>🇸🇦</span>
                  <span>{t('common.saudiBranch')}</span>
                </span>
                <a href={`tel:${saudiPhone.replace(/[^0-9]/g, '')}`} className="text-white hover:text-brand-green font-mono font-bold dir-ltr">
                  {saudiPhone}
                </a>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                <span>{saudiAddress}</span>
              </p>
            </div>

            {/* Egypt Branch */}
            <div className="p-3 rounded-xl bg-dark-900 border border-cyan-500/20 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-cyan flex items-center gap-1.5">
                  <span>🇪🇬</span>
                  <span>{t('common.egyptBranch')}</span>
                </span>
                <a href={`tel:${egyptPhone.replace(/[^0-9]/g, '')}`} className="text-white hover:text-brand-cyan font-mono font-bold dir-ltr">
                  {egyptPhone}
                </a>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                <span>{egyptAddress}</span>
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {t('common.brandName')} (Crew5 Agency). {t('common.rightsReserved')}.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              {t('footer.termsConditions')}
            </Link>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('crew5:open-cookie-settings'))}
              className="hover:text-brand-green transition-colors cursor-pointer text-xs"
            >
              🍪 {t('cookies.cookieSettings')}
            </button>
            <span className="text-slate-700">•</span>
            <Link to="/admin/login" className="hover:text-brand-green transition-colors text-[11px]">
              {t('nav.adminPortal')} 🔒
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
