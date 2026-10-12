<?php
/**
 * Dynamic SEO Pre-Renderer & Metadata Injector for Crew5 Agency
 * https://crew5.agency
 */

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($requestUri, '/');
if (empty($path)) {
    $path = '/';
}

$baseUrl = 'https://crew5.agency';
$canonicalUrl = $baseUrl . ($path === '/' ? '' : $path);

// Load dynamic data from JSON database if available
$dbPath = __DIR__ . '/server/data/database.json';
$dynamicDb = null;
if (file_exists($dbPath)) {
    $jsonContent = @file_get_contents($dbPath);
    if ($jsonContent) {
        $dynamicDb = json_decode($jsonContent, true);
    }
}

// Default Site Settings
$title = "Crew5 Agency | وكالة كرو فايف للإبداع والتسويق الرقمي والحلول السحابية";
$description = "وكالة رائدة في تطوير المواقع والمتاجر الإلكترونية، بناء الهويات البصرية، الإنتاج المرئي والموشن جرافيك، وإدارة الحملات الإعلانية في السعودية ومصر.";
$ogImage = $baseUrl . "/assets/hero_team.jpg";
$pageType = "website";
$prerenderHtml = "";

// Route matching logic
if ($path === '/' || $path === '') {
    $title = "Crew5 Agency | أفضل وكالة تسويق رقمي وتطوير مواقع في السعودية";
    $description = "نصنع الإبداع الرقمي الذي يقود مستقبلك. شريكك الاستراتيجي في تطوير المواقع، بناء الهويات البصرية، الإنتاج المرئي، وإدارة الحملات الإعلانية بأعلى عائد ROAS.";
    $prerenderHtml = '
        <header style="padding: 40px 20px; text-align: center;">
            <h1 style="font-size: 2.5rem; color: #10B981; margin-bottom: 15px;">وكالة Crew5 Agency - الإبداع والتحول الرقمي</h1>
            <p style="font-size: 1.2rem; color: #CBD5E1; max-width: 800px; margin: 0 auto 25px;">نصنع الإبداع الرقمي الذي يقود مستقبلك. شريكك الاستراتيجي في تطوير المواقع السحابية، بناء الهويات البصرية، والإنتاج السينمائي، وإدارة الحملات الإعلانية لتحقيق أعلى نمو وعائد استثماري.</p>
            <nav style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <a href="/about" style="color: #10B981; text-decoration: underline;">من نحن</a>
                <a href="/services" style="color: #10B981; text-decoration: underline;">خدماتنا</a>
                <a href="/projects" style="color: #10B981; text-decoration: underline;">أعمالنا</a>
                <a href="/blog" style="color: #10B981; text-decoration: underline;">المدونة الرقمية</a>
                <a href="/contact" style="color: #10B981; text-decoration: underline;">تواصل معنا</a>
            </nav>
        </header>
        <main style="padding: 20px; max-width: 1000px; margin: 0 auto;">
            <section style="margin-bottom: 40px;">
                <h2 style="font-size: 1.8rem; color: #F8FAFC;">خدماتنا الرقمية والتسويقية الشاملة</h2>
                <ul>
                    <li><strong>تطوير المواقع والمتاجر الإلكترونية:</strong> حلول سحابية فائقة السرعة مع ربط بوابات الدفع (مدى، أبل باي، تمارا، تابي).</li>
                    <li><strong>بناء وتصميم الهويات البصرية:</strong> شعارات مبتكرة ودليل هوية مؤسسية كامل (Brand Guidelines).</li>
                    <li><strong>تحسين محركات البحث (SEO):</strong> تصدر نتائج جوجل الأولى في السعودية والخليج.</li>
                    <li><strong>الإنتاج المرئي والمونتاج السينمائي:</strong> إعلانات 4K وفيديوهات تيك توك وسناب شات الفيروسية.</li>
                </ul>
            </section>
        </main>
    ';
} elseif ($path === '/about') {
    $title = "من نحن | Crew5 Agency - ريادة التحول الرقمي والإبداع";
    $description = "تعرف على قصة ورؤية وفريق وكالة كرو فايف (Crew5 Agency) في تمكين الشركات والمؤسسات في السعودية ومصر عبر أحدث الحلول الرقمية والتسويقية.";
    $prerenderHtml = '
        <main style="padding: 40px 20px; max-width: 900px; margin: 0 auto;">
            <h1 style="font-size: 2.2rem; color: #10B981;">قصتنا ورؤيتنا لتشكيل المستقبل الرقمي</h1>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #E2E8F0;">بدأنا كفريق شغوف يجمع بين الإبداع البصري والهندسة البرمجية المتقدمة. واليوم، نفخر بخدمة كبرى الشركات الوطنية والمراكز الطبية والمؤسسات التجارية في الرياض وكافة مدن المملكة ومصر، محققين نتائج تتجاوز التوقعات ومواكبين لرؤية السعودية 2030.</p>
        </main>
    ';
} elseif ($path === '/ceo-message') {
    $title = "كلمة الرئيس التنفيذي | Crew5 Agency";
    $description = "الرؤية الاستراتيجية والرسالة القيادية للرئيس التنفيذي لوكالة Crew5 Agency ونظرتنا لقيادة الابتكار والتحول الرقمي.";
    $prerenderHtml = '
        <main style="padding: 40px 20px; max-width: 900px; margin: 0 auto;">
            <h1 style="font-size: 2.2rem; color: #10B981;">كلمة الرئيس التنفيذي وإدارة المشاريع</h1>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #E2E8F0;">في عصر التحول الرقمي ومواكبة لرؤية المملكة 2030، نؤمن بأن كل علامة تجارية تستحق حضوراً رقمياً فريداً يعكس قيمتها الحقيقية ويمنحها الأسبقية في السوق.</p>
        </main>
    ';
} elseif ($path === '/services') {
    $title = "خدماتنا والحلول الرقمية | Crew5 Agency";
    $description = "استعرض كافة خدمات وكالة كرو فايف في البرمجة السحابية، المتاجر الإلكترونية، الهويات البصرية، الإنتاج المرئي، ومحركات البحث SEO.";
    $prerenderHtml = '
        <main style="padding: 40px 20px; max-width: 1000px; margin: 0 auto;">
            <h1 style="font-size: 2.2rem; color: #10B981;">حلول رقمية وتسويقية متكاملة لتحقيق الريادة</h1>
            <p style="font-size: 1.1rem; color: #CBD5E1;">من التصميم إلى التطوير، وصناعة المحتوى، وإدارة الحملات الإعلانية، نقدم خدمات مخصصة تناسب أهدافك وتضمن لك أعلى عائد استثماري.</p>
        </main>
    ';
} elseif ($path === '/projects') {
    $title = "معرض الأعمال والمشاريع | Crew5 Agency";
    $description = "شاهد سابقة أعمال كرو فايف في تصميم وتطوير المواقع والمتاجر، الهويات البصرية، الإعلانات السينمائية، وحملات النمو التوسعية.";
    $prerenderHtml = '
        <main style="padding: 40px 20px; max-width: 1000px; margin: 0 auto;">
            <h1 style="font-size: 2.2rem; color: #10B981;">قصص نجاح ومشاريع نفتخر بصناعتها</h1>
            <p style="font-size: 1.1rem; color: #CBD5E1;">استعرض مجموعة مختارة من المشاريع والهويات البصرية والحملات الإعلانية والمواقع التي طورناها بدقة وإبداع لشركاء نجاحنا في السعودية والخليج ومصر.</p>
        </main>
    ';
} elseif ($path === '/blog') {
    $title = "المدونة الرقمية والأدلة الاستراتيجية | Crew5 Agency";
    $description = "مقالات وأدلة ورؤى تسويقية وتقنية متقدمة يقدمها خبراء وكالة Crew5 حول السيو والتجارة الإلكترونية والتحول الرقمي والهوية البصرية.";
    $prerenderHtml = '
        <main style="padding: 40px 20px; max-width: 1000px; margin: 0 auto;">
            <h1 style="font-size: 2.2rem; color: #10B981;">المدونة الرقمية والرؤى الاستراتيجية</h1>
            <p style="font-size: 1.1rem; color: #CBD5E1;">مقالات متخصصة وأدلة عملية لمساعدتك في فهم أحدث توجهات التسويق، التقنية، وتطوير الأعمال وتصدر محركات البحث.</p>
        </main>
    ';
} elseif ($path === '/contact') {
    $title = "تواصل معنا | Crew5 Agency - الرياض ومصر";
    $description = "احجز جلسة استشارية مع خبراء وكالة Crew5 لبدء مشروعك القادم في البرمجة أو التسويق الرقمي أو الهوية البصرية.";
} elseif ($path === '/estimator') {
    $title = "حاسبة تكلفة المشاريع الرقمية | Crew5 Agency";
    $description = "احسب تكلفة تصميم وتطوير موقعك الإلكتروني أو متجرك أو هويتك البصرية بدقة وشفافية خلال ثوانٍ.";
} elseif ($path === '/audit') {
    $title = "خدمة فحص وتدقيق المواقع والأداء | Crew5 Agency";
    $description = "احصل على فحص مجاني شامل لأداء موقعك، سرعة التحميل، مشاكل السيو التقني، وفرص مضاعفة المبيعات.";
} elseif ($path === '/faq') {
    $title = "الأسئلة الشائعة | Crew5 Agency";
    $description = "إجابات مفصلة على كافة استفسارات التعاقد وآليات التنفيذ والدفع وضمانات الجودة في كرو فايف.";
} elseif ($path === '/privacy-policy') {
    $title = "سياسة الخصوصية | Crew5 Agency";
    $description = "التزام وكالة Crew5 بحماية بيانات المستخدمين والسرية التامة وفق الأنظمة واللوائح السعودية.";
} elseif ($path === '/terms-and-conditions') {
    $title = "الشروط والأحكام | Crew5 Agency";
    $description = "الضوابط والاشتراطات المنظمة لخدمات ومشاريع وكالة Crew5 Agency.";
} elseif (strpos($path, '/blog/') === 0) {
    $pageType = "article";
    $slug = substr($path, strlen('/blog/'));
    
    // Dynamic matching from database or static fallback list
    $foundBlog = null;
    if (!empty($dynamicDb['blogs'])) {
        foreach ($dynamicDb['blogs'] as $b) {
            if (($b['slug'] ?? '') === $slug) {
                $foundBlog = $b;
                break;
            }
        }
    }
    
    if ($foundBlog) {
        $title = $foundBlog['title'] . " | مدونة Crew5 Agency";
        $description = mb_substr(strip_tags($foundBlog['excerpt'] ?? $foundBlog['content'] ?? ''), 0, 160, 'UTF-8');
        if (!empty($foundBlog['imageUrl'])) {
            $ogImage = strpos($foundBlog['imageUrl'], 'http') === 0 ? $foundBlog['imageUrl'] : $baseUrl . $foundBlog['imageUrl'];
        }
        $prerenderHtml = '
            <article style="padding: 40px 20px; max-width: 900px; margin: 0 auto;">
                <h1 style="font-size: 2.2rem; color: #10B981; line-height: 1.4;">' . htmlspecialchars($foundBlog['title']) . '</h1>
                <div style="color: #94A3B8; margin: 15px 0;">تاريخ النشر: ' . htmlspecialchars($foundBlog['date'] ?? '') . ' | القسم: ' . htmlspecialchars($foundBlog['category'] ?? '') . '</div>
                <div style="font-size: 1.1rem; line-height: 1.8; color: #E2E8F0;">' . ($foundBlog['content'] ?? '') . '</div>
            </article>
        ';
    } else {
        $title = "مقال في المدونة | Crew5 Agency";
        $description = "اقرأ أحدث المقالات التقنية والتسويقية على مدونة وكالة كرو فايف الرسمية.";
    }
} elseif (strpos($path, '/projects/') === 0) {
    $slug = substr($path, strlen('/projects/'));
    $foundProj = null;
    if (!empty($dynamicDb['projects'])) {
        foreach ($dynamicDb['projects'] as $p) {
            if (($p['slug'] ?? '') === $slug) {
                $foundProj = $p;
                break;
            }
        }
    }
    
    if ($foundProj) {
        $title = $foundProj['title'] . " | مشاريع Crew5 Agency";
        $description = mb_substr(strip_tags($foundProj['description'] ?? $foundProj['fullDetails'] ?? ''), 0, 160, 'UTF-8');
        if (!empty($foundProj['imageUrl'])) {
            $ogImage = strpos($foundProj['imageUrl'], 'http') === 0 ? $foundProj['imageUrl'] : $baseUrl . $foundProj['imageUrl'];
        }
        $prerenderHtml = '
            <article style="padding: 40px 20px; max-width: 900px; margin: 0 auto;">
                <h1 style="font-size: 2.2rem; color: #10B981;">' . htmlspecialchars($foundProj['title']) . '</h1>
                <p style="font-size: 1.1rem; color: #CBD5E1;">' . htmlspecialchars($foundProj['description'] ?? '') . '</p>
                <div>' . htmlspecialchars($foundProj['fullDetails'] ?? '') . '</div>
            </article>
        ';
    } else {
        $title = "مشروع | Crew5 Agency";
        $description = "استعرض تفاصيل هذا المشروع المطور بواسطة وكالة Crew5 Agency.";
    }
} elseif (strpos($path, '/services/') === 0) {
    $slug = substr($path, strlen('/services/'));
    $title = "خدمة مخصصة | Crew5 Agency";
    $description = "تعرف على تفاصيل ومزايا هذه الخدمة الرقمية المخصصة من وكالة Crew5 Agency.";
} elseif (strpos($path, '/p/') === 0) {
    $slug = substr($path, strlen('/p/'));
    $title = "صفحة خاصة | Crew5 Agency";
    $description = "استعرض هذه الصفحة المخصصة من وكالة كرو فايف للحلول الرقمية.";
}

