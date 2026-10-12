-- =============================================
-- Crew5 Agency Database Schema & Initial Seed
-- Compatible with MySQL (5.7+, 8.0+) & SQLite 3
-- =============================================

CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(191) NOT NULL,
    role VARCHAR(100) DEFAULT 'Super Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    category_key VARCHAR(100) NOT NULL,
    client VARCHAR(191) DEFAULT NULL,
    year VARCHAR(20) DEFAULT '2025',
    description TEXT NOT NULL,
    full_details TEXT DEFAULT NULL,
    image_url TEXT NOT NULL,
    tags TEXT DEFAULT '[]',
    results TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '4 دقائق قراءة',
    date VARCHAR(50) NOT NULL,
    author_name VARCHAR(100) DEFAULT 'محمد أحمد',
    author_role VARCHAR(100) DEFAULT 'خبير استراتيجيات التسويق',
    author_avatar TEXT DEFAULT '/assets/avatar_2.jpg',
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT DEFAULT '[]',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_json TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(100) DEFAULT NULL,
    service VARCHAR(100) DEFAULT 'عام',
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(191) NOT NULL,
    role VARCHAR(191) DEFAULT NULL,
    review TEXT NOT NULL,
    avatar TEXT DEFAULT '/assets/avatar_1.jpg',
    rating INTEGER DEFAULT 5,
    project VARCHAR(191) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(191) NOT NULL,
    role VARCHAR(191) NOT NULL,
    initials VARCHAR(10) DEFAULT 'CR',
    bio TEXT DEFAULT NULL,
    avatar TEXT DEFAULT '/assets/avatar_2.jpg',
    skills TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    seo_description TEXT DEFAULT NULL,
    blocks TEXT NOT NULL DEFAULT '[]',
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Initial Seed Data
-- =============================================

INSERT OR IGNORE INTO admins (id, email, password, name, role) VALUES 
(1, 'admin@crew5.agency', 'admin123', 'مدير النظام', 'Super Admin');

INSERT OR IGNORE INTO settings (setting_key, setting_value) VALUES 
('site_config', '{"name":"Crew5 Agency","tagline":"نصنع الإبداع الرقمي","description":"وكالة متخصصة في تحويل الأفكار إلى تجارب رقمية مبتكرة. من التصميم إلى التسويق، وصناعة المحتوى، وتطوير المواقع والمنصات السحابية، نحن شريكك الاستراتيجي في النمو وتحقيق نتائج استثنائية.","contact":{"email":"contact@crew5.agency","phone":"+966 123 456 789","whatsapp":"+966512345678","whatsappDisplay":"+966 51 234 5678","address":"الرياض، المملكة العربية السعودية"},"socialLinks":{"linkedin":"https://linkedin.com/company/crew5agency","instagram":"https://instagram.com/crew5agency","twitter":"https://x.com/crew5agency","facebook":"https://facebook.com/crew5agency"},"stats":[{"value":"+120","label":"مشروع منجز"},{"value":"+50","label":"عميل يثق بنا"},{"value":"99%","label":"نسبة رضا العملاء"},{"value":"+5","label":"سنوات من الخبرة"}]}');

