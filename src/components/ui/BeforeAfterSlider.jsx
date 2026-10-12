import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage = '/assets/project_branding_nokhabat.jpg',
  afterImage = '/assets/hero_bg_3d.jpg',
  beforeLabel = 'قبل التطوير',
  afterLabel = 'بعد لمسة كرو فايف ✨',
  title = '',
  subtitle = '',
  className = '',
  aspectRatio = 'aspect-[16/9]'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center space-y-1 mb-4">
          {title && <h4 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-green" />
            <span>{title}</span>
          </h4>}
          {subtitle && <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-3xl border border-white/10 select-none shadow-2xl bg-dark-950 cursor-ew-resize`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* AFTER IMAGE (Background / Full Width) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* AFTER BADGE */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-brand-green/90 text-dark-950 text-xs font-black shadow-neon backdrop-blur-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{afterLabel}</span>
        </div>

        {/* BEFORE IMAGE (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%'
            }}
          />
          {/* Subtle dark tint for the 'Before' image to emphasize contrast */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* BEFORE BADGE */}
        <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-dark-950/80 border border-white/20 text-slate-300 text-xs font-bold backdrop-blur-md">
          {beforeLabel}
        </div>

        {/* SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-gradient-to-b from-brand-green via-white to-brand-green cursor-ew-resize shadow-[0_0_15px_rgba(0,230,153,0.8)]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Center Circular Drag Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-900 border-2 border-brand-green text-brand-green flex items-center justify-center shadow-neon hover:scale-110 active:scale-95 transition-transform">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-dark-950/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 pointer-events-none">
          اسحب المؤشر للمقارنة التفاعلية ↔
        </div>
      </div>
    </div>
  );
}
