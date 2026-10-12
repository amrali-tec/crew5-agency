import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashPassword } from './security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data loader
function getInitialSeedData() {
  return {
    admin: {
      email: "admin@crew5.agency",
      password: "admin123", // In production this would be hashed
      name: "مدير النظام",
      role: "Super Admin",
      updatedAt: new Date().toISOString()
    },
    settings: {
      name: "Crew5 Agency",
      tagline: "نصنع الإبداع الرقمي",
      description: "وكالة متخصصة في تحويل الأفكار إلى تجارب رقمية مبتكرة. من التصميم إلى التسويق، وصناعة المحتوى، نحن شريكك الاستراتيجي في النمو وتحقيق نتائج استثنائية.",
      email: "contact@crew5.agency",
      phone: "+966 123 456 789",
      whatsapp: "+966512345678",
      whatsappDisplay: "+966 51 234 5678",
      address: "الرياض، المملكة العربية السعودية",
      socialLinks: {
        linkedin: "https://linkedin.com/company/crew5agency",
        instagram: "https://instagram.com/crew5agency",
        twitter: "https://x.com/crew5agency",
        facebook: "https://facebook.com/crew5agency"
      },
      stats: [
        { value: "+120", label: "مشروع منجز" },
        { value: "+50", label: "عميل يثق بنا" },
        { value: "99%", label: "نسبة رضا العملاء" },
        { value: "+5", label: "سنوات من الخبرة" }
      ]
    },
    projects: [
      {
        id: 1,
        slug: "nokhabat-al-abaqira",
        title: "بناء الهوية البصرية لشركة \"نخبة العباقرة\"",
        category: "بناء الهوية والتصميم",
        categoryKey: "branding",
        client: "شركة نخبة العباقرة للحلول التقنية",
        year: "2025",
        description: "عملنا على تصميم هوية بصرية كاملة تعكس الابتكار والجودة، بدءًا من الشعار وحتى المواد التسويقية، مع التركيز على الطابع الهندسي الحديث.",
        fullDetails: "تضمن المشروع دراسة شاملة للسوق المحلي والمنافسين، تلاها ابتكار مفهوم الشعار والخطوط المخصصة، وإعداد دليل أسلوب شامل، بالإضافة إلى تصاميم المطبوعات والقوالب الرقمية.",
        imageUrl: "/assets/project_branding_nokhabat.jpg",
        tags: ["هوية بصرية", "تصميم شعار", "دليل الهوية", "UI/UX"],
        results: [
          { label: "زيادة تميز العلامة", value: "+85%" },
          { label: "قوالب تسويقية منجزة", value: "+40" },
          { label: "مدة التنفيذ", value: "3 أسابيع" }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        slug: "saudi-national-day-95",
        title: "حملة تسويقية لليوم الوطني السعودي 95",
        category: "التسويق عبر وسائل التواصل",
        categoryKey: "marketing",
        client: "مجموعة تجارية رائدة",
        year: "2025",
        description: "قمنا بإنشاء وإدارة حملة إعلانية ومحتوى إبداعي متكامل على منصات التواصل الاجتماعي بمناسبة اليوم الوطني السعودي 95.",
        fullDetails: "شملت الحملة إنتاج 6 مقاطع فيديو موشن جرافيك وتصوير واقعي، مع إطلاق حملات إعلانية مستهدفة على منصات TikTok وInstagram وX، إلى جانب مسابقات تفاعلية.",
        imageUrl: "/assets/project_national_day.jpg",
        tags: ["إدارة حملات", "موشن جرافيك", "فيديو", "سوشيال ميديا"],
        results: [
          { label: "مشاهدات الفيديو", value: "+2.5M" },
          { label: "معدل التفاعل", value: "+320%" },
          { label: "عملاء جدد", value: "+1,200" }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        slug: "fintech-platform-redesign",
        title: "تصميم وتطوير منصة تكنولوجيا مالية",
        category: "تصميم وتطوير المواقع",
        categoryKey: "web",
        client: "بوابة سداد الرقمية",
        year: "2025",
        description: "إعادة بناء وتصميم موقع وتطبيق المنصة المالية لتحسين تجربة المستخدم وسرعة التحميل وزيادة معدل التحويل للمستخدمين الجدد.",
        fullDetails: "قمنا بدراسة رحلة المستخدم، وإعادة هندسة واجهات المستخدم بتصميم زجاجي عصري وسريع، مع ربط كامل بالخدمات السحابية وتحسين السيو لمحركات البحث.",
        imageUrl: "/assets/blog_brand_identity.jpg",
        tags: ["تطوير مواقع", "UI/UX", "Next.js", "تكنولوجيا مالية"],
        results: [
          { label: "سرعة التحميل", value: "0.8 ثانية" },
          { label: "ارتفاع التسجيلات", value: "+140%" },
          { label: "تقييم الرضا", value: "4.9/5" }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        slug: "luxury-coffee-production",
        title: "إنتاج محتوى مرئي وإعلاني لعلامة قهوة مختصة",
        category: "الإنتاج المرئي والمونتاج",
        categoryKey: "video",
        client: "محامص أرابيكا الفاخرة",
        year: "2025",
        description: "جلسات تصوير احترافية ومونتاج فيديوهات سينمائية قصيرة تبرز أدق تفاصيل تحضير القهوة بأسلوب جذاب يسلب الأنظار.",
        fullDetails: "تنفيذ تصوير سينمائي في الموقع بتقنية 4K مع استخدام إضاءة درامية وتوزيع صوتي مخصص، وإنتاج سلسلة فيديوهات Reels ساهمت في مضاعفة المبيعات.",
        imageUrl: "/assets/blog_creative_content.jpg",
        tags: ["تصوير سينمائي", "Reels", "إنتاج مرئي", "صوت ومؤثرات"],
        results: [
          { label: "مبيعات المتجر", value: "+210%" },
          { label: "وصول المتابعين", value: "+1.1M" },
          { label: "معدل الإكمال", value: "78%" }
        ],
        createdAt: new Date().toISOString()
      }
    ],
    blogs: [
      {
        id: 1,
        slug: "digital-marketing-importance-2025",
        title: "أهمية التسويق الرقمي في 2025: دليلك للبقاء والنمو",
        excerpt: "استكشف لماذا أصبح التسويق الرقمي ضرورة لا غنى عنها لنمو أي عمل تجاري في العصر الحديث وكيف يمكنك الاستفادة من الذكاء الاصطناعي وصناعة الفيديو.",
        readTime: "4 دقائق قراءة",
        date: "١ أكتوبر ٢٠٢٥",
        isoDate: "2025-10-01",
        author: {
          name: "محمد أحمد",
          role: "خبير استراتيجيات التسويق الرقمي",
          avatar: "/assets/avatar_2.jpg"
        },
        category: "التسويق الرقمي",
        tags: ["تسويق رقمي", "ذكاء اصطناعي", "استراتيجيات 2025", "فيديو"],
        imageUrl: "/assets/blog_digital_marketing_2025.jpg",
        content: `
          <p class="lead text-lg font-medium text-slate-200 mb-6">
            في عصر يشهد تحولات تقنية متسارعة، لم يعد التواجد الرقمي مجرد خيار تكميلي للشركات، بل أصبح العمود الفقري الذي يحدد مدى قدرة العلامة التجارية على الاستمرار والمنافسة في السوق.
          </p>
          <h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4 border-r-4 border-brand-green pr-4">1. التغير الجذري في سلوك المستهلك</h2>
          <p class="mb-4 text-slate-300 leading-relaxed">
            أشارت الدراسات الحديثة إلى أن أكثر من 87% من عمليات الشراء اليوم تبدأ ببحث على الإنترنت أو استكشاف عبر منصات التواصل الاجتماعي.
          </p>
          <h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4 border-r-4 border-brand-green pr-4">2. سيادة الفيديو القصير (Short-form Video)</h2>
          <p class="mb-4 text-slate-300 leading-relaxed">
            تعد مقاطع الفيديو القصيرة (Reels & TikTok) المنفذ الأسرع وصولاً للجماهير الجديدة دون الحاجة إلى ميزانيات إعلانية ضخمة.
          </p>
        `,
        views: 1420,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        slug: "building-a-memorable-brand-identity",
        title: "كيف تبني هوية تجارية لا تُنسى؟ خطوات عملية من الفكرة للتنفيذ",
        excerpt: "خطوات عملية واستراتيجية لتصميم هوية تجارية قوية تعكس قيمك الجوهرية، تتحدث بلغة جمهورك، وتصمد أمام اختبار الزمن.",
        readTime: "5 دقائق قراءة",
        date: "٢٥ سبتمبر ٢٠٢٥",
        isoDate: "2025-09-25",
        author: {
          name: "سارة علي",
          role: "رئيسة قسم التصميم والهوية البصرية",
          avatar: "/assets/avatar_3.jpg"
        },
        category: "بناء الهوية",
        tags: ["هوية بصرية", "تصميم شعار", "براندنج", "ألوان"],
        imageUrl: "/assets/blog_brand_identity.jpg",
        content: `
          <p class="lead text-lg font-medium text-slate-200 mb-6">
            كثير من الناس يخلطون بين "الشعار" و"الهوية التجارية". الشعار هو مجرد توقيع بصري، بينما الهوية هي الروح والشعور والانطباع الكامل.
          </p>
          <h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4 border-r-4 border-brand-green pr-4">1. ابدأ من "لماذا؟"</h2>
          <p class="mb-4 text-slate-300 leading-relaxed">
            قبل اختيار الألوان أو رسم الخطوط، يجب أن تجيب بوضوح: ما هي الرسالة التي تريد إيصالها؟
          </p>
        `,
        views: 980,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        slug: "power-of-creative-content",
        title: "قوة المحتوى الإبداعي في جذب العملاء وتحقيق المبيعات",
        excerpt: "تعرف على كيفية صناعة محتوى لا يبيع فقط، بل يبني علاقة ثقة وولاء حقيقية مع جمهورك من خلال قوة السرد القصصي.",
        readTime: "3 دقائق قراءة",
        date: "١٥ سبتمبر ٢٠٢٥",
        isoDate: "2025-09-15",
        author: {
          name: "أحمد حسين",
          role: "مدير صناعة المحتوى والإبداع",
          avatar: "/assets/avatar_1.jpg"
        },
        category: "صناعة المحتوى",
        tags: ["سرد قصصي", "محتوى إبداعي", "كتابة إعلانية", "تسويق"],
        imageUrl: "/assets/blog_creative_content.jpg",
        content: `
          <p class="lead text-lg font-medium text-slate-200 mb-6">
            المحتوى عالي الجودة والملهم هو أفضل طريق للوصول إلى قلوب العملاء قبل عقولهم.
          </p>
        `,
        views: 1150,
        createdAt: new Date().toISOString()
      }
    ],
    servicesCategories: [
      {
        id: "visual-production",
        title: "الإنتاج المرئي والمونتاج الاحترافي",
        description: "حلول إنتاج مرئي وصوتي متكاملة بأحدث الكاميرات وتقنيات المونتاج السينمائي لإبراز علامتك التجارية بأعلى جودة.",
        icon: "Video",
        badge: "إنتاج مرئي",
        services: [
          {
            id: "video-editing",
            title: "المونتاج والإنتاج المرئي",
            description: "تصميم ومونتاج فيديوهات إعلانية، محتوى تسويقي احترافي، وفيديوهات قصيرة لمنصات Reels & TikTok.",
            icon: "Film",
            features: ["مونتاج سينمائي عالي الدقة", "مؤثرات بصرية احترافية", "تعديل ألوان متقدم (Color Grading)", "فيديوهات موجهة للمنصات الرقمية"]
          },
          {
            id: "audio-production",
            title: "الصوت والتأثيرات الصوتية",
            description: "تسجيلات صوتية، هندسة ومعالجة الصوت، مؤثرات وتوزيع موسيقي خاص يعزز قوة وتأثير محتواك.",
            icon: "Headphones",
            features: ["تعليق صوتي (Voiceover) احترافي", "تنقية وهندسة الصوت", "مؤثرات صوتية حصرية", "موسيقى خلفية مرخصة"]
          },
          {
            id: "photography",
            title: "التصوير الاحترافي",
            description: "تغطية المؤتمرات والفعاليات، جلسات تصوير المنتجات، وتصوير سينمائي للشركات.",
            icon: "Camera",
            features: ["تصوير منتجات احترافي", "تغطية فعاليات ومؤتمرات", "تصوير جوي بالدرون (Drone)", "جلسات تصوير شخصية للمدراء"]
          },
          {
            id: "screens-presentations",
            title: "تجهيز الشاشات وعروض الاجتماعات",
            description: "إعداد وتصميم العروض التقديمية والشاشات التفاعلية للمؤتمرات والاجتماعات.",
            icon: "MonitorPlay",
            features: ["عروض تفاعلية للمؤتمرات", "موشن جرافيك للشاشات الضخمة", "تصاميم باوربوينت وKeynote مخصصة", "بث مباشر وتغطية رقمية"]
          }
        ]
      },
      {
        id: "digital-marketing",
        title: "التسويق الرقمي وتصميم الهويات البصرية",
        description: "بناء الحضور الرقمي القوي وصناعة هوية بصرية مميزة تضمن لك الريادة والتفوق على المنافسين.",
        icon: "Palette",
        badge: "هوية وتسويق",
        services: [
          {
            id: "brand-identity",
            title: "الهويات البصرية الشاملة",
            description: "تصميم الشعارات ودليل الهوية المتكامل وتصاميم السوشيال ميديا لترسيخ مكانة علامتك.",
            icon: "Sparkles",
            features: ["تصميم شعارات فريدة وعصرية", "دليل إرشادي كامل للهوية", "تصاميم المطبوعات والقرطاسية", "هوية بصرية متكاملة للمنصات"]
          },
          {
            id: "web-development",
            title: "تصميم وتطوير المواقع",
            description: "تطوير مواقع إلكترونية سريعة ومتجاوبة مع تجربة مستخدم سلسة تعزز مبيعاتك.",
            icon: "Code2",
            features: ["واجهات فائقة السرعة ومتجاوبة", "لوحات تحكم سهلة الإدارة", "حماية وأمان عالي", "ربط بوابات الدفع والتحليلات"]
          },
          {
            id: "seo-optimization",
            title: "تحسين محركات البحث (SEO)",
            description: "تصدر نتائج البحث الأولى في Google ومحركات البحث لجذب عملاء نوعيين جاهزين للشراء.",
            icon: "SearchCheck",
            features: ["تحسين البنية التقنية للموقع (Technical SEO)", "استهداف الكلمات المفتاحية الرابحة", "بناء الروابط الخلفية", "تقارير أداء دورية"]
          }
        ]
      },
      {
        id: "content-management",
        title: "إدارة المحتوى والخدمات الإبداعية الرقمية",
        description: "إدارة الحملات التسويقية وصناعة محتوى إبداعي مستمر يبني مجتمعاً وفياً لعلامتك التجارية.",
        icon: "Layers",
        badge: "محتوى ونمو",
        services: [
          {
            id: "social-media-management",
            title: "إدارة وسائل التواصل الاجتماعي",
            description: "تخطيط استراتيجي وجدولة ونشر المحتوى وإدارة المجتمع لزيادة الوصول والتفاعل.",
            icon: "Share2",
            features: ["خطة نشر واستراتيجية محتوى متكاملة", "إدارة وتفاعل فوري مع المتابعين", "إدارة الحملات الإعلانية المدفوعة", "تحليلات شهرية وتقارير نمو"]
          },
          {
            id: "copywriting",
            title: "كتابة المحتوى التسويقي والإعلاني",
            description: "نصوص إعلانية وكتابة مقالات وسيناريوهات إبداعية مقنعة ترفع معدلات التحويل.",
            icon: "PenTool",
            features: ["كتابة نصوص إعلانية مقنعة", "سيناريوهات فيديوهات وإعلانات", "كتابة مقالات متوافقة مع السيو", "صياغة رسائل البريد والواتساب"]
          },
          {
            id: "photo-sessions",
            title: "جلسات تصوير فوتوغرافي متخصصة",
            description: "جلسات تصوير مخصصة للمواد الترويجية وحملات الإطلاق الموسمية والمناسبات الخاصة.",
            icon: "Aperture",
            features: ["استوديو مجهز بأعلى المعدات", "تعديل وتنقيح الصور عالي الجودة", "تصوير لايف ستايل", "تسليم سريع للمواد التسويقية"]
          },
          {
            id: "custom-digital-services",
            title: "خدمات واستشارات رقمية متكاملة",
            description: "استشارات تسويقية مخصصة وحلول رقمية شاملة مصممة خصيصاً لتناسب نموذج عملك.",
            icon: "Briefcase",
            features: ["استشارات نمو تسويقي", "دراسة وتحليل المنافسين", "أتمتة العمليات التسويقية", "إدارة الحملات الإعلانية الموسمية"]
          }
        ]
      }
    ],
    team: [
      {
        id: 1,
        name: "محمد أحمد",
        role: "مدير التسويق الرقمي واستراتيجيات النمو",
        initials: "MA",
        bio: "خبير استراتيجي يمتلك أكثر من 7 سنوات في قيادة الحملات الإعلانية وتحقيق أعلى عائد على الاستثمار.",
        avatar: "/assets/avatar_2.jpg",
        skills: ["حملات إعلانية", "SEO", "تحليل بيانات", "تخطيط استراتيجي"],
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "سارة علي",
        role: "رئيسة قسم التصميم والهويات البصرية",
        initials: "SA",
        bio: "مصممة هويات وشعارات مبتكرة ذات رؤية فنية ثاقبة في تحويل القيم المؤسسية إلى تصاميم بصرية تأسر الأنظار.",
        avatar: "/assets/avatar_3.jpg",
        skills: ["تصميم الهويات", "UI/UX", "Typography", "دليل الأسلوب"],
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: "أحمد حسين",
        role: "مدير صناعة المحتوى والإبداع",
        initials: "AH",
        bio: "كاتب سيناريو وصانع محتوى محترف يتقن فن السرد القصصي وصياغة الرسائل التسويقية المؤثرة.",
        avatar: "/assets/avatar_1.jpg",
        skills: ["كتابة إعلانية", "سرد قصصي", "إدارة محتوى", "سيو المقالات"],
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        name: "ليلى سمير",
        role: "مديرة الإنتاج المرئي والمونتاج",
        initials: "LS",
        bio: "مخرجة ومونتيرة سينمائية متخصصة في إنتاج فيديوهات ترويجية وإعلانات تلهم المشاهد وتزيد التفاعل.",
        avatar: "/assets/avatar_3.jpg",
        skills: ["مونتاج سينمائي", "موشن جرافيك", "هندسة صوت", "إخراج"],
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        name: "أيمن خالد",
        role: "كبير مهندسي ومطوري الويب",
        initials: "AK",
        bio: "مطور برمجيات ذو خبرة واسعة في بناء تطبيقات ومواقع ويب حديثة وسريعة ومتوافقة مع أعلى معايير الأمان.",
        avatar: "/assets/avatar_2.jpg",
        skills: ["Next.js / React", "Tailwind CSS", "تطوير API", "أداء وسرعة"],
        createdAt: new Date().toISOString()
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "خالد منصور",
        role: "رئيس مجلس الإدارة | شركة ريادة الأعمال",
        review: "ساعدونا في زيادة التفاعل على منصات التواصل الاجتماعي بنسبة 300%. استراتيجياتهم للمحتوى كانت مبتكرة وموجهة بدقة لجمهورنا المستهدف.",
        avatar: "/assets/avatar_1.jpg",
        rating: 5,
        project: "إدارة الحملات والتسويق الرقمي",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "سعيد الأحمدي",
        role: "المدير التنفيذي | تكنو لاين للحلول",
        review: "تجربة رائعة فاقت التوقعات. فريق Crew5 فهم رؤيتنا بدقة وساعدونا في تحقيق نمو ملحوظ في وقت قياسي. الاحترافية والإبداع هما عنوانهم.",
        avatar: "/assets/avatar_2.jpg",
        rating: 5,
        project: "تصميم الهوية وتطوير الموقع",
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: "فاطمة عبدالله",
        role: "مؤسسة علامة تجارية | لافندر كير",
        review: "قاموا ببناء هوية بصرية مذهلة لعلامتي التجارية مع تصوير احترافي للمنتجات. التصاميم كانت عصرية وفريدة من نوعها. أنصح بهم بشدة!",
        avatar: "/assets/avatar_3.jpg",
        rating: 5,
        project: "بناء الهوية البصرية والإنتاج المرئي",
        createdAt: new Date().toISOString()
      }
    ],
    messages: [
      {
        id: 1,
        name: "عبدالعزيز الغامدي",
        email: "a.alghamdi@innovate.sa",
        phone: "+966501234567",
        service: "تصميم الهوية البصرية",
        message: "السلام عليكم، نرغب في طلب تصميم هوية بصرية متكاملة لشركتنا الجديدة المتخصصة في الاستشارات الإدارية. نود معرفة التكلفة والمدة الزمنية.",
        status: "new",
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
      },
      {
        id: 2,
        name: "نورة القحطاني",
        email: "noura@glowbeauty.com",
        phone: "+966559876543",
        service: "الإنتاج المرئي والمونتاج",
        message: "نحتاج إلى تصوير ومونتاج 10 مقاطع فيديو قصيرة (Reels & TikTok) لحملة إطلاق خط منتجات العناية بالبشرة الجديد خلال الشهر القادم.",
        status: "read",
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      }
    ],
    customComponents: getInitialComponentsData(),
    pages: getInitialPagesData()
  };
}

function getInitialComponentsData() {
  return [
    {
      id: 1,
      name: "شريط العرض الخاص والخصم الموسمي",
      type: "announcement_bar",
      isGlobal: true,
      globalPosition: "top_bar",
      targetPages: ["all"],
      isEnabled: true,
      data: {
        badge: "عرض خاص",
        text: "خصم 20% لفترة محدودة على باقات الهوية والتسويق الرقمي بمناسبة إطلاق الموسم الجديد! 🚀",
        btnText: "احجز عرضك الآن",
        btnLink: "/contact",
        closable: true,
        bgGradient: "from-brand-green/20 via-dark-900 to-brand-green/30"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "بانر الاستشارة المجانية للتحول الرقمي",
      type: "promo_banner",
      isGlobal: false,
      globalPosition: "page_block",
      targetPages: [],
      isEnabled: true,
      data: {
        badge: "استشارة مجانية ومباشرة",
        title: "جاهز لتوسيع انتشار علامتك في السوق؟",
        highlight: "احصل على تدقيق رقمي مجاني",
        subtitle: "يقوم خبراؤنا بتحليل حضورك الرقمي وتقديم خطة نمو واضحة تضمن لك مضاعفة المبيعات والتفوق على المنافسين.",
        btnText: "طلب التدقيق المجاني",
        btnLink: "/contact",
        secondaryBtnText: "استعراض الخدمات",
        secondaryBtnLink: "/services",
        gradient: "from-brand-green/25 via-dark-900 to-dark-950"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "شارة التقييم والاعتمادات العائمة",
      type: "floating_widget",
      isGlobal: false,
      globalPosition: "floating_bottom_left",
      targetPages: [],
      isEnabled: true,
      data: {
        title: "تقييم 4.9/5 من أكثر من 50 عميل",
        subtitle: "وكالة معتمدة للتحول الرقمي",
        avatarUrl: "/assets/avatar_1.jpg",
        link: "/testimonials",
        btnText: "آراء شركاء النجاح"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      name: "صندوق طلب تسعير فوري (Lead Magnet)",
      type: "lead_capture",
      isGlobal: false,
      globalPosition: "page_block",
      targetPages: [],
      isEnabled: true,
      data: {
        badge: "طلب تسعير فوري",
        title: "احصل على عرض سعر مخصص لمشروعك خلال 60 دقيقة",
        subtitle: "أدخل بياناتك وسنتواصل معك فوراً لدراسة المتطلبات وتقديم أفضل الحلول.",
        btnText: "إرسال طلب التسعير",
        serviceOptions: ["تصميم هوية بصرية", "تطوير وبرمجة موقع", "إدارة حملات تسويقية", "إنتاج مرئي ومونتاج"]
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      name: "صندوق ركائز الجودة والضمان الذهبي",
      type: "feature_cards",
      isGlobal: false,
      globalPosition: "page_block",
      targetPages: [],
      isEnabled: true,
      data: {
        badge: "ضمان الجودة",
        title: "لماذا يثق بنا رواد الأعمال والشركات؟",
        highlight: "معايير لا تقبل المساومة",
        subtitle: "نضمن لك أعلى مستويات الاحترافية والسرعة والأمان في كل تفصيلة برمجية وإبداعية.",
        cards: [
          { title: "تسليم في الموعد بدقة", desc: "نلتزم بجداول زمنية صارمة لضمان إطلاق مشروعك دون أي تأخير.", iconName: "Clock" },
          { title: "دعم فني وضمان شامل", desc: "خدمة ما بعد الإطلاق وصيانة دورية وتحديثات مستمرة لراحة بالك.", iconName: "ShieldCheck" },
          { title: "تصاميم حصرية 100%", desc: "كل هوية وكل كود برمجي يصمم خصيصاً لعلامتك دون قوالب مكررة.", iconName: "Sparkles" }
        ]
      },
      createdAt: new Date().toISOString()
    }
  ];
}

function getInitialPagesData() {
  return [
    {
      id: 1,
      slug: "home",
      title: "الصفحة الرئيسية (Homepage)",
      path: "/",
      isSystem: true,
      seoDescription: "وكالة Crew5 Agency الرائدة في صناعة الإبداع الرقمي، تطوير المواقع السحابية، الهويات البصرية، والتسويق الرقمي في السعودية.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "وكالة الإبداع والتحول الرقمي",
            title: "نصنع الإبداع الرقمي الذي",
            highlight: "يقود مستقبلك",
            subtitle: "شريكك الاستراتيجي في تطوير المواقع والمنصات السحابية، بناء الهويات البصرية، والإنتاج السينمائي، وإدارة الحملات الإعلانية لتحقيق أعلى نمو وعائد استثماري.",
            ctaText: "ابدأ مشروعك معنا",
            ctaLink: "/contact",
            secondaryCtaText: "استكشف أعمالنا",
            secondaryCtaLink: "/projects"
          }
        },
        { type: "partners", data: {} },
        { type: "services_grid", data: { badge: "خدماتنا", title: "حلول رقمية مبتكرة", highlight: "ومتكاملة", subtitle: "نقدم حلولاً تسويقية وهندسية مصممة خصيصاً لمضاعفة نمو نشاطك التجاري." } },
        { type: "why_choose_us", data: {} },
        { type: "featured_projects", data: { badge: "أعمالنا السابقة", title: "مشاريع نفتخر بها", highlight: "وتبرز إبداعنا", subtitle: "نظرة على بعض الأعمال والحملات والمواقع التي قمنا بتطويرها لشركاء نجاحنا.", limit: 4 } },
        { type: "testimonials", data: {} },
        { type: "stats", data: {} },
        { type: "cta", data: { title: "هل أنت مستعد لنقل علامتك التجارية إلى المستوى التالي؟", subtitle: "تواصل معنا اليوم لبدء دراسة أهدافك وتصميم حل مخصص يحقق أعلى معدلات النجاح.", btnText: "ابدأ الآن مع Crew5", btnLink: "/contact" } }
      ]
    },
    {
      id: 2,
      slug: "about",
      title: "صفحة من نحن (About Us)",
      path: "/about",
      isSystem: true,
      seoDescription: "تعرف على قصة ورؤية وقيم ومنهجية فريق Crew5 Agency في صناعة الريادة الرقمية.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "من نحن",
            title: "قصتنا، قيمنا، ورؤيتنا التي",
            highlight: "تصنع المستقبل الرقمي",
            subtitle: "وكالة إبداعية متكاملة تأسست لتمكين العلامات التجارية في المملكة والخليج عبر حلول تقنية وبصرية استثنائية.",
            ctaText: "تواصل معنا",
            ctaLink: "/contact",
            secondaryCtaText: "كلمة الرئيس التنفيذي",
            secondaryCtaLink: "/ceo-message"
          }
        },
        {
          type: "rich_text",
          data: {
            title: "شغف بالتميز، والتزام بالريادة الوطنية",
            content: "<p class='mb-4 text-slate-300 leading-relaxed'>بدأنا كفريق شغوف يجمع بين الإبداع البصري والهندسة البرمجية المتقدمة. واليوم، نفخر بخدمة كبرى الشركات الوطنية والمراكز الطبية والمؤسسات التجارية في الرياض وكافة مدن المملكة، محققين نتائج تتجاوز التوقعات.</p>"
          }
        },
        { type: "why_choose_us", data: {} },
        { type: "team_grid", data: { badge: "فريق العمل", title: "نخبة المبدعين والمطورين", highlight: "خلف نجاح Crew5", subtitle: "فريق متكامل يجمع بين استراتيجيي التسويق، مصممي الهويات، ومهندسي الويب." } },
        { type: "cta", data: { title: "هل أنت مستعد لبدء قصة نجاح علامتك القادمة؟", subtitle: "تواصل مع فريقنا اليوم لمناقشة تطلعاتك وبناء استراتيجية مخصصة.", btnText: "ابدأ الآن مع Crew5", btnLink: "/contact" } }
      ]
    },
    {
      id: 3,
      slug: "ceo-message",
      title: "كلمة الرئيس التنفيذي (CEO Message)",
      path: "/ceo-message",
      isSystem: true,
      seoDescription: "الرؤية والرسالة الاستراتيجية للقيادة التنفيذية في وكالة Crew5 Agency.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "القيادة التنفيذية",
            title: "كلمة الرئيس التنفيذي",
            highlight: "وإدارة المشاريع",
            subtitle: "رؤيتنا الاستراتيجية والتزامنا المستمر بقيادة الابتكار وصناعة التجارب الرقمية الرائدة في المملكة والشرق الأوسط.",
            ctaText: "تحدث مع القيادة",
            ctaLink: "/contact"
          }
        },
        {
          type: "rich_text",
          data: {
            title: "رسالة القيادة: نصنع الهوية الرقمية التي تقود مستقبلك",
            content: "<p class='mb-4 text-slate-300 leading-relaxed'>في عصر التحول الرقمي ومواكبةً لـ <strong>رؤية المملكة 2030</strong>، نؤمن بأن كل علامة تجارية تستحق حضوراً رقمياً فريداً يعكس قيمتها الحقيقية ويمنحها الأسبقية في السوق.</p><p class='text-slate-300 leading-relaxed'>نعمل بجهد والتزام دائم على دمج أحدث التقنيات البرمجية وأعلى أساليب الإنتاج السينمائي لضمان تحقيق أعلى عائد استثماري لشركائنا.</p>"
          }
        },
        { type: "why_choose_us", data: {} },
        { type: "cta", data: { title: "احجز جلسة استشارية استراتيجية مع الإدارة", subtitle: "نرحب بمناقشة المشاريع الكبرى والشراكات طويلة الأمد مباشرة.", btnText: "طلب استشارة تنفيذية", btnLink: "/contact" } }
      ]
    },
    {
      id: 4,
      slug: "services",
      title: "صفحة الخدمات والحلول (Services)",
      path: "/services",
      isSystem: true,
      seoDescription: "استعرض كافة خدمات وحلول وكالة Crew5 في الإنتاج المرئي، تطوير المواقع، السيو، وإدارة الحملات.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "خدماتنا وحلولنا",
            title: "حلول رقمية وتسويقية متكاملة",
            highlight: "لتحقيق الريادة",
            subtitle: "من التصميم إلى التطوير، وصناعة المحتوى، وإدارة الحملات الإعلانية، نقدم خدمات مخصصة تناسب أهدافك.",
            ctaText: "طلب استشارة لخدمتك",
            ctaLink: "/contact"
          }
        },
        { type: "services_grid", data: {} },
        { type: "stats", data: {} },
        {
          type: "faq",
          data: {
            title: "الأسئلة الشائعة حول",
            highlight: "خدماتنا وباقاتنا",
            subtitle: "إجابات على كافة استفسارات التعاقد وآليات التنفيذ والدفع."
          }
        },
        { type: "cta", data: { title: "هل ترغب في باقة مخصصة تناسب نموذج عملك؟", subtitle: "فريقنا جاهز لتصميم خطة عمل متكاملة تلبي تطلعاتك بدقة.", btnText: "اطلب باقتك المخصصة", btnLink: "/contact" } }
      ]
    },
    {
      id: 5,
      slug: "projects",
      title: "معرض الأعمال والمشاريع (Projects)",
      path: "/projects",
      isSystem: true,
      seoDescription: "نماذج وقصص نجاح المشاريع والهويات والمواقع التي طورتها وكالة Crew5 Agency.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "معرض الأعمال",
            title: "قصص نجاح ومشاريع",
            highlight: "نفتخر بصناعتها",
            subtitle: "استعرض مجموعة مختارة من المشاريع والهويات البصرية والحملات الإعلانية والمواقع التي طورناها بدقة وإبداع.",
            ctaText: "ابدأ مشروعك معنا",
            ctaLink: "/contact"
          }
        },
        { type: "featured_projects", data: { limit: 8 } },
        { type: "testimonials", data: {} },
        { type: "cta", data: { title: "هل لديك فكرة مشروع ترغب بتنفيذه؟", subtitle: "دعنا نساعدك في بناء موقعك أو إطلاق حملتك القادمة بنفس الجودة والاحترافية.", btnText: "ابدأ مشروعك معنا", btnLink: "/contact" } }
      ]
    },
    {
      id: 6,
      slug: "blog",
      title: "المدونة والمقالات (Blog)",
      path: "/blog",
      isSystem: true,
      seoDescription: "مقالات وأدلة ورؤى تسويقية وتقنية متقدمة يقدمها خبراء وكالة Crew5.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "المدونة والرؤى",
            title: "أفكار ورؤى في التسويق",
            highlight: "والابتكار الرقمي",
            subtitle: "مقالات متخصصة وأدلة عملية لمساعدتك في فهم أحدث توجهات التسويق، التقنية، وتطوير الأعمال.",
            ctaText: "تواصل مع خبرائنا",
            ctaLink: "/contact"
          }
        },
        { type: "partners", data: {} },
        { type: "cta", data: { title: "هل ترغب بمحتوى استراتيجي مخصص لمنشأتك؟", subtitle: "فريقنا الإبداعي يكتب وينتج مقالات متوافقة مع السيو تعزز مكانتك في السوق.", btnText: "تواصل معنا", btnLink: "/contact" } }
      ]
    },
    {
      id: 7,
      slug: "contact",
      title: "صفحة تواصل معنا (Contact Us)",
      path: "/contact",
      isSystem: true,
      seoDescription: "تواصل مع فريق وكالة Crew5 Agency في الرياض لبدء مشروعك أو حجز استشارة فورية.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "تواصل معنا",
            title: "دعنا نبدأ في صناعة",
            highlight: "قصة نجاحك",
            subtitle: "تواصل معنا اليوم لبدء دراسة أهدافك وتصميم حل مخصص يحقق أعلى معدلات النجاح.",
            ctaText: "راسلنا على واتساب",
            ctaLink: "https://wa.me/966512345678"
          }
        },
        { type: "contact_form", data: { title: "أرسل لنا تفاصيل طلبك", subtitle: "املأ النموذج التالي وسيتواصل معك أحد خبرائنا في أسرع وقت." } },
        { type: "partners", data: {} }
      ]
    },
    {
      id: 8,
      slug: "faq",
      title: "الأسئلة الشائعة (FAQ)",
      path: "/faq",
      isSystem: true,
      seoDescription: "إجابات شاملة على أكثر الأسئلة شيوعاً حول خدمات وحلول وكالة Crew5.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "مركز المساعدة والأسئلة",
            title: "الأسئلة الشائعة",
            highlight: "وكل ما تود معرفته",
            subtitle: "جمعنا لك إجابات مفصلة حول آليات العمل، التسليم، طرق الدفع، وخدمات الدعم الفني.",
            ctaText: "تواصل مع الدعم",
            ctaLink: "/contact"
          }
        },
        { type: "faq", data: {} },
        { type: "contact_form", data: { title: "هل لديك استفسار آخر لم تجد إجابته؟", subtitle: "أرسل سؤالك مباشرة وسنكون سعداء بمساعدتك." } }
      ]
    },
    {
      id: 9,
      slug: "privacy-policy",
      title: "سياسة الخصوصية (Privacy Policy)",
      path: "/privacy-policy",
      isSystem: true,
      seoDescription: "سياسة الخصوصية وحماية بيانات المستخدمين في وكالة Crew5 Agency.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "الشفافية والأمان",
            title: "سياسة الخصوصية",
            highlight: "وحماية البيانات",
            subtitle: "نلتزم بأعلى معايير حماية البيانات والسرية التامة لمعلومات عملائنا وشركائنا وفق الأنظمة السعودية."
          }
        },
        {
          type: "rich_text",
          data: {
            title: "التزامنا بحماية خصوصيتك",
            content: "<p class='mb-4 text-slate-300 leading-relaxed'>في Crew5 Agency، نولي سرية وأمان بياناتك أهمية قصوى. لا نقوم ببيع أو مشاركة أي بيانات اتصال أو معلومات تجارية مع أي أطراف ثالثة دون إذنك المسبق.</p><p class='text-slate-300 leading-relaxed'>كافة البيانات المدخلة في نماذج التواصل تستخدم حصرياً للرد على استفساراتك وتقديم الخدمات المتفق عليها بأعلى معايير الأمان والتشفير.</p>"
          }
        }
      ]
    },
    {
      id: 10,
      slug: "terms-and-conditions",
      title: "الشروط والأحكام (Terms & Conditions)",
      path: "/terms-and-conditions",
      isSystem: true,
      seoDescription: "الشروط والأحكام والضوابط المنظمة لخدمات ومشاريع وكالة Crew5 Agency.",
      isPublished: true,
      blocks: [
        {
          type: "hero",
          data: {
            badge: "الضوابط والاتفاقيات",
            title: "الشروط والأحكام",
            highlight: "واللوائح التنظيمية",
            subtitle: "الضوابط والاشتراطات التي تحكم التعاملات والتعاقدات والخدمات المقدمة من وكالة Crew5."
          }
        },
        {
          type: "rich_text",
          data: {
            title: "بنود الاتفاقية ومراحل العمل",
            content: "<p class='mb-4 text-slate-300 leading-relaxed'>تحدد هذه الاتفاقية الحقوق والالتزامات المتبادلة بين وكالة Crew5 والعميل، بما يضمن دقة التنفيذ والالتزام بالمواصفات والجدول الزمني المعتمد.</p><p class='text-slate-300 leading-relaxed'>تشمل خدماتنا ضماناً فنياً ودعماً مستمراً بعد الإطلاق للتأكد من استقرار وأداء المنصات والحملات بأعلى كفاءة.</p>"
          }
        }
      ]
    }
  ];
}