-- Real & Showcase Projects
INSERT OR REPLACE INTO projects (id, slug, title, category, category_key, client, year, description, full_details, image_url, tags, results) VALUES 
(1, 'cairo-cosmo-center', 'تصميم وتطوير المنصة الرقمية لـ "مركز القاهرة الطبي لجراحات التجميل والليزر"', 'تصميم وتطوير المواقع والحلول الطبية', 'web', 'Cairo Cosmo Center (مركز القاهرة الطبي)', '2025', 'منصة رقمية طبية متقدمة وفائقة السرعة لحجز مواعيد واستشارات التجميل والليزر والعناية بالبشرة، مع إدارة فروع المركز الخمسة ونظام متقدم لتتبع التحويلات الإعلانية وتهيئة السيو الطبي الشامل.', 'تضمن المشروع تصميم واجهة مستخدم فاخرة وعصرية متوافقة مع أجهزة الجوال، بناء نظام حجز مواعيد تفاعلي وإدارة الفروع الخمسة (شيراتون، الدقي، 6 أكتوبر، المنصورة، شبرا)، تطبيق استراتيجية تحسين محركات البحث الطبية (Medical SEO) مع ترميز Schema.org الطبي المتقدم، وربط Google Tag Manager و Meta Pixel لتتبع التحويلات بدقة.', '/assets/project_beauty_center.jpg', '["تطوير مواقع", "بيوتي سنتر", "حجز مواعيد", "Medical SEO", "React", "UI/UX"]', '[{"label":"ارتفاع الحجوزات المؤكدة","value":"+280%"},{"label":"زمن تحميل الصفحة","value":"0.7 ثانية"},{"label":"تصدر نتائج Google","value":"+45 كلمة طبية"}]'),
(2, 'hedab-al-khaleej-contracting', 'المنصة المؤسسية لـ "شركة هضاب الخليج للمقاولات العامة" والبنية التحتية', 'تصميم وتطوير المنصات المؤسسية وتحسين الأداء', 'web', 'شركة هضاب الخليج العربي للمقاولات العامة', '2025', 'منصة رقمية مؤسسية عالية الأداء لعرض مشاريع البنية التحتية وسفلتة الطرق وتصريف السيول ومصانع حواجز نيوجيرسي الخرسانية والاعتمادات السيادية في المملكة العربية السعودية.', 'شمل المشروع تطوير بنية برمجية فائقة السرعة بمعمارية React + Vite و PHP Backend داعمة للغتين (العربية والإنجليزية)، تحقيق أعلى مؤشرات Core Web Vitals مع Instant First Paint والتحميل اللحظي، تصميم هوية رقمية تعكس الرصانة الهندسية والقدرات التنفيذية، وتهيئة محركات البحث المتقدمة للمناقصات والمشاريع الحكومية والخاصة.', '/assets/project_hedabkh.webp', '["مواقع شركات", "مقاولات وبنية تحتية", "أداء وسرعة", "SEO", "React + PHP", "ثنائي اللغة"]', '[{"label":"تقييم السرعة (Lighthouse)","value":"99/100"},{"label":"زيادة استفسارات المناقصات","value":"+190%"},{"label":"سرعة الاستجابة اللحظية","value":"0.5 ثانية"}]'),
(3, 'elite-luxury-ecommerce', 'تصميم وتطوير متجر "إيليت كولكشن" للمنتجات الفاخرة والتجارة الإلكترونية', 'تصميم وتطوير المواقع والمتاجر', 'web', 'إيليت لاكشري للتجارة الإلكترونية', '2025', 'متجر إلكتروني عالي التحويل (High-Converting E-Commerce) بتجربة تسوق سلسة بنقرة واحدة، وتكامل كامل مع بوابات الدفع الإلكتروني (Apple Pay, Mada, Tamara, Tabby) وإدارة المخزون السحابي.', 'قمنا بهندسة واجهة شراء سريعة (1-Click Checkout) تخفض معدل التخلي عن السلة بنسبة 45%، نظام بحث وفلاتر ذكية فورية للمنتجات، وتكامل سحابي مع شركات الشحن والتوصيل المحلي والدولي مع تتبع الشحنات المباشر.', '/assets/blog_brand_identity.jpg', '["متاجر إلكترونية", "بوابات دفع", "UI/UX", "أبل باي", "تجارة إلكترونية"]', '[{"label":"ارتفاع معدل التحويل (CR)","value":"+68%"},{"label":"مبيعات موسم الإطلاق","value":"+1.8M ريال"},{"label":"انخفاض التخلي عن السلة","value":"45%"}]'),
(4, 'sahab-tech-performance-optimization', 'إعادة هندسة وتسريع الأداء الشامل لمنصة "سحاب تك" السحابية', 'تصميم وتطوير وتحسين المواقع', 'web', 'شركة سحاب تك للحلول الرقمية', '2025', 'مشروع ترقية شامل للأداء البرمجي وسرعة التصفح والسيو؛ نقل تقييم سرعة الموقع على Google PageSpeed من 42% إلى 98% مع تصدر الكلمات المفتاحية التنافسية.', 'إعادة هيكلة الكود البرمجي وضغط الأصول الرقمية وتقليل حجم حزم JavaScript بنسبة 65%، تفعيل التخزين المؤقت المتقدم (Advanced Edge Caching)، وإعادة بناء بنية الـ SEO الداخلي وإصلاح كافة أخطاء الـ Core Web Vitals.', '/assets/blog_digital_marketing_2025.jpg', '["تحسين سرعة", "Core Web Vitals", "SEO تقني", "تسريع المواقع", "أداء"]', '[{"label":"نتيجة Google PageSpeed","value":"98/100"},{"label":"نمو الزيارات المجانية","value":"+310%"},{"label":"انخفاض معدل الارتداد","value":"52%"}]'),
(5, 'rawasi-smart-realestate', 'تصميم وبناء منصة "رواسي العقارية" للوساطة والخرائط التفاعلية', 'تصميم وتطوير المواقع والمنصات', 'web', 'شركة رواسي للاستثمار والتطوير العقاري', '2025', 'منصة عقارية ذكية متطورة تدعم البحث الجغرافي بالخرائط التفاعلية، الجولات الافتراضية 3D للعقارات، وحاسبة التمويل العقاري والتواصل المباشر مع المستشارين.', 'تصميم تجربة استكشاف عقاري غامرة وسهلة الاستخدام، ربط خرائط تفاعلية دقيقة مع فلاتر الأسعار والمساحات والمخططات السكنية، ونظام إدارة العقارات وعروض البيع والإيجار ولوحة تحكم متقدمة للوسطاء.', '/assets/project_branding_nokhabat.jpg', '["منصات عقارية", "خرائط تفاعلية", "تطوير ويب", "حاسبة تمويل", "UI/UX"]', '[{"label":"مستخدمين نشطين شهرياً","value":"+22,000"},{"label":"صفقات عقارية مكتملة","value":"+180 صفقة"},{"label":"زمن بقاء الزائر","value":"+4.5 دقائق"}]'),
(6, 'nokhabat-al-abaqira', 'بناء الهوية البصرية لشركة "نخبة العباقرة" للحلول التقنية', 'بناء الهوية والتصميم', 'branding', 'شركة نخبة العباقرة للحلول التقنية', '2025', 'عملنا على تصميم هوية بصرية كاملة تعكس الابتكار والجودة، بدءًا من الشعار وحتى المواد التسويقية، مع التركيز على الطابع الهندسي الحديث.', 'تضمن المشروع دراسة شاملة للسوق المحلي والمنافسين، تلاها ابتكار مفهوم الشعار والخطوط المخصصة، وإعداد دليل أسلوب شامل، بالإضافة إلى تصاميم المطبوعات والقوالب الرقمية.', '/assets/project_branding_nokhabat.jpg', '["هوية بصرية", "تصميم شعار", "دليل الهوية", "UI/UX"]', '[{"label":"زيادة تميز العلامة","value":"+85%"},{"label":"قوالب تسويقية منجزة","value":"+40"},{"label":"مدة التنفيذ","value":"3 أسابيع"}]'),
(7, 'luxury-coffee-production', 'إنتاج محتوى مرئي وإعلاني لعلامة "أرابيكا" للقهوة المختصة', 'الإنتاج المرئي والمونتاج', 'video', 'محامص أرابيكا الفاخرة', '2025', 'جلسات تصوير احترافية ومونتاج فيديوهات سينمائية قصيرة تبرز أدق تفاصيل تحضير القهوة بأسلوب جذاب يسلب الأنظار.', 'تنفيذ تصوير سينمائي في الموقع بتقنية 4K مع استخدام إضاءة درامية وتوزيع صوتي مخصص، وإنتاج سلسلة فيديوهات Reels ساهمت في مضاعفة المبيعات.', '/assets/blog_creative_content.jpg', '["تصوير سينمائي", "Reels", "إنتاج مرئي", "صوت ومؤثرات"]', '[{"label":"مبيعات المتجر","value":"+210%"},{"label":"وصول المتابعين","value":"+1.1M"},{"label":"معدل الإكمال","value":"78%"}]'),
(8, 'saudi-national-day-95', 'حملة تسويقية لليوم الوطني السعودي 95', 'التسويق عبر وسائل التواصل', 'marketing', 'مجموعة تجارية رائدة', '2025', 'قمنا بإنشاء وإدارة حملة إعلانية ومحتوى إبداعي متكامل على منصات التواصل الاجتماعي بمناسبة اليوم الوطني السعودي 95.', 'شملت الحملة إنتاج 6 مقاطع فيديو موشن جرافيك وتصوير واقعي، مع إطلاق حملات إعلانية مستهدفة على منصات TikTok وInstagram وX، إلى جانب مسابقات تفاعلية.', '/assets/project_national_day.jpg', '["إدارة حملات", "موشن جرافيك", "فيديو", "سوشيال ميديا"]', '[{"label":"مشاهدات الفيديو","value":"+2.5M"},{"label":"معدل التفاعل","value":"+320%"},{"label":"عملاء جدد","value":"+1,200"}]');

