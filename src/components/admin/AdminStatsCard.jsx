import React from 'react';
import Card from '../ui/Card';

export default function AdminStatsCard({ title, value, subtitle, icon: Icon, color = 'green', trend }) {
  const colorStyles = {
    green: 'bg-brand-green/10 text-brand-green border-brand-green/30 shadow-neon',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  return (
    <Card className="p-6 border-white/[0.08] flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 block mb-1">
          {title}
        </span>
        <div className="font-montserrat font-black text-2xl sm:text-3xl text-white">
          {value}
        </div>
        {subtitle && (
          <span className="text-[11px] text-slate-400 mt-1 block">
            {subtitle}
          </span>
        )}
      </div>

      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${colorStyles[color] || colorStyles.green}`}>
        {Icon && <Icon className="w-7 h-7" />}
      </div>
    </Card>
  );
}
