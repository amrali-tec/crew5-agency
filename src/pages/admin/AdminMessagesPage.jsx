import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Check, Trash2, Clock, CheckCircle2, Briefcase, FileText, DollarSign, ShieldCheck, X } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ConfirmModal from '../../components/admin/ConfirmModal';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader';
import AdminModal from '../../components/admin/ui/AdminModal';

export default function AdminMessagesPage() {
  const { messages = [], refreshAllData } = useData();
  const { language, isRTL } = useLanguage();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isSalesGuideOpen, setIsSalesGuideOpen] = useState(false);

  const safeMessages = Array.isArray(messages) ? messages : [];

  const handleMarkAsRead = async (msg) => {
    try {
      await api.updateMessageStatus(msg.id, 'read');
      refreshAllData();
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
    } catch (err) {
      alert(language === 'en' ? 'Failed to update status' : 'فشل تحديث حالة الرسالة');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteMessage(deleteId);
      setDeleteId(null);
      if (selectedMessage?.id === deleteId) {
        setSelectedMessage(null);
      }
      refreshAllData();
    } catch (err) {
      alert(language === 'en' ? 'Failed to delete message' : 'فشل حذف الرسالة');
    }
  };

  const unreadCount = safeMessages.filter(m => m && m.status === 'new').length;

  return (
    <div className="space-y-6">
      
      {/* Unified Header */}
      <AdminPageHeader
        title={language === 'en' ? 'Inbound Inquiries & Leads Inbox' : 'صندوق الرسائل واستفسارات العملاء'}
        subtitle={language === 'en' ? 'Track, review, and follow up with client leads submitted through website forms' : 'متابعة والرد على رسائل الزوار المرسلة عبر نموذج الاتصال'}
      >
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSalesGuideOpen(true)}
            icon={Briefcase}
            className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
          >
            {language === 'en' ? 'Sales Guide & Rules' : 'دليل وشروط المبيعات'}
          </Button>

          <span className="px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green font-bold text-xs">
            {unreadCount} {language === 'en' ? 'new inquiries' : 'رسائل جديدة'}
          </span>
        </div>
      </AdminPageHeader>

      {/* Messages List & Details View */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* List of Messages */}
        <div className="lg:col-span-5 space-y-3">
          {safeMessages.length === 0 ? (
            <Card className="p-12 text-center text-slate-400">
              <Mail className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm">{language === 'en' ? 'No inbound messages recorded yet.' : 'لا توجد رسائل واردة حتى الآن.'}</p>
            </Card>
          ) : (
            safeMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              const isNew = msg.status === 'new';

              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (isNew) handleMarkAsRead(msg);
                  }}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer ${isRTL ? 'text-right' : 'text-left'} relative
                    ${isSelected
                      ? 'bg-dark-850 border-brand-green/50 shadow-neon'
                      : isNew
                      ? 'bg-dark-900 border-brand-green/30'
                      : 'bg-dark-900/60 border-white/[0.06] hover:border-white/20'
                    }
                  `}
                >
                  {isNew && (
                    <span className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse`}></span>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-white text-sm">{msg.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA') : (language === 'en' ? 'Just now' : 'الآن')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={isNew ? 'green' : 'slate'} className="text-[10px] py-0.5">
                      {msg.service || (language === 'en' ? 'General Inquiry' : 'استفسار عام')}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Message Detail Box */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <Card className={`p-6 sm:p-8 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedMessage.name}</h3>
                    {selectedMessage.status === 'new' ? (
                      <Badge variant="green">{language === 'en' ? 'New' : 'جديدة'}</Badge>
                    ) : (
                      <Badge variant="slate">{language === 'en' ? 'Read' : 'تمت القراءة'}</Badge>
                    )}
                  </div>
                  <span className="text-xs text-brand-green font-semibold mt-1 block">
                    {language === 'en' ? 'Requested Service:' : 'الخدمة المطلوبة:'} {selectedMessage.service || (language === 'en' ? 'General' : 'عام')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteId(selectedMessage.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
                    title={language === 'en' ? 'Delete message' : 'حذف الرسالة'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info Pills */}
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedMessage.email && (
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/40 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-400 block">{language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</span>
                      <span className="text-xs font-semibold text-white truncate block dir-ltr">{selectedMessage.email}</span>
                    </div>
                  </a>
                )}

                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#25D366]/40 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-400 block">{language === 'en' ? 'WhatsApp Direct' : 'رقم الجوال (واتساب)'}</span>
                      <span className="text-xs font-semibold text-white truncate block dir-ltr">{selectedMessage.phone}</span>
                    </div>
                  </a>
                )}
              </div>

              {/* Message Content */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-400 block">{language === 'en' ? 'Message Content:' : 'نص الرسالة والطلب:'}</label>
                <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

            </Card>
          ) : (
            <Card className="p-16 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <h4 className="font-bold text-white mb-1">{language === 'en' ? 'Select a message to view details' : 'اختر رسالة من القائمة لعرض التفاصيل'}</h4>
              <p className="text-xs text-slate-500">{language === 'en' ? 'Click on any item on the left to read full inquiry' : 'اضغط على أي عنصر على اليمين لقراءة تفاصيل الطلب والرد عليه مباشرة.'}</p>
            </Card>
          )}
        </div>

      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title={language === 'en' ? 'Confirm Lead Deletion' : 'تأكيد حذف الرسالة'}
        message={language === 'en' ? 'Are you sure you want to permanently delete this lead inquiry?' : 'هل أنت متأكد من رغبتك في حذف هذه الرسالة نهائياً؟'}
        confirmText={language === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
        cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Sales Guidelines Quick Modal */}
      {isSalesGuideOpen && (
        <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-6 sm:p-8 bg-dark-900 border-amber-500/40 shadow-2xl relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 sticky top-0 bg-dark-900 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'Sales Representative Guide & Terms' : 'دليل وشروط مسؤول المبيعات'}
                  </h3>
                  <span className="text-[11px] text-amber-400 font-mono">SLA & Deal Protocols</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSalesGuideOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs mt-6">
              <div className="p-4 rounded-xl bg-dark-950 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                  <span>{language === 'en' ? 'Payment Milestones:' : 'جدول الدفعات المعتمد:'}</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  • <strong>50% دفعة أولى:</strong> قبل بدء أي مرحلة عمل أو حجز الفريق.<br />
                  • <strong>30% دفعة مرحلية:</strong> بعد اعتماد التصاميم والواجهات والشعار.<br />
                  • <strong>20% دفعة ختامية:</strong> قبل إطلاق الموقع على الرابط النهائي أو تسليم ملفات المصدر.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2 text-sky-400">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'en' ? 'Response Time SLA:' : 'معايير سرعة الاستجابة:'}</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  • التواصل مع طلبات حاسبة التكلفة ونماذج الاتصال خلال <strong>15–30 دقيقة</strong> كحد أقصى.<br />
                  • إرسال العروض المالية والفنية الرسمية للعميل خلال <strong>24 ساعة</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'en' ? 'Discount & Pricing Rules:' : 'ضوابط الخصومات والتسعير:'}</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  • الحد الأقصى للخصم المسموح لمسؤول المبيعات: <strong>5%</strong>.<br />
                  • الحد الأقصى لمدير المبيعات: <strong>15%</strong> للمشاريع الكبيرة والتعاقدات السنوية.<br />
                  • عروض الأسعار صالحة لمدة <strong>14 يوم عمل</strong> من تاريخ الإرسال.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-green/10 border border-brand-green/30 text-slate-200">
                <span className="font-bold text-brand-green block mb-1">
                  {language === 'en' ? 'Free Warranty Guarantee:' : 'الضمان والدعم الفني المجاني:'}
                </span>
                <p className="leading-relaxed">
                  جميع المشاريع تتضمن <strong>3 جولات تعديل معتمدة</strong>، وضمان دعم فني مجاني لمدة <strong>30–90 يوماً</strong> بعد التسليم النهائي.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-right">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setIsSalesGuideOpen(false)}
              >
                {language === 'en' ? 'Close Guide' : 'إغلاق الدليل'}
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
