import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { db } from './db.js';
import {
  hashPassword,
  verifyPassword,
  createAuthToken,
  requireAuth,
  requireRole,
  securityHeadersMiddleware,
  createRateLimiter,
  validateUploadFile,
  sanitizeFilename
} from './security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Apply Security HTTP Headers globally (OWASP standards)
app.use(securityHeadersMiddleware);

// 2. Enable CORS
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Security Rate Limiters
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 15, // max 15 login attempts per IP
  message: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول، يرجى الانتظار 15 دقيقة قبل المحاولة مجدداً'
});

const publicFormLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // max 30 submissions per hour
  message: 'تم تجاوز الحد المسموح لإرسال النماذج، يرجى المحاولة لاحقاً'
});

const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 min
  max: 500, // max 500 requests per minute
  message: 'طلبات كثيرة جداً، يرجى الانتظار قليلاً'
});

app.use('/api/', apiLimiter);

// 4. Multer Storage Configuration for Secure Uploads
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, sanitizeFilename(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
  fileFilter: (req, file, cb) => {
    const validation = validateUploadFile(file.originalname, 0);
    if (!validation.valid) {
      return cb(new Error(validation.error));
    }
    cb(null, true);
  }
});

// Serve static uploads
app.use('/uploads', express.static(uploadDir));

// --- API ROUTES ---

// 1. Auth Routes
app.post('/api/auth/login', authLimiter, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const user = db.getUserByEmail(email);

  if (!user) {
    db.addAuditLog({
      action: 'login_failed',
      userEmail: email,
      userName: 'مجهول',
      details: 'محاولة تسجيل دخول فاشلة (البريد غير مسجل)',
      ip: clientIp,
      status: 'failed'
    });
    return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  }

  if (user.status === 'suspended') {
    db.addAuditLog({
      action: 'login_blocked',
      userEmail: email,
      userName: user.name,
      details: 'محاولة تسجيل دخول لحساب معطل',
      ip: clientIp,
      status: 'blocked'
    });
    return res.status(403).json({ success: false, message: 'تم تعطيل هذا الحساب من قِبل الإدارة، يرجى مراجعة المشرف العام' });
  }

  const isValid = verifyPassword(password, user.password);
  if (!isValid) {
    db.addAuditLog({
      action: 'login_failed',
      userEmail: email,
      userName: user.name,
      details: 'محاولة تسجيل دخول فاشلة (كلمة المرور خاطئة)',
      ip: clientIp,
      status: 'failed'
    });
    return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  }

  // Auto-migrate legacy password to salted PBKDF2 hash if needed
  if (!user.password.includes(':')) {
    user.password = hashPassword(password);
    db.save();
  }

  // Update last login
  user.lastLogin = new Date().toISOString();
  user.lastLoginIp = clientIp;
  db.save();

  // Log success audit
  db.addAuditLog({
    action: 'login_success',
    userEmail: user.email,
    userName: user.name,
    details: 'تسجيل دخول ناجح إلى لوحة التحكم',
    ip: clientIp,
    status: 'success'
  });

  const token = createAuthToken(user);
  const { password: _, ...safeUser } = user;

  return res.json({
    success: true,
    token,
    user: safeUser
  });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.getUserById(req.user.id) || db.getUserByEmail(req.user.email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'غير مصرح أو المستخدم غير موجود' });
  }
  return res.json({
    success: true,
    user
  });
});

app.put('/api/auth/update-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'يرجى إدخال كلمة المرور الحالية والجديدة' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'يجب أن لا تقل كلمة المرور عن 6 خانات' });
  }

  const userInDb = (db.data.users || []).find(u => u.id == req.user.id || u.email.toLowerCase() === req.user.email.toLowerCase());
  if (!userInDb) {
    return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
  }

  if (!verifyPassword(currentPassword, userInDb.password)) {
    return res.status(400).json({ success: false, message: 'كلمة المرور الحالية غير صحيحة' });
  }

  userInDb.password = hashPassword(newPassword);
  userInDb.updatedAt = new Date().toISOString();
  db.save();

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  db.addAuditLog({
    action: 'password_updated',
    userEmail: userInDb.email,
    userName: userInDb.name,
    details: 'تم تحديث كلمة المرور للحساب بنجاح',
    ip: clientIp,
    status: 'success'
  });

  return res.json({ success: true, message: 'تم تحديث كلمة المرور بنجاح' });
});

