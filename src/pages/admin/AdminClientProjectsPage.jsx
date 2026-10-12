import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Layers, CheckCircle2, Clock, 
  ExternalLink, User, Calendar, Percent, Sparkles, 
  FileText, Download, X, Eye
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminTable from '../../components/admin/ui/AdminTable';
import AdminModal from '../../components/admin/ui/AdminModal';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';
import AdminSelect from '../../components/admin/ui/AdminSelect';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Badge from '../../components/ui/Badge';

export default function AdminClientProjectsPage() {
  const { clientProjects = [], setClientProjects, refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    code: '',
    clientName: '',
    projectTitle: '',
    category: 'بناء الهوية وتطوير الويب',
    status: 'in_progress',
    progress: 50,
    startDate: new Date().toISOString().split('T')[0],
    targetEndDate: '',
    managerName: 'م. خالد الشمري',
    managerRole: 'مدير المشروع والحلول الرقمية',
    managerPhone: '+966512345678',
    managerEmail: 'projects@crew5.agency',
    notes: '',
    milestones: [
      { id: 1, title: 'تحليل المتطلبات وجلسة التخطيط', status: 'completed', date: '', note: '' },
      { id: 2, title: 'التصميم والتطوير المبدئي', status: 'in_progress', date: '', note: '' },
      { id: 3, title: 'فحص الجودة والمراجعة', status: 'pending', date: '', note: '' },
      { id: 4, title: 'التسليم النهائي والإطلاق', status: 'pending', date: '', note: '' }
    ],
    deliverables: []
  });

  const openCreate = () => {
    setEditingProject(null);
    setForm({
      code: `CREW-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: '',
      projectTitle: '',
      category: 'بناء الهوية وتطوير الويب',
      status: 'in_progress',
      progress: 25,
      startDate: new Date().toISOString().split('T')[0],
      targetEndDate: '',
      managerName: language === 'en' ? 'Eng. Khaled Al-Shammari' : 'م. خالد الشمري',
      managerRole: language === 'en' ? 'Project & Solutions Director' : 'مدير المشروع والحلول الرقمية',
      managerPhone: '+966512345678',
      managerEmail: 'projects@crew5.agency',
      notes: language === 'en' ? 'Project initiated according to approved timeline.' : 'تم بدء العمل على المشروع وفق الخطة الزمنية المعتمدة.',
      milestones: [
        { id: 1, title: language === 'en' ? 'Scope Discovery & Wireframing' : 'تحليل المتطلبات وجلسة التخطيط', status: 'completed', date: new Date().toISOString().split('T')[0], note: language === 'en' ? 'Approved' : 'تم الاعتماد' },
        { id: 2, title: language === 'en' ? 'Design Systems & Development' : 'التصميم وتطوير النماذج الأولية', status: 'in_progress', date: '', note: language === 'en' ? 'In Progress' : 'جاري التنفيذ' },
        { id: 3, title: language === 'en' ? 'QA Testing & Client Review' : 'فحص الجودة والمراجعة مع العميل', status: 'pending', date: '', note: '' },
        { id: 4, title: language === 'en' ? 'Production Deployment & Launch' : 'التسليم النهائي والإطلاق الرسمي', status: 'pending', date: '', note: '' }
      ],
      deliverables: []
    });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingProject(p);
    setForm({
      code: p.code || '',
      clientName: p.clientName || '',
      projectTitle: p.projectTitle || '',
      category: p.category || 'بناء الهوية وتطوير الويب',
      status: p.status || 'in_progress',
      progress: p.progress || 0,
      startDate: p.startDate || '',
      targetEndDate: p.targetEndDate || '',
      managerName: p.manager?.name || (language === 'en' ? 'Eng. Khaled Al-Shammari' : 'م. خالد الشمري'),
      managerRole: p.manager?.role || (language === 'en' ? 'Project & Solutions Director' : 'مدير المشروع والحلول الرقمية'),
      managerPhone: p.manager?.phone || '+966512345678',
      managerEmail: p.manager?.email || 'projects@crew5.agency',
      notes: p.notes || '',
      milestones: Array.isArray(p.milestones) ? JSON.parse(JSON.stringify(p.milestones)) : [],
      deliverables: Array.isArray(p.deliverables) ? JSON.parse(JSON.stringify(p.deliverables)) : []
    });
    setModalOpen(true);
  };

  // Add Milestone
  const addMilestone = () => {
    setForm(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { id: Date.now(), title: language === 'en' ? 'New Milestone' : 'مرحلة عمل جديدة', status: 'pending', date: '', note: '' }
      ]
    }));
  };

  // Remove Milestone
  const removeMilestone = (idx) => {
    setForm(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== idx)
    }));
  };

  // Update Milestone
  const updateMilestone = (idx, field, val) => {
    setForm(prev => {
      const copy = [...prev.milestones];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, milestones: copy };
    });
  };

  // Add Deliverable
  const addDeliverable = () => {
    setForm(prev => ({
      ...prev,
      deliverables: [
        ...prev.deliverables,
        { name: language === 'en' ? 'Deliverable File / Link' : 'ملف أو رابط تسليم', size: 'PDF / URL', date: new Date().toISOString().split('T')[0], url: '#' }
      ]
    }));
  };

  const removeDeliverable = (idx) => {
    setForm(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== idx)
    }));
  };

  const updateDeliverable = (idx, field, val) => {
    setForm(prev => {
      const copy = [...prev.deliverables];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, deliverables: copy };
    });
  };

  // Save Project
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.projectTitle) {
      alert(language === 'en' ? 'Please enter client name and project title' : 'يرجى إدخال اسم العميل وعنوان المشروع');
      return;
    }

    setLoading(true);
    const payload = {
      code: form.code,
      clientName: form.clientName,
      projectTitle: form.projectTitle,
      category: form.category,
      status: form.status,
      progress: Number(form.progress) || 0,
      startDate: form.startDate,
      targetEndDate: form.targetEndDate,
      notes: form.notes,
      manager: {
        name: form.managerName,
        role: form.managerRole,
        phone: form.managerPhone,
        email: form.managerEmail,
        avatar: '/assets/avatar_1.jpg'
      },
      milestones: form.milestones,
      deliverables: form.deliverables
    };

    try {
      if (editingProject) {
        const res = await api.updateClientProject(editingProject.id, payload);
        if (res.success) {
          setClientProjects(prev => prev.map(p => p.id === editingProject.id ? res.data : p));
          setModalOpen(false);
        }
      } else {
        const res = await api.createClientProject(payload);
        if (res.success) {
          setClientProjects(prev => [res.data, ...prev]);
          setModalOpen(false);
        }
      }
    } catch (err) {
      alert(language === 'en' ? 'Error saving project' : 'حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteClientProject(deleteId);
      setClientProjects(prev => prev.filter(p => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert(language === 'en' ? 'Error deleting project' : 'حدث خطأ أثناء الحذف');
    }
  };

  const columns = [
    {
      header: language === 'en' ? 'Tracking Code' : 'رمز التتبع',
      accessor: 'code',
      render: (val) => (
        <span className="px-3 py-1 rounded-lg bg-brand-green/20 text-brand-green font-mono font-bold text-xs border border-brand-green/30">
          {val}
        </span>
      )
    },
    {
      header: language === 'en' ? 'Project & Client' : 'المشروع والعميل',
      accessor: 'projectTitle',
      render: (val, row) => (
        <div>
          <span className="font-bold text-white block">{val}</span>
          <span className="text-xs text-slate-400">
            {language === 'en' ? 'Client: ' : 'العميل: '}
            <strong className="text-slate-300">{row.clientName}</strong>
          </span>
        </div>
      )
    },
    {
      header: language === 'en' ? 'Progress' : 'نسبة الإنجاز',
      accessor: 'progress',
      render: (val) => (
        <div className="w-32 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-green font-bold font-mono">{val}%</span>
          </div>
          <div className="w-full bg-dark-950 rounded-full h-2 overflow-hidden border border-white/10">
            <div className="bg-brand-green h-full rounded-full" style={{ width: `${val}%` }} />
          </div>
        </div>
      )
    },
    {
      header: language === 'en' ? 'Project Status' : 'حالة المشروع',
      accessor: 'status',
      render: (val) => {
        switch (val) {
          case 'completed':
            return <Badge variant="green">{language === 'en' ? 'Completed 🟢' : 'مكتمل 🟢'}</Badge>;
          case 'review':
            return <Badge variant="amber">{language === 'en' ? 'Review 🟡' : 'المراجعة 🟡'}</Badge>;
          case 'in_progress':
            return <Badge variant="green">{language === 'en' ? 'In Progress 🚀' : 'قيد التنفيذ 🚀'}</Badge>;
          default:
            return <Badge variant="outline">{language === 'en' ? 'Planning 📋' : 'التخطيط 📋'}</Badge>;
        }
      }
    },
    {
      header: language === 'en' ? 'Client Portal' : 'بوابة العميل',
      accessor: 'id',
      render: (_, row) => (
        <a
          href={`/track?code=${row.code}`}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-white/5 hover:bg-brand-green/20 hover:text-brand-green text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors w-fit"
          title={language === 'en' ? 'Open Client Portal' : 'معاينة شاشة العميل'}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Open Portal' : 'فتح البوابة'}</span>
        </a>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Client Project Hub & Live Tracker' : 'إدارة مشاريع العملاء والتتبع الحي (Client Project Hub)'}
        subtitle={language === 'en' ? 'Create and update client roadmap milestones, progress rates, deliverables, and interactive portals' : 'أنشئ وحدث خطط سير مشاريع عملائك، نسب الإنجاز، الملفات المسلمة، ومواعيد التسليم التفاعلية'}
        actionLabel={language === 'en' ? 'Add Client Project' : 'إضافة مشروع عميل للتتبع'}
        onAction={openCreate}
      />

      {/* Table */}
      <AdminTable
        columns={columns}
        data={clientProjects}
        searchPlaceholder={language === 'en' ? 'Search by code or client name...' : 'بحث برمز المشروع أو اسم العميل...'}
        searchKey="clientName"
        onEdit={openEdit}
        onDelete={(p) => setDeleteId(p.id)}
      />

      {/* MODAL FORM */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? (language === 'en' ? `Edit Project: ${editingProject.code}` : `تعديل مشروع: ${editingProject.code}`) : (language === 'en' ? 'Add Client Project for Live Tracking' : 'إضافة مشروع جديد لتتبع العميل')}
        subtitle={language === 'en' ? 'The client will be able to follow real-time progress using this tracking code' : 'سيتمكن العميل من متابعة هذه التفاصيل والنسبة لحظة بلحظة عبر رمز التتبع'}
        onSubmit={handleSave}
        loading={loading}
        maxWidth="max-w-4xl"
      >
        <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Main Info */}
          <div className="grid sm:grid-cols-3 gap-4">
            <AdminInput
              label={language === 'en' ? 'Project Code' : 'رمز المشروع (Project Code)'}
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value })}
              placeholder="CREW-9041"
              required
              dir="ltr"
            />
            <AdminInput
              label={language === 'en' ? 'Client / Company Name' : 'اسم العميل أو الشركة'}
              value={form.clientName}
              onChange={e => setForm({ ...form, clientName: e.target.value })}
              placeholder="شركة نخبة العباقرة"
              required
            />
            <AdminInput
              label={language === 'en' ? 'Project Title' : 'عنوان المشروع'}
              value={form.projectTitle}
              onChange={e => setForm({ ...form, projectTitle: e.target.value })}
              placeholder="تطوير الهوية والمنصة الرقمية"
              required
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <AdminSelect
              label={language === 'en' ? 'Service Category' : 'تصنيف الخدمة'}
              value={form.category}
              options={[
                { value: 'بناء الهوية وتطوير الويب', label: language === 'en' ? 'Brand Identity & Web Development' : 'بناء الهوية وتطوير الويب' },
                { value: 'التسويق والإنتاج المرئي', label: language === 'en' ? 'Marketing & Video Production' : 'التسويق والإنتاج المرئي' },
                { value: 'التحول الرقمي وأتمتة الأعمال', label: language === 'en' ? 'Digital Transformation & Automation' : 'التحول الرقمي وأتمتة الأعمال' },
                { value: 'تصميم وتطوير المتاجر الإلكترونية', label: language === 'en' ? 'E-Commerce Store Engineering' : 'تصميم وتطوير المتاجر الإلكترونية' }
              ]}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />

            <AdminSelect
              label={language === 'en' ? 'Overall Project Status' : 'حالة المشروع الكلية'}
              value={form.status}
              options={[
                { value: 'planning', label: language === 'en' ? 'Planning & Discovery' : 'مرحلة التخطيط والتحليل (Planning)' },
                { value: 'in_progress', label: language === 'en' ? 'Active Execution (In Progress)' : 'قيد التنفيذ النشط (In Progress)' },
                { value: 'review', label: language === 'en' ? 'Review & QA' : 'المراجعة والاعتماد (Review)' },
                { value: 'completed', label: language === 'en' ? 'Completed & Handed Over' : 'مكتمل ومسلّم بالكامل (Completed)' }
              ]}
              onChange={e => setForm({ ...form, status: e.target.value })}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                {language === 'en' ? 'Current Progress Rate: ' : 'نسبة الإنجاز الحالية: '}
                <span className="text-brand-green font-mono">{form.progress}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={form.progress}
                onChange={e => setForm({ ...form, progress: Number(e.target.value) })}
                className="w-full accent-brand-green bg-dark-900 cursor-pointer h-2 rounded-lg"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <AdminInput
              label={language === 'en' ? 'Project Kickoff Date' : 'تاريخ بدء المشروع'}
              type="date"
              value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
            />
            <AdminInput
              label={language === 'en' ? 'Target Delivery Date' : 'الموعد المستهدف للتسليم'}
              type="date"
              value={form.targetEndDate}
              onChange={e => setForm({ ...form, targetEndDate: e.target.value })}
            />
          </div>

          <AdminTextarea
            label={language === 'en' ? 'Direct Status Notes for Client (Visible in Portal)' : 'ملاحظات وتحديثات مباشرة للعميل (تظهر في البوابة)'}
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={2}
            placeholder={language === 'en' ? 'Enter milestone progress summary visible to the client...' : 'اكتب ملاحظة أو توجيه يظهر للعميل عند فتح رمز مشروعه...'}
          />

          {/* MANAGER CONTACT SECTION */}
          <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-green" />
              <span>{language === 'en' ? 'Assigned Project Director for this Client' : 'بيانات مدير المشروع المخصصة لهذا العميل'}</span>
            </h4>
            <div className="grid sm:grid-cols-4 gap-3">
              <AdminInput
                label={language === 'en' ? 'Name' : 'الاسم'}
                value={form.managerName}
                onChange={e => setForm({ ...form, managerName: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Title' : 'المسمى'}
                value={form.managerRole}
                onChange={e => setForm({ ...form, managerRole: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'WhatsApp' : 'رقم الواتساب'}
                value={form.managerPhone}
                onChange={e => setForm({ ...form, managerPhone: e.target.value })}
                dir="ltr"
              />
              <AdminInput
                label={language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                value={form.managerEmail}
                onChange={e => setForm({ ...form, managerEmail: e.target.value })}
                dir="ltr"
              />
            </div>
          </div>

          {/* MILESTONES SECTION */}
          <div className="p-5 rounded-2xl bg-dark-950 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-green" />
                <span>{language === 'en' ? `Project Milestones Roadmap (${form.milestones.length})` : `مراحل وخط سير المشروع (${form.milestones.length})`}</span>
              </h4>
              <button
                type="button"
                onClick={addMilestone}
                className="py-1.5 px-3 rounded-xl bg-brand-green text-dark-950 text-xs font-bold flex items-center gap-1 shadow-neon cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Add Milestone' : 'إضافة مرحلة'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {form.milestones.map((ms, idx) => (
                <div key={ms.id || idx} className="p-3.5 rounded-xl bg-dark-900 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-white/5 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={ms.title}
                      onChange={e => updateMilestone(idx, 'title', e.target.value)}
                      placeholder={language === 'en' ? 'Milestone title...' : 'عنوان المرحلة...'}
                      className="flex-1 bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-brand-green"
                    />
                    <select
                      value={ms.status}
                      onChange={e => updateMilestone(idx, 'status', e.target.value)}
                      className="bg-dark-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="pending">{language === 'en' ? 'Pending' : 'مجدول'}</option>
                      <option value="in_progress">{language === 'en' ? 'In Progress' : 'قيد التنفيذ'}</option>
                      <option value="completed">{language === 'en' ? 'Completed' : 'مكتمل'}</option>
                    </select>
                    <input
                      type="date"
                      value={ms.date || ''}
                      onChange={e => updateMilestone(idx, 'date', e.target.value)}
                      className="bg-dark-950 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeMilestone(idx)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={ms.note || ''}
                    onChange={e => updateMilestone(idx, 'note', e.target.value)}
                    placeholder={language === 'en' ? 'Quick note for this phase (e.g. Assets Approved)...' : 'ملاحظة سريعة لهذه المرحلة (مثال: تم اعتماد الملفات)...'}
                    className="w-full bg-dark-950/50 border border-white/5 rounded-lg px-3 py-1 text-[11px] text-slate-400 outline-none focus:border-brand-green"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DELIVERABLES SECTION */}
          <div className="p-5 rounded-2xl bg-dark-950 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-brand-green" />
                <span>{language === 'en' ? `Deliverables & Downloadable Assets (${form.deliverables.length})` : `الملفات والأصول المسلمة للتحميل (${form.deliverables.length})`}</span>
              </h4>
              <button
                type="button"
                onClick={addDeliverable}
                className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 border border-white/10 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Add Deliverable' : 'إضافة أصل / رابط'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {form.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/5">
                  <input
                    type="text"
                    value={del.name}
                    onChange={e => updateDeliverable(idx, 'name', e.target.value)}
                    placeholder={language === 'en' ? 'Deliverable Name (e.g. Brand Guidelines PDF)' : 'اسم الملف (مثال: دليل الهوية البصرية PDF)'}
                    className="flex-1 bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={del.size}
                    onChange={e => updateDeliverable(idx, 'size', e.target.value)}
                    placeholder="15 MB"
                    className="w-24 bg-dark-950 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={del.url}
                    onChange={e => updateDeliverable(idx, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white dir-ltr text-right"
                  />
                  <button
                    type="button"
                    onClick={() => removeDeliverable(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </AdminModal>

      {/* DELETE CONFIRMATION */}
      <ConfirmModal
        isOpen={!!deleteId}
        title={language === 'en' ? 'Confirm Project Deletion' : 'تأكيد حذف مشروع العميل'}
        message={language === 'en' ? 'Are you sure you want to permanently delete this client project?' : 'هل أنت متأكد من رغبتك في حذف هذا المشروع التتبعي نهائياً من قاعدة البيانات؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </div>
  );
}
