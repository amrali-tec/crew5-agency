import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Layers, FolderPlus, Sparkles, Code2, Film, Palette } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeCategory, localizeService } from '../../utils/localize';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminModal from '../../components/admin/ui/AdminModal';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';
import AdminSelect from '../../components/admin/ui/AdminSelect';

export default function AdminServicesPage() {
  const { services, refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [editingCategoryIdx, setEditingCategoryIdx] = useState(null);
  const [editingService, setEditingService] = useState(null);
  
  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryData, setEditingCategoryData] = useState(null);
  
  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteCategoryIdx, setDeleteCategoryIdx] = useState(null);
  const [loading, setLoading] = useState(false);

  // Category Form
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    titleEn: '',
    badge: '',
    badgeEn: '',
    description: '',
    descriptionEn: '',
    icon: 'Layers'
  });

  // Service Form
  const [serviceForm, setServiceForm] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    icon: 'Sparkles',
    featuresInput: '',
    featuresEnInput: ''
  });

  // 1. Category Actions
  const openAddCategory = () => {
    setEditingCategoryData(null);
    setCategoryForm({
      title: '',
      titleEn: '',
      badge: 'خدمات متكاملة',
      badgeEn: 'Full Suite',
      description: '',
      descriptionEn: '',
      icon: 'Layers'
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (catIdx, cat) => {
    setEditingCategoryData({ idx: catIdx, ...cat });
    setCategoryForm({
      title: cat.title || '',
      titleEn: cat.titleEn || '',
      badge: cat.badge || '',
      badgeEn: cat.badgeEn || '',
      description: cat.description || '',
      descriptionEn: cat.descriptionEn || '',
      icon: cat.icon || 'Layers'
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedCategories = JSON.parse(JSON.stringify(services));

    if (editingCategoryData !== null) {
      const idx = editingCategoryData.idx;
      updatedCategories[idx] = {
        ...updatedCategories[idx],
        title: categoryForm.title,
        titleEn: categoryForm.titleEn || categoryForm.title,
        badge: categoryForm.badge,
        badgeEn: categoryForm.badgeEn || categoryForm.badge,
        description: categoryForm.description,
        descriptionEn: categoryForm.descriptionEn || categoryForm.description,
        icon: categoryForm.icon
      };
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        title: categoryForm.title,
        titleEn: categoryForm.titleEn || categoryForm.title,
        badge: categoryForm.badge,
        badgeEn: categoryForm.badgeEn || categoryForm.badge,
        description: categoryForm.description,
        descriptionEn: categoryForm.descriptionEn || categoryForm.description,
        icon: categoryForm.icon,
        services: []
      };
      updatedCategories.push(newCategory);
    }

    try {
      await api.updateServices(updatedCategories);
      setIsCategoryModalOpen(false);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to save service category' : 'فشل حفظ القسم');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (deleteCategoryIdx === null) return;
    const updatedCategories = services.filter((_, idx) => idx !== deleteCategoryIdx);

    try {
      await api.updateServices(updatedCategories);
      setDeleteCategoryIdx(null);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to delete category' : 'فشل حذف القسم');
    }
  };

  // 2. Sub-Service Actions
  const openAddService = (catIdx) => {
    setEditingCategoryIdx(catIdx);
    setEditingService(null);
    setServiceForm({
      title: '',
      titleEn: '',
      description: '',
      descriptionEn: '',
      icon: 'Sparkles',
      featuresInput: 'ميزة 1\nميزة 2\nميزة 3',
      featuresEnInput: 'Feature 1\nFeature 2\nFeature 3'
    });
    setIsServiceModalOpen(true);
  };

  const openEditService = (catIdx, service) => {
    setEditingCategoryIdx(catIdx);
    setEditingService(service);
    setServiceForm({
      title: service.title || '',
      titleEn: service.titleEn || '',
      description: service.description || '',
      descriptionEn: service.descriptionEn || '',
      icon: service.icon || 'Sparkles',
      featuresInput: Array.isArray(service.features) ? service.features.join('\n') : '',
      featuresEnInput: Array.isArray(service.featuresEn) ? service.featuresEn.join('\n') : ''
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (editingCategoryIdx === null) return;
    setLoading(true);

    const features = serviceForm.featuresInput.split('\n').map(f => f.trim()).filter(Boolean);
    const featuresEn = serviceForm.featuresEnInput.split('\n').map(f => f.trim()).filter(Boolean);
    const updatedCategories = JSON.parse(JSON.stringify(services));

    if (editingService) {
      const sIdx = updatedCategories[editingCategoryIdx].services.findIndex(s => s.id === editingService.id);
      if (sIdx !== -1) {
        updatedCategories[editingCategoryIdx].services[sIdx] = {
          ...editingService,
          title: serviceForm.title,
          titleEn: serviceForm.titleEn || serviceForm.title,
          description: serviceForm.description,
          descriptionEn: serviceForm.descriptionEn || serviceForm.description,
          icon: serviceForm.icon,
          features,
          featuresEn: featuresEn.length > 0 ? featuresEn : features
        };
      }
    } else {
      const newService = {
        id: `service-${Date.now()}`,
        title: serviceForm.title,
        titleEn: serviceForm.titleEn || serviceForm.title,
        description: serviceForm.description,
        descriptionEn: serviceForm.descriptionEn || serviceForm.description,
        icon: serviceForm.icon,
        features,
        featuresEn: featuresEn.length > 0 ? featuresEn : features
      };
      updatedCategories[editingCategoryIdx].services.push(newService);
    }

    try {
      await api.updateServices(updatedCategories);
      setIsServiceModalOpen(false);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to save service' : 'فشل حفظ الخدمة');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    if (!deleteTarget) return;
    const { catIdx, serviceId } = deleteTarget;
    const updatedCategories = JSON.parse(JSON.stringify(services));
    updatedCategories[catIdx].services = updatedCategories[catIdx].services.filter(s => s.id !== serviceId);

    try {
      await api.updateServices(updatedCategories);
      setDeleteTarget(null);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to delete service' : 'فشل حذف الخدمة');
    }
  };

  const iconOptions = [
    { value: 'Sparkles', label: language === 'en' ? 'Sparkles (Creative)' : 'إبداع ولمعان (Sparkles)' },
    { value: 'Layers', label: language === 'en' ? 'Layers (Architecture)' : 'طبقات وحلول (Layers)' },
    { value: 'Code2', label: language === 'en' ? 'Code2 (Development)' : 'برمجة وتطوير (Code)' },
    { value: 'Palette', label: language === 'en' ? 'Palette (Design & Branding)' : 'تصميم وهوية (Palette)' },
    { value: 'Film', label: language === 'en' ? 'Film (Video & Motion)' : 'فيديو ومونتاج (Film)' }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Unified Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Services & Tiers Management' : 'إدارة وتعديل الخدمات والباقات'}
        subtitle={language === 'en' ? 'Add, edit, and organize core service departments, deliverables, and features' : 'إضافة وتعديل وحذف أقسام الخدمات الرئيسية والخدمات الفرعية ومميزاتها'}
        actionLabel={language === 'en' ? 'Add New Category' : 'إضافة قسم خدمة جديد'}
        onAction={openAddCategory}
      />

      {/* 2. Categories & Nested Services List */}
      <div className="space-y-8">
        {services.map((rawCat, catIdx) => {
          const cat = localizeCategory(rawCat, language);
          return (
            <Card key={rawCat.id || catIdx} className={`p-6 sm:p-8 space-y-6 border-white/[0.08] ${isRTL ? 'text-right' : 'text-left'}`}>
              
              {/* Category Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shadow-neon shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                      {cat.badge && <Badge variant="green">{cat.badge}</Badge>}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">{cat.description}</p>
                  </div>
                </div>

                {/* Category Control Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => openEditCategory(catIdx, rawCat)}
                    variant="outline"
                    size="sm"
                    icon={Edit2}
                  >
                    {language === 'en' ? 'Edit Category' : 'تعديل القسم'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setDeleteCategoryIdx(catIdx)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
                    title={language === 'en' ? 'Delete Category' : 'حذف القسم'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-services Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-300">
                    {language === 'en' ? `Sub-Services in this category (${cat.services?.length || 0})` : `الخدمات الفرعية التابعة للقسم (${cat.services?.length || 0})`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => openAddService(catIdx)}
                    className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Add Sub-Service' : 'إضافة خدمة فرعية'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rawCat.services?.map((rawSub, subIdx) => {
                    const sub = localizeService(rawSub, language);
                    return (
                      <div
                        key={rawSub.id || subIdx}
                        className="p-5 rounded-2xl bg-dark-950/60 border border-white/[0.06] hover:border-brand-green/30 transition-all flex flex-col justify-between space-y-4 group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-white group-hover:text-brand-green transition-colors">
                              {sub.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                            {sub.description}
                          </p>
                          {sub.features && sub.features.length > 0 && (
                            <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                              {sub.features.slice(0, 3).map((f, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                                  <CheckCircle2 className="w-3 h-3 text-brand-green shrink-0" />
                                  <span className="truncate">{f}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditService(catIdx, rawSub)}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                          >
                            {language === 'en' ? 'Edit' : 'تعديل'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget({ catIdx, serviceId: rawSub.id })}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                          >
                            {language === 'en' ? 'Delete' : 'حذف'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </Card>
          );
        })}
      </div>

      {/* Category Modal */}
      <AdminModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title={editingCategoryData ? (language === 'en' ? 'Edit Service Department' : 'تعديل قسم الخدمة') : (language === 'en' ? 'Add New Service Department' : 'إضافة قسم خدمة جديد')}
        subtitle={language === 'en' ? 'Fill in main service umbrella details' : 'املأ بيانات القسم الرئيسي وسيتم تحديثه في الموقع'}
        onSubmit={handleSaveCategory}
        loading={loading}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Department Title (Arabic)' : 'عنوان القسم الرئيسي (بالعربية)'}
            required
            value={categoryForm.title}
            onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
            placeholder="مثال: تطوير المواقع والتطبيقات السحابية"
          />
          <AdminInput
            label={language === 'en' ? 'Department Title (English)' : 'عنوان القسم الرئيسي (بالإنجليزية)'}
            value={categoryForm.titleEn}
            onChange={(e) => setCategoryForm({ ...categoryForm, titleEn: e.target.value })}
            placeholder="e.g. Web & Cloud Applications Engineering"
            dir="ltr"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Badge (Arabic)' : 'الشارة البارزة (بالعربية)'}
            value={categoryForm.badge}
            onChange={(e) => setCategoryForm({ ...categoryForm, badge: e.target.value })}
            placeholder="مثال: برمجة سحابية"
          />
          <AdminInput
            label={language === 'en' ? 'Badge (English)' : 'الشارة البارزة (بالإنجليزية)'}
            value={categoryForm.badgeEn}
            onChange={(e) => setCategoryForm({ ...categoryForm, badgeEn: e.target.value })}
            placeholder="e.g. Cloud Engineering"
            dir="ltr"
          />
        </div>

        <AdminTextarea
          label={language === 'en' ? 'Department Description (Arabic)' : 'وصف القسم (بالعربية)'}
          required
          rows={2}
          value={categoryForm.description}
          onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
          placeholder="شرح موجز عن تخصصات هذا القسم..."
        />

        <AdminTextarea
          label={language === 'en' ? 'Department Description (English)' : 'وصف القسم (بالإنجليزية)'}
          rows={2}
          value={categoryForm.descriptionEn}
          onChange={(e) => setCategoryForm({ ...categoryForm, descriptionEn: e.target.value })}
          placeholder="Brief summary of this department's offerings..."
          dir="ltr"
        />
      </AdminModal>

      {/* Sub-Service Modal */}
      <AdminModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingService ? (language === 'en' ? 'Edit Sub-Service' : 'تعديل الخدمة الفرعية') : (language === 'en' ? 'Add New Sub-Service' : 'إضافة خدمة فرعية جديدة')}
        subtitle={language === 'en' ? 'Fill in sub-service details and bullet points' : 'املأ تفاصيل الخدمة وقائمة المميزات والمخرجات'}
        onSubmit={handleSaveService}
        loading={loading}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Service Title (Arabic)' : 'عنوان الخدمة (بالعربية)'}
            required
            value={serviceForm.title}
            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
            placeholder="مثال: تصميم متاجر سلة وزد"
          />
          <AdminInput
            label={language === 'en' ? 'Service Title (English)' : 'عنوان الخدمة (بالإنجليزية)'}
            value={serviceForm.titleEn}
            onChange={(e) => setServiceForm({ ...serviceForm, titleEn: e.target.value })}
            placeholder="e.g. Salla & Zid Store Design"
            dir="ltr"
          />
        </div>

        <AdminTextarea
          label={language === 'en' ? 'Short Description (Arabic)' : 'وصف الخدمة (بالعربية)'}
          required
          rows={2}
          value={serviceForm.description}
          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
          placeholder="وصف تسويقي للمخرجات..."
        />

        <AdminTextarea
          label={language === 'en' ? 'Short Description (English)' : 'وصف الخدمة (بالإنجليزية)'}
          rows={2}
          value={serviceForm.descriptionEn}
          onChange={(e) => setServiceForm({ ...serviceForm, descriptionEn: e.target.value })}
          placeholder="Compelling service deliverables description..."
          dir="ltr"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminTextarea
            label={language === 'en' ? 'Key Features (Arabic - 1 per line)' : 'قائمة المميزات (بالعربية - كل ميزة في سطر)'}
            rows={4}
            value={serviceForm.featuresInput}
            onChange={(e) => setServiceForm({ ...serviceForm, featuresInput: e.target.value })}
            placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
          />
          <AdminTextarea
            label={language === 'en' ? 'Key Features (English - 1 per line)' : 'قائمة المميزات (بالإنجليزية - كل ميزة في سطر)'}
            rows={4}
            value={serviceForm.featuresEnInput}
            onChange={(e) => setServiceForm({ ...serviceForm, featuresEnInput: e.target.value })}
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            dir="ltr"
          />
        </div>
      </AdminModal>

      {/* Delete Category Confirmation */}
      <ConfirmModal
        isOpen={deleteCategoryIdx !== null}
        title={language === 'en' ? 'Confirm Category Deletion' : 'تأكيد حذف القسم الرئيسي'}
        message={language === 'en' ? 'Deleting this category will remove all nested sub-services. Are you sure?' : 'هل أنت متأكد من رغبتك في حذف هذا القسم وجميع الخدمات الفرعية التابعة له؟'}
        confirmText={language === 'en' ? 'Yes, Delete All' : 'نعم، احذف القسم بالكامل'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteCategoryIdx(null)}
      />

      {/* Delete Service Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title={language === 'en' ? 'Confirm Service Deletion' : 'تأكيد حذف الخدمة الفرعية'}
        message={language === 'en' ? 'Are you sure you want to permanently delete this sub-service?' : 'هل أنت متأكد من رغبتك في حذف هذه الخدمة الفرعية نهائياً؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDeleteService}
        onCancel={() => setDeleteTarget(null)}
      />

    </div>
  );
}
