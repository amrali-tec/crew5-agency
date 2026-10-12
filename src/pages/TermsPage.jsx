import React from 'react';
import { Scale, CheckCircle2, FileCheck, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import SeoHead from '../components/ui/SeoHead';
import { useLanguage } from '../context/LanguageContext';

export default function TermsPage() {
  const { language, isRTL } = useLanguage();

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 space-y-12">
      <SeoHead
        title={language === 'en' ? 'Terms & Conditions | Crew5 Agency' : 'الشروط والأحكام وضوابط التعاقد | كرو فايف'}
        description={language === 'en'
          ? 'Official Terms of Service, deliverables scope, and intellectual property rights governing contracts with Crew5 Agency.'
          : 'الشروط والأحكام الرسمية، نطاق تسليم المشاريع، وحقوق الملكية الفكرية المعتمدة لدى وكالة كرو فايف.'}
        url="/terms-and-conditions"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge={language === 'en' ? 'Terms & Legal' : 'الشروط والأحكام'}
          title={language === 'en' ? 'Our Terms &' : 'الشروط و'}
          highlight={language === 'en' ? 'Conditions' : 'الأحكام'}
          subtitle={language === 'en'
            ? 'Updated: January 2026 — Legal framework governing service engagements and intellectual property with Crew5 Agency.'
            : 'آخر تحديث: يناير 2026 - القواعد والضوابط المنظمة للاستخدام والتعاقد مع وكالة Crew5 Agency.'}
        />

        <Card className={`p-8 sm:p-12 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base border-white/10 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '1. General Terms of Service' : '1. شروط الاستخدام العامة'}</span>
            </h3>
            <p>
              {language === 'en'
                ? 'Engaging Crew5 Agency for creative, marketing, or engineering services constitutes complete mutual agreement to these terms and the specific Service Level Agreement (SLA).'
                : 'يُعد استخدامك لموقع Crew5 Agency أو طلبك لأي من خدماتنا بمثابة موافقة صريحة على هذه الشروط والأحكام وكافة السياسات الملحقة بها.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '2. Scope of Work & Revisions' : '2. تنفيذ المشاريع والتعديلات'}</span>
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                {language === 'en'
                  ? 'The Scope of Work (SOW) and delivery milestones are defined in the mutual contract prior to project kickoff.'
                  : 'يتم تحديد نطاق العمل (Scope of Work) وجدول التسليمات الزمني في العقد المبرم بين الطرفين قبل بدء التنفيذ.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Each project includes defined revision rounds to ensure deliverables match approved creative benchmarks.'
                  : 'يشمل كل مشروع عدداً محدداً من جولات التعديل والمراجعة وفقاً لما هو منصوص عليه في العرض الفني والمالي.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Any additional out-of-scope requests will be quoted independently with agreed-upon timelines.'
                  : 'أي طلبات إضافية خارج نطاق العمل المعتمد تخضع لتقدير زمني ومالي مستقل بموافقة الطرفين.'}
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '3. Intellectual Property Rights' : '3. حقوق الملكية الفكرية'}</span>
            </h3>
            <p>
              {language === 'en'
                ? 'All final source files, brand assets, and code transfer fully to the client upon settlement of final invoices, with Crew5 retaining standard portfolio showcase rights.'
                : 'تنتقل كافة حقوق الملكية الفكرية للتصاميم والشعارات والمواد الإعلانية المطورة للعميل فور سداد كافة المستحقات المالية المتفق عليها، مع احتفاظ الوكالة بحق عرض العمل في معرض أعمالها لأغراض ترويجية ما لم يتم الاتفاق كتابياً على خلاف ذلك.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-brand-green" />
              <span>{language === 'en' ? '4. Payment Milestones & Cancellation' : '4. الدفع والإلغاء'}</span>
            </h3>
            <p>
              {language === 'en'
                ? 'Payments are structured around milestone deliverables (deposit, mid-point approval, and final handover) as stipulated in the formal contract.'
                : 'تتم الدفعات وفق الجدول المالي المعتمد في العقد (دفعة مقدمة، دفعات مراحل الإنجاز، ودفعة التسليم النهائي). في حال رغبة العميل في إلغاء المشروع بعد البدء، تُحسب المستحقات بناءً على حجم العمل المنجز فعلياً حتى تاريخ الإلغاء.'}
            </p>
          </div>

          {/* 5. Sales Department Terms & Commercial Policy */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {language === 'en' ? '5. Sales Department & Commercial Terms' : '5. شروط وضوابط قسم المبيعات والتعاقد'}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                <h4 className="text-sm font-bold text-brand-green">
                  {language === 'en' ? '• Quote Validity (14 Business Days)' : '• صلاحية عروض الأسعار (14 يوم عمل)'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'en'
                    ? 'Official technical and commercial proposals issued by our sales team are valid for 14 business days from the date of dispatch.'
                    : 'تكون عروض الأسعار والمقترحات الفنية والمالية الصادرة من قسم المبيعات صالحة لمدة 14 يوم عمل من تاريخ إرسالها للعميل.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                <h4 className="text-sm font-bold text-brand-green">
                  {language === 'en' ? '• Milestone Payment Structure' : '• هيكل الدفعات والجدول المالي'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'en'
                    ? '50% initial kickoff deposit, 30% upon design/prototype approval, and 20% upon final live deployment and handover.'
                    : '50% دفعة أولى لحجز الفريق والبدء الفوري، 30% عند اعتماد التصاميم والواجهات، و20% عند الإطلاق النهائي وتسليم الملفات.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                <h4 className="text-sm font-bold text-brand-green">
                  {language === 'en' ? '• Revision Rounds (3 Rounds Included)' : '• سياسة جولات التعديل (3 جولات معتمدة)'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'en'
                    ? 'Each milestone includes 3 structured rounds of feedback. Out-of-scope alterations are subject to a separate Change Request.'
                    : 'يتضمن كل مشروع 3 جولات تعديل وملاحظات شاملة لكل مرحلة لضمان جودة المخرجات والالتزام بالجداول الزمنية المتفق عليها.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                <h4 className="text-sm font-bold text-brand-green">
                  {language === 'en' ? '• Post-Launch Free Warranty (30–90 Days)' : '• الضمان والدعم الفني المجاني (30–90 يوماً)'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'en'
                    ? 'Includes free technical support, bug fixing, and server monitoring after project launch as specified in the service package.'
                    : 'نوفر ضماناً ودعماً فنياً مجانياً شاملاً بعد إطلاق المنصة أو تسليم الهوية لمعالجة أي ملاحظات برمجية أو تقنية دون أي تكلفة إضافية.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-900/90 border border-brand-green/30 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-white block">
                {language === 'en' ? 'Client Confidentiality & NDA Commitment:' : 'ميثاق السرية وحماية بيانات العملاء (NDA):'}
              </span>
              <p className="leading-relaxed">
                {language === 'en'
                  ? 'Crew5 Agency sales representatives and project managers are strictly bound to complete non-disclosure regarding client business ideas, trade secrets, data, and financial figures.'
                  : 'يلتزم كافة مسؤولي قسم المبيعات ومدراء المشاريع في كرو فايف بالحفاظ التام على سرية وخصوصية كافة بيانات العملاء وخططهم التجارية واستراتيجياتهم التنافسية وفق أعلى معايير اتفاقيات عدم الإفصاح (NDA).'}
              </p>
            </div>
          </div>

        </Card>

      </div>
    </div>
  );
}
