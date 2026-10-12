import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, Eye, Sparkles, FolderKanban } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeProject } from '../../utils/localize';
import { isItemPubliclyVisible } from '../../utils/publishUtils';

// Distinct Vibrant Palette per Card for Hover effects
const cardColorThemes = [
  {
    border: 'hover:border-emerald-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.35)]',
    text: 'group-hover:text-emerald-400',
    arrow: 'group-hover:text-emerald-400',
    badgeVariant: 'green',
    buttonGlow: 'hover:bg-emerald-400 hover:text-dark-950'
  },
  {
    border: 'hover:border-purple-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(168,85,247,0.35)]',
    text: 'group-hover:text-purple-400',
    arrow: 'group-hover:text-purple-400',
    badgeVariant: 'indigo',
    buttonGlow: 'hover:bg-purple-400 hover:text-dark-950'
  },
  {
    border: 'hover:border-cyan-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.35)]',
    text: 'group-hover:text-cyan-400',
    arrow: 'group-hover:text-cyan-400',
    badgeVariant: 'cyan',
    buttonGlow: 'hover:bg-cyan-400 hover:text-dark-950'
  },
  {
    border: 'hover:border-amber-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(251,191,36,0.35)]',
    text: 'group-hover:text-amber-400',
    arrow: 'group-hover:text-amber-400',
    badgeVariant: 'amber',
    buttonGlow: 'hover:bg-amber-400 hover:text-dark-950'
  }
];

export default function FeaturedProjects() {
  const { projects = [] } = useData();
  const { language, t, isRTL } = useLanguage();
  const visibleProjects = projects.filter(isItemPubliclyVisible);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeader
            align={isRTL ? 'right' : 'left'}
            badge={t('home.featuredProjectsBadge')}
            badgeVariant="indigo"
            badgeIcon={FolderKanban}
            title={t('home.featuredProjectsTitle')}
            highlight={t('home.featuredProjectsHighlight')}
            highlightGradient="from-brand-indigo-light via-emerald-400 to-brand-cyan"
            subtitle={language === 'en'
              ? 'A curated showcase of flagship platforms, identities, and cinematic visual campaigns built for our partners.'
              : 'نظرة على بعض الأعمال والحملات والمواقع التي قمنا بتطويرها لشركاء نجاحنا في السعودية ومصر والخليج.'}
            className={`mb-0 ${isRTL ? 'text-right items-start' : 'text-left items-start'}`}
          />

          <Button
            to="/projects"
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            className="hidden md:inline-flex shrink-0 self-start md:self-end"
          >
            {language === 'en' ? 'View All Projects (+120)' : 'مشاهدة جميع المشاريع (+120)'}
          </Button>
        </div>

        {/* 4 Cards in 1 Row Grid (Grid-cols-4 on LG) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
          {visibleProjects.slice(0, 4).map((rawProject, pIdx) => {
            const project = localizeProject(rawProject, language);
            const theme = cardColorThemes[pIdx % cardColorThemes.length];

            return (
              <Link
                key={project.id}
                to={`/projects/${project.slug || project.id}`}
                className={`group relative rounded-2xl overflow-hidden bg-dark-900/90 border border-white/[0.08] ${theme.border} ${theme.shadow} transition-all duration-400 cursor-pointer shadow-lg hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  {/* Compact Image Container */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-dark-950">
                    <img
                      src={project.imageUrl || '/assets/project_1.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/30 to-transparent"></div>

                    {/* Category Badge with Unique Color */}
                    <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} z-10`}>
                      <Badge variant={theme.badgeVariant}>{project.category}</Badge>
                    </div>

                    {/* Explore Overlay Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-dark-950/60 backdrop-blur-xs transition-opacity duration-300">
                      <span className="px-3.5 py-1.5 rounded-full bg-white text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'View Details' : 'عرض المشروع'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className={`p-4 space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className={`text-sm xl:text-[15px] font-bold text-white ${theme.text} transition-colors flex items-center justify-between line-clamp-2 leading-snug`}>
                      <span className="truncate">{project.title}</span>
                      <ArrowUpLeft className={`w-4 h-4 shrink-0 text-slate-400 ${theme.arrow} group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${!isRTL ? 'rotate-90' : ''}`} />
                    </h3>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Compact Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.05]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Arrow Indicator */}
                <div className="p-4 pt-0">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 ${theme.text} transition-colors`}>
                    <span>{language === 'en' ? 'Case Study' : 'دراسة الحالة'}</span>
                    <ArrowLeft className={`w-3 h-3 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'rotate-180 group-hover:translate-x-1'}`} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button
            to="/projects"
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            className="w-full justify-center"
          >
            {language === 'en' ? 'View All Projects (+120)' : 'مشاهدة جميع المشاريع (+120)'}
          </Button>
        </div>

      </div>
    </section>
  );
}