// 2. User Management Endpoints (Super Admin & Admin only)
app.get('/api/users', requireAuth, requireRole(['super_admin', 'admin']), (req, res) => {
  res.json({ success: true, data: db.getUsers() });
});

app.get('/api/users/:id', requireAuth, requireRole(['super_admin', 'admin']), (req, res) => {
  const user = db.getUserById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
  res.json({ success: true, data: user });
});

app.post('/api/users', requireAuth, requireRole(['super_admin']), (req, res) => {
  const { email, name, role, password, phone, avatar, status } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'يرجى إدخال بريد إلكتروني صالح' });
  }

  if (db.getUserByEmail(email)) {
    return res.status(400).json({ success: false, message: 'البريد الإلكتروني مسجل بالفعل لمستخدم آخر' });
  }

  const newUser = db.createUser({
    email,
    name: name || 'مشرف جديد',
    role: role || 'admin',
    password: password || 'crew5@123456',
    phone: phone || '',
    avatar: avatar || '/assets/avatar_2.jpg',
    status: status || 'active'
  });

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  db.addAuditLog({
    action: 'user_created',
    userEmail: req.user.email,
    userName: req.user.name,
    details: `تم إنشاء حساب مستخدم جديد: ${newUser.name} (${newUser.email}) بصلاحية ${newUser.role}`,
    ip: clientIp,
    status: 'success'
  });

  res.status(201).json({ success: true, data: newUser, message: 'تم إنشاء المستخدم بنجاح' });
});

app.put('/api/users/:id', requireAuth, requireRole(['super_admin', 'admin']), (req, res) => {
  const target = db.getUserById(req.params.id);
  if (!target) return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });

  // Non-super-admins cannot edit other super-admins
  if (target.role === 'super_admin' && req.user.role !== 'super_admin' && req.user.id != target.id) {
    return res.status(403).json({ success: false, message: 'لا يمكنك تعديل بيانات المشرف العام' });
  }

  const updated = db.updateUser(req.params.id, req.body);
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  db.addAuditLog({
    action: 'user_updated',
    userEmail: req.user.email,
    userName: req.user.name,
    details: `تم تعديل بيانات المستخدم: ${updated.name} (${updated.email})`,
    ip: clientIp,
    status: 'success'
  });

  res.json({ success: true, data: updated, message: 'تم تحديث بيانات المستخدم بنجاح' });
});

app.put('/api/users/:id/password', requireAuth, requireRole(['super_admin']), (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'يجب أن لا تقل كلمة المرور عن 6 خانات' });
  }

  const target = db.getUserById(req.params.id);
  if (!target) return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });

  db.updateUser(req.params.id, { password: newPassword });
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  db.addAuditLog({
    action: 'admin_password_reset',
    userEmail: req.user.email,
    userName: req.user.name,
    details: `تمت إعادة تعيين كلمة مرور المستخدم: ${target.name} (${target.email})`,
    ip: clientIp,
    status: 'success'
  });

  res.json({ success: true, message: 'تمت إعادة تعيين كلمة المرور بنجاح' });
});

app.delete('/api/users/:id', requireAuth, requireRole(['super_admin']), (req, res) => {
  if (req.params.id == req.user.id) {
    return res.status(400).json({ success: false, message: 'لا يمكنك حذف حسابك الشخصي أثناء تسجيل الدخول به' });
  }

  const allUsers = db.data.users || [];
  const superAdmins = allUsers.filter(u => u.role === 'super_admin');
  const target = db.getUserById(req.params.id);

  if (!target) return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });

  if (target.role === 'super_admin' && superAdmins.length <= 1) {
    return res.status(400).json({ success: false, message: 'لا يمكن حذف المدير العام الأخير في النظام' });
  }

  db.deleteUser(req.params.id);
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  db.addAuditLog({
    action: 'user_deleted',
    userEmail: req.user.email,
    userName: req.user.name,
    details: `تم حذف المستخدم: ${target.name} (${target.email})`,
    ip: clientIp,
    status: 'warning'
  });

  res.json({ success: true, message: 'تم حذف المستخدم بنجاح' });
});

