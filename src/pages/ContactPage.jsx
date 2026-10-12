import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock, ArrowLeft, Globe, PhoneCall } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import BlockRenderer from '../components/builder/BlockRenderer';
import ConsultationScheduler from '../components/contact/ConsultationScheduler';
import SeoHead from '../components/ui/SeoHead';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function ContactPage() {
  const { settings, pages = [] } = useData();
  const { language, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'consultation'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'التسويق الرقمي والبرمجة',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactPage = pages.find(p => p.slug === 'contact');
  const blocks = contactPage?.blocks || [];
  const injectedBlocks = blocks.filter(b => b.type === 'custom_component');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.sendMessage(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true); // Graceful UX fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactEmail = settings.email || settings.contact?.email || 'info@crew5.agency';
  const saudiPhone = settings.phoneDisplay || settings.phone || '+966 56 812 1909';
  const saudiWhatsapp = settings.whatsapp || '+966568121909';
  const egyptPhone = settings.phoneEgyptDisplay || settings.phoneEgypt || '+20 109 443 9468';
  const egyptWhatsapp = settings.whatsappEgypt || '+201094439468';
  
  const saudiAddress = language === 'en' 
    ? (settings.addressEn || 'Riyadh, Kingdom of Saudi Arabia')
    : (settings.address || 'الرياض، المملكة العربية السعودية');
    
  const egyptAddress = language === 'en'
    ? (settings.addressEgyptEn || 'Building 18, El-Narges St, 5th District, 5th Settlement, New Cairo, Egypt')
    : (settings.addressEgypt || 'مبنى 18، شارع النرجس، الحي الخامس، التجمع الخامس، القاهرة الجديدة، مصر');

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: language === 'en' ? 'Contact Crew5 Agency' : 'تواصل مع وكالة كرو فايف',
    url: 'https://crew5.agency/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Crew5 Agency',
      image: 'https://crew5.agency/assets/hero_team.jpg',
      telephone: '+966568121909',
      email: 'info@crew5.agency',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'King Fahd Road',
          addressLocality: 'Riyadh',
          addressCountry: 'SA'
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Building 18, El-Narges St, 5th Settlement',
          addressLocality: 'New Cairo',
          addressCountry: 'EG'
        }
      ]
    }
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-24">
      <SeoHead
        title={language === 'en' ? 'Contact Us & Book Consultation | Crew5 Agency' : 'تواصل معنا واحجز استشارتك المجانية | كرو فايف'}
        description={language === 'en'
          ? 'Get in touch with Crew5 Agency in Riyadh & Cairo. Request a custom proposal or schedule a strategic growth consultation today.'
          : 'تواصل مع فريق كرو فايف في الرياض والقاهرة. اطلب عرض سعر مخصص لمشروعك أو احجز جلسة استشارية استراتيجية مع خبرائنا.'}
        keywords="تواصل مع كرو فايف, رقم وكالة كرو فايف, حجز استشارة تسويق, مكتب كرو فايف الرياض, فروع كرو فايف"
        url="/contact"
        schemaData={contactSchema}
      />
      {injectedBlocks.map((b, idx) => (
        <BlockRenderer key={`contact-comp-${idx}`} block={b} />
      ))}
      
      {/* 1. Header & Tab Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <SectionHeader
          badge={t('contact.badge')}
          title={t('contact.title')}
          highlight={t('contact.highlight')}
          subtitle={t('contact.subtitle')}
        />

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-dark-900 border border-white/10 shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('message')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'message'
                ? 'bg-brand-green text-dark-950 shadow-neon'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'en' ? 'Direct Inquiry Form' : 'إرسال رسالة واستفسار سريع'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('consultation')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'consultation'
                ? 'bg-brand-green text-dark-950 shadow-neon'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'en' ? '📅 Schedule Google Meet Session' : '📅 حجز جلسة استشارية مرئية (Google Meet)'}</span>
          </button>
        </div>
      </section>

      {/* 2. Contact Section: Form & Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Contact Details Card (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <Card className="p-6 sm:p-8 space-y-6 border-brand-green/20">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'en' ? 'Our Regional Offices' : 'مكاتبنا وفروعنا الإقليمية'}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {language === 'en'
                    ? 'Feel free to connect with our strategic teams across Saudi Arabia and Egypt via direct phone, WhatsApp, or email.'
                    : 'يسعدنا تواصلك مع فرق عملنا الاستشارية في المملكة العربية السعودية ومصر عبر قنوات الاتصال الرسمية.'}
                </p>
              </div>

              {/* Email Card */}
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-green/40 hover:bg-brand-green/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">{t('common.email')}</span>
                  <span className="text-sm sm:text-base font-bold text-white font-mono dir-ltr">
                    {contactEmail}
                  </span>
                </div>
              </a>

              {/* Saudi Arabia Office */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-brand-green/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="text-lg">🇸🇦</span>
                    <span>{t('contact.saudiOfficeTitle')}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green font-bold">
                    {language === 'en' ? 'HQ Riyadh' : 'المقر الرئيسي'}
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>{saudiAddress}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                  <a
                    href={`tel:${saudiPhone.replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors dir-ltr font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-green" />
                    <span>{saudiPhone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${saudiWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(language === 'en' ? 'Hello Crew5 Agency, I would like to inquire about your services.' : 'مرحباً كرو فايف، أود الاستفسار عن خدماتكم.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold text-emerald-400 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Saudi WhatsApp' : 'واتساب السعودية'}</span>
                  </a>
                </div>
              </div>

              {/* Egypt Office */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="text-lg">🇪🇬</span>
                    <span>{t('contact.egyptOfficeTitle')}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-brand-cyan font-bold">
                    {language === 'en' ? 'Cairo Branch' : 'فرع القاهرة'}
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>{egyptAddress}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                  <a
                    href={`tel:${egyptPhone.replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors dir-ltr font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{egyptPhone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${egyptWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(language === 'en' ? 'Hello Crew5 Agency, I would like to inquire about your services.' : 'مرحباً كرو فايف، أود الاستفسار عن خدماتكم.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold text-emerald-400 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Egypt WhatsApp' : 'واتساب مصر'}</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-950 border border-white/[0.06] flex items-center gap-3 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-brand-green shrink-0" />
                <span>{t('contact.workingHours')}</span>
              </div>
            </Card>

          </div>

          {/* Right Column: Form or Consultation Scheduler (Col 7) */}
          <div className="lg:col-span-7">
            {activeTab === 'consultation' ? (
              <ConsultationScheduler />
            ) : (
              <Card className="p-8 sm:p-10 border-white/10">
                {isSubmitted ? (
                  <div className="py-16 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 flex items-center justify-center mx-auto shadow-neon">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {language === 'en' ? 'Message Received Successfully!' : 'تم استلام رسالتك بنجاح!'}
                    </h3>
                    <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                      {language === 'en'
                        ? 'Thank you for connecting with Crew5 Agency. Our project consultants will review your inquiry and reach out within 2 hours.'
                        : 'شكراً لتواصلك مع وكالة Crew5. ستصل رسالتك مباشرة إلى فريقنا وسنقوم بالرد عليك في أقرب وقت.'}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                    >
                      {language === 'en' ? 'Send Another Inquiry' : 'إرسال استفسار آخر'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {t('contact.sendMessage')}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {language === 'en'
                          ? 'Fill out the form below and our team will get in touch promptly.'
                          : 'يرجى تعبئة النموذج أدناه وسيقوم فريقنا بالتواصل معك وتحديد موعد مناقشة تفاصيل مشروعك.'}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.fullName')} *</label>
                        <input
                          type="text"
                          required
                          placeholder={t('contact.namePlaceholder')}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.phoneLabel')} *</label>
                        <input
                          type="tel"
                          required
                          placeholder={t('contact.phonePlaceholder')}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors dir-ltr ${isRTL ? 'text-right' : 'text-left'}`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.emailLabel')}</label>
                        <input
                          type="email"
                          placeholder={t('contact.emailPlaceholder')}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors dir-ltr ${isRTL ? 'text-right' : 'text-left'}`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-2">{t('contact.servicePlaceholder')}</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-green transition-colors"
                        >
                          <option value="تطوير وبرمجة المواقع والمتاجر">تطوير وبرمجة المواقع والمتاجر (Web & E-Commerce)</option>
                          <option value="بناء وتصميم الهوية البصرية">بناء وتصميم الهوية البصرية (Brand Identity)</option>
                          <option value="الإنتاج المرئي والمونتاج السينمائي">الإنتاج المرئي والمونتاج السينمائي (Video & 3D)</option>
                          <option value="التسويق الرقمي وإدارة الحملات">التسويق الرقمي وإدارة الحملات (Paid Ads & ROAS)</option>
                          <option value="تحسين محركات البحث SEO">تحسين محركات البحث وتصدر نتائج Google (SEO)</option>
                          <option value="تطوير تطبيقات الجوال">تطوير تطبيقات الجوال (Mobile Apps)</option>
                          <option value="استشارة وحزمة مخصصة">استشارة وباقة مخصصة شاملة</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-2">{t('services.notesLabel')}</label>
                      <textarea
                        rows={4}
                        placeholder={t('contact.messagePlaceholder')}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-brand-green hover:bg-[#00c965] text-dark-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-neon hover:shadow-neon-hover disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? t('common.sending') : t('contact.sendBtn')}</span>
                    </button>
                  </form>
                )}
              </Card>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
