import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, Palette, Layers, ArrowLeft, Check, Sparkles, 
  Code2, Megaphone, Flame, Shield, ArrowUpRight, Zap 
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeCategory } from '../../utils/localize';

const categoryColorStyles = {
  video: {
    border: 'hover:border-rose-500/50',
    iconBg: 'bg-rose-500/15 text-rose-400 group-hover:bg-rose-500 group-hover:text-dark-950',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
    badgeVariant: 'amber',
    icon: Video
  },
  branding: {
    border: 'hover:border-indigo-500/50',
    iconBg: 'bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-dark-950',
    glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]',
    badgeVariant: 'indigo',
    icon: Palette
  },
  marketing: {
    border: 'hover:border-brand-green/50',
    iconBg: 'bg-emerald-500/15 text-brand-green group-hover:bg-brand-green group-hover:text-dark-950',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,230,118,0.25)]',
    badgeVariant: 'green',
    icon: Megaphone
  },
  web: {
    border: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/15 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-dark-950',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,216,246,0.25)]',
    badgeVariant: 'cyan',
    icon: Layers
  }
};

export default function ServicesOverview() {
  const { services } = useData();
  const { language, t, isRTL } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/8 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          badge={t('services.overviewBadge')}
          badgeVariant="green"
          badgeIcon={Zap}
          title={t('services.overviewTitle')}
          highlight={t('services.overviewHighlight')}
          highlightGradient="from-brand-green via-cyan-400 to-indigo-400"
          subtitle={language === 'en'
            ? 'We engineer bespoke brand identities, cloud platforms, cinematic video, and targeted ad campaigns.'
            : 'نقدم باقة متكاملة ومصممة بأحدث المعايير العالمية لمساعدتك على بناء هوية قوية ومضاعفة مبيعاتك وحضورك الرقمي.'}
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((rawCategory, index) => {
            const category = localizeCategory(rawCategory, language);
            const styleKey = category.id?.toLowerCase().includes('video') ? 'video'
              : (category.id?.toLowerCase().includes('brand') ? 'branding'
              : (category.id?.toLowerCase().includes('market') ? 'marketing' : 'web'));
            
            const style = categoryColorStyles[styleKey] || categoryColorStyles.web;
            const Icon = style.icon;

            return (
              <div 
                key={category.id} 
                className={`p-8 rounded-3xl bg-dark-900/80 border border-white/[0.08] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group ${style.border} ${style.glow} ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${style.iconBg} shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={style.badgeVariant}>{category.badge || t('nav.services')}</Badge>
                  </div>

                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-white transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {category.description}
                  </p>

                  {/* Highlighted services list */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-8">
                    {category.services?.slice(0, 3).map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-semibold">
                        <Check className="w-4 h-4 text-brand-green shrink-0" />
                        <span>{sub.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/services#${category.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-green group-hover:text-white transition-colors pt-4 border-t border-white/[0.05] cursor-pointer"
                >
                  <span>{t('services.viewDetails')}</span>
                  <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${!isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <Button to="/services" variant="glow" size="lg" icon={ArrowLeft}>
            {language === 'en' ? 'Explore All Services Directory' : 'استعراض دليل الخدمات والأسعار كاملاً'}
          </Button>
        </div>

      </div>
    </section>
  );
}