INSERT OR IGNORE INTO blogs (id, slug, title, category, read_time, date, author_name, author_role, author_avatar, excerpt, content, image_url, tags, views) VALUES 
(1, 'digital-marketing-importance-2025', 'أهمية التسويق الرقمي في 2025: دليلك للبقاء والنمو', 'التسويق الرقمي', '4 دقائق قراءة', '١ أكتوبر ٢٠٢٥', 'محمد أحمد', 'خبير استراتيجيات التسويق الرقمي', '/assets/avatar_2.jpg', 'استكشف لماذا أصبح التسويق الرقمي ضرورة لا غنى عنها لنمو أي عمل تجاري في العصر الحديث وكيف يمكنك الاستفادة من الذكاء الاصطناعي وصناعة الفيديو.', '<p class="lead text-lg font-medium text-slate-200 mb-6">في عصر يشهد تحولات تقنية متسارعة، لم يعد التواجد الرقمي مجرد خيار تكميلي للشركات، بل أصبح العمود الفقري الذي يحدد مدى قدرة العلامة التجارية على الاستمرار والمنافسة في السوق.</p><h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4 border-r-4 border-brand-green pr-4">1. التغير الجذري في سلوك المستهلك</h2><p class="mb-4 text-slate-300 leading-relaxed">أشارت الدراسات الحديثة إلى أن أكثر من 87% من عمليات الشراء اليوم تبدأ ببحث على الإنترنت أو استكشاف عبر منصات التواصل الاجتماعي.</p><h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4 border-r-4 border-brand-green pr-4">2. سيادة الفيديو القصير</h2><p class="mb-4 text-slate-300 leading-relaxed">تعد مقاطع الفيديو القصيرة المنفذ الأسرع وصولاً للجماهير الجديدة دون الحاجة إلى ميزانيات إعلانية ضخمة.</p>', '/assets/blog_digital_marketing_2025.jpg', '["تسويق رقمي", "ذكاء اصطناعي", "استراتيجيات 2025", "فيديو"]', 1420),
(2, 'building-a-memorable-brand-identity', 'كيف تبني هوية تجارية لا تُنسى؟ خطوات عملية من الفكرة للتنفيذ', 'بناء الهوية', '5 دقائق قراءة', '٢٥ سبتمبر ٢٠٢٥', 'سارة علي', 'رئيسة قسم التصميم والهوية البصرية', '/assets/avatar_3.jpg', 'خطوات عملية واستراتيجية لتصميم هوية تجارية قوية تعكس قيمك الجوهرية، تتحدث بلغة جمهورك، وتصمد أمام اختبار الزمن.', '<p class="lead text-lg font-medium text-slate-200 mb-6">كثير من الناس يخلطون بين "الشعار" و"الهوية التجارية". الشعار هو مجرد توقيع بصري، بينما الهوية هي الروح والشعور والانطباع الكامل.</p><h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4 border-r-4 border-brand-green pr-4">1. ابدأ من "لماذا؟"</h2><p class="mb-4 text-slate-300 leading-relaxed">قبل اختيار الألوان أو رسم الخطوط، يجب أن تجيب بوضوح: ما هي الرسالة التي تريد إيصالها؟</p>', '/assets/blog_brand_identity.jpg', '["هوية بصرية", "تصميم شعار", "براندنج", "ألوان"]', 980),
(3, 'power-of-creative-content', 'قوة المحتوى الإبداعي في جذب العملاء وتحقيق المبيعات', 'صناعة المحتوى', '3 دقائق قراءة', '١٥ سبتمبر ٢٠٢٥', 'أحمد حسين', 'مدير صناعة المحتوى والإبداع', '/assets/avatar_1.jpg', 'تعرف على كيفية صناعة محتوى لا يبيع فقط، بل يبني علاقة ثقة وولاء حقيقية مع جمهورك من خلال قوة السرد القصصي.', '<p class="lead text-lg font-medium text-slate-200 mb-6">المحتوى عالي الجودة والملهم هو أفضل طريق للوصول إلى قلوب العملاء قبل عقولهم.</p>', '/assets/blog_creative_content.jpg', '["سرد قصصي", "محتوى إبداعي", "كتابة إعلانية", "تسويق"]', 1150);

