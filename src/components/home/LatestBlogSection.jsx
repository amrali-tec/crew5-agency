import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, BookOpen, ArrowUpLeft } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBlog } from '../../utils/localize';
import { isItemPubliclyVisible } from '../../utils/publishUtils';

// Distinct Vibrant Palette per Blog Card for Hover effects
const blogColorThemes = [
  {
    border: 'hover:border-emerald-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.35)]',
    text: 'group-hover:text-emerald-400',
    arrow: 'group-hover:text-emerald-400',
    badgeClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/15'
  },
  {
    border: 'hover:border-purple-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(168,85,247,0.35)]',
    text: 'group-hover:text-purple-400',
    arrow: 'group-hover:text-purple-400',
    badgeClass: 'text-purple-400 border-purple-500/30 bg-purple-500/15'
  },
  {
    border: 'hover:border-cyan-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.35)]',
    text: 'group-hover:text-cyan-400',
    arrow: 'group-hover:text-cyan-400',
    badgeClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/15'
  },
  {
    border: 'hover:border-amber-400/60',
    shadow: 'hover:shadow-[0_20px_45px_-10px_rgba(251,191,36,0.35)]',
    text: 'group-hover:text-amber-400',
    arrow: 'group-hover:text-amber-400',
    badgeClass: 'text-amber-400 border-amber-500/30 bg-amber-500/15'
  }
];

export default function LatestBlogSection() {
  const { blogs = [] } = useData();
  const { language, t, isRTL } = useLanguage();

  const visibleBlogs = blogs
    .filter(isItemPubliclyVisible)
    .map(b => localizeBlog(b, language))
    .slice(0, 4);

  if (visibleBlogs.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with View All Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeader
            align={isRTL ? 'right' : 'left'}
            badge={language === 'en' ? 'Knowledge Hub & Insights' : 'المدونة والمقالات'}
            badgeVariant="green"
            badgeIcon={BookOpen}
            title={language === 'en' ? 'Latest Insights &' : 'أحدث الرؤى و'}
            highlight={language === 'en' ? 'Articles' : 'المقالات'}
            subtitle={language === 'en'
              ? 'Actionable guides and insights on digital transformation, UI/UX, SEO, and brand growth.'
              : 'دليلك الشامل ومقالات متخصصة حول استراتيجيات النمو، التسويق الرقمي، وتطوير المنصات السحابية.'}
            className={`mb-0 ${isRTL ? 'text-right items-start' : 'text-left items-start'}`}
          />

          <Button
            to="/blog"
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            className="hidden md:inline-flex shrink-0 self-start md:self-end"
          >
            {language === 'en' ? 'Explore Knowledge Hub' : 'تصفح كافة المقالات'}
          </Button>
        </div>

        {/* 4 Cards in 1 Row Grid (Grid-cols-4) with Distinct Hover Themes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
          {visibleBlogs.map((post, bIdx) => {
            const theme = blogColorThemes[bIdx % blogColorThemes.length];

            return (
              <article
                key={post.id}
                className={`group rounded-2xl overflow-hidden bg-dark-900/90 border border-white/[0.08] ${theme.border} ${theme.shadow} transition-all duration-400 flex flex-col justify-between shadow-lg hover:-translate-y-1.5`}
              >
                <div>
                  {/* Compact Image Container */}
                  <div className="relative h-40 overflow-hidden bg-dark-950">
                    <img
                      src={post.imageUrl || '/assets/blog_placeholder.jpg'}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent"></div>
                    
                    {post.category && (
                      <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} z-10`}>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border backdrop-blur-md shadow-sm ${theme.badgeClass}`}>
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Compact Content Details */}
                  <div className={`p-4 space-y-2.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                    
                    {/* Meta: Date & Read Time */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-colors" />
                        {post.date || '2026'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-colors" />
                        {post.readTime || '3 دقائق'}
                      </span>
                    </div>

                    {/* Compact Title (2 lines clamp) with distinct hover text color */}
                    <h3 className={`text-sm xl:text-[15px] font-bold text-white ${theme.text} transition-colors line-clamp-2 leading-snug flex items-center justify-between gap-1`}>
                      <span>{post.title}</span>
                      <ArrowUpLeft className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 ${theme.arrow} transition-all ${!isRTL ? 'rotate-90' : ''}`} />
                    </h3>

                    {/* Compact Excerpt (2 lines clamp) */}
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Bottom Read More Action */}
                <div className="p-4 pt-0">
                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 ${theme.text} transition-colors`}
                  >
                    <span>{language === 'en' ? 'Read Article' : 'اقرأ المقال'}</span>
                    <ArrowLeft className={`w-3.5 h-3.5 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'rotate-180 group-hover:translate-x-1'}`} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button
            to="/blog"
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            className="w-full justify-center"
          >
            {language === 'en' ? 'Explore Knowledge Hub' : 'تصفح كافة المقالات'}
          </Button>
        </div>

      </div>
    </section>
  );
}
