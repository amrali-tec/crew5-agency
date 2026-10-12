import React from 'react';

export default function AdminInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  icon: Icon,
  dir = 'rtl',
  disabled = false,
  className = '',
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

      <div className="relative">
        {Icon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          type={type}
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          dir={dir}
          className={`
            w-full bg-dark-950 border rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500
            transition-all duration-200 focus:outline-none focus:ring-1
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pr-10' : ''}
            ${dir === 'ltr' ? 'font-montserrat text-right' : ''}
            ${error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-white/10 hover:border-white/20 focus:border-brand-green focus:ring-brand-green/30 focus:shadow-neon'
            }
          `}
          {...props}
        />
      </div>

      {helperText && !error && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}

      {error && (
        <p className="text-[11px] text-rose-400 font-semibold">{error}</p>
      )}
    </div>
  );
}
