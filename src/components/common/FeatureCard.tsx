import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check } from "lucide-react";

interface FeatureCardProps {
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "indigo";
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
  bulletPoints?: string[];
  onClick?: () => void;
  actionText?: string;
  highlighted?: boolean;
  className?: string;
}

export function FeatureCard({
  icon,
  badge,
  badgeVariant = "default",
  title,
  description,
  metrics,
  bulletPoints,
  onClick,
  actionText,
  highlighted,
  className,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-white p-6 transition-all duration-200 border",
        highlighted
          ? "border-sky-500/50 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/20"
          : "border-slate-200/80 hover:border-sky-300 hover:shadow-md hover:shadow-slate-200/50",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          {icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              {icon}
            </div>
          )}
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors tracking-tight">
          {title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          {description}
        </p>

        {metrics && metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-50/70 p-2 rounded-lg">
                <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="text-sm font-bold text-slate-800">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
            {bulletPoints.map((bp, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {actionText && (
        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-sky-600 group-hover:text-sky-700 pt-2">
          <span>{actionText}</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );
}