// 3. Security Audit Logs & Stats
app.get('/api/audit-logs', requireAuth, requireRole(['super_admin', 'admin']), (req, res) => {
  res.json({ success: true, data: db.getAuditLogs(150) });
});

app.get('/api/security/stats', requireAuth, (req, res) => {
  const users = db.getUsers();
  const logs = db.getAuditLogs(200);
  const activeUsers = users.filter(u => u.status === 'active').length;
  const superAdmins = users.filter(u => u.role === 'super_admin').length;
  const failedLogins24h = logs.filter(l => l.action === 'login_failed').length;

  res.json({
    success: true,
    data: {
      totalUsers: users.length,
      activeUsers,
      superAdmins,
      failedLogins24h,
      securityScore: 99,
      features: {
        rateLimiting: true,
        passwordHashing: 'PBKDF2-SHA512 (10,000 Iterations)',
        tokenType: 'HMAC-SHA256 Cryptographic Signature',
        tokenExpiration: '7 Days',
        securityHeaders: true,
        cspEnabled: true,
        antiClickjacking: true,
        uploadFilter: true
      }
    }
  });
});

// 4. Stats Route
app.get('/api/stats', (req, res) => {
  const projects = db.get('projects');
  const blogs = db.get('blogs');
  const messages = db.get('messages');
  const services = db.get('servicesCategories');
  const team = db.get('team');
  const testimonials = db.get('testimonials');
  const users = db.getUsers();

  const unreadMessages = messages.filter(m => m.status === 'new').length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0) + 4200;

  res.json({
    success: true,
    data: {
      totalProjects: projects.length,
      totalBlogs: blogs.length,
      totalMessages: messages.length,
      unreadMessages,
      totalServices: services.reduce((acc, c) => acc + (c.services ? c.services.length : 0), 0),
      totalTeam: team.length,
      totalTestimonials: testimonials.length,
      totalUsers: users.length,
      totalViews,
      recentMessages: messages.slice(0, 5)
    }
  });
});

// 5. Projects Endpoints (CRUD)
app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: db.get('projects') });
});

app.get('/api/projects/:id', (req, res) => {
  const project = db.getById('projects', req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });
  res.json({ success: true, data: project });
});

app.post('/api/projects', requireAuth, (req, res) => {
  const newProject = db.insert('projects', req.body);
  res.status(201).json({ success: true, data: newProject });
});

app.put('/api/projects/:id', requireAuth, (req, res) => {
  const updated = db.update('projects', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });
  res.json({ success: true, data: updated });
});

app.delete('/api/projects/:id', requireAuth, (req, res) => {
  const deleted = db.delete('projects', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });
  res.json({ success: true, message: 'تم حذف المشروع بنجاح' });
});

// 6. Blogs Endpoints (CRUD)
app.get('/api/blogs', (req, res) => {
  res.json({ success: true, data: db.get('blogs') });
});

app.get('/api/blogs/:slugOrId', (req, res) => {
  const blogs = db.get('blogs');
  const blog = blogs.find(b => b.slug === req.params.slugOrId || b.id == req.params.slugOrId);
  if (!blog) return res.status(404).json({ success: false, message: 'المقال غير موجود' });
  
  // Increment view count
  blog.views = (blog.views || 0) + 1;
  db.save();

  res.json({ success: true, data: blog });
});

app.post('/api/blogs', requireAuth, (req, res) => {
  const newBlog = db.insert('blogs', req.body);
  res.status(201).json({ success: true, data: newBlog });
});

