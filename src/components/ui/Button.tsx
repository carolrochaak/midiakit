import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "foil" | "wine" | "outlineLight" | "outlineDark";
  arrow?: boolean;
  className?: string;
};

const variants = {
  foil: "bg-foil text-wine shadow-[0_14px_34px_-16px_rgba(199,164,107,0.9)]",
  wine: "bg-marsala-deep text-ivory hover:bg-marsala",
  outlineLight:
    "border border-ivory/30 text-ivory hover:border-gold hover:text-gold-hi",
  outlineDark:
    "border border-ink/25 text-ink hover:border-marsala hover:text-marsala",
};

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "foil",
  arrow = false,
  className = "",
}: ButtonProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-center text-[11px] font-bold tracking-[0.2em] uppercase transition-[color,background-color,border-color,background-position] duration-300 active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
      {arrow ? (
        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </a>
  );
}
