import React from 'react';
import { 
  ArrowLeft, Sparkles, CheckCircle2, Star, ShieldCheck, 
  TrendingUp, Award, Zap, Play, Layers, Compass, Rocket 
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { settings } = useData();
  const { language, t, isRTL } = useLanguage();

  const stats = [
    { 
      value: "+120", 
      label: language === 'en' ? 'Completed Projects' : 'مشروع منجز', 
      icon: Rocket, 
      color: 'text-brand-green' 
    },
    { 
      value: "+50", 
      label: language === 'en' ? 'Trusted Partners' : 'عميل يثق بنا', 
      icon: ShieldCheck, 
      color: 'text-brand-cyan' 
    },
    { 
      value: "99%", 
      label: language === 'en' ? 'Client Satisfaction' : 'نسبة رضا العملاء', 
      icon: Star, 
      color: 'text-brand-amber' 
    },
    { 
      value: "+5", 
      label: language === 'en' ? 'Years Experience' : 'سنوات من الخبرة', 
      icon: Award, 
      color: 'text-brand-indigo-light' 
    }
  ];

  return (
    <section className="relative pt-36 sm:pt-40 md:pt-48 lg:pt-52 pb-20 md:pb-32 overflow-hidden">
      {/* 1. Multi-Layered Ambient Glow Auroras */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-emerald-500/12 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className={`lg:col-span-7 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'} space-y-6`}>
            
            {/* Multi-toned glowing badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-dark-900/80 border border-brand-green/30 backdrop-blur-xl shadow-neon animate-pulse-glow">
              <div className="w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-100">
                {language === 'en'
                  ? 'Premier Agency in Visual Production, Identity & Growth 🚀'
                  : 'وكالة رائدة في الإنتاج المرئي، الهوية، والتحول الرقمي 🚀'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2]">
              {language === 'en' ? (
                <>
                  Crafting Digital{' '}
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-cyan to-emerald-400 text-glow">
                      Excellence
                    </span>
                    <span className="absolute -bottom-2 right-0 left-0 h-2 bg-gradient-to-r from-brand-green via-brand-cyan to-transparent rounded-full blur-xs"></span>
                  </span>{' '}
                  That Multiplies Business Growth
                </>
              ) : (
                <>
                  نصنع الإبداع{' '}
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-cyan to-emerald-400 text-glow">
                      الرقمي
                    </span>
                    <span className="absolute -bottom-2 right-0 left-0 h-2 bg-gradient-to-r from-brand-green via-brand-cyan to-transparent rounded-full blur-xs"></span>
                  </span>{' '}
                  لتحقيق نمو تسويقي استثنائي
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {language === 'en'
                ? (settings.descriptionEn || "A bespoke creative agency transforming vision into impactful digital experiences. From software architecture to cinematic production and ROI-driven marketing.")
                : (settings.description || "وكالة متخصصة في تحويل الأفكار إلى تجارب رقمية مبتكرة. من التصميم إلى التسويق، وصناعة المحتوى، وتطوير المنصات، نحن شريكك الاستراتيجي في النمو.")}
            </p>

            {/* Quick trust points with colored icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-bold text-slate-200">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-brand-green flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>{language === 'en' ? 'Bespoke Growth Strategy' : 'استراتيجيات نمو مخصصة'}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-brand-cyan flex items-center justify-center shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span>{language === 'en' ? 'Cinematic & Web Engineering' : 'إنتاج سينمائي وهندسة ويب'}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-brand-amber flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span>{language === 'en' ? '100% Tangible ROI' : 'عائد استثماري ملموس 100%'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap items-center justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-start'} gap-4 pt-4`}>
              <Button
                to="/estimator"
                variant="glow"
                size="lg"
                icon={ArrowLeft}
                iconPosition="right"
              >
                {t('estimator.badge')}
              </Button>
              
              <Button
                to="/projects"
                variant="secondary"
                size="lg"
              >
                {language === 'en' ? 'Explore Portfolio & Results' : 'معرض الأعمال والنتائج'}
              </Button>
            </div>
          </div>

          {/* Visual Showcase (Hero Floating Card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame with glow */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-dark-900 shadow-2xl p-2.5 backdrop-blur-2xl">
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                  <img
                    src="/assets/hero_team.jpg"
                    alt="Crew5 Team Work"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent"></div>
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider block">
                          {language === 'en' ? 'Performance Matrix' : 'مؤشرات الأداء والتسليم'}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {language === 'en' ? 'Fast Execution & Guaranteed Quality' : 'تنفيذ فائق السرعة وضمان جودة'}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 bg-brand-green/20 px-2.5 py-1 rounded-lg text-brand-green text-xs font-bold font-mono">
                        <span>⚡ 99.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Widget 1 */}
              <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-dark-900/95 border border-brand-green/40 shadow-neon backdrop-blur-xl animate-float`}>
                <div className="w-10 h-10 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    {language === 'en' ? 'Client Trust Index' : 'مؤشر رضا وثقة الشركاء'}
                  </span>
                  <span className="text-base font-black text-white font-mono">99.4% CSAT</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-1 hover:border-brand-green/30 transition-colors">
                <div className={`w-8 h-8 rounded-lg bg-white/5 ${st.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{st.value}</div>
                <div className="text-xs text-slate-400 font-medium">{st.label}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
