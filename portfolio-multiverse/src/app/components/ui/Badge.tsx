"use client";

type Variant = "default" | "outline" | "glow";

interface BadgeProps {
  label: string;
  variant?: Variant;
  className?: string;
}

const VARIANT_CLASS: Record<Variant, string> = {
  default: "bg-surface border border-border text-text-muted",
  outline: "bg-transparent border border-primary text-primary",
  glow:    "bg-primary/10 border border-primary text-primary shadow-theme-glow",
};

export function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center text-xs font-mono px-2 py-0.5 rounded-theme transition-colors",
        VARIANT_CLASS[variant],
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