INSERT OR IGNORE INTO messages (id, name, email, phone, service, message, status) VALUES 
(1, 'عبدالعزيز الغامدي', 'a.alghamdi@innovate.sa', '+966501234567', 'تصميم الهوية البصرية', 'السلام عليكم، نرغب في طلب تصميم هوية بصرية متكاملة لشركتنا الجديدة المتخصصة في الاستشارات الإدارية. نود معرفة التكلفة والمدة الزمنية.', 'new'),
(2, 'نورة القحطاني', 'noura@glowbeauty.com', '+966559876543', 'الإنتاج المرئي والمونتاج', 'نحتاج إلى تصوير ومونتاج 10 مقاطع فيديو قصيرة لحملة إطلاق خط منتجات العناية بالبشرة الجديد.', 'read');

INSERT OR IGNORE INTO testimonials (id, name, role, review, avatar, rating, project) VALUES 
(1, 'د. باسم زكي', 'المدير التنفيذي | مركز القاهرة الطبي للتجميل', 'قمتم بتصميم وتطوير منصة رقمية طبية متكاملة وسريعة لمركزنا ساهمت في مضاعفة حجوزات واستشارات الفروع الخمسة بنسبة 280%. احترافية عالية وتهيئة دقيقة للسيو الطبي.', '/assets/avatar_2.jpg', 5, 'تطوير المنصة الرقمية لـ Cairo Cosmo Center'),
(2, 'م. إبراهيم الدوسري', 'مدير المشاريع | شركة هضاب الخليج للمقاولات', 'منصة هضاب الخليج عكست قوتنا في البنية التحتية والمناقصات الكبرى بسرعة تحميل فائقة وتصميم هندسي متقن. فريق Crew5 شريك نجاح حقيقي ومتميز.', '/assets/avatar_1.jpg', 5, 'تطوير منصة هضاب الخليج للبنية التحتية'),
(3, 'خالد منصور', 'رئيس مجلس الإدارة | شركة ريادة الأعمال', 'ساعدونا في زيادة التفاعل على منصات التواصل الاجتماعي بنسبة 300%. استراتيجياتهم للمحتوى كانت مبتكرة وموجهة بدقة لجمهورنا المستهدف.', '/assets/avatar_1.jpg', 5, 'إدارة الحملات والتسويق الرقمي'),
(4, 'سعيد الأحمدي', 'المدير التنفيذي | تكنو لاين للحلول', 'تجربة رائعة فاقت التوقعات. فريق Crew5 فهم رؤيتنا بدقة وساعدونا في تحقيق نمو ملحوظ في وقت قياسي. الاحترافية والإبداع هما عنوانهم.', '/assets/avatar_2.jpg', 5, 'تصميم الهوية وتطوير الموقع'),
(5, 'فاطمة عبدالله', 'مؤسسة علامة تجارية | لافندر كير', 'قاموا ببناء هوية بصرية مذهلة لعلامتي التجارية مع تصوير احترافي للمنتجات. التصاميم كانت عصرية وفريدة من نوعها. أنصح بهم بشدة!', '/assets/avatar_3.jpg', 5, 'بناء الهوية البصرية والإنتاج المرئي');

