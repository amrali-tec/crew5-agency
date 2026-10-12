import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'end', // 'start' | 'end' | 'left' | 'right'
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const { isRTL } = useLanguage();
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full select-none focus:outline-none focus:ring-2 focus:ring-brand-green/50 disabled:opacity-50 disabled:cursor-not-allowed group';

  const variants = {
    primary: 'bg-brand-green text-dark-950 hover:bg-[#00FF85] hover:shadow-neon active:scale-[0.98]',
    secondary: 'bg-white/10 text-white hover:bg-white/15 hover:border-brand-green/40 border border-white/10 backdrop-blur-md active:scale-[0.98]',
    outline: 'border border-brand-green/60 text-brand-green hover:bg-brand-green/10 hover:border-brand-green hover:shadow-neon active:scale-[0.98]',
    glow: 'bg-gradient-to-r from-brand-green to-[#00B359] text-dark-950 shadow-neon hover:shadow-neon-lg hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-slate-300 hover:text-brand-green hover:bg-white/5 active:scale-[0.98]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    icon: 'p-3 text-lg'
  };

  // Determine logical icon placement
  let isIconAtStart = false;
  let isIconAtEnd = false;

  if (iconPosition === 'start') {
    isIconAtStart = true;
  } else if (iconPosition === 'end') {
    isIconAtEnd = true;
  } else if (iconPosition === 'right') {
    isIconAtStart = isRTL;
    isIconAtEnd = !isRTL;
  } else if (iconPosition === 'left') {
    isIconAtStart = !isRTL;
    isIconAtEnd = isRTL;
  }

  // Hover animation
  const hoverTranslateClass = isIconAtEnd
    ? (isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1')
    : (isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1');

  // If icon is ArrowLeft and we are in LTR, flip it 180 degrees so it points forward
  const iconFlipClass = (!isRTL && Icon && Icon.displayName === 'ArrowLeft') ? 'rotate-180' : '';

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && isIconAtStart && (
        <Icon className={`w-5 h-5 transition-transform duration-300 ${hoverTranslateClass} ${iconFlipClass}`} />
      )}
      <span>{children}</span>
      {Icon && isIconAtEnd && (
        <Icon className={`w-5 h-5 transition-transform duration-300 ${hoverTranslateClass} ${iconFlipClass}`} />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      {...props}
    >
      {content}
    </button>
  );
}
