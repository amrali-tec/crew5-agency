import React from 'react';
import Badge from './Badge';
import { Sparkles } from 'lucide-react';

export default function SectionHeader({
  badge,
  badgeIcon = Sparkles,
  badgeVariant = 'green',
  title,
  highlight,
  highlightGradient = 'from-brand-green via-emerald-400 to-teal-300',
  subtitle,
  align = 'center',
  className = ''
}) {
  const alignClasses = {
    center: 'text-center items-center mx-auto',
    right: 'text-right items-start',
    left: 'text-left items-start',
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClasses[align] || alignClasses.center} ${className}`}>
      {badge && (
        <div className="mb-4">
          <Badge variant={badgeVariant} icon={badgeIcon} dot>
            {badge}
          </Badge>
        </div>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-[1.25]">
        {title}{' '}
        {highlight && (
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${highlightGradient} text-glow`}>
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
