import React from 'react';

export default function Badge({ children, variant = 'green', className = '', icon: Icon, dot = false }) {
  const variants = {
    green: 'bg-brand-green/10 text-brand-green border-brand-green/30 shadow-neon/30',
    cyan: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30 shadow-neon-cyan/30',
    indigo: 'bg-brand-indigo/10 text-brand-indigo-light border-brand-indigo/30 shadow-neon-indigo/30',
    amber: 'bg-brand-amber/10 text-brand-amber-light border-brand-amber/30 shadow-neon-amber/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/50',
    outline: 'bg-white/5 text-slate-300 border-white/10'
  };

  const dotColors = {
    green: 'bg-brand-green',
    cyan: 'bg-brand-cyan',
    indigo: 'bg-brand-indigo',
    amber: 'bg-brand-amber',
    purple: 'bg-purple-400',
    slate: 'bg-slate-400',
    outline: 'bg-brand-green'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-md transition-all ${variants[variant] || variants.green} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-brand-green'} animate-pulse`} />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
