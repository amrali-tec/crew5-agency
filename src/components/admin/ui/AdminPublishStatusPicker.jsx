import React from 'react';
import { Globe, Archive, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatScheduleDate, getPublishStatus } from '../../../utils/publishUtils';
import { useLanguage } from '../../../context/LanguageContext';

/**
 * Status Badge for Admin Tables and Cards
 */
export function PublishStatusBadge({ status, scheduledAt, isPublished, isEnabled }) {
  const { language } = useLanguage();
  const normStatus = getPublishStatus({ status, isPublished, isEnabled });

  if (normStatus === 'archived') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Archive className="w-3 h-3" />
        <span>{language === 'en' ? 'Archived (Draft)' : 'مؤرشف (مسودة)'}</span>
      </span>
    );
  }

  if (normStatus === 'scheduled') {
    const formatted = scheduledAt ? formatScheduleDate(scheduledAt) : '';
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" title={scheduledAt ? (language === 'en' ? `Scheduled on: ${formatted}` : `مجدول في: ${formatted}`) : (language === 'en' ? 'Scheduled' : 'مجدول')}>
        <Clock className="w-3 h-3 animate-pulse" />
        <span>{language === 'en' ? `Scheduled ${formatted ? `(${formatted})` : ''}` : `مجدول ${formatted ? `(${formatted})` : ''}`}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      <Globe className="w-3 h-3" />
      <span>{language === 'en' ? 'Published & Live' : 'منشور ومباشر'}</span>
    </span>
  );
}

/**
 * Interactive 3-State Publishing Selector with Datetime Picker & Presets
 */
export default function AdminPublishStatusPicker({
  status = 'published',
  onChangeStatus,
  scheduledAt = '',
  onChangeScheduledAt,
  label,
  helperText
}) {
  const { language, isRTL } = useLanguage();
  const currentStatus = status || 'published';

  const defaultLabel = label || (language === 'en' ? 'Publishing Status & Visibility' : 'حالة النشر والظهور');

  // Helper to set presets
  const applyPreset = (hoursOffset, daysOffset = 0) => {
    const now = new Date();
    if (daysOffset > 0) {
      now.setDate(now.getDate() + daysOffset);
      now.setHours(9, 0, 0, 0); // 9:00 AM
    } else {
      now.setHours(now.getHours() + hoursOffset);
    }
    // format as YYYY-MM-DDTHH:MM for datetime-local input
    const pad = (n) => String(n).padStart(2, '0');
    const localIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    onChangeScheduledAt(localIso);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <span>{defaultLabel}</span>
          <span className="text-brand-green font-normal text-[11px]">
            * {language === 'en' ? '(Publish / Archive / Schedule)' : '(نشر / أرشفة / جدولة)'}
          </span>
        </label>
        {helperText && <span className="text-[11px] text-slate-400">{helperText}</span>}
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. PUBLISHED */}
        <button
          type="button"
          onClick={() => onChangeStatus('published')}
          className={`p-3.5 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between cursor-pointer ${
            currentStatus === 'published'
              ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-white'
              : 'bg-dark-950/80 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              currentStatus === 'published' ? 'bg-emerald-500 text-dark-950 shadow-neon' : 'bg-white/5 text-emerald-400'
            }`}>
              <Globe className="w-4 h-4" />
            </div>
            {currentStatus === 'published' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {language === 'en' ? 'Immediate Publish' : 'نشر فوري ومباشر'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {language === 'en' ? 'Visible to all visitors now' : 'ظاهر ومتاح لجميع زوار الموقع الآن'}
            </span>
          </div>
        </button>

        {/* 2. DRAFT / ARCHIVED */}
        <button
          type="button"
          onClick={() => onChangeStatus('archived')}
          className={`p-3.5 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between cursor-pointer ${
            currentStatus === 'archived'
              ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)] text-white'
              : 'bg-dark-950/80 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              currentStatus === 'archived' ? 'bg-amber-500 text-dark-950 shadow-neon' : 'bg-white/5 text-amber-400'
            }`}>
              <Archive className="w-4 h-4" />
            </div>
            {currentStatus === 'archived' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {language === 'en' ? 'Draft / Hidden' : 'مسودة / مخفي'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {language === 'en' ? 'Archived and hidden from visitors' : 'مؤرشف ومخفي عن الزوار'}
            </span>
          </div>
        </button>

        {/* 3. SCHEDULED */}
        <button
          type="button"
          onClick={() => {
            onChangeStatus('scheduled');
            if (!scheduledAt) applyPreset(4); // Default to +4 hours
          }}
          className={`p-3.5 rounded-2xl border ${isRTL ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between cursor-pointer ${
            currentStatus === 'scheduled'
              ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white'
              : 'bg-dark-950/80 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              currentStatus === 'scheduled' ? 'bg-cyan-500 text-dark-950 shadow-neon' : 'bg-white/5 text-cyan-400'
            }`}>
              <Clock className="w-4 h-4" />
            </div>
            {currentStatus === 'scheduled' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {language === 'en' ? 'Scheduled Publish' : 'نشر مجدول آلياً'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {language === 'en' ? 'Auto-publishes at exact time' : 'يُنشر تلقائياً في التوقيت المحدد'}
            </span>
          </div>
        </button>
      </div>

      {/* Scheduled Datetime Picker & Quick Presets (Only visible when scheduled is selected) */}
      {currentStatus === 'scheduled' && (
        <div className="p-4 rounded-2xl bg-dark-950 border border-cyan-500/30 space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'en' ? 'Select Target Publish Date & Time:' : 'حدد تاريخ ووقت النشر المستهدف:'}</span>
              </label>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'The item will stay hidden until this time passes, then auto-publishes.'
                  : 'سيبقى العنصر مخفياً حتى يحين هذا الوقت ليتحول إلى منشور تلقائياً.'}
              </p>
            </div>

            <input
              type="datetime-local"
              value={scheduledAt || ''}
              onChange={(e) => onChangeScheduledAt(e.target.value)}
              className="bg-dark-900 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-montserrat outline-none"
            />
          </div>

          {/* Quick Presets */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-slate-500">{language === 'en' ? 'Quick Presets:' : 'خيارات سريعة:'}</span>
            <button
              type="button"
              onClick={() => applyPreset(2)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-[11px] text-slate-300 border border-white/5 transition-colors cursor-pointer"
            >
              {language === 'en' ? 'After 2 hours' : 'بعد ساعتين'}
            </button>
            <button
              type="button"
              onClick={() => applyPreset(6)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-[11px] text-slate-300 border border-white/5 transition-colors cursor-pointer"
            >
              {language === 'en' ? 'After 6 hours' : 'بعد 6 ساعات'}
            </button>
            <button
              type="button"
              onClick={() => applyPreset(0, 1)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-[11px] text-slate-300 border border-white/5 transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Tomorrow 9:00 AM' : 'غداً 9:00 صباحاً'}
            </button>
            <button
              type="button"
              onClick={() => applyPreset(0, 2)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-[11px] text-slate-300 border border-white/5 transition-colors cursor-pointer"
            >
              {language === 'en' ? 'After 2 days' : 'بعد يومين'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
