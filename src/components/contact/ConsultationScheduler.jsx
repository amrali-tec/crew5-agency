import React, { useState } from 'react';
import { 
  Calendar, Clock, Video, CheckCircle2, User, Phone, 
  Mail, Building2, MessageSquare, ArrowLeft, ArrowRight,
  ExternalLink, Sparkles, ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import Badge from '../ui/Badge';

const TOPICS = [
  { 
    id: 'digital_trans', 
    title: 'استشارة التحول الرقمي وأتمتة الأعمال', 
    titleEn: 'Digital Transformation & Automation',
    desc: 'دراسة البنية التحتية والربط السحابي والحلول التقنية',
    descEn: 'Cloud architecture, integration, and systems design'
  },
  { 
    id: 'marketing_growth', 
    title: 'استشارة التسويق الرقمي ومضاعفة المبيعات', 
    titleEn: 'Performance Marketing & Scaling',
    desc: 'تحليل قنوات الإعلانات ومسار الشراء وخطة النمو',
    descEn: 'Paid ads audit, conversion funnels, and ROI strategy'
  },
  { 
    id: 'branding_identity', 
    title: 'استشارة بناء وتجديد الهوية التجارية (Rebranding)', 
    titleEn: 'Brand Architecture & Rebranding',
    desc: 'تحديد التموضع واستراتيجية العلامة البصرية',
    descEn: 'Market positioning, tone of voice, and visual identity'
  },
  { 
    id: 'ecommerce_tech', 
    title: 'استشارة المتاجر والمنصات المخصصة', 
    titleEn: 'E-Commerce Platforms & Custom Dev',
    desc: 'اختيار المنصة المناسبة وبوابات الدفع وتجربة العميل',
    descEn: 'Stack selection, payment gateways, and UX optimization'
  }
];

const TIME_SLOTS_AR = [
  '10:00 ص', '11:30 ص', '01:00 م', 
  '03:30 م', '05:00 م', '07:30 م', '09:00 م'
];

const TIME_SLOTS_EN = [
  '10:00 AM', '11:30 AM', '01:00 PM', 
  '03:30 PM', '05:00 PM', '07:30 PM', '09:00 PM'
];

export default function ConsultationScheduler({ onSuccess }) {
  const { language, t, isRTL } = useLanguage();

  // Generate next 6 available business days
  const upcomingDays = React.useMemo(() => {
    const days = [];
    const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const englishDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const englishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 1; i <= 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: language === 'en' ? englishDays[d.getDay()] : arabicDays[d.getDay()],
        dayNum: d.getDate(),
        monthName: language === 'en' ? englishMonths[d.getMonth()] : arabicMonths[d.getMonth()]
      });
    }
    return days;
  }, [language]);

  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].id);
  const [selectedDate, setSelectedDate] = useState(upcomingDays[0].fullDate);
  const [selectedTime, setSelectedTime] = useState(language === 'en' ? TIME_SLOTS_EN[1] : TIME_SLOTS_AR[1]);
  
  // Form Info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const currentTopicObj = TOPICS.find(tp => tp.id === selectedTopic) || TOPICS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(language === 'en' ? 'Please enter name and phone number' : 'يرجى إدخال الاسم ورقم الجوال');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        phone,
        email,
        company,
        topic: language === 'en' ? currentTopicObj.titleEn : currentTopicObj.title,
        date: selectedDate,
        timeSlot: selectedTime,
        notes
      };

      const res = await api.bookConsultation(payload);
      if (res.success) {
        setConfirmedBooking({
          ...payload,
          id: res.data?.id || Date.now()
        });
        if (onSuccess) onSuccess(res.data);
      } else {
        alert(language === 'en' ? 'Error booking consultation' : 'حدث خطأ أثناء حجز الاستشارة');
      }
    } catch (err) {
      alert(language === 'en' ? 'Error booking consultation' : 'حدث خطأ أثناء حجز الاستشارة');
    } finally {
      setLoading(false);
    }
  };

  if (confirmedBooking) {
    const selectedDayObj = upcomingDays.find(d => d.fullDate === confirmedBooking.date) || upcomingDays[0];
    
    return (
      <div className="p-8 rounded-3xl bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900 border-2 border-brand-green/40 shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto shadow-neon">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="green">{language === 'en' ? 'Booking Confirmed' : 'تم تأكيد الحجز المبدئي بنجاح'}</Badge>
          <h3 className="text-2xl font-bold text-white">
            {language === 'en' ? 'Consultation Confirmed!' : 'تم حجز جلستك الاستشارية بنجاح!'}
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            {language === 'en'
              ? `Thank you ${confirmedBooking.name}. A Google Meet invitation and confirmation will be sent to WhatsApp.`
              : `شكراً لك ${confirmedBooking.name}. تم إدراج موعدك في جدول مستشارينا وسيصلك رابط الاجتماع (Google Meet) وتأكيد الموعد عبر الواتساب.`}
          </p>
        </div>

        {/* Appointment Card */}
        <div className="p-6 rounded-2xl bg-dark-950 border border-brand-green/30 max-w-md mx-auto text-center space-y-3">
          <div className="text-xs text-brand-green font-bold flex items-center justify-center gap-1.5">
            <Video className="w-4 h-4" />
            <span>{language === 'en' ? 'Virtual Meeting (Google Meet)' : 'جلسة مرئية عن بعد (Google Meet)'}</span>
          </div>

          <div className="text-lg font-black text-white font-mono">
            {selectedDayObj.dayName}، {selectedDayObj.dayNum} {selectedDayObj.monthName} • {confirmedBooking.timeSlot}
          </div>

          <div className="text-xs text-slate-400 border-t border-white/5 pt-2">
            {language === 'en' ? 'Topic: ' : 'موضوع الجلسة: '}<strong>{confirmedBooking.topic}</strong>
          </div>
        </div>

        <button
          onClick={() => setConfirmedBooking(null)}
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          {language === 'en' ? 'Book Another Session' : 'حجز موعد إضافي آخر'}
        </button>
      </div>
    );
  }

  const timeSlots = language === 'en' ? TIME_SLOTS_EN : TIME_SLOTS_AR;

  return (
    <div className={`p-6 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-brand-green" />
          <Badge variant="green">{language === 'en' ? 'Free 30-Min Strategy Session' : 'جلسة استشارية مجانية 30 دقيقة'}</Badge>
        </div>
        <h3 className="text-2xl font-black text-white">
          {t('contact.consultationTitle')}
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-1">
          {t('contact.consultationSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TOPIC SELECTOR */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 block">{t('contact.consultationTopic')}</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPICS.map((tp) => {
              const isSelected = selectedTopic === tp.id;
              return (
                <div
                  key={tp.id}
                  onClick={() => setSelectedTopic(tp.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-green/15 border-brand-green text-white shadow-neon'
                      : 'bg-dark-950 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <h5 className="font-bold text-xs sm:text-sm text-white mb-1">
                    {language === 'en' ? tp.titleEn : tp.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {language === 'en' ? tp.descEn : tp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* DATE SELECTOR */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 block">{t('contact.consultationDate')}</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {upcomingDays.map((day) => {
              const isSelected = selectedDate === day.fullDate;
              return (
                <div
                  key={day.fullDate}
                  onClick={() => setSelectedDate(day.fullDate)}
                  className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-green text-dark-950 border-brand-green font-bold shadow-neon'
                      : 'bg-dark-950 border-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span className="text-[11px] block opacity-80">{day.dayName}</span>
                  <span className="text-lg font-black block font-mono">{day.dayNum}</span>
                  <span className="text-[10px] block opacity-70">{day.monthName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIME SLOT SELECTOR */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 block">{t('contact.consultationTime')}</label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-brand-green text-dark-950 shadow-neon'
                      : 'bg-dark-950 text-slate-300 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* CLIENT DETAILS */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">{t('contact.fullName')} *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('contact.namePlaceholder')}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
              />
            </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">{t('contact.phone')} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('contact.phonePlaceholder')}
                  className={`w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green dir-ltr ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">{t('contact.email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('contact.emailPlaceholder')}
                  className={`w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green dir-ltr ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">{language === 'en' ? 'Company Name' : 'اسم الشركة أو النشاط'}</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={language === 'en' ? 'Brand name (optional)' : 'اسم شركتك أو متجرك'}
                className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-brand-green hover:bg-[#00c965] text-dark-950 font-bold text-sm flex items-center justify-center gap-2 shadow-neon transition-all cursor-pointer disabled:opacity-50"
        >
          <Calendar className="w-4 h-4" />
          <span>{loading ? t('common.sending') : t('contact.confirmBookingBtn')}</span>
        </button>

      </form>
    </div>
  );
}
