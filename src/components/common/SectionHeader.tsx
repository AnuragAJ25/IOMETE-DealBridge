import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  icon,
  badge,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 mt-0.5">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
              {title}
            </h2>
            {badge}
          </div>
          {description && (
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
