import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileQuestion } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import BlockRenderer from '../components/builder/BlockRenderer';
import Button from '../components/ui/Button';
import SeoHead from '../components/ui/SeoHead';
import { isItemPubliclyVisible } from '../utils/publishUtils';

export default function DynamicPage() {
  const { slug } = useParams();
  const { pages } = useData();
  const { language, t, isRTL } = useLanguage();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try finding page in context
    const localPage = pages.find(p => p.slug === slug || p.id == slug);
    if (localPage) {
      setPage(localPage);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    api.getPage(slug)
      .then(res => {
        if (res.success && res.data) {
          setPage(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, pages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-brand-green">
        <div className="animate-spin w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!page || !isItemPubliclyVisible(page)) {
    return (
      <div className="pt-44 pb-28 max-w-3xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">
          {language === 'en' ? 'Page Not Found' : 'الصفحة غير متوفرة'}
        </h2>
        <p className="text-slate-400 mb-8">
          {language === 'en' ? 'Sorry, this page is not currently published or was archived.' : 'عذراً، هذه الصفحة غير منشورة حالياً أو تمت أرشفتها.'}
        </p>
        <Button to="/" variant="primary" icon={ArrowLeft} iconPosition="left">
          {language === 'en' ? 'Return Home' : 'العودة للرئيسية'}
        </Button>
      </div>
    );
  }

  const blocks = Array.isArray(page.blocks) ? page.blocks : [];

  return (
    <div className="min-h-screen pb-20">
      <SeoHead
        title={page.title}
        description={page.seoDescription || page.title}
        url={`/p/${slug}`}
      />
      {blocks.length === 0 ? (
        <div className="pt-44 pb-20 text-center text-slate-400">
          <h1 className="text-3xl font-bold text-white mb-4">{page.title}</h1>
          <p>
            {language === 'en' 
              ? 'This page is currently empty. Add components from the admin builder.' 
              : 'الصفحة فارغة حالياً. أضف مكونات من لوحة التحكم لعرض محتواها.'}
          </p>
        </div>
      ) : (
        blocks.map((block, idx) => (
          <BlockRenderer key={idx} block={block} />
        ))
      )}
    </div>
  );
}