app.put('/api/blogs/:id', requireAuth, (req, res) => {
  const updated = db.update('blogs', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'المقال غير موجود' });
  res.json({ success: true, data: updated });
});

app.delete('/api/blogs/:id', requireAuth, (req, res) => {
  const deleted = db.delete('blogs', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'المقال غير موجود' });
  res.json({ success: true, message: 'تم حذف المقال بنجاح' });
});

// 7. Services Endpoints (CRUD)
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: db.get('servicesCategories') });
});

app.put('/api/services', requireAuth, (req, res) => {
  db.data.servicesCategories = req.body;
  db.save();
  res.json({ success: true, data: db.data.servicesCategories });
});

// 8. Messages / Contact Inquiries (CRUD)
app.get('/api/messages', requireAuth, (req, res) => {
  res.json({ success: true, data: db.get('messages') });
});

app.post('/api/messages', publicFormLimiter, (req, res) => {
  const { name, email, phone, service, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'يرجى تعبئة الحقول المطلوبة' });
  }
  const newMsg = db.insert('messages', {
    name,
    email,
    phone: phone || '',
    service: service || 'عام',
    message,
    status: 'new'
  });

  triggerInstantAlert('📩 رسالة جديدة من نموذج التواصل', {
    name,
    email,
    phone,
    service,
    message
  });

  res.status(201).json({ success: true, data: newMsg, message: 'تم إرسال رسالتك بنجاح' });
});

app.put('/api/messages/:id/status', requireAuth, (req, res) => {
  const { status } = req.body;
  const updated = db.update('messages', req.params.id, { status });
  if (!updated) return res.status(404).json({ success: false, message: 'الرسالة غير موجودة' });
  res.json({ success: true, data: updated });
});

app.delete('/api/messages/:id', requireAuth, (req, res) => {
  const deleted = db.delete('messages', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'الرسالة غير موجودة' });
  res.json({ success: true, message: 'تم حذف الرسالة بنجاح' });
});

// 9. Testimonials (CRUD)
app.get('/api/testimonials', (req, res) => {
  res.json({ success: true, data: db.get('testimonials') });
});

app.post('/api/testimonials', requireAuth, (req, res) => {
  const newItem = db.insert('testimonials', req.body);
  res.status(201).json({ success: true, data: newItem });
});

app.put('/api/testimonials/:id', requireAuth, (req, res) => {
  const updated = db.update('testimonials', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'التقييم غير موجود' });
  res.json({ success: true, data: updated });
});

app.delete('/api/testimonials/:id', requireAuth, (req, res) => {
  const deleted = db.delete('testimonials', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'التقييم غير موجود' });
  res.json({ success: true, message: 'تم حذف التقييم بنجاح' });
});

// 10. Team (CRUD)
app.get('/api/team', (req, res) => {
  res.json({ success: true, data: db.get('team') });
});

app.post('/api/team', requireAuth, (req, res) => {
  const newItem = db.insert('team', req.body);
  res.status(201).json({ success: true, data: newItem });
});

app.put('/api/team/:id', requireAuth, (req, res) => {
  const updated = db.update('team', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'العضو غير موجود' });
  res.json({ success: true, data: updated });
});

app.delete('/api/team/:id', requireAuth, (req, res) => {
  const deleted = db.delete('team', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'العضو غير موجود' });
  res.json({ success: true, message: 'تم حذف عضو الفريق بنجاح' });
});

// 11. Site Settings
app.get('/api/settings', (req, res) => {
  res.json({ success: true, data: db.getSettings() });
});

app.put('/api/settings', requireAuth, (req, res) => {
  const updated = db.updateSettings(req.body);
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  db.addAuditLog({
    action: 'settings_updated',
    userEmail: req.user?.email || 'admin',
    userName: req.user?.name || 'المشرف',
    details: 'تم تحديث إعدادات النظام والفروع',
    ip: clientIp,
    status: 'success'
  });
  res.json({ success: true, data: updated });
});

// 12. Secure File Upload Endpoint
app.post('/api/upload', requireAuth, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message || 'فشل رفع الملف' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'لم يتم إرفاق أي ملف' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      fileUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  });
});

