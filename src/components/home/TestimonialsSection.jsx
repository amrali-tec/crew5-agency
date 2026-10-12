import React from 'react';
import { Star, Quote, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeTestimonial } from '../../utils/localize';

export default function TestimonialsSection() {
  const { testimonials } = useData();
  const { language, t, isRTL } = useLanguage();

  return (
    <section className="py-24 bg-dark-900/40 border-y border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-brand-green/8 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          badge={t('home.testimonialsBadge')}
          badgeVariant="amber"
          badgeIcon={HeartHandshake}
          title={t('home.testimonialsTitle')}
          highlight={t('home.testimonialsHighlight')}
          highlightGradient="from-brand-amber via-emerald-400 to-teal-300"
          subtitle={language === 'en'
            ? 'We take pride in our lasting partnerships and client success stories across Saudi Arabia and the GCC.'
            : 'نفخر بشراكاتنا الناجحة وثقة عملائنا المستمرة. إليك بعض من تجاربهم وآرائهم بعد التعاون مع فريق Crew5.'}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((rawItem, index) => {
            const item = localizeTestimonial(rawItem, language);
            return (
              <Card 
                key={item.id} 
                colorIndex={index}
                className={`p-8 flex flex-col justify-between relative shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {/* Quote icon watermark */}
                <Quote className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} w-12 h-12 text-white/[0.04] group-hover:text-brand-amber/15 transition-colors pointer-events-none`} />

                <div>
                  {/* Rating stars & Verified Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Badge variant="amber" className="text-[10px]">
                      {language === 'en' ? 'Verified Review ⭐' : 'تقييم موثق ⭐'}
                    </Badge>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    "{item.review}"
                  </p>
                </div>

                {/* Author details */}
                <div className="pt-6 border-t border-white/[0.08] flex items-center gap-3.5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-amber/40 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-amber transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.role}
                    </p>
                    {item.project && (
                      <span className="inline-block text-[11px] text-brand-green font-bold mt-0.5">
                        {item.project}
                      </span>
                    )}
                  </div>
                </div>

              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
