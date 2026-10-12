import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { partnersList as defaultPartners } from '../../data/partners';
import { localizePartner } from '../../utils/localize';

export default function PartnersSection() {
  const { sections } = useData();
  const { language, isRTL } = useLanguage();
  const rawPartners = sections.partners && sections.partners.length > 0 ? sections.partners : defaultPartners;

  return (
    <section className="py-14 border-y border-white/[0.06] bg-dark-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-10">
          {language === 'en'
            ? 'Trusted by Leading Brands & High-Growth Enterprises'
            : 'نفتخر بثقة واعتمادات كبرى الشركات والعلامات التجارية الرائدة'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12">
          {rawPartners.map((rawPartner, index) => {
            const partner = localizePartner(rawPartner, language);
            return (
              <div
                key={partner.id || index}
                onClick={() => {
                  if (partner.website) window.open(partner.website, '_blank');
                }}
                className="flex items-center gap-3 p-3 px-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-green/30 hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-9 w-auto max-w-[120px] object-contain transition-all duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <span className="font-bold text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors whitespace-nowrap block">
                    {partner.name}
                  </span>
                  {partner.category && (
                    <span className="text-[10px] text-slate-400 block font-normal">
                      {partner.category}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