// 13. Custom & Global Components (CRUD & Page Inserter)
app.get('/api/components', (req, res) => {
  res.json({ success: true, data: db.get('customComponents') });
});

app.get('/api/components/:id', (req, res) => {
  const item = db.getById('customComponents', req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'المكون غير موجود' });
  res.json({ success: true, data: item });
});

app.post('/api/components', requireAuth, (req, res) => {
  const newItem = db.insert('customComponents', {
    ...req.body,
    isGlobal: req.body.isGlobal || false,
    isEnabled: req.body.isEnabled !== undefined ? req.body.isEnabled : true
  });
  res.status(201).json({ success: true, data: newItem });
});

app.put('/api/components/:id', requireAuth, (req, res) => {
  const updated = db.update('customComponents', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'المكون غير موجود' });
  res.json({ success: true, data: updated });
});

app.delete('/api/components/:id', requireAuth, (req, res) => {
  const deleted = db.delete('customComponents', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'المكون غير موجود' });
  res.json({ success: true, message: 'تم حذف المكون بنجاح' });
});

app.put('/api/components/:id/toggle-global', requireAuth, (req, res) => {
  const comp = db.getById('customComponents', req.params.id);
  if (!comp) return res.status(404).json({ success: false, message: 'المكون غير موجود' });
  const updated = db.update('customComponents', req.params.id, { isGlobal: !comp.isGlobal });
  res.json({ success: true, data: updated });
});

app.post('/api/components/:id/insert-to-page', requireAuth, (req, res) => {
  const { pageSlugOrId, position = 'bottom' } = req.body;
  const comp = db.getById('customComponents', req.params.id);
  if (!comp) return res.status(404).json({ success: false, message: 'المكون غير موجود' });

  const pages = db.get('pages');
  const pageIndex = pages.findIndex(p => p.slug === pageSlugOrId || p.id == pageSlugOrId);
  if (pageIndex === -1) {
    return res.status(404).json({ success: false, message: 'الصفحة المحددة غير موجودة' });
  }

  const page = pages[pageIndex];
  const blocks = Array.isArray(page.blocks) ? [...page.blocks] : [];

  const newBlock = {
    type: 'custom_component',
    componentId: comp.id,
    name: comp.name,
    componentType: comp.type,
    data: JSON.parse(JSON.stringify(comp.data || {}))
  };

  if (position === 'top') {
    blocks.unshift(newBlock);
  } else if (position === 'after_hero') {
    const heroIdx = blocks.findIndex(b => b.type === 'hero');
    if (heroIdx !== -1) {
      blocks.splice(heroIdx + 1, 0, newBlock);
    } else {
      blocks.unshift(newBlock);
    }
  } else if (position === 'middle') {
    const midIdx = Math.floor(blocks.length / 2);
    blocks.splice(midIdx, 0, newBlock);
  } else {
    // default 'bottom' - before last CTA if exists
    const ctaIdx = blocks.map(b => b.type).lastIndexOf('cta');
    if (ctaIdx !== -1) {
      blocks.splice(ctaIdx, 0, newBlock);
    } else {
      blocks.push(newBlock);
    }
  }

  const updatedPage = db.update('pages', page.id, { blocks });
  res.json({ 
    success: true, 
    message: `تم إدراج المكون "${comp.name}" بنجاح في صفحة "${page.title}"`,
    data: { page: updatedPage, component: comp }
  });
});

// 14. Custom Pages (Page Builder CRUD)
app.get('/api/pages', (req, res) => {
  res.json({ success: true, data: db.get('pages') });
});

app.get('/api/pages/:slugOrId', (req, res) => {
  const pages = db.get('pages');
  const page = pages.find(p => p.slug === req.params.slugOrId || p.id == req.params.slugOrId);
  if (!page) return res.status(404).json({ success: false, message: 'الصفحة غير موجودة' });
  res.json({ success: true, data: page });
});

