import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeTestimonial } from '../../utils/localize';
import Card from '../../components/ui/Card';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminModal from '../../components/admin/ui/AdminModal';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';
import AdminSelect from '../../components/admin/ui/AdminSelect';
import AdminImageUpload from '../../components/admin/ui/AdminImageUpload';

export default function AdminTestimonialsPage() {
  const { testimonials, refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    nameEn: '',
    role: '',
    roleEn: '',
    review: '',
    reviewEn: '',
    avatar: '/assets/avatar_1.jpg',
    rating: 5,
    project: '',
    projectEn: ''
  });

  const openCreate = () => {
    setEditingItem(null);
    setForm({
      name: '',
      nameEn: '',
      role: '',
      roleEn: '',
      review: '',
      reviewEn: '',
      avatar: '/assets/avatar_1.jpg',
      rating: 5,
      project: '',
      projectEn: ''
    });
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name || '',
      nameEn: item.nameEn || '',
      role: item.role || '',
      roleEn: item.roleEn || '',
      review: item.review || '',
      reviewEn: item.reviewEn || '',
      avatar: item.avatar || '/assets/avatar_1.jpg',
      rating: item.rating || 5,
      project: item.project || '',
      projectEn: item.projectEn || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: form.name,
      nameEn: form.nameEn || form.name,
      role: form.role,
      roleEn: form.roleEn || form.role,
      review: form.review,
      reviewEn: form.reviewEn || form.review,
      avatar: form.avatar,
      rating: form.rating,
      project: form.project,
      projectEn: form.projectEn || form.project
    };

    try {
      if (editingItem) {
        await api.updateTestimonial(editingItem.id, payload);
      } else {
        await api.createTestimonial(payload);
      }
      setIsModalOpen(false);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to save testimonial' : 'فشل حفظ التقييم');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteTestimonial(deleteId);
      setDeleteId(null);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to delete testimonial' : 'فشل حذف التقييم');
    }
  };

  const ratingOptions = [
    { value: 5, label: language === 'en' ? '⭐⭐⭐⭐⭐ (5 Stars)' : '⭐⭐⭐⭐⭐ (5 نجوم)' },
    { value: 4, label: language === 'en' ? '⭐⭐⭐⭐ (4 Stars)' : '⭐⭐⭐⭐ (4 نجوم)' },
    { value: 3, label: language === 'en' ? '⭐⭐⭐ (3 Stars)' : '⭐⭐⭐ (3 نجوم)' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Unified Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Client Testimonials & Reviews' : 'إدارة آراء وتقييمات العملاء'}
        subtitle={language === 'en' ? 'Manage verified partner endorsements and client satisfaction quotes' : 'إضافة وتعديل آراء العملاء المعروضة في الصفحة الرئيسية'}
        actionLabel={language === 'en' ? 'Add New Testimonial' : 'إضافة تقييم جديد'}
        onAction={openCreate}
      />

      {/* Grid View */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => {
          const t = localizeTestimonial(item, language);
          return (
            <Card key={item.id} className={`p-6 flex flex-col justify-between space-y-4 border-white/[0.08] ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {t.project && (
                    <span className="text-[11px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full font-semibold">
                      {t.project}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">{t.name}</span>
                    <span className="text-xs text-slate-400 block">{t.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Edit' : 'تعديل'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Delete' : 'حذف'}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal Form */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? (language === 'en' ? 'Edit Testimonial' : 'تعديل التقييم') : (language === 'en' ? 'Add New Testimonial' : 'إضافة تقييم جديد')}
        subtitle={language === 'en' ? 'Fill in the client review details below' : 'املأ بيانات رأي العميل وسيتم إدراجه في الموقع'}
        onSubmit={handleSave}
        loading={loading}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Client Name (Arabic)' : 'اسم العميل (بالعربية)'}
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="مثال: م. فهد القحطاني"
          />
          <AdminInput
            label={language === 'en' ? 'Client Name (English)' : 'اسم العميل (بالإنجليزية)'}
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            placeholder="e.g. Eng. Fahad Al-Qahtani"
            dir="ltr"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Role / Company (Arabic)' : 'الصفة أو اسم الشركة (بالعربية)'}
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="مثال: الرئيس التنفيذي - شركة سحاب"
          />
          <AdminInput
            label={language === 'en' ? 'Role / Company (English)' : 'الصفة أو اسم الشركة (بالإنجليزية)'}
            value={form.roleEn}
            onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
            placeholder="e.g. CEO - Sahab Tech"
            dir="ltr"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminSelect
            label={language === 'en' ? 'Star Rating' : 'التقييم بالنجوم'}
            value={form.rating}
            options={ratingOptions}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          />

          <AdminInput
            label={language === 'en' ? 'Associated Project' : 'المشروع المنفذ'}
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            placeholder="مثال: هوية بصرية كاملة"
          />
        </div>

        <AdminImageUpload
          label={language === 'en' ? 'Client Avatar Photo' : 'صورة العميل الشخصية'}
          value={form.avatar}
          onChange={(url) => setForm({ ...form, avatar: url })}
        />

        <AdminTextarea
          label={language === 'en' ? 'Testimonial Review (Arabic)' : 'نص الرأي والتقييم (بالعربية)'}
          required
          rows={3}
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          placeholder="اكتب تجربة العميل مع الوكالة..."
        />

        <AdminTextarea
          label={language === 'en' ? 'Testimonial Review (English)' : 'نص الرأي والتقييم (بالإنجليزية)'}
          rows={3}
          value={form.reviewEn}
          onChange={(e) => setForm({ ...form, reviewEn: e.target.value })}
          placeholder="Write the client's endorsement quote in English..."
          dir="ltr"
        />
      </AdminModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title={language === 'en' ? 'Confirm Testimonial Deletion' : 'تأكيد حذف التقييم'}
        message={language === 'en' ? 'Are you sure you want to permanently delete this testimonial?' : 'هل أنت متأكد من رغبتك في حذف هذا التقييم نهائياً؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  );
}
