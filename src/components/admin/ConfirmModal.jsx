import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText, cancelText, isDangerous = true }) {
  const { language, isRTL } = useLanguage();
  if (!isOpen) return null;

  const defaultConfirmText = confirmText || (language === 'en' ? 'Yes, Confirm' : 'نعم، تأكيد');
  const defaultCancelText = cancelText || (language === 'en' ? 'Cancel' : 'إلغاء');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onCancel}></div>
      <div className={`relative w-full max-w-md bg-dark-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
        
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {message}
        </p>

        <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-end'} gap-3 pt-4 border-t border-white/[0.08]`}>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
          >
            {defaultCancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer ${
              isDangerous
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-brand-green hover:bg-[#00FF85] text-dark-950 shadow-neon'
            }`}
          >
            {defaultConfirmText}
          </button>
        </div>

      </div>
    </div>
  );
}
