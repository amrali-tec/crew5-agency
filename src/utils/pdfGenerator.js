/**
 * Crew5 Agency - Document & PDF Exporter Utility
 * Generates styled, high-resolution printable reports with Crew5 brand identity.
 */

export function printDocument(title, htmlContent) {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    alert('يرجى السماح بفتح النوافذ المنبثقة (Popups) لتحميل التقرير كـ PDF');
    return;
  }

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>${title} | كرو فايف Crew5 Agency</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Cairo', system-ui, -apple-system, sans-serif;
          background-color: #ffffff;
          color: #0f172a;
          line-height: 1.6;
          padding: 24px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #00F59B;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .logo-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-badge {
          width: 44px;
          height: 44px;
          background: #090e17;
          border: 2px solid #00F59B;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 900;
          color: #00F59B;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          color: #090e17;
        }
        .brand-subtitle {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }
        .doc-meta {
          text-align: left;
          font-size: 11px;
          color: #475569;
        }
        .doc-meta strong {
          color: #0f172a;
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
        }
        .badge-green { background: #dcfce7; color: #166534; }
        .badge-blue { background: #e0f2fe; color: #075985; }
        .badge-amber { background: #fef3c7; color: #92400e; }
        
        .card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .card-title {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 10px;
          color: #090e17;
          border-bottom: 1px dashed #cbd5e1;
          padding-bottom: 6px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          text-align: right;
        }
        th {
          background: #f1f5f9;
          font-weight: 700;
          color: #1e293b;
        }
        
        .footer {
          margin-top: 32px;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #64748b;
        }
        .print-btn-bar {
          text-align: center;
          padding: 12px;
          background: #090e17;
          color: #fff;
          margin: -24px -24px 20px -24px;
        }
        .btn-print {
          background: #00F59B;
          color: #090e17;
          border: none;
          font-family: 'Cairo', sans-serif;
          font-weight: 800;
          padding: 8px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        @media print {
          .print-btn-bar { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="print-btn-bar">
        <span>جاهز للطباعة أو الحفظ كملف PDF</span>
        <button class="btn-print" onclick="window.print()" style="margin-right: 16px;">🖨️ طباعة / حفظ PDF الآن</button>
      </div>

      <div class="header">
        <div class="logo-box">
          <div class="logo-badge">5</div>
          <div>
            <div class="brand-title">كرو فايف | CREW 5</div>
            <div class="brand-subtitle">وكالة الإبداع والحلول والتحول الرقمي</div>
          </div>
        </div>
        <div class="doc-meta">
          <div><strong>الوثيقة:</strong> ${title}</div>
          <div><strong>تاريخ الإصدار:</strong> ${new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div><strong>الموقع:</strong> https://crew5.agency</div>
        </div>
      </div>

      ${htmlContent}

      <div class="footer">
        <div>كرو فايف للإبداع والتسويق الرقمي &bull; info@crew5.agency &bull; +966 50 000 0000</div>
        <div>صفحة 1 من 1 &bull; وثيقة رسمية معتمدة إلكترونياً</div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(fullHtml);
  printWindow.document.close();
}

/**
 * 1. Export Digital Audit Report as PDF
 */
export function exportDigitalAuditPdf(domain, report) {
  if (!report) return;

  const html = `
    <div style="background: linear-gradient(135deg, #090e17, #131d2e); color: #fff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="background: rgba(0,245,155,0.15); color: #00F59B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700;">تقرير تدقيق الأداء الرقمي</span>
          <h2 style="font-size: 22px; font-weight: 800; margin-top: 8px; color: #ffffff;">فحص النطاق: ${domain}</h2>
          <p style="color: #94a3b8; font-size: 12px;">تحليل شامل لسرعة الاستجابة، بنية السيو، الهوية وتجربة المستخدم ومعدلات التحويل.</p>
        </div>
        <div style="text-align: center; background: rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(0,245,155,0.3);">
          <div style="font-size: 32px; font-weight: 900; color: #00F59B;">${report.overallScore}/100</div>
          <div style="font-size: 11px; color: #cbd5e1;">التقييم الإجمالي</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">📊 تحليل المؤشرات الرئيسية (Key Metrics Breakdown)</div>
      <table>
        <thead>
          <tr>
            <th>المؤشر والركيزة</th>
            <th>النتيجة</th>
            <th>الحالة</th>
            <th>الملاحظة والتوصية</th>
          </tr>
        </thead>
        <tbody>
          ${(report.categories || []).map(cat => `
            <tr>
              <td><strong>${cat.title}</strong></td>
              <td style="font-weight: 800; color: ${cat.score >= 80 ? '#166534' : cat.score >= 60 ? '#92400e' : '#991b1b'};">${cat.score}%</td>
              <td>
                <span class="badge ${cat.score >= 80 ? 'badge-green' : cat.score >= 60 ? 'badge-amber' : 'badge-red'}">
                  ${cat.score >= 80 ? 'ممتاز' : cat.score >= 60 ? 'يحتاج تحسين' : 'حرِج'}
                </span>
              </td>
              <td style="font-size: 11px; color: #475569;">${cat.summary || 'توصية بتحسين زمن الاستجابة وضغط الصور'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">💡 خطة العمل المقترحة من فريق كرو فايف للنمو</div>
      <ul style="padding-right: 20px; font-size: 12px; color: #334155; line-height: 1.8;">
        <li><strong>تحسين سرعة التحميل وتجربة المستخدم:</strong> تقليل زمن التفاعل وتحسين مؤشرات Core Web Vitals لزيادة معدل البقاء.</li>
        <li><strong>إعادة صياغة مسار التحويل (Conversion Funnel):</strong> تسهيل خطوات الدفع والشراء ووضع أزرار CTA واضحة ومباشرة.</li>
        <li><strong>ترقية بنية السيو الفني (Technical SEO):</strong> تهيئة الـ Schema Markup والكلمات المفتاحية والروابط الصديقة.</li>
        <li><strong>الهوية البصرية المتناسقة:</strong> توحيد الطابع البصري والخطوط وتجربة الجوال بنسبة 100%.</li>
      </ul>
    </div>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 14px; margin-top: 16px; text-align: center;">
      <strong style="color: #166534; font-size: 13px;">📞 هل ترغب في تطبيق هذه التوصيات ومضاعفة مبيعاتك؟</strong>
      <p style="color: #15803d; font-size: 11px; margin-top: 4px;">تواصل مع مستشاري كرو فايف لجلسة استراتيجية مجانية لمناقشة خطة التطوير الشاملة.</p>
    </div>
  `;

  printDocument(`تقرير الفحص الرقمي - ${domain}`, html);
}

/**
 * 2. Export Project Quotation / Estimate as Official PDF
 */
export function exportProjectQuotePdf(estimate) {
  if (!estimate) return;

  const html = `
    <div style="background: linear-gradient(135deg, #090e17, #1e293b); color: #fff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="background: rgba(0,245,155,0.15); color: #00F59B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700;">عرض سعر وتقدير مشروع رسمي</span>
          <h2 style="font-size: 22px; font-weight: 800; margin-top: 8px; color: #ffffff;">${estimate.serviceName || 'مشروع رقمي مخصص'}</h2>
          <p style="color: #94a3b8; font-size: 12px;">مقدم للعميل: ${estimate.clientName || 'عميل كرو فايف المميز'} ${estimate.clientPhone ? `(${estimate.clientPhone})` : ''}</p>
        </div>
        <div style="text-align: center; background: rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(0,245,155,0.3);">
          <div style="font-size: 22px; font-weight: 900; color: #00F59B;">${estimate.estimatedPrice || 'حسب التخصيص'}</div>
          <div style="font-size: 11px; color: #cbd5e1;">المدة التقديرية: ${estimate.estimatedTimeline || '2-4 أسابيع'}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">📌 تفاصيل وحزمة الميزات المحددة (Selected Specifications)</div>
      <table>
        <thead>
          <tr>
            <th>البند والميزة</th>
            <th>نوع التنفيذ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${(estimate.selectedFeatures || []).map((feat, idx) => `
            <tr>
              <td><strong>${feat}</strong></td>
              <td>تطوير وتصميم احترافي مخصص</td>
              <td><span class="badge badge-green">مشمول بالعرض</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">📝 ما يشمله العرض من كرو فايف</div>
      <ul style="padding-right: 20px; font-size: 12px; color: #334155; line-height: 1.8;">
        <li>تصميم UI/UX عصري ومتجاوب 100% مع كافة الشاشات والهواتف.</li>
        <li>كود برمجي سريع، نظيف ومبني بأحدث المعايير العالمية.</li>
        <li>لوحة تحكم إدارية شاملة وسهلة الاستخدام لإدارة المحتوى.</li>
        <li>دعم فني وضمان وصيانة مجانية لمدة 30 يوماً بعد الإطلاق.</li>
      </ul>
    </div>

    <div style="margin-top: 20px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 16px;">
      <div><strong>اعتماد إدارة المشاريع:</strong> وكالة كرو فايف (Crew5 Agency)</div>
      <div><strong>توقيع واعتماد العميل:</strong> ......................................</div>
    </div>
  `;

  printDocument(`عرض سعر مشروع - ${estimate.serviceName || 'كرو فايف'}`, html);
}

/**
 * 3. Export Project Status Report as PDF from Tracker
 */
export function exportProjectStatusPdf(project) {
  if (!project) return;

  const html = `
    <div style="background: linear-gradient(135deg, #090e17, #1e293b); color: #fff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="background: rgba(0,245,155,0.15); color: #00F59B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700;">تقرير إنجاز ومحطات المشروع</span>
          <h2 style="font-size: 22px; font-weight: 800; margin-top: 8px; color: #ffffff;">${project.name} (${project.code})</h2>
          <p style="color: #94a3b8; font-size: 12px;">العميل: ${project.clientName} &bull; مدير المشروع: ${project.manager || 'فريق كرو فايف'}</p>
        </div>
        <div style="text-align: center; background: rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(0,245,155,0.3);">
          <div style="font-size: 32px; font-weight: 900; color: #00F59B;">${project.progress || 0}%</div>
          <div style="font-size: 11px; color: #cbd5e1;">نسبة الإنجاز الفعلية</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">📍 محطات ومراحل المشروع (Milestones Tracking)</div>
      <table>
        <thead>
          <tr>
            <th>المرحلة</th>
            <th>الوصف</th>
            <th>الجدول الزمني</th>
            <th>الحالة والاعتماد</th>
          </tr>
        </thead>
        <tbody>
          ${(project.milestones || []).map(m => `
            <tr>
              <td><strong>${m.title}</strong></td>
              <td style="font-size: 11px; color: #475569;">${m.desc || '-'}</td>
              <td style="font-size: 11px;">${m.dueDate || '-'}</td>
              <td>
                <span class="badge ${m.status === 'completed' ? 'badge-green' : m.status === 'in_progress' ? 'badge-blue' : 'badge-amber'}">
                  ${m.status === 'completed' ? '✓ مكتمل ومعتمد' : m.status === 'in_progress' ? 'قيد التنفيذ' : 'مخطط له'}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${project.deliverables && project.deliverables.length > 0 ? `
      <div class="card">
        <div class="card-title">📦 ملفات وروابط التسليم المعتمدة (Deliverables)</div>
        <table>
          <thead>
            <tr>
              <th>الملف / المخرج</th>
              <th>النوع</th>
              <th>تاريخ الرفع</th>
            </tr>
          </thead>
          <tbody>
            ${project.deliverables.map(d => `
              <tr>
                <td><strong>${d.title}</strong></td>
                <td>${d.type || 'تصميم / ملف كود'}</td>
                <td>${d.date || new Date().toLocaleDateString('ar-EG')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}
  `;

  printDocument(`تقرير مشروع ${project.name} (${project.code})`, html);
}