app.post('/api/pages', requireAuth, (req, res) => {
  const newPage = db.insert('pages', {
    ...req.body,
    isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
    blocks: req.body.blocks || []
  });
  res.status(201).json({ success: true, data: newPage });
});

app.put('/api/pages/:id', requireAuth, (req, res) => {
  const updated = db.update('pages', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'الصفحة غير موجودة' });
  res.json({ success: true, data: updated });
});

app.delete('/api/pages/:id', requireAuth, (req, res) => {
  const deleted = db.delete('pages', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'الصفحة غير موجودة' });
  res.json({ success: true, message: 'تم حذف الصفحة بنجاح' });
});

// 15. Client Projects & Milestone Tracking
app.get('/api/client-projects', (req, res) => {
  res.json({ success: true, data: db.get('clientProjects') });
});

app.get('/api/client-projects/:codeOrId', (req, res) => {
  const list = db.get('clientProjects');
  const param = req.params.codeOrId.trim().toUpperCase();
  const item = list.find(p => (p.code && p.code.toUpperCase() === param) || p.id == req.params.codeOrId);
  if (!item) return res.status(404).json({ success: false, message: 'المشروع غير موجود، يرجى التأكد من الرمز' });
  res.json({ success: true, data: item });
});

app.post('/api/client-projects', requireAuth, (req, res) => {
  const code = req.body.code || `CREW-${Math.floor(1000 + Math.random() * 9000)}`;
  const newProject = db.insert('clientProjects', {
    ...req.body,
    code,
    progress: req.body.progress || 0,
    status: req.body.status || 'planning',
    milestones: req.body.milestones || [],
    deliverables: req.body.deliverables || [],
    notes: req.body.notes || []
  });
  res.status(201).json({ success: true, data: newProject });
});

app.put('/api/client-projects/:id', requireAuth, (req, res) => {
  const updated = db.update('clientProjects', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });
  res.json({ success: true, data: updated });
});

// Client Milestone Approval Endpoint
app.post('/api/client-projects/:id/milestones/:milestoneId/approve', (req, res) => {
  const project = db.getById('clientProjects', req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });

  const milestones = Array.isArray(project.milestones) ? [...project.milestones] : [];
  const targetMilestone = milestones.find(m => String(m.id) === String(req.params.milestoneId));
  if (!targetMilestone) {
    return res.status(404).json({ success: false, message: 'المرحلة غير موجودة' });
  }

  targetMilestone.status = 'completed';
  targetMilestone.approvedByClient = true;
  targetMilestone.approvedAt = new Date().toISOString();

  // Auto calculate progress based on completed milestones
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const newProgress = Math.round((completedCount / milestones.length) * 100);

  // Add system note
  const notes = Array.isArray(project.notes) ? [...project.notes] : [];
  notes.unshift({
    id: Date.now(),
    author: 'العميل (Client Approval)',
    text: `تم اعتماد المرحلة: "${targetMilestone.title}" بنجاح وتأكيد استلام المخرجات.`,
    createdAt: new Date().toISOString(),
    type: 'approval'
  });

  const updated = db.update('clientProjects', req.params.id, { 
    milestones, 
    progress: newProgress,
    notes,
    status: newProgress === 100 ? 'completed' : project.status 
  });

  res.json({ 
    success: true, 
    message: `تم اعتماد مرحلة "${targetMilestone.title}" بنجاح`, 
    data: updated 
  });
});

// Client Project Feedback / Note Submission
app.post('/api/client-projects/:id/notes', (req, res) => {
  const project = db.getById('clientProjects', req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });

  const { author = 'العميل', text, type = 'feedback' } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'يرجى كتابة نص الملاحظة' });
  }

  const notes = Array.isArray(project.notes) ? [...project.notes] : [];
  const newNote = {
    id: Date.now(),
    author,
    text: text.trim(),
    createdAt: new Date().toISOString(),
    type
  };
  notes.unshift(newNote);

  const updated = db.update('clientProjects', req.params.id, { notes });
  res.status(201).json({ success: true, message: 'تم إرسال ملاحظتك بنجاح لفريق العمل', data: updated });
});