function getInitialClientProjectsData() {
  return [
    {
      id: 1,
      code: "CREW-9041",
      clientName: "شركة نخبة العباقرة للحلول التقنية",
      projectTitle: "تطوير الهوية المؤسسية والمنصة السحابية",
      category: "بناء الهوية وتطوير الويب",
      status: "in_progress",
      progress: 75,
      startDate: "2026-08-01",
      targetEndDate: "2026-09-15",
      manager: {
        name: "م. خالد الشمري",
        role: "مدير المشروع والحلول الرقمية",
        avatar: "/assets/avatar_1.jpg",
        phone: "+966512345678",
        email: "projects@crew5.agency"
      },
      milestones: [
        { id: 1, title: "تحليل المتطلبات وجلسة التخطيط الاستراتيجي", status: "completed", date: "2026-08-05", note: "تم اعتماد وثيقة نطاق العمل بالكامل" },
        { id: 2, title: "تصميم الهوية البصرية ودليل الأسلوب", status: "completed", date: "2026-08-18", note: "تم اعتماد الشعار ولوحة الألوان والخطوط" },
        { id: 3, title: "تطوير وبرمجة المنصة السحابية وربط API", status: "in_progress", date: "2026-08-30", note: "جاري ربط بوابات الدفع وقاعدة البيانات" },
        { id: 4, title: "فحص الجودة واختبارات الأداء والأمان (QA)", status: "pending", date: "2026-09-08", note: "مجدول" },
        { id: 5, title: "الإطلاق الرسمي وتسليم كافة الأصول والتدريب", status: "pending", date: "2026-09-15", note: "مجدول" }
      ],
      deliverables: [
        { name: "دليل الهوية البصرية الشامل (PDF)", size: "14.2 MB", date: "2026-08-18", url: "#" },
        { name: "حزمة الشعارات بجميع الصيغ المتجهية (SVG/PNG)", size: "8.5 MB", date: "2026-08-18", url: "#" },
        { name: "رابط البيئة التجريبية للمنصة (Staging Preview)", size: "رابط مباشر", date: "2026-08-25", url: "https://demo.crew5.agency" }
      ],
      notes: "المشروع يسير وفق الخطة الزمنية المعتمدة بنجاح وجاري استكمال ربط بوابات الدفع الإلكتروني."
    },
    {
      id: 2,
      code: "CREW-7820",
      clientName: "مجموعة مراكز الجمال والأناقة",
      projectTitle: "إدارة الحملات الإعلانية وإنتاج محتوى Reels",
      category: "التسويق والإنتاج المرئي",
      status: "review",
      progress: 90,
      startDate: "2026-08-10",
      targetEndDate: "2026-09-05",
      manager: {
        name: "أحمد حسين",
        role: "مدير صناعة المحتوى والتسويق",
        avatar: "/assets/avatar_2.jpg",
        phone: "+966512345678",
        email: "marketing@crew5.agency"
      },
      milestones: [
        { id: 1, title: "جلسة التصوير السينمائي بالمركز", status: "completed", date: "2026-08-12", note: "تم التقاط 20 فيديو بدقة 4K" },
        { id: 2, title: "مونتاج وإنتاج 12 فيديو Reels إعلاني", status: "completed", date: "2026-08-22", note: "تم الانتهاء من المؤثرات وتعديل الألوان" },
        { id: 3, title: "إطلاق الحملات الإعلانية الممولة", status: "in_progress", date: "2026-08-27", note: "الحملات نشطة وتجاوزت 400 ألف مشاهدة" },
        { id: 4, title: "التقرير الشهري لمعدلات التحويل والعائد", status: "pending", date: "2026-09-05", note: "مجدول" }
      ],
      deliverables: [
        { name: "حزمة فيديوهات Reels المعدلة (12 فيديو)", size: "185 MB", date: "2026-08-22", url: "#" },
        { name: "تقرير الأداء الإعلاني الأسبوعي (PDF)", size: "3.1 MB", date: "2026-08-27", url: "#" }
      ],
      notes: "تم تحقيق أكثر من 180 حجز مؤكد خلال الأسبوع الأول من انطلاق الحملة."
    }
  ];
}

