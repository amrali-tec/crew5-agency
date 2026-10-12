import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, CheckCircle2, Clock, Calendar, Download, 
  ExternalLink, Phone, Mail, User, ShieldCheck, ArrowRight, 
  Layers, AlertCircle, Sparkles, MessageCircle, Send, ThumbsUp,
  MessageSquare, Check, RefreshCw, FileText
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SeoHead from '../components/ui/SeoHead';
import { api } from '../services/api';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { exportProjectStatusPdf } from '../utils/pdfGenerator';

export default function ClientTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { clientProjects = [], fetchClientProjects } = useData();
  const { language, t, isRTL } = useLanguage();
  const initialCode = searchParams.get('code') || '';

  const [searchCode, setSearchCode] = useState(initialCode);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Milestone Approval & Notes State
  const [approvingId, setApprovingId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [sendingNote, setSendingNote] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const handleSearch = async (codeToSearch) => {
    const query = (codeToSearch || searchCode || '').trim();
    if (!query) return;

    setLoading(true);
    setNotFound(false);

    try {
      // 1. Try finding in context first
      const cleanQ = query.toUpperCase();
      const local = clientProjects.find(p => p.code?.toUpperCase() === cleanQ || p.id == query);
      if (local) {
        setProject(local);
        setSearchParams({ code: local.code || query });
        setLoading(false);
        return;
      }

      // 2. Fetch from API
      const res = await api.getClientProjectByCode(query);
      if (res.success && res.data) {
        setProject(res.data);
        setSearchParams({ code: res.data.code || query });
      } else {
        setProject(null);
        setNotFound(true);
      }
    } catch (err) {
      setProject(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveMilestone = async (milestoneId) => {
    if (!project || approvingId) return;
    setApprovingId(milestoneId);

    try {
      const res = await api.approveClientMilestone(project.id, milestoneId, noteAuthor || (language === 'en' ? 'Client Approval' : 'اعتماد العميل'));
      if (res.success && res.data) {
        setProject(res.data);
        setActionSuccess(language === 'en' ? 'Milestone approved successfully! 🎉' : 'تم اعتماد واكتمال المرحلة بنجاح! 🎉');
        if (fetchClientProjects) fetchClientProjects();
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (err) {
      alert(language === 'en' ? 'Error during approval, please try again' : 'حدث خطأ أثناء الاعتماد');
    } finally {
      setApprovingId(null);
    }
  };

  const handleAddClientNote = async (e) => {
    e.preventDefault();
    if (!project || !noteText.trim()) return;

    setSendingNote(true);
    try {
      const res = await api.addClientProjectNote(project.id, noteText.trim(), noteAuthor.trim() || (language === 'en' ? 'Client' : 'العميل'));
      if (res.success && res.data) {
        setProject(res.data);
        setNoteText('');
        setActionSuccess(language === 'en' ? 'Feedback submitted to team successfully ✅' : 'تم إرسال ملاحظتك لفريق العمل بنجاح ✅');
        if (fetchClientProjects) fetchClientProjects();
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (err) {
      alert(language === 'en' ? 'Error sending note' : 'حدث خطأ أثناء إرسال الملاحظة');
    } finally {
      setSendingNote(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="green">{language === 'en' ? 'Completed & Handed Over 🟢' : 'مكتمل ومسلّم 🟢'}</Badge>;
      case 'review':
        return <Badge variant="amber">{language === 'en' ? 'Under Review & Approval 🟡' : 'المراجعة والاعتماد 🟡'}</Badge>;
      case 'in_progress':
        return <Badge variant="green">{language === 'en' ? 'In Active Development 🚀' : 'قيد التنفيذ النشط 🚀'}</Badge>;
      case 'planning':
        return <Badge variant="outline">{language === 'en' ? 'Discovery & Architecture 📋' : 'مرحلة التخطيط والتحليل 📋'}</Badge>;
      default:
        return <Badge variant="outline">{language === 'en' ? 'Active' : 'نشط'}</Badge>;
    }
  };

  return (
    <div className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 min-h-screen">
      <SeoHead
        title={language === 'en' ? 'Client Project Tracker Portal | Crew5 Agency' : 'بوابة تتبع المشاريع الحية | كرو فايف'}
        description={language === 'en'
          ? 'Live portal for Crew5 clients to monitor project milestones, view deliverables, and submit feedback.'
          : 'بوابة العملاء لمتابعة مراحل تقدم العمل، مراجعة التسليمات، وتأكيد الإنجاز اللحظي.'}
        noindex={true}
        url="/track"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto">
          <SectionHeader
            badge={t('tracker.badge')}
            title={t('tracker.title')}
            highlight={t('tracker.highlight')}
            subtitle={t('tracker.subtitle')}
          />

          {/* Search Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
              <input
                type="text"
                required
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder={t('tracker.codePlaceholder')}
                className={`w-full bg-dark-900 border border-white/15 rounded-2xl py-4 ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-sm text-white placeholder-slate-500 outline-none focus:border-brand-green font-mono uppercase dir-ltr`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-4 px-8 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-dark-950 font-bold text-sm flex items-center justify-center gap-2 shadow-neon transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? (language === 'en' ? 'Searching...' : 'جاري البحث...') : t('tracker.trackBtn')}</span>
            </button>
          </form>

          {/* Quick Demo Chips */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap text-xs text-slate-400">
            <span>{language === 'en' ? 'Demo Tracking Codes: ' : 'رموز تجريبية سريعة:'}</span>
            <button
              type="button"
              onClick={() => { setSearchCode('CREW-9041'); handleSearch('CREW-9041'); }}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-brand-green/20 hover:text-brand-green border border-white/10 font-mono font-bold transition-colors"
            >
              CREW-9041
            </button>
            <button
              type="button"
              onClick={() => { setSearchCode('CREW-7820'); handleSearch('CREW-7820'); }}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-brand-green/20 hover:text-brand-green border border-white/10 font-mono font-bold transition-colors"
            >
              CREW-7820
            </button>
          </div>
        </div>

        {/* ACTION NOTIFICATION BANNER */}
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-brand-green/10 border border-brand-green text-brand-green text-sm font-bold text-center animate-fadeIn flex items-center justify-center gap-2 max-w-xl mx-auto shadow-neon">
            <Sparkles className="w-5 h-5" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* NOT FOUND ALERT */}
        {notFound && (
          <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center space-y-3 max-w-xl mx-auto animate-fadeIn">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">
              {language === 'en' ? 'Project Not Found' : 'لم يتم العثور على المشروع'}
            </h4>
            <p className="text-xs text-slate-300">
              {language === 'en'
                ? 'Please verify your project tracking code or contact your account manager directly.'
                : 'يرجى التحقق من صحة الرمز المدخل أو التواصل مع مدير حسابك لتزويدك بالرمز المعتمد.'}
            </p>
          </div>
        )}

        {/* 2. PROJECT LIVE DASHBOARD */}
        {project && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Project Card */}
            <div className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 border-2 border-brand-green/40 shadow-2xl space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-green/20 text-brand-green font-mono font-bold">
                      {project.code}
                    </span>
                    {getStatusBadge(project.status)}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {project.name || project.projectTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {language === 'en' ? 'Client: ' : 'العميل: '}<strong>{project.clientName}</strong> • {project.serviceType}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => exportProjectStatusPdf(project)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors w-fit"
                >
                  <Download className="w-4 h-4 text-brand-green" />
                  <span>{language === 'en' ? 'Export Status PDF' : 'تحميل تقرير الحالة PDF'}</span>
                </button>
              </div>

              {/* Progress Bar & Key Numbers */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className="text-slate-300">{t('tracker.progress')}</span>
                  <span className="font-mono text-brand-green text-lg">{project.progress || 0}%</span>
                </div>
                <div className="w-full bg-dark-950 rounded-full h-3 overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-brand-green to-brand-cyan h-full rounded-full transition-all duration-500 shadow-neon"
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Dates & Manager Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-500 block">{language === 'en' ? 'Kickoff Date' : 'تاريخ البدء'}</span>
                  <span className="text-white font-mono font-bold">{project.startDate || '2025-08-01'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">{language === 'en' ? 'Target Delivery' : 'الموعد المستهدف'}</span>
                  <span className="text-brand-green font-mono font-bold">{project.targetEndDate || '2025-09-15'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">{language === 'en' ? 'Project Manager' : 'مدير المشروع'}</span>
                  <span className="text-white font-bold">{project.projectManager || 'م. أحمد السعيد'}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">{language === 'en' ? 'Direct Contact' : 'التواصل المباشر'}</span>
                  <span className="text-slate-300 font-mono dir-ltr block">{project.managerPhone || '+966 56 812 1909'}</span>
                </div>
              </div>

            </div>

            {/* Milestones Roadmap */}
            <div className={`p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-green" />
                <span>{t('tracker.milestones')}</span>
              </h4>

              <div className="space-y-4">
                {(project.milestones || []).map((m, idx) => {
                  const isDone = m.status === 'completed';
                  const isInProgress = m.status === 'in_progress';

                  return (
                    <div
                      key={m.id || idx}
                      className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-brand-green/5 border-brand-green/30 text-slate-200'
                          : isInProgress
                          ? 'bg-dark-950 border-cyan-500/40 text-white shadow-sm'
                          : 'bg-dark-950/60 border-white/5 text-slate-400'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                          isDone
                            ? 'bg-brand-green text-dark-950 shadow-neon'
                            : isInProgress
                            ? 'bg-cyan-500 text-dark-950 animate-pulse'
                            : 'bg-white/5 text-slate-500'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>

                        <div className="space-y-1">
                          <h5 className="font-bold text-white text-sm sm:text-base">{m.title}</h5>
                          <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                        </div>
                      </div>

                      {/* Status / Client Approval Button */}
                      <div className="flex items-center gap-3 shrink-0">
                        {isDone ? (
                          <span className="text-xs font-bold text-brand-green flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{language === 'en' ? 'Completed' : 'مكتملة ومسلّمة'}</span>
                          </span>
                        ) : isInProgress ? (
                          <button
                            type="button"
                            onClick={() => handleApproveMilestone(m.id)}
                            disabled={approvingId === m.id}
                            className="px-4 py-2 rounded-xl bg-brand-green hover:bg-emerald-400 text-dark-950 text-xs font-bold flex items-center gap-1.5 shadow-neon transition-all"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{approvingId === m.id ? (language === 'en' ? 'Approving...' : 'جاري الاعتماد...') : (language === 'en' ? 'Approve Milestone' : 'اعتماد المرحلة')}</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium">
                            {language === 'en' ? 'Upcoming' : 'قادمة'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completed Deliverables & Files */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className={`p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-brand-green" />
                  <span>{t('tracker.deliverables')}</span>
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  {project.deliverables.map((deliv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-dark-950 border border-white/5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-brand-green">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">{deliv.name || deliv.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{deliv.size || 'ZIP • 24MB'}</span>
                        </div>
                      </div>
                      <a
                        href={deliv.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-dark-950 text-xs font-bold transition-all"
                      >
                        {language === 'en' ? 'Download' : 'تنزيل'}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Notes & Feedback Submission */}
            <div className={`p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-green" />
                <span>{language === 'en' ? 'Client Feedback & Support Notes' : 'إرسال ملاحظة أو استفسار لفريق العمل'}</span>
              </h4>

              <form onSubmit={handleAddClientNote} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Your Name (Optional)' : 'اسمك (اختياري)'}
                    value={noteAuthor}
                    onChange={(e) => setNoteAuthor(e.target.value)}
                    className="bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder={language === 'en' ? 'Write your feedback, question, or change request here...' : 'اكتب ملاحظتك، استفسارك، أو التعديل المطلوب هنا وسيتم إشعار فريق المشروع فوراً...'}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-green"
                />

                <button
                  type="submit"
                  disabled={sendingNote}
                  className="px-6 py-3 rounded-xl bg-brand-green hover:bg-emerald-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-neon transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sendingNote ? t('common.sending') : (language === 'en' ? 'Send Feedback To Team' : 'إرسال الملاحظة')}</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
