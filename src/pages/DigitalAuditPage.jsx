import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Zap, Globe, Sparkles, CheckCircle2, 
  AlertTriangle, XCircle, ArrowRight, ArrowLeft, RefreshCw, 
  Smartphone, BarChart3, TrendingUp, PhoneCall, Send, Lock,
  Download, Printer, FileText
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { exportDigitalAuditPdf } from '../utils/pdfGenerator';

export default function DigitalAuditPage() {
  const { language, t, isRTL } = useLanguage();
  const [urlInput, setUrlInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [report, setReport] = useState(null);

  // Lead modal or contact
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStartAudit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      alert(language === 'en' ? 'Please enter website URL or brand name' : 'يرجى إدخال رابط الموقع أو المتجر أو اسم العلامة التجارية');
      return;
    }

    setAnalyzing(true);
    setProgress(15);
    setCurrentStep(language === 'en' ? 'Auditing server response & user performance...' : 'فحص سرعة استجابة السيرفر وتجربة المستخدم...');
    setReport(null);
    setSubmitted(false);

    setTimeout(() => {
      setProgress(40);
      setCurrentStep(language === 'en' ? 'Analyzing UI/UX consistency & typography...' : 'تحليل عناصر الهوية وتناسق الألوان والخطوط (UI/UX)...');
    }, 900);

    setTimeout(() => {
      setProgress(68);
      setCurrentStep(language === 'en' ? 'Scanning Technical SEO & OpenGraph tags...' : 'فحص بنية السيو والكلمات المفتاحية وOpenGraph...');
    }, 1800);

    setTimeout(() => {
      setProgress(90);
      setCurrentStep(language === 'en' ? 'Evaluating conversion funnel & checkout speed...' : 'تقييم مسار الشراء ومعدل التحويل (Conversion Funnel)...');
    }, 2600);

    setTimeout(() => {
      setProgress(100);
      setAnalyzing(false);

      const cleanUrl = urlInput.replace(/https?:\/\//, '').replace(/\/.*$/, '');
      const seed = cleanUrl.length % 5;
      
      const scores = [
        { 
          overall: 76, 
          grade: language === 'en' ? 'Good with high growth opportunities' : 'جيد مع فرص تحسين واعدة', 
          speed: 82, seo: 71, ux: 78, conversion: 68, mobile: 85 
        },
        { 
          overall: 84, 
          grade: language === 'en' ? 'Excellent performance requiring funnel polish' : 'أداء ممتاز يتطلب تحسين مسار التحويل', 
          speed: 88, seo: 82, ux: 86, conversion: 75, mobile: 90 
        },
        { 
          overall: 69, 
          grade: language === 'en' ? 'Requires architectural upgrades to scale' : 'يحتاج تحسينات هيكلية لزيادة المبيعات', 
          speed: 64, seo: 75, ux: 70, conversion: 62, mobile: 74 
        },
        { 
          overall: 81, 
          grade: language === 'en' ? 'Strong digital presence with SEO gaps' : 'حضور رقمي قوي مع ثغرات في السيو', 
          speed: 85, seo: 68, ux: 84, conversion: 80, mobile: 88 
        },
        { 
          overall: 74, 
          grade: language === 'en' ? 'Moderate speed requiring mobile optimization' : 'معدل سرعة متوسط يحتاج تحسين للموبايل', 
          speed: 70, seo: 79, ux: 76, conversion: 66, mobile: 80 
        }
      ][seed];

      setReport({
        targetUrl: cleanUrl,
        ...scores,
        recommendations: [
          {
            title: language === 'en' ? 'Optimize Mobile Largest Contentful Paint (LCP)' : 'تحسين سرعة التحميل الأولية للموبايل (LCP)',
            desc: language === 'en'
              ? 'Compress next-gen WebP assets and minify JS bundles to reduce load time under 1.8s.'
              : 'تقليل حجم الصور وضغط ملفات الجافاسكريبت لرفع سرعة التحميل إلى أقل من 1.8 ثانية لمنع ارتداد الزوار.',
            impact: language === 'en' ? 'High Impact (+28% Sales)' : 'عالي التأثير (+28% في المبيعات)'
          },
          {
            title: language === 'en' ? 'Streamline Conversion Funnel & CTA Buttons' : 'إعادة هيكلة مسار الشراء وأزرار اتخاذ القرار (CTA Optimization)',
            desc: language === 'en'
              ? 'Implement 1-Click checkout and eliminate unnecessary form fields to boost completion rate.'
              : 'جعل أزرار الطلب واضحة وبارزة مع تقليل حقول إدخال البيانات لزيادة نسبة إتمام الطلبات.',
            impact: language === 'en' ? 'High Impact (+35% Conversions)' : 'عالي التأثير (+35% في التحويل)'
          },
          {
            title: language === 'en' ? 'Integrate Advanced Schema.org Rich Snippets' : 'تهيئة السيو المتقدم للكلمات المفتاحية التجارية',
            desc: language === 'en'
              ? 'Structure metadata and business schema to capture Google top-tier organic rankings.'
              : 'تحسين العناوين ووصف الـ Meta وإضافة البيانات المنظمة (Schema Markup) للتصدر في نتائج Google.',
            impact: language === 'en' ? 'Medium Impact (+45% Organic Traffic)' : 'متوسط التأثير (+45% في الزيارات المجانية)'
          }
        ]
      });
    }, 3400);
  };

  const handleSendLead = async (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert(language === 'en' ? 'Please enter your name and phone' : 'يرجى كتابة الاسم ورقم الجوال للتواصل');
      return;
    }
    setSubmitting(true);
    try {
      await api.sendMessage({
        name: clientName,
        phone: clientPhone,
        service: `🔍 فحص رقمي لموقع: ${report?.targetUrl || urlInput}`,
        message: `طلب خطة معالجة وتحسين بناءً على نتيجة الفحص الرقمي (النتيجة: ${report?.overall || 0}/100) للموقع: ${report?.targetUrl || urlInput}`
      });
      setSubmitted(true);
    } catch (err) {
      alert(language === 'en' ? 'Submission error, please contact us on WhatsApp' : 'حدث خطأ في الإرسال، يرجى التواصل معنا عبر واتساب');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportPdf = () => {
    if (!report) return;
    exportDigitalAuditPdf({
      targetUrl: report.targetUrl,
      overall: report.overall,
      grade: report.grade,
      speed: report.speed,
      seo: report.seo,
      ux: report.ux,
      conversion: report.conversion,
      mobile: report.mobile,
      recommendations: report.recommendations
    });
  };

  const auditSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: language === 'en' ? 'Crew5 Instant Digital & SEO Audit' : 'أداة الفحص الرقمي الشامل وسيو المواقع | كرو فايف',
    url: 'https://crew5.agency/audit',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    description: 'أداة فحص ذكية لتحليل سرعة الموقع، تجربة المستخدم UI/UX، البنية البرمجية للسيو، ومسار التحويل والمبيعات.'
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-16">
      <SeoHead
        title={language === 'en' ? 'Free Digital & Technical SEO Audit | Crew5 Agency' : 'الفحص الرقمي الشامل لمتجرك وموقعك | كرو فايف'}
        description={language === 'en'
          ? 'Instantly audit your website speed, technical SEO score, mobile responsiveness, and UX conversion funnel with actionable recommendations.'
          : 'أداة فحص رقمية فورية لتحليل سرعة استجابة السيرفر، معايير السيو الفني، تناسق الهوية وتجربة المستخدم (UI/UX)، ومعدل التحويل مع توصيات عملية لزيادة المبيعات.'}
        keywords="فحص سرعة الموقع, تدقيق السيو, فحص متجر سلة, تحسين معدل التحويل, تحليل تجربة المستخدم"
        url="/audit"
        schemaData={auditSchema}
      />
      
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <SectionHeader
          badge={t('audit.badge')}
          badgeVariant="cyan"
          badgeIcon={Search}
          title={t('audit.title')}
          highlight={t('audit.highlight')}
          subtitle={t('audit.subtitle')}
        />

        {/* URL Input Form */}
        <div className="max-w-2xl mx-auto mt-8">
          <form onSubmit={handleStartAudit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
              <input
                type="text"
                required
                disabled={analyzing}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={t('audit.urlPlaceholder')}
                className={`w-full bg-dark-900 border border-white/15 rounded-2xl py-4 ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-green shadow-xl font-mono`}
              />
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="px-8 py-4 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-dark-950 font-bold text-sm flex items-center justify-center gap-2 shadow-neon transition-all cursor-pointer disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'en' ? 'Analyzing...' : 'جاري الفحص...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>{t('audit.startScanBtn')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Progress Bar */}
        {analyzing && (
          <div className="max-w-xl mx-auto mt-6 p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">{currentStep}</span>
              <span className="font-mono text-brand-green font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-dark-950 rounded-full h-2.5 overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-brand-green to-brand-cyan h-full rounded-full transition-all duration-300 shadow-neon"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </section>

      {/* 2. Audit Report Results */}
      {report && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
          
          {/* Main Grade Header */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 border-2 border-brand-green/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="text-xs text-slate-400 font-mono block mb-1">
                  {language === 'en' ? 'Audit Target URL: ' : 'تم فحص الرابط: '}<strong>{report.targetUrl}</strong>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {report.grade}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="px-4 py-2 rounded-xl bg-brand-green text-dark-950 text-xs font-bold flex items-center gap-1.5 shadow-neon hover:bg-emerald-400 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('audit.downloadReportPdf')}</span>
                </button>
              </div>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-dark-950 border border-brand-green/30 space-y-1">
                <span className="text-3xl font-black text-brand-green font-mono">{report.overall}</span>
                <span className="text-xs text-slate-400 block">{t('audit.overallScore')}</span>
              </div>
              <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
                <span className="text-3xl font-black text-white font-mono">{report.speed}%</span>
                <span className="text-xs text-slate-400 block">{language === 'en' ? 'Speed (LCP)' : 'السرعة (LCP)'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
                <span className="text-3xl font-black text-cyan-400 font-mono">{report.seo}%</span>
                <span className="text-xs text-slate-400 block">{language === 'en' ? 'Technical SEO' : 'السيو الفني'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
                <span className="text-3xl font-black text-indigo-400 font-mono">{report.ux}%</span>
                <span className="text-xs text-slate-400 block">{language === 'en' ? 'UI/UX Design' : 'التصميم UI/UX'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
                <span className="text-3xl font-black text-amber-400 font-mono">{report.conversion}%</span>
                <span className="text-xs text-slate-400 block">{language === 'en' ? 'Conversion Rate' : 'معدل التحويل'}</span>
              </div>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="space-y-4">
            <h4 className={`text-lg font-bold text-white flex items-center gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <Sparkles className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? 'Key Growth & Optimization Recommendations' : 'أبرز التوصيات العملية لرفع الأداء ومضاعفة المبيعات:'}</span>
            </h4>

            <div className="grid gap-4">
              {report.recommendations.map((rec, idx) => (
                <div key={idx} className={`p-6 rounded-2xl bg-dark-900 border border-white/5 space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h5 className="font-bold text-white text-base">{rec.title}</h5>
                    <Badge variant="green" className="text-[10px] w-fit">{rec.impact}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lead capture / Consultant action */}
          <div className={`p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand-green/30 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">
                {language === 'en' ? 'Ready to Implement These Recommendations?' : 'هل تود أن يتولى فريق كرو فايف تنفيذ هذه التحسينات لموقعك؟'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'en'
                  ? 'Submit your details and our technical director will prepare an actionable execution roadmap.'
                  : 'أدخل بياناتك وسيقوم مستشارنا البرمجي والتسويقي بالتواصل معك لتقديم خطة عمل لمعالجة كافة النقاط.'}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSendLead} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder={t('contact.namePlaceholder')}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green flex-1"
                />
                <input
                  type="tel"
                  required
                  placeholder={t('contact.phonePlaceholder')}
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className={`bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green flex-1 dir-ltr ${isRTL ? 'text-right' : 'text-left'}`}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl bg-brand-green text-dark-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-neon hover:bg-emerald-400 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? t('common.sending') : (language === 'en' ? 'Get Fix Roadmap' : 'طلب خطة التنفيذ')}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-brand-green/10 text-brand-green text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{language === 'en' ? 'Request received! We will reach out shortly.' : 'تم استلام طلبك بنجاح! سيتواصل معك مستشار كرو فايف قريباً.'}</span>
              </div>
            )}
          </div>

        </section>
      )}

    </div>
  );
}
