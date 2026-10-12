import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, Loader2 } from 'lucide-react';
import { api } from '../../../services/api';
import { useLanguage } from '../../../context/LanguageContext';

export default function AdminImageUpload({
  label,
  value,
  onChange,
  required = false,
  helperText
}) {
  const { language, isRTL } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState('url'); // 'url' or 'upload'

  const defaultLabel = label || (language === 'en' ? 'Item Image' : 'صورة العنصر');
  const defaultHelper = helperText || (language === 'en' ? 'Paste image URL directly or upload a new file from your device' : 'يمكنك إدخال رابط الصورة مباشرة أو رفع ملف جديد من جهازك');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadFile(file);
      if (res.success && res.fileUrl) {
        onChange(res.fileUrl);
      } else {
        alert(res.message || (language === 'en' ? 'Image upload failed' : 'فشل رفع الصورة'));
      }
    } catch (err) {
      alert(language === 'en' ? 'Server error during image upload' : 'حدث خطأ أثناء رفع الصورة إلى الخادم');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300">
          {defaultLabel} {required && <span className="text-rose-400">*</span>}
        </label>
        
        <div className="flex items-center gap-1 bg-dark-950 p-0.5 rounded-lg border border-white/10 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              mode === 'url' ? 'bg-brand-green/20 text-brand-green font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'URL Link' : 'رابط'}
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              mode === 'upload' ? 'bg-brand-green/20 text-brand-green font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Upload File' : 'رفع ملف'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Preview Thumbnail */}
        <div className="w-16 h-16 rounded-2xl bg-dark-950 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center relative group">
          {value ? (
            <img
              src={value}
              alt={language === 'en' ? 'Preview' : 'معاينة'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/hero_team.jpg';
              }}
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-600" />
          )}
        </div>

        {/* Input Controls */}
        <div className="flex-1">
          {mode === 'url' ? (
            <div className="relative">
              <LinkIcon className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500`} />
              <input
                type="text"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={language === 'en' ? 'https://example.com/image.jpg or /assets/...' : 'https://example.com/image.jpg أو /assets/...'}
                className={`w-full bg-dark-950 border border-white/10 rounded-xl ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-2.5 text-sm text-white placeholder-slate-500 font-montserrat dir-ltr focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30`}
              />
            </div>
          ) : (
            <label className="w-full border-2 border-dashed border-white/10 hover:border-brand-green/40 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-dark-950/60 hover:bg-brand-green/5 transition-all text-xs font-bold text-slate-300">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 text-brand-green animate-spin" />
                  <span>{language === 'en' ? 'Uploading image...' : 'جارٍ رفع الصورة...'}</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-brand-green" />
                  <span>{language === 'en' ? 'Click to select image from device' : 'اضغط لاختيار صورة من جهازك'}</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {defaultHelper && (
        <p className="text-[11px] text-slate-500">{defaultHelper}</p>
      )}
    </div>
  );
}
