import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Eye, ExternalLink, ArrowUp, 
  ArrowDown, Layers, Sparkles, Layout, Settings, 
  FileText, CheckCircle2, X, MoveUp, MoveDown, HelpCircle,
  MessageSquare, Users, Image as ImageIcon, Star, BarChart3,
  Globe2, ShieldCheck, Filter, ChevronDown, ChevronUp,
  Palette, Sliders, Check, RefreshCw
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
import AdminImageUpload from '../../components/admin/ui/AdminImageUpload';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

// Available Block Types Definitions
const BLOCK_TYPES = [
  { 
    type: 'hero', 
    name: 'بانر رئيسي (Hero Banner)', 
    desc: 'عنوان كبير مع نص فرعي وأزرار دعوة لاتخاذ إجراء', 
    icon: Sparkles, 
    defaultData: { 
      badge: 'وكالة الإبداع والتحول الرقمي', 
      title: 'نصنع الإبداع الرقمي', 
      highlight: 'الذي يقود مستقبلك', 
      subtitle: 'شريكك الاستراتيجي في تطوير المواقع، بناء الهويات البصرية، والإنتاج السينمائي لتحقيق أعلى عائد استثماري.', 
      ctaText: 'ابدأ مشروعك معنا', 
      ctaLink: '/contact', 
      secondaryCtaText: 'استعرض المشاريع', 
      secondaryCtaLink: '/projects',
      imageUrl: ''
    } 
  },
  { 
    type: 'stats', 
    name: 'شريط الإحصائيات (Stats Bar)', 
    desc: 'أرقام وإحصائيات الإنجاز والخبرة والعملاء', 
    icon: BarChart3, 
    defaultData: {
      title: 'أرقام وإنجازات نفتخر بها',
      subtitle: 'مؤشرات حقيقية تعكس ثقة عملائنا وقوة أدائنا في السوق',
      customStats: [
        { value: '+120', label: 'مشروع منجز' },
        { value: '+50', label: 'عميل يثق بنا' },
        { value: '99%', label: 'نسبة رضا العملاء' },
        { value: '+5', label: 'سنوات من الخبرة' }
      ]
    } 
  },
  { 
    type: 'services_grid', 
    name: 'شبكة الخدمات (Services Grid)', 
    desc: 'عرض خدمات الوكالة من قاعدة البيانات', 
    icon: Layers, 
    defaultData: { 
      badge: 'خدماتنا المتكاملة', 
      title: 'حلول وخدمات إبداعية', 
      highlight: 'شاملة لنموك', 
      subtitle: 'باقة من الحلول الرقمية الشاملة في التصميم والبرمجة والتسويق.' 
    } 
  },
  { 
    type: 'featured_projects', 
    name: 'معرض المشاريع (Projects)', 
    desc: 'استعراض المشاريع وقصص النجاح المنشورة', 
    icon: Layout, 
    defaultData: { 
      badge: 'معرض الأعمال', 
      title: 'أعمال ومشاريع نفتخر بها', 
      highlight: 'وتبرز إبداعنا', 
      subtitle: 'استعرض جانباً من المشاريع التي أنجزناها لشركائنا بدقة واحترافية.', 
      limit: 4,
      categoryKey: 'all'
    } 
  },
  { 
    type: 'why_choose_us', 
    name: 'لماذا تختارنا (Why Us)', 
    desc: 'أبرز مميزات ونقاط القوة والريادة', 
    icon: CheckCircle2, 
    defaultData: {
      badge: 'لماذا تختارنا',
      title: 'الريادة في صناعة الإبداع',
      highlight: 'والتحول الرقمي',
      subtitle: 'نجمع بين التفكير الاستراتيجي والإنتاج البصري والهندسة البرمجية.',
      features: [
        { title: 'فكر إبداعي وحلول جريئة', desc: 'نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك تتصدر المشهد وتأسر قلوب جمهورك.' },
        { title: 'هندسة برمجية فائقة السرعة', desc: 'نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان ومطابقة الـ Core Web Vitals.' },
        { title: 'الالتزام والموثوقية المطلقة', desc: 'نلتزم بأعلى معايير المصداقية في تسليم المشاريع، وضوح التكاليف، والسرية التامة لبياناتك.' },
        { title: 'عائد استثماري حقيقي (ROI)', desc: 'كل عمل وحملة نصممها تهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري.' }
      ]
    } 
  },
  { 
    type: 'testimonials', 
    name: 'تقييمات العملاء (Reviews)', 
    desc: 'آراء وتوصيات العملاء وشركاء النجاح', 
    icon: Star, 
    defaultData: {
      badge: 'آراء العملاء',
      title: 'ماذا يقول شركاء النجاح',
      highlight: 'عن تجربتهم معنا؟',
      subtitle: 'نعتز بثقة كبرى الشركات والعملاء الذين ساهمنا في تنمية أعمالهم.',
      limit: 3
    } 
  },
  { 
    type: 'partners', 
    name: 'شريط الشركاء (Partners)', 
    desc: 'شعارات الشركاء والجهات المعتمدة', 
    icon: Users, 
    defaultData: {
      title: 'نفتخر بثقة واعتمادات كبرى الشركات والعلامات التجارية الرائدة'
    } 
  },
  { 
    type: 'team_grid', 
    name: 'فريق العمل (Team)', 
    desc: 'بطاقات أعضاء الفريق الإبداعي', 
    icon: Users, 
    defaultData: { 
      badge: 'فريق العمل', 
      title: 'نخبة المبدعين والمطورين', 
      highlight: 'خلف نجاحنا', 
      subtitle: 'فريق متكامل يجمع بين استراتيجيي التسويق، مصممي الهويات، ومهندسي الويب.' 
    } 
  },
  { 
    type: 'rich_text', 
    name: 'محتوى مخصص (Rich Text)', 
    desc: 'نصوص وفقرات مخصصة وعناوين', 
    icon: FileText, 
    defaultData: { 
      title: 'تفاصيل وشروحات إضافية', 
      content: '<p>اكتب هنا محتوى نصي إضافي وشروحات وتفاصيل حول خدمتك أو صفحتك.</p>' 
    } 
  },
  { 
    type: 'faq', 
    name: 'الأسئلة الشائعة (FAQ Accordion)', 
    desc: 'قائمة الأسئلة والإجابات المنسدلة', 
    icon: HelpCircle, 
    defaultData: { 
      badge: 'الأسئلة الشائعة',
      title: 'إجابات على أكثر', 
      highlight: 'الاستفسارات شيوعاً', 
      subtitle: 'إجابات على أهم التساؤلات المتكررة حول خدماتنا وطرق التنفيذ.',
      items: [
        { q: 'ما هي المدة المتوقعة لتنفيذ وتطوير موقع إلكتروني؟', a: 'تتراوح المدة عادة بين 10 إلى 25 يوم عمل حسب حجم الميزات والربط المطلوب.' },
        { q: 'هل المواقع متوافقة مع الهواتف الذكية ومحركات البحث؟', a: 'نعم، 100% من مشاريعنا مصممة لتكون فائقة السرعة ومتوافقة مع أعلى معايير Core Web Vitals.' }
      ]
    } 
  },
  { 
    type: 'contact_form', 
    name: 'نموذج تواصل (Contact Form)', 
    desc: 'فورم إرسال رسالة وطلب مباشر', 
    icon: MessageSquare, 
    defaultData: { 
      title: 'تواصل معنا مباشرة', 
      subtitle: 'أرسل تفاصيل مشروعك وسيقوم فريقنا بالتواصل معك في غضون ساعات قليلة.',
      btnText: 'إرسال الطلب الآن'
    } 
  },
  { 
    type: 'cta', 
    name: 'بانر اتخاذ إجراء (CTA Banner)', 
    desc: 'بانر عريض مع زر دعوة للتواصل', 
    icon: Sparkles, 
    defaultData: { 
      title: 'هل ترغب بالبدء في مشروعك القادم؟', 
      subtitle: 'تواصل مع فريقنا اليوم لمناقشة خطة العمل والاستراتيجية الأنسب لعلامتك.', 
      btnText: 'تواصل معنا الآن', 
      btnLink: '/contact' 
    } 
  }
];

