import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, ChevronRight, Calendar, 
  Building2, Sparkles, TrendingUp, CheckCircle2, 
  Share2, Eye, Layers, Tag, ExternalLink, Clock,
  Cpu, Award, Star, Quote, Compass, Check, ArrowUpRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeProject } from '../utils/localize';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import SeoHead from '../components/ui/SeoHead';
import { isItemPubliclyVisible } from '../utils/publishUtils';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects } = useData();
  const { language, t, isRTL } = useLanguage();

  const rawProject = projects.find(p => (p.slug === slug || p.id == slug) && isItemPubliclyVisible(p));
  const project = localizeProject(rawProject, language);

  if (!project) {
    return (
      <div className="pt-44 pb-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          {language === 'en' ? 'Project Not Found' : 'المشروع غير متوفر'}
        </h2>
        <p className="text-slate-400 mb-8">
          {language === 'en' ? 'Sorry, this project was not found or has been archived.' : 'عذراً، هذا المشروع غير منشور حالياً أو تمت أرشفته.'}
        </p>
        <Button to="/projects" variant="primary" icon={ArrowRight} iconPosition="left">
          {language === 'en' ? 'Return to Projects' : 'العودة لمعرض المشاريع'}
        </Button>
      </div>
    );
  }

  const relatedProjects = projects
    .filter(p => p.slug !== slug && p.id != project.id && isItemPubliclyVisible(p))
    .slice(0, 3)
    .map(p => localizeProject(p, language));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'en' ? 'Project link copied to clipboard!' : 'تم نسخ رابط المشروع إلى الحافظة بنجاح!');
    }
  };

  const projectSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.title,
        description: project.description,
        image: project.imageUrl ? `https://crew5.agency${project.imageUrl}` : 'https://crew5.agency/assets/hero_team.jpg',
        creator: {
          '@type': 'Organization',
          name: 'Crew5 Agency',
          url: 'https://crew5.agency'
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
            name: language === 'en' ? 'Projects' : 'المشاريع',
            item: 'https://crew5.agency/projects'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `https://crew5.agency/projects/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-16 sm:space-y-20">
      <SeoHead
        title={project.title}
        description={project.description || project.fullDetails}
        image={project.imageUrl || 'https://crew5.agency/assets/hero_team.jpg'}
        url={`/projects/${slug}`}
        type="article"
        schemaData={projectSchema}
      />
      
      {/* 1. Breadcrumb Navigation & Top Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight className={`w-4 h-4 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
            <Link to="/projects" className="hover:text-white transition-colors">{t('nav.projects')}</Link>
            <ChevronRight className={`w-4 h-4 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-brand-green truncate max-w-[200px] sm:max-w-none">{project.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-brand-green/20 hover:text-brand-green text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'en' ? 'Share' : 'مشاركة'}</span>
            </button>
            <Link
              to="/projects"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              <ArrowRight className={`w-4 h-4 ${!isRTL ? 'rotate-180' : ''}`} />
              <span>{language === 'en' ? 'All Projects' : 'كافة المشاريع'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Hero Presentation & Metadata Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="indigo">{project.category}</Badge>
            {project.client && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-brand-green" />
                <span>{project.client}</span>
              </span>
            )}
            {project.completionDate && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{project.completionDate}</span>
              </span>
            )}
            {project.duration && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.duration}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl font-normal">
            {project.description}
          </p>
        </div>

        {/* Main Project Visual Showcase */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-dark-900 group relative">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-80 sm:h-[520px] object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 3. Results & KPIs Grid */}
      {project.results && project.results.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-900/90 border border-brand-green/30 shadow-neon">
            <div className={`flex items-center gap-2 text-brand-green font-bold text-sm mb-6 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <TrendingUp className="w-5 h-5" />
              <span>{language === 'en' ? 'Commercial Impact & Key Performance Metrics (KPIs)' : 'الأثر التجاري والنتائج المحققة بالأرقام'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.results.map((res, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-dark-950/90 border border-white/5 text-center space-y-2 hover:border-brand-green/40 transition-colors">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-green font-mono block tracking-tight text-glow">
                    {res.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300 font-semibold block">
                    {res.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Before & After Showcase (if available) */}
      {project.beforeAfter && project.beforeAfter.before && project.beforeAfter.after && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="cyan">{language === 'en' ? 'Transformation Comparison' : 'المقارنة قبل وبعد'}</Badge>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'en' ? 'Visual Transformation Matrix' : 'التحول البصري والتطوير'}
            </h3>
          </div>
          <BeforeAfterSlider
            beforeImage={project.beforeAfter.before}
            afterImage={project.beforeAfter.after}
            beforeLabel={language === 'en' ? 'Before Transformation' : 'قبل التطوير'}
            afterLabel={language === 'en' ? 'After Crew5 Revamp' : 'بعد تطوير Crew5'}
          />
        </section>
      )}

      {/* 5. Strategy, Challenge, and Execution Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Challenge Box */}
          <Card colorIndex={0} className={`p-8 sm:p-10 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse"></span>
              <span>{language === 'en' ? 'The Market Challenge' : 'التحدي والمتطلبات السوقية'}</span>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {project.challenge || (language === 'en' 
                ? 'The partner needed a modern, distinguished digital positioning capable of outranking competitors and driving organic and paid growth.'
                : 'كان الشريك بحاجة إلى حضور رقمي وهوية بصرية متطورة تعكس ريادته في السوق وتزيد من معدل التحويل والمبيعات بشكل ملموس.')}
            </p>
          </Card>

          {/* Solution Box */}
          <Card colorIndex={1} className={`p-8 sm:p-10 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-2 text-brand-green font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-neon"></span>
              <span>{language === 'en' ? 'Crew5 Engineered Solution' : 'الحل والاستراتيجية المنفذة'}</span>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {project.solution || (language === 'en'
                ? 'We engineered an integrated execution sprint combining high-performance cloud architecture, cohesive visual identity, and high-impact visual media.'
                : 'قمنا ببناء منظومة متكاملة شملت إعادة هيكلة الهوية، تطوير منصة رقمية فائقة السرعة، وإنتاج محتوى مرئي مخصص يركز على قيمة العرض التجاري.')}
            </p>
          </Card>

        </div>
      </section>

      {/* 6. Key Deliverables & Scope Grid */}
      {project.deliverables && project.deliverables.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className={`${isRTL ? 'text-right' : 'text-left'} space-y-2`}>
            <Badge variant="green">{language === 'en' ? 'Tangible Scope' : 'مخرجات العمل المنجزة'}</Badge>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'en' ? 'Delivered Scope of Work & Assets' : 'تفاصيل نطاق ومخرجات المشروع'}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {project.deliverables.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-dark-900/80 border border-white/5 hover:border-brand-green/30 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-7 h-7 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-dark-950 transition-all duration-300">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Execution Roadmap & Process Steps */}
      {project.processSteps && project.processSteps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="cyan">{language === 'en' ? 'Execution Roadmap' : 'منهجية التنفيذ'}</Badge>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'en' ? 'How Crew5 Engineered This Project' : 'كيف نفذ فريق كرو فايف المشروع'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'en' 
                ? 'A disciplined four-phase sprint transforming strategic vision into measurable commercial outcomes.'
                : 'رحلة عمل رشيقة من 4 مراحل متتابعة حولت الرؤية الاستراتيجية إلى نجاح تجاري ملموس.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.processSteps.map((stepItem, idx) => (
              <div 
                key={idx}
                className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-dark-900 border border-white/10 hover:border-brand-green/40 transition-all group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-black text-3xl sm:text-4xl text-brand-green/30 group-hover:text-brand-green transition-colors duration-300">
                    {stepItem.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green/40 group-hover:bg-brand-green shadow-neon" />
                </div>
                
                <h4 className="text-base font-bold text-white leading-snug">
                  {stepItem.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Tech Stack & Engineering Tools */}
      {project.techStack && project.techStack.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-900/60 border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {language === 'en' ? 'Technologies, Frameworks & Stacks' : 'التقنيات والأدوات والمنظومات المستخدمة'}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {language === 'en' ? 'Enterprise-grade architecture for speed, conversion, and security' : 'بنية هندسية متطورة تضمن السرعة القصوى والأمان ومعدلات التحويل'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-brand-green/10 text-slate-200 hover:text-brand-green text-xs font-bold border border-white/10 hover:border-brand-green/30 transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Verified Client Testimonial */}
      {project.testimonial && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-dark-900 via-dark-850 to-dark-900 border border-brand-green/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden space-y-6">
            
            <div className="absolute top-6 left-6 text-brand-green/10 pointer-events-none">
              <Quote className="w-24 h-24" />
            </div>

            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(project.testimonial.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-slate-400 mr-2 font-bold">
                {language === 'en' ? 'Verified Client Review' : 'تقييم موثق للمشروع'}
              </span>
            </div>

            <blockquote className="text-base sm:text-xl text-white font-medium leading-relaxed relative z-10 italic">
              "{project.testimonial.quote}"
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10 relative z-10">
              <img
                src={project.testimonial.avatar || '/assets/avatar_1.jpg'}
                alt={project.testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-green shadow-neon"
              />
              <div>
                <h5 className="text-sm sm:text-base font-black text-white">
                  {project.testimonial.name}
                </h5>
                <p className="text-xs text-brand-green font-medium">
                  {project.testimonial.role}
                </p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 10. Tags & Expertise Chips */}
      {project.tags && project.tags.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-wrap items-center gap-2 ${isRTL ? 'justify-start' : 'justify-start'}`}>
            <span className="text-xs text-slate-400 ml-1 font-bold flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-brand-green" />
              <span>{language === 'en' ? 'Expertise & Deliverables:' : 'نطاق العمل والوسوم:'}</span>
            </span>
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 text-slate-200 text-xs font-semibold border border-white/5 hover:border-brand-green/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 11. Related Projects Showcase */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="indigo">{language === 'en' ? 'More Portfolio Stories' : 'قصص نجاح أخرى'}</Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {language === 'en' ? 'Explore Related Case Studies' : 'استكشف مشاريع مشابهة'}
              </h3>
            </div>
            <Link
              to="/projects"
              className="text-xs sm:text-sm font-bold text-brand-green hover:underline flex items-center gap-1"
            >
              <span>{language === 'en' ? 'View All' : 'عرض كافة الأعمال'}</span>
              <ArrowRight className={`w-4 h-4 ${!isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                to={`/projects/${rel.slug}`}
                className="group rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-green/40 overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1.5 shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-dark-950">
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-md text-brand-green font-bold border border-brand-green/30">
                      {rel.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-green transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-brand-green pt-2 border-t border-white/5">
                    <span>{language === 'en' ? 'View Case Study' : 'عرض دراسة الحالة'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 12. Bottom Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand-green/30 shadow-2xl text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'en' ? 'Ready to Build an Exceptional Success Story?' : 'هل تود بناء قصة نجاح مماثلة لعلامتك التجارية؟'}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Calculate your estimated scope and timeline, or connect with our project consultants today.'
              : 'احسب متطلبات مشروعك عبر حاسبة الأسعار التفاعلية أو تواصل معنا لمناقشة خطة العمل المخصصة.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button to="/estimator" variant="glow" size="lg">
              {t('estimator.badge')}
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              {t('common.contactUs')}
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
