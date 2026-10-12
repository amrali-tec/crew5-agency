import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';

export default function AdminTagsInput({
  label = 'الوسوم والكلمات الدلالية',
  tags = [],
  onChange,
  placeholder = 'أدخل الوسم واضغط Enter أو إضافة',
  helperText = 'تساعد الوسوم في تحسين السيو والفرز'
}) {
  const [inputVal, setInputVal] = useState('');

  const addTag = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputVal('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-2 text-right">
      {label && (
        <label className="block text-xs font-bold text-slate-300">
          {label}
        </label>
      )}

      {/* Input + Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-dark-950 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30"
          />
        </div>

        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-1 shrink-0 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة</span>
        </button>
      </div>

      {/* Tags Chips Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/30 text-xs font-semibold"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="hover:text-white rounded-full p-0.5 hover:bg-brand-green/20"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
