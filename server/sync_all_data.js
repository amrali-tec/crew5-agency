import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { servicesCategories } from '../src/data/services.js';
import { projectsData } from '../src/data/projects.js';
import { blogArticles } from '../src/data/blogs.js';
import { teamMembers } from '../src/data/team.js';
import { testimonialsData } from '../src/data/testimonials.js';
import { defaultSiteSections } from '../src/data/siteSections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// 1. Sync Services with full English & Arabic fields
db.servicesCategories = servicesCategories;
db.services = servicesCategories;

// 2. Sync Projects with full English & Arabic fields
db.projects = projectsData;

// 3. Sync Blogs with full English & Arabic fields
db.blogs = blogArticles;

// 4. Sync Team
db.team = teamMembers;

// 5. Sync Testimonials
db.testimonials = testimonialsData;

// 6. Sync Site Sections
db.site_sections = defaultSiteSections;

// 7. Update Custom Components to include English versions
if (Array.isArray(db.customComponents)) {
  db.customComponents = db.customComponents.map(comp => {
    if (comp.type === 'announcement_bar') {
      return {
        ...comp,
        data: {
          ...comp.data,
          badge: comp.data.badge || "عرض خاص",
          badgeEn: comp.data.badgeEn || "Special Offer",
          text: comp.data.text || "خصم 20% لفترة محدودة على باقات الهوية والتسويق الرقمي بمناسبة إطلاق الموسم الجديد! 🚀",
          textEn: comp.data.textEn || "Limited 20% discount on Brand Identity & Digital Marketing for the new season launch! 🚀",
          btnText: comp.data.btnText || "احجز عرضك الآن",
          btnTextEn: comp.data.btnTextEn || "Claim Your Offer"
        }
      };
    }
    if (comp.type === 'promo_banner') {
      return {
        ...comp,
        data: {
          ...comp.data,
          badge: comp.data.badge || "استشارة مجانية ومباشرة",
          badgeEn: comp.data.badgeEn || "Free Strategy Consultation",
          title: comp.data.title || "جاهز لتوسيع انتشار علامتك في السوق؟",
          titleEn: comp.data.titleEn || "Ready to scale your market presence?",
          highlight: comp.data.highlight || "احصل على تدقيق رقمي مجاني",
          highlightEn: comp.data.highlightEn || "Get Free Digital Audit",
          subtitle: comp.data.subtitle || "يقوم خبراؤنا بتحليل حضورك الرقمي وتقديم خطة نمو واضحة تضمن لك مضاعفة المبيعات والتفوق على المنافسين.",
          subtitleEn: comp.data.subtitleEn || "Our specialists audit your digital presence and deliver an actionable roadmap to double sales and outperform competitors.",
          btnText: comp.data.btnText || "طلب التدقيق المجاني",
          btnTextEn: comp.data.btnTextEn || "Claim Free Audit",
          secondaryBtnText: comp.data.secondaryBtnText || "استعراض الخدمات",
          secondaryBtnTextEn: comp.data.secondaryBtnTextEn || "Explore Services"
        }
      };
    }
    return comp;
  });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log('Successfully synced all bilingual datasets to database.json!');
