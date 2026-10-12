import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, ArrowUpLeft, Sparkles, CheckCircle2, 
  Send, ChevronDown, Eye, Star, Layers, ShieldCheck, Zap, Users,
  Award, Rocket, HeartHandshake, Cpu, BarChart3, HelpCircle, Building2
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useData } from '../../context/DataContext';
import { api } from '../../services/api';
import PartnersSection from '../home/PartnersSection';
import CustomComponentRenderer from './CustomComponentRenderer';

export default function BlockRenderer({ block }) {
  const { type, data = {}, componentId, componentType } = block;
  const { projects, services, team, testimonials, settings, customComponents = [] } = useData();

  switch (type) {
    // Custom Saved Component Injected Block
    case 'custom_component':
    case 'reusable_block': {
      // Find in customComponents if referenced by ID, otherwise use embedded block data
      const matchedComp = componentId 
        ? customComponents.find(c => c.id == componentId)
        : null;
      
      const compToRender = matchedComp || {
        type: componentType || data.componentType || 'promo_banner',
        name: block.name || 'مكون مخصص',
        data: data || {},
        isEnabled: true
      };

      return <CustomComponentRenderer component={compToRender} />;
    }
    // 1. Dynamic Hero Block
    case 'hero':
      return (
        <section className="relative pt-36 pb-20 overflow-hidden text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            {data.badge && (
              <Badge variant="green" className="py-1.5 px-4 text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 inline-block ml-1" />
                {data.badge}
              </Badge>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {data.title || 'نصنع الإبداع الرقمي'}{' '}
              {data.highlight && <span className="text-brand-green text-glow">{data.highlight}</span>}
            </h1>

            {data.subtitle && (
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {data.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {data.ctaText && (
                <Button to={data.ctaLink || '/contact'} variant="glow" size="lg">
                  {data.ctaText}
                </Button>
              )}
              {data.secondaryCtaText && (
                <Button to={data.secondaryCtaLink || '/projects'} variant="outline" size="lg">
                  {data.secondaryCtaText}
                </Button>
              )}
            </div>

            {data.imageUrl && (
              <div className="pt-8 max-w-4xl mx-auto">
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={data.imageUrl} alt={data.title} className="w-full max-h-[460px] object-cover" />
                </div>
              </div>
            )}
          </div>
        </section>
      );

    // 2. Stats Block
    case 'stats':
      const statsList = data.customStats && data.customStats.length > 0
        ? data.customStats
        : (settings.stats || [
            { value: "+120", label: "مشروع منجز" },
            { value: "+50", label: "عميل يثق بنا" },
            { value: "99%", label: "نسبة رضا العملاء" },
            { value: "+5", label: "سنوات من الخبرة" }
          ]);

      return (
        <section className="py-14 border-y border-white/[0.06] bg-dark-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {data.title && (
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
                {data.subtitle && <p className="text-xs text-slate-400">{data.subtitle}</p>}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {statsList.map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-green/30 transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-brand-green font-montserrat mb-1 text-glow">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    // 3. Services Grid Block
    case 'services_grid':
      return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={data.badge || "خدماتنا"}
            title={data.title || "حلول وخدمات إبداعية"}
            highlight={data.highlight || "شاملة لنموك"}
            subtitle={data.subtitle || "نقدم باقة متكاملة من الخدمات التسويقية والهندسية والإنتاج المرئي."}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((cat) => (
              <Card key={cat.id} className="p-8 flex flex-col justify-between group hover:border-brand-green/40 transition-all">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 shadow-neon group-hover:scale-110 transition-transform">
                    <Layers className="w-7 h-7" />
                  </div>
                  <Badge variant="green" className="mb-3">{cat.badge || 'خدمة متكاملة'}</Badge>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-brand-green transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                  
                  {cat.services && (
                    <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                      {cat.services.map((sub, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span>{sub.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <Button to="/services" variant="outline" size="sm" className="w-full justify-center">
                    تفاصيل الباقة والأسعار
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      );

    // 4. Featured Projects Grid Block
    case 'featured_projects':
      const displayProjects = projects
        .filter(p => !data.categoryKey || data.categoryKey === 'all' || p.categoryKey === data.categoryKey)
        .slice(0, data.limit || 4);

      return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={data.badge || "معرض المشاريع"}
            title={data.title || "مشاريع وقصص نجاح"}
            highlight={data.highlight || "نفتخر بصناعتها"}
            subtitle={data.subtitle || "استعرض جانباً من المشاريع التي أنجزناها بدقة واحترافية لشركائنا."}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug || p.id}`}
                className="group rounded-3xl overflow-hidden bg-dark-900 border border-white/[0.08] hover:border-brand-green/40 transition-all duration-300 shadow-lg hover:shadow-neon block"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="green">{p.category}</Badge>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{p.client}</span>
                    <span className="font-montserrat font-bold text-brand-green">{p.year}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-green transition-colors flex items-center justify-between">
                    <span>{p.title}</span>
                    <ArrowUpLeft className="w-4 h-4 text-slate-400 group-hover:text-brand-green transition-colors" />
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      );

    // 5. Why Choose Us Block
    case 'why_choose_us':
      const defaultFeatures = [
        { icon: Sparkles, title: "فكر إبداعي وحلول جريئة", desc: "نبتكر أفكاراً وتصاميم وهوية بصرية تجعل علامتك التجارية تتصدر المشهد وتأسر قلوب جمهورك." },
        { icon: Cpu, title: "هندسة برمجية فائقة السرعة", desc: "نبني منصات سحابية ومواقع تعمل بسرعة البرق وبأعلى درجات الأمان ومطابقة الـ Core Web Vitals." },
        { icon: ShieldCheck, title: "الالتزام والموثوقية المطلقة", desc: "نلتزم بأعلى معايير المصداقية في تسليم المشاريع، وضوح التكاليف، والسرية التامة لبياناتك." },
        { icon: Rocket, title: "عائد استثماري حقيقي (ROI)", desc: "كل حملة وكل سطر برمجي نصممه يهدف لمضاعفة مبيعاتك وحجوزاتك ونمو نشاطك التجاري." }
      ];

      const featuresToRender = (data.features && data.features.length > 0)
        ? data.features.map(f => ({ ...f, icon: Sparkles }))
        : defaultFeatures;

      return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={data.badge || "لماذا تختارنا"}
            title={data.title || "الريادة في صناعة الإبداع"}
            highlight={data.highlight || "والتحول الرقمي"}
            subtitle={data.subtitle || "نجمع بين التفكير الاستراتيجي والإنتاج البصري والهندسة البرمجية لنمنحك ميزة تنافسية لا تضاهى."}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresToRender.map((f, idx) => {
              const Icon = f.icon || Sparkles;
              return (
                <Card key={idx} className="p-6 text-right group hover:border-brand-green/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4 group-hover:bg-brand-green group-hover:text-dark-950 transition-colors shadow-neon">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-green transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>
      );

    // 6. Testimonials Block
    case 'testimonials':
      const displayTestimonials = testimonials.slice(0, data.limit || 3);
      return (
        <section className="py-20 bg-dark-900/40 border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge={data.badge || "آراء العملاء"}
              title={data.title || "ماذا يقول شركاء النجاح"}
              highlight={data.highlight || "عن تجربتهم معنا؟"}
              subtitle={data.subtitle || "نعتز بثقة كبرى الشركات والعملاء الذين ساهمنا في تنمية أعمالهم وتطوير حضورهم الرقمي."}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayTestimonials.map((item) => (
                <Card key={item.id} className="p-8 flex flex-col justify-between text-right">
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                      "{item.review}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover border border-brand-green/30" />
                    <div>
                      <h5 className="font-bold text-white text-sm">{item.name}</h5>
                      <span className="text-[11px] text-slate-400 block">{item.role}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    // 7. Partners Bar Block
    case 'partners':
      return (
        <PartnersSection />
      );

    // 8. Team Grid Block
    case 'team_grid':
      return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={data.badge || "فريق العمل"}
            title={data.title || "نخبة المبدعين والمطورين"}
            highlight={data.highlight || "خلف كل إنجاز"}
            subtitle={data.subtitle || "فريق متكامل يجمع بين استراتيجيي التسويق، مصممي الهويات، ومهندسي البرمجيات."}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((m) => (
              <Card key={m.id} className="p-8 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-green/40 mb-4 shadow-neon p-1 bg-dark-850">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-brand-green transition-colors">{m.name}</h4>
                <p className="text-xs text-brand-green font-semibold mb-3">{m.role}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{m.bio}</p>
                {m.skills && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-white/[0.06] w-full">
                    {m.skills.map((s, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      );

    // 9. Rich Text / Custom HTML Content Block
    case 'rich_text':
      return (
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 sm:p-12 text-right space-y-6">
            {data.title && (
              <h2 className="text-2xl sm:text-3xl font-black text-white border-b border-white/10 pb-4">
                {data.title}
              </h2>
            )}
            <div 
              className="text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base font-normal"
              dangerouslySetInnerHTML={{ __html: data.content || '<p>محتوى مخصص إضافي</p>' }}
            />
          </Card>
        </section>
      );

    // 10. Interactive FAQ Block
    case 'faq':
      return <FaqBlock data={data} />;

    // 11. Interactive Contact Form Block
    case 'contact_form':
      return <ContactFormBlock data={data} />;

    // 12. Call to Action Banner Block
    case 'cta':
      return (
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-10 sm:p-14 border-brand-green/30 bg-gradient-to-b from-dark-900 to-dark-950 text-center space-y-6 shadow-2xl">
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {data.title || "هل أنت مستعد لبدء مشروعك القادم؟"}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {data.subtitle || "تواصل معنا اليوم لتحويل فكرتك إلى تجربة رقمية استثنائية تحقق نتائج ملموسة."}
            </p>
            <div className="pt-2">
              <Button to={data.btnLink || "/contact"} variant="glow" size="lg">
                {data.btnText || "تواصل معنا الآن"}
              </Button>
            </div>
          </Card>
        </section>
      );

    default:
      return null;
  }
}

// Subcomponent: FAQ Block
function FaqBlock({ data }) {
  const [openIdx, setOpenIdx] = useState(null);
  const items = data.items || [
    { q: "ما هي المدة المتوقعة لتنفيذ وتطوير موقع إلكتروني؟", a: "تتراوح المدة عادة بين 10 إلى 25 يوم عمل حسب حجم الميزات وبوابات الدفع والتكامل المطلوب." },
    { q: "هل المنصات والمواقع متوافقة مع الهواتف الذكية والسيو؟", a: "نعم، 100% من مشاريعنا مصممة لتكون فائقة السرعة، متجاوبة ومطابقة لأحدث معايير Core Web Vitals ومحركات البحث." },
    { q: "هل توفرون لوحة تحكم لإدارة المحتوى والطلبات؟", a: "بالتأكيد، نزودك بلوحة تحكم كاملة وسهلة باللغة العربية تمكنك من تعديل النصوص، الصور، والمنتجات بسهولة." }
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge={data.badge || "الأسئلة الشائعة"}
        title={data.title || "إجابات على أكثر"}
        highlight={data.highlight || "الاستفسارات شيوعاً"}
        subtitle={data.subtitle || "كل ما ترغب بمعرفته حول آليات العمل والتعاقد والتنفيذ."}
      />
      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Card key={idx} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-base text-white hover:text-brand-green transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-brand-green transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-4 text-right">
                  {item.a}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

// Subcomponent: Contact Form Block
function ContactFormBlock({ data }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.sendMessage(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('حدث خطأ أثناء الإرسال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="p-8 sm:p-10 border-brand-green/30 text-right">
        <h3 className="text-2xl font-black text-white mb-2">
          {data.title || "تواصل معنا مباشرة"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          {data.subtitle || "أرسل تفاصيل مشروعك وسيقوم فريقنا بالتواصل معك في غضون ساعات قليلة."}
        </p>

        {sent ? (
          <div className="p-6 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-center text-brand-green font-bold">
            تم استلام رسالتك بنجاح! سيتواصل معك أحد مستشارينا في أقرب وقت.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1.5 font-bold">الاسم الكامل *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: صالح القحطاني"
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-green outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1.5 font-bold">البريد الإلكتروني *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-green outline-none text-left"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-bold">رقم الجوال أو الواتساب</label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+966 50 123 4567"
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-green outline-none text-left"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-bold">تفاصيل طلبك أو فكرة مشروعك *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="اكتب نبذة عن أهدافك والخدمات التي تحتاج إليها..."
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-green outline-none resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              className="w-full justify-center"
              loading={loading}
              icon={Send}
              iconPosition="right"
            >
              {data.btnText || "إرسال الطلب الآن"}
            </Button>
          </form>
        )}
      </Card>
    </section>
  );
}
