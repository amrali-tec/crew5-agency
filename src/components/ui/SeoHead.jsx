import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * SeoHead Component
 * Dynamically injects title, description, canonical link, robots directives, OpenGraph tags,
 * Twitter cards, and Schema.org JSON-LD structured data into the document head.
 */
export default function SeoHead({
  title = 'Crew5 Agency | وكالة كرو فايف للإبداع والتسويق الرقمي والحلول السحابية',
  description = 'وكالة رائدة في تطوير المواقع والأنظمة السحابية، بناء الهويات البصرية، الإنتاج المرئي والموشن، وإدارة الحملات الإعلانية في السعودية ومصر.',
  keywords = 'تطوير مواقع, هوية بصرية, تسويق رقمي, إنتاج سينمائي, برمجة تطبيقات, سيو, وكالة رقمية, متاجر إلكترونية, كرو فايف, Crew5 Agency',
  image = 'https://crew5.agency/assets/hero_team.jpg',
  url = '',
  type = 'website',
  noindex = false,
  schemaData = null
}) {
  const { language, isRTL } = useLanguage ? useLanguage() : { language: 'ar', isRTL: true };

  useEffect(() => {
    // 1. Format and Update Document Title
    const formattedTitle = title.includes('Crew5') 
      ? title 
      : `${title} | Crew5 Agency`;
    document.title = formattedTitle;

    // 2. Set language and direction attributes on <html>
    if (document.documentElement) {
      document.documentElement.lang = language || 'ar';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }

    // 3. Helper to set or create meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 4. Resolve full absolute URL for canonical & OG
    const fullUrl = url 
      ? (url.startsWith('http') ? url : `https://crew5.agency${url.startsWith('/') ? url : '/' + url}`)
      : (typeof window !== 'undefined' ? window.location.href.split('?')[0].split('#')[0] : 'https://crew5.agency');

    const fullImageUrl = image
      ? (image.startsWith('http') ? image : `https://crew5.agency${image.startsWith('/') ? image : '/' + image}`)
      : 'https://crew5.agency/assets/hero_team.jpg';

    // 5. Canonical Link Management
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // 6. Robots Indexing Directive
    const robotsContent = noindex 
      ? 'noindex, nofollow' 
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    
    setMetaTag('name', 'robots', robotsContent);
    setMetaTag('name', 'googlebot', robotsContent);
    setMetaTag('name', 'bingbot', robotsContent);

    // 7. Core Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Crew5 Agency');
    setMetaTag('name', 'publisher', 'Crew5 Agency');

    // 8. Open Graph Meta Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Crew5 Agency | وكالة كرو فايف');
    setMetaTag('property', 'og:locale', language === 'en' ? 'en_US' : 'ar_SA');

    // 9. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);
    setMetaTag('name', 'twitter:site', '@crew5agency');
    setMetaTag('name', 'twitter:creator', '@crew5agency');

    // 10. Schema.org JSON-LD Structured Data Injection
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Crew5 Agency',
      alternateName: ['وكالة كرو فايف للإبداع والتسويق الرقمي', 'كرو فايف'],
      url: 'https://crew5.agency',
      logo: 'https://crew5.agency/assets/favicon_512.png',
      image: 'https://crew5.agency/assets/hero_team.jpg',
      description: 'وكالة متخصصة في تطوير المواقع والمنصات السحابية، بناء الهويات البصرية، الإنتاج المرئي والموشن جرافيك، وإدارة الحملات الإعلانية.',
      telephone: '+966568121909',
      email: 'info@crew5.agency',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'King Fahd Road',
          addressLocality: 'Riyadh',
          addressCountry: 'SA'
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Building 18, El-Narges St, 5th Settlement',
          addressLocality: 'New Cairo',
          addressCountry: 'EG'
        }
      ],
      sameAs: [
        'https://instagram.com/crew5agency',
        'https://linkedin.com/company/crew5agency',
        'https://twitter.com/crew5agency',
        'https://facebook.com/crew5agency'
      ]
    };

    const targetSchema = schemaData || defaultSchema;
    let schemaScript = document.getElementById('crew5-schema-jsonld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'crew5-schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify(targetSchema);

  }, [title, description, keywords, image, url, type, noindex, schemaData, language, isRTL]);

  return null;
}
