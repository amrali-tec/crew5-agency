import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Search } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeBlog } from '../utils/localize';
import { isItemPubliclyVisible } from '../utils/publishUtils';

export default function BlogPage() {
  const { blogs } = useData();
  const { language, t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const visibleBlogs = blogs.filter(isItemPubliclyVisible).map(b => localizeBlog(b, language));
  const categories = ['all', ...Array.from(new Set(visibleBlogs.map(b => b.category).filter(Boolean)))];

  const filteredArticles = visibleBlogs.filter((post) => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: language === 'en' ? 'Crew5 Knowledge Hub & Growth Blog' : 'مدونة كرو فايف للنمو والتحول الرقمي',
    url: 'https://crew5.agency/blog',
    description: 'مقالات استراتيجية وأدلة تعليمية في التجارة الإلكترونية، التسويق الرقمي، الهويات البصرية، والتقنية الحديثة.'
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-16">
      <SeoHead
        title={language === 'en' ? 'Knowledge Hub & Digital Growth Blog | Crew5 Agency' : 'المدونة المعرفية ومقالات النمو الرقمي | كرو فايف'}
        description={language === 'en'
          ? 'Deep-dive articles and actionable insights on digital transformation, performance marketing, brand architecture, and e-commerce engineering.'
          : 'مقالات استراتيجية وأدلة عملية حول التحول الرقمي، أسرار تحسين محركات البحث SEO، بناء الهويات البصرية، والتجارة الإلكترونية في السعودية.'}
        keywords="مدونة كرو فايف, مقالات تسويق رقمي, دليل تحسين السيو, التجارة الإلكترونية السعودية, أفكار إعلانات"
        url="/blog"
        schemaData={blogSchema}
      />
      
      {/* 1. Header & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          badge={t('blog.badge')}
          title={t('blog.title')}
          highlight={t('blog.highlight')}
          subtitle={t('blog.subtitle')}
        />

        {/* Search Bar & Category Filters */}
        <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('blog.searchPlaceholder')}
              className={`w-full bg-dark-900 border border-white/10 rounded-full py-3 ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all`}
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-green text-dark-950 shadow-neon'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'all' ? (language === 'en' ? 'All' : 'الكل') : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Blog Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((post) => (
              <article
                key={post.id}
                className="group rounded-3xl overflow-hidden bg-dark-900 border border-white/[0.08] hover:border-brand-green/30 transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-10`}>
                      <Badge variant="green">{post.category}</Badge>
                    </div>
                  </div>

                  <div className={`p-6 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-green" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-brand-green transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-green group-hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{t('blog.readArticle')}</span>
                    <ArrowLeft className={`w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform ${!isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-dark-900 border border-white/10 text-center space-y-3 max-w-md mx-auto">
            <h4 className="text-lg font-bold text-white">{language === 'en' ? 'No Articles Found' : 'لا توجد مقالات مطابقة'}</h4>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Try searching for other keywords.' : 'جرب البحث بكلمات أخرى أو تغيير التصنيف.'}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
