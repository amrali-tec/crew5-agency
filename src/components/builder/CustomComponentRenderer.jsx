import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowLeft, ArrowRight, CheckCircle2, 
  X, Star, ShieldCheck, Zap, Send, Clock, Phone,
  ChevronDown, MessageSquare, ExternalLink, Flame
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const ICON_MAP = {
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  Star,
  Flame,
  MessageSquare
};

export default function CustomComponentRenderer({ component, isPreview = false }) {
  const { language, isRTL, t } = useLanguage();
  if (!component) return null;
  const { type, data = {}, name, isEnabled = true } = component;

  if (!isEnabled && !isPreview) return null;

  switch (type) {
    // 1. Top Announcement Bar
    case 'announcement_bar':
      return <AnnouncementBar data={data} isPreview={isPreview} language={language} isRTL={isRTL} />;

    // 2. Promo Banner
    case 'promo_banner':
      return <PromoBanner data={data} language={language} isRTL={isRTL} />;

    // 3. Floating Widget
    case 'floating_widget':
      return <FloatingWidget data={data} isPreview={isPreview} language={language} isRTL={isRTL} />;

    // 4. Lead Capture / Quick Quote Box
    case 'lead_capture':
      return <LeadCaptureBox data={data} language={language} isRTL={isRTL} t={t} />;

    // 5. Custom Feature Cards Grid
    case 'feature_cards':
      return <FeatureCardsGrid data={data} language={language} isRTL={isRTL} />;

    // 6. Custom FAQ Accordion
    case 'faq_accordion':
      return <FaqAccordion data={data} language={language} isRTL={isRTL} />;

    // 7. Custom Rich Text / HTML Embed
    case 'custom_html':
      return <CustomHtml data={data} language={language} isRTL={isRTL} />;

    // 8. High-Impact CTA Banner
    case 'cta_banner':
      return <CtaBanner data={data} language={language} isRTL={isRTL} />;

    default:
      return (
        <section className="py-10 max-w-5xl mx-auto px-4 text-center">
          <Card className="p-8 border-brand-green/20">
            <h4 className="text-lg font-bold text-white mb-2">{name || (language === 'en' ? 'Custom Component' : 'مكون مخصص')}</h4>
            <p className="text-slate-400 text-sm">{data.subtitle || data.text || 'Custom Block'}</p>
          </Card>
        </section>
      );
  }
}

// Subcomponents:

