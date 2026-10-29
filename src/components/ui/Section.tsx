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

const headingTone = {
  light: { heading: "text-ink", body: "text-muted" },
  dark: { heading: "text-ivory", body: "text-white/70" },
};

export function SectionHeading({
  title,
  text,
  tone = "light",
}: HeadingProps) {
  const { heading, body } = headingTone[tone];

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

export function SplitHeading({
  title,
  text,
  aside,
  tone = "light",
}: HeadingProps & { aside?: ReactNode }) {
  const { heading, body } = headingTone[tone];

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
      <h2
        className={`font-serif text-[2.65rem] leading-[0.92] tracking-[-0.035em] md:text-[4.4rem] lg:col-span-7 ${heading}`}
      >
        {title}
      </h2>
      <div className="lg:col-span-5 lg:pb-2">
        {text ? (
          <p className={`max-w-md text-[1.05rem] leading-relaxed md:text-lg ${body}`}>
            {text}
          </p>
        ) : null}
        {aside}
      </div>
    </div>
  );
}

export function BlockTitle({
  children,
  icon,
  tone = "light",
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "light" | "dark";
}) {
  const rule = tone === "dark" ? "bg-white/15" : "bg-ink/15";

  return (
    <div className="flex items-center gap-4">
      {icon}
      <h3 className="font-serif text-[1.85rem] leading-none tracking-tight md:text-[2.2rem]">
        {children}
      </h3>
      <span aria-hidden="true" className={`h-px min-w-6 flex-1 ${rule}`} />
    </div>
  );
}
