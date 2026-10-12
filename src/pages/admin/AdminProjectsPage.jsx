import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeProject } from '../../utils/localize';
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

export default function AdminProjectsPage() {
  const { projects, refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    titleEn: '',
    slug: '',
    category: 'بناء الهوية والتصميم',
    categoryEn: 'Brand Identity',
    categoryKey: 'branding',
    client: '',
    clientEn: '',
    year: '2025',
    description: '',
    descriptionEn: '',
    fullDetails: '',
    fullDetailsEn: '',
    imageUrl: '/assets/project_branding_nokhabat.jpg',
    tags: ['هوية بصرية', 'تصميم شعار'],
    result1Label: 'زيادة الوصول',
    result1Value: '+150%',
    result2Label: 'مدة التنفيذ',
    result2Value: 'أسبوعين',
    status: 'published',
    scheduledAt: ''
  });

  const openCreate = () => {
    setEditingProject(null);
    setForm({
      title: '',
      titleEn: '',
      slug: `project-${Date.now()}`,
      category: 'بناء الهوية والتصميم',
      categoryEn: 'Brand Identity',
      categoryKey: 'branding',
      client: '',
      clientEn: '',
      year: new Date().getFullYear().toString(),
      description: '',
      descriptionEn: '',
      fullDetails: '',
      fullDetailsEn: '',
      imageUrl: '/assets/project_branding_nokhabat.jpg',
      tags: ['هوية بصرية', 'تصميم شعار'],
      result1Label: 'زيادة الوصول',
      result1Value: '+150%',
      result2Label: 'مدة التنفيذ',
      result2Value: 'أسبوعين',
      status: 'published',
      scheduledAt: ''
    });
    setIsModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingProject(p);
    setForm({
      title: p.title || '',
      titleEn: p.titleEn || '',
      slug: p.slug || '',
      category: p.category || 'بناء الهوية والتصميم',
      categoryEn: p.categoryEn || 'Brand Identity',
      categoryKey: p.categoryKey || 'branding',
      client: p.client || '',
      clientEn: p.clientEn || '',
      year: p.year || '2025',
      description: p.description || '',
      descriptionEn: p.descriptionEn || '',
      fullDetails: p.fullDetails || '',
      fullDetailsEn: p.fullDetailsEn || '',
      imageUrl: p.imageUrl || '',
      tags: Array.isArray(p.tags) ? p.tags : [],
      result1Label: p.results?.[0]?.label || '',
      result1Value: p.results?.[0]?.value || '',
      result2Label: p.results?.[1]?.label || '',
      result2Value: p.results?.[1]?.value || '',
      status: p.status || (p.isPublished === false ? 'archived' : 'published'),
      scheduledAt: p.scheduledAt || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const results = [
      { label: form.result1Label, value: form.result1Value },
      { label: form.result2Label, value: form.result2Value }
    ].filter(r => r.label && r.value);

    const payload = {
      title: form.title,
      titleEn: form.titleEn || form.title,
      slug: form.slug || `project-${Date.now()}`,
      category: form.category,
      categoryEn: form.categoryEn,
      categoryKey: form.categoryKey,
      client: form.client,
      clientEn: form.clientEn,
      year: form.year,
      description: form.description,
      descriptionEn: form.descriptionEn || form.description,
      fullDetails: form.fullDetails,
      fullDetailsEn: form.fullDetailsEn || form.fullDetails,
      imageUrl: form.imageUrl,
      tags: form.tags,
      results,
      status: form.status,
      scheduledAt: form.status === 'scheduled' ? form.scheduledAt : null,
      isPublished: form.status === 'published'
    };

    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, payload);
      } else {
        await api.createProject(payload);
      }
      setIsModalOpen(false);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Error saving project' : 'حدث خطأ أثناء حفظ المشروع');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteProject(deleteId);
      setDeleteId(null);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Error deleting project' : 'حدث خطأ أثناء الحذف');
    }
  };

  const columns = [
    {
      header: language === 'en' ? 'Project' : 'المشروع',
      accessor: 'title',
      render: (val, row) => {
        const p = localizeProject(row, language);
        return (
          <div className="flex items-center gap-3">
            <img
              src={p.imageUrl}
              alt={p.title}
              className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div>
              <span className="font-bold text-white block">{p.title}</span>
              <span className="text-xs text-slate-400 line-clamp-1">{p.description}</span>
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
        const p = localizeProject(row, language);
        return <Badge variant="green">{p.category}</Badge>;
      }
    },
    {
      header: language === 'en' ? 'Client' : 'العميل',
      accessor: 'client',
      render: (val, row) => {
        const p = localizeProject(row, language);
        return <span className="text-slate-300 font-medium">{p.client || '—'}</span>;
      }
    },
    {
      header: language === 'en' ? 'Year' : 'السنة',
      accessor: 'year',
      render: (val) => <span className="font-montserrat font-semibold text-slate-400">{val}</span>
    }
  ];

  const categoryOptions = [
    { value: 'branding', label: language === 'en' ? 'Brand Identity & Design' : 'بناء الهوية والتصميم' },
    { value: 'marketing', label: language === 'en' ? 'Social Media & Growth' : 'التسويق عبر وسائل التواصل' },
    { value: 'web', label: language === 'en' ? 'Web & Stores Engineering' : 'تصميم وتطوير المواقع' },
    { value: 'video', label: language === 'en' ? 'Cinematic Video & 3D' : 'الإنتاج المرئي والمونتاج' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Unified Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Portfolio & Projects Management' : 'إدارة معرض المشاريع'}
        subtitle={language === 'en' ? 'Create, edit, and organize public client case studies and deliverables' : 'إضافة وتعديل وحذف مشاريع وأعمال الوكالة المنشورة'}
        actionLabel={language === 'en' ? 'Add New Project' : 'إضافة مشروع جديد'}
        onAction={openCreate}
      />

      {/* Unified Data Table */}
      <AdminTable
        columns={columns}
        data={projects}
        searchPlaceholder={language === 'en' ? 'Search projects or clients...' : 'بحث في المشاريع أو العملاء...'}
        searchKey="title"
        onEdit={openEdit}
        onDelete={(p) => setDeleteId(p.id)}
      />

      {/* Unified Modal Form */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? (language === 'en' ? 'Edit Project Details' : 'تعديل بيانات المشروع') : (language === 'en' ? 'Add New Project' : 'إضافة مشروع جديد')}
        subtitle={language === 'en' ? 'Fill in the details below to update the live website immediately' : 'املأ البيانات أدناه وسيتم تحديثها فوراً في الموقع'}
        onSubmit={handleSave}
        loading={loading}
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
            label={language === 'en' ? 'Project Title (Arabic)' : 'عنوان المشروع (بالعربية)'}
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="مثال: بناء الهوية البصرية لشركة نخبة العباقرة"
          />
          <AdminInput
            label={language === 'en' ? 'Project Title (English)' : 'عنوان المشروع (بالإنجليزية)'}
            value={form.titleEn}
            onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
            placeholder="e.g. Brand Identity for Genius Elite"
            dir="ltr"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminSelect
            label={language === 'en' ? 'Category' : 'التصنيف'}
            required
            value={form.categoryKey}
            options={categoryOptions}
            onChange={(e) => {
              const key = e.target.value;
              const selected = categoryOptions.find(o => o.value === key);
              setForm({ 
                ...form, 
                categoryKey: key, 
                category: selected?.label || key,
                categoryEn: selected?.label || key
              });
            }}
          />

          <AdminInput
            label={language === 'en' ? 'Client Name' : 'اسم العميل'}
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            placeholder="مثال: شركة نخبة العباقرة"
          />
        </div>

        <AdminImageUpload
          label={language === 'en' ? 'Main Project Image' : 'صورة المشروع الرئيسية'}
          required
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
        />

        <AdminTextarea
          label={language === 'en' ? 'Short Description (Arabic)' : 'وصف مختصر للمشروع (بالعربية)'}
          required
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="اكتب ملخصاً جذاباً للمشروع يظهر في بطاقات المعرض..."
        />

        <AdminTextarea
          label={language === 'en' ? 'Short Description (English)' : 'وصف مختصر للمشروع (بالإنجليزية)'}
          rows={2}
          value={form.descriptionEn}
          onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
          placeholder="Enter engaging project summary in English..."
          dir="ltr"
        />

        <AdminTextarea
          label={language === 'en' ? 'Scope & Deliverables Details (Arabic)' : 'تفاصيل ونطاق العمل المنجز (بالعربية)'}
          rows={3}
          value={form.fullDetails}
          onChange={(e) => setForm({ ...form, fullDetails: e.target.value })}
          placeholder="شرح تفصيلي عن مراحل العمل والمخرجات..."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'KPI 1 Label' : 'مؤشر إنجاز 1 (العنوان)'}
            value={form.result1Label}
            onChange={(e) => setForm({ ...form, result1Label: e.target.value })}
            placeholder={language === 'en' ? 'e.g. Brand Recognition' : 'مثال: زيادة تميز العلامة'}
          />
          <AdminInput
            label={language === 'en' ? 'KPI 1 Value' : 'مؤشر إنجاز 1 (القيمة / النسبة)'}
            value={form.result1Value}
            onChange={(e) => setForm({ ...form, result1Value: e.target.value })}
            placeholder="مثال: +85%"
            dir="ltr"
          />
        </div>

        <AdminTagsInput
          label={language === 'en' ? 'Project Tags' : 'وسوم المشروع'}
          tags={form.tags}
          onChange={(newTags) => setForm({ ...form, tags: newTags })}
          placeholder={language === 'en' ? 'Type tag and press Enter' : 'أدخل الوسم ثم اضغط Enter (مثال: هوية, شعار)'}
        />
      </AdminModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title={language === 'en' ? 'Confirm Project Deletion' : 'تأكيد حذف المشروع'}
        message={language === 'en' ? 'Are you sure you want to permanently delete this project?' : 'هل أنت متأكد من رغبتك في حذف هذا المشروع نهائياً من قاعدة البيانات؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  );
}
