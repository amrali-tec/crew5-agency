import React from 'react';
import Hero from '../components/home/Hero';
import PartnersSection from '../components/home/PartnersSection';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FeaturedProjects from '../components/home/FeaturedProjects';
import TestimonialsSection from '../components/home/TestimonialsSection';
import LatestBlogSection from '../components/home/LatestBlogSection';
import CtaSection from '../components/home/CtaSection';
import BlockRenderer from '../components/builder/BlockRenderer';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { pages = [] } = useData();
  const { language } = useLanguage();
  const homePage = pages.find(p => p.slug === 'home');
  const blocks = homePage?.blocks || [];

  // Filter injected custom components if any
  const topInjected = blocks.filter((b, idx) => b.type === 'custom_component' && idx === 0);
  const midInjected = blocks.filter((b, idx) => b.type === 'custom_component' && idx > 0 && idx < blocks.length - 1);
  const bottomInjected = blocks.filter((b, idx) => b.type === 'custom_component' && idx === blocks.length - 1 && idx !== 0);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://crew5.agency/#organization',
        'name': 'Crew5 Agency',
        'alternateName': ['وكالة كرو فايف للإبداع والتسويق الرقمي', 'كرو فايف'],
        'url': 'https://crew5.agency',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://crew5.agency/assets/favicon_512.png',
          'caption': 'Crew5 Agency Logo'
        },
        'image': 'https://crew5.agency/assets/hero_team.jpg',
        'sameAs': [
          'https://instagram.com/crew5agency',
          'https://linkedin.com/company/crew5agency',
          'https://twitter.com/crew5agency'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://crew5.agency/#website',
        'url': 'https://crew5.agency',
        'name': 'Crew5 Agency',
        'description': 'وكالة متخصصة في تطوير المواقع والأنظمة، بناء الهويات البصرية، الإنتاج المرئي، والتسويق الرقمي.',
        'publisher': {
          '@id': 'https://crew5.agency/#organization'
        },
        'inLanguage': language === 'en' ? 'en-US' : 'ar-SA'
      }
    ]
  };

  return (
    <div className="space-y-4">
      <SeoHead
        title={language === 'en' 
          ? 'Crew5 Agency | Digital Marketing, Branding & Web Engineering' 
          : 'Crew5 Agency | وكالة كرو فايف للإبداع والتسويق الرقمي والحلول السحابية'}
        description={language === 'en'
          ? 'Enterprise digital agency specializing in custom web engineering, high-converting e-commerce, brand identity design, cinematic video production, and performance marketing.'
          : 'وكالة متخصصة في تطوير المواقع والمتاجر الإلكترونية، بناء الهويات البصرية، الإنتاج المرئي والموشن جرافيك، وإدارة الحملات الإعلانية في السعودية ومصر.'}
        url="/"
        schemaData={homeSchema}
      />
      {topInjected.map((b, idx) => (
        <BlockRenderer key={`top-${idx}`} block={b} />
      ))}
      <Hero />
      <PartnersSection />
      <ServicesOverview />
      {midInjected.map((b, idx) => (
        <BlockRenderer key={`mid-${idx}`} block={b} />
      ))}
      <WhyChooseUs />
      <FeaturedProjects />
      <TestimonialsSection />
      <LatestBlogSection />
      {bottomInjected.map((b, idx) => (
        <BlockRenderer key={`bot-${idx}`} block={b} />
      ))}
      <CtaSection />
    </div>
  );
}
