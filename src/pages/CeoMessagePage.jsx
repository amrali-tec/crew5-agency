import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Quote, Award, Target, Rocket, Sparkles, 
  CheckCircle2, ArrowLeft, Mail, Phone, Calendar,
  ShieldCheck, Globe2, Building2, Zap, HeartHandshake
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  Rocket,
  Zap,
  Target,
  Globe2,
  Building2
};

const DEFAULT_PILLAR_ICONS = [Target, Rocket, ShieldCheck, Award];

function resolveIcon(icon, index = 0) {
  if (!icon) return DEFAULT_PILLAR_ICONS[index % DEFAULT_PILLAR_ICONS.length];
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) return icon;
  if (typeof icon === 'string' && ICON_MAP[icon]) return ICON_MAP[icon];
  return DEFAULT_PILLAR_ICONS[index % DEFAULT_PILLAR_ICONS.length];
}

export default function CeoMessagePage() {
  const { sections } = useData();
  const { language, t, isRTL } = useLanguage();
  const leadershipPillars = sections.leadershipPillars || [];

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-24">
      <SeoHead
        title={language === 'en' ? 'CEO Message & Executive Vision | Crew5 Agency' : 'كلمة الرئيس التنفيذي والرؤية الاستراتيجية | كرو فايف'}
        description={language === 'en'
          ? 'Read the executive vision and commitment to digital excellence by the CEO & Project Directorate at Crew5 Agency.'
          : 'اقرأ رسالة الرئيس التنفيذي لكرو فايف وخارطة الطريق الاستراتيجية لدعم النمو الرقمي والابتكار في المملكة والمنطقة.'}
        url="/ceo-message"
      />
      
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          badge={language === 'en' ? 'Executive Leadership' : 'القيادة التنفيذية'}
          title={language === 'en' ? 'A Letter From The CEO' : 'كلمة الرئيس التنفيذي'}
          highlight={language === 'en' ? '& Executive Directorate' : 'وإدارة المشاريع'}
          subtitle={language === 'en'
            ? 'Our strategic roadmap and enduring commitment to spearheading digital transformation and visual mastery across Saudi Arabia and the Middle East.'
            : 'رؤيتنا الاستراتيجية والتزامنا المستمر بقيادة الابتكار وصناعة التجارب الرقمية الرائدة في المملكة والشرق الأوسط.'}
        />
      </section>

      {/* 2. Main Executive Statement Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Executive Photo & Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden border border-brand-green/30 bg-dark-900 shadow-2xl p-3">
                <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden">
                  <img
                    src="/assets/ceo_leader.jpg"
                    alt="الرئيس التنفيذي لوكالة Crew5"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/avatar_2.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent"></div>

                  <div className={`absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-dark-900/95 backdrop-blur-md border border-white/10 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-base font-black text-white">
                      {language === 'en' ? 'Leadership at Crew5 Agency' : 'القيادة التنفيذية لوكالة كرو فايف'}
                    </h4>
                    <p className="text-xs text-brand-green font-bold">
                      {language === 'en' ? 'Managing Director & Lead Strategist' : 'الرئيس التنفيذي والمشرف العام على العمليات'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Statement Content */}
          <div className={`lg:col-span-7 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/30 text-xs font-bold shadow-sm">
              <Quote className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Official Executive Address' : 'الرسالة الرسمية لشركاء النجاح'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {language === 'en' ? (
                <>
                  "We do not merely execute digital tasks; we{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-cyan">
                    engineer business legacies
                  </span>{' '}
                  that scale and thrive."
                </>
              ) : (
                <>
                  "نحن لا ننفذ مجرد خدمات تقنية، بل{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-cyan">
                    نصنع أثراً تجارياً وبصرياً
                  </span>{' '}
                  يعزز مكانة علامتك ويضاعف أرباحك."
                </>
              )}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                {language === 'en'
                  ? 'In a rapidly evolving digital era, having a routine website or an ordinary marketing campaign is no longer sufficient. Exceptional business growth demands unified digital synergy: compelling brand narrative, lightning-fast cloud web platforms, cinematic storytelling, and laser-targeted performance ads.'
                  : 'في ظل التحولات الرقمية المتسارعة والمنافسة العالية في السوق السعودي والخليجي، لم يعد مجرد التواجد الرقمي كافياً لتحقيق النجاح. إن التميز الحقيقي يتطلب منظومة متكاملة تبدأ من الهوية البصرية الجذابة، مروراً بالمنصات البرمجية فائقة السرعة، وحتى الإنتاج المرئي السينمائي والتسويق الرقمي القائم على الأرقام والعائد المالي الفعلي.'}
              </p>
              <p>
                {language === 'en'
                  ? 'At Crew5 Agency, we have built an elite multidisciplinary team of Saudi and regional innovators who treat every project as our own enterprise. We reject one-size-fits-all templates and engineer bespoke solutions that guarantee measurable commercial outcomes.'
                  : 'في وكالة كرو فايف (Crew5 Agency)، حرصنا منذ اليوم الأول على استقطاب خيرة الكفاءات الإبداعية والبرمجية لنعمل كشريك استراتيجي طويل الأمد لعملائنا. نحن لا نعتمد على القوالب الجاهزة أو الحلول التقليدية، بل نبتكر لكل مشروع هويته الخاصة وحلوله التقنية المخصصة.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="glow" size="lg" icon={ArrowLeft}>
                {t('nav.quickConsultation')}
              </Button>
              <Button to="/estimator" variant="secondary" size="lg">
                {t('estimator.badge')}
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Leadership Strategic Pillars */}
      <section className="bg-dark-900/40 border-y border-white/[0.06] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge={language === 'en' ? 'Strategic Pillars' : 'ركائز الرؤية'}
            title={language === 'en' ? 'The Foundations That Drive' : 'المرتكزات التي نقود بها'}
            highlight={language === 'en' ? 'Our Execution Quality' : 'جودة أعمالنا'}
            subtitle={language === 'en'
              ? 'Our four strategic compass points shaping every deliverable and client partnership.'
              : 'أربع ركائز أساسية توجه بوصلة قراراتنا وتضمن أعلى معايير الجودة لعملائنا.'}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipPillars.map((rawPillar, idx) => {
              const Icon = resolveIcon(rawPillar.icon, idx);
              const pillarTitle = (language === 'en' && rawPillar.titleEn) ? rawPillar.titleEn : rawPillar.title;
              const pillarDesc = (language === 'en' && rawPillar.descEn) ? rawPillar.descEn : rawPillar.desc;
              return (
                <Card key={idx} colorIndex={idx} className={`p-8 ${isRTL ? 'text-right' : 'text-left'} flex flex-col justify-between space-y-4`}>
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green mb-6 shadow-neon">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {pillarTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {pillarDesc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
