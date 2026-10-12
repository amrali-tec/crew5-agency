import React from 'react';
import { 
  Target, Users, BarChart3, Handshake, CheckCircle, 
  Sparkles, Cpu, ShieldCheck, Rocket, Zap, Clock, Award
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyChooseUs() {
  const { sections } = useData();
  const { language, t, isRTL } = useLanguage();
  const whyUs = sections.whyChooseUs || {};

  const defaultPoints = [
    {
      icon: Sparkles,
      iconColor: 'bg-emerald-500/15 text-brand-green border-brand-green/30',
      title: language === 'en' ? "Bold Creative Thinking & Identity" : "فكر إبداعي وحلول جريئة",
      description: language === 'en' 
        ? "We innovate brand concepts and visual identities that dominate market conversations and win client devotion."
        : "نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك التجارية تتصدر المشهد وتأسر قلوب جمهورك."
    },
    {
      icon: Cpu,
      iconColor: 'bg-cyan-500/15 text-brand-cyan border-brand-cyan/30',
      title: language === 'en' ? "Lightning-Fast Cloud Web Engineering" : "هندسة برمجية فائقة السرعة",
      description: language === 'en'
        ? "We develop high-performance cloud web architectures meeting the strictest Core Web Vitals and security standards."
        : "نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان ومطابقة الـ Core Web Vitals."
    },
    {
      icon: ShieldCheck,
      iconColor: 'bg-indigo-500/15 text-brand-indigo-light border-brand-indigo/30',
      title: language === 'en' ? "Absolute Transparency & Commitment" : "الشفافية والالتزام المطلق",
      description: language === 'en'
        ? "Rigorous timeline discipline, crystal-clear budgeting with zero hidden costs, and stringent data confidentiality."
        : "نلتزم بأعلى معايير المصداقية في تسليم المشاريع، وضوح التكاليف، والسرية التامة لبياناتك."
    },
    {
      icon: Rocket,
      iconColor: 'bg-amber-500/15 text-brand-amber border-brand-amber/30',
      title: language === 'en' ? "Measurable Commercial ROI" : "عائد استثماري حقيقي (ROI)",
      description: language === 'en'
        ? "Every deliverable, funnel, and campaign we build is focused on scaling your bookings, conversions, and profits."
        : "كل عمل وحملة نصممها تهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري."
    }
  ];

  return (
    <section className="py-24 bg-dark-900/60 border-y border-white/[0.06] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual & Guarantee Card */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/assets/hero_team.jpg"
                alt="Crew5 Team Work"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent"></div>

              {/* Floating Guarantee Badge */}
              <div className="absolute bottom-6 right-6 left-6 p-6 rounded-3xl bg-dark-900/95 backdrop-blur-2xl border border-brand-green/30 shadow-neon">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green shrink-0 shadow-neon">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-black text-white">
                        {language === 'en' ? 'Long-Term Strategic Trust' : 'شراكة نجاح ممتدة وموثوقة'}
                      </h4>
                      <Badge variant="cyan" className="text-[10px]">
                        {language === 'en' ? '95% Retention' : '95% استمرارية'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {language === 'en'
                        ? 'Over 95% of our clients renew their strategic contracts yearly due to exceptional deliverables and tangible ROI.'
                        : 'أكثر من 95% من عملائنا يجددون عقودهم ويستمرون معنا لسنوات بفضل الدقة والالتزام والنتائج التنافسية.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Points List */}
          <div className={`lg:col-span-7 space-y-6 order-1 lg:order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <SectionHeader
              align={isRTL ? 'right' : 'left'}
              badge={language === 'en' ? 'Why Crew5 Agency' : (whyUs.badge || "لماذا وكالة Crew5")}
              badgeVariant="cyan"
              badgeIcon={ShieldCheck}
              title={language === 'en' ? 'Why Crew5 Agency is' : (whyUs.title || "لماذا وكالة Crew5 هي")}
              highlight={language === 'en' ? 'Your Optimal Partner?' : (whyUs.highlight || "خيارك الأمثل؟")}
              highlightGradient="from-brand-cyan via-emerald-400 to-indigo-400"
              subtitle={language === 'en' 
                ? 'We do not deliver routine marketing; we engineer a comprehensive growth ecosystem tailored for sustainable scale.'
                : (whyUs.subtitle || "نحن لا نقدم خدمات تسويقية روتينية، بل نبني منظومة متكاملة تهدف إلى تحقيق نمو مستدام. نؤمن بأن نجاحك هو مقياس نجاحنا الحقيقي.")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {defaultPoints.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={idx}
                    colorIndex={idx}
                    className={`p-5 flex flex-col justify-between ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className="space-y-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
