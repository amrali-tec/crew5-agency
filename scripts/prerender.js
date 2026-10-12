import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import static datasets
import { servicesCategories } from '../src/data/services.js';
import { projectsData } from '../src/data/projects.js';
import { blogArticles } from '../src/data/blogs.js';
import { defaultPages } from '../src/data/pages.js';

const BASE_URL = 'https://crew5.agency';

function prerender() {
  console.log('🚀 Starting Build-Time SSG Pre-rendering for Google SEO...');

  const distDir = path.resolve(__dirname, '../dist');
  const indexHtmlPath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ Error: dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Try loading dynamic database if available
  let dynamicDb = null;
  try {
    const dbPath = path.resolve(__dirname, '../server/data/database.json');
    if (fs.existsSync(dbPath)) {
      dynamicDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
  } catch (e) {
    console.warn('Note: Could not load dynamic DB, fallback to static datasets.');
  }

  const routes = [];

  // 1. Static Core Routes
  const staticRoutes = [
    { url: '', title: 'Crew5 Agency | أفضل وكالة تسويق رقمي وتطوير مواقع بالسعودية', desc: 'نصنع الإبداع الرقمي الذي يقود مستقبلك. شريكك الاستراتيجي في تطوير المواقع، الهويات البصرية، والإنتاج السينمائي.' },
    { url: 'about', title: 'من نحن | Crew5 Agency - ريادة التحول الرقمي', desc: 'تعرف على قصة ورؤية وفريق وكالة كرو فايف (Crew5 Agency) في تمكين الشركات والمؤسسات في السعودية ومصر.' },
    { url: 'ceo-message', title: 'كلمة الرئيس التنفيذي | Crew5 Agency', desc: 'الرؤية الاستراتيجية والرسالة القيادية للرئيس التنفيذي لوكالة Crew5 Agency في قيادة التحول الرقمي.' },
    { url: 'services', title: 'خدماتنا والحلول الرقمية | Crew5 Agency', desc: 'استعرض كافة خدمات وكالة كرو فايف في البرمجة السحابية، المتاجر الإلكترونية، الهويات البصرية، ومحركات البحث.' },
    { url: 'projects', title: 'معرض الأعمال والمشاريع | Crew5 Agency', desc: 'شاهد سابقة أعمال كرو فايف في تصميم وتطوير المواقع والمتاجر، الهويات البصرية، والإعلانات السينمائية.' },
    { url: 'blog', title: 'المدونة الرقمية والأدلة الاستراتيجية | Crew5 Agency', desc: 'مقالات وأدلة ورؤى تسويقية وتقنية متقدمة يقدمها خبراء وكالة Crew5 حول السيو والتجارة الإلكترونية.' },
    { url: 'contact', title: 'تواصل معنا | Crew5 Agency - الرياض ومصر', desc: 'احجز جلسة استشارية مع خبراء وكالة Crew5 لبدء مشروعك القادم في البرمجة أو التسويق الرقمي.' },
    { url: 'estimator', title: 'حاسبة تكلفة المشاريع الرقمية | Crew5 Agency', desc: 'احسب تكلفة تصميم وتطوير موقعك الإلكتروني أو متجرك أو هويتك البصرية بدقة وشفافية خلال ثوانٍ.' },
    { url: 'audit', title: 'فحص وتدقيق المواقع والأداء | Crew5 Agency', desc: 'احصل على فحص مجاني شامل لأداء موقعك، سرعة التحميل، ومشاكل السيو التقني.' },
    { url: 'faq', title: 'الأسئلة الشائعة | Crew5 Agency', desc: 'إجابات مفصلة على كافة استفسارات التعاقد وآليات التنفيذ والدفع وضمانات الجودة.' },
    { url: 'privacy-policy', title: 'سياسة الخصوصية | Crew5 Agency', desc: 'التزام وكالة Crew5 بحماية بيانات المستخدمين والسرية التامة وفق الأنظمة السعودية.' },
    { url: 'terms-and-conditions', title: 'الشروط والأحكام | Crew5 Agency', desc: 'الضوابط والاشتراطات المنظمة لخدمات ومشاريع وكالة Crew5 Agency.' }
  ];

  staticRoutes.forEach(r => routes.push(r));

  // 2. Blog Posts
  const blogs = (dynamicDb && dynamicDb.blogs) ? dynamicDb.blogs : blogArticles;
  blogs.forEach(post => {
    if (post.slug && post.status !== 'archived') {
      routes.push({
        url: `blog/${post.slug}`,
        title: `${post.title} | مدونة Crew5 Agency`,
        desc: post.excerpt ? post.excerpt.slice(0, 160) : 'مقال متميز على مدونة وكالة كرو فايف الرقمية.',
        image: post.imageUrl || '/assets/hero_team.jpg',
        content: `<h1>${post.title}</h1><p>${post.excerpt || ''}</p>${post.content || ''}`
      });
    }
  });

  // 3. Projects
  const projects = (dynamicDb && dynamicDb.projects) ? dynamicDb.projects : projectsData;
  projects.forEach(proj => {
    if (proj.slug && proj.status !== 'archived') {
      routes.push({
        url: `projects/${proj.slug}`,
        title: `${proj.title} | مشاريع Crew5 Agency`,
        desc: proj.description ? proj.description.slice(0, 160) : 'مشروع متميز من سابقة أعمال كرو فايف.',
        image: proj.imageUrl || '/assets/hero_team.jpg',
        content: `<h1>${proj.title}</h1><p>${proj.description || ''}</p><div>${proj.fullDetails || ''}</div>`
      });
    }
  });

  // 4. Services
  const services = (dynamicDb && dynamicDb.services) ? dynamicDb.services : servicesCategories;
  services.forEach(cat => {
    (cat.services || []).forEach(serv => {
      const slug = serv.slug || serv.id;
      if (slug) {
        routes.push({
          url: `services/${slug}`,
          title: `${serv.title} | خدمات Crew5 Agency`,
          desc: serv.description ? serv.description.slice(0, 160) : 'خدمة مخصصة من وكالة كرو فايف للحلول الرقمية.',
          image: serv.imageUrl || '/assets/hero_team.jpg',
          content: `<h1>${serv.title}</h1><p>${serv.description || ''}</p>`
        });
      }
    });
  });

  // 5. Custom Pages
  const pages = (dynamicDb && dynamicDb.pages) ? dynamicDb.pages : defaultPages;
  pages.forEach(p => {
    if (p.slug && !p.isSystem && p.isPublished !== false) {
      routes.push({
        url: `p/${p.slug}`,
        title: `${p.title} | Crew5 Agency`,
        desc: p.seoDescription ? p.seoDescription.slice(0, 160) : 'صفحة خاصة من وكالة كرو فايف.',
        content: `<h1>${p.title}</h1><p>${p.seoDescription || ''}</p>`
      });
    }
  });

  let generatedCount = 0;

  routes.forEach(route => {
    const routePath = route.url;
    const targetDir = routePath === '' ? distDir : path.resolve(distDir, routePath);
    const targetFile = path.resolve(targetDir, 'index.html');

    if (routePath !== '' && !fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const canonicalUrl = `${BASE_URL}/${routePath}`;
    const imgUrl = route.image ? (route.image.startsWith('http') ? route.image : `${BASE_URL}${route.image}`) : `${BASE_URL}/assets/hero_team.jpg`;

    let html = baseHtml;

    // Replace Title
    html = html.replace(/<title>(.*?)<\/title>/is, `<title>${escapeXml(route.title)}</title>`);
    html = html.replace(/<meta name="title" content="(.*?)" \/>/is, `<meta name="title" content="${escapeXml(route.title)}" />`);

    // Replace Description
    html = html.replace(/<meta name="description" content="(.*?)" \/>/is, `<meta name="description" content="${escapeXml(route.desc)}" />`);

    // Replace Open Graph Tags
    html = html.replace(/<meta property="og:title" content="(.*?)" \/>/is, `<meta property="og:title" content="${escapeXml(route.title)}" />`);
    html = html.replace(/<meta property="og:description" content="(.*?)" \/>/is, `<meta property="og:description" content="${escapeXml(route.desc)}" />`);
    html = html.replace(/<meta property="og:url" content="(.*?)" \/>/is, `<meta property="og:url" content="${escapeXml(canonicalUrl)}" />`);
    html = html.replace(/<meta property="og:image" content="(.*?)" \/>/is, `<meta property="og:image" content="${escapeXml(imgUrl)}" />`);

    // Inject Canonical URL
    if (!html.includes('<link rel="canonical"')) {
      html = html.replace('</head>', `    <link rel="canonical" href="${escapeXml(canonicalUrl)}" />\n  </head>`);
    } else {
      html = html.replace(/<link rel="canonical" href="(.*?)" \/>/is, `<link rel="canonical" href="${escapeXml(canonicalUrl)}" />`);
    }

    // Inject Prerendered HTML Content
    if (route.content) {
      const prerenderContainer = `<div id="root"><main style="padding:40px 20px;max-width:900px;margin:0 auto;">${route.content}</main></div>`;
      html = html.replace('<div id="root"></div>', prerenderContainer);
    }

    fs.writeFileSync(targetFile, html, 'utf8');
    generatedCount++;
  });

  console.log(`✅ SSG Pre-rendering completed successfully! Generated ${generatedCount} static HTML pages in dist/`);
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

prerender();
