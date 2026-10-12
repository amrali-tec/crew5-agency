import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../../ui/Button';

export default function AdminPageHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
  children
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {children}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="glow"
            size="sm"
            icon={ActionIcon}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