// Generate JSON-LD Structured Data
$jsonLdData = [
    "@context" => "https://schema.org",
    "@type" => "Organization",
    "name" => "Crew5 Agency",
    "alternateName" => "وكالة كرو فايف للإبداع والتسويق الرقمي",
    "url" => "https://crew5.agency",
    "logo" => "https://crew5.agency/assets/android-chrome-512x512-D4InYTxG.png",
    "contactPoint" => [
        "@type" => "ContactPoint",
        "telephone" => "+966512345678",
        "contactType" => "customer service",
        "areaServed" => ["SA", "EG", "AE", "KW", "QA"],
        "availableLanguage" => ["Arabic", "English"]
    ],
    "sameAs" => [
        "https://twitter.com/crew5agency",
        "https://www.instagram.com/crew5agency",
        "https://www.linkedin.com/company/crew5agency"
    ]
];

$jsonLdString = json_encode($jsonLdData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

// Load index.html template
$templateFile = __DIR__ . '/index.html';
if (!file_exists($templateFile)) {
    $templateFile = __DIR__ . '/dist/index.html';
}

if (file_exists($templateFile)) {
    $html = file_get_contents($templateFile);

    // Replace Title
    $html = preg_replace('/<title>(.*?)<\/title>/is', '<title>' . htmlspecialchars($title) . '</title>', $html);
    $html = preg_replace('/<meta name="title" content="(.*?)" \/>/is', '<meta name="title" content="' . htmlspecialchars($title) . '" />', $html);

    // Replace Description
    $html = preg_replace('/<meta name="description" content="(.*?)" \/>/is', '<meta name="description" content="' . htmlspecialchars($description) . '" />', $html);

    // Replace OG Tags
    $html = preg_replace('/<meta property="og:title" content="(.*?)" \/>/is', '<meta property="og:title" content="' . htmlspecialchars($title) . '" />', $html);
    $html = preg_replace('/<meta property="og:description" content="(.*?)" \/>/is', '<meta property="og:description" content="' . htmlspecialchars($description) . '" />', $html);
    $html = preg_replace('/<meta property="og:url" content="(.*?)" \/>/is', '<meta property="og:url" content="' . htmlspecialchars($canonicalUrl) . '" />', $html);
    $html = preg_replace('/<meta property="og:image" content="(.*?)" \/>/is', '<meta property="og:image" content="' . htmlspecialchars($ogImage) . '" />', $html);

    // Inject Canonical URL Tag
    if (strpos($html, '<link rel="canonical"') === false) {
        $canonicalTag = '<link rel="canonical" href="' . htmlspecialchars($canonicalUrl) . '" />';
        $html = str_replace('</head>', "    {$canonicalTag}\n  </head>", $html);
    } else {
        $html = preg_replace('/<link rel="canonical" href="(.*?)" \/>/is', '<link rel="canonical" href="' . htmlspecialchars($canonicalUrl) . '" />', $html);
    }

    // Inject JSON-LD Schema
    $schemaTag = "<script type=\"application/ld+json\">\n{$jsonLdString}\n</script>";
    $html = str_replace('</head>', "    {$schemaTag}\n  </head>", $html);

    // Inject Prerendered HTML inside <div id="root">
    if (!empty($prerenderHtml)) {
        $html = str_replace('<div id="root"></div>', '<div id="root">' . $prerenderHtml . '</div>', $html);
    }

    header('Content-Type: text/html; charset=UTF-8');
    echo $html;
    exit;
}

// Fallback HTML if index.html is missing
header('Content-Type: text/html; charset=UTF-8');
echo "<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><title>" . htmlspecialchars($title) . "</title><meta name=\"description\" content=\"" . htmlspecialchars($description) . "\"></head><body><div id=\"root\">{$prerenderHtml}</div></body></html>";
