import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Globe2, Layers, Sparkles, 
  CheckCircle2, ArrowRight, ArrowLeft, ExternalLink,
  Copy, Eye, ToggleLeft, ToggleRight, Layout, Star,
  MessageSquare, Sliders, Check, HelpCircle, FileText,
  Boxes, Send, X, AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
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
import CustomComponentRenderer from '../../components/builder/CustomComponentRenderer';
import AdminPublishStatusPicker, { PublishStatusBadge } from '../../components/admin/ui/AdminPublishStatusPicker';

const COMPONENT_TYPES = [
  {
    type: 'announcement_bar',
    name: 'شريط إعلاني علوي (Top Announcement Bar)',
    desc: 'شريط رفيع يثبت أعلى الصفحة أو الموقع مع زر تنقل وزر إغلاق اختياري',
    icon: Sparkles,
    defaultData: {
      badge: 'عرض حصري',
      text: 'خصم 20% لفترة محدودة على باقات الهوية والتسويق الرقمي! 🚀',
      btnText: 'احجز الآن',
      btnLink: '/contact',
      closable: true,
      bgGradient: 'from-brand-green/25 via-dark-900 to-brand-green/25'
    }
  },
  {
    type: 'promo_banner',
    name: 'بانر ترويجي مضيء (Glow Promo Banner)',
    desc: 'بانر عريض فخم بتأثيرات زجاجية وإضاءة نيون وأزرار تفاعلية وصورة اختيارية',
    icon: Layers,
    defaultData: {
      badge: 'استشارة استراتيجية',
      title: 'جاهز لتوسيع انتشار علامتك في السوق؟',
      highlight: 'احصل على تدقيق رقمي مجاني',
      subtitle: 'يقوم خبراؤنا بتحليل حضورك الرقمي وتقديم خطة نمو واضحة تضمن لك مضاعفة المبيعات.',
      btnText: 'طلب التدقيق المجاني',
      btnLink: '/contact',
      secondaryBtnText: 'استعراض الخدمات',
      secondaryBtnLink: '/services',
      imageUrl: '',
      gradient: 'from-brand-green/25 via-dark-900 to-dark-950'
    }
  },
  {
    type: 'floating_widget',
    name: 'شارة ثقة وتقييم عائمة (Floating Social Proof)',
    desc: 'عنصر عائم يظهر في زاوية الشاشة يعرض تقييمات العملاء والاعتمادات',
    icon: Star,
    defaultData: {
      title: 'تقييم 4.9/5 من أكثر من 50 عميل',
      subtitle: 'وكالة معتمدة للتحول الرقمي',
      avatarUrl: '/assets/avatar_1.jpg',
      link: '/testimonials',
      btnText: 'آراء شركاء النجاح'
    }
  },
  {
    type: 'lead_capture',
    name: 'صندوق التقاط بيانات وتسعير (Lead Magnet)',
    desc: 'فورم مخصص وسريع لجمع بيانات العملاء المهتمين بعرض أو خدمة محددة',
    icon: MessageSquare,
    defaultData: {
      badge: 'طلب تسعير فوري',
      title: 'احصل على عرض سعر مخصص لمشروعك خلال 60 دقيقة',
      subtitle: 'أدخل بياناتك وسنتواصل معك فوراً لدراسة المتطلبات وتقديم أفضل الحلول.',
      btnText: 'إرسال طلب التسعير',
      serviceOptions: ['تصميم هوية بصرية', 'تطوير وبرمجة موقع', 'إدارة حملات تسويقية', 'إنتاج مرئي ومونتاج']
    }
  },
  {
    type: 'feature_cards',
    name: 'شبكة بطاقات ومميزات (Feature Cards)',
    desc: 'مجموعة بطاقات تعرض مزايا الخدمة أو الضمانات مع أيقونات وتأثيرات Hover',
    icon: CheckCircle2,
    defaultData: {
      badge: 'ضمان الجودة',
      title: 'لماذا يثق بنا رواد الأعمال والشركات؟',
      highlight: 'معايير لا تقبل المساومة',
      subtitle: 'نضمن لك أعلى مستويات الاحترافية والسرعة والأمان في كل تفصيلة.',
      cards: [
        { title: 'تسليم في الموعد بدقة', desc: 'نلتزم بجداول زمنية صارمة لتسليم كافة مراحل مشروعك.', iconName: 'Clock' },
        { title: 'دعم فني وضمان شامل', desc: 'خدمة ما بعد الإطلاق وصيانة دورية وتحديثات مستمرة.', iconName: 'ShieldCheck' },
        { title: 'تصاميم حصرية 100%', desc: 'كل هوية وموقع نصممه خصيصاً بدون قوالب جاهزة.', iconName: 'Sparkles' }
      ]
    }
  },
  {
    type: 'faq_accordion',
    name: 'أسئلة شائعة مخصصة (Custom FAQ)',
    desc: 'قائمة أسئلة وأجوبة منسدلة خاصة بموضوع أو عرض محدد',
    icon: HelpCircle,
    defaultData: {
      badge: 'الأسئلة الشائعة',
      title: 'كل ما ترغب بمعرفته حول',
      highlight: 'هذا العرض والخدمة',
      subtitle: 'إجابات على أهم الاستفسارات المتكررة.',
      items: [
        { q: 'ما هي متطلبات البدء في المشروع؟', a: 'كل ما نحتاجه هو جلسة استكشافية سريعة لفهم أهدافك وهوية علامتك التجارية.' },
        { q: 'هل تشمل الباقة خدمات الدعم والتعديل؟', a: 'نعم، نقدم جولات تعديل مرنة مع دعم فني مستمر بعد التسليم.' }
      ]
    }
  },
  {
    type: 'custom_html',
    name: 'محتوى وكود مخصص (Custom HTML / Embed)',
    desc: 'كود HTML أو نصوص مخصصة أو كود تضمين خارجي',
    icon: FileText,
    defaultData: {
      title: 'محتوى مخصص',
      content: '<p class="text-slate-300">أضف نصوص أو كود HTML مخصص هنا ليتم عرضه داخل الصفحة.</p>'
    }
  },
  {
    type: 'cta_banner',
    name: 'بانر اتخاذ إجراء (Action Banner)',
    desc: 'بانر تحفيزي لزيادة التحويلات والتواصل المباشر',
    icon: Sparkles,
    defaultData: {
      title: 'هل ترغب في بدء قصة نجاحك معنا؟',
      subtitle: 'تواصل مع فريقنا اليوم لمناقشة خطة العمل والاستراتيجية الأنسب لعلامتك.',
      btnText: 'ابدأ مشروعك الآن',
      btnLink: '/contact'
    }
  }
];