INSERT OR IGNORE INTO team (id, name, role, initials, bio, avatar, skills) VALUES 
(1, 'محمد أحمد', 'مدير التسويق الرقمي واستراتيجيات النمو', 'MA', 'خبير استراتيجي يمتلك أكثر من 7 سنوات في قيادة الحملات الإعلانية وتحقيق أعلى عائد على الاستثمار.', '/assets/avatar_2.jpg', '["حملات إعلانية", "SEO", "تحليل بيانات", "تخطيط استراتيجي"]'),
(2, 'سارة علي', 'رئيسة قسم التصميم والهويات البصرية', 'SA', 'مصممة هويات وشعارات مبتكرة ذات رؤية فنية ثاقبة في تحويل القيم المؤسسية إلى تصاميم بصرية تأسر الأنظار.', '/assets/avatar_3.jpg', '["تصميم الهويات", "UI/UX", "Typography", "دليل الأسلوب"]'),
(3, 'أحمد حسين', 'مدير صناعة المحتوى والإبداع', 'AH', 'كاتب سيناريو وصانع محتوى محترف يتقن فن السرد القصصي وصياغة الرسائل التسويقية المؤثرة.', '/assets/avatar_1.jpg', '["كتابة إعلانية", "سرد قصصي", "إدارة محتوى", "سيو المقالات"]'),
(4, 'ليلى سمير', 'مديرة الإنتاج المرئي والمونتاج', 'LS', 'مخرجة ومونتيرة سينمائية متخصصة في إنتاج فيديوهات ترويجية وإعلانات تلهم المشاهد وتزيد التفاعل.', '/assets/avatar_3.jpg', '["مونتاج سينمائي", "موشن جرافيك", "هندسة صوت", "إخراج"]'),
(5, 'أيمن خالد', 'كبير مهندسي ومطوري الويب', 'AK', 'مطور برمجيات ذو خبرة واسعة في بناء تطبيقات ومواقع ويب حديثة وسريعة ومتوافقة مع أعلى معايير الأمان.', '/assets/avatar_2.jpg', '["Next.js / React", "Tailwind CSS", "تطوير API", "أداء وسرعة"]');

