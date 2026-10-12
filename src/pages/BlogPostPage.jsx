import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ArrowLeft, Share2, ChevronRight } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeBlog } from '../utils/localize';
import { isItemPubliclyVisible } from '../utils/publishUtils';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { blogs } = useData();
  const { language, t, isRTL } = useLanguage();

  const rawArticle = blogs.find(a => (a.slug === slug || a.id == slug) && isItemPubliclyVisible(a));
  const article = localizeBlog(rawArticle, language);

  if (!article) {
    return (
      <div className="pt-44 pb-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          {language === 'en' ? 'Article Not Found' : 'المقال غير متوفر'}
        </h2>
        <p className="text-slate-400 mb-8">
          {language === 'en' ? 'Sorry, this article was not found or archived.' : 'عذراً، المقال المطلوب غير منشور أو تمت أرشفته.'}
        </p>
        <Button to="/blog" variant="primary" icon={ArrowRight} iconPosition="left">
          {language === 'en' ? 'Return to Blog' : 'العودة للمدونة'}
        </Button>
      </div>
    );
  }

  const relatedArticles = blogs
    .filter(a => a.slug !== slug && a.id != article.id && isItemPubliclyVisible(a))
    .slice(0, 2)
    .map(b => localizeBlog(b, language));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'en' ? 'Article link copied to clipboard!' : 'تم نسخ رابط المقال إلى الحافظة!');
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.imageUrl ? `https://crew5.agency${article.imageUrl}` : 'https://crew5.agency/assets/hero_team.jpg',
        datePublished: article.isoDate || '2026-01-01',
        dateModified: article.isoDate || '2026-01-01',
        author: {
          '@type': 'Person',
          name: article.author?.name || (language === 'en' ? 'Crew5 Editorial Team' : 'فريق تحرير كرو فايف'),
          jobTitle: article.author?.role || 'Digital Growth Specialist'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Crew5 Agency',
          logo: {
            '@type': 'ImageObject',
            url: 'https://crew5.agency/assets/favicon_512.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://crew5.agency/blog/${slug}`
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
            name: language === 'en' ? 'Blog' : 'المدونة',
            item: 'https://crew5.agency/blog'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `https://crew5.agency/blog/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24">
      <SeoHead
        title={article.title}
        description={article.excerpt}
        keywords={article.tags?.join(', ') || `${article.title}, مدونة كرو فايف, مقالات تسويق`}
        image={article.imageUrl || 'https://crew5.agency/assets/hero_team.jpg'}
        url={`/blog/${slug}`}
        type="article"
        schemaData={articleSchema}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
          <ChevronRight className={`w-4 h-4 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
          <Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link>
          <ChevronRight className={`w-4 h-4 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="text-brand-green font-bold truncate">{article.title}</span>
        </div>

        {/* Title and Metadata */}
        <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <Badge variant="green">{article.category}</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-white/10 pb-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-green" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-green" />
                {article.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Share Article' : 'مشاركة المقال'}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-80 sm:h-[450px] object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div 
          className={`prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">{language === 'en' ? 'Tags:' : 'الوسوم:'}</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        {article.author && (
          <div className={`p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-center gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-brand-green/40 shadow-neon shrink-0"
              />
            )}
            <div className={`space-y-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="text-xs text-brand-green font-bold block">{language === 'en' ? 'Article Author' : 'كاتب المقال'}</span>
              <h4 className="text-lg font-bold text-white">{article.author.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{article.author.role}</p>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-white/10 space-y-6">
            <h3 className={`text-xl font-bold text-white ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'en' ? 'Related Articles & Insights' : 'مقالات ورؤى ذات صلة'}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug || rel.id}`}
                  className="p-6 rounded-2xl bg-dark-900 border border-white/5 hover:border-brand-green/30 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Badge variant="cyan" className="mb-1">{rel.category}</Badge>
                    <h4 className="font-bold text-white text-base group-hover:text-brand-green transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{rel.excerpt}</p>
                  </div>
                  <span className={`text-xs font-bold text-brand-green mt-4 flex items-center gap-1 ${isRTL ? 'justify-start' : 'justify-start'}`}>
                    <span>{t('blog.readArticle')}</span>
                    <ArrowLeft className={`w-3 h-3 ${!isRTL ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}
