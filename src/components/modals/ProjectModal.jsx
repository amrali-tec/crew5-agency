import React, { useEffect } from 'react';
import { X, ExternalLink, Tag, Calendar, User, CheckCircle2, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { localizeProject } from '../../utils/localize';

export default function ProjectModal({ project: rawProject, isOpen, onClose }) {
  const { language, t, isRTL } = useLanguage();
  const project = localizeProject(rawProject, language);

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

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-dark-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Box */}
      <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 custom-scrollbar ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-brand-green/40 transition-colors z-20 cursor-pointer`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image */}
        <div className="relative rounded-2xl overflow-hidden mb-6 border border-white/10 aspect-video">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
            <Badge variant="green">{project.category}</Badge>
          </div>
        </div>

        {/* Project Info Header */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            {project.client && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-green" />
                <span>{t('projectModal.client')}: {project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-green" />
                <span>{t('projectModal.year')}: {project.year}</span>
              </div>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {project.title}
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {project.fullDetails && (
            <div className="p-4 rounded-xl bg-dark-850 border border-white/[0.06] text-slate-300 text-sm leading-relaxed">
              <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>{t('projectModal.scopeTitle')}:</span>
              </h4>
              <p>{project.fullDetails}</p>
            </div>
          )}
        </div>

        {/* Results / Key Metrics */}
        {project.results && project.results.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-brand-green/5 border border-brand-green/20">
            {project.results.map((res, i) => (
              <div key={i} className="text-center">
                <div className="font-montserrat font-black text-brand-green text-lg sm:text-xl">
                  {res.value}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {res.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-slate-400">{t('projectModal.tags')}:</span>
            {project.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Button
            to="/contact"
            variant="primary"
            size="md"
            icon={ArrowLeft}
            onClick={onClose}
          >
            {t('projectModal.requestSimilar')}
          </Button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            {t('projectModal.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
