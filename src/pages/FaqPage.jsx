import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { faqCategories } from '../data/faq';
import { useLanguage } from '../context/LanguageContext';
import { localizeFaqCategory } from '../utils/localize';

export default function FaqPage() {
  const { language, t, isRTL } = useLanguage();
  const [openItems, setOpenItems] = useState({ '0-0': true, '1-0': true });

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const localizedCategories = faqCategories.map(cat => localizeFaqCategory(cat, language));

  // Construct Google FAQPage Rich Snippet Schema
  const allFaqItems = localizedCategories.flatMap(c => c.questions);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-16">
      <SeoHead
        title={language === 'en' ? 'Frequently Asked Questions | Crew5 Agency' : 'الأسئلة الشائعة وتكاليف الخدمات | كرو فايف'}
        description={language === 'en'
          ? 'Comprehensive answers regarding web development, brand identity, digital marketing, and project tracking.'
          : 'إجابات تفصيلية وشاملة حول تكاليف إنشاء المتاجر والمواقع، مراحل بناء الهوية، إدارة الحملات الإعلانية، ونظام تتبع المشاريع في وكالة كرو فايف.'}
        keywords="أسئلة شائعة, تكلفة متجر إلكتروني, سعر تصميم موقع, أسعار شركات التسويق بالسعودية, تتبع المشاريع"
        schemaData={faqSchema}
      />
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          badge={t('nav.faq')}
          title={language === 'en' ? 'Clear Answers to All' : 'إجابات واضحة لكافة'}
          highlight={language === 'en' ? 'Your Inquiries & Questions' : 'استفساراتك وتساؤلاتك'}
          subtitle={language === 'en'
            ? 'We have curated the most common questions regarding our workflows, pricing models, deliverables, and partnership terms.'
            : 'جمعنا لك أهم الأسئلة الشائعة حول خدماتنا، مراحل العمل، الأسعار، وطرق التعاون معنا.'}
        />
      </section>

      {/* 2. FAQ Accordions by Category */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {localizedCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className={`text-xl font-bold text-brand-green flex items-center gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              {cat.category}
            </h3>

            <div className="space-y-3">
              {cat.questions.map((item, qIdx) => {
                const key = `${catIdx}-${qIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={qIdx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-dark-900 border-brand-green/30 shadow-neon'
                        : 'bg-dark-900/60 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className={`w-full p-5 sm:p-6 ${isRTL ? 'text-right' : 'text-left'} flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg focus:outline-none cursor-pointer`}
                    >
                      <span className="leading-snug">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-green shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/[0.04] mt-2 pt-4 animate-in fade-in duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="p-10 sm:p-14 border-brand-green/30 bg-gradient-to-b from-dark-900 to-dark-950 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'en' ? 'Have a Question Not Listed Here?' : 'لديك استفسار آخر لم تجد إجابته هنا؟'}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Our customer success and technical consultation team is ready to answer all your inquiries 24/7.'
              : 'فريق الاستشارات الفنية والرد السريع جاهز للإجابة على كافة تفاصيل ومتطلبات مشروعك فوراً.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button to="/contact" variant="glow" size="lg">
              {t('nav.quickConsultation')}
            </Button>
            <Button to="/estimator" variant="outline" size="lg">
              {t('estimator.badge')}
            </Button>
          </div>
        </Card>
      </section>

    </div>
  );
}
