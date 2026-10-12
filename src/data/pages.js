export const defaultPages = [
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
  },
  {
    id: 11,
    slug: "growth-solutions",
    title: "حلول النمو والتسويق الرقمي للشركات",
    path: "/p/growth-solutions",
    isSystem: false,
    seoDescription: "اكتشف باقات وحلول النمو المخصصة من وكالة Crew5 لتطوير أعمالك ومضاعفة مبيعاتك في السوق السعودي.",
    isPublished: true,
    blocks: [
      {
        type: "hero",
        data: {
          badge: "عرض خاص للشركات والمؤسسات",
          title: "حلول النمو والتوسع الرقمي",
          highlight: "الشاملة والمبتكرة",
          subtitle: "استراتيجيات متكاملة لتوسيع قاعدة عملائك ومضاعفة عوائدك الرقمية بأحدث تقنيات التسويق والبرمجة.",
          ctaText: "احجز استشارتك المجانية",
          ctaLink: "/contact",
          secondaryCtaText: "استعرض المشاريع",
          secondaryCtaLink: "/projects"
        }
      },
      { type: "stats", data: {} },
      { type: "services_grid", data: { badge: "الخدمات المتضمنة", title: "حزمة خدمات النمو", highlight: "المتكاملة", subtitle: "باقة تجمع بين هندسة المواقع السريعة، الحملات الإعلانية الموجهة، والإنتاج السينمائي." } },
      { type: "why_choose_us", data: {} },
      { type: "testimonials", data: {} },
      { type: "cta", data: { title: "هل أنت مستعد لمضاعفة أرباح منشأتك؟", subtitle: "تحدث مع خبرائنا اليوم لتحديد خطة النمو المناسبة لنشاطك التجاري.", btnText: "ابدأ خطتك التسويقية الآن", btnLink: "/contact" } }
    ]
  },
  {
    id: 12,
    slug: "ecommerce-launch-package",
    title: "باقة إطلاق المتاجر الإلكترونية السحابية",
    path: "/p/ecommerce-launch-package",
    isSystem: false,
    seoDescription: "بناء متجر إلكتروني عالي التحويل ومتكامل مع أبل باي ومدى وتمارا وشركات الشحن والتوصيل.",
    isPublished: true,
    blocks: [
      {
        type: "hero",
        data: {
          badge: "باقة التجارة الإلكترونية",
          title: "أطلق متجرك الإلكتروني الاحترافي",
          highlight: "بسرعة البرق",
          subtitle: "متجر متكامل يدعم الدفع بنقرة واحدة (Apple Pay, Mada, Tabby) مع إدارة المخزون السحابي والربط اللوجستي.",
          ctaText: "طلب تصميم متجر",
          ctaLink: "/contact",
          secondaryCtaText: "مشاهدة النماذج",
          secondaryCtaLink: "/projects"
        }
      },
      {
        type: "featured_projects",
        data: {
          badge: "متاجر قمنا بتطويرها",
          title: "نماذج حقيقية لمتاجر",
          highlight: "حققت مبيعات قياسية",
          subtitle: "تعرف على قصص نجاح المتاجر الإلكترونية التي طورناها.",
          limit: 2
        }
      },
      {
        type: "faq",
        data: {
          title: "الأسئلة الشائعة حول",
          highlight: "إنشاء المتاجر الإلكترونية",
          subtitle: "كل ما تود معرفته حول بوابات الدفع، الشحن، واللوائح التنظيمية في السعودية.",
          items: [
            { q: "هل المتجر موثق في المركز السعودي للأعمال ومنصة سلة / زد؟", a: "نعم، نقدم حلول متاجر سحابية مخصصة ومطابقة لكافة اشتراطات المركز السعودي للأعمال وربط الفوترة الإلكترونية (ZATCA)." },
            { q: "ما هي بوابات الدفع الإلكتروني المتاحة في المتجر؟", a: "ندعم كافة البوابات الرائدة مثل Apple Pay, Mada, Visa, Mastercard، وخدمات الدفع الآجل (Tabby و Tamara)." },
            { q: "كم يستغرق تجهيز المتجر وتسليمه للعمل؟", a: "يستغرق الإطلاق المبدئي من 7 إلى 14 يوم عمل شامل التصميم وضبط بوابات الدفع وتغذية المنتجات الأساسية." }
          ]
        }
      },
      { type: "contact_form", data: { title: "احجز باقة متجرك الإلكتروني الآن", subtitle: "املأ النموذج وسيقوم مستشار التجارة الإلكترونية بالتواصل معك لتحديد المتطلبات." } }
    ]
  },
  {
    id: 13,
    slug: "seo-audit-speed",
    title: "فحص وتهيئة السيو وتسريع المواقع (SEO & Speed)",
    path: "/p/seo-audit-speed",
    isSystem: false,
    seoDescription: "خدمة تسريع المواقع الإلكترونية والوصول لتقييم 95+ في Google PageSpeed وتصدر الكلمات المفتاحية.",
    isPublished: true,
    blocks: [
      {
        type: "hero",
        data: {
          badge: "خدمة تحسين الأداء التقني",
          title: "اجعل موقعك يتصدر نتائج Google",
          highlight: "ويعمل بسرعة البرق",
          subtitle: "إصلاح شامل لمؤشرات Core Web Vitals وتطبيق أعلى معايير السيو التقني لجلب آلاف الزيارات المجانية.",
          ctaText: "طلب فحص مجاني لموقعك",
          ctaLink: "/contact"
        }
      },
      {
        type: "rich_text",
        data: {
          title: "لماذا تعد سرعة الموقع العامل الأول لمضاعفة مبيعاتك؟",
          content: "<p class='mb-4 text-slate-300 leading-relaxed'>أثبتت تقارير Google الرسمية أن كل ثانية تأخير في تحميل الموقع تؤدي إلى خسارة أكثر من 20% من العملاء المحتملين.</p><p class='text-slate-300 leading-relaxed'>في <strong>Crew5 Agency</strong>، نقوم بإعادة هيكلة الكود، تفعيل التخزين المؤقت المتقدم، وضغط الصور بتقنيات الجيل القادم (Next-Gen WebP) لتحقيق زمن تحميل أقل من ثانية واحدة.</p>"
        }
      },
      { type: "partners", data: {} },
      { type: "cta", data: { title: "هل يعاني موقعك من بطء التحميل أو تراجع الزيارات؟", subtitle: "أرسل رابط موقعك الحالي وسنرسل لك تقريراً شاملاً عن نقاط الضعف وفرص التحسين.", btnText: "طلب تقرير الأداء المجاني", btnLink: "/contact" } }
    ]
  }
];