const SYSTEM_SLUGS = [
  'home', 'about', 'ceo-message', 'services', 'projects', 'blog', 
  'contact', 'faq', 'privacy-policy', 'terms-and-conditions'
];

function getPageHref(slug) {
  if (slug === 'home') return '/';
  if (SYSTEM_SLUGS.includes(slug)) return `/${slug}`;
  return `/p/${slug}`;
}

import AdminPublishStatusPicker, { PublishStatusBadge } from '../../components/admin/ui/AdminPublishStatusPicker';

export default function AdminPagesManager() {
  const { pages, setPages, customComponents = [] } = useData();
  const { language, isRTL, t } = useLanguage();
  const [mainView, setMainView] = useState('pages'); // 'pages' | 'components_library'
  
  // Page Builder Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('blocks'); // 'settings' | 'blocks'
  const [expandedBlock, setExpandedBlock] = useState(0);

  // Dedicated Component Quick Configurator Modal
  const [componentConfigModal, setComponentConfigModal] = useState(null);

  // Form State for Page Builder
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    seoDescription: '',
    status: 'published',
    scheduledAt: '',
    isPublished: true,
    blocks: []
  });

  const handleOpenCreate = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      slug: '',
      seoDescription: '',
      status: 'published',
      scheduledAt: '',
      isPublished: true,
      blocks: [
        { type: 'hero', data: JSON.parse(JSON.stringify(BLOCK_TYPES[0].defaultData)) },
        { type: 'stats', data: JSON.parse(JSON.stringify(BLOCK_TYPES[1].defaultData)) },
        { type: 'services_grid', data: JSON.parse(JSON.stringify(BLOCK_TYPES[2].defaultData)) },
        { type: 'cta', data: JSON.parse(JSON.stringify(BLOCK_TYPES[11].defaultData)) }
      ]
    });
    setExpandedBlock(0);
    setActiveTab('blocks');
    setModalOpen(true);
  };

  const handleOpenEdit = (page) => {
    setEditingPage(page);
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      seoDescription: page.seo_description || page.seoDescription || '',
      status: page.status || (page.isPublished !== undefined && !page.isPublished ? 'archived' : 'published'),
      scheduledAt: page.scheduledAt || '',
      isPublished: page.is_published !== undefined ? Boolean(page.is_published) : Boolean(page.isPublished),
      blocks: Array.isArray(page.blocks) ? JSON.parse(JSON.stringify(page.blocks)) : []
    });
    setExpandedBlock(0);
    setActiveTab('blocks');
    setModalOpen(true);
  };

  // Add block from library to page
  const handleAddBlock = (typeDef) => {
    setFormData(prev => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          type: typeDef.type,
          data: JSON.parse(JSON.stringify(typeDef.defaultData))
        }
      ]
    }));
    setExpandedBlock(formData.blocks.length);
  };

  // Add custom saved component to page blocks
  const handleAddCustomComponent = (comp) => {
    setFormData(prev => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          type: 'custom_component',
          componentId: comp.id,
          name: comp.name,
          componentType: comp.type,
          data: JSON.parse(JSON.stringify(comp.data || {}))
        }
      ]
    }));
    setExpandedBlock(formData.blocks.length);
  };

  // Remove block
  const handleRemoveBlock = (idx) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== idx)
    }));
  };

  // Move block up
  const handleMoveBlockUp = (idx) => {
    if (idx === 0) return;
    setFormData(prev => {
      const newBlocks = [...prev.blocks];
      const temp = newBlocks[idx - 1];
      newBlocks[idx - 1] = newBlocks[idx];
      newBlocks[idx] = temp;
      return { ...prev, blocks: newBlocks };
    });
    setExpandedBlock(idx - 1);
  };

  // Move block down
  const handleMoveBlockDown = (idx) => {
    if (idx === formData.blocks.length - 1) return;
    setFormData(prev => {
      const newBlocks = [...prev.blocks];
      const temp = newBlocks[idx + 1];
      newBlocks[idx + 1] = newBlocks[idx];
      newBlocks[idx] = temp;
      return { ...prev, blocks: newBlocks };
    });
    setExpandedBlock(idx + 1);
  };

  // Update specific block data field
  const handleUpdateBlockData = (idx, field, value) => {
    setFormData(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[idx] = {
        ...newBlocks[idx],
        data: {
          ...newBlocks[idx].data,
          [field]: value
        }
      };
      return { ...prev, blocks: newBlocks };
    });
  };

  // Save Page (Create or Update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('يرجى كتابة عنوان الصفحة والرابط (Slug)');
      return;
    }

    setSaving(true);
    try {
      if (editingPage) {
        const res = await api.updatePage(editingPage.id, formData);
        if (res.success) {
          setPages(prev => prev.map(p => p.id === editingPage.id ? { ...p, ...formData } : p));
          setModalOpen(false);
        }
      } else {
        const res = await api.createPage(formData);
        if (res.success) {
          setPages(prev => [
            { id: res.data?.id || Date.now(), ...formData },
            ...prev
          ]);
          setModalOpen(false);
        }
      }
    } catch (err) {
      alert('حدث خطأ أثناء حفظ الصفحة');
    } finally {
      setSaving(false);
    }
  };

  // Delete Page
  const handleDelete = async (id) => {
    try {
      const res = await api.deletePage(id);
      if (res.success) {
        setPages(prev => prev.filter(p => p.id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      alert('فشل حذف الصفحة');
    }
  };

  // Open Quick Configurator for a Component from Library
  const handleOpenComponentConfig = (compDef) => {
    setComponentConfigModal({
      ...compDef,
      currentData: JSON.parse(JSON.stringify(compDef.defaultData))
    });
  };

  // Save configured component as a new block in current page or as template
  const handleApplyConfiguredComponent = () => {
    if (!componentConfigModal) return;
    
    // Add to current page builder form
    setFormData(prev => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          type: componentConfigModal.type,
          data: JSON.parse(JSON.stringify(componentConfigModal.currentData))
        }
      ]
    }));
    
    setExpandedBlock(formData.blocks.length);
    setComponentConfigModal(null);
    if (!modalOpen) {
      // If modal wasn't open, open it
      setModalOpen(true);
    }
  };

  const columns = [
    {
      header: language === 'en' ? 'Page Title & Type' : 'عنوان الصفحة والنوع',
      accessor: 'title',
      render: (val, row) => {
        const isSystem = SYSTEM_SLUGS.includes(row.slug) || row.isSystem;
        return (
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isSystem ? 'bg-brand-green/10 text-brand-green' : 'bg-blue-500/10 text-blue-400'
            }`}>
              {isSystem ? <Globe2 className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-bold text-white block text-sm">{val}</span>
              <span className="text-[10px] text-slate-400 font-medium">
                {isSystem ? (language === 'en' ? 'Core System Page' : 'صفحة نظام أساسية') : (language === 'en' ? 'Custom Landing Page' : 'صفحة هبوط مخصصة')}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      header: language === 'en' ? 'Path & URL' : 'المسار والرابط (URL)',
      accessor: 'slug',
      render: (val) => {
        const href = getPageHref(val);
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-brand-green hover:underline dir-ltr inline-flex items-center gap-1 font-mono font-bold"
          >
            <span>{href}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
    },
    {
      header: language === 'en' ? 'Included Blocks' : 'المكونات المضمنة',
      accessor: 'blocks',
      render: (val) => (
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-300">
          {Array.isArray(val) ? val.length : 0} {language === 'en' ? 'blocks' : 'مكونات'}
        </span>
      )
    },
    {
      header: language === 'en' ? 'Publishing Status' : 'حالة النشر والظهور',
      accessor: 'status',
      render: (_, row) => (
        <PublishStatusBadge
          status={row.status}
          scheduledAt={row.scheduledAt}
          isPublished={row.isPublished !== undefined ? row.isPublished : row.is_published}
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Page Header with Switcher */}
      <AdminPageHeader
        title={language === 'en' ? 'Page Builder & CMS Manager' : 'منشئ وإدارة كافة صفحات ومكونات الموقع (Page Builder)'}
        subtitle={language === 'en' ? 'Full visual and structural control over core landing pages, custom pages, and component configurations' : 'تحكم بكامل صفحات الموقع الأساسية والصفحات المخصصة ونماذج إعداد وتخصيص المكونات الـ 12'}
        actionLabel={language === 'en' ? 'Create New Page' : 'إنشاء صفحة جديدة'}
        onAction={handleOpenCreate}
      />

      {/* 2. Top View Switcher Navigation */}
      <div className="flex items-center gap-3 p-1.5 bg-dark-900 border border-white/[0.08] rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setMainView('pages')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            mainView === 'pages'
              ? 'bg-brand-green text-dark-950 shadow-neon'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>{language === 'en' ? `Manage Pages (${pages.length})` : `إدارة الصفحات (${pages.length})`}</span>
        </button>

        <button
          type="button"
          onClick={() => setMainView('components_library')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            mainView === 'components_library'
              ? 'bg-brand-green text-dark-950 shadow-neon'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{language === 'en' ? '12 Pre-Configured Component Models' : 'نماذج إعداد وتخصيص المكونات الـ 12'}</span>
        </button>
      </div>

      {/* VIEW A: PAGES TABLE */}
      {mainView === 'pages' && (
        <AdminTable
          columns={columns}
          data={pages}
          searchPlaceholder={language === 'en' ? 'Search by page title or slug...' : 'ابحث باسم الصفحة أو الرابط...'}
          searchKey="title"
          onEdit={handleOpenEdit}
          onDelete={(p) => {
            if (SYSTEM_SLUGS.includes(p.slug)) {
              alert(language === 'en' ? 'Cannot delete core system pages, but you can freely edit their blocks and content.' : 'لا يمكن حذف صفحات النظام الأساسية، ولكن يمكنك تعديل مكوناتها ونصوصها بحرية.');
              return;
            }
            setDeleteConfirm(p.id);
          }}
          onView={(p) => window.open(getPageHref(p.slug), '_blank')}
          emptyMessage={language === 'en' ? 'No pages recorded currently.' : 'لا توجد صفحات مسجلة حالياً.'}
        />
      )}

      {/* VIEW B: DEDICATED 12 COMPONENTS LIBRARY & DIRECT CONFIGURATION FORMS */}
      {mainView === 'components_library' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl bg-dark-900 border border-white/[0.08] ${isRTL ? 'text-right' : 'text-left'} space-y-2`}>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? 'Pre-Configured Component Models Library (12 Blocks)' : 'مكتبة نماذج إعداد وتخصيص المكونات الجاهزة (12 مكون)'}</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {language === 'en'
                ? 'Click on any of the 12 block templates below to open its dedicated editor and customize copy, imagery, and layout:'
                : 'انقر على أي مكون من المكونات الـ 12 أدناه لفتح نموذج الإعداد وإدخال البيانات المخصص له وتخصيص نصوصه وميزاته بدقة:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOCK_TYPES.map((b) => {
              const Icon = b.icon;
              return (
                <Card
                  key={b.type}
                  className="p-6 text-right flex flex-col justify-between group hover:border-brand-green/40 transition-all cursor-pointer"
                  onClick={() => handleOpenComponentConfig(b)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-dark-950 transition-colors shadow-neon">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="green" className="text-[10px]">جاهز للتعديل</Badge>
                    </div>

                    <h4 className="text-lg font-black text-white mb-2 group-hover:text-brand-green transition-colors">
                      {b.name}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">
                      {b.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-brand-green group-hover:text-white">
                    <span>فتح نموذج الإعداد والتخصيص</span>
                    <Edit className="w-4 h-4" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. DEDICATED COMPONENT CONFIGURATION MODAL */}
      {componentConfigModal && (
        <AdminModal
          isOpen={true}
          onClose={() => setComponentConfigModal(null)}
          title={`نموذج إعداد وتخصيص: ${componentConfigModal.name}`}
          subtitle="قم بتعديل وتخصيص نصوص وحقول هذا المكون مباشرة"
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyConfiguredComponent();
          }}
        >
          <div className="space-y-4 text-right">
            
            {/* HERO COMPONENT CONFIG */}
            {componentConfigModal.type === 'hero' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <AdminInput
                    label="الشارة العلوية (Badge)"
                    value={componentConfigModal.currentData.badge || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, badge: e.target.value }
                    }))}
                    placeholder="مثال: جديد"
                  />
                </div>
                <div>
                  <AdminInput
                    label="الكلمة البارزة (Highlight)"
                    value={componentConfigModal.currentData.highlight || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, highlight: e.target.value }
                    }))}
                    placeholder="الكلمة الخضراء..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminInput
                    label="العنوان الرئيسي (Title)"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                    placeholder="العنوان الرئيسي للبانر..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="الوصف الفرعي (Subtitle)"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
                <div>
                  <AdminInput
                    label="نص الزر الرئيسي"
                    value={componentConfigModal.currentData.ctaText || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, ctaText: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <AdminInput
                    label="رابط الزر الرئيسي"
                    value={componentConfigModal.currentData.ctaLink || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, ctaLink: e.target.value }
                    }))}
                    dir="ltr"
                  />
                </div>
                <div>
                  <AdminInput
                    label="نص الزر الثانوي (اختياري)"
                    value={componentConfigModal.currentData.secondaryCtaText || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, secondaryCtaText: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <AdminInput
                    label="رابط الزر الثانوي"
                    value={componentConfigModal.currentData.secondaryCtaLink || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, secondaryCtaLink: e.target.value }
                    }))}
                    dir="ltr"
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminImageUpload
                    label="صورة البانر (اختياري)"
                    value={componentConfigModal.currentData.imageUrl || ''}
                    onChange={url => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, imageUrl: url }
                    }))}
                  />
                </div>
              </div>
            )}

            {/* STATS COMPONENT CONFIG */}
            {componentConfigModal.type === 'stats' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminInput
                    label="عنوان القسم (اختياري)"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                  <AdminInput
                    label="الوصف الفرعي (اختياري)"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                  />
                </div>

                <div className="p-4 bg-dark-950 rounded-2xl border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">إعداد العدادات الإحصائية الـ 4:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(componentConfigModal.currentData.customStats || [
                      { value: '+120', label: 'مشروع منجز' },
                      { value: '+50', label: 'عميل يثق بنا' },
                      { value: '99%', label: 'نسبة رضا العملاء' },
                      { value: '+5', label: 'سنوات من الخبرة' }
                    ]).map((stat, sIdx) => (
                      <div key={sIdx} className="space-y-1.5 p-2 bg-dark-900 rounded-xl border border-white/5">
                        <label className="text-[10px] text-slate-400 block text-center">عداد #{sIdx + 1}</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={e => {
                            const updated = [...componentConfigModal.currentData.customStats];
                            updated[sIdx].value = e.target.value;
                            setComponentConfigModal(prev => ({
                              ...prev,
                              currentData: { ...prev.currentData, customStats: updated }
                            }));
                          }}
                          className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1.5 text-xs text-brand-green font-montserrat font-bold text-center"
                          placeholder="الرقم / القيمة"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={e => {
                            const updated = [...componentConfigModal.currentData.customStats];
                            updated[sIdx].label = e.target.value;
                            setComponentConfigModal(prev => ({
                              ...prev,
                              currentData: { ...prev.currentData, customStats: updated }
                            }));
                          }}
                          className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1.5 text-[11px] text-slate-300 text-center"
                          placeholder="التسمية"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES GRID CONFIG */}
            {componentConfigModal.type === 'services_grid' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label="الشارة (Badge)"
                  value={componentConfigModal.currentData.badge || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, badge: e.target.value }
                  }))}
                />
                <AdminInput
                  label="الكلمة البارزة (Highlight)"
                  value={componentConfigModal.currentData.highlight || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, highlight: e.target.value }
                  }))}
                />
                <div className="sm:col-span-2">
                  <AdminInput
                    label="العنوان الرئيسي (Title)"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="الوصف الفرعي (Subtitle)"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}

            {/* FEATURED PROJECTS CONFIG */}
            {componentConfigModal.type === 'featured_projects' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label="الشارة (Badge)"
                  value={componentConfigModal.currentData.badge || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, badge: e.target.value }
                  }))}
                />
                <AdminInput
                  label="الكلمة البارزة (Highlight)"
                  value={componentConfigModal.currentData.highlight || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, highlight: e.target.value }
                  }))}
                />
                <div className="sm:col-span-2">
                  <AdminInput
                    label="العنوان الرئيسي (Title)"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="الوصف الفرعي (Subtitle)"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1.5">عدد المشاريع المعروضة</label>
                  <select
                    value={componentConfigModal.currentData.limit || 4}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, limit: parseInt(e.target.value) }
                    }))}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-green"
                  >
                    <option value={2}>مشروعين (2)</option>
                    <option value={4}>4 مشاريع</option>
                    <option value={6}>6 مشاريع</option>
                    <option value={8}>8 مشاريع (الكل)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1.5">تصفية حسب التصنيف</label>
                  <select
                    value={componentConfigModal.currentData.categoryKey || 'all'}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, categoryKey: e.target.value }
                    }))}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-green"
                  >
                    <option value="all">كافة التصنيفات</option>
                    <option value="web">تطوير المواقع والمنصات</option>
                    <option value="branding">الهوية البصرية والتصميم</option>
                    <option value="marketing">التسويق الرقمي</option>
                    <option value="video">الإنتاج المرئي</option>
                  </select>
                </div>
              </div>
            )}

            {/* WHY CHOOSE US CONFIG */}
            {componentConfigModal.type === 'why_choose_us' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminInput
                    label="الشارة (Badge)"
                    value={componentConfigModal.currentData.badge || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, badge: e.target.value }
                    }))}
                  />
                  <AdminInput
                    label="الكلمة البارزة (Highlight)"
                    value={componentConfigModal.currentData.highlight || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, highlight: e.target.value }
                    }))}
                  />
                  <div className="sm:col-span-2">
                    <AdminInput
                      label="العنوان الرئيسي (Title)"
                      value={componentConfigModal.currentData.title || ''}
                      onChange={e => setComponentConfigModal(prev => ({
                        ...prev,
                        currentData: { ...prev.currentData, title: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-white block">تخصيص بطاقات المميزات الـ 4:</span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(componentConfigModal.currentData.features || [
                      { title: 'فكر إبداعي وحلول جريئة', desc: 'نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك تتصدر المشهد.' },
                      { title: 'هندسة برمجية فائقة السرعة', desc: 'نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان.' },
                      { title: 'الالتزام والموثوقية المطلقة', desc: 'نلتزم بأعلى معايير المصداقية في تسليم المشاريع ووضوح التكاليف.' },
                      { title: 'عائد استثماري حقيقي (ROI)', desc: 'كل عمل نصممه يهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري.' }
                    ]).map((feat, fIdx) => (
                      <div key={fIdx} className="p-3 bg-dark-950 rounded-2xl border border-white/10 space-y-2">
                        <label className="text-[11px] font-bold text-brand-green block">ميزة #{fIdx + 1}</label>
                        <input
                          type="text"
                          value={feat.title}
                          onChange={e => {
                            const updated = [...componentConfigModal.currentData.features];
                            updated[fIdx].title = e.target.value;
                            setComponentConfigModal(prev => ({
                              ...prev,
                              currentData: { ...prev.currentData, features: updated }
                            }));
                          }}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                          placeholder="عنوان الميزة..."
                        />
                        <textarea
                          rows={2}
                          value={feat.desc}
                          onChange={e => {
                            const updated = [...componentConfigModal.currentData.features];
                            updated[fIdx].desc = e.target.value;
                            setComponentConfigModal(prev => ({
                              ...prev,
                              currentData: { ...prev.currentData, features: updated }
                            }));
                          }}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 resize-none"
                          placeholder="شرح وتفاصيل الميزة..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ CONFIG */}
            {componentConfigModal.type === 'faq' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminInput
                    label="العنوان الرئيسي"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                  <AdminInput
                    label="الكلمة البارزة"
                    value={componentConfigModal.currentData.highlight || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, highlight: e.target.value }
                    }))}
                  />
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">الأسئلة والإجابات المنسدلة:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = componentConfigModal.currentData.items || [];
                        setComponentConfigModal(prev => ({
                          ...prev,
                          currentData: {
                            ...prev.currentData,
                            items: [...current, { q: 'سؤال جديد؟', a: 'إجابة مفصلة عن السؤال الجديد.' }]
                          }
                        }));
                      }}
                      className="px-3 py-1.5 rounded-xl bg-brand-green/10 text-brand-green text-xs font-bold hover:bg-brand-green/20"
                    >
                      + إضافة سؤال جديد
                    </button>
                  </div>

                  {(componentConfigModal.currentData.items || []).map((faqItem, fIdx) => (
                    <div key={fIdx} className="p-3 bg-dark-950 rounded-2xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">سؤال #{fIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = componentConfigModal.currentData.items.filter((_, i) => i !== fIdx);
                            setComponentConfigModal(prev => ({
                              ...prev,
                              currentData: { ...prev.currentData, items: updated }
                            }));
                          }}
                          className="text-red-400 hover:text-red-300 text-xs font-bold"
                        >
                          حذف
                        </button>
                      </div>
                      <input
                        type="text"
                        value={faqItem.q}
                        onChange={e => {
                          const updated = [...componentConfigModal.currentData.items];
                          updated[fIdx].q = e.target.value;
                          setComponentConfigModal(prev => ({
                            ...prev,
                            currentData: { ...prev.currentData, items: updated }
                          }));
                        }}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-bold"
                        placeholder="نص السؤال..."
                      />
                      <textarea
                        rows={2}
                        value={faqItem.a}
                        onChange={e => {
                          const updated = [...componentConfigModal.currentData.items];
                          updated[fIdx].a = e.target.value;
                          setComponentConfigModal(prev => ({
                            ...prev,
                            currentData: { ...prev.currentData, items: updated }
                          }));
                        }}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 resize-none"
                        placeholder="نص الإجابة..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA CONFIG */}
            {componentConfigModal.type === 'cta' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <AdminInput
                    label="عنوان البانر الرئيسي"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="الوصف الفرعي"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <AdminInput
                    label="نص الزر"
                    value={componentConfigModal.currentData.btnText || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, btnText: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <AdminInput
                    label="رابط الزر"
                    value={componentConfigModal.currentData.btnLink || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, btnLink: e.target.value }
                    }))}
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {/* RICH TEXT CONFIG */}
            {componentConfigModal.type === 'rich_text' && (
              <div className="space-y-4">
                <AdminInput
                  label="عنوان الفقرة / المقال"
                  value={componentConfigModal.currentData.title || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, title: e.target.value }
                  }))}
                />
                <AdminTextarea
                  label="المحتوى النصي (HTML / Paragraphs)"
                  value={componentConfigModal.currentData.content || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, content: e.target.value }
                  }))}
                  rows={5}
                />
              </div>
            )}

            {/* CONTACT FORM CONFIG */}
            {componentConfigModal.type === 'contact_form' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <AdminInput
                    label="عنوان الفورم"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <AdminInput
                    label="نص زر الإرسال"
                    value={componentConfigModal.currentData.btnText || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, btnText: e.target.value }
                    }))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="الوصف التوجيهي للفورم"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}

            {/* PARTNERS CONFIG */}
            {componentConfigModal.type === 'partners' && (
              <div>
                <AdminInput
                  label="نص عنوان شريط الشركاء"
                  value={componentConfigModal.currentData.title || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, title: e.target.value }
                  }))}
                />
              </div>
            )}

            {/* TESTIMONIALS & TEAM GRID CONFIG */}
            {['testimonials', 'team_grid'].includes(componentConfigModal.type) && (
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label="الشارة (Badge)"
                  value={componentConfigModal.currentData.badge || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, badge: e.target.value }
                  }))}
                />
                <AdminInput
                  label="الكلمة البارزة (Highlight)"
                  value={componentConfigModal.currentData.highlight || ''}
                  onChange={e => setComponentConfigModal(prev => ({
                    ...prev,
                    currentData: { ...prev.currentData, highlight: e.target.value }
                  }))}
                />
                <div className="sm:col-span-2">
                  <AdminInput
                    label="العنوان الرئيسي"
                    value={componentConfigModal.currentData.title || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, title: e.target.value }
                    }))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="الوصف الفرعي"
                    value={componentConfigModal.currentData.subtitle || ''}
                    onChange={e => setComponentConfigModal(prev => ({
                      ...prev,
                      currentData: { ...prev.currentData, subtitle: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}

          </div>
        </AdminModal>
      )}

      {/* 4. FULL PAGE BUILDER MODAL (WHEN EDITING OR CREATING A PAGE) */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPage ? `تعديل مكونات صفحة: ${editingPage.title}` : 'منشئ صفحة جديدة (Page Builder)'}
        subtitle="اختر ورتب وعدل نصوص وبيانات كل مكون في هذه الصفحة"
        onSubmit={handleSave}
        loading={saving}
      >
        <div className="space-y-6 text-right">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('blocks')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
                activeTab === 'blocks'
                  ? 'bg-brand-green text-dark-950 shadow-neon'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>مكونات الصفحة ({formData.blocks.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
                activeTab === 'settings'
                  ? 'bg-brand-green text-dark-950 shadow-neon'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>إعدادات الصفحة والسيو</span>
            </button>
          </div>

          {/* TAB 1: Visual Block Canvas with Full Controls */}
          {activeTab === 'blocks' && (
            <div className="space-y-6">
              
              {/* Block Library Drawer */}
              <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-brand-green" />
                    مكتبة المكونات الجاهزة للإضافة:
                  </span>
                  <span className="text-[11px] text-slate-500">انقر على أي مكون لإدراجه في الصفحة</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {BLOCK_TYPES.map((b) => {
                    const Icon = b.icon;
                    return (
                      <button
                        key={b.type}
                        type="button"
                        onClick={() => handleAddBlock(b)}
                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-brand-green/10 border border-white/5 hover:border-brand-green/30 text-right transition-all group flex items-start gap-2"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-brand-green group-hover:text-dark-950 flex items-center justify-center text-brand-green shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-white block truncate group-hover:text-brand-green">
                            {b.name.split('(')[0]}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {b.type}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Saved Components Section */}
                {customComponents && customComponents.length > 0 && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-green flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        المكونات المخصصة المحفوظة (أضف بضغطة زر):
                      </span>
                      <span className="text-[10px] text-slate-400">{customComponents.length} متاح</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {customComponents.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleAddCustomComponent(c)}
                          className="p-2.5 rounded-xl bg-brand-green/5 hover:bg-brand-green/15 border border-brand-green/20 hover:border-brand-green/40 text-right transition-all group flex items-start gap-2"
                        >
                          <div className="w-7 h-7 rounded-lg bg-brand-green/10 group-hover:bg-brand-green group-hover:text-dark-950 flex items-center justify-center text-brand-green shrink-0 transition-colors">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-xs font-bold text-white block truncate group-hover:text-brand-green">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-brand-green block truncate">
                              {c.type} {c.isGlobal ? '(عام)' : ''}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Page Blocks Canvas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">ترتيب وهيكل مكونات الصفحة (انقر لتعديل الحقول):</h4>
                  <span className="text-xs text-slate-400">{formData.blocks.length} مكونات مرتبة</span>
                </div>

                {formData.blocks.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-slate-400 text-xs">
                    لم تتم إضافة أي مكون بعد. اختر مكوناً من المكتبة أعلاه لإضافته.
                  </div>
                ) : (
                  formData.blocks.map((block, idx) => {
                    const typeDef = BLOCK_TYPES.find(t => t.type === block.type) || { 
                      name: block.name || (block.type === 'custom_component' ? 'مكون مخصص من المكتبة' : block.type), 
                      icon: block.type === 'custom_component' ? Sparkles : Layout 
                    };
                    const Icon = typeDef.icon;
                    const isExpanded = expandedBlock === idx;

                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all duration-200 ${
                          isExpanded
                            ? 'bg-dark-950 border-brand-green/40 shadow-neon'
                            : 'bg-dark-950/70 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Block Header Bar */}
                        <div 
                          onClick={() => setExpandedBlock(isExpanded ? null : idx)}
                          className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-brand-green/20 text-brand-green font-montserrat font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <Icon className="w-4 h-4 text-brand-green" />
                            <span className="text-sm font-bold text-white">
                              {typeDef.name}
                            </span>
                            <span className="text-[11px] text-slate-400 hidden sm:inline">
                              — {block.data.title || block.data.badge || 'تعديل البيانات'}
                            </span>
                          </div>

                          {/* Reorder, Toggle, and Delete Actions */}
                          <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleMoveBlockUp(idx)}
                              disabled={idx === 0}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 hover:text-white"
                              title="تحريك لأعلى"
                            >
                              <MoveUp className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMoveBlockDown(idx)}
                              disabled={idx === formData.blocks.length - 1}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 hover:text-white"
                              title="تحريك لأسفل"
                            >
                              <MoveDown className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveBlock(idx)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 mr-1"
                              title="حذف المكون"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setExpandedBlock(isExpanded ? null : idx)}
                              className="p-1.5 text-slate-400 hover:text-white"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                        </div>

                        {/* Expandable In-Depth Editor Body */}
                        {isExpanded && (
                          <div className="p-4 pt-2 border-t border-white/[0.08] space-y-4">
                            
                            {/* 0. CUSTOM SAVED COMPONENT CONTROLS */}
                            {block.type === 'custom_component' && (
                              <div className="p-4 rounded-xl bg-dark-900 border border-brand-green/30 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-brand-green text-xs flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    مكون مخصص من المكتبة: {block.name || 'مكون مخصص'}
                                  </span>
                                  <Badge variant="green" className="text-[10px]">{block.componentType || 'مخصص'}</Badge>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div className="sm:col-span-2">
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">العنوان الرئيسي للمكون</label>
                                    <input
                                      type="text"
                                      value={block.data?.title || block.data?.text || ''}
                                      onChange={e => {
                                        handleUpdateBlockData(idx, 'title', e.target.value);
                                        handleUpdateBlockData(idx, 'text', e.target.value);
                                      }}
                                      className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="عنوان أو نص المكون..."
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة أو النص المميز</label>
                                    <input
                                      type="text"
                                      value={block.data?.badge || block.data?.highlight || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                      className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="شارة المكون..."
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">نص زر الإجراء (CTA)</label>
                                    <input
                                      type="text"
                                      value={block.data?.btnText || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'btnText', e.target.value)}
                                      className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="مثال: اطلب الآن..."
                                    />
                                  </div>
                                  <div className="sm:col-span-2">
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي (Subtitle)</label>
                                    <textarea
                                      rows={2}
                                      value={block.data?.subtitle || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                      className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green resize-none"
                                      placeholder="تفاصيل المكون الإضافية..."
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 1. HERO COMPONENT CONTROLS */}
                            {block.type === 'hero' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة العلوية (Badge)</label>
                                  <input
                                    type="text"
                                    value={block.data.badge || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                    placeholder="مثال: جديد أو وكالة الإبداع"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة (Highlight)</label>
                                  <input
                                    type="text"
                                    value={block.data.highlight || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                    placeholder="الكلمة الخضراء المتوهجة..."
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">العنوان الرئيسي (Title)</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي (Subtitle)</label>
                                  <textarea
                                    rows={2}
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">نص الزر الرئيسي</label>
                                  <input
                                    type="text"
                                    value={block.data.ctaText || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'ctaText', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">رابط الزر الرئيسي</label>
                                  <input
                                    type="text"
                                    value={block.data.ctaLink || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'ctaLink', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green dir-ltr"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">نص الزر الثانوي</label>
                                  <input
                                    type="text"
                                    value={block.data.secondaryCtaText || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'secondaryCtaText', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">رابط الزر الثانوي</label>
                                  <input
                                    type="text"
                                    value={block.data.secondaryCtaLink || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'secondaryCtaLink', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green dir-ltr"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 2. STATS COMPONENT CONTROLS */}
                            {block.type === 'stats' && (
                              <div className="space-y-3">
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">عنوان القسم (اختياري)</label>
                                    <input
                                      type="text"
                                      value={block.data.title || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي (اختياري)</label>
                                    <input
                                      type="text"
                                      value={block.data.subtitle || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                    />
                                  </div>
                                </div>

                                <div className="p-3 bg-dark-900 rounded-xl border border-white/5 space-y-2">
                                  <span className="text-xs font-bold text-slate-300 block mb-2">القيم والعدادات الإحصائية (4 عدادات):</span>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {(block.data.customStats || [
                                      { value: '+120', label: 'مشروع منجز' },
                                      { value: '+50', label: 'عميل يثق بنا' },
                                      { value: '99%', label: 'نسبة رضا العملاء' },
                                      { value: '+5', label: 'سنوات من الخبرة' }
                                    ]).map((stat, sIdx) => (
                                      <div key={sIdx} className="space-y-1">
                                        <input
                                          type="text"
                                          value={stat.value}
                                          onChange={e => {
                                            const updated = [...(block.data.customStats || [
                                              { value: '+120', label: 'مشروع منجز' },
                                              { value: '+50', label: 'عميل يثق بنا' },
                                              { value: '99%', label: 'نسبة رضا العملاء' },
                                              { value: '+5', label: 'سنوات من الخبرة' }
                                            ])];
                                            updated[sIdx].value = e.target.value;
                                            handleUpdateBlockData(idx, 'customStats', updated);
                                          }}
                                          className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1 text-xs text-brand-green font-montserrat font-bold text-center"
                                          placeholder="القيمة"
                                        />
                                        <input
                                          type="text"
                                          value={stat.label}
                                          onChange={e => {
                                            const updated = [...(block.data.customStats || [
                                              { value: '+120', label: 'مشروع منجز' },
                                              { value: '+50', label: 'عميل يثق بنا' },
                                              { value: '99%', label: 'نسبة رضا العملاء' },
                                              { value: '+5', label: 'سنوات من الخبرة' }
                                            ])];
                                            updated[sIdx].label = e.target.value;
                                            handleUpdateBlockData(idx, 'customStats', updated);
                                          }}
                                          className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-300 text-center"
                                          placeholder="التسمية"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 3. SERVICES GRID CONTROLS */}
                            {block.type === 'services_grid' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة (Badge)</label>
                                  <input
                                    type="text"
                                    value={block.data.badge || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة (Highlight)</label>
                                  <input
                                    type="text"
                                    value={block.data.highlight || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">عنوان القسم (Title)</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي (Subtitle)</label>
                                  <input
                                    type="text"
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 4. FEATURED PROJECTS CONTROLS */}
                            {block.type === 'featured_projects' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة (Badge)</label>
                                  <input
                                    type="text"
                                    value={block.data.badge || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة (Highlight)</label>
                                  <input
                                    type="text"
                                    value={block.data.highlight || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">عنوان القسم (Title)</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي (Subtitle)</label>
                                  <input
                                    type="text"
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">عدد المشاريع المعروضة</label>
                                  <select
                                    value={block.data.limit || 4}
                                    onChange={e => handleUpdateBlockData(idx, 'limit', parseInt(e.target.value))}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  >
                                    <option value={2}>مشروعين (2)</option>
                                    <option value={4}>4 مشاريع</option>
                                    <option value={6}>6 مشاريع</option>
                                    <option value={8}>8 مشاريع (الكل)</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">تصفية حسب التصنيف</label>
                                  <select
                                    value={block.data.categoryKey || 'all'}
                                    onChange={e => handleUpdateBlockData(idx, 'categoryKey', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  >
                                    <option value="all">كافة التصنيفات</option>
                                    <option value="web">تطوير المواقع والمنصات</option>
                                    <option value="branding">الهوية البصرية والتصميم</option>
                                    <option value="marketing">التسويق الرقمي</option>
                                    <option value="video">الإنتاج المرئي</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {/* 5. WHY CHOOSE US CONTROLS */}
                            {block.type === 'why_choose_us' && (
                              <div className="space-y-3">
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة</label>
                                    <input
                                      type="text"
                                      value={block.data.badge || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة</label>
                                    <input
                                      type="text"
                                      value={block.data.highlight || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                    />
                                  </div>
                                  <div className="sm:col-span-2">
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">العنوان الرئيسي</label>
                                    <input
                                      type="text"
                                      value={block.data.title || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-white/5">
                                  <span className="text-xs font-bold text-slate-300 block">بطاقات المميزات الـ 4:</span>
                                  <div className="grid sm:grid-cols-2 gap-2">
                                    {(block.data.features || [
                                      { title: 'فكر إبداعي وحلول جريئة', desc: 'نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك تتصدر المشهد.' },
                                      { title: 'هندسة برمجية فائقة السرعة', desc: 'نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان.' },
                                      { title: 'الالتزام والموثوقية المطلقة', desc: 'نلتزم بأعلى معايير المصداقية في تسليم المشاريع ووضوح التكاليف.' },
                                      { title: 'عائد استثماري حقيقي (ROI)', desc: 'كل عمل نصممه يهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري.' }
                                    ]).map((feat, fIdx) => (
                                      <div key={fIdx} className="p-2.5 bg-dark-900 rounded-xl border border-white/5 space-y-1">
                                        <input
                                          type="text"
                                          value={feat.title}
                                          onChange={e => {
                                            const updated = [...(block.data.features || [
                                              { title: 'فكر إبداعي وحلول جريئة', desc: 'نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك تتصدر المشهد.' },
                                              { title: 'هندسة برمجية فائقة السرعة', desc: 'نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان.' },
                                              { title: 'الالتزام والموثوقية المطلقة', desc: 'نلتزم بأعلى معايير المصداقية في تسليم المشاريع ووضوح التكاليف.' },
                                              { title: 'عائد استثماري حقيقي (ROI)', desc: 'كل عمل نصممه يهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري.' }
                                            ])];
                                            updated[fIdx].title = e.target.value;
                                            handleUpdateBlockData(idx, 'features', updated);
                                          }}
                                          className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1 text-xs text-white font-bold"
                                          placeholder="عنوان الميزة"
                                        />
                                        <textarea
                                          rows={2}
                                          value={feat.desc}
                                          onChange={e => {
                                            const updated = [...(block.data.features || [
                                              { title: 'فكر إبداعي وحلول جريئة', desc: 'نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك تتصدر المشهد.' },
                                              { title: 'هندسة برمجية فائقة السرعة', desc: 'نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان.' },
                                              { title: 'الالتزام والموثوقية المطلقة', desc: 'نلتزم بأعلى معايير المصداقية في تسليم المشاريع ووضوح التكاليف.' },
                                              { title: 'عائد استثماري حقيقي (ROI)', desc: 'كل عمل نصممه يهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري.' }
                                            ])];
                                            updated[fIdx].desc = e.target.value;
                                            handleUpdateBlockData(idx, 'features', updated);
                                          }}
                                          className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-300 resize-none"
                                          placeholder="شرح الميزة"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 6. TESTIMONIALS CONTROLS */}
                            {block.type === 'testimonials' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة</label>
                                  <input
                                    type="text"
                                    value={block.data.badge || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة</label>
                                  <input
                                    type="text"
                                    value={block.data.highlight || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">العنوان الرئيسي</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي</label>
                                  <input
                                    type="text"
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 7. PARTNERS CONTROLS */}
                            {block.type === 'partners' && (
                              <div>
                                <label className="text-[11px] text-slate-300 font-bold block mb-1">نص عنوان شريط الشركاء</label>
                                <input
                                  type="text"
                                  value={block.data.title || ''}
                                  onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  placeholder="نفتخر بثقة واعتمادات كبرى الشركات..."
                                />
                              </div>
                            )}

                            {/* 8. TEAM GRID CONTROLS */}
                            {block.type === 'team_grid' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الشارة</label>
                                  <input
                                    type="text"
                                    value={block.data.badge || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'badge', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة</label>
                                  <input
                                    type="text"
                                    value={block.data.highlight || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">العنوان الرئيسي</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي</label>
                                  <input
                                    type="text"
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 9. RICH TEXT CONTROLS */}
                            {block.type === 'rich_text' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">عنوان القسم (اختياري)</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">المحتوى والنصوص (HTML / Paragraphs)</label>
                                  <textarea
                                    rows={4}
                                    value={block.data.content || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'content', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green resize-none font-mono"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 10. FAQ CONTROLS */}
                            {block.type === 'faq' && (
                              <div className="space-y-3">
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">العنوان الرئيسي</label>
                                    <input
                                      type="text"
                                      value={block.data.title || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-300 font-bold block mb-1">الكلمة البارزة</label>
                                    <input
                                      type="text"
                                      value={block.data.highlight || ''}
                                      onChange={e => handleUpdateBlockData(idx, 'highlight', e.target.value)}
                                      className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-brand-green font-bold outline-none focus:border-brand-green"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-white/5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-300">الأسئلة والإجابات المنسدلة:</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const current = block.data.items || [];
                                        handleUpdateBlockData(idx, 'items', [
                                          ...current,
                                          { q: 'سؤال جديد؟', a: 'إجابة مفصلة عن السؤال الجديد.' }
                                        ]);
                                      }}
                                      className="px-2 py-1 rounded bg-brand-green/10 text-brand-green text-[11px] font-bold hover:bg-brand-green/20"
                                    >
                                      + إضافة سؤال
                                    </button>
                                  </div>

                                  {(block.data.items || []).map((faqItem, fIdx) => (
                                    <div key={fIdx} className="p-3 bg-dark-900 rounded-xl border border-white/5 space-y-1.5 relative">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-400">سؤال #{fIdx + 1}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = block.data.items.filter((_, i) => i !== fIdx);
                                            handleUpdateBlockData(idx, 'items', updated);
                                          }}
                                          className="text-red-400 hover:text-red-300 text-[10px]"
                                        >
                                          حذف
                                        </button>
                                      </div>
                                      <input
                                        type="text"
                                        value={faqItem.q}
                                        onChange={e => {
                                          const updated = [...block.data.items];
                                          updated[fIdx].q = e.target.value;
                                          handleUpdateBlockData(idx, 'items', updated);
                                        }}
                                        className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1.5 text-xs text-white font-bold"
                                        placeholder="نص السؤال..."
                                      />
                                      <textarea
                                        rows={2}
                                        value={faqItem.a}
                                        onChange={e => {
                                          const updated = [...block.data.items];
                                          updated[fIdx].a = e.target.value;
                                          handleUpdateBlockData(idx, 'items', updated);
                                        }}
                                        className="w-full bg-dark-950 border border-white/10 rounded px-2 py-1.5 text-[11px] text-slate-300 resize-none"
                                        placeholder="نص الإجابة..."
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 11. CONTACT FORM CONTROLS */}
                            {block.type === 'contact_form' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">عنوان الفورم</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">نص زر الإرسال</label>
                                  <input
                                    type="text"
                                    value={block.data.btnText || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'btnText', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف التوجيهي</label>
                                  <input
                                    type="text"
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                              </div>
                            )}

                            {/* 12. CTA BANNER CONTROLS */}
                            {block.type === 'cta' && (
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">عنوان البانر الرئيسي</label>
                                  <input
                                    type="text"
                                    value={block.data.title || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'title', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">الوصف الفرعي</label>
                                  <input
                                    type="text"
                                    value={block.data.subtitle || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'subtitle', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">نص الزر</label>
                                  <input
                                    type="text"
                                    value={block.data.btnText || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'btnText', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 font-bold block mb-1">رابط الزر</label>
                                  <input
                                    type="text"
                                    value={block.data.btnLink || ''}
                                    onChange={e => handleUpdateBlockData(idx, 'btnLink', e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-green dir-ltr"
                                  />
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    );
                  })
                )}

              </div>

            </div>
          )}

          {/* TAB 2: Page Settings & SEO */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              
              <AdminInput
                label="عنوان الصفحة"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: حلول وحزم نمو المتاجر الإلكترونية"
                required
              />

              <AdminInput
                label="الرابط المخصص (Slug)"
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                placeholder="ecommerce-growth-solutions"
                helpText="سيكون رابط الصفحة المباشر هو: /اسم-الرابط أو /p/اسم-الرابط"
                dir="ltr"
                required
              />

              <AdminTextarea
                label="وصف السيو ومحركات البحث (SEO Description)"
                value={formData.seoDescription}
                onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="وصف مختصر ودقيق يظهر في نتائج بحث Google ومشاركات وسائل التواصل..."
                rows={3}
              />

              {/* Publishing Status / Archival / Scheduling */}
              <AdminPublishStatusPicker
                status={formData.status}
                onChangeStatus={(s) => setFormData({ ...formData, status: s, isPublished: s === 'published' })}
                scheduledAt={formData.scheduledAt}
                onChangeScheduledAt={(dt) => setFormData({ ...formData, scheduledAt: dt })}
                label="حالة نشر وظهور الصفحة"
              />

            </div>
          )}

        </div>
      </AdminModal>

      {/* 5. DELETE CONFIRMATION DIALOG */}
      {deleteConfirm && (
        <AdminModal
          isOpen={true}
          onClose={() => setDeleteConfirm(null)}
          title="تأكيد حذف الصفحة"
          subtitle="هل أنت متأكد من رغبتك في حذف هذه الصفحة بالكامل؟"
          onSubmit={() => handleDelete(deleteConfirm)}
        >
          <p className="text-sm text-slate-300 text-right">
            سيتم حذف الصفحة المخصصة ومكوناتها نهائياً من قاعدة البيانات. لا يمكن التراجع عن هذا الإجراء.
          </p>
        </AdminModal>
      )}

    </div>
  );
}
