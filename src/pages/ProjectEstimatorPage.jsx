import React, { useState, useMemo } from 'react';
import { 
  FileText, CheckCircle2, Sparkles, Send, PhoneCall, 
  Download, ArrowLeft, ArrowRight, ShieldCheck, Clock, 
  HelpCircle, Layers, Globe, Video, Megaphone, 
  Flame, Check, Printer, RefreshCw, Mail, Building2, User
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { exportProjectQuotePdf } from '../utils/pdfGenerator';

const SERVICES = [
  {
    id: 'branding',
    title: 'بناء وتجديد الهوية البصرية (Branding)',
    titleEn: 'Brand Identity & Visual Architecture',
    desc: 'تصميم الشعار، دليل الأسلوب المؤسسي، المطبوعات، والهوية الرقمية المتكاملة',
    descEn: 'Logo concepts, brand manual, corporate stationery, and digital assets',
    icon: Sparkles,
    baseDays: 14,
    tiers: [
      { 
        id: 'starter', 
        title: 'باقة الانطلاق (Starter Brand)', 
        titleEn: 'Starter Brand Package',
        tag: 'للمشاريع الناشئة',
        tagEn: 'Startups',
        desc: 'تصميم شعار احترافي + لوحة الألوان والخطوط الرسمية + نماذج بطاقات وهوية رقمية أساسية',
        descEn: 'Core logo design + color palette & typography + business cards & digital assets'
      },
      { 
        id: 'growth', 
        title: 'باقة النمو الشاملة (Growth Brand)', 
        titleEn: 'Growth Brand Package',
        tag: 'الأكثر طلباً ⭐',
        tagEn: 'Most Popular ⭐',
        desc: 'شعار متطور بنماذج متعددة + دليل هوية شامل + تصاميم مطبوعات وقوالب منصات التواصل',
        descEn: 'Multi-concept logo + full brand manual + stationery & social media kits'
      },
      { 
        id: 'enterprise', 
        title: 'باقة الهوية المؤسسية (Enterprise Brand)', 
        titleEn: 'Enterprise Brand Package',
        tag: 'للشركات والمؤسسات',
        tagEn: 'Enterprises',
        desc: 'هوية كاملة للشركات الكبرى + تطبيقات مكانية ومكتبية + موشن لوجو + استراتيجية البراند',
        descEn: 'Full enterprise identity + 3D signage + animated motion logo + brand positioning'
      }
    ],
    features: [
      { id: 'motion_logo', label: 'تحريك الشعار الاحترافي (Motion Logo)', labelEn: 'Animated Motion Logo 4K', tag: 'مؤثرات بصرية', tagEn: 'VFX', days: 3 },
      { id: 'brand_book_print', label: 'تجهيز ملفات الطباعة الفاخرة وعينات الخامات', labelEn: 'Luxury Print Production Files & Specs', tag: 'مطبوعات', tagEn: 'Print', days: 2 },
      { id: 'social_templates', label: 'قوالب سوشيال ميديا قابلة للتعديل (12 قالب Figma/Canva)', labelEn: '12 Editable Social Media Templates', tag: 'تسويق', tagEn: 'Marketing', days: 4 },
      { id: 'naming_strategy', label: 'استراتيجية وتسمية العلامة التجارية (Brand Naming & Slogan)', labelEn: 'Brand Naming & Slogan Strategy', tag: 'استراتيجية', tagEn: 'Strategy', days: 5 }
    ]
  },
  {
    id: 'web_dev',
    title: 'تصميم وتطوير المتاجر والمواقع الإلكترونية',
    titleEn: 'Web & E-Commerce Engineering',
    desc: 'مواقع تعريفية فاخرة، متاجر سلة وزد وشوبيفاي، ومنصات سحابية مخصصة',
    descEn: 'Bespoke corporate portals, high-conversion stores (Salla/Zid/Shopify), and cloud apps',
    icon: Globe,
    baseDays: 18,
    tiers: [
      { 
        id: 'landing', 
        title: 'صفحة هبوط تسويقية (Landing Page)', 
        titleEn: 'High-Converting Landing Page',
        tag: 'للحملات الإعلانية',
        tagEn: 'Ad Funnels',
        desc: 'صفحة هبوط سريعة ذات معدل تحويل مرتفع موجهة لحملات المبيعات واقتناص العملاء',
        descEn: 'Ultra-fast landing page designed for paid ad campaigns and high conversion rates'
      },
      { 
        id: 'corporate', 
        title: 'موقع تعريفي مؤسسي (Corporate Web)', 
        titleEn: 'Corporate Website & CMS',
        tag: 'للشركات والجهات',
        tagEn: 'Enterprises',
        desc: 'موقع متعدد الصفحات مع لوحة تحكم كاملة، نظام مقالات، وسيو مهيأ لمحركات البحث',
        descEn: 'Multi-page corporate platform with Arabic/English CMS, blog engine, and SEO'
      },
      { 
        id: 'ecommerce', 
        title: 'متجر إلكتروني متكامل (E-Commerce Store)', 
        titleEn: 'Custom E-Commerce Store',
        tag: 'للتجارة الإلكترونية',
        tagEn: 'E-Commerce',
        desc: 'متجر بكامل بوابات الدفع والشحن وإدارة المنتجات والطلبات وتجربة مستخدم سلسة',
        descEn: 'Full store setup with payment gateways (Apple Pay/Mada), automated shipping & CRM'
      }
    ],
    features: [
      { id: 'multi_lang', label: 'دعم متعدد اللغات (عربي / إنجليزي)', labelEn: 'Bilingual Support (Arabic / English)', tag: 'عالمي', tagEn: 'Global', days: 4 },
      { id: 'payment_gateways', label: 'ربط وتفعيل بوابات الدفع الإلكتروني (مدى، فيزا، تابي، تمارا)', labelEn: 'Payment Gateway Integration (Apple Pay/Mada/Tabby)', tag: 'بوابات دفع', tagEn: 'Payments', days: 3 },
      { id: 'speed_optimization', label: 'تحسين سرعة فائق + حماية وأمان متقدم (Core Web Vitals)', labelEn: 'Speed & Security Optimization (Core Web Vitals)', tag: 'أداء وأمان', tagEn: 'Speed', days: 2 },
      { id: 'seo_setup', label: 'تهيئة السيو المتقدم والتكامل مع Google Search Console', labelEn: 'Advanced SEO & Schema.org Setup', tag: 'محركات البحث', tagEn: 'SEO', days: 3 },
      { id: 'custom_admin', label: 'لوحة تحكم إدارية مخصصة لإدارة المحتوى والصفحات والطلبات', labelEn: 'Custom Admin Dashboard for Content & Orders', tag: 'لوحة تحكم', tagEn: 'Dashboard', days: 5 }
    ]
  },
  {
    id: 'video_prod',
    title: 'الإنتاج المرئي والمونتاج السينمائي (Video Production)',
    titleEn: 'Cinematic Video Production & Motion',
    desc: 'إعلانات تجارية سينمائية، فيديوهات قصيرة Reels و TikTok، وموشن جرافيك 3D',
    descEn: 'Cinematic commercials, Reels/TikTok short-form content, and 3D Motion Graphics',
    icon: Video,
    baseDays: 10,
    tiers: [
      { 
        id: 'reels_pack', 
        title: 'حزمة ريلز وتيك توك (Short-Form Reels)', 
        titleEn: 'Short-Form Reels & TikTok Pack',
        tag: 'للسوشيال ميديا',
        tagEn: 'Social Media',
        desc: 'سلسلة من 6 فيديوهات عمودية تفاعلية مع مؤثرات صوتية وبصرية وترجمة جذابة',
        descEn: 'Series of 6 vertical engaging videos with animated subtitles and sound design'
      },
      { 
        id: 'promo_video', 
        title: 'فيديو إعلاني ترويجي (Commercial Promo)', 
        titleEn: 'Commercial Promo Video 4K',
        tag: 'الأكثر طلباً ⭐',
        tagEn: 'Top Choice ⭐',
        desc: 'إعلان احترافي عالي الدقة 4K مع سيناريو مشوق وتعديل ألوان سينمائي مخصص',
        descEn: 'High-end 4K commercial with custom scriptwriting, cinematic grading, and VFX'
      },
      { 
        id: 'motion_3d', 
        title: 'موشن جرافيك وأنيميشن 3D (3D Motion Graphics)', 
        titleEn: '3D Motion Graphics & Animation',
        tag: 'للتقنية والمنتجات',
        tagEn: '3D Tech',
        desc: 'فيديو موشن جرافيك ثلاثي الأبعاد لشرح الخدمات والتطبيقات بأسلوب ساحر',
        descEn: 'Full 3D product animation explaining features with premium voiceover'
      }
    ],
    features: [
      { id: 'voiceover_pro', label: 'تعليق صوتي احترافي بنبرة معتمدة (Voiceover)', labelEn: 'Professional Studio Voiceover', tag: 'صوتيات', tagEn: 'Audio', days: 2 },
      { id: 'sound_design', label: 'هندسة ومؤثرات صوتية سينمائية خاصة (Sound Design)', labelEn: 'Bespoke Cinematic Sound Design', tag: 'هندسة صوت', tagEn: 'SFX', days: 2 },
      { id: 'storyboard_draft', label: 'إعداد قصة مصورة وسيناريو إعلاني مكثف (Storyboard)', labelEn: 'Scriptwriting & Storyboard Blueprint', tag: 'سيناريو', tagEn: 'Script', days: 3 }
    ]
  },
  {
    id: 'marketing_growth',
    title: 'التسويق الرقمي وإدارة الحملات الإعلانية (Paid Ads & Growth)',
    titleEn: 'Performance Marketing & Paid Ads',
    desc: 'إدارة حملات تيك توك، سناب شات، جوجل وميتا، وصناعة المحتوى الإعلاني',
    descEn: 'TikTok, Snapchat, Google & Meta Ads management with ROI tracking',
    icon: Megaphone,
    baseDays: 7,
    tiers: [
      { 
        id: 'ad_setup', 
        title: 'إعداد وضبط الحسابات الإعلانية (Ads Setup)', 
        titleEn: 'Ad Account & Pixel Setup',
        tag: 'للإطلاق السريع',
        tagEn: 'Quick Launch',
        desc: 'تجهيز البكسل وأحداث التتبع Conversions API وهيكلة الحسابات الإعلانية',
        descEn: 'Full Pixel & Conversions API integration with campaign structure setup'
      },
      { 
        id: 'monthly_growth', 
        title: 'إدارة وتوسيع الحملات شهرياً (Growth Scaling)', 
        titleEn: 'Monthly Campaign Management',
        tag: 'الأعلى عائداً ⭐',
        tagEn: 'Top ROI ⭐',
        desc: 'إدارة يومية، اختبار إعلانات A/B، تحسين معدل التحويل، وتقارير أداء دورية',
        descEn: 'Daily optimization, A/B creative testing, ROAS scaling, and weekly reporting'
      }
    ],
    features: [
      { id: 'ugc_creatives', label: 'إنتاج مواد إعلانية UGC حصرية للحملة (5 فيديوهات)', labelEn: '5 Custom UGC Video Creatives', tag: 'محتوى UGC', tagEn: 'UGC', days: 4 },
      { id: 'retargeting_funnel', label: 'بناء مسارات إعادة استهداف متقدمة (Dynamic Retargeting)', labelEn: 'Dynamic Retargeting Funnel Setup', tag: 'استهداف', tagEn: 'Funnel', days: 3 }
    ]
  }
];

export default function ProjectEstimatorPage() {
  const { language, t, isRTL } = useLanguage();
  const [selectedServiceId, setSelectedServiceId] = useState('web_dev');
  const [selectedTierId, setSelectedTierId] = useState('corporate');
  const [selectedFeatures, setSelectedFeatures] = useState(['multi_lang', 'speed_optimization']);
  const [speedOption, setSpeedOption] = useState('standard'); // 'standard' | 'express'

  // Lead modal or submission
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentService = useMemo(() => {
    return SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  const currentTier = useMemo(() => {
    return currentService.tiers.find(t => t.id === selectedTierId) || currentService.tiers[0];
  }, [currentService, selectedTierId]);

  const handleSelectService = (serviceId) => {
    setSelectedServiceId(serviceId);
    const newService = SERVICES.find(s => s.id === serviceId);
    if (newService && newService.tiers.length > 0) {
      setSelectedTierId(newService.tiers[0].id);
      setSelectedFeatures([]);
    }
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) ? prev.filter(id => id !== featureId) : [...prev, featureId]
    );
  };

  const estimatedDays = useMemo(() => {
    let days = currentService.baseDays || 10;
    currentService.features.forEach(f => {
      if (selectedFeatures.includes(f.id)) {
        days += f.days || 2;
      }
    });
    if (speedOption === 'express') {
      days = Math.max(5, Math.round(days * 0.65));
    }
    return days;
  }, [currentService, selectedFeatures, speedOption]);

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setSubmitting(true);
    try {
      const selectedFeatureLabels = currentService.features
        .filter(f => selectedFeatures.includes(f.id))
        .map(f => language === 'en' ? f.labelEn : f.label);

      await api.sendMessage({
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        service: `🧮 حاسبة التكلفة: ${currentService.title} - ${currentTier.title}`,
        message: `طلب عرض سعر رسمي مخصص عبر حاسبة الأسعار:
- الخدمة: ${currentService.title}
- الباقة: ${currentTier.title}
- الإضافات: ${selectedFeatureLabels.join('، ') || 'لا يوجد'}
- السرعة: ${speedOption === 'express' ? 'تسليم سريع (Express)' : 'تسليم قياسي'}
- المدة التقديرية: ${estimatedDays} يوم عمل
- الشركة: ${clientCompany || 'غير محدد'}
- ملاحظات: ${clientNotes || 'لا يوجد'}`
      });

      setSubmitted(true);
    } catch (err) {
      alert(language === 'en' ? 'Submission error, please contact us on WhatsApp' : 'حدث خطأ في الإرسال، يمكنك التواصل معنا عبر واتساب مباشرة.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportPdf = () => {
    const selectedFeatureLabels = currentService.features
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => language === 'en' ? f.labelEn : f.label);

    exportProjectQuotePdf({
      name: clientName || (language === 'en' ? 'Valued Client' : 'عميل كرو فايف الكريم'),
      phone: clientPhone || '05xxxxxxxx',
      serviceName: language === 'en' ? currentService.titleEn : currentService.title,
      tierName: language === 'en' ? currentTier.titleEn : currentTier.title,
      selectedFeatures: selectedFeatureLabels,
      estimatedPrice: language === 'en' ? 'Custom Official Proposal' : 'عرض سعر رسمي مخصص',
      estimatedTimeline: `${estimatedDays} ${language === 'en' ? 'business days' : 'يوم عمل'}`,
      notes: clientNotes || (language === 'en' ? 'Official scope calculated via Crew5 Estimator' : 'تم احتساب المواصفات والمخرجات عبر حاسبة كرو فايف التفاعلية.')
    });
  };

  const handleSendWhatsApp = () => {
    const selectedFeatureLabels = currentService.features
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => language === 'en' ? f.labelEn : f.label);

    const text = language === 'en'
      ? `Hello Crew5 Agency Team 👋
I would like to request an official project proposal for the following scope:
• Service: ${currentService.titleEn}
• Package: ${currentTier.titleEn}
• Selected Add-ons: ${selectedFeatureLabels.join(', ') || 'Core Tier'}
• Estimated Timeline: ${estimatedDays} business days
${clientName ? `• Name: ${clientName}` : ''}`
      : `مرحباً فريق Crew5 Agency 👋
أود طلب عرض سعر رسمي لمشروعي بالمواصفات التالية:
• الخدمة: ${currentService.title}
• الباقة: ${currentTier.title}
• الميزات المحددة: ${selectedFeatureLabels.join('، ') || 'الباقة الأساسية'}
• الجدول الزمني المتوقع: ${estimatedDays} يوم عمل
${clientName ? `• الاسم: ${clientName}` : ''}`;

    window.open(`https://wa.me/966568121909?text=${encodeURIComponent(text)}`, '_blank');
  };

  const estimatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: language === 'en' ? 'Crew5 Interactive Project Cost Estimator' : 'حاسبة تكلفة وميزانية المشاريع التفاعلية | كرو فايف',
    url: 'https://crew5.agency/estimator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'أداة تفاعلية لاحتساب التكلفة والمدة الزمنية المتوقعة لمشاريع البرمجة وتصميم الهويات والتسويق الرقمي.'
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-16">
      <SeoHead
        title={language === 'en' ? 'Smart Project Cost Estimator | Crew5 Agency' : 'حاسبة تكلفة المشاريع والميزانية التقديرية | كرو فايف'}
        description={language === 'en'
          ? 'Calculate the exact scope, timeline, and investment for your custom web development, brand identity, or video production with instant transparency.'
          : 'احسب تكلفة مشروعك التقني، بناء الهوية، أو الحملات الإعلانية بدقة وتعرف على المدة الزمنية التقديرية فوراً وبشفافية كاملة مع كرو فايف.'}
        keywords="حاسبة تكلفة المواقع, سعر تصميم متجر, تكلفة هوية بصرية, أسعار شركات التسويق بالسعودية, تقدير ميزانية مشروع"
        url="/estimator"
        schemaData={estimatorSchema}
      />
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <SectionHeader
          badge={t('estimator.badge')}
          badgeVariant="green"
          badgeIcon={FileText}
          title={t('estimator.title')}
          highlight={t('estimator.highlight')}
          subtitle={t('estimator.subtitle')}
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: STEP-BY-STEP SCOPE CONFIGURATOR (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STEP 1: SELECT MAIN SERVICE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.08] space-y-6 shadow-xl">
              <div className={`flex items-center gap-3 border-b border-white/10 pb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-8 h-8 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold font-mono text-sm shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'en' ? 'Select Primary Project Service' : 'اختر مجال مشروعك الأساسي'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'en' ? 'Choose the digital service required with Crew5' : 'حدد نوع الخدمة المطلوب تنفيذها مع Crew5'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleSelectService(srv.id)}
                      className={`p-5 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all duration-300 relative group flex flex-col justify-between ${
                        isSelected
                          ? 'bg-brand-green/10 border-brand-green shadow-neon'
                          : 'bg-dark-950 border-white/5 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-brand-green text-dark-950' : 'bg-white/5 text-brand-green'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-green" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm sm:text-base">
                            {language === 'en' ? srv.titleEn : srv.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {language === 'en' ? srv.descEn : srv.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: SELECT TIER / SCOPE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.08] space-y-6 shadow-xl">
              <div className={`flex items-center gap-3 border-b border-white/10 pb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-8 h-8 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold font-mono text-sm shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'en' ? 'Choose Service Scope & Tier Level' : 'اختر حجم ونطاق الباقة (Tier Level)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'en' ? 'Select depth and coverage desired for your brand' : 'حدد مستوى التغطية والعمق المطلوب لمشروعك'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentService.tiers.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-5 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-brand-green/10 border-brand-green shadow-neon'
                          : 'bg-dark-950 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white text-sm">
                            {language === 'en' ? tier.titleEn : tier.title}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-brand-green" />}
                        </div>
                        <Badge variant={isSelected ? 'green' : 'outline'} className="text-[10px] mb-3">
                          {language === 'en' ? tier.tagEn : tier.tag}
                        </Badge>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {language === 'en' ? tier.descEn : tier.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: SELECT ADD-ON FEATURES */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.08] space-y-6 shadow-xl">
              <div className={`flex items-center justify-between border-b border-white/10 pb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold font-mono text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {language === 'en' ? 'Features & Add-Ons' : 'الميزات والإضافات المطلوبة (Features & Add-ons)'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {language === 'en' ? 'Select all additional modules to include in proposal' : 'حدد أي ميزات إضافية ترغب بإدراجها في عرض السعر'}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-brand-green font-bold">
                  {selectedFeatures.length} {language === 'en' ? 'Selected' : 'ميزات محددة'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentService.features.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 select-none ${
                        isChecked
                          ? 'bg-brand-green/10 border-brand-green/50 text-white shadow-sm'
                          : 'bg-dark-950 border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                          isChecked ? 'bg-brand-green border-brand-green text-dark-950' : 'border-white/20 bg-dark-900'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold block">
                            {language === 'en' ? feat.labelEn : feat.label}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            +{feat.days} {language === 'en' ? 'days timeline' : 'أيام مدة متوقعة'}
                          </span>
                        </div>
                      </div>
                      <Badge variant={isChecked ? 'green' : 'outline'} className="text-[10px] whitespace-nowrap">
                        {language === 'en' ? feat.tagEn : feat.tag}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: DELIVERY SPEED */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.08] space-y-6 shadow-xl">
              <div className={`flex items-center gap-3 border-b border-white/10 pb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="w-8 h-8 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold font-mono text-sm shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'en' ? 'Execution Velocity & Speed' : 'سرعة وأولوية التنفيذ (Velocity)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'en' ? 'Choose standard or accelerated turnaround' : 'اختر وتيرة العمل المناسبة لجدول إطلاق مشروعك'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setSpeedOption('standard')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    speedOption === 'standard'
                      ? 'bg-brand-green/10 border-brand-green shadow-neon text-white'
                      : 'bg-dark-950 border-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">
                      {language === 'en' ? 'Standard Timeline' : 'الجدول الزمني القياسي'}
                    </span>
                    <Badge variant={speedOption === 'standard' ? 'green' : 'outline'}>
                      {language === 'en' ? 'Standard' : 'قياسي'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">
                    {language === 'en'
                      ? 'Regular comprehensive execution and quality review cycles.'
                      : 'تنفيذ تدريجي بجولات مراجعة واختبارات قياسية متكاملة.'}
                  </p>
                </div>

                <div
                  onClick={() => setSpeedOption('express')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    speedOption === 'express'
                      ? 'bg-brand-green/10 border-brand-green shadow-neon text-white'
                      : 'bg-dark-950 border-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>{language === 'en' ? 'Express Priority Track' : 'مسار التنفيذ السريع (Express)'}</span>
                    </span>
                    <Badge variant={speedOption === 'express' ? 'amber' : 'outline'}>
                      {language === 'en' ? 'Priority ⚡' : 'أولوية قصوى ⚡'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">
                    {language === 'en'
                      ? 'Dedicated team sprint reducing project completion timeline by up to 35%.'
                      : 'فريق عمل مخصص بجهد مكثف يقلص مدة الإنجاز بنسبة تصل إلى 35%.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: LIVE PROPOSAL SUMMARY & INSTANT ACTION CARD (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900 border-2 border-brand-green/40 shadow-2xl shadow-brand-green/10 relative overflow-hidden space-y-6">
              
              <div className="flex items-center justify-between">
                <Badge variant="green" className="py-1 px-3">
                  <FileText className="w-3.5 h-3.5 inline mx-1" />
                  <span>{language === 'en' ? 'Scope Summary' : 'ملخص مواصفات المشروع'}</span>
                </Badge>
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="text-xs text-brand-green hover:text-white flex items-center gap-1.5 transition-colors font-bold bg-brand-green/10 py-1.5 px-3 rounded-lg border border-brand-green/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>

              {/* Scope Box */}
              <div className={`py-4 px-4 rounded-2xl bg-dark-950/80 border border-brand-green/20 space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-green">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'en' ? 'Bespoke Official Proposal' : 'عرض سعر رسمي مخصص ومدروس'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'en'
                    ? 'Project budget is tailored to scope, guaranteeing exceptional execution quality and high ROI.'
                    : 'يتم تسعير المشروع بناءً على نطاق العمل المحدد لضمان تقديم أعلى جودة وقيمة تنافسية تضمن نجاح علامتك.'}
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-300 border-t border-white/5">
                  <Clock className="w-3.5 h-3.5 text-brand-green shrink-0" />
                  <span>{language === 'en' ? 'Estimated Timeline: ' : 'الجدول الزمني التقديري: '}<strong>{estimatedDays} {language === 'en' ? 'days' : 'يوم عمل'}</strong></span>
                </div>
              </div>

              {/* Summary Items */}
              <div className="space-y-2.5 text-xs text-slate-300 border-t border-b border-white/10 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Service:' : 'الخدمة:'}</span>
                  <span className="font-bold text-white">{language === 'en' ? currentService.titleEn : currentService.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Tier:' : 'الباقة:'}</span>
                  <span className="font-bold text-white">{language === 'en' ? currentTier.titleEn : currentTier.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Add-ons:' : 'الإضافات المحددة:'}</span>
                  <span className="font-bold text-brand-green">{selectedFeatures.length} {language === 'en' ? 'Modules' : 'ميزات'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Speed:' : 'السرعة:'}</span>
                  <span className="font-bold text-white">{speedOption === 'express' ? (language === 'en' ? 'Express ⚡' : 'سريع (Express)') : (language === 'en' ? 'Standard' : 'قياسي')}</span>
                </div>
              </div>

              {/* ACTION 1: INSTANT WHATSAPP PROPOSAL */}
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-98"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'en' ? 'Request Proposal on WhatsApp' : 'إرسال المواصفات وطلب العرض عبر واتساب'}</span>
              </button>

              {/* ACTION 1.5: DIRECT OFFICIAL PDF PROPOSAL EXPORT */}
              <button
                type="button"
                onClick={handleExportPdf}
                className="w-full py-3 px-4 rounded-2xl bg-dark-900 hover:bg-dark-950 text-brand-green border border-brand-green/40 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-neon active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'en' ? 'Download Official PDF Proposal' : 'تحميل وثيقة عرض السعر المخصص كـ PDF'}</span>
              </button>

              {/* ACTION 2: EMAIL / PHONE DIRECT QUOTATION FORM */}
              {!submitted ? (
                <form onSubmit={handleSubmitLead} className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-300 block text-center">
                    {language === 'en' ? 'Or submit your details to receive official PDF by email:' : 'أو أرسل بياناتك وسنرسل لك العرض الرسمي بالبريد:'}
                  </span>
                  
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
                  />

                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green dir-ltr text-right"
                  />

                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green dir-ltr text-right"
                  />

                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green resize-none"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-dark-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-neon disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? t('common.sending') : t('estimator.sendQuoteBtn')}</span>
                  </button>
                </form>
              ) : (
                <div className="p-5 rounded-2xl bg-brand-green/10 border border-brand-green/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto" />
                  <h4 className="font-bold text-white text-sm">
                    {language === 'en' ? 'Quote Request Received! 🎉' : 'تم استلام طلب عرض السعر بنجاح! 🎉'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? 'Our consultants are reviewing your requirements and will reach out with the finalized SLA proposal promptly.'
                      : 'يقوم مستشار المشاريع الآن بمراجعة المتطلبات وإعداد عرض السعر الرسمي المفصل وسيتواصل معك خلال أقل من 60 دقيقة.'}
                  </p>
                </div>
              )}

              {/* Guarantee badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>{language === 'en' ? '100% Certified Official Proposals & SLA' : 'عروض أسعار رسمية معتمدة وضمان جودة 100%'}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