app.delete('/api/client-projects/:id', requireAuth, (req, res) => {
  const deleted = db.delete('clientProjects', req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'المشروع غير موجود' });
  res.json({ success: true, message: 'تم حذف المشروع بنجاح' });
});

// Telegram Bot & Notification Dispatcher Helper
async function sendTelegramMessage(botToken, chatId, text) {
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML'
      })
    });
    const result = await response.json();
    if (result.ok) {
      console.log('✓ Telegram alert sent successfully');
    } else {
      console.log('Telegram API error:', result.description);
    }
  } catch (err) {
    console.error('Telegram dispatch failed:', err.message);
  }
}

function triggerInstantAlert(title, details) {
  try {
    const settings = db.getSettings();
    console.log(`\n🔔 [INSTANT ALERT DISPATCHED]: ${title}`);
    console.log(`📋 Details:`, details);

    // Format HTML text for Telegram
    let telegramText = `⚡ <b>${title}</b>\n\n`;
    if (details && typeof details === 'object') {
      for (const [k, v] of Object.entries(details)) {
        if (v) telegramText += `🔹 <b>${k}:</b> ${v}\n`;
      }
    }
    telegramText += `\n⏰ <i>${new Date().toLocaleString('ar-EG')}</i>\n🌐 <a href="https://crew5.agency/admin">لوحة تحكم كرو فايف</a>`;

    // 1. Send to Telegram if configured
    if (settings && settings.telegramBotToken && settings.telegramChatId) {
      sendTelegramMessage(settings.telegramBotToken, settings.telegramChatId, telegramText);
    }
    
    // 2. If Webhook is configured, fire it
    if (settings && settings.webhookUrl) {
      fetch(settings.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, details, timestamp: new Date().toISOString() })
      }).catch(err => console.log('Webhook error:', err.message));
    }
  } catch (e) {
    console.error('Error dispatching alert:', e);
  }
}

// Telegram Live Test Route
app.post('/api/settings/test-telegram', requireAuth, async (req, res) => {
  const { botToken, chatId } = req.body;
  if (!botToken || !chatId) {
    return res.status(400).json({ success: false, message: 'يرجى إدخال Bot Token و Chat ID' });
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🚀 <b>تنبيه تجريبي ناجح من كرو فايف (Crew5 Agency)</b>\n\nتم ربط بوت تيليجرام بنجاح! ستصلك إشعارات العملاء، الحجوزات، محادثات المساعد الذكي، وطلبات حاسبة التكلفة هنا مباشرة وبشكل فوري ⚡\n\n⏰ <i>${new Date().toLocaleString('ar-EG')}</i>`,
        parse_mode: 'HTML'
      })
    });
    const data = await response.json();
    if (data.ok) {
      return res.json({ success: true, message: 'تم إرسال الرسالة التجريبية بنجاح إلى تيليجرام! 🎉' });
    } else {
      return res.status(400).json({ success: false, message: `فشل الإرسال: ${data.description || 'تأكد من صحة التوكن والـ Chat ID وأنك قمت ببدء محادثة مع البوت'}` });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: `خطأ في الاتصال بتيليجرام: ${err.message}` });
  }
});

// 16. Smart Consultation Bookings
app.get('/api/consultations', requireAuth, (req, res) => {
  res.json({ success: true, data: db.get('consultations') });
});

app.post('/api/consultations', publicFormLimiter, (req, res) => {
  const consultation = db.insert('consultations', {
    ...req.body,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  });

  // Also record in messages so admin sees it in Inbox
  db.insert('messages', {
    name: req.body.name || 'طلب حجز استشارة',
    email: req.body.email || '',
    phone: req.body.phone || '',
    service: `📅 حجز استشارة: ${req.body.topic || 'استشارة نمو وتحول رقمي'}`,
    message: `موعد الاستشارة: ${req.body.date} الساعة ${req.body.timeSlot}. ملاحظات: ${req.body.notes || 'لا توجد'}. رابط Google Meet: https://meet.google.com/crew5-consultation`,
    status: 'new',
    isConsultation: true,
    consultationId: consultation.id,
    createdAt: new Date().toISOString()
  });

  triggerInstantAlert('📅 حجز استشارة استراتيجية جديد', {
    client: req.body.name,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.timeSlot,
    topic: req.body.topic
  });

  res.status(201).json({ success: true, data: consultation, message: 'تم حجز الاستشارة بنجاح' });
});

