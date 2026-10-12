import crypto from 'crypto';

// Secret key for HMAC token signing (can be overridden via environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'crew5_agency_secure_jwt_secret_key_2026_@!';

/**
 * 1. Strong Password Hashing with PBKDF2 & Salt
 */
export function hashPassword(plainPassword) {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(plainPassword, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a stored hash or legacy plain-text
 */
export function verifyPassword(plainPassword, storedHashOrPlain) {
  if (!plainPassword || !storedHashOrPlain) return false;

  // If stored format is salt:hash
  if (storedHashOrPlain.includes(':')) {
    const [salt, originalHash] = storedHashOrPlain.split(':');
    if (!salt || !originalHash) return false;
    
    try {
      const computedHash = crypto.pbkdf2Sync(plainPassword, salt, 10000, 64, 'sha512').toString('hex');
      const bufA = Buffer.from(computedHash, 'hex');
      const bufB = Buffer.from(originalHash, 'hex');
      if (bufA.length !== bufB.length) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    } catch (e) {
      return false;
    }
  }

  // Legacy plain-text fallback (allows seamless migration)
  return plainPassword === storedHashOrPlain;
}

/**
 * 2. Cryptographically Signed Session Token
 */
export function createAuthToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'super_admin',
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiration
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  if (!encodedPayload || !signature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const bufA = Buffer.from(signature);
  const bufB = Buffer.from(expectedSignature);
  if (bufA.length !== bufB.length) return null;
  if (!crypto.timingSafeEqual(bufA, bufB)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * 3. Authentication & Role Authorization Middleware
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'غير مصرح: يجب تسجيل الدخول للوصول لهذا المورد' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  const decoded = verifyAuthToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: 'جلسة الدخول منتهية أو غير صالحة، يرجى تسجيل الدخول مجدداً' });
  }

  req.user = decoded;
  next();
}

/**
 * 4. Comprehensive Role Definitions, Permissions & Department Rules Matrix
 */
export const ROLE_DEFINITIONS = {
  super_admin: {
    title: 'مدير عام النظام',
    titleEn: 'Super Administrator',
    department: 'الإدارة العليا والتنفيذية',
    badge: '👑 Super Admin',
    permissions: [
      'users_manage', 'security_audit', 'settings_manage', 'pages_builder',
      'components_manage', 'projects_manage', 'blogs_manage', 'services_manage',
      'messages_manage', 'sales_manage', 'discounts_unlimited', 'delete_records'
    ],
    rules: [
      'مسؤولية كاملة عن حفظ واسترجاع النسخ الاحتياطية وإدارة خوادم النظام',
      'حظر مشاركة بيانات تسجيل الدخول أو الرموز السرية مع أي طرف ثالث',
      'إلزامية مراجعة سجلات التدقيق الأمني ومحاولات الدخول المشبوهة دورياً'
    ]
  },
  admin: {
    title: 'مشرف عام',
    titleEn: 'General Administrator',
    department: 'إدارة العمليات والمشاريع',
    badge: '🛡️ Admin',
    permissions: [
      'projects_manage', 'blogs_manage', 'services_manage', 'messages_manage',
      'testimonials_manage', 'sections_manage', 'client_tracker', 'users_view'
    ],
    rules: [
      'مراجعة وتدقيق المشاريع والمقالات قبل نشرها العام للمستخدمين',
      'متابعة الرسائل الواردة وحل استفسارات العملاء والتنسيق مع الفريق',
      'لا يحق له تغيير إعدادات الأمان الحساسة أو حذف حسابات المدراء العامين'
    ]
  },
  sales_manager: {
    title: 'مدير المبيعات والتعاقدات',
    titleEn: 'Sales & Commercial Manager',
    department: 'قسم المبيعات وتطوير الأعمال',
    badge: '💼 Sales Manager',
    permissions: [
      'messages_manage', 'client_tracker', 'testimonials_view', 'estimator_leads',
      'quotes_create', 'discount_up_to_15', 'deals_assign', 'team_view'
    ],
    rules: [
      'اعتماد عروض الأسعار الرسمية الصالحة لمدة 14 يوم عمل',
      'الالتزام بهيكل الدفعات المعتمد (50% مقدم، 30% مرحلية، 20% ختامية)',
      'سقف الخصومات المسموح: 15% للمشاريع السنوية والتعاقدات الكبرى',
      'سرعة الاستجابة لطلبات حاسبة التكلفة وحجز الاستشارات خلال 30 دقيقة',
      'الالتزام الصارم بميثاق السرية التامة وحماية بيانات العملاء (NDA)'
    ]
  },
  sales: {
    title: 'مسؤول مبيعات وعلاقات عملاء',
    titleEn: 'Sales Specialist',
    department: 'قسم المبيعات',
    badge: '📈 Sales Specialist',
    permissions: [
      'messages_manage', 'client_tracker_view', 'estimator_leads',
      'quotes_create', 'discount_up_to_5'
    ],
    rules: [
      'التواصل الفوري مع العملاء الجدد خلال 15 دقيقة عبر واتساب أو الهاتف',
      'سقف الخصومات المسموح: 5% فقط للباقات والخدمات المحددة',
      'حظر حذف أي رسالة أو طلب استشارة بدون إذن مدير المبيعات',
      'توثيق نطاق العمل (SOW) وتوضيح جولات التعديل الـ 3 المعتمدة للعميل'
    ]
  },
  marketing_manager: {
    title: 'مدير التسويق والنمو',
    titleEn: 'Marketing & Growth Director',
    department: 'قسم التسويق والنمو الرقمي',
    badge: '📢 Marketing Manager',
    permissions: [
      'blogs_manage', 'projects_manage', 'testimonials_manage', 'sections_manage',
      'seo_optimize', 'analytics_view', 'team_view'
    ],
    rules: [
      'الإشراف الكامل على استراتيجية الـ SEO والكلمات المفتاحية والروابط',
      'اعتماد الهوية البصرية ونبرة الصوت الإعلانية للوكالة (Brand Voice)',
      'تحسين معدلات التحويل ومتابعة أداء الحملات التسويقية والزيارات',
      'حظر الوصول لصناديق الرسائل المالية والبيانات الإدارية الخاصة'
    ]
  },
  marketing: {
    title: 'أخصائي تسويق ومحتوى',
    titleEn: 'Marketing Specialist',
    department: 'قسم التسويق',
    badge: '🎯 Marketing Specialist',
    permissions: [
      'blogs_create_edit', 'projects_view_edit', 'testimonials_create', 'sections_view'
    ],
    rules: [
      'كتابة وتنسيق المقالات وفق أفضل معايير تحسين محركات البحث (SEO)',
      'التأكد من خلو الصور والمقالات من حقوق ملكية فكرية غير مرخصة',
      'تحديث معرض الأعمال ونشر دراسات الحالة الحديثة للعملاء'
    ]
  },
  editor: {
    title: 'محرر محتوى وكاتب مقالات',
    titleEn: 'Content Creator & Editor',
    department: 'صناعة المحتوى والترجمة',
    badge: '✍️ Editor',
    permissions: [
      'blogs_create_edit', 'projects_content_edit', 'services_view'
    ],
    rules: [
      'التدقيق اللغوي والإملائي لكافة المقالات قبل النشر',
      'توفير الترجمة الإنجليزية الدقيقة للمحتوى العربي',
      'حظر الوصول لإعدادات النظام أو الرسائل أو المبيعات'
    ]
  },
  viewer: {
    title: 'مستعرض (اطلاع فقط)',
    titleEn: 'Viewer & Auditor',
    department: 'المستعرضين والمتدربين',
    badge: '👁️ Viewer',
    permissions: [
      'dashboard_view', 'projects_view', 'blogs_view', 'analytics_view'
    ],
    rules: [
      'صلاحية القراءة فقط لكافة البيانات المتاحة',
      'حظر تام لأي تعديل أو حذف أو تصدير بيانات حساسة'
    ]
  }
};

