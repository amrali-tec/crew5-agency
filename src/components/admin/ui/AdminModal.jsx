import React, { useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import Button from '../../ui/Button';

export default function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel = 'حفظ التغييرات',
  cancelLabel = 'إلغاء',
  loading = false,
  maxWidth = 'max-w-2xl',
  showFooter = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col bg-dark-900 border border-white/10 rounded-3xl shadow-2xl z-10 overflow-hidden`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/[0.08] shrink-0 bg-dark-900/90">
          <div>
            <h3 className="text-xl font-bold text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar space-y-5">
          {onSubmit ? (
            <form id="admin-modal-form" onSubmit={onSubmit} className="space-y-5">
              {children}
            </form>
          ) : (
            children
          )}
        </div>

        {/* Modal Footer */}
        {showFooter && (
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-white/[0.08] bg-dark-950/60 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors"
            >
              {cancelLabel}
            </button>

            {onSubmit && (
              <Button
                type="submit"
                form="admin-modal-form"
                variant="glow"
                size="md"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جارٍ الحفظ...</span>
                  </span>
                ) : (
                  submitLabel
                )}
              </Button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