INSERT OR IGNORE INTO services_data (id, category_json) VALUES 
(1, '[{"id":"visual-production","title":"الإنتاج المرئي والمونتاج الاحترافي","description":"حلول إنتاج مرئي وصوتي متكاملة بأحدث الكاميرات وتقنيات المونتاج السينمائي لإبراز علامتك التجارية بأعلى جودة.","icon":"Video","badge":"إنتاج مرئي","services":[{"id":"video-editing","title":"المونتاج والإنتاج المرئي","description":"تصميم ومونتاج فيديوهات إعلانية، محتوى تسويقي احترافي، وفيديوهات قصيرة لمنصات Reels & TikTok.","icon":"Film","features":["مونتاج سينمائي عالي الدقة","مؤثرات بصرية احترافية","تعديل ألوان متقدم (Color Grading)","فيديوهات موجهة للمنصات الرقمية"]},{"id":"audio-production","title":"الصوت والتأثيرات الصوتية","description":"تسجيلات صوتية، هندسة ومعالجة الصوت، مؤثرات وتوزيع موسيقي خاص يعزز قوة وتأثير محتواك.","icon":"Headphones","features":["تعليق صوتي (Voiceover) احترافي","تنقية وهندسة الصوت","مؤثرات صوتية حصرية","موسيقى خلفية مرخصة"]},{"id":"photography","title":"التصوير الاحترافي","description":"تغطية المؤتمرات والفعاليات، جلسات تصوير المنتجات، وتصوير سينمائي للشركات.","icon":"Camera","features":["تصوير منتجات احترافي","تغطية فعاليات ومؤتمرات","تصوير جوي بالدرون (Drone)","جلسات تصوير شخصية للمدراء"]},{"id":"screens-presentations","title":"تجهيز الشاشات وعروض الاجتماعات","description":"إعداد وتصميم العروض التقديمية والشاشات التفاعلية للمؤتمرات والاجتماعات.","icon":"MonitorPlay","features":["عروض تفاعلية للمؤتمرات","موشن جرافيك للشاشات الضخمة","تصاميم باوربوينت وKeynote مخصصة","بث مباشر وتغطية رقمية"]}]},{"id":"digital-marketing","title":"التسويق الرقمي وتصميم وتطوير المواقع والهويات","description":"بناء الحضور الرقمي القوي وصناعة مواقع إلكترونية فائقة السرعة وهوية بصرية مميزة تضمن لك الريادة.","icon":"Palette","badge":"هوية وتسويق وويب","services":[{"id":"brand-identity","title":"الهويات البصرية الشاملة","description":"تصميم الشعارات ودليل الهوية المتكامل وتصاميم السوشيال ميديا لترسيخ مكانة علامتك.","icon":"Sparkles","features":["تصميم شعارات فريدة وعصرية","دليل إرشادي كامل للهوية","تصاميم المطبوعات والقرطاسية","هوية بصرية متكاملة للمنصات"]},{"id":"web-development","title":"تصميم وتطوير المواقع والمنصات","description":"تطوير مواقع ومنصات إلكترونية ومتاجر سريعة ومتجاوبة مع تجربة مستخدم سلسة تعزز مبيعاتك وحجوزاتك.","icon":"Code2","features":["واجهات فائقة السرعة ومتجاوبة","لوحات تحكم سهلة الإدارة","حماية وأمان عالي","ربط بوابات الدفع والتحليلات"]},{"id":"seo-optimization","title":"تحسين محركات البحث وتسريع الأداء (SEO)","description":"تصدر نتائج البحث الأولى في Google ومحركات البحث وجعل موقعك يعمل بسرعة البرق لجذب عملاء نوعيين.","icon":"SearchCheck","features":["تحسين البنية التقنية ومؤشرات Core Web Vitals","استهداف الكلمات المفتاحية الرابحة","تهيئة السيو الطبي والمحلي","تقارير أداء دورية"]}]},{"id":"content-management","title":"إدارة المحتوى والخدمات الإبداعية الرقمية","description":"إدارة الحملات التسويقية وصناعة محتوى إبداعي مستمر يبني مجتمعاً وفياً لعلامتك التجارية.","icon":"Layers","badge":"محتوى ونمو","services":[{"id":"social-media-management","title":"إدارة وسائل التواصل الاجتماعي","description":"تخطيط استراتيجي وجدولة ونشر المحتوى وإدارة المجتمع لزيادة الوصول والتفاعل.","icon":"Share2","features":["خطة نشر واستراتيجية محتوى متكاملة","إدارة وتفاعل فوري مع المتابعين","إدارة الحملات الإعلانية المدفوعة","تحليلات شهرية وتقارير نمو"]},{"id":"copywriting","title":"كتابة المحتوى التسويقي والإعلاني","description":"نصوص إعلانية وكتابة مقالات وسيناريوهات إبداعية مقنعة ترفع معدلات التحويل.","icon":"PenTool","features":["كتابة نصوص إعلانية مقنعة","سيناريوهات فيديوهات وإعلانات","كتابة مقالات متوافقة مع السيو","صياغة رسائل البريد والواتساب"]},{"id":"photo-sessions","title":"جلسات تصوير فوتوغرافي متخصصة","description":"جلسات تصوير مخصصة للمواد الترويجية وحملات الإطلاق الموسمية والمناسبات الخاصة.","icon":"Aperture","features":["استوديو مجهز بأعلى المعدات","تعديل وتنقيح الصور عالي الجودة","تصوير لايف ستايل","تسليم سريع للمواد التسويقية"]},{"id":"custom-digital-services","title":"خدمات واستشارات رقمية متكاملة","description":"استشارات تسويقية مخصصة وحلول رقمية شاملة مصممة خصيصاً لتناسب نموذج عملك.","icon":"Briefcase","features":["استشارات نمو تسويقي","دراسة وتحليل المنافسين","أتمتة العمليات التسويقية","إدارة الحملات الإعلانية الموسمية"]}]}]');

