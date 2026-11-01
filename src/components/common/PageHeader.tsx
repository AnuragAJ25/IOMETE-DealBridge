import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface PageHeaderProps {
  badge?: string;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "indigo";
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageHeader({
  badge,
  badgeText,
  badgeVariant = "default",
  title,
  subtitle,
  actions,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  const displayBadge = badge || badgeText;
  return (
    <div className={cn("pb-6 mb-6 border-b border-slate-200/80", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {b.href ? (
                <a href={b.href} className="hover:text-slate-700 transition-colors">
                  {b.label}
                </a>
              ) : (
                <span className="text-slate-600 font-medium">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          {displayBadge && (
            <div className="mb-2">
              <Badge variant={badgeVariant} size="sm">
                {displayBadge}
              </Badge>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
