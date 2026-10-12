import React from 'react';

export const CARD_HOVER_THEMES = [
  {
    name: 'emerald',
    hoverBorder: 'hover:border-emerald-400/60',
    hoverShadow: 'hover:shadow-[0_16px_40px_-10px_rgba(16,185,129,0.35)]',
    glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)] border-emerald-400/30',
    accentText: 'group-hover:text-emerald-400',
    iconHover: 'group-hover:bg-emerald-500 group-hover:text-dark-950 group-hover:border-emerald-400',
    topLine: 'from-emerald-400 via-emerald-500 to-transparent'
  },
  {
    name: 'cyan',
    hoverBorder: 'hover:border-cyan-400/60',
    hoverShadow: 'hover:shadow-[0_16px_40px_-10px_rgba(6,182,212,0.35)]',
    glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)] border-cyan-400/30',
    accentText: 'group-hover:text-cyan-400',
    iconHover: 'group-hover:bg-cyan-500 group-hover:text-dark-950 group-hover:border-cyan-400',
    topLine: 'from-cyan-400 via-cyan-500 to-transparent'
  },
  {
    name: 'purple',
    hoverBorder: 'hover:border-purple-400/60',
    hoverShadow: 'hover:shadow-[0_16px_40px_-10px_rgba(168,85,247,0.35)]',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)] border-purple-400/30',
    accentText: 'group-hover:text-purple-400',
    iconHover: 'group-hover:bg-purple-500 group-hover:text-dark-950 group-hover:border-purple-400',
    topLine: 'from-purple-400 via-purple-500 to-transparent'
  },
  {
    name: 'rose',
    hoverBorder: 'hover:border-rose-400/60',
    hoverShadow: 'hover:shadow-[0_16px_40px_-10px_rgba(244,63,94,0.35)]',
    glow: 'shadow-[0_0_25px_rgba(244,63,94,0.25)] border-rose-400/30',
    accentText: 'group-hover:text-rose-400',
    iconHover: 'group-hover:bg-rose-500 group-hover:text-dark-950 group-hover:border-rose-400',
    topLine: 'from-rose-400 via-rose-500 to-transparent'
  },
  {
    name: 'amber',
    hoverBorder: 'hover:border-amber-400/60',
    hoverShadow: 'hover:shadow-[0_16px_40px_-10px_rgba(251,191,36,0.35)]',
    glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)] border-amber-400/30',
    accentText: 'group-hover:text-amber-400',
    iconHover: 'group-hover:bg-amber-500 group-hover:text-dark-950 group-hover:border-amber-400',
    topLine: 'from-amber-400 via-amber-500 to-transparent'
  },
  {
    name: 'blue',
    hoverBorder: 'hover:border-sky-400/60',
    hoverShadow: 'hover:shadow-[0_16px_40px_-10px_rgba(14,165,233,0.35)]',
    glow: 'shadow-[0_0_25px_rgba(14,165,233,0.25)] border-sky-400/30',
    accentText: 'group-hover:text-sky-400',
    iconHover: 'group-hover:bg-sky-500 group-hover:text-dark-950 group-hover:border-sky-400',
    topLine: 'from-sky-400 via-sky-500 to-transparent'
  }
];

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  colorIndex = null,
  color = null,
  glow = false,
  onClick,
  as: Component = 'div',
  ...props
}) {
  // Determine Theme
  let theme = null;
  if (color) {
    theme = CARD_HOVER_THEMES.find(t => t.name === color) || CARD_HOVER_THEMES[0];
  } else if (colorIndex !== null && colorIndex !== undefined) {
    theme = CARD_HOVER_THEMES[Math.abs(Number(colorIndex)) % CARD_HOVER_THEMES.length];
  }

  const hoverClasses = hoverEffect
    ? theme
      ? `transition-all duration-300 ${theme.hoverBorder} ${theme.hoverShadow} hover:-translate-y-2`
      : 'transition-all duration-300 hover:border-brand-green/50 hover:shadow-[0_16px_40px_-10px_rgba(0,230,118,0.3)] hover:-translate-y-2'
    : '';

  const glowClass = glow
    ? theme ? theme.glow : 'shadow-neon border-brand-green/30'
    : '';

  return (
    <Component
      onClick={onClick}
      className={`
        relative rounded-3xl p-6 md:p-8 bg-dark-card border border-white/[0.08] backdrop-blur-xl group
        ${hoverClasses}
        ${glowClass}
        ${className}
      `}
      {...props}
    >
      {/* Subtle top ambient glow gradient on hover */}
      {theme && (
        <div className={`absolute top-0 right-6 left-6 h-[2px] bg-gradient-to-r ${theme.topLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full`} />
      )}
      {children}
    </Component>
  );
}
