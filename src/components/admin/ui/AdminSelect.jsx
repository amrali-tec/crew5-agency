import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function AdminSelect({
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  helperText,
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
        <select
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full bg-dark-950 border rounded-xl py-2.5 pr-4 pl-10 text-sm text-white
            transition-all duration-200 focus:outline-none focus:ring-1 appearance-none cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-white/10 hover:border-white/20 focus:border-brand-green focus:ring-brand-green/30'
            }
          `}
          {...props}
        >
          {options.map((opt, idx) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={optVal} className="bg-dark-900 text-white py-2">
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
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