function getInitialUsersData() {
  return [
    {
      id: 1,
      name: "مدير النظام (Super Admin)",
      email: "admin@crew5.agency",
      password: hashPassword("admin123"),
      role: "super_admin",
      roleLabel: "مدير عام النظام",
      status: "active",
      phone: "+966568121909",
      avatar: "/assets/avatar_2.jpg",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      lastLoginIp: "127.0.0.1"
    }
  ];
}

function getInitialAuditLogs() {
  return [
    {
      id: 1,
      action: "system_init",
      userEmail: "system",
      userName: "النظام",
      details: "تهيئة نظام الحماية والمستخدمين بنجاح",
      ip: "127.0.0.1",
      timestamp: new Date().toISOString(),
      status: "success"
    }
  ];
}

class Database {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      console.log('⚡ Initializing Database with seed data...');
      this.data = getInitialSeedData();
      this.data.clientProjects = getInitialClientProjectsData();
      this.data.users = getInitialUsersData();
      this.data.auditLogs = getInitialAuditLogs();
      this.data.consultations = [];
      this.data.estimatorSubmissions = [];
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);

        let changed = false;
        if (!this.data.customComponents || !Array.isArray(this.data.customComponents) || this.data.customComponents.length === 0) {
          this.data.customComponents = getInitialComponentsData();
          changed = true;
        }
        if (!this.data.pages || !Array.isArray(this.data.pages) || this.data.pages.length === 0) {
          this.data.pages = getInitialPagesData();
          changed = true;
        }
        if (!this.data.clientProjects || !Array.isArray(this.data.clientProjects) || this.data.clientProjects.length === 0) {
          this.data.clientProjects = getInitialClientProjectsData();
          changed = true;
        }
        if (!this.data.users || !Array.isArray(this.data.users) || this.data.users.length === 0) {
          this.data.users = getInitialUsersData();
          // If legacy admin exists, migrate password
          if (this.data.admin && this.data.admin.password) {
            const oldPass = this.data.admin.password;
            this.data.users[0].password = oldPass.includes(':') ? oldPass : hashPassword(oldPass);
            this.data.users[0].email = this.data.admin.email || this.data.users[0].email;
            this.data.users[0].name = this.data.admin.name || this.data.users[0].name;
          }
          changed = true;
        }
        if (!this.data.auditLogs || !Array.isArray(this.data.auditLogs)) {
          this.data.auditLogs = getInitialAuditLogs();
          changed = true;
        }
        if (!this.data.consultations || !Array.isArray(this.data.consultations)) {
          this.data.consultations = [];
          changed = true;
        }
        if (!this.data.estimatorSubmissions || !Array.isArray(this.data.estimatorSubmissions)) {
          this.data.estimatorSubmissions = [];
          changed = true;
        }
        if (changed) {
          this.save();
        }
        console.log('✓ Database loaded successfully.');
      } catch (err) {
        console.error('Error reading database file, re-initializing:', err);
        this.data = getInitialSeedData();
        this.data.clientProjects = getInitialClientProjectsData();
        this.data.users = getInitialUsersData();
        this.data.auditLogs = getInitialAuditLogs();
        this.data.consultations = [];
        this.data.estimatorSubmissions = [];
        this.save();
      }
    }
  }

  save() {
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  // Get Collections
  get(collection) {
    return this.data[collection] || [];
  }

  getById(collection, id) {
    const list = this.get(collection);
    return list.find(item => item.id == id);
  }

  insert(collection, item) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const maxId = this.data[collection].reduce((max, i) => Math.max(max, Number(i.id) || 0), 0);
    const newItem = {
      id: maxId + 1,
      ...item,
      createdAt: new Date().toISOString()
    };
    this.data[collection].unshift(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    if (!this.data[collection]) return null;
    const index = this.data[collection].findIndex(item => item.id == id);
    if (index === -1) return null;
    
    this.data[collection][index] = {
      ...this.data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data[collection][index];
  }

  delete(collection, id) {
    if (!this.data[collection]) return false;
    const initialLen = this.data[collection].length;
    this.data[collection] = this.data[collection].filter(item => item.id != id);
    if (this.data[collection].length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Settings
  getSettings() {
    return this.data.settings || {};
  }

  updateSettings(newSettings) {
    this.data.settings = {
      ...this.data.settings,
      ...newSettings,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.settings;
  }

  // User Management
  getUsers() {
    return (this.data.users || []).map(u => {
      const { password, ...safeUser } = u;
      return safeUser;
    });
  }

  getUserById(id) {
    const user = (this.data.users || []).find(u => u.id == id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  getUserByEmail(email) {
    if (!email) return null;
    return (this.data.users || []).find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  createUser(userData) {
    if (!this.data.users) this.data.users = [];
    const maxId = this.data.users.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0);
    const roleLabels = {
      super_admin: 'مدير عام النظام',
      admin: 'مشرف عام',
      sales_manager: 'مدير المبيعات والتعاقدات',
      sales: 'مسؤول مبيعات وعلاقات عملاء',
      marketing_manager: 'مدير التسويق والنمو',
      marketing: 'أخصائي تسويق ومحتوى',
      editor: 'محرر محتوى',
      viewer: 'مستعرض'
    };
    const newUser = {
      id: maxId + 1,
      name: userData.name || 'مستخدم جديد',
      email: userData.email.trim().toLowerCase(),
      password: userData.password ? hashPassword(userData.password) : hashPassword('crew5@123456'),
      role: userData.role || 'editor',
      roleLabel: userData.roleLabel || roleLabels[userData.role] || 'مستخدم',
      status: userData.status || 'active',
      phone: userData.phone || '',
      avatar: userData.avatar || '/assets/avatar_1.jpg',
      createdAt: new Date().toISOString(),
      lastLogin: null,
      lastLoginIp: null
    };
    this.data.users.unshift(newUser);
    this.save();
    const { password, ...safeUser } = newUser;
    return safeUser;
  }

  updateUser(id, updates) {
    if (!this.data.users) return null;
    const index = this.data.users.findIndex(u => u.id == id);
    if (index === -1) return null;

    const user = this.data.users[index];
    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // If password is being updated, hash it if not already hashed
    if (updates.password && !updates.password.includes(':')) {
      updated.password = hashPassword(updates.password);
    }

    this.data.users[index] = updated;
    this.save();
    const { password, ...safeUser } = updated;
    return safeUser;
  }

  deleteUser(id) {
    if (!this.data.users) return false;
    const initialLen = this.data.users.length;
    this.data.users = this.data.users.filter(u => u.id != id);
    if (this.data.users.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Audit Logs
  getAuditLogs(limit = 100) {
    return (this.data.auditLogs || []).slice(0, limit);
  }

  addAuditLog({ action, userEmail = 'system', userName = 'النظام', details = '', ip = '127.0.0.1', status = 'success' }) {
    if (!this.data.auditLogs) this.data.auditLogs = [];
    const maxId = this.data.auditLogs.reduce((max, l) => Math.max(max, Number(l.id) || 0), 0);
    const logEntry = {
      id: maxId + 1,
      action,
      userEmail,
      userName,
      details,
      ip,
      status,
      timestamp: new Date().toISOString()
    };
    this.data.auditLogs.unshift(logEntry);
    if (this.data.auditLogs.length > 500) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 500); // keep recent 500 logs
    }
    this.save();
    return logEntry;
  }

  // Legacy Admin Auth compatibility
  getAdmin() {
    if (this.data.users && this.data.users.length > 0) {
      const primaryAdmin = this.data.users.find(u => u.role === 'super_admin') || this.data.users[0];
      return primaryAdmin;
    }
    return this.data.admin;
  }

  updateAdminPassword(newPassword) {
    const hashed = hashPassword(newPassword);
    if (this.data.admin) {
      this.data.admin.password = hashed;
      this.data.admin.updatedAt = new Date().toISOString();
    }
    if (this.data.users && this.data.users.length > 0) {
      const primaryAdmin = this.data.users.find(u => u.role === 'super_admin') || this.data.users[0];
      primaryAdmin.password = hashed;
      primaryAdmin.updatedAt = new Date().toISOString();
    }
    this.save();
    return true;
  }
}

export const db = new Database();
