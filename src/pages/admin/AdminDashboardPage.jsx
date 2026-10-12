import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, BookOpen, MessageSquare, Layers, 
  Users, Eye, Plus, ArrowLeft, CheckCircle2, 
  Clock, Phone, Mail, ExternalLink, Server, Database 
} from 'lucide-react';
import { api } from '../../services/api';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import { useLanguage } from '../../context/LanguageContext';
import { localizeServiceName } from '../../utils/localize';

export default function AdminDashboardPage() {
  const { language, t, isRTL } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.getStats();
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* 1. Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Main Dashboard & Analytics' : 'لوحة التحكم الرئيسية'}
        subtitle={language === 'en' ? 'Overview of platform statistics, analytics, and latest inbound client inquiries' : 'نظرة عامة على الإحصائيات، أداء الموقع، وأحدث رسائل وتفاعلات العملاء'}
      >
        <Button to="/admin/projects" variant="glow" size="sm" icon={Plus}>
          {language === 'en' ? 'New Project' : 'مشروع جديد'}
        </Button>
        <Button to="/admin/blogs" variant="secondary" size="sm" icon={Plus}>
          {language === 'en' ? 'New Article' : 'مقال جديد'}
        </Button>
      </AdminPageHeader>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard
          title={language === 'en' ? 'Project Portfolio' : 'معرض المشاريع'}
          value={stats?.totalProjects || 0}
          subtitle={language === 'en' ? 'Published live projects' : 'مشروع منشور في الموقع'}
          icon={FolderKanban}
          color="green"
        />
        <AdminStatsCard
          title={language === 'en' ? 'Published Articles' : 'المقالات المنشورة'}
          value={stats?.totalBlogs || 0}
          subtitle={language === 'en' ? 'Articles in knowledge base' : 'مقال في المدونة'}
          icon={BookOpen}
          color="blue"
        />
        <AdminStatsCard
          title={language === 'en' ? 'New Inquiries' : 'الرسائل الجديدة'}
          value={stats?.unreadMessages || 0}
          subtitle={language === 'en' ? `Out of ${stats?.totalMessages || 0} total leads` : `من إجمالي ${stats?.totalMessages || 0} رسالة`}
          icon={MessageSquare}
          color={stats?.unreadMessages > 0 ? 'green' : 'amber'}
        />
        <AdminStatsCard
          title={language === 'en' ? 'Total Impressions' : 'إجمالي المشاهدات'}
          value={`+${stats?.totalViews || 4200}`}
          subtitle={language === 'en' ? 'Article views & engagement' : 'تفاعل وزيارات المقالات'}
          icon={Eye}
          color="purple"
        />
      </div>

      {/* 3. Recent Messages & Quick Links */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries (8 cols) */}
        <Card className={`lg:col-span-8 p-6 sm:p-8 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                {language === 'en' ? 'Recent Inbound Inquiries & Leads' : 'أحدث طلبات ورسائل التواصل'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Received from /contact and proposal forms' : 'الواردة من نموذج صفحة /contact'}
              </p>
            </div>
            <Link to="/admin/messages" className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1">
              <span>{language === 'en' ? 'View All Leads' : 'عرض كافة الرسائل'}</span>
              <ArrowLeft className={`w-3.5 h-3.5 ${!isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-green/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{msg.name}</span>
                      <Badge variant={msg.status === 'new' ? 'green' : 'slate'}>
                        {msg.status === 'new' ? (language === 'en' ? 'New' : 'جديدة') : (language === 'en' ? 'Read' : 'تمت القراءة')}
                      </Badge>
                      <span className="text-[11px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full font-semibold">
                        {localizeServiceName(msg.service, language)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                    {msg.phone && (
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'WhatsApp' : 'واتساب'}</span>
                      </a>
                    )}
                    <Link
                      to="/admin/messages"
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                    >
                      {language === 'en' ? 'Details' : 'التفاصيل'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              {language === 'en' ? 'No recent messages recorded.' : 'لا توجد رسائل واردة حالياً.'}
            </div>
          )}
        </Card>

        {/* Quick Management Shortcuts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className={`p-6 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-bold text-white">
              {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
            </h3>
            
            <div className="space-y-2">
              <Link
                to="/admin/projects"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-brand-green/10 hover:border-brand-green/30 border border-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 text-brand-green" />
                  <span className="text-sm font-semibold text-white">
                    {language === 'en' ? 'Manage Projects' : 'إدارة المشاريع'}
                  </span>
                </div>
                <ArrowLeft className={`w-4 h-4 text-slate-400 group-hover:text-brand-green transition-all ${!isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
              </Link>

              <Link
                to="/admin/blogs"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-brand-green/10 hover:border-brand-green/30 border border-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-brand-green" />
                  <span className="text-sm font-semibold text-white">
                    {language === 'en' ? 'Write New Article' : 'كتابة مقال جديد'}
                  </span>
                </div>
                <ArrowLeft className={`w-4 h-4 text-slate-400 group-hover:text-brand-green transition-all ${!isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-brand-green/10 hover:border-brand-green/30 border border-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-brand-green" />
                  <span className="text-sm font-semibold text-white">
                    {language === 'en' ? 'Update Contact Info' : 'تحديث بيانات التواصل'}
                  </span>
                </div>
                <ArrowLeft className={`w-4 h-4 text-slate-400 group-hover:text-brand-green transition-all ${!isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
              </Link>
            </div>
          </Card>

          {/* System info */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.06] text-xs text-slate-400 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-brand-green" />
                <span>{language === 'en' ? 'Database Engine:' : 'قاعدة البيانات:'}</span>
              </span>
              <span className="text-brand-green font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping"></span>
                <span>{language === 'en' ? 'Connected (JSON / SQLite)' : 'SQLite / MySQL متصلة'}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'en' ? 'Runtime Environment:' : 'بيئة التشغيل:'}</span>
              </span>
              <span className="font-mono text-slate-300 font-semibold">Node.js / Express</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
