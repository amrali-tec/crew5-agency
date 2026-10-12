import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Video, Film, Headphones, Camera, MonitorPlay,
  Palette, Sparkles, Code2, SearchCheck,
  Layers, Share2, PenTool, Aperture, Briefcase,
  CheckCircle2, ArrowLeft, Cpu, Megaphone
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import BlockRenderer from '../components/builder/BlockRenderer';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeCategory } from '../utils/localize';

const iconMap = {
  Video, Film, Headphones, Camera, MonitorPlay,
  Palette, Sparkles, Code2, SearchCheck,
  Layers, Share2, PenTool, Aperture, Briefcase,
  Cpu, Megaphone
};

export default function ServicesPage() {
  const { services, pages = [] } = useData();
  const { language, t, isRTL } = useLanguage();
  const location = useLocation();

  const servicesPage = pages.find(p => p.slug === 'services');
  const blocks = servicesPage?.blocks || [];
  const injectedBlocks = blocks.filter(b => b.type === 'custom_component');

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: language === 'en' ? 'Our Digital & Creative Services' : 'خدماتنا الرقمية والإبداعية المتكاملة',
    url: 'https://crew5.agency/services',
    description: 'تطوير المواقع والمتاجر الإلكترونية، الهوية البصرية، الإنتاج المرئي، والموشن جرافيك، وإدارة الحملات الإعلانية.'
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-24">
      <SeoHead
        title={language === 'en' ? 'Digital & Creative Services | Crew5 Agency' : 'خدماتنا الرقمية والإبداعية المتكاملة | كرو فايف'}
        description={language === 'en'
          ? 'Explore our full spectrum of digital services: Bespoke Web Engineering, Brand Identity, Visual Production, Motion Graphics, and Performance Marketing.'
          : 'استكشف باقة خدماتنا المتكاملة: برمجة المواقع والمتاجر، بناء الهويات البصرية، الإنتاج السينمائي والموشن جرافيك، وإدارة الحملات الإعلانية الممولة.'}
        keywords="خدمات تسويق رقمي, تصميم هوية بصرية, برمجة متجر إلكتروني, تصوير إعلانات, إدارة حملات إعلانية, سيو مواقع"
        url="/services"
        schemaData={servicesSchema}
      />
      {injectedBlocks.map((b, idx) => (
        <BlockRenderer key={`serv-comp-${idx}`} block={b} />
      ))}
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          badge={t('services.pageBadge')}
          title={t('services.pageTitle')}
          highlight={t('services.pageHighlight')}
          subtitle={t('services.pageSubtitle')}
        />
      </section>

      {/* 2. Detailed Service Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {services.map((rawCategory, index) => {
          const category = localizeCategory(rawCategory, language);
          const CategoryIcon = iconMap[category.icon] || Layers;
          return (
            <div
              key={category.id}
              id={category.id}
              className="scroll-mt-28 space-y-8"
            >
              {/* Category Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-dark-900/80 border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green shadow-neon shrink-0">
                    <CategoryIcon className="w-7 h-7" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <Badge variant="green" className="mb-1.5">{category.badge || t('nav.services')}</Badge>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <p className={`text-slate-400 text-sm max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>
                  {category.description}
                </p>
              </div>

              {/* Sub-services Grid (2x2 Balanced) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.services?.map((service, sIdx) => {
                  const ServiceIcon = iconMap[service.icon] || Sparkles;
                  return (
                    <Card key={service.id} colorIndex={index * 2 + sIdx} className={`flex flex-col justify-between p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green group-hover:scale-110 group-hover:border-brand-green/40 transition-all duration-300">
                            <ServiceIcon className="w-6 h-6" />
                          </div>
                          <span className="text-xs text-slate-500 font-mono font-bold">0{index + 1}</span>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors">
                          {service.title}
                        </h4>

                        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        {/* Deliverables / Features List */}
                        <div className="space-y-2.5 mb-8 border-t border-white/[0.06] pt-4">
                          {service.features?.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Custom Price & Link to dedicated page */}
                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <Link
                          to={`/services/${service.slug || service.id}`}
                          className="px-4 py-2 rounded-xl bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-dark-950 text-xs font-bold transition-all border border-brand-green/30 flex items-center gap-1.5 group/btn cursor-pointer"
                        >
                          <span>{t('services.viewDetails')}</span>
                          <ArrowLeft className={`w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-transform ${!isRTL ? 'rotate-180' : ''}`} />
                        </Link>

                        <div className={isRTL ? 'text-left' : 'text-right'}>
                          <span className="text-xs font-bold text-brand-green block">
                            {t('services.customPricing')}
                          </span>
                        </div>
                      </div>

                    </Card>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
