import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, MessageSquare, X, Send, Sparkles, CheckCircle2, 
  ExternalLink, PhoneCall, ArrowLeft, RefreshCw, User, 
  Layers, Clock, ShieldCheck, ChevronDown, Minimize2
} from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  
  // Lead Capture Mode inside chat
  const [leadMode, setLeadMode] = useState(null); // 'quote' | 'consultation'
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadService, setLeadService] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const { clientProjects = [], servicesCategories = [], settings } = useData();
  const { language, t, isRTL } = useLanguage();
  const messagesEndRef = useRef(null);

  const defaultReplies = language === 'en' ? [
    '🔍 Track Project Status',
    '🛒 Web & E-Commerce Pricing',
    '🎨 Brand Identity Packages',
    '📅 Book Strategy Consultation'
  ] : [
    '🔍 تتبع حالة مشروعي',
    '🛒 تكلفة متجر / موقع إلكتروني',
    '🎨 باقات تصميم الهوية البصرية',
    '📅 حجز جلسة استشارة استراتيجية'
  ];

  // Initial Messages
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`crew5_bot_history_${language}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 1,
        sender: 'bot',
        text: language === 'en'
          ? "Welcome to **Crew5 Agency**! 👋\nI am your AI assistant. How can I help accelerate your project goals today?"
          : "أهلاً بك في **كرو فايف (Crew5 Agency)**! 👋\nأنا مساعدك الذكي، كيف يمكنني مساعدتك اليوم في تحقيق أهداف مشروعك؟",
        time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: defaultReplies
      }
    ];
  });

  // Re-initialize if language changed and history is empty or default
  useEffect(() => {
    const saved = localStorage.getItem(`crew5_bot_history_${language}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
        return;
      } catch (e) {}
    }
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: language === 'en'
          ? "Welcome to **Crew5 Agency**! 👋\nI am your AI assistant. How can I help accelerate your project goals today?"
          : "أهلاً بك في **كرو فايف (Crew5 Agency)**! 👋\nأنا مساعدك الذكي، كيف يمكنني مساعدتك اليوم في تحقيق أهداف مشروعك؟",
        time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: defaultReplies
      }
    ]);
  }, [language]);

  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(prev => !prev);
      setIsMinimized(false);
      setHasUnread(false);
    };
    window.addEventListener('crew5:open-ai-bot', handleOpenEvent);
    return () => window.removeEventListener('crew5:open-ai-bot', handleOpenEvent);
  }, []);

  useEffect(() => {
    localStorage.setItem(`crew5_bot_history_${language}`, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, language]);

  const addMessage = (sender, text, extra = {}) => {
    const newMsg = {
      id: Date.now() + Math.random(),
      sender,
      text,
      time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' }),
      ...extra
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Smart Response Engine
  const processUserMessage = async (userText) => {
    const query = userText.trim().toLowerCase();
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(async () => {
      // 1. Check for Project Code Tracking (e.g. CREW-XXXX or numbers)
      const projectCodeMatch = query.match(/crew-?\d{3,5}/i) || (query.length >= 4 && query.match(/\d{4}/));
      if (projectCodeMatch || query.includes('تتبع') || query.includes('مشروعي') || query.includes('وين وصل') || query.includes('track') || query.includes('status')) {
        if (projectCodeMatch) {
          const rawCode = projectCodeMatch[0].replace('-', '').toUpperCase();
          const targetCode = rawCode.startsWith('CREW') ? `CREW-${rawCode.replace('CREW', '')}` : `CREW-${rawCode}`;
          
          try {
            const res = await api.getClientProjectByCode(targetCode);
            if (res.success && res.data) {
              const p = res.data;
              const completedMilestones = (p.milestones || []).filter(m => m.status === 'completed').length;
              
              if (language === 'en') {
                addMessage('bot', `🔍 **Project Tracking: ${p.name || p.projectTitle} (${p.code})**\n\n- 📊 **Progress:** ${p.progress || 0}%\n- 🚀 **Status:** ${p.status === 'completed' ? 'Completed & Handed Over ✓' : 'Active Execution'}\n- 📍 **Milestones Completed:** ${completedMilestones} of ${(p.milestones || []).length} phases\n- 🗓️ **Target Delivery:** ${p.targetEndDate || 'Soon'}\n\nYou can access the live portal to inspect deliverables and download files:`, {
                  actionLink: `/track?code=${p.code}`,
                  actionText: 'Open Project Tracking Portal ↗'
                });
              } else {
                addMessage('bot', `🔍 **بيانات مشروعك: ${p.name || p.projectTitle} (${p.code})**\n\n- 📊 **نسبة الإنجاز:** ${p.progress || 0}%\n- 🚀 **الحالة الحالية:** ${p.status === 'completed' ? 'مكتمل ومسلّم ✓' : 'قيد التنفيذ النشط'}\n- 📍 **المراحل المنجزة:** ${completedMilestones} من ${(p.milestones || []).length} مراحل\n- 🗓️ **الموعد المستهدف:** ${p.targetEndDate || 'قريباً'}\n\nيمكنك فتح البوابة الكاملة للاطلاع على التفاصيل والملفات المرفوعة:`, {
                  actionLink: `/track?code=${p.code}`,
                  actionText: 'الانتقال لبوابة تتبع المشروع ↗'
                });
              }
              setIsTyping(false);
              return;
            }
          } catch (e) {}
        }
        
        if (language === 'en') {
          addMessage('bot', 'To track your live project progress, please enter your unique tracking code (e.g. **CREW-9041**) and I will fetch your roadmap instantly 🚀', {
            quickReplies: ['CREW-9041', 'CREW-7820']
          });
        } else {
          addMessage('bot', 'لتتبع مشروعك اللحظي، يرجى كتابة رمز التتبع الخاص بك (مثال: **CREW-9041**) وسأقوم بعرض نسبة الإنجاز والمراحل فوراً 🚀', {
            quickReplies: ['CREW-9041', 'CREW-7820']
          });
        }
        setIsTyping(false);
        return;
      }

      // 2. Web Development / E-Commerce / Sites
      if (query.includes('موقع') || query.includes('متجر') || query.includes('سلة') || query.includes('زد') || query.includes('ويب') || query.includes('برمج') || query.includes('web') || query.includes('store') || query.includes('ecommerce') || query.includes('app')) {
        if (language === 'en') {
          addMessage('bot', '💻 **Web Development & E-Commerce Engineering:**\n\nWe build custom cloud platforms, high-speed stores (Salla, Zid, Shopify, Next.js), and bespoke web applications compliant with Google Core Web Vitals.\n\n✨ **Key Features:**\n- ⚡ 90+ Google Performance Score\n- 📱 100% Mobile Responsive\n- 💳 Payment Gateway & Tabby/Tamara Integrations\n- 🔒 High Security & Cloud Hosting\n\nWould you like an instant quote estimate?', {
            quickReplies: ['🧮 Open Cost Estimator', '📝 Request Custom Proposal', '💬 WhatsApp Consultant'],
            actionLink: '/estimator',
            actionText: 'Open Interactive Estimator ↗'
          });
        } else {
          addMessage('bot', '💻 **تطوير المواقع والمتاجر الإلكترونية السحابية:**\n\nنحن نبني مواقع ومتاجر فائقة السرعة على منصات سلة، زد، شوبيفاي، أو برمجة خاصة بـ Next.js و React مطابقة لمعايير Core Web Vitals.\n\n✨ **أبرز المميزات:**\n- ⚡ سرعة تحميل قياسية (< 1.5 ثانية)\n- 📱 تجربة مستخدم وتصميم مخصص للهواتف\n- 💳 ربط بوابات الدفع والتقسيط (تمارا وتابي)\n- 🔒 حماية وأمان متقدم\n\nهل تود حساب تكلفة متجرك بدقة وتنزيل عرض السعر PDF؟', {
            quickReplies: ['🧮 الانتقال لحاسبة التكلفة', '📝 طلب عرض سعر فوري', '💬 التحدث مع خبير على واتساب'],
            actionLink: '/estimator',
            actionText: 'فتح حاسبة تكلفة المشاريع ↗'
          });
        }
        setIsTyping(false);
        return;
      }

      // 3. Branding / Identity Design
      if (query.includes('هوية') || query.includes('شعار') || query.includes('لوجو') || query.includes('تصميم') || query.includes('براند') || query.includes('brand') || query.includes('logo') || query.includes('identity')) {
        if (language === 'en') {
          addMessage('bot', '🎨 **Strategic Brand Identity & Architecture:**\n\nWe craft distinguished corporate identities that captivate audiences and establish market authority.\n\n📘 **Deliverables Include:**\n- Master Logo & Monograms\n- Complete Brand Guidelines Manual\n- Dual-Language Typography (Arabic & Latin)\n- Corporate Stationery & Social Media Kits\n- 3D Signage & Packaging Applications', {
            quickReplies: ['💼 View Brand Portfolio', '📝 Request Branding Quote', '📅 Book Strategy Session'],
            actionLink: '/services#branding',
            actionText: 'Explore Branding Solutions ↗'
          });
        } else {
          addMessage('bot', '🎨 **بناء الهوية التجارية والبصرية المتكاملة (Branding):**\n\nنصنع لعلامتك التجارية هوية استثنائية تجمع بين الفخامة والرسالة التسويقية المؤثرة.\n\n📘 **ما يشمله ملف الهوية:**\n- الشعار الأساسي والفرعي وفلسفة التصميم\n- دليل الهوية البصرية الشامل (Brand Guidelines)\n- الخطوط والألوان الرسمية (RGB, CMYK, Pantone)\n- تصاميم المطبوعات الرسمية وقوالب السوشيال ميديا\n- تطبيقات ثلاثية الأبعاد على اللوحات واليونيفورم', {
            quickReplies: ['💼 مشاهدة نماذج الهويات', '📝 طلب تسعير باقة هوية', '📅 حجز جلسة استشارة'],
            actionLink: '/services#branding',
            actionText: 'عرض تفاصيل باقات الهوية ↗'
          });
        }
        setIsTyping(false);
        return;
      }

      // 4. Marketing / Ads / Campaigns
      if (query.includes('تسويق') || query.includes('إعلان') || query.includes('حمل') || query.includes('تيك توك') || query.includes('سناب') || query.includes('مبيعات') || query.includes('marketing') || query.includes('ads') || query.includes('campaign') || query.includes('tiktok') || query.includes('snapchat')) {
        if (language === 'en') {
          addMessage('bot', '📈 **High-ROI Performance Marketing:**\n\nWe manage multi-channel paid ad campaigns focused on measurable conversions and lowest CPA.\n\n🚀 **Platforms Managed:**\n- TikTok & Snapchat Paid Ads (UGC & Creative Hook)\n- Google Ads (Search, Shopping, YouTube)\n- Meta Ads (Instagram & Facebook)\n- Tracking via CAPI & Real-Time Dashboards', {
            quickReplies: ['🚀 Launch Ads Campaign', '🧮 Project Budget Estimator', '💬 Contact Ads Lead'],
            actionLink: '/services#marketing',
            actionText: 'View Marketing Packages ↗'
          });
        } else {
          addMessage('bot', '📈 **إدارة الحملات التسويقية عالية العائد (ROAS):**\n\nندير ميزانيتك الإعلانية باحترافية لتحقيق أعلى معدل تحويل وأقل تكلفة استحواذ على العميل.\n\n🚀 **منصات الحملات:**\n- إعلانات TikTok & Snapchat الممولة (صناعة محتوى إبداعي UGC)\n- إعلانات Google (Search & YouTube & Shopping)\n- إعلانات Meta (Instagram & Facebook)\n- ضبط بيكسل التتبع وConversion APIs وتقارير حية', {
            quickReplies: ['🚀 بدء حملة إعلانية', '🧮 حساب الميزانية المقترحة', '💬 استشارة مع مدير الحملات'],
            actionLink: '/services#marketing',
            actionText: 'عرض خدمات التسويق المميز ↗'
          });
        }
        setIsTyping(false);
        return;
      }

      // 5. Quote Request / Consultation Trigger
      if (query.includes('سعر') || query.includes('تكلف') || query.includes('عرض') || query.includes('استشار') || query.includes('حجز') || query.includes('price') || query.includes('cost') || query.includes('quote') || query.includes('consult')) {
        setLeadMode('quote');
        if (language === 'en') {
          addMessage('bot', 'Excellent! We would love to prepare an official proposal and schedule a strategy consultation for your project. 📝\n\nPlease enter your details in the form below:', {
            quickReplies: ['🧮 Use Interactive Calculator', '📅 Consultation Calendar']
          });
        } else {
          addMessage('bot', 'ممتاز! يسعدنا إعداد عرض سعر رسمي ومدروس لمشروعك، أو تحديد موعد لجلسة استشارية مجانية مع فريقنا الاستراتيجي. 📝\n\nيرجى كتابة بياناتك في النموذج السريع أدناه:', {
            quickReplies: ['🧮 استخدم الحاسبة التفاعلية', '📅 حجز موعد عبر التقويم']
          });
        }
        setIsTyping(false);
        return;
      }

      // Default Fallback Response
      if (language === 'en') {
        addMessage('bot', 'Thank you for reaching out! At Crew5 Agency, we provide end-to-end digital solutions:\n\n1. 💻 High-Speed Web & E-Commerce Platforms\n2. 🎨 Brand Identity Architecture & Guidelines\n3. 🎬 Cinematic Video Production & Motion Graphics\n4. 📈 Performance Ad Marketing (TikTok, Snap, Google, Meta)\n\nHow can we help your business thrive today?', {
          quickReplies: [
            '🔍 Track My Project',
            '🛒 Web Development Cost',
            '🎨 Brand Identity Packages',
            '📅 Book Strategy Consultation'
          ]
        });
      } else {
        addMessage('bot', 'شكراً لتواصلك! في وكالة كرو فايف (Crew5) نقدم منظومة خدمات رقمية وإبداعية متكاملة:\n\n1. 💻 برمجة وتطوير المواقع والمتاجر السحابية\n2. 🎨 بناء وتصميم الهويات البصرية للشركات\n3. 🎬 الإنتاج المرئي والمونتاج السينمائي\n4. 📈 التسويق الرقمي وإدارة الحملات الممولة\n\nما هو المجال الذي ترغب في مناقشته اليوم؟', {
          quickReplies: [
            '🔍 تتبع حالة مشروعي',
            '🛒 تكلفة متجر / موقع إلكتروني',
            '🎨 باقات تصميم الهوية البصرية',
            '📅 حجز جلسة استشارة استراتيجية'
          ]
        });
      }
      setIsTyping(false);
    }, 600);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    const userText = input;
    setInput('');
    addMessage('user', userText);
    processUserMessage(userText);
  };

  const handleQuickReply = (text) => {
    if (isTyping) return;
    addMessage('user', text);
    processUserMessage(text);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    try {
      await api.sendMessage({
        name: leadName,
        phone: leadPhone,
        service: leadService || (language === 'en' ? 'Inquiry via AI Assistant' : 'استفسار من المساعد الذكي'),
        message: language === 'en'
          ? `Lead collected via AI Chatbot: ${leadService || 'General Inquiry'}`
          : `طلب عرض سعر سريع من المساعد الذكي: ${leadService || 'استفسار عام'}`
      });
      setLeadSubmitted(true);
      if (language === 'en') {
        addMessage('bot', `🎉 **Thank you, ${leadName}!**\n\nYour request has been received. Our project consultant will contact you on WhatsApp (${leadPhone}) within an hour.`, {
          actionLink: '/contact',
          actionText: 'View Agency Contact Info ↗'
        });
      } else {
        addMessage('bot', `🎉 **شكراً لك أ/ ${leadName}!**\n\nتم استلام طلبك بنجاح، وسيقوم مستشار المشاريع بالتواصل معك عبر الواتساب (${leadPhone}) خلال أقل من ساعة لتجهيز العرض والجدول الزمني.`, {
          actionLink: '/contact',
          actionText: 'عرض بيانات فروع الوكالة ↗'
        });
      }
    } catch (err) {
      if (language === 'en') {
        addMessage('bot', 'Your details were noted. You can also contact our team directly on WhatsApp for immediate response.');
      } else {
        addMessage('bot', 'تم تسجيل بياناتك، ويمكنك أيضاً التواصل مباشرة عبر الواتساب للرد الفوري.');
      }
    }
  };

  const handleReset = () => {
    localStorage.removeItem(`crew5_bot_history_${language}`);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: language === 'en'
          ? "Welcome back to **Crew5 Agency**! 👋 How can I help you today?"
          : "أهلاً بك مجدداً في **كرو فايف**! 👋 كيف يمكنني مساعدتك؟",
        time: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: defaultReplies
      }
    ]);
    setLeadMode(null);
    setLeadSubmitted(false);
  };

  return (
    <>
      {/* CHATBOT MODAL WINDOW */}
      {isOpen && (
        <div className={`fixed bottom-6 ${isRTL ? 'right-4 sm:right-6 md:right-20' : 'left-4 sm:left-6 md:left-20'} z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl bg-dark-950/98 border border-brand-green/30 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'}`}>
          
          {/* HEADER */}
          <div className="p-4 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-brand-green/10 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-neon">
                <Bot className="w-6 h-6" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-green border-2 border-dark-950"></span>
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{language === 'en' ? 'Crew5 AI Assistant' : 'مساعد كرو فايف الذكي'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                </h4>
                <p className="text-[11px] text-emerald-400 font-medium">
                  {language === 'en' ? 'Online 24/7' : 'متصل للرد اللحظي 24/7'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleReset}
                title={language === 'en' ? 'Restart Conversation' : 'إعادة تعيين المحادثة'}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMinimized ? <ChevronDown className="w-4 h-4 rotate-180" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT CONTENT */}
          {!isMinimized && (
            <>
              {/* MESSAGES SCROLLER */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? (isRTL ? 'items-start' : 'items-start') : (isRTL ? 'items-end' : 'items-end')}`}
                    >
                      <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isBot 
                          ? `bg-dark-900 border border-white/10 text-slate-200 ${isRTL ? 'rounded-tr-none text-right' : 'rounded-tl-none text-left'}` 
                          : `bg-brand-green text-dark-950 font-semibold ${isRTL ? 'rounded-tl-none text-right' : 'rounded-tr-none text-left'} shadow-neon`
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Action Link Button */}
                        {msg.actionLink && (
                          <div className="mt-3 pt-2.5 border-t border-white/10">
                            <a
                              href={msg.actionLink}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline"
                            >
                              <span>{msg.actionText || (language === 'en' ? 'View Details' : 'التفاصيل الكاملة')}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>

                      {/* Bot Quick Reply Options */}
                      {isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 mt-2 max-w-[90%] ${isRTL ? 'justify-start' : 'justify-start'}`}>
                          {msg.quickReplies.map((reply, rIdx) => (
                            <button
                              key={rIdx}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/5 hover:bg-brand-green/20 text-slate-300 hover:text-white border border-white/10 hover:border-brand-green/40 transition-all text-right active:scale-95"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Animation */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-dark-900 border border-white/5 w-20 text-brand-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                {/* IN-CHAT LEAD CAPTURE FORM */}
                {leadMode && !leadSubmitted && (
                  <form onSubmit={handleLeadSubmit} className={`p-4 rounded-2xl bg-dark-900 border border-brand-green/40 space-y-2.5 animate-fadeIn ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h5 className="font-bold text-white text-xs flex items-center gap-1.5 text-brand-green">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Submit Requirements & Fast Quote:' : 'تسجيل طلبك وعرض السعر الرسمي:'}</span>
                    </h5>
                    <input
                      type="text"
                      required
                      placeholder={language === 'en' ? 'Your Full Name *' : 'اسمك الكريم *'}
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
                    />
                    <input
                      type="tel"
                      required
                      placeholder={language === 'en' ? 'Phone / WhatsApp Number *' : 'رقم الواتساب أو الجوال *'}
                      value={leadPhone}
                      onChange={e => setLeadPhone(e.target.value)}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green dir-ltr"
                    />
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Project Type (Web, Store, Branding, Ads)...' : 'نوع المشروع (موقع، متجر، هوية، تسويق)...'}
                      value={leadService}
                      onChange={e => setLeadService(e.target.value)}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-brand-green hover:bg-emerald-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-neon cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Submit Proposal Request' : 'إرسال وتجهيز العرض'}</span>
                    </button>
                  </form>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* INPUT BAR */}
              <div className="p-3 bg-dark-900 border-t border-white/10 shrink-0">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={language === 'en' ? 'Type question or tracking code...' : 'اكتب سؤالك أو رمز مشروعك هنا...'}
                    className="flex-1 bg-dark-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-9 h-9 rounded-xl bg-brand-green hover:bg-emerald-400 text-dark-950 flex items-center justify-center shrink-0 shadow-neon disabled:opacity-40 transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* WhatsApp Quick Bridge Footer */}
                <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-slate-400">
                  <span>{language === 'en' ? 'Powered by Crew5 AI Engine ⚡' : 'مدعوم بمحرك ذكاء كرو فايف ⚡'}</span>
                  <a
                    href={`https://wa.me/${(settings?.whatsapp || '+966568121909').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(language === 'en' ? 'Hello Crew5 team, I would like to inquire about starting a project' : 'مرحباً، أود التحدث مع فريق كرو فايف بخصوص مشروع جديد')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>{language === 'en' ? 'WhatsApp Direct' : 'متابعة على واتساب'}</span>
                  </a>
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </>
  );
}
