import https from 'https';

async function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          hasCanonical: data.includes('<link rel="canonical" href="' + url.split('?')[0] + '" />'),
          canonicalMatch: data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1] || 'NONE',
          titleMatch: data.match(/<title>([^<]*)<\/title>/i)?.[1] || 'NONE',
          descMatch: data.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || 'NONE',
          ogTitle: data.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)?.[1] || 'NONE',
          ogImage: data.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i)?.[1] || 'NONE',
          hasSchema: data.includes('application/ld+json'),
          schemaSample: data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1]?.substring(0, 100) || 'NONE',
          hasSemanticCrawlerContent: data.includes('class="crawler-content')
        });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

(async () => {
  const testUrls = [
    'https://crew5.agency/',
    'https://crew5.agency/about',
    'https://crew5.agency/services/seo-optimization',
    'https://crew5.agency/blog/saudi-digital-transformation-journey-2030',
    'https://crew5.agency/projects/hedab-al-khaleej-contracting',
    'https://crew5.agency/faq',
    'https://crew5.agency/non-existent-page-test-404'
  ];

  for (const u of testUrls) {
    const res = await fetchPage(u);
    console.log('----------------------------------------------------');
    console.log('URL:', res.url);
    console.log('Status:', res.statusCode);
    console.log('Canonical:', res.canonicalMatch);
    console.log('Title:', res.titleMatch);
    console.log('Description:', res.descMatch?.substring(0, 60) + '...');
    console.log('OG Image:', res.ogImage);
    console.log('Has Schema.org JSON-LD:', res.hasSchema);
    console.log('Has Semantic Crawler Content:', res.hasSemanticCrawlerContent);
  }
})();
