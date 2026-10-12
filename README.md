# ⚡ Crew 5 Agency - Digital Media & Creative Solutions
# وكالة كرو 5 للحلول الرقمية والإبداعية

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-black?logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🌐 المنصة الإنتاجية الحية | Live Platform & Production

- **الموقع الرسمي الحي (Live URL)**: [https://crew5.agency](https://crew5.agency)
- **بوابة الإدارة (Live Admin Portal)**: [https://crew5.agency/admin](https://crew5.agency/admin)
- **حالة ومؤشرات الـ API (API Health)**: [https://crew5.agency/api/stats](https://crew5.agency/api/stats)

---

## 📖 نظرة عامة | Overview

**Crew 5 Agency** هي منصة ويب كاملة (Full-Stack) لوكالة إبداعية رائدة متخصصة في الإنتاج المرئي، التسويق الرقمي، الهوية البصرية، وتطوير المنصات الرقمية. تتميز المنصة بتصميم نيوني فخم (Dark Neon & Cyberpunk Aesthetics)، تفاعلات فائقة السرعة، دعم ثنائي اللغة (عربي / إنجليزي)، وخادم خلفي متكامل لإدارة الطلبات والبيانات والتحليلات.

**Crew 5 Agency** is a full-stack digital creative agency web application. Engineered with React 19, Vite 6, and Express 5, it combines bold dark neon visual aesthetics with high-performance animations, bilingual localization, dynamic portfolio showcases, and a secure operational management backend.

---

## ✨ المميزات الرئيسية | Core Features

### 🚀 واجهة الزوار (Client Experience)
- **تصميم نيوني مستقبلي فاخر (Dark Neon Theme)**: تدرجات لونية مدروسة، تأثيرات زجاجية (Glassmorphism)، وتفاعلات دقيقة بحركات Framer Motion.
- **دعم ثنائي اللغة فوري (Instant Arabic & English)**: تبديل سلس بدون إعادة تحميل الصفحة مع دعم كامل لاتجاهات RTL و LTR.
- **معرض الأعمال والمشاريع (Creative Portfolio)**: استعراض المشاريع الإبداعية مع تصنيفات تفاعلية وفيديوهات وصور عالية الدقة.
- **باقات وخدمات الوكالة (Services & Packages)**: استعراض تفصيلي لخدمات الإنتاج، الحملات الإعلانية، وتطوير الويب.
- **نظام طلب عروض الأسعار (Instant Quotation & Contact)**: نموذج تفاعلي ذكي لطلب عروض الأسعار وربط سريع عبر واتساب والبريد.
- **توليد الخرائط والفهرسة (SEO & Prerender)**: سكربت مدمج لتوليد `sitemap.xml` والتهيئة المسبقة لمحركات البحث.

### 🛡️ لوحة التحكم والخادم الخلفي (Backend & Admin Portal)
- **خادم Express 5 مخصص**: معالجة سريعة لطلبات الـ API ونقاط النهاية (`/api/stats`, `/api/contact`, etc.).
- **أمان وحماية متقدمة**: جدار حماية ضد هجمات الإغراق ومحددات معدل الطلبات عبر `security.js`.
- **قاعدة بيانات مدمجة مرنة**: تخزين وإدارة البيانات الميدانية عبر `server/db.js` مع دعم المزامنة الثنائية.
- **نشر تلقائي بنقرة واحدة (Automated Deployment Pipeline)**: سكربت مدمج لنشر التحديثات عبر SSH/SFTP مباشرة لخوادم الإنتاج.

---

## 🛠️ التقنيات المستخدمة | Tech Stack

- **الواجهة الأمامية (Frontend)**:
  - React 19 + Vite 6
  - Tailwind CSS 3.4
  - Framer Motion 12
  - React Router DOM 7
  - Lucide React Icons
- **الواجهة الخلفية (Backend)**:
  - Node.js + Express 5
  - CORS + Multer لإدارة الملفات المرفوعة
- **البنية التحتية والتشغيل (DevOps)**:
  - Docker & Docker Compose
  - Node Deployment Automations (`ssh2`)

---

## 📂 هيكل المجلدات | Directory Structure

```text
crew 5 agency/
├── .gitignore
├── README.md
├── walkthrough.md             # توثيق خطوات النشر الإنتاجي
├── Dockerfile & docker-compose.yml
├── vite.config.js
├── tailwind.config.js
├── package.json
├── index.html
├── src/                       # الواجهة الأمامية React
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/            # مكونات الواجهة (الهيدر، الفوتر، البطاقات)
│   ├── pages/                 # صفحات الموقع (الرئيسية، الأعمال، الخدمات، الإدارة)
│   ├── i18n/                  # ملفات الترجمة واللغات (ar/en)
│   ├── context/               # سياق اللغة والمظهر
│   └── services/              # عملاء التواصل مع API
├── server/                    # خادم Node / Express
│   ├── index.js               # خادم الـ API الرئيسي
│   ├── db.js                  # إدارة قاعدة البيانات والبيانات المدمجة
│   └── security.js            # طبقة الأمان والتحقق
├── scripts/                   # سكربتات التشغيل التلقائي
│   ├── deploy_to_server.js    # النشر التلقائي عبر SSH/SFTP
│   ├── generate_sitemap.js    # توليد خريطة الموقع
│   └── prerender.js           # العرض المسبق لمحركات البحث
└── public/                    # الوسائط والأصول الثابتة
```

---

## 🚀 التشغيل والتطوير المحلي | Local Development

### 1. تثبيت الاعتمادات:
```bash
npm install
```

### 2. تشغيل بيئة التطوير للواجهة الأمامية:
```bash
npm run dev
```
التطبيق متاح على: `http://localhost:5173`

### 3. تشغيل الخادم الخلفي (Express API):
```bash
npm run server
```

### 4. البناء للإنتاج وتشغيل الحزمة الكاملة:
```bash
# بناء الإنتاج وتوليد الخرائط والفهرسة
npm run build

# تشغيل الخادم الإنتاجي
npm run start
```

### 5. التشغيل عبر Docker:
```bash
docker-compose up --build
```

---

## 📄 الملكية | Ownership
جميع الحقوق محفوظة © Crew 5 Agency.
