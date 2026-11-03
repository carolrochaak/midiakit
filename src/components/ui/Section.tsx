import type { ReactNode } from "react";
import { LineMask } from "@/components/ui/Motion";

type Tone = "light" | "dark";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[78rem] px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const color = tone === "dark" ? "text-gold" : "text-marsala";

  return (
    <p
      className={`flex items-center gap-4 text-[11px] font-bold tracking-[0.32em] uppercase ${color} ${className}`}
    >
      <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold/70" />
      {children}
    </p>
  );
}

export function Accent({
  text,
  words = 1,
  tone = "light",
}: {
  text: string;
  words?: number;
  tone?: Tone;
}) {
  const parts = text.split(" ");
  const head = parts.slice(0, -words).join(" ");
  const tail = parts.slice(-words).join(" ");
  const color = tone === "dark" ? "text-foil" : "text-marsala";

  return (
    <>
      {head ? `${head} ` : null}
      <em className={`pr-[0.06em] italic ${color}`}>{tail}</em>
    </>
  );
}

export const watermark =
  "pointer-events-none absolute font-serif leading-none italic text-transparent [-webkit-text-stroke:1px_rgba(199,164,107,0.22)]";

export const titleClass =
  "font-serif text-[clamp(2.55rem,6.2vw,4.6rem)] leading-[1.02] font-light tracking-[-0.012em]";

export function SectionHead({
  eyebrow,
  title,
  accent = 1,
  text,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: string;
  accent?: number;
  text?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const heading = tone === "dark" ? "text-ivory" : "text-ink";
  const body = tone === "dark" ? "text-ivory/85" : "text-ink-soft";

  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16 ${className}`}>
      <div className="lg:col-span-7">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2 className={`mt-6 ${titleClass} ${heading}`}>
          <LineMask>
            <Accent text={title} words={accent} tone={tone} />
          </LineMask>
        </h2>
      </div>
      {text ? (
        <div className="border-t border-gold/35 pt-5 lg:col-span-5 lg:mb-3">
          <p className={`font-serif text-[1.3rem] leading-snug italic md:text-[1.45rem] ${body}`}>
            {text}
          </p>
        </div>
      ) : null}
    </div>
  );
}
