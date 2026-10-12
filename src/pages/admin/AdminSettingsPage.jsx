import React, { useState, useEffect } from 'react';
import { Save, Check, KeyRound, Globe, Phone, Mail, MapPin, Send, Building2, Shield } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminInput from '../../components/admin/ui/AdminInput';
import AdminTextarea from '../../components/admin/ui/AdminTextarea';

export default function AdminSettingsPage() {
  const { settings, refreshAllData } = useData();
  const { language, t, isRTL } = useLanguage();

  const [form, setForm] = useState({
    name: 'Crew5 Agency',
    tagline: 'نصنع الإبداع والنمو الرقمي',
    description: '',
    email: 'info@crew5.agency',
    // Saudi Branch
    phone: '+966568121909',
    phoneDisplay: '+966 56 812 1909',
    whatsapp: '+966568121909',
    whatsappDisplay: '+966 56 812 1909',
    address: 'الرياض، المملكة العربية السعودية',
    addressEn: 'Riyadh, Kingdom of Saudi Arabia',
    // Egypt Branch
    phoneEgypt: '+201094439468',
    phoneEgyptDisplay: '+20 109 443 9468',
    whatsappEgypt: '+201094439468',
    whatsappEgyptDisplay: '+20 109 443 9468',
    addressEgypt: 'مبنى 18، شارع النرجس، الحي الخامس، التجمع الخامس، القاهرة الجديدة، مصر',
    addressEgyptEn: 'Building 18, El-Narges St, 5th District, 5th Settlement, New Cairo, Egypt',
    // Social
    linkedin: '',
    instagram: '',
    twitter: '',
    facebook: '',
    // Stats
    stat1Val: '+120',
    stat1Label: 'مشروع منجز',
    stat2Val: '+50',
    stat2Label: 'عميل يثق بنا',
    stat3Val: '99%',
    stat3Label: 'نسبة رضا العملاء',
    stat4Val: '+5',
    stat4Label: 'سنوات من الخبرة',
    // Webhooks & Alerts
    webhookUrl: '',
    emailAlertsTo: 'admin@crew5.agency',
    telegramBotToken: '',
    telegramChatId: '',
    // Sales Terms & Policies
    quoteValidityDays: '14',
    depositPercent: '50',
    midPaymentPercent: '30',
    finalPaymentPercent: '20',
    revisionRounds: '3',
    warrantyDays: '60',
    salesNotes: 'تخضع كافة العروض للموافقة الفنية المتبادلة وجدول التسليم المعتمد.'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Telegram Live Testing
  const [testingTelegram, setTestingTelegram] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState({ success: null, message: '' });

  const handleTestTelegram = async () => {
    if (!form.telegramBotToken || !form.telegramChatId) {
      setTelegramStatus({
        success: false,
        message: language === 'en'
          ? 'Please enter both Telegram Bot Token and Chat ID first.'
          : 'يرجى كتابة Telegram Bot Token و Chat ID أولاً'
      });
      return;
    }
    setTestingTelegram(true);
    setTelegramStatus({ success: null, message: '' });
    try {
      const res = await api.testTelegram(form.telegramBotToken, form.telegramChatId);
      if (res.success) {
        setTelegramStatus({
          success: true,
          message: res.message || (language === 'en' ? 'Alert sent to Telegram successfully! 🎉' : 'تم إرسال التنبيه إلى تيليجرام بنجاح! 🎉')
        });
      } else {
        setTelegramStatus({
          success: false,
          message: res.message || (language === 'en' ? 'Telegram connection failed' : 'فشل الاتصال بتيليجرام')
        });
      }
    } catch (err) {
      setTelegramStatus({
        success: false,
        message: language === 'en' ? 'Server communication error' : 'حدث خطأ في الاتصال بالخادم'
      });
    } finally {
      setTestingTelegram(false);
    }
  };

  useEffect(() => {
    if (settings) {
      setForm({
        name: settings.name || 'Crew5 Agency',
        tagline: settings.tagline || 'نصنع الإبداع والنمو الرقمي',
        description: settings.description || '',
        email: settings.email || settings.contact?.email || 'info@crew5.agency',
        // Saudi
        phone: settings.phone || settings.contact?.phone || '+966568121909',
        phoneDisplay: settings.phoneDisplay || settings.contact?.phoneDisplay || '+966 56 812 1909',
        whatsapp: settings.whatsapp || settings.contact?.whatsapp || '+966568121909',
        whatsappDisplay: settings.whatsappDisplay || settings.contact?.whatsappDisplay || '+966 56 812 1909',
        address: settings.address || settings.contact?.address || 'الرياض، المملكة العربية السعودية',
        addressEn: settings.addressEn || 'Riyadh, Kingdom of Saudi Arabia',
        // Egypt
        phoneEgypt: settings.phoneEgypt || '+201094439468',
        phoneEgyptDisplay: settings.phoneEgyptDisplay || '+20 109 443 9468',
        whatsappEgypt: settings.whatsappEgypt || '+201094439468',
        whatsappEgyptDisplay: settings.whatsappEgyptDisplay || '+20 109 443 9468',
        addressEgypt: settings.addressEgypt || 'مبنى 18، شارع النرجس، الحي الخامس، التجمع الخامس، القاهرة الجديدة، مصر',
        addressEgyptEn: settings.addressEgyptEn || 'Building 18, El-Narges St, 5th District, 5th Settlement, New Cairo, Egypt',
        // Social
        linkedin: settings.socialLinks?.linkedin || '',
        instagram: settings.socialLinks?.instagram || '',
        twitter: settings.socialLinks?.twitter || '',
        facebook: settings.socialLinks?.facebook || '',
        // Stats
        stat1Val: settings.stats?.[0]?.value || '+120',
        stat1Label: settings.stats?.[0]?.label || 'مشروع منجز',
        stat2Val: settings.stats?.[1]?.value || '+50',
        stat2Label: settings.stats?.[1]?.label || 'عميل يثق بنا',
        stat3Val: settings.stats?.[2]?.value || '99%',
        stat3Label: settings.stats?.[2]?.label || 'نسبة رضا العملاء',
        stat4Val: settings.stats?.[3]?.value || '+5',
        stat4Label: settings.stats?.[3]?.label || 'سنوات من الخبرة',
        // Webhooks
        webhookUrl: settings.webhookUrl || '',
        emailAlertsTo: settings.emailAlertsTo || 'admin@crew5.agency',
        telegramBotToken: settings.telegramBotToken || '',
        telegramChatId: settings.telegramChatId || '',
        // Sales Terms
        quoteValidityDays: settings.salesTerms?.quoteValidityDays || '14',
        depositPercent: settings.salesTerms?.depositPercent || '50',
        midPaymentPercent: settings.salesTerms?.midPaymentPercent || '30',
        finalPaymentPercent: settings.salesTerms?.finalPaymentPercent || '20',
        revisionRounds: settings.salesTerms?.revisionRounds || '3',
        warrantyDays: settings.salesTerms?.warrantyDays || '60',
        salesNotes: settings.salesTerms?.salesNotes || 'تخضع كافة العروض للموافقة الفنية المتبادلة وجدول التسليم المعتمد.'
      });
    }
  }, [settings]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);

    const payload = {
      name: form.name,
      tagline: form.tagline,
      description: form.description,
      email: form.email,
      phone: form.phone,
      phoneDisplay: form.phoneDisplay,
      whatsapp: form.whatsapp,
      whatsappDisplay: form.whatsappDisplay,
      address: form.address,
      addressEn: form.addressEn,
      phoneEgypt: form.phoneEgypt,
      phoneEgyptDisplay: form.phoneEgyptDisplay,
      whatsappEgypt: form.whatsappEgypt,
      whatsappEgyptDisplay: form.whatsappEgyptDisplay,
      addressEgypt: form.addressEgypt,
      addressEgyptEn: form.addressEgyptEn,
      contact: {
        email: form.email,
        phone: form.phone,
        phoneDisplay: form.phoneDisplay,
        whatsapp: form.whatsapp,
        whatsappDisplay: form.whatsappDisplay,
        address: form.address,
        addressEgypt: form.addressEgypt
      },
      socialLinks: {
        linkedin: form.linkedin,
        instagram: form.instagram,
        twitter: form.twitter,
        facebook: form.facebook
      },
      stats: [
        { value: form.stat1Val, label: form.stat1Label },
        { value: form.stat2Val, label: form.stat2Label },
        { value: form.stat3Val, label: form.stat3Label },
        { value: form.stat4Val, label: form.stat4Label }
      ],
      webhookUrl: form.webhookUrl,
      emailAlertsTo: form.emailAlertsTo,
      telegramBotToken: form.telegramBotToken,
      telegramChatId: form.telegramChatId,
      salesTerms: {
        quoteValidityDays: form.quoteValidityDays,
        depositPercent: form.depositPercent,
        midPaymentPercent: form.midPaymentPercent,
        finalPaymentPercent: form.finalPaymentPercent,
        revisionRounds: form.revisionRounds,
        warrantyDays: form.warrantyDays,
        salesNotes: form.salesNotes
      }
    };

    try {
      await api.updateSettings(payload);
      setSettingsSuccess(true);
      refreshAllData();
      setTimeout(() => setSettingsSuccess(false), 3000);
    } catch (err) {
      alert(language === 'en' ? 'Failed to save settings' : 'فشل حفظ الإعدادات');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError(language === 'en' ? 'New passwords do not match' : 'كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError(language === 'en' ? 'Password must be at least 6 characters' : 'يجب أن لا تقل كلمة المرور عن 6 خانات');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await api.updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      if (res.success) {
        setPasswordSuccess(true);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(res.message || (language === 'en' ? 'Failed to update password' : 'فشل تحديث كلمة المرور'));
      }
    } catch (err) {
      setPasswordError(language === 'en' ? 'Current password is incorrect' : 'كلمة المرور الحالية غير صحيحة');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Unified Header */}
      <AdminPageHeader
        title={language === 'en' ? 'System & Branch Settings' : 'إعدادات النظام والفروع'}
        subtitle={language === 'en' ? 'Manage regional contact info (KSA & Egypt), statistics, socials, and admin credentials' : 'تعديل معلومات التواصل الإقليمية (السعودية ومصر)، الإحصائيات، الروابط، وتغيير كلمة مرور المشرف'}
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Main Settings Form */}
        <div className="lg:col-span-8 space-y-6">
          
          <Card className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <h3 className="text-lg font-bold text-white pb-3 border-b border-white/[0.08] flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Agency Identity' : 'معلومات الهوية والوكالة'}</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label={language === 'en' ? 'Agency Name' : 'اسم الوكالة'}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <AdminInput
                  label={language === 'en' ? 'Slogan' : 'الشعار اللفظي (Slogan)'}
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                />
              </div>

              <AdminTextarea
                label={language === 'en' ? 'Agency Bio (Footer & Hero)' : 'نبذة عن الوكالة (الظاهرة في البانر والفوتر)'}
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              {/* General Contact Email */}
              <div className="pt-2">
                <AdminInput
                  label={language === 'en' ? 'Official Inquiries Email' : 'البريد الإلكتروني الرسمي للاستفسارات'}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  dir="ltr"
                />
              </div>

              {/* Saudi Arabia Branch Box */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-brand-green/30 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-xl">🇸🇦</span>
                  <span>{language === 'en' ? 'Saudi Arabia Branch Settings (Riyadh)' : 'فرع المملكة العربية السعودية (الرياض)'}</span>
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminInput
                    label={language === 'en' ? 'Saudi Phone' : 'رقم هاتف السعودية'}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Display Phone' : 'رقم الهاتف للعرض'}
                    value={form.phoneDisplay}
                    onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })}
                    dir="ltr"
                  />
                </div>

                <AdminInput
                  label={language === 'en' ? 'Saudi Address (Arabic)' : 'عنوان فرع السعودية (بالعربية)'}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>

              {/* Egypt Branch Box */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-cyan-500/30 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-xl">🇪🇬</span>
                  <span>{language === 'en' ? 'Egypt Branch Settings (New Cairo)' : 'فرع جمهورية مصر العربية (القاهرة الجديدة)'}</span>
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminInput
                    label={language === 'en' ? 'Egypt Phone / WhatsApp' : 'رقم هاتف / واتساب مصر'}
                    value={form.phoneEgypt}
                    onChange={(e) => setForm({ ...form, phoneEgypt: e.target.value })}
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Display Phone' : 'رقم الهاتف للعرض'}
                    value={form.phoneEgyptDisplay}
                    onChange={(e) => setForm({ ...form, phoneEgyptDisplay: e.target.value })}
                    dir="ltr"
                  />
                </div>

                <AdminInput
                  label={language === 'en' ? 'Egypt Address (Arabic)' : 'عنوان فرع مصر (بالعربية)'}
                  value={form.addressEgypt}
                  onChange={(e) => setForm({ ...form, addressEgypt: e.target.value })}
                />
              </div>

              {/* Social Links */}
              <h3 className="text-lg font-bold text-white pt-4 pb-3 border-b border-white/[0.08] flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Social Media Links' : 'روابط منصات التواصل الاجتماعي'}</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <AdminInput
                  label="LinkedIn"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                  dir="ltr"
                />
                <AdminInput
                  label="Instagram"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                  dir="ltr"
                />
                <AdminInput
                  label="Twitter / X"
                  value={form.twitter}
                  onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  placeholder="https://x.com/..."
                  dir="ltr"
                />
                <AdminInput
                  label="Facebook"
                  value={form.facebook}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                  dir="ltr"
                />
              </div>

              {/* Telegram Settings */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-blue-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-sky-400" />
                    <span>{t('admin.telegramSettingsTitle')}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-bold">
                    Telegram Alerts 🤖
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminInput
                    label="Telegram Bot Token"
                    value={form.telegramBotToken}
                    onChange={(e) => setForm({ ...form, telegramBotToken: e.target.value })}
                    placeholder="123456789:ABCdefGHI..."
                    dir="ltr"
                  />
                  <AdminInput
                    label="Telegram Chat ID"
                    value={form.telegramChatId}
                    onChange={(e) => setForm({ ...form, telegramChatId: e.target.value })}
                    placeholder="-100xxxxxxxxx أو 12345678"
                    dir="ltr"
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleTestTelegram}
                    disabled={testingTelegram}
                    className="border-sky-500/40 text-sky-400 hover:bg-sky-500/10"
                  >
                    {testingTelegram ? (language === 'en' ? 'Testing...' : 'جاري الفحص...') : (language === 'en' ? 'Send Test Telegram Alert' : 'إرسال تنبيه تجريبي لتيليجرام')}
                  </Button>

                  {telegramStatus.message && (
                    <span className={`text-xs font-bold ${telegramStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {telegramStatus.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Sales Department Terms & Commercial Policy Box */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    <span>{language === 'en' ? 'Sales Department Terms & Commercial Rules' : 'شروط وضوابط قسم المبيعات والتعاقدات'}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                    Sales & Deals SLA
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AdminInput
                    label={language === 'en' ? 'Quote Validity (Days)' : 'صلاحية عروض الأسعار (بالأيام)'}
                    value={form.quoteValidityDays}
                    onChange={(e) => setForm({ ...form, quoteValidityDays: e.target.value })}
                    placeholder="14"
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Kickoff Deposit (%)' : 'نسبة الدفعة الأولى المعتمدة (%)'}
                    value={form.depositPercent}
                    onChange={(e) => setForm({ ...form, depositPercent: e.target.value })}
                    placeholder="50"
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Design Approval Payment (%)' : 'نسبة دفعة اعتماد التصاميم (%)'}
                    value={form.midPaymentPercent}
                    onChange={(e) => setForm({ ...form, midPaymentPercent: e.target.value })}
                    placeholder="30"
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Final Handover Payment (%)' : 'نسبة الدفعة الختامية (%)'}
                    value={form.finalPaymentPercent}
                    onChange={(e) => setForm({ ...form, finalPaymentPercent: e.target.value })}
                    placeholder="20"
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Included Revision Rounds' : 'عدد جولات التعديل المسموحة'}
                    value={form.revisionRounds}
                    onChange={(e) => setForm({ ...form, revisionRounds: e.target.value })}
                    placeholder="3"
                    dir="ltr"
                  />
                  <AdminInput
                    label={language === 'en' ? 'Free Warranty Period (Days)' : 'مدة الضمان والدعم المجاني (أيام)'}
                    value={form.warrantyDays}
                    onChange={(e) => setForm({ ...form, warrantyDays: e.target.value })}
                    placeholder="60"
                    dir="ltr"
                  />
                </div>

                <AdminTextarea
                  label={language === 'en' ? 'Standard Sales Terms Note (Appears on Quotes)' : 'ملاحظات وشروط عروض الأسعار (تظهر في المقترحات والاتفاقيات)'}
                  rows={2}
                  value={form.salesNotes}
                  onChange={(e) => setForm({ ...form, salesNotes: e.target.value })}
                  placeholder="تخضع كافة العروض للموافقة الفنية المتبادلة وجدول التسليم المعتمد."
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 flex items-center gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={savingSettings}
                  icon={savingSettings ? Check : Save}
                  className="shadow-neon"
                >
                  {savingSettings ? (language === 'en' ? 'Saving...' : 'جاري الحفظ...') : (language === 'en' ? 'Save All Settings' : 'حفظ كافة الإعدادات')}
                </Button>

                {settingsSuccess && (
                  <span className="text-xs font-bold text-brand-green flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>{t('common.success')}</span>
                  </span>
                )}
              </div>

            </form>
          </Card>

        </div>

        {/* Right Sidebar: Security & Password Form */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="p-6 sm:p-8 space-y-6 border-white/10">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-white/[0.08] flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? 'Admin Password' : 'تغيير كلمة مرور المشرف'}</span>
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <AdminInput
                type="password"
                label={language === 'en' ? 'Current Password' : 'كلمة المرور الحالية'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
              />

              <AdminInput
                type="password"
                label={language === 'en' ? 'New Password' : 'كلمة المرور الجديدة'}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
              />

              <AdminInput
                type="password"
                label={language === 'en' ? 'Confirm New Password' : 'تأكيد كلمة المرور الجديدة'}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
              />

              {passwordError && (
                <p className="text-xs font-bold text-rose-400">{passwordError}</p>
              )}

              {passwordSuccess && (
                <p className="text-xs font-bold text-brand-green flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>{language === 'en' ? 'Password updated successfully!' : 'تم تحديث كلمة المرور بنجاح!'}</span>
                </p>
              )}

              <Button
                type="submit"
                variant="outline"
                size="md"
                className="w-full justify-center"
                disabled={savingPassword}
              >
                {savingPassword ? (language === 'en' ? 'Updating...' : 'جاري التحديث...') : (language === 'en' ? 'Update Password' : 'تحديث كلمة المرور')}
              </Button>
            </form>
          </Card>

        </div>

      </div>

    </div>
  );
}
