export const projectCategories = [
  { key: 'all', label: 'جميع المشاريع', labelEn: 'All Projects' },
  { key: 'web', label: 'تصميم وتطوير المواقع', labelEn: 'Web & E-Commerce' },
  { key: 'branding', label: 'بناء الهوية والتصميم', labelEn: 'Brand Identity' },
  { key: 'marketing', label: 'التسويق عبر وسائل التواصل', labelEn: 'Performance Marketing' },
  { key: 'video', label: 'الإنتاج المرئي والمونتاج', labelEn: 'Visual Production' },
];

export const projectsData = [
  {
    id: 1,
    slug: 'cairo-cosmo-center',
    title: 'تصميم وتطوير المنصة الرقمية لـ "مركز القاهرة الطبي لجراحات التجميل والليزر"',
    titleEn: 'Digital Platform & Clinic Booking Engine for Cairo Cosmo Center',
    category: 'تصميم وتطوير المواقع والحلول الطبية',
    categoryEn: 'Medical Web Engineering & Multi-Branch Systems',
    categoryKey: 'web',
    client: 'Cairo Cosmo Center (مركز القاهرة الطبي)',
    clientEn: 'Cairo Cosmo Medical Center',
    year: '2025',
    completionDate: 'يناير 2025',
    completionDateEn: 'January 2025',
    duration: '25 يوم عمل',
    durationEn: '25 Business Days',
    description: 'منصة رقمية طبية متقدمة وفائقة السرعة لحجز مواعيد واستشارات التجميل والليزر والعناية بالبشرة، مع إدارة فروع المركز الخمسة ونظام متقدم لتتبع التحويلات الإعلانية وتهيئة السيو الطبي الشامل.',
    descriptionEn: 'High-speed medical portal for online consultations, laser & cosmetic appointment bookings across 5 clinic branches with complete medical SEO architecture.',
    fullDetails: 'تضمن المشروع تصميم واجهة مستخدم فاخرة وعصرية متوافقة مع أجهزة الجوال، بناء نظام حجز مواعيد تفاعلي وإدارة الفروع الخمسة (شيراتون، الدقي، 6 أكتوبر، المنصورة، شبرا)، تطبيق استراتيجية تحسين محركات البحث الطبية (Medical SEO) مع ترميز Schema.org الطبي المتقدم، وربط Google Tag Manager و Meta Pixel لتتبع التحويلات بدقة.',
    fullDetailsEn: 'Engineered a luxury mobile-first UI/UX, multi-branch clinic booking engine, advanced Medical Schema.org SEO, and full Conversions API tracking for Meta & Google Ads.',
    challenge: 'كان المركز يعاني من تشتت حجوزات الفروع الخمسة وضياع أكثر من 35% من العملاء المحتملين القادمين من إعلانات تيك توك وميتا بسبب بطء صفحات الهبوط السابقة وعدم وجود نظام حجز لحظي مباشر ومربوط بالواتساب وإدارات الفروع.',
    challengeEn: 'The clinic chain suffered from fragmented bookings across 5 physical branches and lost 35%+ of ad traffic due to slow legacy landing pages and lack of unified WhatsApp booking automation.',
    solution: 'قمنا ببناء منصة طبية فائقة السرعة بمعمارية React + Vite محققة 99/100 على Google PageSpeed، مع محرك حجز ذكي يتيح للعميل اختيار الفرع والطبيب والخدمة، وربط تلقائي بالواتساب وConversions API لتتبع عائد الإعلانات بدقة متناهية.',
    solutionEn: 'Engineered a high-speed medical web portal scoring 99/100 PageSpeed with multi-branch calendar routing, direct WhatsApp CRM sync, and full Conversions API event attribution.',
    imageUrl: '/assets/project_beauty_center.jpg',
    tags: ['تطوير مواقع', 'بيوتي سنتر', 'حجز مواعيد', 'Medical SEO', 'React', 'UI/UX'],
    tagsEn: ['Web Dev', 'Medical Portal', 'Online Booking', 'Medical SEO', 'React', 'UI/UX'],
    results: [
      { label: 'ارتفاع الحجوزات المؤكدة', labelEn: 'Confirmed Bookings Surge', value: '+280%' },
      { label: 'زمن تحميل الصفحة', labelEn: 'Page Load Speed', value: '0.7s' },
      { label: 'تصدر نتائج Google', labelEn: 'Top Google Medical Rankings', value: '+45 Keywords' }
    ],
    deliverables: [
      'منصة ويب طبية تفاعلية متجاوبة 100% مع أجهزة الجوال والشاشات المختلفة',
      'محرك حجز مواعيد واستشارات إلكتروني يوزع الطلبات على الفروع الخمسة',
      'تهيئة السيو الطبي الشامل (Medical Schema.org & Local SEO)',
      'ربط Google Tag Manager و Meta Pixel و TikTok Pixel و Conversion APIs',
      'لوحة تحكم إدارية باللغتين العربية والإنجليزية لإدارة الأطباء والمواعيد',
      'نظام إشعارات فورية وتأكيد حجز آلي عبر رسائل الواتساب'
    ],
    deliverablesEn: [
      'High-velocity medical web portal with mobile-first UI/UX architecture',
      'Multi-branch clinic booking engine with automated calendar and doctor sync',
      'Advanced Medical Schema.org & Google Local SEO optimization',
      'Full pixel tracking & Conversions API integration (Meta & TikTok)',
      'Bilingual admin dashboard for appointment and schedule management',
      'Automated WhatsApp instant appointment confirmation workflows'
    ],
    processSteps: [
      {
        step: '01',
        title: 'تحليل رحلة المريض ودراسة المتطلبات',
        titleEn: 'Patient Journey & Clinical Discovery',
        desc: 'دراسة سلوك المراجعين، تحليل المنافسين، وتحديد مسار الحجز الطبي الأمثل لتقليل زمن التأكيد.',
        descEn: 'Auditing patient touchpoints, competitor benchmarks, and frictionless booking paths.'
      },
      {
        step: '02',
        title: 'تصميم الواجهات الحصرية (UI/UX)',
        titleEn: 'Medical Luxury UI/UX Design',
        desc: 'ابتكار واجهات مستخدم مريحة وفخمة تعزز ثقة المراجع وتعرض نتائج جراحات التجميل باحترافية.',
        descEn: 'Crafting clinical elegance and trust-focused interfaces optimized for mobile conversion.'
      },
      {
        step: '03',
        title: 'الهندسة البرمجية والربط السحابي',
        titleEn: 'Agile Engineering & API Sync',
        desc: 'كتابة كود برمجي نظيف وسريع، وتكامل قواعد البيانات السحابية ونظام الواتساب وMeta Pixel.',
        descEn: 'Developing clean high-performance code, cloud database clusters, and WhatsApp CRM APIs.'
      },
      {
        step: '04',
        title: 'الفحص الشامل والإطلاق والنمو',
        titleEn: 'QA Testing, Launch & SEO Dominance',
        desc: 'فحص التوافق مع Core Web Vitals وتدشين المنصة وإدارة حملات الإعلانات لتحقيق أعلى عائد.',
        descEn: 'Stress testing, Google Core Web Vitals optimization, live launch, and scaling campaigns.'
      }
    ],
    techStack: ['React 19', 'Vite', 'Tailwind CSS', 'Node.js Express', 'Cloudflare Edge', 'Medical Schema.org', 'Meta Pixel', 'WhatsApp API'],
    testimonial: {
      name: 'د. أحمد عبد العزيز',
      nameEn: 'Dr. Ahmed Abdelaziz',
      role: 'المدير الطبي العام | مركز القاهرة كوزمو سنتر',
      roleEn: 'Chief Medical Director | Cairo Cosmo Center',
      avatar: '/assets/avatar_2.jpg',
      rating: 5,
      quote: 'منصة القاهرة كوزمو سنتر نقلت عملنا لمستوى احترافي غير مسبوق. ارتفعت نسبة الحجوزات المؤكدة بنسبة 280% وانخفضت تكلفة الاستحواذ على المريض بفضل سرعة الموقع وتكامله المباشر مع الواتساب.',
      quoteEn: 'Crew5 elevated our clinic operations to enterprise standards. Confirmed patient bookings jumped +280% while acquisition costs dropped significantly thanks to speed and automated WhatsApp routing.'
    }
  },
  {
    id: 2,
    slug: 'hedab-al-khaleej-contracting',
    title: 'المنصة المؤسسية لـ "شركة هضاب الخليج للمقاولات العامة" والبنية التحتية',
    titleEn: 'Enterprise Platform for Hedab Al-Khaleej Contracting & Infrastructure',
    category: 'تصميم وتطوير المنصات المؤسسية وتحسين الأداء',
    categoryEn: 'Corporate Enterprise Web & Infrastructure',
    categoryKey: 'web',
    client: 'شركة هضاب الخليج العربي للمقاولات العامة',
    clientEn: 'Hedab Al-Khaleej General Contracting Co.',
    year: '2025',
    completionDate: 'فبراير 2025',
    completionDateEn: 'February 2025',
    duration: '20 يوم عمل',
    durationEn: '20 Business Days',
    description: 'منصة رقمية مؤسسية عالية الأداء لعرض مشاريع البنية التحتية وسفلتة الطرق وتصريف السيول ومصانع حواجز نيوجيرسي الخرسانية والاعتمادات السيادية في المملكة العربية السعودية.',
    descriptionEn: 'High-performance bilingual enterprise portal showcasing civil infrastructure, asphalt paving, storm drainage, precast concrete factories, and official Saudi accreditations.',
    fullDetails: 'شمل المشروع تطوير بنية برمجية فائقة السرعة بمعمارية React + Vite و PHP Backend داعمة للغتين (العربية والإنجليزية)، تحقيق أعلى مؤشرات Core Web Vitals مع Instant First Paint والتحميل اللحظي، تصميم هوية رقمية تعكس الرصانة الهندسية والقدرات التنفيذية، وتهيئة محركات البحث المتقدمة للمناقصات والمشاريع الحكومية والخاصة.',
    fullDetailsEn: 'Built on high-velocity React + Vite with instant paint performance (99/100 Lighthouse), bilingual LTR/RTL support, and structured schema for sovereign tenders.',
    challenge: 'الحاجة إلى واجهة رقمية مؤسسية قوية تعكس القدرات الهندسية الضخمة للشركة ومصانع الخرسانة الجاهزة والمشاريع الحكومية، وتوفر سهولة تقديم عروض المناقصات (RFP) مع سرعة تحميل استثنائية.',
    challengeEn: 'Required an authoritative enterprise platform capable of presenting multi-million SAR sovereign road civil works, drainage projects, and precast factories for sovereign tenders.',
    solution: 'قمنا بهندسة بوابة مؤسسية سحابية ثنائية اللغة متوافقة مع الهوية السعودية ومحققة 99/100 على Google Lighthouse، مع معرض مشاريع تفاعلي ونظام تنزيل البروفايل المؤسسي المعتمد PDF.',
    solutionEn: 'Developed an ultra-fast bilingual portal with instant paint performance (99/100 Lighthouse), structured tender RFP forms, and interactive civil infrastructure portfolio showcase.',
    imageUrl: '/assets/project_hedabkh.webp',
    tags: ['مواقع شركات', 'مقاولات وبنية تحتية', 'أداء وسرعة', 'SEO', 'React + PHP', 'ثنائي اللغة'],
    tagsEn: ['Corporate Web', 'Infrastructure', 'Performance Speed', 'SEO', 'React + PHP', 'Bilingual'],
    results: [
      { label: 'تقييم السرعة (Lighthouse)', labelEn: 'Google Lighthouse Score', value: '99/100' },
      { label: 'زيادة استفسارات المناقصات', labelEn: 'Tender Inquiries Growth', value: '+190%' },
      { label: 'سرعة الاستجابة اللحظية', labelEn: 'Server Response Time', value: '0.5s' }
    ],
    deliverables: [
      'منصة رقمية مؤسسية ثنائية اللغة كاملة ومستضافة سحابياً',
      'معرض مشاريع بنية تحتية ومصانع خرسانة تفاعلي مع تصنيف دقيق',
      'نظام تنزيل الملف التعريفي المؤسسي (Company Profile PDF) التفاعلي',
      'تهيئة SEO للكلمات المفتاحية للمناقصات والمقاولات والبنية التحتية بالسعودية',
      'نماذج طلب عروض الأسعار والمناقصات مع إشعارات إدارية فورية'
    ],
    deliverablesEn: [
      'Full bilingual enterprise portal deployed on global cloud CDN',
      'Interactive infrastructure & precast concrete project directory',
      'Instant Company Profile PDF download engine with corporate branding',
      'Sovereign tender & construction industry SEO optimization for Saudi Arabia',
      'Structured RFP & tender inquiry pipeline with instant executive notifications'
    ],
    processSteps: [
      {
        step: '01',
        title: 'استيعاب الهيكل المؤسسي والاعتمادات',
        titleEn: 'Corporate Discovery & Accreditations',
        desc: 'حصر أصول ومصانع الشركة ومشاريع الطرق وتوثيق الشهادات والتصنيفات السيادية.',
        descEn: 'Cataloging civil infrastructure assets, concrete plants, and official sovereign certifications.'
      },
      {
        step: '02',
        title: 'التصميم الهندسي الرصين (UI/UX)',
        titleEn: 'Engineering-Grade UI/UX Design',
        desc: 'تصميم واجهات مستخدم وقورة وحديثة تبرز الإنجازات الميدانية بدقة وتناسق بصري متكامل.',
        descEn: 'Designing a prestigious engineering aesthetic that commands corporate authority.'
      },
      {
        step: '03',
        title: 'البناء البرمجي ودعم اللغتين',
        titleEn: 'Bilingual Core Engineering',
        desc: 'تطوير بنية برمجية داعمة للاتجاهين RTL و LTR مع سرعة استجابة فائقة وأمان عالي.',
        descEn: 'Implementing dual-language RTL/LTR architecture with sub-second response times.'
      },
      {
        step: '04',
        title: 'الاعتماد والتدشين الرسمي',
        titleEn: 'Compliance Audit & Deployment',
        desc: 'فحص المعايير السحابية وتفعيل شهادات الأمان وإطلاق الموقع ليكون جاهزاً للمناقصات.',
        descEn: 'Security hardening, SSL deployment, and production launch ready for enterprise tenders.'
      }
    ],
    techStack: ['React 19', 'PHP Backend', 'Vite', 'Tailwind CSS', 'Cloudflare DNS', 'Structured Schema', 'PDF Generator'],
    testimonial: {
      name: 'م. عبد الرحمن القحطاني',
      nameEn: 'Eng. Abdulrahman Al-Qahtani',
      role: 'المدير التنفيذي | شركة هضاب الخليج للمقاولات',
      roleEn: 'Managing Director | Hedab Al-Khaleej Contracting',
      avatar: '/assets/avatar_1.jpg',
      rating: 5,
      quote: 'المنصة الجديدة عكست قوة واعتمادات شركتنا بالشكل اللائق أمام كبرى الجهات والشركات في المملكة. سرعة التصفح وتناسق الهوية كانا مبهرين وحققنا زيادة 190% في طلبات المناقصات.',
      quoteEn: 'The new platform perfectly projected our enterprise scale and sovereign accreditations across the Kingdom. Velocity and visual rigor exceeded expectations with a 190% tender inquiry surge.'
    }
  },
  {
    id: 3,
    slug: 'elite-luxury-ecommerce',
    title: 'تصميم وتطوير متجر "إيليت كولكشن" للمنتجات الفاخرة والتجارة الإلكترونية',
    titleEn: 'High-Converting E-Commerce Store for Elite Collection Luxury',
    category: 'تصميم وتطوير المواقع والمتاجر',
    categoryEn: 'Luxury E-Commerce & Conversion Engineering',
    categoryKey: 'web',
    client: 'إيليت لاكشري للتجارة الإلكترونية',
    clientEn: 'Elite Luxury E-Commerce',
    year: '2025',
    completionDate: 'مارس 2025',
    completionDateEn: 'March 2025',
    duration: '18 يوم عمل',
    durationEn: '18 Business Days',
    description: 'متجر إلكتروني عالي التحويل (High-Converting E-Commerce) بتجربة تسوق سلسة بنقرة واحدة، وتكامل كامل مع بوابات الدفع الإلكتروني (Apple Pay, Mada, Tamara, Tabby) وإدارة المخزون السحابي.',
    descriptionEn: 'Frictionless 1-Click checkout e-commerce experience integrated with regional payments (Apple Pay, Mada, Tamara, Tabby) and cloud inventory management.',
    fullDetails: 'قمنا بهندسة واجهة شراء سريعة (1-Click Checkout) تخفض معدل التخلي عن السلة بنسبة 45%، نظام بحث وفلاتر ذكية فورية للمنتجات، وتكامل سحابي مع شركات الشحن والتوصيل المحلي والدولي مع تتبع الشحنات المباشر.',
    fullDetailsEn: 'Engineered a seamless conversion funnel with smart search filters, multi-currency pricing, and automated real-time shipping tracking.',
    challenge: 'المتجر السابق كان يعاني من معدل ارتداد وتخلي عن سلة المشتريات تجاوز 68% نتيجة تعقيد خطوات الدفع وبطء تحميل صور المنتجات عالية الدقة وغياب حلول التقسيط المالي كـ تمارا وتابي.',
    challengeEn: 'The legacy store suffered from a 68% cart abandonment rate due to cumbersome 5-step checkout, sluggish high-res product loading, and missing BNPL options (Tabby & Tamara).',
    solution: 'أعدنا هندسة مسار الشراء بالكامل بنظام 1-Click Checkout، وضغطنا الأصول الرقمية بتقنية WebP السحابية، وربطنا حلول أبل باي ومدى وتمارا وتابي مع نظام استرجاع آلي للسلات المتروكة عبر الواتساب.',
    solutionEn: 'Engineered a frictionless 1-Click checkout funnel integrated with Apple Pay, Mada, Tamara, and Tabby, combined with automated WhatsApp abandoned cart recovery.',
    imageUrl: '/assets/project_elite_ecommerce.jpg',
    tags: ['متاجر إلكترونية', 'بوابات دفع', 'UI/UX', 'أبل باي', 'تجارة إلكترونية'],
    tagsEn: ['E-Commerce', 'Payment Gateways', 'UI/UX', 'Apple Pay', 'E-Commerce Scaling'],
    results: [
      { label: 'ارتفاع معدل التحويل (CR)', labelEn: 'Conversion Rate (CR) Jump', value: '+68%' },
      { label: 'مبيعات موسم الإطلاق', labelEn: 'Launch Season Revenue', value: '+1.8M SAR' },
      { label: 'انخفاض التخلي عن السلة', labelEn: 'Cart Abandonment Drop', value: '-45%' }
    ],
    deliverables: [
      'متجر إلكتروني فاخر عالي التحويل (High-Converting Storefront)',
      'ربط بوابات الدفع الإلكتروني (Apple Pay, Mada, Visa, Tabby, Tamara)',
      'تكامل شركات الشحن الآلي وتتبع الشحنات بالرسائل النصية',
      'نظام ذكي لاسترجاع السلات المتروكة تلقائياً بالواتساب',
      'لوحة تحكم لإدارة المنتجات والمخزون والعروض الترويجية بنقرة واحدة'
    ],
    deliverablesEn: [
      'Luxury high-conversion responsive storefront optimized for mobile',
      'Complete payment gateway suite (Apple Pay, Mada, Tabby, Tamara)',
      'Automated shipping carrier APIs & SMS tracking notifications',
      'Automated WhatsApp abandoned cart recovery workflows',
      '1-Click cloud catalog, inventory, and promotional discount control dashboard'
    ],
    processSteps: [
      {
        step: '01',
        title: 'تدقيق قمع المبيعات وسلوك المشترين',
        titleEn: 'Sales Funnel Audit & CRO Analysis',
        desc: 'تحليل نقاط تسرب العملاء في المتجر القديم وبناء نموذج شراء فوري من صفحة المنتج مباشرة.',
        descEn: 'Analyzing cart drop-off triggers and architecting direct 1-click product purchase funnels.'
      },
      {
        step: '02',
        title: 'تصميم تجربة التسوق الفاخرة (Luxury UX)',
        titleEn: 'Luxury Shopping UI/UX',
        desc: 'ابتكار واجهات مستخدم مخصصة للمنتجات الفاخرة تدعم العرض التفاعلي السريع للصور والفيديوهات.',
        descEn: 'Designing a bespoke luxury e-commerce interface with instant video/image previews.'
      },
      {
        step: '03',
        title: 'الربط التقني وبوابات الدفع والشحن',
        titleEn: 'Payment Gateway & Logistics APIs',
        desc: 'ربط بوابات الدفع ومدى وتمارا وسيرفرات الشحن وربط بيكسل التحويلات الإعلانية.',
        descEn: 'Integrating Apple Pay, Mada, Tabby, Tamara, automated courier APIs, and Conversions API.'
      },
      {
        step: '04',
        title: 'إطلاق موسم المبيعات والمراقبة اللحظية',
        titleEn: 'Launch Sprint & Real-Time Tracking',
        desc: 'تدشين المتجر مع إطلاق حملات إعلانية ممولة ومراقبة معدل التحويل وسرعة الدفع اللحظية.',
        descEn: 'Production launch aligned with paid ad sprints, live ROAS monitoring, and checkout speed optimization.'
      }
    ],
    techStack: ['React', 'Tailwind CSS', 'Salla API', 'Zid API', 'Shopify Plus', 'Apple Pay SDK', 'Meta Conversions API', 'TikTok Pixel'],
    testimonial: {
      name: 'نورة السبيعي',
      nameEn: 'Noura Al-Subaie',
      role: 'مديرة العمليات والتجارة | إيليت لاكشري',
      roleEn: 'Head of Operations | Elite Luxury',
      avatar: '/assets/avatar_3.jpg',
      rating: 5,
      quote: 'حققنا مبيعات تجاوزت 1.8 مليون ريال في موسم الإطلاق فقط! انخفض التخلي عن السلة بنسبة 45% بفضل سلاسة الدفع بالـ Apple Pay وتمارا وسرعة التصفح الفائقة.',
      quoteEn: 'We generated 1.8M+ SAR during launch season alone. Cart abandonment plummeted by 45% thanks to frictionless 1-Click payments and lightning speed.'
    }
  },
  {
    id: 4,
    slug: 'sahab-tech-performance-optimization',
    title: 'إعادة هندسة وتسريع الأداء الشامل لمنصة "سحاب تك" السحابية',
    titleEn: 'Full Cloud Architecture & Performance Optimization for Sahab Tech',
    category: 'تصميم وتطوير وتحسين المواقع',
    categoryEn: 'Cloud Optimization & Core Web Vitals',
    categoryKey: 'web',
    client: 'شركة سحاب تك للحلول الرقمية',
    clientEn: 'Sahab Tech Digital Solutions',
    year: '2025',
    completionDate: 'أبريل 2025',
    completionDateEn: 'April 2025',
    duration: '12 يوم عمل',
    durationEn: '12 Business Days',
    description: 'مشروع ترقية شامل للأداء البرمجي وسرعة التصفح والسيو؛ نقل تقييم سرعة الموقع على Google PageSpeed من 42% إلى 98% مع تصدر الكلمات المفتاحية التنافسية.',
    descriptionEn: 'Full architectural overhaul elevating Google PageSpeed scores from 42% to 98% while dominating competitive SaaS keywords on Google search.',
    fullDetails: 'إعادة هيكلة الكود البرمجي وضغط الأصول الرقمية وتقليل حجم حزم JavaScript بنسبة 65%، تفعيل التخزين المؤقت المتقدم (Advanced Edge Caching)، وإعادة بناء بنية الـ SEO الداخلي وإصلاح كافة أخطاء الـ Core Web Vitals.',
    fullDetailsEn: 'Refactored frontend bundles, enabled Cloudflare edge caching, resolved all LCP/CLS errors, and executed structured Technical SEO markup.',
    challenge: 'كانت المنصة تعاني من بطء شديد في أوقات التحميل (تقييم 42% على Google)، وتراجع تصنيف الكلمات المفتاحية في محركات البحث، وخسارة عملاء جدد بسبب التأخير في فتح لوحة التحكم.',
    challengeEn: 'Poor Google PageSpeed scores (42%), severe ranking drops on SaaS keywords, and heavy dashboard latency frustrating active users.',
    solution: 'قمنا بإعادة هيكلة شاملة للكود البرمجي، وضغط الأصول الرقمية لتقنية WebP، وتفعيل شبكة التوزيع السحابية Cloudflare Enterprise Edge Caching وإصلاح كافة أخطاء Core Web Vitals.',
    solutionEn: 'Complete code refactoring, image WebP compression, Cloudflare Edge caching, and resolution of all Core Web Vitals (LCP, CLS, INP).',
    imageUrl: '/assets/project_sahab_cloud.jpg',
    tags: ['تحسين سرعة', 'Core Web Vitals', 'SEO تقني', 'تسريع المواقع', 'أداء'],
    tagsEn: ['Speed Optimization', 'Core Web Vitals', 'Technical SEO', 'Cloudflare', 'Performance'],
    results: [
      { label: 'نتيجة Google PageSpeed', labelEn: 'Google PageSpeed Score', value: '98/100' },
      { label: 'نمو الزيارات المجانية', labelEn: 'Organic Traffic Surge', value: '+310%' },
      { label: 'انخفاض معدل الارتداد', labelEn: 'Bounce Rate Reduction', value: '-52%' }
    ],
    deliverables: [
      'رفع تقييم Google PageSpeed للأجهزة المحمولة والديسكتوب من 42% إلى 98%',
      'تخفيض زمن استجابة السيرفر (TTFB) إلى أقل من 0.3 ثانية',
      'إصلاح شامل لمؤشرات LCP و CLS و INP ومطابقة معايير Google الرسمية',
      'تهيئة السيو الفني (Technical SEO) وهيكلة بيانات Schema.org',
      'إعداد حماية سحابية مشددة وجدار حماية WAF ضد هجمات حجب الخدمة'
    ],
    deliverablesEn: [
      'Elevated Google PageSpeed mobile/desktop score from 42% to 98%',
      'Slashed server Time to First Byte (TTFB) to sub-0.3s',
      'Resolved all LCP, CLS, and INP metrics meeting Google Core Web Vitals benchmarks',
      'Comprehensive Technical SEO & structured Schema.org markup overhaul',
      'Enterprise Cloudflare DDoS & WAF security hardening configuration'
    ],
    processSteps: [
      {
        step: '01',
        title: 'التدقيق الفني المعمق للأداء',
        titleEn: 'Deep Performance & Bundle Audit',
        desc: 'تحليل أوقات الاستجابة، حزم الجافاسكريبت غير المستخدمة، وعوائق الرندرة الأولية (Render-Blocking).',
        descEn: 'Analyzing network latency, unused JS chunks, and critical rendering path bottlenecks.'
      },
      {
        step: '02',
        title: 'إعادة هيكلة وتحسين الكود',
        titleEn: 'Code Splitting & Bundle Minification',
        desc: 'تقسيم الحزم البرمجية (Code-Splitting)، ضغط الصور إلى WebP، وتأجيل تحميل السكربتات غير الضرورية.',
        descEn: 'Executing modular code splitting, next-gen WebP image compression, and async script deferral.'
      },
      {
        step: '03',
        title: 'تفعيل التخزين المؤقت وحماية الـ Edge',
        titleEn: 'Edge Caching & Cloudflare WAF',
        desc: 'تطبيق استراتيجيات التخزين المؤقت الذكي عبر شبكة Cloudflare العالمية وتأمين البنية التحتية.',
        descEn: 'Deploying smart edge caching rules across Cloudflare CDN nodes with strict WAF filters.'
      },
      {
        step: '04',
        title: 'التحقق وإعادة الفهرسة في Google',
        titleEn: 'Verification & Google Re-indexing',
        desc: 'إعادة تقديم خرائط الموقع في Google Search Console والتأكد من تصدر الكلمات التنافسية.',
        descEn: 'Submitting updated XML sitemaps to Search Console and validating ranking surges.'
      }
    ],
    techStack: ['Next.js', 'Node.js', 'Cloudflare Enterprise', 'Redis Caching', 'WebP Engine', 'Google Lighthouse CLI'],
    testimonial: {
      name: 'طارق الشمري',
      nameEn: 'Tariq Al-Shammari',
      role: 'الرئيس التقني (CTO) | سحاب تك',
      roleEn: 'Chief Technology Officer | Sahab Tech',
      avatar: '/assets/avatar_2.jpg',
      rating: 5,
      quote: 'فريق كرو فايف يمتلك خبرة هندسية عميقة في تفاصيل الأداء البرمجي. النتيجة كانت فورية: تقييم 98% على Google ومضاعفة الزيارات العضوية 3 مرات وانخفاض الارتداد بأكثر من 50%.',
      quoteEn: 'Crew5 demonstrated world-class frontend engineering. The results were instantaneous: 98% Lighthouse score, 3x organic traffic growth, and over 50% bounce rate reduction.'
    }
  },
  {
    id: 5,
    slug: 'rawasi-smart-realestate',
    title: 'تصميم وبناء منصة "رواسي العقارية" للوساطة والخرائط التفاعلية',
    titleEn: 'Rawasi Smart Real Estate Platform & Interactive Mapping',
    category: 'تصميم وتطوير المواقع والمنصات',
    categoryEn: 'PropTech Web Platform & Interactive GIS',
    categoryKey: 'web',
    client: 'شركة رواسي للاستثمار والتطوير العقاري',
    clientEn: 'Rawasi Real Estate Investment Co.',
    year: '2025',
    completionDate: 'مايو 2025',
    completionDateEn: 'May 2025',
    duration: '30 يوم عمل',
    durationEn: '30 Business Days',
    description: 'منصة عقارية ذكية متطورة تدعم البحث الجغرافي بالخرائط التفاعلية، الجولات الافتراضية 3D للعقارات، وحاسبة التمويل العقاري والتواصل المباشر مع المستشارين.',
    descriptionEn: 'Interactive PropTech portal featuring GIS map search, 3D virtual walkthroughs, mortgage calculators, and real-time broker consultation scheduling.',
    fullDetails: 'تصميم تجربة استكشاف عقاري غامرة وسهلة الاستخدام، ربط خرائط تفاعلية دقيقة مع فلاتر الأسعار والمساحات والمخططات السكنية، ونظام إدارة العقارات وعروض البيع والإيجار ولوحة تحكم متقدمة للوسطاء.',
    fullDetailsEn: 'Designed an immersive real estate discovery portal with custom vector GIS layers, 3D property models, and CRM broker lead distribution.',
    challenge: 'صعوبة استكشاف المخططات العقارية والمشاريع السكنية الكبرى عبر القوائم التقليدية، وحاجة المستثمرين والمشترين إلى حاسبة تمويل دقيقة وجولات ثلاثية الأبعاد قبل المعاينة الميدانية.',
    challengeEn: 'Outdated traditional listings failed to convey large residential masterplans, lacking GIS filtering, 3D tours, and instant mortgage calculations for high-net-worth buyers.',
    solution: 'قمنا ببناء منصة PropTech رائدة مدعومة بالخرائط التفاعلية، فلاتر مكانية دقيقة، محرك حاسبة تمويل عقاري بنكي فوري، وعارض جولات افتراضية 3D ولوحة تحكم لإدارة الصفقات العقارية.',
    solutionEn: 'Built an advanced PropTech portal featuring interactive vector GIS map layers, spatial pricing filters, 3D virtual walkthroughs, and lead CRM distribution.',
    imageUrl: '/assets/project_branding_nokhabat.jpg',
    tags: ['منصات عقارية', 'خرائط تفاعلية', 'تطوير ويب', 'حاسبة تمويل', 'UI/UX'],
    tagsEn: ['PropTech', 'Interactive Maps', 'Web Engineering', 'Mortgage Calc', 'UI/UX'],
    results: [
      { label: 'مستخدمين نشطين شهرياً', labelEn: 'Monthly Active Users', value: '+22,000' },
      { label: 'صفقات عقارية مكتملة', labelEn: 'Closed Property Deals', value: '+180 Deals' },
      { label: 'زمن بقاء الزائر', labelEn: 'Average Session Time', value: '+4.5 Mins' }
    ],
    deliverables: [
      'منصة عقارية تفاعلية بالخرائط والبحث المكاني الذكي',
      'محرك حاسبة التمويل العقاري والأقساط البنكية التفاعلي',
      'عارض الجولات الافتراضية ثلاثية الأبعاد (3D Virtual Tours)',
      'بوابة للوسطاء والمطورين لإدراج العقارات وإدارة عروض البيع',
      'تكامل مع إشعارات الواتساب وحجز مواعيد المعاينة الميدانية'
    ],
    deliverablesEn: [
      'Interactive GIS map-based property search engine with vector spatial filters',
      'Real-time bank mortgage & installment calculator engine',
      '3D virtual walkthrough viewer integration for residential units',
      'Broker and developer portal for listing and managing property portfolios',
      'Automated WhatsApp appointment booking for on-site physical viewings'
    ],
    processSteps: [
      {
        step: '01',
        title: 'هندسة تجربة الاستكشاف العقاري',
        titleEn: 'PropTech Discovery & Information Architecture',
        desc: 'رسم رحلة المشتري والمستثمر وتصميم فلاتر البحث حسب الأحياء والمشاريع والأسعار.',
        descEn: 'Mapping buyer/investor workflows and structuring spatial search filters.'
      },
      {
        step: '02',
        title: 'تصميم الواجهات الجغرافية (GIS UI/UX)',
        titleEn: 'Interactive Map UI/UX Design',
        desc: 'تصميم واجهات خرائط تفاعلية سلسة وسريعة الاستجابة على الجوال والديسكتوب.',
        descEn: 'Designing fluid, modern interactive mapping interfaces optimized for mobile touch.'
      },
      {
        step: '03',
        title: 'التطوير البرمجي وتكامل الـ 3D',
        titleEn: 'GIS Engineering & 3D Integration',
        desc: 'برمجة طبقات الخرائط وحاسبة التمويل ودمج جولات الـ 3D الافتراضية للعقارات.',
        descEn: 'Developing vector map layers, dynamic loan calculators, and 3D virtual tour engines.'
      },
      {
        step: '04',
        title: 'التدشين وربط بوابات الوسطاء',
        titleEn: 'Deployment & Broker CRM Setup',
        desc: 'إطلاق المنصة رسمياً وتدريب فريق المبيعات والوسطاء على لوحة إدارة الصفقات.',
        descEn: 'Production deployment and onboarding sales advisors on deal management tools.'
      }
    ],
    techStack: ['React 19', 'Mapbox GL', 'Tailwind CSS', 'Node.js Express', 'Three.js 3D', 'PostgreSQL', 'Cloudflare'],
    testimonial: {
      name: 'فيصل بن حمود',
      nameEn: 'Faisal Bin Homoud',
      role: 'نائب رئيس مجلس الإدارة | شركة رواسي العقارية',
      roleEn: 'VP of Board | Rawasi Real Estate',
      avatar: '/assets/avatar_1.jpg',
      rating: 5,
      quote: 'منصة رواسي أحدثت نقلة نوعية في تجربة عملائنا في البحث والشراء، وأتممنا أكثر من 180 صفقة عقارية عبر المنصة في أول 6 أشهر بفضل الجولات الافتراضية وحاسبة التمويل.',
      quoteEn: 'Rawasi transformed our buyer experience completely. We facilitated over 180 successful property transactions in the first 6 months alone thanks to 3D tours and mortgage tools.'
    }
  },
  {
    id: 6,
    slug: 'lumina-cafe-branding-and-campaign',
    title: 'بناء الهوية البصرية والحملة الإعلانية لـ "سلسلة مقاهي لومينا"',
    titleEn: 'Brand Identity & Launch Visual Campaign for Lumina Specialty Coffee',
    category: 'بناء الهوية والتسويق الرقمي والإنتاج المرئي',
    categoryEn: 'Brand Architecture, Packaging & Video Production',
    categoryKey: 'branding',
    client: 'Lumina Specialty Coffee Chain',
    clientEn: 'Lumina Specialty Coffee Chain',
    year: '2025',
    completionDate: 'يونيو 2025',
    completionDateEn: 'June 2025',
    duration: '22 يوم عمل',
    durationEn: '22 Business Days',
    description: 'مشروع متكامل شمل تصميم الهوية البصرية الفاخرة وتطبيقات التغليف وعلب القهوة، إنتاج إعلان سينمائي 4K للافتتاح، وإدارة حملة إعلانات ممولة حققت حضوراً قياسياً.',
    descriptionEn: 'Full creative sprint: luxury packaging & brand guidelines, 4K opening commercial, and viral launch campaign driving sold-out branches in week one.',
    fullDetails: 'ابتكرنا هوية تعكس الأصالة والذوق الرفيع، صممنا كامل عناصر التغليف والأكواب المطبوعة واليونيفورم وقوائم الطعام التفاعلية، وصورنا إعلاناً سينمائياً في استوديوهاتنا الخاصة أطلق عبر تيك توك وسناب شات محققاً أكثر من 1.2 مليون مشاهدة.',
    fullDetailsEn: 'Designed bespoke typography, sustainable packaging suites, and produced an atmospheric 4K commercial driving over 1.2M views on social media.',
    challenge: 'دخول سوق المقاهي المختصة شديد التنافسية في الرياض يتطلب هوية بصرية ساحرة ومتميزة وتغليف فاخر وحملة إطلاق سينمائية تحدث تأثيراً فيروسياً وتجذب آلاف الزوار من اليوم الأول.',
    challengeEn: 'Entering the saturated specialty coffee market in Riyadh required an iconic visual identity, bespoke packaging, and a viral launch video campaign attracting thousands of guests from day one.',
    solution: 'صممنا هوية بصرية راقية وتغليف مستدام لعلب وأكواب القهوة، وأنتجنا إعلاناً سينمائياً بدقة 4K في استوديوهات كرو فايف، وأطلقنا حملة إعلانية واسعة عبر TikTok و Snapchat و Instagram.',
    solutionEn: 'Engineered a prestigious brand architecture with eco-luxury packaging, produced a cinematic 4K commercial, and executed viral TikTok & Snapchat ad campaigns.',
    imageUrl: '/assets/project_lumina_coffee.jpg',
    tags: ['هوية بصرية', 'تصميم تغليف', 'انتاج سينمائي', 'حملات اعلانية', 'براندنج'],
    tagsEn: ['Brand Identity', 'Packaging Design', 'Cinematic Video', 'Paid Campaigns', 'Branding'],
    results: [
      { label: 'مشاهدات الحملة الإعلانية', labelEn: 'Total Campaign Views', value: '+1.2M Views' },
      { label: 'حضور أسبوع الافتتاح', labelEn: 'Opening Week Footfall', value: '+3,500 Guests' },
      { label: 'عائد الإنفاق الإعلاني (ROAS)', labelEn: 'Campaign ROAS', value: '5.2x' }
    ],
    deliverables: [
      'دليل الهوية البصرية الكامل (Brand Guidelines Manual) وتطبيقات الشعار',
      'تصاميم علب وأكياس البن والأكواب المطبوعة واليونيفورم واللوحات الإعلانية',
      'إعلان سينمائي ترويجي 4K مع سيناريو وتعديل ألوان وموسيقى تصويرية',
      'إدارة الحملة الإعلانية الممولة على TikTok و Snapchat و Instagram',
      'قوالب وتصاميم منصات التواصل وقوائم الطعام التفاعلية (QR Code)'
    ],
    deliverablesEn: [
      'Comprehensive Brand Guidelines Manual & typography clear-space rules',
      'Sustainable coffee bean boxes, printed cups, barista uniforms & signage suites',
      '4K cinematic commercial with custom score, scriptwriting, and color grading',
      'Targeted viral TikTok, Snapchat & Instagram performance ad campaigns',
      'Editable social media design kit & interactive QR code digital menus'
    ],
    processSteps: [
      {
        step: '01',
        title: 'استراتيجية العلامة والتموضع السوقي',
        titleEn: 'Brand Strategy & Market Positioning',
        desc: 'تحديد شخصية البراند، دراسة عشاق القهوة المختصة، وصياغة الرسائل البصرية الجذابة.',
        descEn: 'Defining brand persona, specialty coffee market benchmarks, and visual positioning.'
      },
      {
        step: '02',
        title: 'بناء الشعار وتطبيقات التغليف الفاخر',
        titleEn: 'Logo Creation & Packaging Design',
        desc: 'تصميم الشعار التيبوغرافي واختيار لوحة الألوان والخامات المستدامة للأكواب والعلب.',
        descEn: 'Designing bespoke typography, color palettes, and sustainable cup/box packaging.'
      },
      {
        step: '03',
        title: 'الإنتاج السينمائي والمونتاج 4K',
        titleEn: 'Cinematic Production & 4K Editing',
        desc: 'تصوير الإعلان بكاميرات سينمائية احترافية، وتعديل ألوان مخصص وهندسة صوتية ساحرة.',
        descEn: 'Filming on broadcast 4K cinema cameras with custom grading and sound design.'
      },
      {
        step: '04',
        title: 'إطلاق الحملة الإعلانية ومراقبة النتائج',
        titleEn: 'Campaign Launch & Viral Reach',
        desc: 'إطلاق الإعلانات باستهداف جغرافي دقيق لمدينة الرياض ومتابعة الحضور اليومي للمقهى.',
        descEn: 'Launching targeted Riyadh ad sprints and tracking footfall conversion metrics.'
      }
    ],
    techStack: ['Adobe Creative Cloud', 'Figma', 'DaVinci Resolve Studio', 'RED Digital Cinema 4K', 'Meta Ads Manager', 'TikTok Ads'],
    testimonial: {
      name: 'تركي الراجحي',
      nameEn: 'Turki Al-Rajhi',
      role: 'الشريك المؤسس | مقاهي لومينا المختصة',
      roleEn: 'Co-Founder | Lumina Specialty Coffee',
      avatar: '/assets/avatar_2.jpg',
      rating: 5,
      quote: 'الإعلان التجاري والهوية البصرية التي صممتها كرو فايف جعلت فروعنا مكتظة بالكامل في أسبوع الافتتاح، وتجاوزت مشاهدات الحملة 1.2 مليون مشاهدة وحققنا عائداً إعلانياً 5.2x!',
      quoteEn: 'The cinematic video and brand design by Crew5 created unprecedented opening week footfall, generating over 1.2M targeted views with a 5.2x ROAS!'
    }
  }
];
