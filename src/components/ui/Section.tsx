import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

type HeadingProps = {
  title: ReactNode;
  text?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  title,
  text,
  tone = "light",
}: HeadingProps) {
  const heading = tone === "dark" ? "text-ivory" : "text-ink";
  const body = tone === "dark" ? "text-white/70" : "text-muted";

  return (
    <div className="max-w-2xl">
      <h2
        className={`font-serif text-[2.65rem] leading-[0.92] tracking-[-0.035em] md:text-[4.15rem] ${heading}`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-5 max-w-xl text-[1.05rem] leading-relaxed md:text-lg ${body}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
