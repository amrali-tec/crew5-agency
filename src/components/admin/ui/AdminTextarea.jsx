import React from 'react';

export default function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  error,
  helperText,
  disabled = false,
  className = '',
  dir = 'rtl',
  name,
  id,
  ...props
}) {
  return (
    <div className={`space-y-1.5 text-right ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        dir={dir}
        className={`
          w-full bg-dark-950 border rounded-xl p-3.5 text-sm text-white placeholder-slate-500
          transition-all duration-200 focus:outline-none focus:ring-1 resize-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${dir === 'ltr' ? 'font-mono text-right' : ''}
          ${error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-white/10 hover:border-white/20 focus:border-brand-green focus:ring-brand-green/30 focus:shadow-neon'
          }
        `}
        {...props}
      />

      {helperText && !error && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}

      {error && (
        <p className="text-[11px] text-rose-400 font-semibold">{error}</p>
      )}
    </div>
  );
}
