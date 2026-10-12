import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, UserPlus, Shield, ShieldCheck, ShieldAlert, KeyRound, 
  Lock, CheckCircle2, XCircle, AlertTriangle, Search, Filter, 
  RefreshCw, Trash2, Edit3, Eye, MoreVertical, Clock, Globe,
  Activity, Check, X, Sparkles, UserCheck, ShieldX, Terminal,
  Briefcase, DollarSign, Handshake, FileText, BadgePercent,
  MessageSquare, Calendar, Award, BookOpen, Megaphone, Target,
  FileCheck, Layers, Layout, Palette, Settings, Compass, HelpCircle
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminSelect from '../../components/admin/ui/AdminSelect';
import ConfirmModal from '../../components/admin/ConfirmModal';

// Department and Roles Master Definitions
const ROLES_CATALOG = {
  super_admin: {
    id: 'super_admin',
    name: 'مدير عام النظام',
    nameEn: 'Super Administrator',
    department: 'الإدارة العليا والتنفيذية',
    departmentEn: 'Executive Leadership',
    badge: '👑 Super Admin',
    color: 'emerald',
    icon: Sparkles,
    discountLimit: 'مطلق (بدون سقف)',
    responseSla: 'فوري (أولوية قصوى)',
    canDelete: true,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: true },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: true },
      { name: 'إعدادات النظام والـ Webhooks', allowed: true },
      { name: 'منشئ الصفحات والمكونات', allowed: true },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: true },
      { name: 'المدونة ومقالات الـ SEO', allowed: true },
      { name: 'إدارة الخدمات والأسعار', allowed: true },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: true },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: true },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: true }
    ],
    rules: [
      'مسؤولية كاملة عن حفظ واسترجاع النسخ الاحتياطية وإدارة خوادم النظام.',
      'حظر مشاركة بيانات تسجيل الدخول أو المفاتيح السرية مع أي طرف خارج الإدارة.',
      'إلزامية مراجعة سجلات التدقيق الأمني ومحاولات الدخول المشبوهة دورياً.'
    ]
  },
  admin: {
    id: 'admin',
    name: 'مشرف عام',
    nameEn: 'General Administrator',
    department: 'إدارة العمليات والمشاريع',
    departmentEn: 'Operations & Project Management',
    badge: '🛡️ Admin',
    color: 'cyan',
    icon: Shield,
    discountLimit: 'حتى 20% (بموافقة مسبقة)',
    responseSla: 'خلال 30 دقيقة',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: true },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: true },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: true },
      { name: 'المدونة ومقالات الـ SEO', allowed: true },
      { name: 'إدارة الخدمات والأسعار', allowed: true },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: true },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: true },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: false }
    ],
    rules: [
      'مراجعة وتدقيق جودة المشاريع والمقالات المنشورة ومطابقتها للمعايير.',
      'التنسيق المستمر بين فرق المبيعات والتسويق والتنفيذ لضمان الالتزام بالجداول.',
      'حظر تعديل الإعدادات الحساسة للأمان أو حذف حسابات المدراء.'
    ]
  },
  sales_manager: {
    id: 'sales_manager',
    name: 'مدير المبيعات والتعاقدات',
    nameEn: 'Sales & Deals Director',
    department: 'قسم المبيعات وتطوير الأعمال',
    departmentEn: 'Sales & Business Development',
    badge: '💼 Sales Manager',
    color: 'amber',
    icon: Briefcase,
    discountLimit: '15% كحد أقصى',
    responseSla: 'خلال 15–30 دقيقة',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: false },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: false },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: false },
      { name: 'المدونة ومقالات الـ SEO', allowed: false },
      { name: 'إدارة الخدمات والأسعار', allowed: true },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: true },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: true },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: true }
    ],
    rules: [
      'اعتماد عروض الأسعار الرسمية الصالحة لمدة 14 يوم عمل.',
      'الالتزام الصارم بهيكل الدفعات المعتمد (50% دفعة أولى، 30% مرحلية، 20% ختامية).',
      'سقف الخصومات المسموح: 15% للمشاريع والتعاقدات السنوية فقط.',
      'الالتزام التام بميثاق السرية وحماية بيانات وخطط العملاء (NDA).'
    ]
  },
  sales: {
    id: 'sales',
    name: 'مسؤول مبيعات وعلاقات عملاء',
    nameEn: 'Sales Specialist',
    department: 'قسم المبيعات',
    departmentEn: 'Sales Department',
    badge: '📈 Sales Specialist',
    color: 'emerald',
    icon: UserCheck,
    discountLimit: '5% كحد أقصى',
    responseSla: 'خلال 15 دقيقة',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: false },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: false },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: false },
      { name: 'المدونة ومقالات الـ SEO', allowed: false },
      { name: 'إدارة الخدمات والأسعار', allowed: false },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: true },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: true },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: false }
    ],
    rules: [
      'التواصل الفوري مع طلبات حاسبة التكلفة وحجز الاستشارات خلال 15 دقيقة.',
      'سقف الخصومات المسموح: 5% فقط للباقات الأساسية.',
      'حظر حذف أي رسالة أو طلب بدون تفويض كتابي من مدير المبيعات.',
      'توثيق نطاق العمل (SOW) وتوضيح جولات التعديل الـ 3 المعتمدة للعميل.'
    ]
  },
  marketing_manager: {
    id: 'marketing_manager',
    name: 'مدير التسويق والنمو الرقمي',
    nameEn: 'Marketing & Growth Director',
    department: 'قسم التسويق والنمو',
    departmentEn: 'Marketing & Digital Growth',
    badge: '📢 Marketing Manager',
    color: 'purple',
    icon: Megaphone,
    discountLimit: 'غير مصرح',
    responseSla: 'يومي (حسب خطة النشر)',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: false },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: false },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: true },
      { name: 'المدونة ومقالات الـ SEO', allowed: true },
      { name: 'إدارة الخدمات والأسعار', allowed: false },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: false },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: false },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: false }
    ],
    rules: [
      'الإشراف الكامل على استراتيجية الـ SEO والكلمات المفتاحية وحملات النمو.',
      'اعتماد الهوية البصرية ونبرة الصوت الإعلانية للوكالة (Brand Voice).',
      'تحسين معدلات التحويل وزيادة المشاهدات والتفاعل مع المقالات.',
      'حظر الوصول لصناديق الرسائل المالية والبيانات الإدارية الخاصة.'
    ]
  },
  marketing: {
    id: 'marketing',
    name: 'أخصائي تسويق ومحتوى',
    nameEn: 'Marketing & SEO Specialist',
    department: 'قسم التسويق',
    departmentEn: 'Marketing Department',
    badge: '🎯 Marketing Specialist',
    color: 'indigo',
    icon: Target,
    discountLimit: 'غير مصرح',
    responseSla: 'يومي',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: false },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: false },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: true },
      { name: 'المدونة ومقالات الـ SEO', allowed: true },
      { name: 'إدارة الخدمات والأسعار', allowed: false },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: false },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: false },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: false }
    ],
    rules: [
      'كتابة وتنسيق المقالات وفق أفضل معايير تحسين محركات البحث (SEO).',
      'التأكد من خلو الصور والمقالات من حقوق ملكية فكرية غير مرخصة.',
      'تحديث معرض الأعمال ونشر دراسات الحالة الحديثة للعملاء.'
    ]
  },
  editor: {
    id: 'editor',
    name: 'محرر محتوى وكاتب مقالات',
    nameEn: 'Content Creator & Editor',
    department: 'صناعة المحتوى والترجمة',
    departmentEn: 'Content & Copywriting',
    badge: '✍️ Editor',
    color: 'pink',
    icon: Edit3,
    discountLimit: 'غير مصرح',
    responseSla: 'حسب مواعيد التسليم',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: false },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: false },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: true },
      { name: 'المدونة ومقالات الـ SEO', allowed: true },
      { name: 'إدارة الخدمات والأسعار', allowed: false },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: false },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: false },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: false }
    ],
    rules: [
      'التدقيق اللغوي والإملائي الصارم لكافة المقالات قبل النشر.',
      'توفير الترجمة الإنجليزية الدقيقة للمحتوى العربي.',
      'حظر الوصول لإعدادات النظام أو الرسائل أو المبيعات.'
    ]
  },
  viewer: {
    id: 'viewer',
    name: 'مستعرض (اطلاع فقط)',
    nameEn: 'Viewer & Auditor',
    department: 'المستعرضين والمتدربين',
    departmentEn: 'Auditors & Viewers',
    badge: '👁️ Viewer',
    color: 'slate',
    icon: Eye,
    discountLimit: 'غير مصرح',
    responseSla: 'اطلاع فقط',
    canDelete: false,
    permissions: [
      { name: 'إدارة المستخدمين والصلاحيات', allowed: false },
      { name: 'سجلات التدقيق وفحص الأمان', allowed: false },
      { name: 'إعدادات النظام والـ Webhooks', allowed: false },
      { name: 'منشئ الصفحات والمكونات', allowed: false },
      { name: 'إدارة المشاريع ومعرض الأعمال', allowed: false },
      { name: 'المدونة ومقالات الـ SEO', allowed: false },
      { name: 'إدارة الخدمات والأسعار', allowed: false },
      { name: 'صندوق الرسائل واستفسارات العملاء', allowed: false },
      { name: 'تتبع مشاريع العملاء وعروض الأسعار', allowed: false },
      { name: 'اعتماد الخصومات الاستثنائية', allowed: false }
    ],
    rules: [
      'صلاحية القراءة فقط لكافة البيانات المتاحة.',
      'حظر تام لأي تعديل أو حذف أو تصدير بيانات حساسة.'
    ]
  }
};

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { language, isRTL } = useLanguage();

  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'roles_matrix' | 'audit' | 'security'
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [securityStats, setSecurityStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [logFilter, setLogFilter] = useState('all');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Forms state
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'sales',
    phone: '',
    status: 'active',
    avatar: '/assets/avatar_2.jpg'
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, logsRes, secRes] = await Promise.all([
        api.getUsers(),
        api.getAuditLogs(),
        api.getSecurityStats()
      ]);

      if (usersRes.success) setUsers(usersRes.data || []);
      if (logsRes.success) setAuditLogs(logsRes.data || []);
      if (secRes.success) setSecurityStats(secRes.data || null);
    } catch (err) {
      console.error('Error loading users/security data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone?.includes(searchQuery);
      
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Filtered Audit Logs
  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      if (logFilter === 'all') return true;
      if (logFilter === 'auth') return log.action.startsWith('login') || log.action.includes('password');
      if (logFilter === 'users') return log.action.startsWith('user_');
      if (logFilter === 'settings') return log.action.includes('settings');
      return true;
    });
  }, [auditLogs, logFilter]);

  // Add User Handler
  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!userForm.email || !userForm.email.includes('@')) {
      setFormError(language === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صالح');
      return;
    }

    if (!userForm.password || userForm.password.length < 6) {
      setFormError(language === 'en' ? 'Password must be at least 6 characters' : 'يجب أن لا تقل كلمة المرور عن 6 خانات');
      return;
    }

    setActionLoading(true);
    try {
      const res = await api.createUser(userForm);
      if (res.success) {
        setFormSuccess(language === 'en' ? 'User account created successfully!' : 'تم إنشاء حساب المستخدم بنجاح!');
        setTimeout(() => {
          setIsAddModalOpen(false);
          setUserForm({ name: '', email: '', password: '', role: 'sales', phone: '', status: 'active', avatar: '/assets/avatar_2.jpg' });
          setFormSuccess('');
          fetchData();
        }, 1000);
      } else {
        setFormError(res.message || (language === 'en' ? 'Failed to create user' : 'فشل إنشاء المستخدم'));
      }
    } catch (err) {
      setFormError(language === 'en' ? 'Server error occurred' : 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setActionLoading(false);
    }
  };

  // Edit User Handler
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setFormError('');
    setFormSuccess('');
    setActionLoading(true);

    try {
      const res = await api.updateUser(selectedUser.id, userForm);
      if (res.success) {
        setFormSuccess(language === 'en' ? 'User updated successfully!' : 'تم تحديث بيانات المستخدم بنجاح!');
        setTimeout(() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
          setFormSuccess('');
          fetchData();
        }, 1000);
      } else {
        setFormError(res.message || (language === 'en' ? 'Failed to update user' : 'فشل تحديث المستخدم'));
      }
    } catch (err) {
      setFormError(language === 'en' ? 'Server error occurred' : 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setActionLoading(false);
    }
  };

  // Reset Password Handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setFormError('');
    setFormSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError(language === 'en' ? 'Passwords do not match' : 'كلمتا المرور غير متطابقتين');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setFormError(language === 'en' ? 'Password must be at least 6 characters' : 'يجب أن لا تقل كلمة المرور عن 6 خانات');
      return;
    }

    setActionLoading(true);
    try {
      const res = await api.resetUserPassword(selectedUser.id, passwordForm.newPassword);
      if (res.success) {
        setFormSuccess(language === 'en' ? 'Password reset successfully!' : 'تمت إعادة تعيين كلمة المرور بنجاح!');
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setSelectedUser(null);
          setPasswordForm({ newPassword: '', confirmPassword: '' });
          setFormSuccess('');
          fetchData();
        }, 1000);
      } else {
        setFormError(res.message || (language === 'en' ? 'Failed to reset password' : 'فشل إعادة تعيين كلمة المرور'));
      }
    } catch (err) {
      setFormError(language === 'en' ? 'Server error occurred' : 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete User Handler
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      const res = await api.deleteUser(selectedUser.id);
      if (res.success) {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
        fetchData();
      } else {
        alert(res.message || (language === 'en' ? 'Failed to delete user' : 'فشل حذف المستخدم'));
      }
    } catch (err) {
      alert(language === 'en' ? 'Server error' : 'حدث خطأ في السيرفر');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle user status
  const handleToggleStatus = async (user) => {
    if (user.id === currentUser?.id) {
      alert(language === 'en' ? 'You cannot suspend your own account' : 'لا يمكنك تعطيل حسابك الشخصي');
      return;
    }
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    try {
      await api.updateUser(user.id, { status: newStatus });
      fetchData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to update status' : 'فشل تغيير حالة المستخدم');
    }
  };

  const getRoleBadge = (role) => {
    const r = ROLES_CATALOG[role] || ROLES_CATALOG.viewer;
    const Icon = r.icon || Users;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
        role === 'super_admin'
          ? 'bg-brand-green/20 text-brand-green border-brand-green/40 shadow-neon'
          : role === 'admin'
          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
          : role === 'sales_manager'
          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
          : role === 'sales'
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
          : role === 'marketing_manager'
          ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
          : role === 'marketing'
          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
          : role === 'editor'
          ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
          : 'bg-slate-500/20 text-slate-400 border-slate-500/40'
      }`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{language === 'en' ? r.nameEn : r.name}</span>
      </span>
    );
  };

  const getLogBadge = (status) => {
    if (status === 'success') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>{language === 'en' ? 'Success' : 'ناجح'}</span>
        </span>
      );
    }
    if (status === 'failed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <XCircle className="w-3 h-3" />
          <span>{language === 'en' ? 'Failed' : 'فاشل'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
        <AlertTriangle className="w-3 h-3" />
        <span>{language === 'en' ? 'Blocked / Alert' : 'محظور / تنبيه'}</span>
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Header with Actions */}
      <AdminPageHeader
        title={language === 'en' ? 'User Accounts, Roles & Department Rules' : 'إدارة المستخدمين والصلاحيات والأمان'}
        subtitle={language === 'en' 
          ? 'Manage administrator, sales, and marketing accounts with granular department policies, SLA, and security controls' 
          : 'التحكم الكامل في حسابات المشرفين والمبيعات والتسويق، تحديد مصفوفة الصلاحيات، وضوابط وشروط الأقسام'
        }
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            icon={RefreshCw}
            className={`border-white/15 text-slate-300 hover:text-white ${refreshing ? 'animate-spin' : ''}`}
          >
            {language === 'en' ? 'Refresh Data' : 'تحديث البيانات'}
          </Button>

          <Button
            variant="glow"
            size="md"
            icon={UserPlus}
            onClick={() => {
              setUserForm({ name: '', email: '', password: '', role: 'sales', phone: '', status: 'active', avatar: '/assets/avatar_2.jpg' });
              setFormError('');
              setFormSuccess('');
              setIsAddModalOpen(true);
            }}
          >
            {language === 'en' ? 'Add New User' : 'إضافة عضو جديد'}
          </Button>
        </div>
      </AdminPageHeader>

      {/* 2. Metrics Stats Grid (4 Department Clusters) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Users */}
        <Card className="p-5 bg-gradient-to-br from-dark-900/90 to-dark-950 border-white/10 hover:border-brand-green/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">
                {language === 'en' ? 'Total Accounts' : 'إجمالي الحسابات'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-black text-white">
                {users.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>{language === 'en' ? 'Active in System' : 'أعضاء مسجلين بالنظام'}</span>
          </div>
        </Card>

        {/* Sales Department */}
        <Card className="p-5 bg-gradient-to-br from-dark-900/90 to-dark-950 border-white/10 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">
                {language === 'en' ? 'Sales & Deals' : 'فريق المبيعات والصفقات'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-black text-amber-400">
                {users.filter(u => u.role === 'sales' || u.role === 'sales_manager').length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{language === 'en' ? 'CRM & Inbound Leads' : 'متابعة العملاء والعروض'}</span>
          </div>
        </Card>

        {/* Marketing & Content */}
        <Card className="p-5 bg-gradient-to-br from-dark-900/90 to-dark-950 border-white/10 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">
                {language === 'en' ? 'Marketing & SEO' : 'التسويق والمحتوى'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-black text-purple-400">
                {users.filter(u => u.role === 'marketing' || u.role === 'marketing_manager' || u.role === 'editor').length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Megaphone className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>{language === 'en' ? 'SEO & Blog Growth' : 'المقالات، المعرض، والنمو'}</span>
          </div>
        </Card>

        {/* Security Hardening Score */}
        <Card className="p-5 bg-gradient-to-br from-brand-green/10 via-dark-900 to-dark-950 border-brand-green/30 hover:border-brand-green/60 transition-all shadow-neon">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-green block mb-1">
                {language === 'en' ? 'Security & RBAC' : 'الأمان وتحديد الصلاحيات'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-black text-white flex items-baseline gap-1">
                <span>100%</span>
                <span className="text-xs text-brand-green font-bold">A+</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-green/20 border border-brand-green/50 flex items-center justify-center text-brand-green shadow-neon">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            <span>{language === 'en' ? 'Strict Role Firewall Active' : 'جدار حماية الصلاحيات نشط'}</span>
          </div>
        </Card>

      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-dark-900/80 rounded-2xl border border-white/10 w-full sm:w-fit overflow-x-auto">
        
        {/* Tab 1 */}
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-brand-green text-dark-950 shadow-neon'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{language === 'en' ? 'Team Accounts' : 'حسابات الأعضاء'}</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-montserrat ${
            activeTab === 'users' ? 'bg-dark-950 text-brand-green' : 'bg-white/10 text-slate-300'
          }`}>
            {users.length}
          </span>
        </button>

        {/* Tab 2: Master Roles & Permissions Matrix */}
        <button
          type="button"
          onClick={() => setActiveTab('roles_matrix')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'roles_matrix'
              ? 'bg-brand-green text-dark-950 shadow-neon'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{language === 'en' ? 'Roles & Department Rules' : 'مصفوفة الصلاحيات وشروط الأقسام'}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-green/20 text-brand-green font-bold">
            RBAC
          </span>
        </button>

        {/* Tab 3 */}
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-brand-green text-dark-950 shadow-neon'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{language === 'en' ? 'Audit Trail' : 'سجل الأمان والعمليات'}</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-montserrat ${
            activeTab === 'audit' ? 'bg-dark-950 text-brand-green' : 'bg-white/10 text-slate-300'
          }`}>
            {auditLogs.length}
          </span>
        </button>

        {/* Tab 4 */}
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-brand-green text-dark-950 shadow-neon'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'en' ? 'Security Center' : 'مركز الحماية والتحصين'}</span>
          <span className="w-2 h-2 rounded-full bg-brand-green animate-ping"></span>
        </button>
      </div>

      {/* 4. Tab 1: Users List */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <Card className="p-4 sm:p-5 border-white/10 bg-dark-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search by name, email or phone...' : 'بحث بالاسم، البريد، أو الهاتف...'}
                className={`w-full bg-dark-950 border border-white/10 rounded-xl py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-green transition-all ${
                  isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              />
            </div>

            {/* Select Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-green transition-all"
              >
                <option value="all">{language === 'en' ? 'All Roles & Departments' : 'كافة الأقسام والصلاحيات'}</option>
                <option value="super_admin">{language === 'en' ? 'Super Admin' : '👑 مدير عام النظام'}</option>
                <option value="admin">{language === 'en' ? 'Admin' : '🛡️ مشرف عام'}</option>
                <option value="sales_manager">{language === 'en' ? 'Sales Manager' : '💼 مدير المبيعات'}</option>
                <option value="sales">{language === 'en' ? 'Sales Specialist' : '📈 مسؤول مبيعات'}</option>
                <option value="marketing_manager">{language === 'en' ? 'Marketing Manager' : '📢 مدير التسويق'}</option>
                <option value="marketing">{language === 'en' ? 'Marketing Specialist' : '🎯 أخصائي تسويق'}</option>
                <option value="editor">{language === 'en' ? 'Editor' : '✍️ محرر محتوى'}</option>
                <option value="viewer">{language === 'en' ? 'Viewer' : '👁️ مستعرض'}</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-green transition-all"
              >
                <option value="all">{language === 'en' ? 'All Statuses' : 'كافة الحالات'}</option>
                <option value="active">{language === 'en' ? 'Active' : 'نشط فقط'}</option>
                <option value="suspended">{language === 'en' ? 'Suspended' : 'معطل فقط'}</option>
              </select>
            </div>

          </Card>

          {/* Users Cards Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.map((user) => {
              const isCurrent = user.id === currentUser?.id || user.email === currentUser?.email;
              const rDef = ROLES_CATALOG[user.role] || ROLES_CATALOG.viewer;

              return (
                <Card 
                  key={user.id} 
                  className={`p-6 border transition-all duration-300 relative group flex flex-col justify-between ${
                    user.status === 'suspended'
                      ? 'border-rose-500/20 bg-dark-900/40 opacity-75'
                      : user.role === 'super_admin'
                      ? 'border-brand-green/40 bg-dark-900/90 shadow-neon/10 hover:border-brand-green'
                      : user.role === 'sales_manager' || user.role === 'sales'
                      ? 'border-amber-500/30 bg-dark-900/90 hover:border-amber-500/60'
                      : user.role === 'marketing_manager' || user.role === 'marketing'
                      ? 'border-purple-500/30 bg-dark-900/90 hover:border-purple-500/60'
                      : 'border-white/10 bg-dark-900/80 hover:border-white/20'
                  }`}
                >
                  
                  {/* Top Row: Avatar + Info */}
                  <div className="space-y-4">
                    
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={user.avatar || '/assets/avatar_2.jpg'}
                            alt={user.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                            onError={(e) => { e.target.src = '/assets/avatar_2.jpg'; }}
                          />
                          <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-dark-900 ${
                            user.status === 'active' ? 'bg-emerald-400' : 'bg-rose-500'
                          }`} title={user.status === 'active' ? 'نشط' : 'معطل'}></span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors">
                              {user.name}
                            </h4>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded bg-brand-green/20 text-brand-green text-[10px] font-mono font-bold">
                                {language === 'en' ? 'YOU' : 'أنت'}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-mono block" dir="ltr">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {getRoleBadge(user.role)}
                    </div>

                    {/* Department & Rules Summary Pill */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2 text-xs text-slate-300">
                      
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{language === 'en' ? 'Department:' : 'القسم التابع له:'}</span>
                        <span className="font-bold text-white text-[11px]">{language === 'en' ? rDef.departmentEn : rDef.department}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{language === 'en' ? 'Discount Limit:' : 'سقف الخصم:'}</span>
                        <span className="font-bold text-brand-green text-[11px]">{rDef.discountLimit}</span>
                      </div>

                      {user.phone && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">{language === 'en' ? 'Phone:' : 'الهاتف:'}</span>
                          <span className="font-mono text-white" dir="ltr">{user.phone}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{language === 'en' ? 'Last Login:' : 'آخر تسجيل دخول:'}</span>
                        <span className="text-[11px] text-slate-300">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : (language === 'en' ? 'Never' : 'لم يسجل بعد')}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    
                    {/* Status Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(user)}
                      disabled={isCurrent}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                        isCurrent
                          ? 'opacity-40 cursor-not-allowed bg-white/5 text-slate-400'
                          : user.status === 'active'
                          ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                      }`}
                      title={user.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                    >
                      {user.status === 'active' ? (language === 'en' ? 'Suspend' : 'تعطيل') : (language === 'en' ? 'Activate' : 'تفعيل')}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Password Reset */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setPasswordForm({ newPassword: '', confirmPassword: '' });
                          setFormError('');
                          setFormSuccess('');
                          setIsPasswordModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-brand-green transition-colors"
                        title={language === 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'}
                      >
                        <KeyRound className="w-4 h-4" />
                      </button>

                      {/* Edit Details */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setUserForm({
                            name: user.name || '',
                            email: user.email || '',
                            role: user.role || 'sales',
                            phone: user.phone || '',
                            status: user.status || 'active',
                            avatar: user.avatar || '/assets/avatar_2.jpg'
                          });
                          setFormError('');
                          setFormSuccess('');
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                        title={language === 'en' ? 'Edit User' : 'تعديل البيانات والصلاحية'}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete User */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={isCurrent || (user.role === 'super_admin' && users.filter(u => u.role === 'super_admin').length <= 1)}
                        className={`p-2 rounded-xl transition-colors ${
                          isCurrent || (user.role === 'super_admin' && users.filter(u => u.role === 'super_admin').length <= 1)
                            ? 'opacity-30 cursor-not-allowed bg-white/5 text-slate-500'
                            : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'
                        }`}
                        title={language === 'en' ? 'Delete User' : 'حذف المستخدم'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </Card>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="p-12 text-center border-dashed border-white/10">
              <Users className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
              <h4 className="text-base font-bold text-white mb-1">
                {language === 'en' ? 'No users found matching your search' : 'لم يتم العثور على مستخدمين يطابقون البحث'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Try changing your search terms or filters' : 'جرب تغيير عبارة البحث أو الفلاتر المحددة'}
              </p>
            </Card>
          )}

        </div>
      )}

      {/* 5. Tab 2: Master Roles & Permissions Matrix & Department Charter */}
      {activeTab === 'roles_matrix' && (
        <div className="space-y-8">
          
          {/* Section Header */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-brand-green/10 via-dark-900 to-dark-950 border-brand-green/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/20 border border-brand-green/40 text-brand-green flex items-center justify-center shadow-neon">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {language === 'en' ? 'Comprehensive RBAC Permissions & Department Matrix' : 'مصفوفة الصلاحيات والشروط العامة لكافة الأقسام'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'en' ? 'Granular permission breakdown, rules, and SLA limits across all agency departments' : 'تحديد دقيق لصلاحيات الإدارة، المبيعات، التسويق، وصناع المحتوى، مع سقف الخصومات وسرعة الاستجابة'}
                  </p>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 text-xs font-bold font-mono">
                CREW5-RBAC-POLICY-2026
              </span>
            </div>
          </Card>

          {/* Department Cards Grid (6 Main Departments) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Super Admin */}
            <Card className="p-6 border-brand-green/40 bg-dark-900/90 space-y-4 shadow-neon/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-brand-green">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">الإدارة العليا (Super Admin)</h4>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-brand-green/20 text-brand-green font-bold">كامل الصلاحيات</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 text-[11px] block">سقف الخصومات المسموح:</span>
                  <span className="font-bold text-brand-green">مطلق (صاحب القرار النهائي)</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 text-[11px] font-bold block">أهم الشروط والضوابط:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                    <li>إلزامية مراجعة سجلات الأمان أسبوعياً.</li>
                    <li>حظر مشاركة الجلسات المشفرة.</li>
                    <li>لا يمكن حذف الحساب الشخصي لضمان استقرار السيرفر.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 2. Admin */}
            <Card className="p-6 border-cyan-500/40 bg-dark-900/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-cyan-400">
                  <Shield className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">إدارة العمليات (Admin)</h4>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">إشراف عام</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 text-[11px] block">سقف الخصومات المسموح:</span>
                  <span className="font-bold text-cyan-400">حتى 20% (بموافقة مسبقة)</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 text-[11px] font-bold block">أهم الشروط والضوابط:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                    <li>تدقيق ومراجعة المشاريع قبل النشر العام.</li>
                    <li>حل مشكلات واستفسارات العملاء والتنسيق مع الفرق.</li>
                    <li>حظر تعديل الإعدادات الحساسة للأمان.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 3. Sales Manager */}
            <Card className="p-6 border-amber-500/40 bg-dark-900/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-amber-400">
                  <Briefcase className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">مدير المبيعات (Sales Manager)</h4>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">الصفقات والعقود</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 text-[11px] block">سقف الخصومات المسموح:</span>
                  <span className="font-bold text-amber-400">15% كحد أقصى للمشاريع الكبرى</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 text-[11px] font-bold block">أهم الشروط والضوابط:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                    <li>الالتزام بهيكل الدفعات 50% مقدم، 30% مرحلية، 20% ختامية.</li>
                    <li>سرعة الرد على حاسبة التكلفة خلال 30 دقيقة.</li>
                    <li>التزام صارم بميثاق السرية التامة (NDA).</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 4. Sales Specialist */}
            <Card className="p-6 border-emerald-500/40 bg-dark-900/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <UserCheck className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">مسؤول المبيعات (Sales)</h4>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">علاقات العملاء</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 text-[11px] block">سقف الخصومات المسموح:</span>
                  <span className="font-bold text-emerald-400">5% كحد أقصى للباقات الأساسية</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 text-[11px] font-bold block">أهم الشروط والضوابط:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                    <li>التواصل المباشر عبر واتساب خلال 15 دقيقة كحد أقصى.</li>
                    <li>حظر حذف الرسائل أو الطلبات دون موافقة الإدارة.</li>
                    <li>توثيق الـ 3 جولات تعديل المعتمدة في العرض.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 5. Marketing Team */}
            <Card className="p-6 border-purple-500/40 bg-dark-900/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-purple-400">
                  <Megaphone className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">قسم التسويق (Marketing & SEO)</h4>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold">النمو والظهور</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 text-[11px] block">النطاق والمسؤولية:</span>
                  <span className="font-bold text-purple-400">المدونة، الـ SEO، معرض الأعمال، والتقييمات</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 text-[11px] font-bold block">أهم الشروط والضوابط:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                    <li>الالتزام التام بالهوية البصرية (Brand Guidelines).</li>
                    <li>التدقيق في الكلمات المفتاحية وتحسين محركات البحث.</li>
                    <li>حظر الوصول لصناديق الرسائل المالية والبيانات الإدارية.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 6. Content Editors */}
            <Card className="p-6 border-pink-500/40 bg-dark-900/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-pink-400">
                  <Edit3 className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">صناعة المحتوى (Editors)</h4>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 font-bold">الكتابة والترجمة</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 text-[11px] block">النطاق والمسؤولية:</span>
                  <span className="font-bold text-pink-400">المقالات، دراسات الحالة، ونصوص الصفحات</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-slate-400 text-[11px] font-bold block">أهم الشروط والضوابط:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                    <li>التدقيق اللغوي والإملائي الصارم قبل اعتماد النشر.</li>
                    <li>التأكد من دقة الترجمة الإنجليزية للمقالات.</li>
                    <li>حظر الوصول لإعدادات الموقع أو الرسائل.</li>
                  </ul>
                </div>
              </div>
            </Card>

          </div>

          {/* Master Permissions Matrix Table */}
          <Card className="overflow-hidden border-white/10 bg-dark-900/80 space-y-4 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-brand-green" />
                <h4 className="text-base font-bold text-white">
                  {language === 'en' ? 'Detailed Permissions Cross-Matrix' : 'جدول مقارنة الصلاحيات التفصيلي لجميع الأدوار'}
                </h4>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-dark-950 border-b border-white/10 text-slate-400 font-bold">
                  <tr>
                    <th className="py-3.5 px-4">{language === 'en' ? 'Permission Domain' : 'مجال الصلاحية'}</th>
                    <th className="py-3.5 px-3 text-center text-brand-green">Super Admin</th>
                    <th className="py-3.5 px-3 text-center text-cyan-400">Admin</th>
                    <th className="py-3.5 px-3 text-center text-amber-400">Sales Mgr</th>
                    <th className="py-3.5 px-3 text-center text-emerald-400">Sales</th>
                    <th className="py-3.5 px-3 text-center text-purple-400">Marketing</th>
                    <th className="py-3.5 px-3 text-center text-pink-400">Editor</th>
                    <th className="py-3.5 px-3 text-center text-slate-400">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {[
                    { domain: 'إدارة المستخدمين والمشرفين', super: true, admin: false, sm: false, s: false, m: false, ed: false, v: false },
                    { domain: 'سجلات تدقيق الأمان والمراقبة', super: true, admin: true, sm: false, s: false, m: false, ed: false, v: false },
                    { domain: 'إعدادات الموقع و Webhooks', super: true, admin: false, sm: false, s: false, m: false, ed: false, v: false },
                    { domain: 'صندوق الرسائل واستفسارات العملاء', super: true, admin: true, sm: true, s: true, m: false, ed: false, v: false },
                    { domain: 'تتبع مشاريع العملاء (Tracker)', super: true, admin: true, sm: true, s: true, m: false, ed: false, v: false },
                    { domain: 'المدونة ومقالات الـ SEO', super: true, admin: true, sm: false, s: false, m: true, ed: true, v: false },
                    { domain: 'معرض المشاريع والـ Portfolio', super: true, admin: true, sm: false, s: false, m: true, ed: true, v: false },
                    { domain: 'آراء العملاء (Testimonials)', super: true, admin: true, sm: true, s: false, m: true, ed: false, v: false },
                    { domain: 'منشئ الصفحات والمكونات', super: true, admin: true, sm: false, s: false, m: false, ed: false, v: false },
                    { domain: 'تطبيق خصومات الأسعار', super: 'مطلق', admin: '20%', sm: '15%', s: '5%', m: '❌', ed: '❌', v: '❌' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{row.domain}</td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.super === 'string' ? <span className="font-bold text-brand-green">{row.super}</span> : (row.super ? <Check className="w-4 h-4 text-brand-green mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.admin === 'string' ? <span className="font-bold text-cyan-400">{row.admin}</span> : (row.admin ? <Check className="w-4 h-4 text-cyan-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.sm === 'string' ? <span className="font-bold text-amber-400">{row.sm}</span> : (row.sm ? <Check className="w-4 h-4 text-amber-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.s === 'string' ? <span className="font-bold text-emerald-400">{row.s}</span> : (row.s ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.m === 'string' ? <span className="font-bold text-purple-400">{row.m}</span> : (row.m ? <Check className="w-4 h-4 text-purple-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.ed === 'string' ? <span className="font-bold text-pink-400">{row.ed}</span> : (row.ed ? <Check className="w-4 h-4 text-pink-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {typeof row.v === 'string' ? <span className="font-bold text-slate-400">{row.v}</span> : (row.v ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      )}

      {/* 6. Tab 3: Security Audit Trail */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          
          <Card className="p-4 sm:p-5 border-white/10 bg-dark-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-green" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                {language === 'en' ? 'Real-Time Security Activity Trail' : 'سجل العمليات والأنشطة الأمنية الحية'}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                className="bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-green"
              >
                <option value="all">{language === 'en' ? 'All Events' : 'كافة الأحداث'}</option>
                <option value="auth">{language === 'en' ? 'Logins & Passwords' : 'تسجيل الدخول وكلمات المرور'}</option>
                <option value="users">{language === 'en' ? 'User Operations' : 'عمليات المشرفين والمستخدمين'}</option>
                <option value="settings">{language === 'en' ? 'Settings Updates' : 'تحديثات الإعدادات'}</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                icon={RefreshCw}
                className={`border-white/10 ${refreshing ? 'animate-spin' : ''}`}
              >
                {language === 'en' ? 'Refresh' : 'تحديث'}
              </Button>
            </div>
          </Card>

          {/* Audit Logs Table / Feed */}
          <Card className="overflow-hidden border-white/10 bg-dark-900/80">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-dark-950 border-b border-white/10 text-slate-400 font-bold">
                  <tr>
                    <th className="py-3.5 px-4">{language === 'en' ? 'Event / Action' : 'نوع الحدث / الإجراء'}</th>
                    <th className="py-3.5 px-4">{language === 'en' ? 'Actor' : 'المنفّذ / الحساب'}</th>
                    <th className="py-3.5 px-4">{language === 'en' ? 'Details' : 'التفاصيل'}</th>
                    <th className="py-3.5 px-4">{language === 'en' ? 'IP Address' : 'عنوان IP'}</th>
                    <th className="py-3.5 px-4">{language === 'en' ? 'Timestamp' : 'الوقت والتاريخ'}</th>
                    <th className="py-3.5 px-4 text-center">{language === 'en' ? 'Status' : 'الحالة'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-brand-green">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-slate-400" />
                          <span>{log.action}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-white block">{log.userName || 'النظام'}</span>
                        <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{log.userEmail}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-200 max-w-md">
                        {log.details}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400" dir="ltr">
                        {log.ip || '127.0.0.1'}
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString(language === 'en' ? 'en-US' : 'ar-SA')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getLogBadge(log.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                {language === 'en' ? 'No audit logs recorded yet.' : 'لا توجد سجلات تدقيق مسجلة حتى الآن.'}
              </div>
            )}
          </Card>

        </div>
      )}

      {/* 7. Tab 4: Security Hardening Center */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Protection Layers Card */}
            <Card className="p-6 sm:p-8 space-y-6 border-brand-green/30 bg-dark-900/90 shadow-neon/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-neon">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {language === 'en' ? 'Active Security Hardening Shield' : 'درع الحماية والتحصين النشط'}
                    </h3>
                    <span className="text-xs text-brand-green font-bold">
                      {language === 'en' ? 'Grade A+ Enterprise Security' : 'مستوى حماية مؤسسي متكامل'}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-green text-dark-950 shadow-neon">
                  {language === 'en' ? 'Protected 100%' : 'محمي بنسبة 100%'}
                </span>
              </div>

              <div className="space-y-4">
                
                {/* 1 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {language === 'en' ? 'PBKDF2-SHA512 Salted Password Hashing' : 'تشفير كلمات المرور القياسي (PBKDF2-SHA512)'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {language === 'en' 
                        ? 'Passwords are encrypted with 10,000 iterations using unique cryptographic salt per user to prevent rainbow table attacks.'
                        : 'يتم تشفير كلمات المرور باستخدام 10,000 تكرار مع Salt عشوائي فريد لكل مستخدم لمنع هجمات جداول قوس قزح والتخمين المسبق.'}
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {language === 'en' ? 'HMAC-SHA256 Cryptographically Signed Tokens' : 'توثيق وتوقيع الجلسات المشفر (HMAC Tokens)'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {language === 'en'
                        ? 'Admin sessions are signed with server-side HMAC secret with 7-day automatic expiration and forgery prevention.'
                        : 'يتم توقيع جلسات المشرفين بختم سري مشفر غير قابل للتزوير مع انتهاء تلقائي بعد 7 أيام وفحص الصلاحيات عند كل طلب.'}
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {language === 'en' ? 'Anti-Brute Force Rate Limiting' : 'محدد معدل الطلبات وحظر التخمين (Rate Limiting)'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {language === 'en'
                        ? 'Prevents dictionary and brute force attacks on login endpoints (Max 15 attempts / 15 mins) and protects form APIs.'
                        : 'حظر فوري للهجمات التكرارية والتخمين الآلي على تسجيل الدخول ونماذج التواصل وحاسبة التكلفة.'}
                    </p>
                  </div>
                </div>

                {/* 4 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {language === 'en' ? 'OWASP Standard HTTP Security Headers' : 'رؤوس الحماية الأمنية القياسية (OWASP Headers)'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {language === 'en'
                        ? 'Includes Content Security Policy (CSP), anti-clickjacking (X-Frame-Options), MIME protection, and HSTS.'
                        : 'تفعيل حماية ضد هجمات Clickjacking و XSS و MIME Sniffing مع سياسة CSP متوافقة تماماً.'}
                    </p>
                  </div>
                </div>

              </div>
            </Card>

            {/* File Upload & Firewall Policy Card */}
            <Card className="p-6 sm:p-8 space-y-6 border-white/10 bg-dark-900/80">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'Upload Firewall & Protection Policies' : 'جدار حماية الملفات وسياسات الوصول'}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {language === 'en' ? 'Enforced across all endpoints' : 'مطبقة بصورة تلقائية على كافة المسارات'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                
                <div className="p-4 rounded-xl bg-dark-950 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span>{language === 'en' ? 'File Extension Whitelist' : 'الامتدادات المسموح برفعها'}</span>
                    <span className="text-emerald-400 font-mono text-[11px]">ALLOWED</span>
                  </div>
                  <p className="text-slate-400 font-mono text-[11px]">
                    .jpg, .jpeg, .png, .webp, .svg, .gif, .pdf, .mp4, .mov
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between text-rose-400 font-bold">
                    <span>{language === 'en' ? 'Blocked Dangerous Executables' : 'الملفات التنفيذية المحظورة نهائياً'}</span>
                    <span className="text-rose-400 font-mono text-[11px]">BLOCKED</span>
                  </div>
                  <p className="text-slate-400 font-mono text-[11px]">
                    .php, .phtml, .exe, .sh, .bat, .cmd, .js, .vbs, .py, .html
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span>{language === 'en' ? 'Filename Sanitization' : 'تعقيم وإعادة تسمية الملفات'}</span>
                    <span className="text-brand-green font-mono text-[11px]">ACTIVE</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    {language === 'en'
                      ? 'All uploaded files are sanitized against path traversal attacks and stripped of harmful characters.'
                      : 'تطهير أسماء الملفات تلقائياً من المسارات العكسية (../) والرموز الخاصة لمنع استغلال خادم الويب.'}
                  </p>
                </div>

              </div>
            </Card>

          </div>

        </div>
      )}

      {/* 8. Modal: Add User with Live Permission Preview */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-6 sm:p-8 bg-dark-900 border-brand-green/30 shadow-2xl relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 sticky top-0 bg-dark-900 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'Create New Member Account' : 'إضافة عضو جديد وتحديد الصلاحيات'}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {language === 'en' ? 'Assign department, role, and view granted permissions' : 'تعيين القسم وتحديد شروط وصلاحيات الحساب'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4 mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="محمد أحمد"
                  required
                />

                <AdminInput
                  label={language === 'en' ? 'Email Address' : 'البريد الإلكتروني (اسم المستخدم)'}
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="user@crew5.agency"
                  dir="ltr"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Initial Password' : 'كلمة المرور الأولية'}
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  placeholder="••••••••"
                  dir="ltr"
                  required
                />

                <AdminInput
                  label={language === 'en' ? 'Phone / WhatsApp' : 'رقم الهاتف / واتساب'}
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  placeholder="+966568121909"
                  dir="ltr"
                />
              </div>

              <AdminSelect
                label={language === 'en' ? 'Role & Assigned Department' : 'الدور والقسم المحدد'}
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                options={[
                  { value: 'sales', label: '📈 مسؤول مبيعات وعلاقات عملاء (Sales)' },
                  { value: 'sales_manager', label: '💼 مدير المبيعات والتعاقدات (Sales Manager)' },
                  { value: 'marketing', label: '🎯 أخصائي تسويق ومحتوى (Marketing Specialist)' },
                  { value: 'marketing_manager', label: '📢 مدير التسويق والنمو (Marketing Manager)' },
                  { value: 'editor', label: '✍️ محرر محتوى وكاتب مقالات (Editor)' },
                  { value: 'admin', label: '🛡️ مشرف عام (Admin)' },
                  { value: 'super_admin', label: '👑 مدير عام النظام (Super Admin)' },
                  { value: 'viewer', label: '👁️ مستعرض (Viewer - Read-only)' }
                ]}
              />

              {/* Dynamic Live Permission Preview Box */}
              {ROLES_CATALOG[userForm.role] && (
                <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">الصلاحيات الممنوحة لهذا الدور تلقائياً:</span>
                    <span className="text-brand-green font-bold font-mono">{ROLES_CATALOG[userForm.role].department}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                    {ROLES_CATALOG[userForm.role].permissions.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300">
                        {p.allowed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span className={p.allowed ? 'text-white' : 'text-slate-500 line-through'}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </Button>
                <Button
                  type="submit"
                  variant="glow"
                  size="md"
                  disabled={actionLoading}
                >
                  {actionLoading ? (language === 'en' ? 'Creating...' : 'جاري الإنشاء...') : (language === 'en' ? 'Create Account' : 'إنشاء الحساب وتفعيل الصلاحيات')}
                </Button>
              </div>
            </form>

          </Card>
        </div>
      )}

      {/* 9. Modal: Edit User */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 sm:p-8 bg-dark-900 border-white/20 shadow-2xl relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'en' ? 'Edit User Details & Role' : 'تعديل بيانات وصلاحيات العضو'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleEditUser} className="space-y-4 mt-6">
              <AdminInput
                label={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                required
              />

              <AdminInput
                label={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                dir="ltr"
                required
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminSelect
                  label={language === 'en' ? 'Role & Permissions' : 'الدور والصلاحيات'}
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  options={[
                    { value: 'sales', label: '📈 مسؤول مبيعات (Sales)' },
                    { value: 'sales_manager', label: '💼 مدير المبيعات (Sales Manager)' },
                    { value: 'marketing', label: '🎯 أخصائي تسويق (Marketing)' },
                    { value: 'marketing_manager', label: '📢 مدير التسويق (Marketing Manager)' },
                    { value: 'editor', label: '✍️ محرر محتوى (Editor)' },
                    { value: 'admin', label: '🛡️ مشرف عام (Admin)' },
                    { value: 'super_admin', label: '👑 مدير عام النظام' },
                    { value: 'viewer', label: '👁️ مستعرض (Viewer)' }
                  ]}
                />

                <AdminSelect
                  label={language === 'en' ? 'Account Status' : 'حالة الحساب'}
                  value={userForm.status}
                  onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                  options={[
                    { value: 'active', label: language === 'en' ? 'Active' : 'نشط' },
                    { value: 'suspended', label: language === 'en' ? 'Suspended' : 'معطل' }
                  ]}
                />
              </div>

              <AdminInput
                label={language === 'en' ? 'Phone' : 'رقم الهاتف'}
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                dir="ltr"
              />

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={actionLoading}
                >
                  {actionLoading ? (language === 'en' ? 'Saving...' : 'جاري الحفظ...') : (language === 'en' ? 'Save Changes' : 'حفظ التعديلات')}
                </Button>
              </div>
            </form>

          </Card>
        </div>
      )}

      {/* 10. Modal: Reset Password */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 sm:p-8 bg-dark-900 border-amber-500/30 shadow-2xl relative animate-scaleUp">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono" dir="ltr">{selectedUser.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4 mt-6">
              <AdminInput
                label={language === 'en' ? 'New Secure Password' : 'كلمة المرور الجديدة'}
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="••••••••"
                dir="ltr"
                required
              />

              <AdminInput
                label={language === 'en' ? 'Confirm New Password' : 'تأكيد كلمة المرور'}
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="••••••••"
                dir="ltr"
                required
              />

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </Button>
                <Button
                  type="submit"
                  variant="glow"
                  size="md"
                  disabled={actionLoading}
                >
                  {actionLoading ? (language === 'en' ? 'Resetting...' : 'جاري التعيين...') : (language === 'en' ? 'Set Password' : 'تحديث كلمة المرور')}
                </Button>
              </div>
            </form>

          </Card>
        </div>
      )}

      {/* 11. Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteUser}
          title={language === 'en' ? 'Delete User Account' : 'حذف حساب المستخدم'}
          message={language === 'en'
            ? `Are you sure you want to delete user "${selectedUser.name}" (${selectedUser.email})? This action cannot be undone.`
            : `هل أنت متأكد من رغبتك في حذف حساب "${selectedUser.name}" (${selectedUser.email}) نهائياً من النظام؟ لا يمكن التراجع عن هذا الإجراء.`
          }
          confirmText={language === 'en' ? 'Delete User' : 'نعم، حذف الحساب'}
          isDestructive
        />
      )}

    </div>
  );
}
