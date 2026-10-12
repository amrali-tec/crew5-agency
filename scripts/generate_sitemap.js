import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import static data files
import { servicesCategories } from '../src/data/services.js';
import { projectsData } from '../src/data/projects.js';
import { blogArticles } from '../src/data/blogs.js';
import { defaultPages } from '../src/data/pages.js';

const BASE_URL = 'https://crew5.agency';
const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
  console.log('Generating high-performance sitemap.xml with Google Image extensions...');

  // Try to load dynamic DB if exists
  let dynamicDb = null;
  try {
    const dbPath = path.resolve(__dirname, '../server/data/database.json');
    if (fs.existsSync(dbPath)) {
      dynamicDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
  } catch (e) {
    console.warn('Note: Could not read dynamic DB, fallback to static data files.');
  }

  const urls = [];

  // 1. Static Core Pages
  const staticRoutes = [
    { url: '', changefreq: 'daily', priority: '1.0', title: 'Crew5 Agency | الرئيسية' },
    { url: '/about', changefreq: 'weekly', priority: '0.8', title: 'من نحن | Crew5 Agency' },
    { url: '/ceo-message', changefreq: 'monthly', priority: '0.8', title: 'رسالة الرئيس التنفيذي' },
    { url: '/services', changefreq: 'weekly', priority: '0.9', title: 'خدماتنا | Crew5 Agency' },
    { url: '/projects', changefreq: 'weekly', priority: '0.9', title: 'أعمالنا | Crew5 Agency' },
    { url: '/estimator', changefreq: 'monthly', priority: '0.8', title: 'حاسبة المشاريع الرقمية' },
    { url: '/audit', changefreq: 'monthly', priority: '0.8', title: 'فحص وتدقيق المواقع' },
    { url: '/blog', changefreq: 'daily', priority: '0.9', title: 'المدونة الرقمية | Crew5 Agency' },
    { url: '/contact', changefreq: 'monthly', priority: '0.8', title: 'تواصل معنا' },
    { url: '/faq', changefreq: 'monthly', priority: '0.7', title: 'الأسئلة الشائعة' },
    { url: '/privacy-policy', changefreq: 'yearly', priority: '0.5', title: 'سياسة الخصوصية' },
    { url: '/terms-and-conditions', changefreq: 'yearly', priority: '0.5', title: 'الشروط والأحكام' }
  ];

  staticRoutes.forEach(route => {
    urls.push({
      loc: `${BASE_URL}${route.url}`,
      lastmod: today,
      changefreq: route.changefreq,
      priority: route.priority,
      image: `${BASE_URL}/assets/hero_team.jpg`,
      imageTitle: route.title
    });
  });

  // 2. Services
  const allServices = (dynamicDb && dynamicDb.services) ? dynamicDb.services : servicesCategories;
  allServices.forEach(cat => {
    (cat.services || []).forEach(serv => {
      const slug = serv.slug || serv.id;
      if (slug) {
        const img = serv.imageUrl || '/assets/hero_team.jpg';
        urls.push({
          loc: `${BASE_URL}/services/${slug}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8',
          image: img.startsWith('http') ? img : `${BASE_URL}${img}`,
          imageTitle: serv.title || 'خدمة كرو فايف'
        });
      }
    });
  });

  // 3. Projects
  const allProjects = (dynamicDb && dynamicDb.projects) ? dynamicDb.projects : projectsData;
  allProjects.forEach(proj => {
    if (proj.slug && proj.status !== 'archived') {
      const img = proj.imageUrl || '/assets/hero_team.jpg';
      urls.push({
        loc: `${BASE_URL}/projects/${proj.slug}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.8',
        image: img.startsWith('http') ? img : `${BASE_URL}${img}`,
        imageTitle: proj.title || 'مشروع كرو فايف'
      });
    }
  });

  // 4. Blog Posts
  const allBlogs = (dynamicDb && dynamicDb.blogs) ? dynamicDb.blogs : blogArticles;
  allBlogs.forEach(post => {
    if (post.slug && post.status !== 'archived') {
      const img = post.imageUrl || '/assets/hero_team.jpg';
      urls.push({
        loc: `${BASE_URL}/blog/${post.slug}`,
        lastmod: post.isoDate || (post.date ? new Date(post.date).toISOString().split('T')[0] : today),
        changefreq: 'weekly',
        priority: '0.8',
        image: img.startsWith('http') ? img : `${BASE_URL}${img}`,
        imageTitle: post.title || 'مقال كرو فايف'
      });
    }
  });

  // 5. Custom Pages
  const allPages = (dynamicDb && dynamicDb.pages) ? dynamicDb.pages : defaultPages;
  allPages.forEach(p => {
    if (p.slug && !p.isSystem && p.isPublished !== false) {
      urls.push({
        loc: `${BASE_URL}/p/${p.slug}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.6',
        image: `${BASE_URL}/assets/hero_team.jpg`,
        imageTitle: p.title || 'صفحة كرو فايف'
      });
    }
  });

  // Assemble XML with standard sitemap and image extensions
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  urls.forEach(item => {
    xml += `  <url>\n`;
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    if (item.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${item.image}</image:loc>\n`;
      xml += `      <image:title><![CDATA[${item.imageTitle || 'Crew5 Agency'}]]></image:title>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const publicOutput = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicOutput, xml, 'utf8');
  console.log(`✅ sitemap.xml generated at ${publicOutput} with ${urls.length} indexed URLs & images.`);

  const distDir = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), xml, 'utf8');
  }
}

generateSitemap();
