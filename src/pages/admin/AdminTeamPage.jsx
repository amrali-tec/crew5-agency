import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeTeamMember } from '../../utils/localize';
import Card from '../../components/ui/Card';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminModal from '../../components/admin/ui/AdminModal';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';
import AdminImageUpload from '../../components/admin/ui/AdminImageUpload';
import AdminTagsInput from '../../components/admin/ui/AdminTagsInput';

export default function AdminTeamPage() {
  const { team, refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    nameEn: '',
    role: '',
    roleEn: '',
    initials: 'MA',
    bio: '',
    bioEn: '',
    avatar: '/assets/avatar_2.jpg',
    skills: ['حملات إعلانية', 'سيو', 'استراتيجيات']
  });

  const openCreate = () => {
    setEditingMember(null);
    setForm({
      name: '',
      nameEn: '',
      role: '',
      roleEn: '',
      initials: 'CR',
      bio: '',
      bioEn: '',
      avatar: '/assets/avatar_2.jpg',
      skills: ['تصميم', 'تسويق', 'إبداع']
    });
    setIsModalOpen(true);
  };

  const openEdit = (m) => {
    setEditingMember(m);
    setForm({
      name: m.name || '',
      nameEn: m.nameEn || '',
      role: m.role || '',
      roleEn: m.roleEn || '',
      initials: m.initials || 'MA',
      bio: m.bio || '',
      bioEn: m.bioEn || '',
      avatar: m.avatar || '/assets/avatar_2.jpg',
      skills: Array.isArray(m.skills) ? m.skills : []
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
      initials: form.initials,
      bio: form.bio,
      bioEn: form.bioEn || form.bio,
      avatar: form.avatar,
      skills: form.skills
    };

    try {
      if (editingMember) {
        await api.updateTeamMember(editingMember.id, payload);
      } else {
        await api.createTeamMember(payload);
      }
      setIsModalOpen(false);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to save team member' : 'فشل حفظ بيانات العضو');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteTeamMember(deleteId);
      setDeleteId(null);
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to delete member' : 'فشل حذف العضو');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Unified Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Leadership & Team Management' : 'إدارة أعضاء فريق العمل'}
        subtitle={language === 'en' ? 'Add, edit, and organize executive and creative specialists shown on About Us' : 'إضافة وتعديل بيانات أعضاء الفريق المعروضة في صفحة من نحن'}
        actionLabel={language === 'en' ? 'Add Team Member' : 'إضافة عضو جديد'}
        onAction={openCreate}
      />

      {/* Grid of Team Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => {
          const m = localizeTeamMember(member, language);
          return (
            <Card key={member.id} className={`p-6 border-white/[0.08] flex flex-col justify-between space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-green/40 shrink-0">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{m.name}</h4>
                    <span className="text-xs text-brand-green font-semibold block">{m.role}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {m.bio}
                </p>

                {/* Skills tags */}
                {Array.isArray(m.skills) && m.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {m.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(member)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Edit' : 'تعديل'}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(member.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Delete' : 'حذف'}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal Form */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? (language === 'en' ? 'Edit Team Member' : 'تعديل بيانات العضو') : (language === 'en' ? 'Add New Team Member' : 'إضافة عضو جديد')}
        subtitle={language === 'en' ? 'Fill in team member profile details' : 'املأ بيانات عضو الفريق وسيتم نشرها في صفحة من نحن'}
        onSubmit={handleSave}
        loading={loading}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Full Name (Arabic)' : 'الاسم الكامل (بالعربية)'}
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="مثال: م. أحمد الأحمدي"
          />
          <AdminInput
            label={language === 'en' ? 'Full Name (English)' : 'الاسم الكامل (بالإنجليزية)'}
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            placeholder="e.g. Eng. Ahmed Al-Ahmadi"
            dir="ltr"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AdminInput
            label={language === 'en' ? 'Job Title / Role (Arabic)' : 'المسمى الوظيفي (بالعربية)'}
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="مثال: مدير الإنتاج الإبداعي"
          />
          <AdminInput
            label={language === 'en' ? 'Job Title / Role (English)' : 'المسمى الوظيفي (بالإنجليزية)'}
            value={form.roleEn}
            onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
            placeholder="e.g. Head of Creative Production"
            dir="ltr"
          />
        </div>

        <AdminImageUpload
          label={language === 'en' ? 'Profile Avatar' : 'الصورة الشخصية'}
          value={form.avatar}
          onChange={(url) => setForm({ ...form, avatar: url })}
        />

        <AdminTextarea
          label={language === 'en' ? 'Brief Bio (Arabic)' : 'نبذة تعريفية ومسيرة الخبرة (بالعربية)'}
          rows={3}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="اكتب نبذة عن خبرات وإنجازات العضو..."
        />

        <AdminTextarea
          label={language === 'en' ? 'Brief Bio (English)' : 'نبذة تعريفية ومسيرة الخبرة (بالإنجليزية)'}
          rows={3}
          value={form.bioEn}
          onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
          placeholder="Brief professional background in English..."
          dir="ltr"
        />

        <AdminTagsInput
          label={language === 'en' ? 'Key Skills & Specialties' : 'المهارات والتخصصات'}
          tags={form.skills}
          onChange={(newSkills) => setForm({ ...form, skills: newSkills })}
          placeholder={language === 'en' ? 'Type skill and press Enter' : 'أدخل المهارة ثم اضغط Enter'}
        />
      </AdminModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title={language === 'en' ? 'Confirm Member Deletion' : 'تأكيد حذف العضو'}
        message={language === 'en' ? 'Are you sure you want to remove this member from the team directory?' : 'هل أنت متأكد من رغبتك في حذف هذا العضو من الفريق؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  );
}
