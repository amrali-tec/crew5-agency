import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowLeft, Clock, ShieldCheck, Sparkles, 
  HelpCircle, ChevronDown, ChevronRight, PhoneCall, FileText, 
  Layers, Code2, Film, Camera, SearchCheck, Share2, Palette, Send,
  Cpu, Rocket, Zap, HeartHandshake, Award
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { allServicesList, servicesCategories } from '../data/services';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeService } from '../utils/localize';
import { api } from '../services/api';
import { exportProjectQuotePdf } from '../utils/pdfGenerator';

const ICON_MAP = {
  Code2,
  Sparkles,
  SearchCheck,
  Film,
  Camera,
  Share2,
  Palette,
  Layers,
  Cpu,
  Rocket,
  Zap,
  HeartHandshake,
  Award
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { services: dataServices, settings } = useData();
  const { language, t, isRTL } = useLanguage();

  // Find service from data context or local list
  const allServices = (dataServices && dataServices.length > 0)
    ? dataServices.flatMap(cat => (cat.services || []).map(s => ({ 
        ...s, 
        categoryId: cat.id, 
        categoryName: cat.title, 
        categoryNameEn: cat.titleEn,
        categoryBadge: cat.badge,
        categoryBadgeEn: cat.badgeEn 
      })))
    : allServicesList;

  const rawService = allServices.find(s => s.slug === slug || s.id === slug) || allServicesList.find(s => s.slug === slug || s.id === slug);
  const service = localizeService(rawService, language);

  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!service) {
    return (
      <div className="pt-44 pb-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          {language === 'en' ? 'Service Not Found' : 'الخدمة غير متوفرة'}
        </h2>
        <p className="text-slate-400 mb-8">
          {language === 'en' ? 'Sorry, the requested service was not found.' : 'عذراً، الخدمة المطلوبة غير موجودة أو تم تعديل مسارها.'}
        </p>
        <Button to="/services" variant="primary" icon={ArrowLeft} iconPosition="left">
          {language === 'en' ? 'Explore All Services' : 'استعراض كافة الخدمات'}
        </Button>
      </div>
    );
  }

  const ServiceIcon = ICON_MAP[service.icon] || Sparkles;

  // Other related services in same or other categories
  const relatedServices = allServices
    .filter(s => s.id !== service.id && s.slug !== service.slug)
    .slice(0, 3)
    .map(s => localizeService(s, language));

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) return;
    setBookingSubmitting(true);
    try {
      await api.sendMessage({
        name: bookingForm.name,
        phone: bookingForm.phone,
        email: bookingForm.email,
        service: `🚀 طلب خدمة: ${service.title}`,
        message: `طلب استشارة وتفاصيل بخصوص خدمة: ${service.title}. ملاحظات العميل: ${bookingForm.notes || 'لا يوجد'}`
      });
      setBookingSuccess(true);
    } catch (err) {
      alert(language === 'en' ? 'Failed to submit, please reach us on WhatsApp.' : 'حدث خطأ في الإرسال، يرجى التواصل معنا عبر واتساب');
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleDownloadQuickQuote = () => {
    exportProjectQuotePdf({
      name: bookingForm.name || (language === 'en' ? 'Valued Client' : 'عميل كرو فايف المهتم'),
      phone: bookingForm.phone || '05xxxxxxxx',
      serviceName: service.title,
      tierName: language === 'en' ? 'Custom Package' : 'الباقة المخصصة',
      selectedFeatures: service.features || [],
      estimatedPrice: service.pricingTier || t('services.customPricing'),
      estimatedTimeline: service.estimatedTimeline || '15 business days',
      notes: `Official proposal summary for ${service.title}`
    });
  };

  // Schema.org Structured Data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        provider: {
          '@type': 'Organization',
          name: 'Crew5 Agency',
          url: 'https://crew5.agency'
        },
        areaServed: [
          { '@type': 'Country', name: 'Saudi Arabia' },
          { '@type': 'Country', name: 'Egypt' },
          { '@type': 'Country', name: 'United Arab Emirates' }
        ],
        description: service.description,
        offers: {
          '@type': 'Offer',
          price: service.pricingTier || 'Custom Quote',
          priceCurrency: 'SAR'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: language === 'en' ? 'Home' : 'الرئيسية',
            item: 'https://crew5.agency/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: language === 'en' ? 'Services' : 'الخدمات',
            item: 'https://crew5.agency/services'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `https://crew5.agency/services/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-24">
      <SeoHead
        title={service.title}
        description={service.description || service.heroSubtitle}
        keywords={service.seoKeywords || `${service.title}, خدمات كرو فايف, وكالة تسويق بالرياض, برمجة وتصميم`}
        url={`/services/${slug}`}
        type="service"
        schemaData={serviceSchema}
      />

      {/* 1. HERO SECTION & BREADCRUMBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
          <ChevronRight className={`w-4 h-4 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
          <Link to="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link>
          <ChevronRight className={`w-4 h-4 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="text-brand-green font-bold truncate">{service.shortTitle || service.title}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className={`lg:col-span-8 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="green">{service.badge || service.categoryBadge || (language === 'en' ? 'Certified Solution' : 'خدمة معتمدة')}</Badge>
              {service.estimatedTimeline && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-brand-green" />
                  <span>{language === 'en' ? 'Timeline: ' : 'المدة المتوقعة: '}{service.estimatedTimeline}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {service.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {service.heroSubtitle || service.description}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button to="#order-form" variant="glow" size="lg" icon={ArrowLeft}>
                {t('services.orderFormTitle')}
              </Button>
              <Button to="/estimator" variant="outline" size="lg">
                {language === 'en' ? '🧮 Cost & Scope Estimator' : '🧮 حاسبة التكلفة والميزات'}
              </Button>
              <button
                onClick={handleDownloadQuickQuote}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-sm font-bold transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-brand-green" />
                <span>{t('services.downloadSummaryPdf')}</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-4">
            <Card className={`p-8 border-brand-green/30 shadow-neon ${isRTL ? 'text-right' : 'text-left'} space-y-6 relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900`}>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-neon">
                <ServiceIcon className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">{language === 'en' ? 'Pricing Tier' : 'تسعير الخدمة'}</span>
                <h3 className="text-xl font-bold text-white text-brand-green">
                  {t('services.customPricing')}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {language === 'en'
                    ? 'Accurately calculated based on tailored project scope & features.'
                    : 'يتم احتساب التكلفة بدقة وفق ميزات ونطاق مشروعك عبر النموذج'}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>{language === 'en' ? 'Detailed official SLA contract' : 'عقد رسمي مفصل وضمان جودة'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>{language === 'en' ? 'Dedicated project manager & continuous support' : 'مدير مشروع مخصص ودعم فني مستمر'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>{language === 'en' ? '100% open source file deliverables' : 'تسليم كافة الملفات المصدرية المفتوحة'}</span>
                </div>
              </div>

              <a
                href="#order-form"
                className="w-full block py-3 text-center rounded-xl bg-brand-green text-dark-950 font-bold text-sm shadow-neon hover:bg-[#00c965] transition-all"
              >
                {t('common.getStarted')}
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMS SOLVED & MARKET CHALLENGES */}
      {service.problemsSolved && service.problemsSolved.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={language === 'en' ? 'Challenges & Solutions' : 'تحديات وحلول'}
            badgeVariant="cyan"
            title={t('services.problemsTitle')}
            highlight={language === 'en' ? 'Strategic Value Added' : 'القيمة المضافة'}
            subtitle={language === 'en'
              ? 'Common market roadblocks solved through our precision workflows.'
              : 'كيف نتغلب على أبرز المشكلات الشائعة التي تواجه الشركات وأصحاب الأعمال في السوق.'}
          />

          <div className="grid md:grid-cols-3 gap-6">
            {service.problemsSolved.map((item, idx) => (
              <Card key={idx} colorIndex={idx} className={`p-6 sm:p-8 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold leading-relaxed">
                  <span className="block text-[10px] text-rose-300 uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Market Obstacle' : 'المشكلة الشائعة:'}
                  </span>
                  {item.problem}
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-brand-green/30 text-slate-200 text-xs leading-relaxed">
                  <span className="block text-[10px] text-brand-green font-bold uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Crew5 Engineered Solution' : 'حل وكالة كرو فايف:'}
                  </span>
                  {item.solution}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 3. DELIVERABLES (What you get) */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="bg-dark-900/40 border-y border-white/[0.06] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge={language === 'en' ? 'Deliverables & Outputs' : 'المخرجات والملفات المسلمة'}
              title={t('services.deliverablesTitle')}
              highlight={language === 'en' ? 'Tangible Assets' : 'أصول معتمدة'}
              subtitle={language === 'en'
                ? 'High-standard assets and solutions delivered to your business.'
                : 'قائمة بالمخرجات والملفات المعتمدة والأنظمة التي سيتسلمها فريقك مع نهاية المشروع.'}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.deliverables.map((deliv, idx) => (
                <Card key={idx} colorIndex={idx} className={`p-6 flex items-start gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="w-8 h-8 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center shrink-0 font-bold text-sm">
                    ✓
                  </div>
                  <p className="text-sm text-slate-200 font-medium leading-relaxed">
                    {deliv}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. EXECUTION PROCESS STEPS */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={language === 'en' ? 'Execution Roadmap' : 'مراحل التنفيذ'}
            title={t('services.processTitle')}
            highlight={language === 'en' ? 'Phase-by-Phase Delivery' : 'خطوة بخطوة'}
            subtitle={language === 'en'
              ? 'Our structured delivery lifecycle from discovery to launch.'
              : 'منهجية العمل المتبعة من لحظة دراسة المتطلبات وحتى الإطلاق النهائي والمتابعة.'}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((st, idx) => (
              <Card key={idx} colorIndex={idx} className={`p-6 sm:p-8 space-y-4 ${isRTL ? 'text-right' : 'text-left'} flex flex-col justify-between`}>
                <div>
                  <span className="font-montserrat font-black text-3xl text-brand-green/40 group-hover:text-brand-green transition-colors block mb-3">
                    {st.step}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-green transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 5. TECH STACK */}
      {service.techStack && service.techStack.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {t('services.techTitle')}
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-bold text-slate-200 hover:border-brand-green/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 6. FAQS SPECIFIC TO THIS SERVICE */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeader
            badge={t('nav.faq')}
            title={language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة حول'}
            highlight={service.shortTitle || service.title}
            subtitle={language === 'en'
              ? 'Answers to key inquiries regarding scope, timelines, and deliverables.'
              : 'إجابات على أكثر الاستفسارات تكراراً حول آلية العمل، التكاليف، والمخرجات.'}
          />

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-dark-900/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className={`w-full p-6 ${isRTL ? 'text-right' : 'text-left'} flex items-center justify-between gap-4 font-bold text-white text-base hover:text-brand-green transition-colors cursor-pointer`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-green' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className={`px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. ORDER / INQUIRY BOOKING FORM (Anchor #order-form) */}
      <section id="order-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
        <Card className={`p-8 sm:p-12 border-brand-green/40 shadow-2xl bg-gradient-to-b from-dark-900 to-dark-950 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="space-y-3 mb-8">
            <Badge variant="green">{language === 'en' ? 'Direct Proposal' : 'طلب عرض سعر معتمد'}</Badge>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('services.orderFormTitle')}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('services.orderFormSubtitle')}
            </p>
          </div>

          {bookingSuccess ? (
            <div className="p-8 rounded-2xl bg-brand-green/10 border border-brand-green/40 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
              <h4 className="text-xl font-bold text-white">
                {language === 'en' ? 'Request Submitted Successfully!' : 'تم استلام طلبك بنجاح!'}
              </h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {language === 'en'
                  ? 'Thank you. Our project specialists will review your requirements and get in touch within 2 hours.'
                  : `شكراً لك. سيقوم مسؤول خدمات ${service.title} بدراسة متطلباتك والتواصل معك عبر الواتساب أو الهاتف خلال أقل من ساعتين.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.fullName')} *</label>
                  <input
                    type="text"
                    required
                    placeholder={t('contact.namePlaceholder')}
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.phoneLabel')} *</label>
                  <input
                    type="tel"
                    required
                    placeholder={t('contact.phonePlaceholder')}
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors dir-ltr text-right"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.emailLabel')}</label>
                <input
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors dir-ltr text-right"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.notesLabel')}</label>
                <textarea
                  rows={4}
                  placeholder={t('contact.messagePlaceholder')}
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={bookingSubmitting}
                className="w-full py-4 rounded-xl bg-brand-green hover:bg-[#00c965] text-dark-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-neon hover:shadow-neon-hover disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{bookingSubmitting ? t('common.sending') : t('services.submitOrderBtn')}</span>
              </button>
            </form>
          )}
        </Card>
      </section>

      {/* 8. RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeader
            badge={language === 'en' ? 'Related Solutions' : 'خدمات وحلول إضافية'}
            title={language === 'en' ? 'Complementary Creative Solutions' : 'حلول وخدمات إبداعية أخرى'}
            highlight={language === 'en' ? 'For Your Business' : 'تكمل نجاح مشروعك'}
            subtitle={language === 'en'
              ? 'Explore our integrated creative ecosystem to accelerate your brand.'
              : 'استكشف باقي خدمات كرو فايف لبناء منظومة رقمية متكاملة تحقق لك أعلى عائد.'}
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {relatedServices.map((rel, idx) => (
              <Card key={rel.id} colorIndex={idx} className={`p-6 flex flex-col justify-between ${isRTL ? 'text-right' : 'text-left'}`}>
                <div>
                  <Badge variant="cyan" className="mb-3">{rel.badge || rel.categoryBadge || t('nav.services')}</Badge>
                  <h4 className="text-lg font-bold text-white mb-2">{rel.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{rel.description}</p>
                </div>
                <Link
                  to={`/services/${rel.slug || rel.id}`}
                  className="text-xs font-bold text-brand-green hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>{t('services.viewDetails')}</span>
                  <ArrowLeft className={`w-3.5 h-3.5 ${!isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
