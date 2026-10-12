import React, { useState } from 'react';
import { 
  BarChart3, MessageSquare, HeartHandshake, Rocket, 
  Award, Globe2, Users, CheckCircle2, Plus, Edit2, 
  Trash2, Sparkles, ShieldCheck, Zap, Cpu, Save, Check,
  Target, Compass, Lightbulb, TrendingUp
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminModal from '../../components/admin/ui/AdminModal';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';
import AdminSelect from '../../components/admin/ui/AdminSelect';
import AdminImageUpload from '../../components/admin/ui/AdminImageUpload';
import ConfirmModal from '../../components/admin/ConfirmModal';

const ICON_MAP = {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  Rocket,
  Zap,
  Target,
  Compass,
  Lightbulb,
  TrendingUp,
  Users,
  Cpu
};

const DEFAULT_ICONS = [Sparkles, ShieldCheck, Award, HeartHandshake, Rocket, Zap];

function resolveIcon(icon, index = 0) {
  if (!icon) return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) return icon;
  if (typeof icon === 'string' && ICON_MAP[icon]) return ICON_MAP[icon];
  return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
}

export default function AdminSectionsPage() {
  const { sections, updateSectionData } = useData();
  const { language, isRTL, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('stats');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const TABS = [
    { id: 'stats', label: language === 'en' ? '1. Statistics Bar' : '1. شريط الإحصائيات', icon: BarChart3 },
    { id: 'contactForm', label: language === 'en' ? '2. Contact Form & Hub' : '2. نموذج التواصل', icon: MessageSquare },
    { id: 'coreValues', label: language === 'en' ? '3. Core Values & Principles' : '3. المبادئ والقيم الراسخة', icon: HeartHandshake },
    { id: 'methodology', label: language === 'en' ? '4. Execution Methodology' : '4. كيف نحول أفكارك لواقع (المنهجية)', icon: Rocket },
    { id: 'leadershipPillars', label: language === 'en' ? '5. Leadership Pillars' : '5. المبادئ والركائز القيادية', icon: Award },
    { id: 'vision2030', label: language === 'en' ? '6. Digital Transformation & Vision' : '6. التحول الرقمي ورؤية 2030', icon: Globe2 },
    { id: 'partners', label: language === 'en' ? '7. Partners & Alliances' : '7. الشركاء والاعتمادات', icon: Users },
    { id: 'whyChooseUs', label: language === 'en' ? '8. Why Choose Crew5' : '8. لماذا وكالة Crew5 خيارك الأمثل', icon: CheckCircle2 }
  ];

  // Modal States for array items (Values, Steps, Pillars, Partners, Stats)
  const [modalType, setModalType] = useState(null); // 'value' | 'step' | 'pillar' | 'partner' | 'stat' | 'feature'
  const [editingItemIdx, setEditingItemIdx] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Generic Item Form
  const [itemForm, setItemForm] = useState({});

  // Direct Form States for single-object sections
  const [contactFormState, setContactFormState] = useState(sections.contactForm || {});
  const [vision2030State, setVision2030State] = useState(sections.vision2030 || {});
  const [whyChooseUsState, setWhyChooseUsState] = useState(sections.whyChooseUs || {});

  // Update local states when data loads
  React.useEffect(() => {
    if (sections.contactForm) setContactFormState(sections.contactForm);
    if (sections.vision2030) setVision2030State(sections.vision2030);
    if (sections.whyChooseUs) setWhyChooseUsState(sections.whyChooseUs);
  }, [sections]);

  // Handle Save for single direct sections (contactForm, vision2030, whyChooseUs)
  const handleSaveDirectSection = async (sectionKey, data) => {
    setSaving(true);
    try {
      await updateSectionData(sectionKey, data);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert(language === 'en' ? 'Error saving changes' : 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  // Open Modal for adding/editing array items
  const openItemModal = (type, idx = null, defaultData = {}) => {
    setModalType(type);
    setEditingItemIdx(idx);
    setItemForm(JSON.parse(JSON.stringify(defaultData)));
  };

  // Handle Save from Modal
  const handleSaveModalItem = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (modalType === 'stat') {
        const list = [...(sections.stats || [])];
        if (editingItemIdx !== null) list[editingItemIdx] = { id: list[editingItemIdx].id || `stat-${Date.now()}`, ...itemForm };
        else list.push({ id: `stat-${Date.now()}`, ...itemForm });
        await updateSectionData('stats', list);
      } else if (modalType === 'value') {
        const list = [...(sections.coreValues || [])];
        if (editingItemIdx !== null) list[editingItemIdx] = { id: list[editingItemIdx].id || `val-${Date.now()}`, ...itemForm };
        else list.push({ id: `val-${Date.now()}`, ...itemForm });
        await updateSectionData('coreValues', list);
      } else if (modalType === 'step') {
        const list = [...(sections.methodology || [])];
        if (editingItemIdx !== null) list[editingItemIdx] = { id: list[editingItemIdx].id || `step-${Date.now()}`, ...itemForm };
        else list.push({ id: `step-${Date.now()}`, ...itemForm });
        await updateSectionData('methodology', list);
      } else if (modalType === 'pillar') {
        const list = [...(sections.leadershipPillars || [])];
        if (editingItemIdx !== null) list[editingItemIdx] = { id: list[editingItemIdx].id || `pil-${Date.now()}`, ...itemForm };
        else list.push({ id: `pil-${Date.now()}`, ...itemForm });
        await updateSectionData('leadershipPillars', list);
      } else if (modalType === 'partner') {
        const list = [...(sections.partners || [])];
        if (editingItemIdx !== null) list[editingItemIdx] = { id: list[editingItemIdx].id || `prt-${Date.now()}`, ...itemForm };
        else list.push({ id: `prt-${Date.now()}`, ...itemForm });
        await updateSectionData('partners', list);
      } else if (modalType === 'feature') {
        const currentWhy = { ...whyChooseUsState };
        const list = [...(currentWhy.features || [])];
        if (editingItemIdx !== null) list[editingItemIdx] = { id: list[editingItemIdx].id || `feat-${Date.now()}`, ...itemForm };
        else list.push({ id: `feat-${Date.now()}`, ...itemForm });
        currentWhy.features = list;
        setWhyChooseUsState(currentWhy);
        await updateSectionData('whyChooseUs', currentWhy);
      }

      setModalType(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert(language === 'en' ? 'Error saving item' : 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  // Delete Modal Item
  const handleDeleteItem = async () => {
    if (!deleteTarget) return;
    const { type, idx } = deleteTarget;

    if (type === 'stat') {
      const list = sections.stats.filter((_, i) => i !== idx);
      await updateSectionData('stats', list);
    } else if (type === 'value') {
      const list = sections.coreValues.filter((_, i) => i !== idx);
      await updateSectionData('coreValues', list);
    } else if (type === 'step') {
      const list = sections.methodology.filter((_, i) => i !== idx);
      await updateSectionData('methodology', list);
    } else if (type === 'pillar') {
      const list = sections.leadershipPillars.filter((_, i) => i !== idx);
      await updateSectionData('leadershipPillars', list);
    } else if (type === 'partner') {
      const list = sections.partners.filter((_, i) => i !== idx);
      await updateSectionData('partners', list);
    } else if (type === 'feature') {
      const currentWhy = { ...whyChooseUsState };
      currentWhy.features = currentWhy.features.filter((_, i) => i !== idx);
      setWhyChooseUsState(currentWhy);
      await updateSectionData('whyChooseUs', currentWhy);
    }

    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Homepage & Site Sections CMS' : 'إدارة ونماذج أقسام ومحتوى الموقع'}
        subtitle={language === 'en' ? 'Manage company core values, methodologies, leadership pillars, Vision 2030, and partners' : 'تعديل وإضافة القيم، المنهجيات، الركائز القيادية، رؤية 2030، الشركاء، والإحصائيات'}
      />

      {/* 2. Top Tabs Grid Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all flex items-center gap-3 cursor-pointer ${
                isActive
                  ? 'bg-brand-green text-dark-950 border-brand-green font-bold shadow-neon'
                  : 'bg-dark-900/90 text-slate-300 border-white/[0.08] hover:border-white/20 hover:text-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isActive ? 'bg-dark-950 text-brand-green' : 'bg-white/5 text-brand-green'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUCCESS BANNER NOTIFICATION */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-green flex items-center gap-2 text-sm font-bold animate-fadeIn">
          <Check className="w-5 h-5" />
          <span>{language === 'en' ? 'Changes saved and published to the website immediately!' : 'تم حفظ التعديلات بنجاح وتحديثها فوراً في الموقع!'}</span>
        </div>
      )}

      {/* ============================================================
          TAB 1: STATS BAR (شريط الإحصائيات)
      ============================================================ */}
      {activeTab === 'stats' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Statistics Bar & Key Metrics' : 'شريط الإحصائيات والعدادات الرقمية'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Displayed on homepage and service solution pages' : 'تظهر في الصفحة الرئيسية وصفحات الخدمات والحلول'}
              </p>
            </div>
            <Button
              onClick={() => openItemModal('stat', null, { value: '+100', label: 'إحصائية جديدة', labelEn: 'New Metric', desc: '', descEn: '' })}
              variant="glow"
              size="sm"
              icon={Plus}
              iconPosition={isRTL ? 'right' : 'left'}
            >
              {language === 'en' ? 'Add Metric Counter' : 'إضافة عداد إحصائي جديد'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(sections.stats || []).map((stat, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-dark-950 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-3xl font-black text-brand-green font-montserrat mb-1 text-glow">
                    {stat.value}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {language === 'en' ? (stat.labelEn || stat.label) : stat.label}
                  </h4>
                  {(stat.desc || stat.descEn) && (
                    <p className="text-xs text-slate-400">
                      {language === 'en' ? (stat.descEn || stat.desc) : stat.desc}
                    </p>
                  )}
                </div>
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => openItemModal('stat', idx, stat)}
                    className="text-xs text-brand-green hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Edit' : 'تعديل'}</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'stat', idx })}
                    className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ============================================================
          TAB 2: CONTACT FORM (إعداد وتعديل نموذج التواصل)
      ============================================================ */}
      {activeTab === 'contactForm' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? 'Contact Form & Agency Coordinates' : 'إعدادات ونصوص نموذج التواصل وبيانات الاتصال'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Modify text, messages, and contact details across /contact and footer' : 'تعديل نصوص ورسائل وبيانات التواصل في صفحة تواصل معنا والفوتر'}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveDirectSection('contactForm', contactFormState); }} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Top Badge (Arabic)' : 'الشارة العلوية (بالعربية)'}
                value={contactFormState.badge || ''}
                onChange={e => setContactFormState({ ...contactFormState, badge: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Top Badge (English)' : 'الشارة العلوية (بالإنجليزية)'}
                value={contactFormState.badgeEn || ''}
                onChange={e => setContactFormState({ ...contactFormState, badgeEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Main Headline (Arabic)' : 'العنوان الرئيسي لنموذج التواصل (بالعربية)'}
                value={contactFormState.title || ''}
                onChange={e => setContactFormState({ ...contactFormState, title: e.target.value })}
                required
              />
              <AdminInput
                label={language === 'en' ? 'Main Headline (English)' : 'العنوان الرئيسي لنموذج التواصل (بالإنجليزية)'}
                value={contactFormState.titleEn || ''}
                onChange={e => setContactFormState({ ...contactFormState, titleEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminTextarea
                label={language === 'en' ? 'Form Guide (Arabic)' : 'الوصف التوجيهي للنموذج (بالعربية)'}
                rows={2}
                value={contactFormState.subtitle || ''}
                onChange={e => setContactFormState({ ...contactFormState, subtitle: e.target.value })}
              />
              <AdminTextarea
                label={language === 'en' ? 'Form Guide (English)' : 'الوصف التوجيهي للنموذج (بالإنجليزية)'}
                rows={2}
                value={contactFormState.subtitleEn || ''}
                onChange={e => setContactFormState({ ...contactFormState, subtitleEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Official Inbound Email' : 'البريد الإلكتروني الرسمي للاستقبال'}
                value={contactFormState.email || ''}
                onChange={e => setContactFormState({ ...contactFormState, email: e.target.value })}
                dir="ltr"
              />
              <AdminInput
                label={language === 'en' ? 'Direct WhatsApp Number' : 'رقم الواتساب للرد المباشر (مع كود الدولة 966...)'}
                value={contactFormState.whatsapp || ''}
                onChange={e => setContactFormState({ ...contactFormState, whatsapp: e.target.value })}
                dir="ltr"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Public Phone Number' : 'رقم الهاتف الظاهر للاتصال'}
                value={contactFormState.phone || ''}
                onChange={e => setContactFormState({ ...contactFormState, phone: e.target.value })}
                dir="ltr"
              />
              <AdminInput
                label={language === 'en' ? 'Address & Office Location' : 'العنوان والموقع الجغرافي'}
                value={contactFormState.address || ''}
                onChange={e => setContactFormState({ ...contactFormState, address: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Submit Button Text' : 'نص زر الإرسال'}
                value={contactFormState.submitButtonText || ''}
                onChange={e => setContactFormState({ ...contactFormState, submitButtonText: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Post-Submission Success Message' : 'رسالة التأكيد بعد الإرسال بنجاح'}
                value={contactFormState.successMessage || ''}
                onChange={e => setContactFormState({ ...contactFormState, successMessage: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Button type="submit" variant="glow" size="lg" loading={saving} icon={Save} iconPosition={isRTL ? 'right' : 'left'}>
                {language === 'en' ? 'Save Contact Form Settings' : 'حفظ إعدادات نموذج التواصل'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ============================================================
          TAB 3: CORE VALUES (المبادئ الراسخة التي تحكم أسلوب عملنا)
      ============================================================ */}
      {activeTab === 'coreValues' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Core Values & Cultural Principles' : 'المبادئ الراسخة التي تحكم أسلوب عملنا (القيم الجوهرية)'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Displayed on /about to build trust and credibility' : 'تظهر في صفحة "من نحن" لترسيخ الثقة والمصداقية'}
              </p>
            </div>
            <Button
              onClick={() => openItemModal('value', null, { title: '', titleEn: '', desc: '', descEn: '', icon: 'Sparkles' })}
              variant="glow"
              size="sm"
              icon={Plus}
              iconPosition={isRTL ? 'right' : 'left'}
            >
              {language === 'en' ? 'Add Core Value' : 'إضافة مبدأ / قيمة جديدة'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(sections.coreValues || []).map((val, idx) => {
              const Icon = resolveIcon(val.icon, idx);
              return (
                <div key={val.id || idx} className="p-5 rounded-2xl bg-dark-950 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {language === 'en' ? (val.titleEn || val.title) : val.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {language === 'en' ? (val.descEn || val.desc) : val.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => openItemModal('value', idx, val)}
                      className="text-xs text-brand-green hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Edit' : 'تعديل'}</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'value', idx })}
                      className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ============================================================
          TAB 4: METHODOLOGY (كيف نحول أفكارك إلى واقع رقمي ناجح؟)
      ============================================================ */}
      {activeTab === 'methodology' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Execution Methodology & 5-Step Roadmap' : 'كيف نحول أفكارك إلى واقع رقمي ناجح؟ (المنهجية ومراحل العمل)'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Displayed on /about showcasing execution phases' : 'تظهر في صفحة "من نحن" لتوضيح منهجية الـ 5 خطوات'}
              </p>
            </div>
            <Button
              onClick={() => openItemModal('step', null, { step: `0${(sections.methodology?.length || 0) + 1}`, badge: 'المرحلة', badgeEn: 'Phase', title: '', titleEn: '', desc: '', descEn: '' })}
              variant="glow"
              size="sm"
              icon={Plus}
              iconPosition={isRTL ? 'right' : 'left'}
            >
              {language === 'en' ? 'Add Roadmap Step' : 'إضافة مرحلة عمل جديدة'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(sections.methodology || []).map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-dark-950 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-montserrat font-black text-2xl text-brand-green">{step.step}</span>
                    {(step.badge || step.badgeEn) && (
                      <Badge variant="green">
                        {language === 'en' ? (step.badgeEn || step.badge) : step.badge}
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {language === 'en' ? (step.titleEn || step.title) : step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {language === 'en' ? (step.descEn || step.desc) : step.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => openItemModal('step', idx, step)}
                    className="text-xs text-brand-green hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Edit' : 'تعديل'}</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'step', idx })}
                    className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ============================================================
          TAB 5: LEADERSHIP PILLARS (المبادئ القيادية التي تحكم مسار عملنا)
      ============================================================ */}
      {activeTab === 'leadershipPillars' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Leadership Pillars & Management Principles' : 'المبادئ والركائز القيادية التي تحكم مسار عملنا'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Displayed on /ceo message and executive statements' : 'تظهر في صفحة "كلمة الرئيس التنفيذي ومدير المشاريع"'}
              </p>
            </div>
            <Button
              onClick={() => openItemModal('pillar', null, { number: `0${(sections.leadershipPillars?.length || 0) + 1}`, title: '', titleEn: '', desc: '', descEn: '' })}
              variant="glow"
              size="sm"
              icon={Plus}
              iconPosition={isRTL ? 'right' : 'left'}
            >
              {language === 'en' ? 'Add Leadership Pillar' : 'إضافة ركيزة قيادية جديدة'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(sections.leadershipPillars || []).map((pil, idx) => (
              <div key={pil.id || idx} className="p-5 rounded-2xl bg-dark-950 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center font-montserrat font-black text-brand-green mb-3">
                    {pil.number || `0${idx + 1}`}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {language === 'en' ? (pil.titleEn || pil.title) : pil.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {language === 'en' ? (pil.descEn || pil.desc) : pil.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => openItemModal('pillar', idx, pil)}
                    className="text-xs text-brand-green hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Edit' : 'تعديل'}</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'pillar', idx })}
                    className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ============================================================
          TAB 6: VISION 2030 (تمكين التحول الرقمي للشركات الوطنية)
      ============================================================ */}
      {activeTab === 'vision2030' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? 'Digital Transformation & Vision 2030 Alignment' : 'تمكين التحول الرقمي للشركات الوطنية وفق رؤية 2030'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'National alignment banner in the executive leadership portal' : 'بانر التوافق الوطني في صفحة كلمة القيادة'}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveDirectSection('vision2030', vision2030State); }} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Badge (Arabic)' : 'الشارة (بالعربية)'}
                value={vision2030State.badge || ''}
                onChange={e => setVision2030State({ ...vision2030State, badge: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Badge (English)' : 'الشارة (بالإنجليزية)'}
                value={vision2030State.badgeEn || ''}
                onChange={e => setVision2030State({ ...vision2030State, badgeEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Headline (Arabic)' : 'العنوان الرئيسي (بالعربية)'}
                value={vision2030State.title || ''}
                onChange={e => setVision2030State({ ...vision2030State, title: e.target.value })}
                required
              />
              <AdminInput
                label={language === 'en' ? 'Headline (English)' : 'العنوان الرئيسي (بالإنجليزية)'}
                value={vision2030State.titleEn || ''}
                onChange={e => setVision2030State({ ...vision2030State, titleEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminTextarea
                label={language === 'en' ? 'Strategic Content (Arabic)' : 'المحتوى النصي والبيان الاستراتيجي (بالعربية)'}
                rows={3}
                value={vision2030State.subtitle || ''}
                onChange={e => setVision2030State({ ...vision2030State, subtitle: e.target.value })}
              />
              <AdminTextarea
                label={language === 'en' ? 'Strategic Content (English)' : 'المحتوى النصي والبيان الاستراتيجي (بالإنجليزية)'}
                rows={3}
                value={vision2030State.subtitleEn || ''}
                onChange={e => setVision2030State({ ...vision2030State, subtitleEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <AdminInput
                label={language === 'en' ? 'Tag 1' : 'الوسم الأول'}
                value={vision2030State.tag1 || ''}
                onChange={e => setVision2030State({ ...vision2030State, tag1: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Tag 2' : 'الوسم الثاني'}
                value={vision2030State.tag2 || ''}
                onChange={e => setVision2030State({ ...vision2030State, tag2: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Tag 3' : 'الوسم الثالث'}
                value={vision2030State.tag3 || ''}
                onChange={e => setVision2030State({ ...vision2030State, tag3: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminInput
                label={language === 'en' ? 'Counter Metric / Year' : 'رقم العداد / السنة'}
                value={vision2030State.statsValue || ''}
                onChange={e => setVision2030State({ ...vision2030State, statsValue: e.target.value })}
                dir="ltr"
              />
              <AdminInput
                label={language === 'en' ? 'Metric Label Text' : 'نص التسمية بجانب العداد'}
                value={vision2030State.statsLabel || ''}
                onChange={e => setVision2030State({ ...vision2030State, statsLabel: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Button type="submit" variant="glow" size="lg" loading={saving} icon={Save} iconPosition={isRTL ? 'right' : 'left'}>
                {language === 'en' ? 'Save Vision 2030 Section' : 'حفظ بيانات ورؤية التحول الرقمي'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ============================================================
          TAB 7: PARTNERS & BRANDS (نفتخر بثقة واعتمادات كبرى الشركات)
      ============================================================ */}
      {activeTab === 'partners' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Trusted Partners, Brands & Certifications' : 'نفتخر بثقة واعتمادات كبرى الشركات والعلامات التجارية الرائدة'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Manage logos of enterprise clients, alliances, and government bodies' : 'إدارة شعارات الشركاء الحقيقيين والجهات الحكومية والاعتمادات'}
              </p>
            </div>
            <Button
              onClick={() => openItemModal('partner', null, { name: '', nameEn: '', category: '', categoryEn: '', badge: 'عميل', badgeEn: 'Client', logo: '', website: '' })}
              variant="glow"
              size="sm"
              icon={Plus}
              iconPosition={isRTL ? 'right' : 'left'}
            >
              {language === 'en' ? 'Add Partner / Alliance' : 'إضافة شريك / جهة جديدة'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(sections.partners || []).map((p, idx) => (
              <div key={p.id || idx} className="p-5 rounded-2xl bg-dark-950 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="h-16 flex items-center justify-center p-2 rounded-xl bg-white/[0.02] border border-white/5 mb-3">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="max-h-12 max-w-full object-contain" />
                    ) : (
                      <span className="text-xs text-slate-500 font-bold">{language === 'en' ? 'No Logo' : 'لا يوجد شعار'}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white truncate">
                      {language === 'en' ? (p.nameEn || p.name) : p.name}
                    </h4>
                    {(p.badge || p.badgeEn) && (
                      <Badge variant="green" className="text-[10px]">
                        {language === 'en' ? (p.badgeEn || p.badge) : p.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {language === 'en' ? (p.categoryEn || p.category) : p.category}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => openItemModal('partner', idx, p)}
                    className="text-xs text-brand-green hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Edit' : 'تعديل'}</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'partner', idx })}
                    className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ============================================================
          TAB 8: WHY CHOOSE US (لماذا وكالة Crew5 هي خيارك الأمثل؟)
      ============================================================ */}
      {activeTab === 'whyChooseUs' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? 'Why Crew5 Agency is Your Strategic Choice' : 'لماذا وكالة Crew5 هي خيارك الأمثل؟'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Edit headlines and 4 key differentiator cards' : 'تعديل العناوين وبطاقات المميزات الأربعة'}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveDirectSection('whyChooseUs', whyChooseUsState); }} className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <AdminInput
                label={language === 'en' ? 'Badge (Arabic)' : 'الشارة (بالعربية)'}
                value={whyChooseUsState.badge || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, badge: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Headline (Arabic)' : 'العنوان الرئيسي (بالعربية)'}
                value={whyChooseUsState.title || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, title: e.target.value })}
                required
              />
              <AdminInput
                label={language === 'en' ? 'Highlight Word (Arabic)' : 'الكلمة البارزة (بالعربية)'}
                value={whyChooseUsState.highlight || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, highlight: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <AdminInput
                label={language === 'en' ? 'Badge (English)' : 'الشارة (بالإنجليزية)'}
                value={whyChooseUsState.badgeEn || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, badgeEn: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Headline (English)' : 'العنوان الرئيسي (بالإنجليزية)'}
                value={whyChooseUsState.titleEn || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, titleEn: e.target.value })}
              />
              <AdminInput
                label={language === 'en' ? 'Highlight Word (English)' : 'الكلمة البارزة (بالإنجليزية)'}
                value={whyChooseUsState.highlightEn || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, highlightEn: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <AdminTextarea
                label={language === 'en' ? 'Section Subtitle (Arabic)' : 'الوصف الفرعي للقسم (بالعربية)'}
                rows={2}
                value={whyChooseUsState.subtitle || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, subtitle: e.target.value })}
              />
              <AdminTextarea
                label={language === 'en' ? 'Section Subtitle (English)' : 'الوصف الفرعي للقسم (بالإنجليزية)'}
                rows={2}
                value={whyChooseUsState.subtitleEn || ''}
                onChange={e => setWhyChooseUsState({ ...whyChooseUsState, subtitleEn: e.target.value })}
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {language === 'en' ? 'Differentiator Feature Cards (4):' : 'بطاقات المميزات الـ 4:'}
                </span>
                <Button
                  type="button"
                  onClick={() => openItemModal('feature', null, { title: '', titleEn: '', desc: '', descEn: '', icon: 'Sparkles' })}
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  iconPosition={isRTL ? 'right' : 'left'}
                >
                  {language === 'en' ? 'Add Feature Card' : 'إضافة ميزة جديدة'}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(whyChooseUsState.features || []).map((feat, idx) => (
                  <div key={feat.id || idx} className="p-4 rounded-2xl bg-dark-950 border border-white/10 flex flex-col justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-brand-green mb-1">
                        {language === 'en' ? (feat.titleEn || feat.title) : feat.title}
                      </h5>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {language === 'en' ? (feat.descEn || feat.desc) : feat.desc}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openItemModal('feature', idx, feat)}
                        className="text-xs text-brand-green hover:underline flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Edit' : 'تعديل'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget({ type: 'feature', idx })}
                        className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Button type="submit" variant="glow" size="lg" loading={saving} icon={Save} iconPosition={isRTL ? 'right' : 'left'}>
                {language === 'en' ? 'Save Why Choose Us Settings' : 'حفظ إعدادات قسم لماذا نحن'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ============================================================
          GENERIC DYNAMIC MODAL FOR ARRAY ITEMS
      ============================================================ */}
      {modalType && (
        <AdminModal
          isOpen={true}
          onClose={() => setModalType(null)}
          title={
            editingItemIdx !== null
              ? (language === 'en' ? 'Edit Item Details' : 'تعديل بيانات العنصر')
              : (language === 'en' ? 'Add New Item' : 'إضافة عنصر جديد')
          }
          subtitle={language === 'en' ? 'Enter required details and changes will apply live' : 'أدخل البيانات المطلوبة وسيتم تطبيقها مباشرة'}
          onSubmit={handleSaveModalItem}
          loading={saving}
        >
          {/* STAT MODAL */}
          {modalType === 'stat' && (
            <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <AdminInput
                label={language === 'en' ? 'Metric Value (e.g. +120 or 99%)' : 'القيمة الإحصائية (مثال: +120 أو 99%)'}
                value={itemForm.value || ''}
                onChange={e => setItemForm({ ...itemForm, value: e.target.value })}
                required
                dir="ltr"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Metric Label (Arabic)' : 'تسمية العداد (بالعربية)'}
                  value={itemForm.label || ''}
                  onChange={e => setItemForm({ ...itemForm, label: e.target.value })}
                  required
                />
                <AdminInput
                  label={language === 'en' ? 'Metric Label (English)' : 'تسمية العداد (بالإنجليزية)'}
                  value={itemForm.labelEn || ''}
                  onChange={e => setItemForm({ ...itemForm, labelEn: e.target.value })}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Subtitle (Arabic)' : 'وصف فرعي (بالعربية)'}
                  value={itemForm.desc || ''}
                  onChange={e => setItemForm({ ...itemForm, desc: e.target.value })}
                />
                <AdminInput
                  label={language === 'en' ? 'Subtitle (English)' : 'وصف فرعي (بالإنجليزية)'}
                  value={itemForm.descEn || ''}
                  onChange={e => setItemForm({ ...itemForm, descEn: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* VALUE / PILLAR / FEATURE MODAL */}
          {['value', 'pillar', 'feature'].includes(modalType) && (
            <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Main Title (Arabic)' : 'العنوان الرئيسي (بالعربية)'}
                  value={itemForm.title || ''}
                  onChange={e => setItemForm({ ...itemForm, title: e.target.value })}
                  required
                />
                <AdminInput
                  label={language === 'en' ? 'Main Title (English)' : 'العنوان الرئيسي (بالإنجليزية)'}
                  value={itemForm.titleEn || ''}
                  onChange={e => setItemForm({ ...itemForm, titleEn: e.target.value })}
                />
              </div>

              {modalType === 'pillar' && (
                <AdminInput
                  label={language === 'en' ? 'Pillar Number (e.g. 01)' : 'رقم الركيزة (مثال: 01)'}
                  value={itemForm.number || ''}
                  onChange={e => setItemForm({ ...itemForm, number: e.target.value })}
                  dir="ltr"
                />
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminTextarea
                  label={language === 'en' ? 'Explanation & Details (Arabic)' : 'الشرح والتفاصيل (بالعربية)'}
                  rows={3}
                  value={itemForm.desc || ''}
                  onChange={e => setItemForm({ ...itemForm, desc: e.target.value })}
                  required
                />
                <AdminTextarea
                  label={language === 'en' ? 'Explanation & Details (English)' : 'الشرح والتفاصيل (بالإنجليزية)'}
                  rows={3}
                  value={itemForm.descEn || ''}
                  onChange={e => setItemForm({ ...itemForm, descEn: e.target.value })}
                />
              </div>

              <AdminSelect
                label={language === 'en' ? 'Symbolic Icon' : 'الأيقونة الرمزية'}
                value={itemForm.icon || 'Sparkles'}
                options={[
                  { value: 'Sparkles', label: '✨ Sparkles' },
                  { value: 'ShieldCheck', label: '🛡️ ShieldCheck' },
                  { value: 'Award', label: '🏆 Award' },
                  { value: 'HeartHandshake', label: '🤝 HeartHandshake' },
                  { value: 'Rocket', label: '🚀 Rocket' },
                  { value: 'Zap', label: '⚡ Zap' },
                  { value: 'Target', label: '🎯 Target' },
                  { value: 'Compass', label: '🧭 Compass' },
                  { value: 'Lightbulb', label: '💡 Lightbulb' },
                  { value: 'TrendingUp', label: '📈 TrendingUp' }
                ]}
                onChange={e => setItemForm({ ...itemForm, icon: e.target.value })}
              />
            </div>
          )}

          {/* STEP MODAL */}
          {modalType === 'step' && (
            <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="grid grid-cols-3 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Step Number' : 'رقم المرحلة'}
                  value={itemForm.step || ''}
                  onChange={e => setItemForm({ ...itemForm, step: e.target.value })}
                  required
                  dir="ltr"
                />
                <AdminInput
                  label={language === 'en' ? 'Badge (Arabic)' : 'الشارة (بالعربية)'}
                  value={itemForm.badge || ''}
                  onChange={e => setItemForm({ ...itemForm, badge: e.target.value })}
                />
                <AdminInput
                  label={language === 'en' ? 'Badge (English)' : 'الشارة (بالإنجليزية)'}
                  value={itemForm.badgeEn || ''}
                  onChange={e => setItemForm({ ...itemForm, badgeEn: e.target.value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Step Title (Arabic)' : 'عنوان المرحلة (بالعربية)'}
                  value={itemForm.title || ''}
                  onChange={e => setItemForm({ ...itemForm, title: e.target.value })}
                  required
                />
                <AdminInput
                  label={language === 'en' ? 'Step Title (English)' : 'عنوان المرحلة (بالإنجليزية)'}
                  value={itemForm.titleEn || ''}
                  onChange={e => setItemForm({ ...itemForm, titleEn: e.target.value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminTextarea
                  label={language === 'en' ? 'Description (Arabic)' : 'شرح المرحلة والمخرجات (بالعربية)'}
                  rows={3}
                  value={itemForm.desc || ''}
                  onChange={e => setItemForm({ ...itemForm, desc: e.target.value })}
                  required
                />
                <AdminTextarea
                  label={language === 'en' ? 'Description (English)' : 'شرح المرحلة والمخرجات (بالإنجليزية)'}
                  rows={3}
                  value={itemForm.descEn || ''}
                  onChange={e => setItemForm({ ...itemForm, descEn: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* PARTNER MODAL */}
          {modalType === 'partner' && (
            <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Company Name (Arabic)' : 'اسم الشركة / الجهة (بالعربية)'}
                  value={itemForm.name || ''}
                  onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                  required
                />
                <AdminInput
                  label={language === 'en' ? 'Company Name (English)' : 'اسم الشركة / الجهة (بالإنجليزية)'}
                  value={itemForm.nameEn || ''}
                  onChange={e => setItemForm({ ...itemForm, nameEn: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Industry (Arabic)' : 'مجال العمل (بالعربية)'}
                  value={itemForm.category || ''}
                  onChange={e => setItemForm({ ...itemForm, category: e.target.value })}
                />
                <AdminInput
                  label={language === 'en' ? 'Industry (English)' : 'مجال العمل (بالإنجليزية)'}
                  value={itemForm.categoryEn || ''}
                  onChange={e => setItemForm({ ...itemForm, categoryEn: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Badge (Arabic)' : 'الشارة (بالعربية)'}
                  value={itemForm.badge || ''}
                  onChange={e => setItemForm({ ...itemForm, badge: e.target.value })}
                />
                <AdminInput
                  label={language === 'en' ? 'Badge (English)' : 'الشارة (بالإنجليزية)'}
                  value={itemForm.badgeEn || ''}
                  onChange={e => setItemForm({ ...itemForm, badgeEn: e.target.value })}
                />
              </div>

              <AdminImageUpload
                label={language === 'en' ? 'Company Logo' : 'شعار الشركة (Logo)'}
                value={itemForm.logo || ''}
                onChange={url => setItemForm({ ...itemForm, logo: url })}
                required
              />
              <AdminInput
                label={language === 'en' ? 'Company Website URL (Optional)' : 'رابط موقع الشركة (اختياري)'}
                value={itemForm.website || ''}
                onChange={e => setItemForm({ ...itemForm, website: e.target.value })}
                dir="ltr"
              />
            </div>
          )}
        </AdminModal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title={language === 'en' ? 'Confirm Deletion' : 'تأكيد الحذف'}
        message={language === 'en' ? 'Are you sure you want to delete this item?' : 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteTarget(null)}
      />

    </div>
  );
}
