import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, BookOpen, Layers, 
  MessageSquare, Star, Users, Settings, LogOut, 
  Menu, X, ExternalLink, Bell, Shield, CheckCircle2, Layout, Sparkles, Boxes, Globe,
  ShieldCheck, UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import SeoHead from '../ui/SeoHead';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchUnread() {
      try {
        const res = await api.getStats();
        if (res.success && res.data) {
          setUnreadCount(res.data.unreadMessages || 0);
        }
      } catch (err) {}
    }
    fetchUnread();
    const interval = setInterval(fetchUnread, 15000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: t('admin.dashboard', 'الرئيسية والإحصائيات'), path: '/admin/dashboard', icon: LayoutDashboard },
    { label: t('admin.clientProjects', 'مشاريع العملاء والتتبع'), path: '/admin/client-projects', icon: Shield },
    { label: t('admin.pageBuilder', 'منشئ وإدارة الصفحات'), path: '/admin/pages', icon: Layout },
    { label: t('admin.components', 'المكونات العامة والمخصصة'), path: '/admin/components', icon: Boxes },
    { label: t('admin.projects', 'إدارة المشاريع'), path: '/admin/projects', icon: FolderKanban },
    { label: t('admin.blogs', 'المدونة والمقالات'), path: '/admin/blogs', icon: BookOpen },
    { label: t('admin.services', 'الخدمات والباقات'), path: '/admin/services', icon: Layers },
    { 
      label: t('admin.messages', 'الرسائل الواردة'), 
      path: '/admin/messages', 
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : null 
    },
    { label: t('admin.testimonials', 'آراء العملاء'), path: '/admin/testimonials', icon: Star },
    { label: t('admin.team', 'فريق العمل'), path: '/admin/team', icon: Users },
    { label: t('admin.users', 'إدارة المستخدمين والأمان'), path: '/admin/users', icon: ShieldCheck },
    { label: t('admin.sections', 'أقسام ومحتوى الموقع'), path: '/admin/sections', icon: Sparkles },
    { label: t('admin.settings', 'إعدادات الموقع'), path: '/admin/settings', icon: Settings },
  ];

  // Role-Based Navigation Filtering
  const userRole = (user?.role || '').toLowerCase();
  const isSuperAdmin = userRole === 'super_admin' || userRole === 'super admin';
  const isAdmin = userRole === 'admin';
  const isSales = userRole === 'sales' || userRole === 'sales_manager';
  const isMarketing = userRole === 'marketing' || userRole === 'marketing_manager';
  const isEditor = userRole === 'editor';

  const visibleNavItems = navItems.filter(item => {
    if (isSuperAdmin || isAdmin) return true; // Super Admin & Admin see everything
    if (isSales) {
      return ['/admin/dashboard', '/admin/client-projects', '/admin/messages', '/admin/testimonials', '/admin/team', '/admin/users'].includes(item.path);
    }
    if (isMarketing) {
      return ['/admin/dashboard', '/admin/blogs', '/admin/projects', '/admin/testimonials', '/admin/sections', '/admin/team', '/admin/users'].includes(item.path);
    }
    if (isEditor) {
      return ['/admin/dashboard', '/admin/blogs', '/admin/projects', '/admin/services', '/admin/sections', '/admin/users'].includes(item.path);
    }
    return ['/admin/dashboard', '/admin/projects', '/admin/blogs', '/admin/users'].includes(item.path);
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col md:flex-row">
      <SeoHead
        title="لوحة التحكم الإدارية | Crew5 Admin Portal"
        noindex={true}
      />
      
      {/* 1. Sidebar (Desktop) */}
      <aside className={`hidden md:flex md:w-64 lg:w-72 flex-col justify-between bg-dark-900 ${isRTL ? 'border-l' : 'border-r'} border-white/[0.08] p-6 shrink-0 h-screen sticky top-0`}>
        <div className="space-y-6">
          
          {/* Logo & Badge */}
          <div className="flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center p-0.5 shadow-neon">
                <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-montserrat font-extrabold text-xl text-brand-green">5</span>
                </div>
              </div>
              <div>
                <span className="font-montserrat font-black text-lg text-white">Crew5 Admin</span>
                <span className="text-[11px] text-brand-green block font-bold">{t('admin.portalTitle')}</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)] pr-1 custom-scrollbar">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs xl:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-green text-dark-950 shadow-neon'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-black font-montserrat ${
                      isActive ? 'bg-dark-950 text-brand-green' : 'bg-brand-green text-dark-950 animate-pulse'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Info & Actions */}
        <div className="pt-4 border-t border-white/[0.08] space-y-2">
          
          {/* Language Switcher in Admin Sidebar */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-green" />
              <span>{language === 'ar' ? 'English Interface' : 'الواجهة العربية'}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-green/20 text-brand-green font-mono uppercase">
              {language === 'ar' ? 'EN' : 'AR'}
            </span>
          </button>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-brand-green" />
              <span>{t('admin.viewSite')}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors border border-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('admin.logout')}</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-green" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                {navItems.find(n => n.path === location.pathname)?.label || t('admin.portalTitle')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Top Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-brand-green" />
              <span className="font-montserrat uppercase">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <Link
              to="/admin/messages"
              className="relative p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-brand-green transition-colors"
              title={t('admin.messages')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-brand-green animate-ping"></span>
              )}
            </Link>

            <div className={`flex items-center gap-3 ${isRTL ? 'pr-2 border-r' : 'pl-2 border-l'} border-white/10`}>
              <div className="w-9 h-9 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green font-bold text-sm font-montserrat">
                A
              </div>
              <div className={`hidden sm:block ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="text-xs font-bold text-white block">
                  {language === 'en' ? (user?.name === 'مدير النظام' ? 'Super Admin' : (user?.name || 'Super Admin')) : (user?.name || 'مدير النظام')}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{user?.email || 'admin@crew5.agency'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="p-6 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-dark-950/98 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-green flex items-center justify-center p-0.5 shadow-neon">
                  <div className="w-full h-full bg-dark-950 rounded-[8px] flex items-center justify-center">
                    <span className="font-montserrat font-extrabold text-base text-brand-green">5</span>
                  </div>
                </div>
                <span className="font-montserrat font-black text-lg text-white">Crew5 Admin</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl bg-white/5 text-slate-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold ${
                      isActive ? 'bg-brand-green text-dark-950' : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
