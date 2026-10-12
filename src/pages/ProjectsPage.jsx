import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, Eye, ArrowLeft, FolderKanban } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeProject } from '../utils/localize';
import { isItemPubliclyVisible } from '../utils/publishUtils';

const projectHoverStyles = [
  { border: 'hover:border-emerald-400/60', shadow: 'hover:shadow-[0_16px_40px_-10px_rgba(16,185,129,0.35)]', text: 'group-hover:text-emerald-400', badge: 'green', arrow: 'group-hover:text-emerald-400' },
  { border: 'hover:border-indigo-400/60', shadow: 'hover:shadow-[0_16px_40px_-10px_rgba(99,102,241,0.35)]', text: 'group-hover:text-indigo-400', badge: 'indigo', arrow: 'group-hover:text-indigo-400' },
  { border: 'hover:border-cyan-400/60', shadow: 'hover:shadow-[0_16px_40px_-10px_rgba(6,182,212,0.35)]', text: 'group-hover:text-cyan-400', badge: 'cyan', arrow: 'group-hover:text-cyan-400' },
  { border: 'hover:border-amber-400/60', shadow: 'hover:shadow-[0_16px_40px_-10px_rgba(251,191,36,0.35)]', text: 'group-hover:text-amber-400', badge: 'amber', arrow: 'group-hover:text-amber-400' },
  { border: 'hover:border-rose-400/60', shadow: 'hover:shadow-[0_16px_40px_-10px_rgba(244,63,94,0.35)]', text: 'group-hover:text-rose-400', badge: 'rose', arrow: 'group-hover:text-rose-400' },
  { border: 'hover:border-sky-400/60', shadow: 'hover:shadow-[0_16px_40px_-10px_rgba(14,165,233,0.35)]', text: 'group-hover:text-sky-400', badge: 'sky', arrow: 'group-hover:text-sky-400' }
];

export default function ProjectsPage() {
  const { projects } = useData();
  const { language, t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const visibleProjects = projects.filter(isItemPubliclyVisible);

  const categories = [
    { id: 'all', label: language === 'en' ? 'All Projects' : 'كافة المشاريع' },
    { id: 'branding', label: language === 'en' ? 'Brand Identity' : 'هوية بصرية' },
    { id: 'video', label: language === 'en' ? 'Visual Production' : 'إنتاج مرئي' },
    { id: 'web', label: language === 'en' ? 'Web & Stores' : 'مواقع ومتاجر' },
    { id: 'marketing', label: language === 'en' ? 'Marketing Campaigns' : 'حملات تسويقية' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? visibleProjects
    : visibleProjects.filter(p => {
        if (activeCategory === 'branding') return p.category?.includes('هوية') || p.category?.includes('العلامة') || p.categoryKey === 'branding';
        if (activeCategory === 'video') return p.category?.includes('مرئي') || p.category?.includes('مونتاج') || p.categoryKey === 'video';
        if (activeCategory === 'web') return p.category?.includes('موقع') || p.category?.includes('تطوير') || p.category?.includes('متجر') || p.categoryKey === 'web';
        if (activeCategory === 'marketing') return p.category?.includes('تسويق') || p.category?.includes('حملات') || p.categoryKey === 'marketing';
        return true;
      });

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: language === 'en' ? 'Portfolio & Case Studies | Crew5 Agency' : 'معرض الأعمال وقصص النجاح | كرو فايف',
    url: 'https://crew5.agency/projects',
    description: 'نماذج من أعمالنا ومشاريعنا في تصميم المواقع، المتاجر الإلكترونية، الهويات البصرية، والإنتاج المرئي.'
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-20">
      <SeoHead
        title={language === 'en' ? 'Portfolio & Case Studies | Crew5 Agency' : 'معرض الأعمال وقصص النجاح | كرو فايف'}
        description={language === 'en'
          ? 'Explore our portfolio of successful projects: E-commerce platforms, custom web applications, brand identities, and high-impact visual campaigns.'
          : 'استعرض نماذج من مشاريعنا وقصص النجاح التي نفذناها لكبرى الشركات والمتاجر والجهات في تطوير المواقع، بناء الهويات، والإنتاج المرئي.'}
        keywords="أعمال كرو فايف, مشاريع سابقة, نماذج مواقع إلكترونية, نماذج هويات بصرية, بورتفوليو تسويق رقمي"
        url="/projects"
        schemaData={portfolioSchema}
      />
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          badge={language === 'en' ? 'Portfolio & Case Studies' : 'معرض الأعمال والنجاحات'}
          badgeVariant="indigo"
          badgeIcon={FolderKanban}
          title={language === 'en' ? 'Exceptional Work Driving Market' : 'أعمال استثنائية صنعت فارقاً'}
          highlight={language === 'en' ? 'Growth For Our Partners' : 'لشركاء نجاحنا'}
          highlightGradient="from-brand-indigo-light via-emerald-400 to-brand-cyan"
          subtitle={language === 'en'
            ? 'Explore our flagship enterprise platforms, brand identities, and high-conversion visual marketing campaigns.'
            : 'استعرض نماذج من مشاريعنا وقصص النجاح التي نفذناها لكبرى الشركات والمتاجر والجهات الحكومية في المنطقة.'}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-green text-dark-950 shadow-neon'
                  : 'bg-dark-900/80 text-slate-300 hover:text-white hover:bg-dark-800 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((rawProject, pIdx) => {
            const project = localizeProject(rawProject, language);
            const hStyle = projectHoverStyles[pIdx % projectHoverStyles.length];
            return (
              <Link
                key={project.id}
                to={`/projects/${project.slug || project.id}`}
                className={`group relative rounded-3xl overflow-hidden bg-dark-900 border border-white/[0.08] ${hStyle.border} ${hStyle.shadow} transition-all duration-500 cursor-pointer shadow-lg hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>

                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-10`}>
                      <Badge variant={hStyle.badge}>{project.category}</Badge>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-dark-950/40 backdrop-blur-xs transition-opacity duration-300">
                      <span className="px-6 py-3 rounded-full bg-white text-dark-950 font-bold text-sm flex items-center gap-2 shadow-neon">
                        <Eye className="w-4 h-4" />
                        <span>{language === 'en' ? 'Explore Case Study' : 'عرض دراسة الحالة والنتائج'}</span>
                      </span>
                    </div>
                  </div>

                  <div className={`p-6 sm:p-8 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xl font-bold text-white ${hStyle.text} transition-colors line-clamp-1`}>
                        {project.title}
                      </h3>
                      <ArrowUpLeft className={`w-5 h-5 text-slate-400 ${hStyle.arrow} shrink-0 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all ${!isRTL ? 'rotate-90' : ''}`} />
                    </div>

                    <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(project.tags || []).slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key KPIs row */}
                {project.results && project.results.length > 0 && (
                  <div className="p-6 pt-0">
                    <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 grid grid-cols-3 gap-2 text-center">
                      {project.results.slice(0, 3).map((res, rIdx) => (
                        <div key={rIdx} className="space-y-0.5">
                          <span className="text-xs sm:text-sm font-black text-brand-green font-mono block">
                            {res.value}
                          </span>
                          <span className="text-[10px] text-slate-400 block line-clamp-1">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand-green/30 shadow-2xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'en' ? 'Want to Build a Similar Flagship Project?' : 'هل ترغب في بناء مشروع مماثل يحقق أعلى عائد؟'}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Calculate your estimated scope and budget with our interactive proposal generator.'
              : 'احسب التكلفة التقديرية لمشروعك عبر حاسبة الأسعار التفاعلية أو تواصل مباشرة مع فريقنا.'}
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
