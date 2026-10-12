import React from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, PhoneCall, FileText, Zap, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function CtaSection() {
  const { language, t, isRTL } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 border-2 border-brand-green/30 shadow-neon-lg overflow-hidden text-center">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs sm:text-sm font-bold shadow-neon">
              <Sparkles className="w-4 h-4" />
              <span>
                {language === 'en' ? 'Strategy Session & Custom Project Proposal 🚀' : 'جلسة استشارية وعرض سعر مخصص لمشروعك 🚀'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {language === 'en' ? (
                <>
                  Ready to Launch{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-cyan to-emerald-300 text-glow">
                    Your Next Venture
                  </span>{' '}
                  With Highest Creative Caliber?
                </>
              ) : (
                <>
                  هل أنت مستعد لتبدأ{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-cyan to-emerald-300 text-glow">
                    مشروعك القادم
                  </span>{' '}
                  بأعلى معايير الإبداع؟
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              {language === 'en'
                ? 'Let us transform your vision into an actionable growth strategy, cinematic narrative, and high-performance digital engine.'
                : 'دعنا نناقش فكرتك ونحولها إلى استراتيجية تسويقية وتصميم مرئي ومنصة رقمية تحقق لك التفوق على منافسيك. تواصل مع فريق Crew5 اليوم.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                to="/estimator"
                variant="glow"
                size="lg"
                icon={FileText}
                iconPosition="right"
              >
                {t('estimator.badge')}
              </Button>
              
              <Button
                to="/contact"
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
              >
                {t('nav.quickConsultation')}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{language === 'en' ? '60-Minute Response Guarantee' : 'رد واستجابة سريعة خلال 60 دقيقة'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>{language === 'en' ? 'Official SLA & Quality Assurance' : 'عقود رسمية وضمان جودة معتمد'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-amber/20 text-brand-amber flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>{language === 'en' ? 'Bespoke Expert Teams' : 'تنفيذ متقن بفرق عمل متخصصة'}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
