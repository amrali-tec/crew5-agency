import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Award, Target, Rocket, ShieldCheck, 
  HeartHandshake, Compass, CheckCircle2, ArrowLeft,
  Quote, Lightbulb, Zap, Users, Cpu, TrendingUp, ChevronRight
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeTeamMember } from '../utils/localize';
import BlockRenderer from '../components/builder/BlockRenderer';

const ICON_MAP = {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  Rocket,
  Zap,
  Target,
  Compass,
  Lightbulb,
  TrendingUp,
  Users,
  Cpu
};

const DEFAULT_VALUE_ICONS = [Sparkles, ShieldCheck, Award, HeartHandshake, Rocket, Zap];

function resolveIcon(icon, index = 0) {
  if (!icon) return DEFAULT_VALUE_ICONS[index % DEFAULT_VALUE_ICONS.length];
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) return icon;
  if (typeof icon === 'string' && ICON_MAP[icon]) return ICON_MAP[icon];
  return DEFAULT_VALUE_ICONS[index % DEFAULT_VALUE_ICONS.length];
}

export default function AboutPage() {
  const { team, settings, sections, pages = [] } = useData();
  const { language, t, isRTL } = useLanguage();

  const values = sections.coreValues || [];
  const methodologySteps = sections.methodology || [];

  const aboutPage = pages.find(p => p.slug === 'about');
  const blocks = aboutPage?.blocks || [];
  const injectedBlocks = blocks.filter(b => b.type === 'custom_component');

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Crew5 Agency',
      'alternateName': 'وكالة كرو فايف للإبداع والتسويق الرقمي',
      'url': 'https://crew5.agency',
      'logo': 'https://crew5.agency/assets/favicon_512.png',
      'description': 'وكالة إبداعية متكاملة تأسست لتمكين العلامات التجارية في المملكة والخليج عبر حلول تسويقية وبرمجية وبصرية استثنائية.'
    }
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-28">
      <SeoHead
        title={language === 'en' ? 'About Us | Crew5 Creative Agency' : 'من نحن | وكالة كرو فايف للحلول الرقمية والإبداعية'}
        description={language === 'en'
          ? 'Discover the story, core values, and elite team behind Crew5 Agency. Driving digital transformation and creative growth across Saudi Arabia and the Middle East.'
          : 'تعرف على قصة وكالة كرو فايف، قيمنا المؤسسية، فريق الخبراء، ومنهجيتنا في صناعة الريادة الرقمية وبناء الحلول الإبداعية في السعودية والمنطقة.'}
        keywords="من نحن كرو فايف, وكالة تسويق سعودية, شركة برمجة بالرياض, أفضل وكالة تسويق رقمي, فريق كرو فايف"
        url="/about"
        schemaData={aboutSchema}
      />
      {injectedBlocks.map((b, idx) => (
        <BlockRenderer key={`about-comp-${idx}`} block={b} />
      ))}
      
      {/* 1. Header Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          badge={t('nav.about')}
          title={language === 'en' ? "Our Story, Values & Vision" : "قصتنا، قيمنا، ورؤيتنا التي"}
          highlight={language === 'en' ? "Shaping The Digital Future" : "تصنع المستقبل الرقمي"}
          subtitle={language === 'en'
            ? "A full-service creative agency founded with a single mission: enabling ambitious brands in Saudi Arabia and the GCC to dominate their markets through exceptional digital, visual, and technical solutions."
            : "وكالة إبداعية متكاملة تأسست برؤية واضحة: تمكين العلامات التجارية الطموحة في المملكة والخليج من قيادة أسواقها عبر حلول تسويقية وبرمجية وبصرية استثنائية."}
        />

        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl mt-12 max-h-[500px]">
          <img
            src="/assets/hero_team.jpg"
            alt="Crew5 Agency Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>
          
          <div className={`absolute bottom-8 right-8 left-8 ${isRTL ? 'text-right' : 'text-left'} max-w-2xl`}>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {language === 'en' ? 'Passion for Excellence & National Leadership' : 'شغف بالتميز، والتزام بالريادة الوطنية'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'en'
                ? 'We began with deep creative drive and technical mastery. Today, we proudly partner with market leaders, enterprises, and medical institutions in Riyadh and across the region.'
                : 'بدأنا كفريق يجمع بين الشغف الإبداعي والخبرة التقنية العميقة، واليوم نفخر بخدمة كبرى الشركات والمراكز الطبية والمؤسسات التجارية في الرياض وكافة مدن المملكة.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Executive Leadership Highlight Card (Link to CEO Message) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-10 border-brand-green/30 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className={`lg:col-span-8 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/30 text-xs font-bold">
                <Quote className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Executive Leadership Message' : 'رسالة القيادة التنفيذية'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {language === 'en'
                  ? '"We build the strategic digital identity that earns client trust and propels your business to market leadership."'
                  : '"نحن نبني الهوية الرقمية التي تمنح علامتك الثقة وتدفع بأعمالك نحو الريادة."'}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                {language === 'en'
                  ? 'Explore the strategic vision and roadmap with which our executive leadership guides digital transformation and visual architecture for our partners.'
                  : 'تعرف على الرؤية الاستراتيجية وخطة العمل التي تقود بها إدارتنا التنفيذية مشاريع التحول الرقمي وصناعة الهويات البصرية لشركائنا.'}
              </p>

              <div className="pt-2">
                <Link
                  to="/ceo-message"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-white transition-colors group"
                >
                  <span>{language === 'en' ? 'Read CEO Message in Full' : 'قراءة كلمة الرئيس التنفيذي كاملة'}</span>
                  <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${!isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-brand-green/50 p-1 bg-dark-850 shadow-neon shrink-0">
                <img
                  src="/assets/ceo_leader.jpg"
                  alt="CEO Leader"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/avatar_2.jpg';
                  }}
                />
              </div>
            </div>

          </div>
        </Card>
      </section>

      {/* 3. Story, Mission, and Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          <Card colorIndex={0} className={`p-8 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-neon">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">
              {language === 'en' ? 'Our Mission' : 'رسالتنا'}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {language === 'en'
                ? 'Empowering enterprises to establish an exceptional digital presence combining captivating brand identity with high-speed platforms for maximum ROI.'
                : 'تمكين الشركات من بناء حضور رقمي استثنائي يجمع بين الهوية البصرية الجذابة والمنصات التقنية فائقة الأداء، لتحقيق أعلى عائد استثماري ونمو مستدام.'}
            </p>
          </Card>

          <Card colorIndex={1} className={`p-8 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-neon">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">
              {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {language === 'en'
                ? 'To stand as the benchmark creative and digital transformation agency in the Kingdom and GCC, pioneering marketing engineering and cinematic production.'
                : 'أن نكون الوكالة الإبداعية والرقمية الرائدة في المملكة ومنطقة الخليج، والمعيار الأول في ابتكار الحلول التسويقية والإنتاج البصري وتطوير الويب.'}
            </p>
          </Card>

          <Card colorIndex={2} className={`p-8 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-neon">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white">
              {language === 'en' ? 'Our Standards' : 'معاييرنا'}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {language === 'en'
                ? 'We adhere to uncompromising global benchmarks in design, high-security code (Core Web Vitals), strict deadline precision, and proactive post-launch support.'
                : 'نلتزم بمعايير الجودة العالمية في التصميم، أمان وسرعة الكود البرمجي (Core Web Vitals)، والدقة المتناهية في مواعيد التسليم وخدمة ما بعد الإطلاق.'}
            </p>
          </Card>

        </div>
      </section>

      {/* 4. Core Values (6 Pillars) */}
      <section className="bg-dark-900/40 border-y border-white/[0.06] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={language === 'en' ? 'Our Core Values' : 'قيمنا الجوهرية'}
            title={language === 'en' ? 'Pillars Governing Our' : 'المبادئ الراسخة التي تحكم'}
            highlight={language === 'en' ? 'Operational Philosophy' : 'أسلوب عملنا'}
            subtitle={language === 'en'
              ? 'True innovation stems from unwavering principles prioritizing client success, confidentiality, and commercial impact.'
              : 'نؤمن بأن الإبداع الحقيقي ينبع من الالتزام بمبادئ وقيم واضحة تضع مصلحة العميل ونجاحه في صدارة أولوياتنا.'}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = resolveIcon(v.icon, i);
              const title = (language === 'en' && v.titleEn) ? v.titleEn : v.title;
              const desc = (language === 'en' && v.descEn) ? v.descEn : v.desc;
              return (
                <Card key={i} colorIndex={i} className={`p-8 ${isRTL ? 'text-right' : 'text-left'} flex flex-col justify-between`}>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-300 shadow-neon">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. The 5-Step Strategic Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge={language === 'en' ? 'Our Methodology' : 'منهجية واستراتيجية العمل'}
          title={language === 'en' ? 'How We Transform Visions Into' : 'كيف نحول أفكارك إلى'}
          highlight={language === 'en' ? 'Digital Success Reality' : 'واقع رقمي ناجح؟'}
          subtitle={language === 'en'
            ? 'A 5-phase structured workflow ensuring velocity, milestone precision, and maximum commercial outcomes.'
            : 'نتبع مساراً استراتيجياً خماسي المراحل مصمم بدقة لضمان سرعة الإنجاز ودقة التنفيذ وتحقيق أعلى النتائج.'}
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {methodologySteps.map((rawStep, idx) => {
            const stepTitle = (language === 'en' && rawStep.titleEn) ? rawStep.titleEn : rawStep.title;
            const stepDesc = (language === 'en' && rawStep.descEn) ? rawStep.descEn : rawStep.desc;
            return (
              <Card key={idx} colorIndex={idx} className={`p-6 ${isRTL ? 'text-right' : 'text-left'} relative flex flex-col justify-between`}>
                <div>
                  <span className="font-montserrat font-black text-3xl opacity-40 group-hover:opacity-100 transition-opacity block mb-4">
                    {rawStep.step}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {stepTitle}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stepDesc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 6. Creative Team Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge={language === 'en' ? 'Leadership & Team' : 'فريق العمل'}
          title={language === 'en' ? 'The Creative Engineers' : 'نخبة المبدعين والمطورين'}
          highlight={language === 'en' ? 'Behind Crew5 Success' : 'خلف نجاح Crew5'}
          subtitle={language === 'en'
            ? 'A multidisciplinary team of growth strategists, brand designers, full-stack engineers, and video directors.'
            : 'فريق متكامل يجمع بين الاستراتيجيين في التسويق، مصممي الهويات، مهندسي الويب، ومخرجي المحتوى السينمائي.'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((rawMember, idx) => {
            const member = localizeTeamMember(rawMember, language);
            return (
              <Card key={member.id} colorIndex={idx} className="p-8 flex flex-col items-center text-center">
                
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-brand-green/40 shadow-neon p-1 bg-dark-850 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-8 h-8 rounded-full bg-brand-green text-dark-950 font-montserrat font-bold text-xs flex items-center justify-center border-2 border-dark-950`}>
                    {member.initials || 'CR'}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-brand-green transition-colors">
                  {member.name}
                </h4>
                
                <p className="text-xs sm:text-sm text-brand-green font-semibold mb-3">
                  {member.role}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Skills */}
                {member.skills && (
                  <div className="flex flex-wrap justify-center gap-1.5 mt-auto pt-4 border-t border-white/[0.06] w-full">
                    {member.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

              </Card>
            );
          })}
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="p-10 sm:p-14 border-brand-green/30 bg-gradient-to-b from-dark-900 to-dark-950 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            {language === 'en' ? 'Ready to Author Your Brand Next Success Story?' : 'هل أنت مستعد لبدء قصة نجاح علامتك التجارية القادمة؟'}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Connect with our consultants today to architect a bespoke execution roadmap designed for regional market leadership.'
              : 'تواصل مع فريقنا اليوم لمناقشة تطلعاتك وبناء خطة عمل واستراتيجية مخصصة تحقق لك التميز والريادة.'}
          </p>
          <div className="pt-2">
            <Button to="/contact" variant="glow" size="lg">
              {t('common.getStarted')}
            </Button>
          </div>
        </Card>
      </section>

    </div>
  );
}
