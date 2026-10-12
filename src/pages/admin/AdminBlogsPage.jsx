import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBlog } from '../../utils/localize';
import Badge from '../../components/ui/Badge';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminModal from '../../components/admin/ui/AdminModal';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';
import AdminSelect from '../../components/admin/ui/AdminSelect';
import AdminImageUpload from '../../components/admin/ui/AdminImageUpload';
import AdminTagsInput from '../../components/admin/ui/AdminTagsInput';
import AdminTable from '../../components/admin/ui/AdminTable';
import AdminPublishStatusPicker, { PublishStatusBadge } from '../../components/admin/ui/AdminPublishStatusPicker';

export default function AdminBlogsPage() {
  const { blogs, refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    titleEn: '',
    slug: '',
    category: 'التحول الرقمي',
    categoryEn: 'Digital Transformation',
    readTime: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    date: '٢٨ أغسطس ٢٠٢٦',
    dateEn: 'August 28, 2026',
    authorName: 'محمد أحمد',
    authorRole: 'خبير استراتيجيات التسويق',
    authorAvatar: '/assets/avatar_2.jpg',
    excerpt: '',
    excerptEn: '',
    content: '',
    contentEn: '',
    imageUrl: '/assets/blog_digital_marketing_2025.jpg',
    tags: ['تسويق رقمي', 'ذكاء اصطناعي'],
    status: 'published',
    scheduledAt: ''
  });

  const openCreate = () => {
    setEditingBlog(null);
    setForm({
      title: '',
      titleEn: '',
      slug: `post-${Date.now()}`,
      category: 'التحول الرقمي',
      categoryEn: 'Digital Transformation',
      readTime: language === 'en' ? '4 min read' : '4 دقائق قراءة',
      readTimeEn: '4 min read',
      date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
      dateEn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      authorName: 'محمد أحمد',
      authorRole: language === 'en' ? 'Marketing Strategist' : 'خبير استراتيجيات التسويق',
      authorAvatar: '/assets/avatar_2.jpg',
      excerpt: '',
      excerptEn: '',
      content: '<p>Content goes here...</p>',
      contentEn: '<p>Content goes here...</p>',
      imageUrl: '/assets/blog_digital_marketing_2025.jpg',
      tags: ['تسويق رقمي', 'نمو', 'إبداع'],
      status: 'published',
      scheduledAt: ''
    });
    setIsModalOpen(true);
  };

  const openEdit = (b) => {
    setEditingBlog(b);
    setForm({
      title: b.title || '',
      titleEn: b.titleEn || '',
      slug: b.slug || '',
      category: b.category || 'التحول الرقمي',
      categoryEn: b.categoryEn || 'Digital Transformation',
      readTime: b.readTime || '4 دقائق قراءة',
      readTimeEn: b.readTimeEn || '4 min read',
      date: b.date || '',
      dateEn: b.dateEn || '',
      authorName: b.author?.name || 'محمد أحمد',
      authorRole: b.author?.role || 'فريق Crew5',
      authorAvatar: b.author?.avatar || '/assets/avatar_2.jpg',
      excerpt: b.excerpt || '',
      excerptEn: b.excerptEn || '',
      content: b.content || '',
      contentEn: b.contentEn || '',
      imageUrl: b.imageUrl || '',
      tags: Array.isArray(b.tags) ? b.tags : [],
      status: b.status || (b.isPublished === false ? 'archived' : 'published'),
      scheduledAt: b.scheduledAt || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      titleEn: form.titleEn || form.title,
      slug: form.slug || `post-${Date.now()}`,
      category: form.category,
      categoryEn: form.categoryEn,
      readTime: form.readTime,
      readTimeEn: form.readTimeEn,
      date: form.date,
      dateEn: form.dateEn,
      excerpt: form.excerpt,
      excerptEn: form.excerptEn || form.excerpt,
      content: form.content,
      contentEn: form.contentEn || form.content,
      imageUrl: form.imageUrl,
      tags: form.tags,
      status: form.status,
      scheduledAt: form.status === 'scheduled' ? form.scheduledAt : null,
      isPublished: form.status === 'published',
      author: {
        name: form.authorName,
        role: form.authorRole,
        avatar: form.authorAvatar
      }
    };

    try {
      if (editingBlog) {
        await api.updateBlog(editingBlog.id, payload);
      } else {
        await api.createBlog(payload);
      }
      setIsModalOpen(false);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Error saving article' : 'حدث خطأ أثناء حفظ المقال');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteBlog(deleteId);
      setDeleteId(null);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Error deleting article' : 'حدث خطأ أثناء الحذف');
    }
  };

  const columns = [
    {
      header: language === 'en' ? 'Article' : 'المقال',
      accessor: 'title',
      render: (val, row) => {
        const b = localizeBlog(row, language);
        return (
          <div className="flex items-center gap-3">
            <img
              src={b.imageUrl}
              alt={b.title}
              className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div>
              <span className="font-bold text-white block">{b.title}</span>
              <span className="text-xs text-slate-400 line-clamp-1">{b.excerpt}</span>
            </div>
          </div>
        );
      }
    },
    {
      header: language === 'en' ? 'Publish Status' : 'حالة النشر',
      accessor: 'status',
      render: (_, row) => (
        <PublishStatusBadge
          status={row.status}
          scheduledAt={row.scheduledAt}
          isPublished={row.isPublished}
        />
      )
    },
    {
      header: language === 'en' ? 'Category' : 'التصنيف',
      accessor: 'category',
      render: (val, row) => {
        const b = localizeBlog(row, language);
        return <Badge variant="green">{b.category}</Badge>;
      }
    },
    {
      header: language === 'en' ? 'Author' : 'الكاتب',
      accessor: 'author',
      render: (_, row) => {
        const b = localizeBlog(row, language);
        return (
          <div className="flex items-center gap-2">
            {b.author?.avatar && (
              <img src={b.author.avatar} alt="Author" className="w-6 h-6 rounded-full object-cover" />
            )}
            <span className="text-slate-300 text-xs font-semibold">{b.author?.name || 'Crew5'}</span>
          </div>
        );
      }
    },
    {
      header: language === 'en' ? 'Date' : 'تاريخ النشر',
      accessor: 'date',
      render: (val, row) => {
        const b = localizeBlog(row, language);
        return <span className="font-montserrat text-xs text-slate-400">{b.date}</span>;
      }
    }
  ];

  const categoryOptions = [
    { value: 'التحول الرقمي', label: language === 'en' ? 'Digital Transformation' : 'التحول الرقمي' },
    { value: 'التسويق الرقمي', label: language === 'en' ? 'Digital Marketing & Ads' : 'التسويق الرقمي' },
    { value: 'الهوية البصرية', label: language === 'en' ? 'Brand Identity' : 'الهوية البصرية' },
    { value: 'تطوير الويب والسيو', label: language === 'en' ? 'Web Development & SEO' : 'تطوير الويب والسيو' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Unified Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Blog & Content Management' : 'إدارة المدونة والمقالات'}
        subtitle={language === 'en' ? 'Create, optimize, and schedule SEO articles and industry insights' : 'إضافة وتعديل وحذف المقالات والأبحاث المنشورة في مدونة الوكالة'}
        actionLabel={language === 'en' ? 'Write New Article' : 'كتابة مقال جديد'}
        onAction={openCreate}
      />

      {/* Unified Data Table */}
      <AdminTable
        columns={columns}
        data={blogs}
        searchPlaceholder={language === 'en' ? 'Search articles or topics...' : 'بحث في عناوين المقالات...'}
        searchKey="title"
        onEdit={openEdit}
        onDelete={(b) => setDeleteId(b.id)}
      />

      {/* Unified Modal Form */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? (language === 'en' ? 'Edit Article' : 'تعديل المقال') : (language === 'en' ? 'Write New Article' : 'كتابة مقال جديد')}
        subtitle={language === 'en' ? 'Fill in the details below to update the live blog immediately' : 'املأ البيانات أدناه وسيتم تحديثها فوراً في الموقع'}
        onSubmit={handleSave}
        loading={loading}
        maxWidth="max-w-4xl"
      >
        {/* Publishing Status / Archival / Scheduling */}
        <AdminPublishStatusPicker
          status={form.status}
          onChangeStatus={(s) => setForm({ ...form, status: s })}
          scheduledAt={form.scheduledAt}
          onChangeScheduledAt={(dt) => setForm({ ...form, scheduledAt: dt })}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Article Title (Arabic)' : 'عنوان المقال (بالعربية)'}
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="مثال: استراتيجيات التسويق الرقمي لعام 2026"
          />
          <AdminInput
            label={language === 'en' ? 'Article Title (English)' : 'عنوان المقال (بالإنجليزية)'}
            value={form.titleEn}
            onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
            placeholder="e.g. Digital Marketing Strategies for 2026"
            dir="ltr"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminSelect
            label={language === 'en' ? 'Category' : 'التصنيف'}
            required
            value={form.category}
            options={categoryOptions}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <AdminInput
            label={language === 'en' ? 'Read Time' : 'مدة القراءة'}
            value={form.readTime}
            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
            placeholder={language === 'en' ? 'e.g. 5 min read' : 'مثال: 5 دقائق قراءة'}
          />
        </div>

        <AdminImageUpload
          label={language === 'en' ? 'Featured Image' : 'صورة المقال البارزة'}
          required
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
        />

        <AdminTextarea
          label={language === 'en' ? 'Article Excerpt (Arabic)' : 'المقدمة والملخص (بالعربية)'}
          required
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="مقدمة سريعة تظهر في بطاقات المدونة..."
        />

        <AdminTextarea
          label={language === 'en' ? 'Article Excerpt (English)' : 'المقدمة والملخص (بالإنجليزية)'}
          rows={2}
          value={form.excerptEn}
          onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
          placeholder="Short compelling summary for blog cards..."
          dir="ltr"
        />

        <AdminTextarea
          label={language === 'en' ? 'Article Body (Arabic HTML / Text)' : 'محتوى المقال كاملاً (بالعربية - يدعم HTML)'}
          required
          rows={6}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="<p>اكتب فقرات المقال هنا...</p>"
        />

        <AdminTextarea
          label={language === 'en' ? 'Article Body (English HTML / Text)' : 'محتوى المقال كاملاً (بالإنجليزية - يدعم HTML)'}
          rows={6}
          value={form.contentEn}
          onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
          placeholder="<p>Full English article content...</p>"
          dir="ltr"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Author Name' : 'اسم الكاتب'}
            value={form.authorName}
            onChange={(e) => setForm({ ...form, authorName: e.target.value })}
          />
          <AdminInput
            label={language === 'en' ? 'Author Role' : 'صفة الكاتب'}
            value={form.authorRole}
            onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
          />
        </div>

        <AdminTagsInput
          label={language === 'en' ? 'Article Tags' : 'وسوم المقال'}
          tags={form.tags}
          onChange={(newTags) => setForm({ ...form, tags: newTags })}
          placeholder={language === 'en' ? 'Type tag and press Enter' : 'أدخل الوسم ثم اضغط Enter'}
        />
      </AdminModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title={language === 'en' ? 'Confirm Article Deletion' : 'تأكيد حذف المقال'}
        message={language === 'en' ? 'Are you sure you want to delete this article?' : 'هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً من قاعدة البيانات؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  );
}
