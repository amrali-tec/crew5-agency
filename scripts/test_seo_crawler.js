import https from 'https';

const urls = [
  'https://crew5.agency/',
  'https://crew5.agency/about',
  'https://crew5.agency/services',
  'https://crew5.agency/services/web-development',
  'https://crew5.agency/projects',
  'https://crew5.agency/projects/cairo-cosmo-center',
  'https://crew5.agency/blog',
  'https://crew5.agency/blog/saudi-digital-transformation-journey-2030',
  'https://crew5.agency/contact',
  'https://crew5.agency/robots.txt',
  'https://crew5.agency/sitemap.xml',
  'https://crew5.agency/google64963217987dc2d5.html'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const canonicalMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
        const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
        resolve({
          url,
          status: res.statusCode,
          canonical: canonicalMatch ? canonicalMatch[1] : 'NONE',
          title: titleMatch ? titleMatch[1].substring(0, 40) + '...' : 'NONE'
        });
      });
    }).on('error', (e) => resolve({ url, status: 'ERROR', error: e.message }));
  });
}

(async () => {
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(JSON.stringify(res, null, 2));
  }
})();