-- Seed 3 Custom Pages (Rich sample pages for Page Builder)
INSERT OR REPLACE INTO pages (id, slug, title, seo_description, blocks, is_published) VALUES 
(1, 'growth-solutions', 'حلول النمو والتسويق الرقمي للشركات', 'اكتشف باقات وحلول النمو المخصصة من وكالة Crew5 لتطوير أعمالك ومضاعفة مبيعاتك في السوق السعودي.', '[{"type":"hero","data":{"badge":"عرض خاص للشركات والمؤسسات","title":"حلول النمو والتوسع الرقمي","highlight":"الشاملة والمبتكرة","subtitle":"استراتيجيات متكاملة لتوسيع قاعدة عملائك ومضاعفة عوائدك الرقمية بأحدث تقنيات التسويق والبرمجة.","ctaText":"احجز استشارتك المجانية","ctaLink":"/contact","secondaryCtaText":"استعرض المشاريع","secondaryCtaLink":"/projects"}},{"type":"stats","data":{}},{"type":"services_grid","data":{"badge":"الخدمات المتضمنة","title":"حزمة خدمات النمو","highlight":"المتكاملة","subtitle":"باقة تجمع بين هندسة المواقع السريعة، الحملات الإعلانية الموجهة، والإنتاج السينمائي."}},{"type":"why_choose_us","data":{}},{"type":"testimonials","data":{}},{"type":"cta","data":{"title":"هل أنت مستعد لمضاعفة أرباح منشأتك؟","subtitle":"تحدث مع خبرائنا اليوم لتحديد خطة النمو المناسبة لنشاطك التجاري.","btnText":"ابدأ خطتك التسويقية الآن","btnLink":"/contact"}}]', 1),
(2, 'ecommerce-launch-package', 'باقة إطلاق المتاجر الإلكترونية السحابية', 'بناء متجر إلكتروني عالي التحويل ومتكامل مع أبل باي ومدى وتمارا وشركات الشحن والتوصيل.', '[{"type":"hero","data":{"badge":"باقة التجارة الإلكترونية","title":"أطلق متجرك الإلكتروني الاحترافي","highlight":"بسرعة البرق","subtitle":"متجر متكامل يدعم الدفع بنقرة واحدة (Apple Pay, Mada, Tabby) مع إدارة المخزون السحابي والربط اللوجستي.","ctaText":"طلب تصميم متجر","ctaLink":"/contact","secondaryCtaText":"مشاهدة النماذج","secondaryCtaLink":"/projects"}},{"type":"featured_projects","data":{"badge":"متاجر قمنا بتطويرها","title":"نماذج حقيقية لمتاجر","highlight":"حققت مبيعات قياسية","subtitle":"تعرف على قصص نجاح المتاجر الإلكترونية التي طورناها.","limit":2}},{"type":"faq","data":{"title":"الأسئلة الشائعة حول","highlight":"إنشاء المتاجر الإلكترونية","subtitle":"كل ما تود معرفته حول بوابات الدفع، الشحن، واللوائح التنظيمية في السعودية.","items":[{"q":"هل المتجر موثق في المركز السعودي للأعمال ومنصة سلة / زد؟","a":"نعم، نقدم حلول متاجر سحابية مخصصة ومطابقة لكافة اشتراطات المركز السعودي للأعمال وربط الفوترة الإلكترونية (ZATCA)."},{"q":"ما هي بوابات الدفع الإلكتروني المتاحة في المتجر؟","a":"ندعم كافة البوابات الرائدة مثل Apple Pay, Mada, Visa, Mastercard، وخدمات الدفع الآجل (Tabby و Tamara)."},{"q":"كم يستغرق تجهيز المتجر وتسليمه للعمل؟","a":"يستغرق الإطلاق المبدئي من 7 إلى 14 يوم عمل شامل التصميم وضبط بوابات الدفع وتغذية المنتجات الأساسية."}]}},{"type":"contact_form","data":{"title":"احجز باقة متجرك الإلكتروني الآن","subtitle":"املأ النموذج وسيقوم مستشار التجارة الإلكترونية بالتواصل معك لتحديد المتطلبات."}}]', 1),
(3, 'seo-audit-speed', 'فحص وتهيئة السيو وتسريع المواقع (SEO & Speed)', 'خدمة تسريع المواقع الإلكترونية والوصول لتقييم 95+ في Google PageSpeed وتصدر الكلمات المفتاحية.', '[{"type":"hero","data":{"badge":"خدمة تحسين الأداء التقني","title":"اجعل موقعك يتصدر نتائج Google","highlight":"ويعمل بسرعة البرق","subtitle":"إصلاح شامل لمؤشرات Core Web Vitals وتطبيق أعلى معايير السيو التقني لجلب آلاف الزيارات المجانية.","ctaText":"طلب فحص مجاني لموقعك","ctaLink":"/contact"}},{"type":"rich_text","data":{"title":"لماذا تعد سرعة الموقع العامل الأول لمضاعفة مبيعاتك؟","content":"<p>أثبتت تقارير Google الرسمية أن كل ثانية تأخير في تحميل الموقع تؤدي إلى خسارة أكثر من 20% من العملاء المحتملين.</p><p>في Crew5 Agency نقوم بإعادة هيكلة الكود، تفعيل التخزين المؤقت المتقدم، وضغط الصور بتقنيات الجيل القادم لتحقيق زمن تحميل أقل من ثانية واحدة.</p>"}},{"type":"partners","data":{}},{"type":"cta","data":{"title":"هل يعاني موقعك من بطء التحميل أو تراجع الزيارات؟","subtitle":"أرسل رابط موقعك الحالي وسنرسل لك تقريراً شاملاً عن نقاط الضعف وفرص التحسين.","btnText":"طلب تقرير الأداء المجاني","btnLink":"/contact"}}]', 1);