export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'غير مصرح' });
    }

    const userRole = (req.user.role || '').toLowerCase();
    const isSuperAdmin = userRole === 'super_admin' || userRole === 'super admin';

    if (isSuperAdmin) {
      return next(); // Super Admin always has full bypass
    }

    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());
    if (normalizedAllowed.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'ليس لديك الصلاحيات الكافية لتنفيذ هذا الإجراء'
    });
  };
}

/**
 * 4. Security HTTP Headers Middleware (OWASP Standard)
 */
export function securityHeadersMiddleware(req, res, next) {
  // Hide server technology
  res.removeHeader('X-Powered-By');

  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // XSS Protection for older browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // HSTS (HTTP Strict Transport Security)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "img-src 'self' data: https: blob: /uploads/; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "connect-src 'self' https: http: ws: wss:; " +
    "frame-ancestors 'self';"
  );

  next();
}

/**
 * 5. Rate Limiting Middleware (Memory Token Bucket)
 */
export function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 10, message = 'تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً' } = {}) {
  const requests = new Map();

  // Periodic cleanup of expired records every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests.entries()) {
      if (now > data.resetTime) {
        requests.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    let record = requests.get(ip);
    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
      requests.set(ip, record);
    } else {
      record.count += 1;
    }

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
      });
    }

    next();
  };
}

/**
 * 6. File Upload Whitelist & Sanitization
 */
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.pdf', '.mp4', '.mov']);
const DANGEROUS_EXTENSIONS = new Set(['.php', '.phtml', '.exe', '.sh', '.bat', '.cmd', '.js', '.vbs', '.py', '.pl', '.cgi', '.html', '.htm']);

export function validateUploadFile(filename, sizeBytes) {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  
  if (DANGEROUS_EXTENSIONS.has(ext)) {
    return { valid: false, error: 'الملفات التنفيذية والبرمجية محظورة لأسباب أمنية' };
  }

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return { valid: false, error: `نوع الملف غير مدعوم. الأنواع المسموحة: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}` };
  }

  // Max 25 MB
  if (sizeBytes > 25 * 1024 * 1024) {
    return { valid: false, error: 'حجم الملف يتجاوز الحد الأقصى المسموح (25 ميجابايت)' };
  }

  return { valid: true };
}

export function sanitizeFilename(originalName) {
  const ext = originalName.slice(originalName.lastIndexOf('.')).toLowerCase();
  const baseName = originalName.slice(0, originalName.lastIndexOf('.'));
  const cleanBase = baseName
    .replace(/[^a-zA-Z0-9_\u0600-\u06FF-]/g, '_')
    .replace(/_{2,}/g, '_')
    .slice(0, 50);
  return `${cleanBase || 'file'}_${Date.now()}${ext}`;
}
