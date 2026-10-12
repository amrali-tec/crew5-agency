import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import SeoHead from '../components/ui/SeoHead';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { language, isRTL } = useLanguage();

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-12">
      <SeoHead
        title={language === 'en' ? 'Privacy Policy & Data Security | Crew5 Agency' : 'سياسة الخصوصية وحماية البيانات | كرو فايف'}
        description={language === 'en'
          ? 'Official Privacy Policy and Data Protection standards of Crew5 Agency. Protecting your brand confidentiality and project assets.'
          : 'سياسة الخصوصية الرسمية ومعايير حماية وأمان البيانات وسرية المعلومات المتبعة في وكالة كرو فايف.'}
        url="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge={language === 'en' ? 'Privacy & Security' : 'الخصوصية والأمان'}
          title={language === 'en' ? 'Our Official' : 'سياسة'}
          highlight={language === 'en' ? 'Privacy Policy' : 'الخصوصية'}
          subtitle={language === 'en'
            ? 'Updated: January 2026 — We strictly safeguard your data, business confidentialities, and project assets with rigorous security protocols.'
            : 'آخر تحديث: يناير 2026 - نلتزم بحماية خصوصيتك وسرية بياناتك ومعلومات مشاريعك بأعلى درجات الأمان.'}
        />

        <Card className={`p-8 sm:p-12 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base border-white/10 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '1. Introduction & Privacy Commitment' : '1. مقدمة والتزامنا بالخصوصية'}</span>
            </h3>
            <p>
              {language === 'en'
                ? 'The privacy of our clients and partners at Crew5 Agency is of paramount importance. This document details the nature of information we collect, how it is secured, and how it is utilized to deliver high-quality digital services.'
                : 'تعتبر خصوصية عملائنا وزوار موقعنا الإلكتروني (Crew5 Agency) ذات أهمية بالغة بالنسبة لنا. توضح هذه الوثيقة ماهية المعلومات التي نقوم بجمعها، وكيفية استخدامها وحمايتها عند استخدامك لخدماتنا وموقعنا.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '2. Data We Collect' : '2. البيانات التي نجمعها'}</span>
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>{language === 'en' ? 'Personal Information: ' : 'المعلومات الشخصية: '}</strong>
                {language === 'en'
                  ? 'Name, email, phone number, and brand name submitted via contact forms or WhatsApp.'
                  : 'كالاسم، البريد الإلكتروني، رقم الهاتف، واسم الشركة التي تقدمها لنا طواعية عبر نموذج الاتصال أو الواتساب.'}
              </li>
              <li>
                <strong>{language === 'en' ? 'Project Requirements: ' : 'بيانات المشروع: '}</strong>
                {language === 'en'
                  ? 'Scope details, brand guidelines, and documents shared to prepare proposals and deliverables.'
                  : 'المستندات والأفكار والتفاصيل التسويقية التي تشاركها معنا بهدف إعداد خطة العمل أو تنفيذ الخدمات.'}
              </li>
              <li>
                <strong>{language === 'en' ? 'Technical Analytics: ' : 'البيانات التقنية: '}</strong>
                {language === 'en'
                  ? 'IP address, browser type, and anonymous cookies to optimize website speed and performance.'
                  : 'عنوان الـ IP ونوع المتصفح وملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وسرعة الموقع.'}
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '3. Strict Non-Disclosure & Confidentiality (NDA)' : '3. سرية الأعمال (NDA) وعدم الإفصاح'}</span>
            </h3>
            <p>
              {language === 'en'
                ? 'We operate under strict confidentiality. We will never sell, lease, or distribute your trade secrets, code, or brand materials to any third party.'
                : 'نلتزم التزاماً صارماً بعدم مشاركة أو بيع أو تأجير أي بيانات أو معلومات تخص مشروعك أو علامتك التجارية لأي طرف ثالث. جميع البيانات تستخدم فقط لغرض تقديم الخدمات المطلوبة وإتمام التعاقد.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '4. Your Rights & Data Retention' : '4. حقوقك وتعديل البيانات'}</span>
            </h3>
            <p>
              {language === 'en'
                ? 'You reserve the right at any time to request updates, exports, or complete deletion of your records by contacting us at: '
                : 'يحق لك في أي وقت طلب تعديل أو حذف بياناتك المخزنة لدينا، أو إلغاء الاشتراك في أي رسائل إخبارية من خلال التواصل المباشر مع فريقنا عبر البريد: '}
              <a href="mailto:info@crew5.agency" className="text-brand-green underline font-montserrat">info@crew5.agency</a>.
            </p>
          </div>

        </Card>

      </div>
    </div>
  );
}