// 1. Top Announcement Bar
function AnnouncementBar({ data, isPreview, language, isRTL }) {
  const [closed, setClosed] = useState(false);

  if (closed && !isPreview) return null;

  const badge = (language === 'en' && data.badgeEn) ? data.badgeEn : data.badge;
  const text = (language === 'en' && data.textEn) 
    ? data.textEn 
    : (data.text || (language === 'en' ? 'Welcome to Crew5 Agency - Shaping The Digital Future' : 'مرحباً بكم في Crew5 Agency - نصنع الإبداع الرقمي'));
  const btnText = (language === 'en' && data.btnTextEn) ? data.btnTextEn : data.btnText;

  return (
    <div className="announcement-top-bar relative z-40 py-2.5 px-4 text-xs sm:text-sm font-medium shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-center">
        {badge && (
          <span className="announcement-badge px-2.5 py-0.5 rounded-full font-black text-[11px] shadow-sm shrink-0">
            {badge}
          </span>
        )}
        <span className="announcement-text font-bold">
          {text}
        </span>
        {btnText && (
          <Link
            to={data.btnLink || '/contact'}
            className="announcement-cta inline-flex items-center gap-1 font-extrabold hover:underline ml-2"
          >
            <span>{btnText}</span>
            <ArrowLeft className={`w-3.5 h-3.5 ${!isRTL ? 'rotate-180' : ''}`} />
          </Link>
        )}
        {data.closable && !isPreview && (
          <button
            onClick={() => setClosed(true)}
            className={`announcement-close absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 transition-colors p-1 cursor-pointer`}
            title={language === 'en' ? 'Close' : 'إغلاق'}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// 2. Glowing Promo Banner
function PromoBanner({ data, language, isRTL }) {
  const badge = (language === 'en' && data.badgeEn) ? data.badgeEn : data.badge;
  const title = (language === 'en' && data.titleEn) ? data.titleEn : data.title;
  const highlight = (language === 'en' && data.highlightEn) ? data.highlightEn : data.highlight;
  const subtitle = (language === 'en' && data.subtitleEn) ? data.subtitleEn : data.subtitle;
  const btnText = (language === 'en' && data.btnTextEn) ? data.btnTextEn : data.btnText;
  const secondaryBtnText = (language === 'en' && data.secondaryBtnTextEn) ? data.secondaryBtnTextEn : data.secondaryBtnText;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-brand-green/40 bg-gradient-to-br ${data.gradient || 'from-brand-green/20 via-dark-900 to-dark-950'} shadow-2xl backdrop-blur-sm group`}>
        {/* Glow effect in background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-green/20 transition-all duration-700"></div>

        <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`${data.imageUrl ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
            {badge && (
              <Badge variant="green" className="py-1.5 px-4 text-xs sm:text-sm">
                <Sparkles className={`w-3.5 h-3.5 inline-block ${isRTL ? 'ml-1' : 'mr-1'} text-brand-green`} />
                {badge}
              </Badge>
            )}

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {title || (language === 'en' ? 'Growth & Performance Marketing Package' : 'باقة النمو والتسويق المتكاملة')}{' '}
              {highlight && (
                <span className="text-brand-green text-glow block sm:inline mt-1 sm:mt-0">
                  {highlight}
                </span>
              )}
            </h2>

            {subtitle && (
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {btnText && (
                <Button to={data.btnLink || '/contact'} variant="glow" size="lg">
                  {btnText}
                </Button>
              )}
              {secondaryBtnText && (
                <Button to={data.secondaryBtnLink || '/services'} variant="outline" size="lg">
                  {secondaryBtnText}
                </Button>
              )}
            </div>
          </div>

          {data.imageUrl && (
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={data.imageUrl} alt={title} className="w-full h-auto object-cover max-h-80" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// 3. Floating Social Proof / Trust Widget
function FloatingWidget({ data, isPreview, language, isRTL }) {
  const [minimized, setMinimized] = useState(false);

  const containerClasses = isPreview 
    ? "p-4" 
    : `fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 max-w-sm animate-fade-in`;

  const title = (language === 'en' && data.titleEn) ? data.titleEn : (data.title || (language === 'en' ? 'Rated 4.9/5 from 50+ clients' : 'تقييم 4.9/5 من أكثر من 50 عميل'));
  const subtitle = (language === 'en' && data.subtitleEn) ? data.subtitleEn : (data.subtitle || (language === 'en' ? 'Certified Digital Transformation Agency' : 'وكالة معتمدة للتحول الرقمي'));
  const btnText = (language === 'en' && data.btnTextEn) ? data.btnTextEn : (data.btnText || (language === 'en' ? 'Partner Reviews' : 'آراء شركاء النجاح'));

  if (minimized && !isPreview) {
    return (
      <div className={containerClasses}>
        <button
          onClick={() => setMinimized(false)}
          className="bg-dark-900 border border-brand-green/40 text-brand-green px-4 py-2 rounded-full shadow-neon flex items-center gap-2 text-xs font-bold hover:bg-brand-green hover:text-dark-950 transition-all"
        >
          <Star className="w-4 h-4 fill-current text-amber-400" />
          <span>{title}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <Card className="p-5 border-brand-green/40 shadow-2xl bg-dark-900/95 backdrop-blur-md relative group">
        {!isPreview && (
          <button
            onClick={() => setMinimized(true)}
            className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} text-slate-400 hover:text-white p-1 text-xs`}
            title={language === 'en' ? 'Minimize' : 'تصغير'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <div className={`flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-green shrink-0 shadow-neon">
            <img 
              src={data.avatarUrl || '/assets/avatar_1.jpg'} 
              alt="Social Proof" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-amber-400 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <h5 className="font-bold text-white text-xs sm:text-sm truncate">{title}</h5>
            <p className="text-[11px] text-slate-400 truncate">{subtitle}</p>
          </div>
        </div>
        {btnText && (
          <div className={`mt-3 pt-3 border-t border-white/10 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <Link
              to={data.link || '/testimonials'}
              className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1"
            >
              <span>{btnText}</span>
              <ArrowLeft className={`w-3.5 h-3.5 ${!isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}

// 4. Lead Capture Box
function LeadCaptureBox({ data, language, isRTL, t }) {
  const defaultService = language === 'en' ? 'Brand Identity Design' : 'تصميم هوية بصرية';
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: data.serviceOptions?.[0] || defaultService });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = (language === 'en' && data.titleEn) ? data.titleEn : (data.title || (language === 'en' ? 'Get Instant Proposal For Your Project' : 'احصل على عرض سعر فوري لمشروعك'));
  const subtitle = (language === 'en' && data.subtitleEn) ? data.subtitleEn : (data.subtitle || (language === 'en' ? 'Submit your details and our team will get in touch within 60 minutes with a bespoke plan.' : 'أدخل بياناتك وسنتواصل معك خلال 60 دقيقة لتقديم أفضل خطة تناسب ميزانيتك.'));
  const btnText = (language === 'en' && data.btnTextEn) ? data.btnTextEn : (data.btnText || (language === 'en' ? 'Request Proposal Now' : 'إرسال طلب التسعير الآن'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.sendMessage({
        name: form.name,
        email: form.email || 'lead@crew5.agency',
        phone: form.phone,
        service: form.service,
        message: `[Quick Proposal Request]: Name: ${form.name}, Phone: ${form.phone}, Service: ${form.service}`
      });
      setSubmitted(true);
    } catch (err) {
      alert(language === 'en' ? 'Submission failed, please try WhatsApp' : 'حدث خطأ أثناء إرسال البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className={`p-8 sm:p-12 border-brand-green/30 bg-gradient-to-br from-dark-900 via-dark-900 to-brand-green/10 ${isRTL ? 'text-right' : 'text-left'} shadow-2xl relative overflow-hidden`}>
        <div className="max-w-2xl mx-auto">
          {data.badge && (
            <Badge variant="green" className="mb-4">
              <Sparkles className={`w-3.5 h-3.5 inline-block ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {data.badge}
            </Badge>
          )}

          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed">
            {subtitle}
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
              <h4 className="text-xl font-bold text-white">{language === 'en' ? 'Request Received Successfully!' : 'تم استلام طلبك بنجاح!'}</h4>
              <p className="text-xs sm:text-sm text-slate-300">{language === 'en' ? 'Our project consultants will contact you shortly.' : 'سيتواصل معك فريق الاستشارات والتسعير في أقرب وقت.'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('services.fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full bg-dark-950 border border-white/10 focus:border-brand-green rounded-xl p-3 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('services.phoneLabel')} *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder={t('contact.phonePlaceholder')}
                    className={`w-full bg-dark-950 border border-white/10 focus:border-brand-green rounded-xl p-3 text-sm text-white outline-none dir-ltr ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </div>

              {data.serviceOptions && data.serviceOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{language === 'en' ? 'Requested Service' : 'الخدمة المطلوبة'}</label>
                  <select
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 focus:border-brand-green rounded-xl p-3 text-sm text-white outline-none"
                  >
                    {data.serviceOptions.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <Button type="submit" variant="glow" size="lg" disabled={loading} className="w-full justify-center">
                {loading ? t('common.sending') : btnText}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </section>
  );
}

// 5. Custom Feature Cards Grid
function FeatureCardsGrid({ data, language, isRTL }) {
  const defaultCards = language === 'en'
    ? [
        { title: "On-Time Precision Delivery", desc: "We adhere strictly to milestones and deliver on schedule.", iconName: "Clock" },
        { title: "Comprehensive SLA Guarantee", desc: "Post-launch proactive maintenance, updates, and dedicated support.", iconName: "ShieldCheck" },
        { title: "100% Bespoke Architecture", desc: "Every identity and platform is custom-built with zero generic templates.", iconName: "Sparkles" }
      ]
    : [
        { title: "تسليم في الموعد بدقة", desc: "نلتزم بجداول زمنية صارمة لتسليم كافة مراحل مشروعك.", iconName: "Clock" },
        { title: "دعم فني وضمان شامل", desc: "خدمة ما بعد الإطلاق وصيانة دورية وتحديثات مستمرة.", iconName: "ShieldCheck" },
        { title: "تصاميم حصرية 100%", desc: "كل هوية وموقع نصممه خصيصاً بدون قوالب جاهزة.", iconName: "Sparkles" }
      ];

  const cards = data.cards || defaultCards;
  const title = (language === 'en' && data.titleEn) ? data.titleEn : data.title;
  const badge = (language === 'en' && data.badgeEn) ? data.badgeEn : data.badge;
  const highlight = (language === 'en' && data.highlightEn) ? data.highlightEn : data.highlight;
  const subtitle = (language === 'en' && data.subtitleEn) ? data.subtitleEn : data.subtitle;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {(title || badge) && (
        <div className="text-center mb-12 space-y-3">
          {badge && <Badge variant="green">{badge}</Badge>}
          {title && (
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {title}{' '}
              {highlight && <span className="text-brand-green text-glow">{highlight}</span>}
            </h2>
          )}
          {subtitle && <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {cards.map((card, idx) => {
          const Icon = ICON_MAP[card.iconName] || Sparkles;
          const cardTitle = (language === 'en' && card.titleEn) ? card.titleEn : card.title;
          const cardDesc = (language === 'en' && card.descEn) ? card.descEn : card.desc;
          return (
            <Card key={idx} className="p-8 group hover:border-brand-green/40 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-dark-950 transition-all shadow-neon">
                <Icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-green transition-colors">
                {cardTitle}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {cardDesc}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

// 6. Custom FAQ Accordion
function FaqAccordion({ data, language, isRTL }) {
  const [openIdx, setOpenIdx] = useState(null);
  const items = data.items || [];
  const title = (language === 'en' && data.titleEn) ? data.titleEn : data.title;
  const badge = (language === 'en' && data.badgeEn) ? data.badgeEn : data.badge;
  const highlight = (language === 'en' && data.highlightEn) ? data.highlightEn : data.highlight;
  const subtitle = (language === 'en' && data.subtitleEn) ? data.subtitleEn : data.subtitle;

  return (
    <section className={`py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      {(title || badge) && (
        <div className="text-center mb-10 space-y-3">
          {badge && <Badge variant="green">{badge}</Badge>}
          {title && (
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {title}{' '}
              {highlight && <span className="text-brand-green text-glow">{highlight}</span>}
            </h2>
          )}
          {subtitle && <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          const q = (language === 'en' && item.qEn) ? item.qEn : item.q;
          const a = (language === 'en' && item.aEn) ? item.aEn : item.a;
          return (
            <Card key={idx} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full p-6 ${isRTL ? 'text-right' : 'text-left'} flex items-center justify-between gap-4 font-bold text-base text-white hover:text-brand-green transition-colors cursor-pointer`}
              >
                <span>{q}</span>
                <ChevronDown className={`w-5 h-5 text-brand-green transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className={`px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {a}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

// 7. Custom Rich Text / HTML
function CustomHtml({ data, language, isRTL }) {
  const title = (language === 'en' && data.titleEn) ? data.titleEn : data.title;
  const content = (language === 'en' && data.contentEn) ? data.contentEn : data.content;

  return (
    <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className={`p-8 sm:p-12 ${isRTL ? 'text-right' : 'text-left'} space-y-6`}>
        {title && (
          <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4">
            {title}
          </h3>
        )}
        <div 
          className="text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: content || '<p>Custom Content</p>' }}
        />
      </Card>
    </section>
  );
}

// 8. CTA Banner
function CtaBanner({ data, language, isRTL }) {
  const title = (language === 'en' && data.titleEn) ? data.titleEn : (data.title || (language === 'en' ? "Ready to Launch Your Next Milestone?" : "هل أنت مستعد لبدء مشروعك القادم؟"));
  const subtitle = (language === 'en' && data.subtitleEn) ? data.subtitleEn : (data.subtitle || (language === 'en' ? "Connect with our consultants today to transform your vision into market leadership." : "تواصل معنا اليوم لتحويل فكرتك إلى تجربة رقمية استثنائية تحقق نتائج ملموسة."));
  const btnText = (language === 'en' && data.btnTextEn) ? data.btnTextEn : (data.btnText || (language === 'en' ? "Get in Touch Now" : "تواصل معنا الآن"));

  return (
    <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="p-10 sm:p-14 border-brand-green/30 bg-gradient-to-b from-dark-900 to-dark-950 text-center space-y-6 shadow-2xl">
        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {title}
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="pt-2">
          <Button to={data.btnLink || "/contact"} variant="glow" size="lg">
            {btnText}
          </Button>
        </div>
      </Card>
    </section>
  );
}