// 17. Project Estimator Submissions (Instant Leads)
app.post('/api/estimator', publicFormLimiter, (req, res) => {
  const estimate = db.insert('estimatorSubmissions', {
    ...req.body,
    createdAt: new Date().toISOString()
  });

  // Also push to messages as high priority lead
  db.insert('messages', {
    name: req.body.name || 'عميل حاسبة التكلفة',
    email: req.body.email || '',
    phone: req.body.phone || '',
    service: `🧮 تقدير ميزانية: ${req.body.serviceName || 'مشروع مخصص'}`,
    message: `التكلفة التقديرية: ${req.body.estimatedPrice} | المدة: ${req.body.estimatedTimeline} | الميزات المحددة: ${(req.body.selectedFeatures || []).join('، ')} | تفاصيل إضافية: ${req.body.notes || 'لا يوجد'}`,
    status: 'new',
    isEstimatorQuote: true,
    estimateId: estimate.id,
    createdAt: new Date().toISOString()
  });

  triggerInstantAlert('🧮 طلب تقدير ميزانية مشروع جديد', {
    client: req.body.name,
    phone: req.body.phone,
    service: req.body.serviceName,
    price: req.body.estimatedPrice,
    timeline: req.body.estimatedTimeline
  });

  res.status(201).json({ success: true, data: estimate, message: 'تم استلام تقدير المشروع وتوجيهه لفريق المبيعات' });
});

// 18. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    security: {
      headersActive: true,
      rateLimiterActive: true,
      authEncryption: 'PBKDF2-SHA512',
      tokenSigning: 'HMAC-SHA256'
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// 19. Dynamic SEO: Sitemap.xml and Robots.txt
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://crew5.agency';
  const projects = db.get('projects') || [];
  const blogs = db.get('blogs') || [];
  const pages = db.get('pages') || [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Core Static URLs
  const staticUrls = [
    '',
    '/about',
    '/ceo-message',
    '/services',
    '/projects',
    '/estimator',
    '/audit',
    '/track',
    '/blog',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions'
  ];

  staticUrls.forEach(url => {
    xml += `  <url>\n    <loc>${baseUrl}${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Individual Services URLs
  const servicesCategories = db.get('servicesCategories') || [];
  servicesCategories.forEach(cat => {
    (cat.services || []).forEach(s => {
      const sSlug = s.slug || s.id;
      if (sSlug) {
        xml += `  <url>\n    <loc>${baseUrl}/services/${sSlug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      }
    });
  });

  // Projects URLs
  projects.forEach(p => {
    if (p.slug) {
      xml += `  <url>\n    <loc>${baseUrl}/projects/${p.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  });

  // Blogs URLs
  blogs.forEach(b => {
    if (b.slug) {
      xml += `  <url>\n    <loc>${baseUrl}/blog/${b.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  });

  // Custom Pages
  pages.forEach(pg => {
    if (pg.slug && pg.slug !== 'home') {
      xml += `  <url>\n    <loc>${baseUrl}/p/${pg.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    }
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://crew5.agency/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// 20. Production Static File Serving & Client-Side SPA Fallback
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Client Routing Fallback for all non-API routes
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Crew5 Full-Stack Server running on http://localhost:${PORT}`);
  console.log(`🔒 Security Hardening Activated: PBKDF2 Password Hashing, HMAC Signed Tokens, Rate Limiting & OWASP Headers.`);
  console.log(`📦 Serving production build from: ${fs.existsSync(distPath) ? distPath : 'Development Mode (Vite Dev Server)'}`);
});
