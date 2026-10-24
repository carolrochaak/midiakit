import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "light" | "ghost" | "ghostLight";
  className?: string;
};

const variants = {
  solid: "bg-ink text-ivory hover:bg-charcoal",
  light: "bg-ivory text-ink hover:bg-white",
  ghost:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  ghostLight:
    "border border-white/45 text-ivory hover:bg-ivory hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] transition duration-200 ease-out active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