export default function AdminComponentsPage() {
  const { customComponents = [], setCustomComponents, pages = [], setPages, refreshAllData } = useData();
  const { language, isRTL, t } = useLanguage();

  // Filter & Search state
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'global' | 'announcement_bar' | 'promo_banner' | 'floating_widget' | 'lead_capture' | 'other'

  // Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [formType, setFormType] = useState('promo_banner');
  const [formData, setFormData] = useState({
    name: '',
    type: 'promo_banner',
    isGlobal: false,
    globalPosition: 'top_bar',
    isEnabled: true,
    targetPages: ['all'],
    data: {}
  });

  // Modal Tabs
  const [modalTab, setModalTab] = useState('content'); // 'content' | 'settings' | 'preview'

  // Inserter Tool Modal State
  const [inserterModalOpen, setInserterModalOpen] = useState(false);
  const [selectedCompForInsert, setSelectedCompForInsert] = useState(null);
  const [targetPageSlug, setTargetPageSlug] = useState('home');
  const [insertPosition, setInsertPosition] = useState('after_hero'); // 'top' | 'after_hero' | 'middle' | 'bottom'
  const [inserting, setInserting] = useState(false);
  const [insertSuccessMsg, setInsertSuccessMsg] = useState(null);

  // Delete Confirm
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);

  // Open Create Modal
  const handleOpenCreate = (type = 'promo_banner') => {
    const typeDef = COMPONENT_TYPES.find(t => t.type === type) || COMPONENT_TYPES[1];
    setEditingComponent(null);
    setFormType(typeDef.type);
    setFormData({
      name: language === 'en' ? `New ${typeDef.type.replace('_', ' ')} Component` : `مكون ${typeDef.name.split('(')[0].trim()} جديد`,
      type: typeDef.type,
      isGlobal: typeDef.type === 'announcement_bar',
      globalPosition: typeDef.type === 'announcement_bar' ? 'top_bar' : (typeDef.type === 'floating_widget' ? 'floating' : 'page_block'),
      status: 'published',
      scheduledAt: '',
      isEnabled: true,
      targetPages: ['all'],
      data: JSON.parse(JSON.stringify(typeDef.defaultData))
    });
    setModalTab('content');
    setEditModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (comp) => {
    setEditingComponent(comp);
    setFormType(comp.type);
    setFormData({
      name: comp.name || '',
      type: comp.type || 'promo_banner',
      isGlobal: comp.isGlobal || false,
      globalPosition: comp.globalPosition || 'page_block',
      status: comp.status || (comp.isEnabled === false ? 'archived' : 'published'),
      scheduledAt: comp.scheduledAt || '',
      isEnabled: comp.isEnabled !== undefined ? comp.isEnabled : true,
      targetPages: comp.targetPages || ['all'],
      data: JSON.parse(JSON.stringify(comp.data || {}))
    });
    setModalTab('content');
    setEditModalOpen(true);
  };

  // Change Component Type in Form
  const handleTypeChange = (newType) => {
    const typeDef = COMPONENT_TYPES.find(t => t.type === newType) || COMPONENT_TYPES[0];
    setFormType(newType);
    setFormData(prev => ({
      ...prev,
      type: newType,
      globalPosition: newType === 'announcement_bar' ? 'top_bar' : (newType === 'floating_widget' ? 'floating' : 'page_block'),
      data: JSON.parse(JSON.stringify(typeDef.defaultData))
    }));
  };

  // Save Component
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert(language === 'en' ? 'Please enter a name for the component' : 'يرجى كتابة اسم تعريفي للمكون');
      return;
    }

    setSaving(true);
    try {
      if (editingComponent) {
        const res = await api.updateComponent(editingComponent.id, formData);
        if (res.success) {
          setCustomComponents(prev => prev.map(c => c.id === editingComponent.id ? res.data : c));
          setEditModalOpen(false);
        } else {
          alert(language === 'en' ? 'Failed to save component' : 'فشل حفظ المكون');
        }
      } else {
        const res = await api.createComponent(formData);
        if (res.success) {
          setCustomComponents(prev => [res.data, ...prev]);
          setEditModalOpen(false);
        } else {
          alert(language === 'en' ? 'Failed to create component' : 'فشل إنشاء المكون');
        }
      }
    } catch (err) {
      alert(language === 'en' ? 'Error saving component' : 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  // Toggle Global Active
  const handleToggleGlobal = async (comp) => {
    try {
      const res = await api.toggleComponentGlobal(comp.id);
      if (res.success && res.data) {
        setCustomComponents(prev => prev.map(c => c.id === comp.id ? res.data : c));
      }
    } catch (err) {
      alert(language === 'en' ? 'Failed to update global state' : 'فشل تغيير حالة المكون العام');
    }
  };

  // Toggle Enabled
  const handleToggleEnabled = async (comp) => {
    try {
      const updatedData = { ...comp, isEnabled: !comp.isEnabled };
      const res = await api.updateComponent(comp.id, updatedData);
      if (res.success) {
        setCustomComponents(prev => prev.map(c => c.id === comp.id ? res.data : c));
      }
    } catch (err) {
      alert(language === 'en' ? 'Failed to update status' : 'فشل تفعيل/تعطيل المكون');
    }
  };

  // Duplicate Component
  const handleDuplicate = async (comp) => {
    try {
      const copyData = {
        name: `${comp.name} (نسخة)`,
        type: comp.type,
        isGlobal: false,
        globalPosition: comp.globalPosition,
        isEnabled: true,
        targetPages: comp.targetPages || ['all'],
        data: JSON.parse(JSON.stringify(comp.data || {}))
      };
      const res = await api.createComponent(copyData);
      if (res.success) {
        setCustomComponents(prev => [res.data, ...prev]);
      }
    } catch (err) {
      alert('فشل نسخ المكون');
    }
  };

  // Delete Component
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteComponent(id);
      if (res.success) {
        setCustomComponents(prev => prev.filter(c => c.id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      alert(language === 'en' ? 'Failed to delete component' : 'فشل حذف المكون');
    }
  };

  // Open Page Inserter Modal
  const handleOpenInserter = (comp) => {
    setSelectedCompForInsert(comp);
    setTargetPageSlug(pages[0]?.slug || 'home');
    setInsertPosition('after_hero');
    setInsertSuccessMsg(null);
    setInserterModalOpen(true);
  };

  // Execute Page Insertion
  const handleExecuteInsert = async () => {
    if (!selectedCompForInsert || !targetPageSlug) return;
    setInserting(true);
    setInsertSuccessMsg(null);
    try {
      const res = await api.insertComponentToPage(selectedCompForInsert.id, targetPageSlug, insertPosition);
      if (res.success && res.data?.page) {
        setPages(prev => prev.map(p => (p.id === res.data.page.id || p.slug === res.data.page.slug) ? res.data.page : p));
        setInsertSuccessMsg(language === 'en' ? `Inserted successfully into /${targetPageSlug}` : `تم إدراج المكون بنجاح في صفحة /${targetPageSlug}`);
        refreshAllData();
        setTimeout(() => {
          setInserterModalOpen(false);
          setInsertSuccessMsg(null);
        }, 2200);
      } else {
        alert(res.message || (language === 'en' ? 'Failed to insert component' : 'فشل إدراج المكون في الصفحة'));
      }
    } catch (err) {
      alert(language === 'en' ? 'Error during insertion' : 'حدث خطأ أثناء الإدراج');
    } finally {
      setInserting(false);
    }
  };

  // Filter components
  const filteredComponents = customComponents.filter(c => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'global') return c.isGlobal;
    return c.type === activeFilter;
  });

  const totalGlobal = customComponents.filter(c => c.isGlobal && c.isEnabled).length;

  return (
    <div className="space-y-8">
      {/* 1. Page Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Global & Inset Components Hub' : 'المكونات العامة وقابلة الإدراج (Components Hub)'}
        subtitle={language === 'en' ? 'Create smart reusable marketing blocks, enable them globally site-wide, or insert them into any page with 1-click.' : 'أنشئ وخصص مكونات ذكية، وفعل ظهورها في كامل الموقع أو أدرجها في أي صفحة بضغطة زر واحدة.'}
      >
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleOpenCreate('announcement_bar')}
            variant="outline"
            size="sm"
            icon={Sparkles}
          >
            {language === 'en' ? '+ Announcement Bar' : '+ شريط إعلاني'}
          </Button>
          <Button
            onClick={() => handleOpenCreate('promo_banner')}
            variant="glow"
            size="sm"
            icon={Plus}
          >
            {language === 'en' ? 'Create New Component' : 'إنشاء مكون جديد'}
          </Button>
        </div>
      </AdminPageHeader>

      {/* 2. Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between border-white/[0.08]">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">
              {language === 'en' ? 'Total Components in Hub' : 'إجمالي المكونات بالمكتبة'}
            </span>
            <span className="text-2xl font-black text-white font-montserrat">{customComponents.length}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shadow-neon">
            <Boxes className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-brand-green/30 bg-gradient-to-br from-dark-900 to-brand-green/10">
          <div>
            <span className="text-xs text-brand-green font-bold block mb-1">
              {language === 'en' ? 'Active Global Components' : 'مكونات عامة نشطة (Global)'}
            </span>
            <span className="text-2xl font-black text-brand-green font-montserrat">{totalGlobal}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-green/20 flex items-center justify-center text-brand-green shadow-neon">
            <Globe2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-white/[0.08]">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">
              {language === 'en' ? 'Announcement Bars' : 'أشرطة إعلانية علوية'}
            </span>
            <span className="text-2xl font-black text-white font-montserrat">
              {customComponents.filter(c => c.type === 'announcement_bar').length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-white/[0.08]">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">
              {language === 'en' ? 'Target Landing Pages' : 'الصفحات المتاحة للإدراج'}
            </span>
            <span className="text-2xl font-black text-white font-montserrat">{pages.length}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400">
            <Layout className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'all', label: language === 'en' ? 'All Components' : 'كافة المكونات', count: customComponents.length },
          { id: 'global', label: language === 'en' ? '🌐 Global Components' : '🌐 المكونات العامة (Global)', count: customComponents.filter(c => c.isGlobal).length },
          { id: 'announcement_bar', label: language === 'en' ? '📢 Announcement Bars' : '📢 أشرطة إعلانية', count: customComponents.filter(c => c.type === 'announcement_bar').length },
          { id: 'promo_banner', label: language === 'en' ? '🎯 Promo Banners' : '🎯 بانرات ترويجية', count: customComponents.filter(c => c.type === 'promo_banner').length },
          { id: 'floating_widget', label: language === 'en' ? '⭐ Floating Widgets' : '⭐ شارات عائمة', count: customComponents.filter(c => c.type === 'floating_widget').length },
          { id: 'lead_capture', label: language === 'en' ? '💬 Lead Capture Forms' : '💬 نماذج التقاط بيانات', count: customComponents.filter(c => c.type === 'lead_capture').length },
          { id: 'feature_cards', label: language === 'en' ? '🚀 Feature Grids' : '🚀 بطاقات ومميزات', count: customComponents.filter(c => c.type === 'feature_cards').length },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeFilter === tab.id
                ? 'bg-brand-green text-dark-950 shadow-neon'
                : 'bg-dark-900 border border-white/5 text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-montserrat font-bold ${
              activeFilter === tab.id ? 'bg-dark-950 text-brand-green' : 'bg-white/10 text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Components Grid */}
      {filteredComponents.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-white/20">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Boxes className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">لا توجد مكونات في هذا القسم</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            قم بإنشاء مكون جديد لتخصيصه وعرضه في صفحات الموقع أو كشريط إعلاني علوي.
          </p>
          <Button onClick={() => handleOpenCreate('promo_banner')} variant="glow">
            + إنشاء أول مكون مخصص
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredComponents.map((comp) => {
            const typeDef = COMPONENT_TYPES.find(t => t.type === comp.type) || COMPONENT_TYPES[0];
            const Icon = typeDef.icon || Boxes;

            return (
              <Card 
                key={comp.id} 
                className={`p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-green/40 relative group ${
                  comp.isGlobal ? 'border-brand-green/30 bg-gradient-to-b from-dark-900 via-dark-900 to-brand-green/[0.04]' : ''
                }`}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shadow-neon shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base group-hover:text-brand-green transition-colors">
                          {comp.name}
                        </h4>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {language === 'en' ? typeDef.type.replace('_', ' ') : typeDef.name.split('(')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <PublishStatusBadge
                        status={comp.status}
                        scheduledAt={comp.scheduledAt}
                        isEnabled={comp.isEnabled}
                      />
                      {comp.isGlobal ? (
                        <Badge variant="green" className="py-1 px-3 text-xs">
                          <Globe2 className="w-3 h-3 inline ml-1" />
                          {language === 'en' ? 'Global Site-Wide' : 'عام في كل الموقع'}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="py-1 px-3 text-xs text-slate-400 border-white/10">
                          {language === 'en' ? 'Page Inset' : 'مدرج بصفحات'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Quick Summary / Mini Preview snippet */}
                  <div className="p-3.5 rounded-xl bg-dark-950/70 border border-white/5 text-xs text-slate-300 space-y-1.5 mb-6">
                    {comp.data?.title && (
                      <div className="font-bold text-white line-clamp-1">
                        📌 {comp.data.title} {comp.data.highlight && <span className="text-brand-green">({comp.data.highlight})</span>}
                      </div>
                    )}
                    {comp.data?.text && (
                      <div className="text-slate-300 line-clamp-2">
                        💬 {comp.data.text}
                      </div>
                    )}
                    {comp.data?.subtitle && (
                      <div className="text-slate-400 line-clamp-1">
                        {comp.data.subtitle}
                      </div>
                    )}
                    {comp.data?.btnText && (
                      <div className="text-[11px] text-brand-green font-semibold pt-1">
                        {language === 'en' ? 'Action Button: ' : 'زر الإجراء: '} {comp.data.btnText} → ({comp.data.btnLink || comp.data.link || '/contact'})
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Left Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* 1-Click Page Inserter Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenInserter(comp)}
                      className="px-3.5 py-1.5 rounded-xl bg-brand-green text-dark-950 font-bold text-xs hover:bg-brand-green/90 shadow-neon flex items-center gap-1.5 transition-all cursor-pointer"
                      title={language === 'en' ? 'Insert this component into any page' : 'إدراج هذا المكون في أي صفحة'}
                    >
                      <Layout className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Insert to Page' : 'إدراج في صفحة'}</span>
                    </button>

                    {/* Global Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleGlobal(comp)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        comp.isGlobal
                          ? 'bg-brand-green/10 border-brand-green/40 text-brand-green'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                      }`}
                      title={comp.isGlobal ? (language === 'en' ? 'Disable global site-wide' : 'إلغاء جعله مكوناً عاماً') : (language === 'en' ? 'Enable as global site-wide component' : 'تفعيل كمكون عام يظهر في كل الصفحات')}
                    >
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>{comp.isGlobal ? (language === 'en' ? 'Global (Active)' : 'عام (مفعل)') : (language === 'en' ? 'Make Global' : 'جعله عاماً')}</span>
                    </button>
                  </div>

                  {/* Right Control Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleEnabled(comp)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        comp.isEnabled ? 'text-brand-green hover:bg-brand-green/10' : 'text-slate-500 hover:bg-white/5'
                      }`}
                      title={comp.isEnabled ? (language === 'en' ? 'Disable component' : 'تعطيل المكون') : (language === 'en' ? 'Enable component' : 'تفعيل المكون')}
                    >
                      {comp.isEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(comp)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      title={language === 'en' ? 'Duplicate component' : 'نسخ المكون'}
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(comp)}
                      className="p-2 rounded-xl text-brand-green hover:bg-brand-green/10 transition-colors cursor-pointer"
                      title={language === 'en' ? 'Edit component' : 'تعديل وتخصيص'}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(comp)}
                      className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title={language === 'en' ? 'Delete component' : 'حذف المكون'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* 5. Interactive Page Inserter Modal */}
      {inserterModalOpen && selectedCompForInsert && (
        <AdminModal
          isOpen={true}
          showFooter={false}
          title={`إدراج المكون في صفحة: "${selectedCompForInsert.name}"`}
          onClose={() => setInserterModalOpen(false)}
        >
          <div className="space-y-6 text-right">
            
            {/* Component Summary Card */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-brand-green/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedCompForInsert.name}</h4>
                  <span className="text-[11px] text-slate-400">النوع: {selectedCompForInsert.type}</span>
                </div>
              </div>
              <Badge variant="green">جاهز للإدراج</Badge>
            </div>

            {insertSuccessMsg ? (
              <div className="p-6 rounded-2xl bg-brand-green/15 border border-brand-green text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
                <h4 className="text-lg font-bold text-white">{insertSuccessMsg}</h4>
                <p className="text-xs text-slate-300">تم تحديث كتل الصفحة وحفظها مباشرة في قاعدة البيانات.</p>
              </div>
            ) : (
              <>
                {/* 1. Pick Target Page */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    اختر الصفحة المستهدفة المراد إدراج المكون بها:
                  </label>
                  <select
                    value={targetPageSlug}
                    onChange={e => setTargetPageSlug(e.target.value)}
                    className="w-full bg-dark-950 border border-white/10 focus:border-brand-green rounded-xl p-3.5 text-sm text-white outline-none"
                  >
                    {pages.map(page => (
                      <option key={page.id} value={page.slug}>
                        {page.title} ({page.slug === 'home' ? '/' : `/${page.slug}`})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Pick Position in Page */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    حدد موضع المكون داخل الصفحة:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'top', label: '⬆️ أعلى الصفحة', desc: 'في مقدمة المحتوى' },
                      { id: 'after_hero', label: '🌟 بعد الهيرو', desc: 'بعد البانر الرئيسي' },
                      { id: 'middle', label: '↔️ وسط الصفحة', desc: 'بين الأقسام' },
                      { id: 'bottom', label: '⬇️ أسفل الصفحة', desc: 'قبل التذييل' }
                    ].map(pos => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setInsertPosition(pos.id)}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          insertPosition === pos.id
                            ? 'bg-brand-green/10 border-brand-green text-white shadow-neon'
                            : 'bg-dark-950 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-xs text-white mb-1">{pos.label}</div>
                        <div className="text-[10px] text-slate-400">{pos.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setInserterModalOpen(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="button"
                    variant="glow"
                    disabled={inserting}
                    onClick={handleExecuteInsert}
                    icon={Check}
                  >
                    {inserting ? 'جاري الإدراج...' : 'تأكيد وإدراج المكون الآن'}
                  </Button>
                </div>
              </>
            )}

          </div>
        </AdminModal>
      )}

      {/* 6. Component Creator / Editor Modal */}
      {editModalOpen && (
        <AdminModal
          isOpen={true}
          showFooter={false}
          title={editingComponent ? `تعديل المكون: ${editingComponent.name}` : 'إنشاء مكون مخصص جديد'}
          onClose={() => setEditModalOpen(false)}
          maxWidth="max-w-4xl"
        >
          <form onSubmit={handleSave} className="space-y-6 text-right">
            
            {/* Modal Tabs Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setModalTab('content')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  modalTab === 'content' ? 'bg-brand-green text-dark-950 font-bold' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                1. نوع المكون والمحتوى
              </button>
              <button
                type="button"
                onClick={() => setModalTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  modalTab === 'settings' ? 'bg-brand-green text-dark-950 font-bold' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                2. إعدادات النشر والظهور
              </button>
              <button
                type="button"
                onClick={() => setModalTab('preview')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  modalTab === 'preview' ? 'bg-brand-green text-dark-950 font-bold' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                👁️ 3. معاينة حية للمكون
              </button>
            </div>

            {/* TAB 1: Content & Type */}
            {modalTab === 'content' && (
              <div className="space-y-5">
                
                <AdminInput
                  label="اسم المكون (للإدارة الداخلية) *"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: شريط عروض اليوم الوطني، بانر الاستشارة المجانية..."
                  required
                />

                {/* Component Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">نوع المكون والتصميم:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {COMPONENT_TYPES.map(t => {
                      const TIcon = t.icon || Boxes;
                      const isSelected = formType === t.type;
                      return (
                        <button
                          key={t.type}
                          type="button"
                          onClick={() => handleTypeChange(t.type)}
                          className={`p-3.5 rounded-2xl border text-right transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-brand-green/10 border-brand-green text-white shadow-neon'
                              : 'bg-dark-950 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <TIcon className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-brand-green' : 'text-slate-500'}`} />
                          <div>
                            <div className="font-bold text-xs text-white">{t.name.split('(')[0]}</div>
                            <div className="text-[10px] text-slate-400 line-clamp-1">{t.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Content Form according to Type */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h5 className="font-bold text-brand-green text-sm">محتوى وحقول المكون:</h5>

                  {/* 1. Announcement Bar Fields */}
                  {formType === 'announcement_bar' && (
                    <>
                      <AdminInput
                        label="شارة التنبيه (Badge)"
                        value={formData.data?.badge || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, badge: e.target.value } })}
                        placeholder="مثال: عرض خاص، تنبيه هام..."
                      />
                      <AdminTextarea
                        label="نص الإعلان أو الرسالة *"
                        rows={2}
                        value={formData.data?.text || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, text: e.target.value } })}
                        placeholder="اكتب نص الإعلان الذي سيظهر في الشريط العلوي..."
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminInput
                          label="نص زر الرابط (اختياري)"
                          value={formData.data?.btnText || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnText: e.target.value } })}
                          placeholder="مثال: احجز الآن"
                        />
                        <AdminInput
                          label="وجهة الرابط (URL)"
                          value={formData.data?.btnLink || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnLink: e.target.value } })}
                          placeholder="/contact أو https://..."
                        />
                      </div>
                    </>
                  )}

                  {/* 2. Promo Banner Fields */}
                  {formType === 'promo_banner' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminInput
                          label="شارة البانر (Badge)"
                          value={formData.data?.badge || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, badge: e.target.value } })}
                          placeholder="استشارة مجانية"
                        />
                        <AdminInput
                          label="العنوان المضيء (Highlight)"
                          value={formData.data?.highlight || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, highlight: e.target.value } })}
                          placeholder="احصل على تدقيق رقمي مجاني"
                        />
                      </div>
                      <AdminInput
                        label="العنوان الرئيسي *"
                        value={formData.data?.title || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, title: e.target.value } })}
                        placeholder="جاهز لتوسيع انتشار علامتك في السوق؟"
                      />
                      <AdminTextarea
                        label="النص الوصفي الفرعي"
                        rows={3}
                        value={formData.data?.subtitle || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, subtitle: e.target.value } })}
                        placeholder="شرح تفاصيل العرض والقيمة المضافة..."
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminInput
                          label="نص الزر الرئيسي"
                          value={formData.data?.btnText || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnText: e.target.value } })}
                          placeholder="طلب التدقيق المجاني"
                        />
                        <AdminInput
                          label="رابط الزر الرئيسي"
                          value={formData.data?.btnLink || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnLink: e.target.value } })}
                          placeholder="/contact"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminInput
                          label="نص الزر الثانوي"
                          value={formData.data?.secondaryBtnText || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, secondaryBtnText: e.target.value } })}
                          placeholder="استعراض الخدمات"
                        />
                        <AdminInput
                          label="رابط الزر الثانوي"
                          value={formData.data?.secondaryBtnLink || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, secondaryBtnLink: e.target.value } })}
                          placeholder="/services"
                        />
                      </div>
                      <AdminImageUpload
                        label="صورة البانر الجانبية (اختياري)"
                        value={formData.data?.imageUrl || ''}
                        onChange={url => setFormData({ ...formData, data: { ...formData.data, imageUrl: url } })}
                      />
                    </>
                  )}

                  {/* 3. Floating Widget Fields */}
                  {formType === 'floating_widget' && (
                    <>
                      <AdminInput
                        label="عنوان الشارة *"
                        value={formData.data?.title || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, title: e.target.value } })}
                        placeholder="تقييم 4.9/5 من 50+ عميل"
                      />
                      <AdminInput
                        label="النص الفرعي للشارة"
                        value={formData.data?.subtitle || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, subtitle: e.target.value } })}
                        placeholder="وكالة معتمدة للتحول الرقمي"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminInput
                          label="نص زر الشارة"
                          value={formData.data?.btnText || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnText: e.target.value } })}
                          placeholder="آراء شركاء النجاح"
                        />
                        <AdminInput
                          label="رابط الزر"
                          value={formData.data?.link || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, link: e.target.value } })}
                          placeholder="/testimonials"
                        />
                      </div>
                      <AdminImageUpload
                        label="صورة الأفاتار / الشعار المصغر"
                        value={formData.data?.avatarUrl || ''}
                        onChange={url => setFormData({ ...formData, data: { ...formData.data, avatarUrl: url } })}
                      />
                    </>
                  )}

                  {/* 4. Lead Capture Fields */}
                  {formType === 'lead_capture' && (
                    <>
                      <AdminInput
                        label="شارة النموذج"
                        value={formData.data?.badge || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, badge: e.target.value } })}
                        placeholder="طلب تسعير فوري"
                      />
                      <AdminInput
                        label="عنوان النموذج *"
                        value={formData.data?.title || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, title: e.target.value } })}
                        placeholder="احصل على عرض سعر مخصص لمشروعك خلال 60 دقيقة"
                      />
                      <AdminTextarea
                        label="النص الفرعي التوضيحي"
                        rows={2}
                        value={formData.data?.subtitle || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, subtitle: e.target.value } })}
                        placeholder="أدخل بياناتك وسنتواصل معك فوراً..."
                      />
                      <AdminInput
                        label="نص زر الإرسال"
                        value={formData.data?.btnText || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, btnText: e.target.value } })}
                        placeholder="إرسال طلب التسعير الآن"
                      />
                    </>
                  )}

                  {/* 5. Custom HTML / Rich Content */}
                  {formType === 'custom_html' && (
                    <>
                      <AdminInput
                        label="عنوان المكون (اختياري)"
                        value={formData.data?.title || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, title: e.target.value } })}
                        placeholder="تفاصيل إضافية"
                      />
                      <AdminTextarea
                        label="محتوى HTML أو نصوص مخصصة *"
                        rows={6}
                        value={formData.data?.content || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, content: e.target.value } })}
                        placeholder="<p>اكتب هنا كود HTML أو فقرات منسقة...</p>"
                      />
                    </>
                  )}

                  {/* 6. Action CTA Banner */}
                  {formType === 'cta_banner' && (
                    <>
                      <AdminInput
                        label="عنوان الدعوة لاتخاذ إجراء *"
                        value={formData.data?.title || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, title: e.target.value } })}
                        placeholder="هل ترغب في بدء قصة نجاحك معنا؟"
                      />
                      <AdminTextarea
                        label="النص الفرعي"
                        rows={2}
                        value={formData.data?.subtitle || ''}
                        onChange={e => setFormData({ ...formData, data: { ...formData.data, subtitle: e.target.value } })}
                        placeholder="تواصل مع فريقنا اليوم لمناقشة خطة العمل..."
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminInput
                          label="نص الزر"
                          value={formData.data?.btnText || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnText: e.target.value } })}
                          placeholder="تواصل معنا الآن"
                        />
                        <AdminInput
                          label="رابط الزر"
                          value={formData.data?.btnLink || ''}
                          onChange={e => setFormData({ ...formData, data: { ...formData.data, btnLink: e.target.value } })}
                          placeholder="/contact"
                        />
                      </div>
                    </>
                  )}

                </div>

              </div>
            )}

            {/* TAB 2: Settings & Global Placement */}
            {modalTab === 'settings' && (
              <div className="space-y-6">
                
                {/* 1. Publishing Status / Archival / Scheduling */}
                <div className="p-5 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
                  <AdminPublishStatusPicker
                    status={formData.status}
                    onChangeStatus={(s) => setFormData({ ...formData, status: s, isEnabled: s === 'published' })}
                    scheduledAt={formData.scheduledAt}
                    onChangeScheduledAt={(dt) => setFormData({ ...formData, scheduledAt: dt })}
                    label="حالة نشر وظهور المكون (نشر / أرشفة / جدولة)"
                  />
                </div>

                {/* 2. Global Toggle Option */}
                <div className="p-5 rounded-2xl bg-dark-950 border border-brand-green/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-white text-sm flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-brand-green" />
                        <span>تفعيل كمكون عام في كامل صفحات الموقع (Global Component)</span>
                      </h5>
                      <p className="text-xs text-slate-400 mt-1">
                        عند تفعيل هذا الخيار، سيظهر هذا المكون تلقائياً في كل صفحات الموقع (مثل الشريط الإعلاني العلوي أو الشارة العائمة).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isGlobal}
                      onChange={e => setFormData({ ...formData, isGlobal: e.target.checked })}
                      className="w-5 h-5 accent-brand-green cursor-pointer"
                    />
                  </div>

                  {formData.isGlobal && (
                    <div className="pt-3 border-t border-white/10 space-y-3">
                      <label className="block text-xs font-bold text-slate-300">موضع الظهور العام:</label>
                      <select
                        value={formData.globalPosition}
                        onChange={e => setFormData({ ...formData, globalPosition: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-sm text-white"
                      >
                        <option value="top_bar">شريط علوي أعلى القائمة الرئيسية (Top Bar)</option>
                        <option value="floating">عنصر عائم أسفل الشاشة (Floating Widget)</option>
                        <option value="page_block">كتلة صفحة عامة (Page Block)</option>
                      </select>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: Live Preview */}
            {modalTab === 'preview' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400 mb-2">
                  معاينة حية للمكون كما سيظهر في واجهة الموقع:
                </div>
                <div className="p-6 rounded-3xl bg-dark-950 border border-brand-green/30 overflow-hidden shadow-2xl">
                  <CustomComponentRenderer
                    component={{
                      type: formType,
                      name: formData.name,
                      data: formData.data,
                      isEnabled: true
                    }}
                    isPreview={true}
                  />
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {modalTab !== 'preview' ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setModalTab('preview')}
                    icon={Eye}
                  >
                    معاينة حية
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setModalTab('content')}
                  >
                    العودة للمحتوى
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  variant="glow"
                  disabled={saving}
                  icon={Check}
                >
                  {saving ? 'جاري الحفظ...' : (editingComponent ? 'حفظ التعديلات' : 'إنشاء المكون')}
                </Button>
              </div>
            </div>

          </form>
        </AdminModal>
      )}

      {/* 7. Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!deleteConfirm}
        title="تأكيد حذف المكون"
        message={`هل أنت متأكد من رغبتك في حذف المكون "${deleteConfirm?.name}"؟ سيتم حذفه من المكتبة ومن الظهور العام.`}
        confirmText="نعم، احذف المكون"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(null)}
      />

    </div>
  );
}
