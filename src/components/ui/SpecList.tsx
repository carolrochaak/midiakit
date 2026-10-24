import type { ReactNode } from "react";

export type SpecRow = {
  title: string;
  text: string;
  meta?: ReactNode;
};

type SpecListProps = {
  items: ReadonlyArray<SpecRow>;
  title?: "serif" | "caps";
  tone?: "light" | "dark";
};

export function SpecList({
  items,
  title = "serif",
  tone = "light",
}: SpecListProps) {
  const line = tone === "dark" ? "border-white/12" : "border-ink/10";
  const name =
    title === "caps"
      ? "text-[11px] font-medium tracking-[0.18em] uppercase sm:col-span-4"
      : "font-serif text-[1.5rem] leading-tight tracking-tight sm:col-span-4 md:text-[1.7rem]";
  const nameColor = tone === "dark" ? "text-ivory" : "text-ink";
  const body = tone === "dark" ? "text-white/65" : "text-muted";

  return (
    <dl>
      {items.map((item) => (
        <div
          key={item.title}
          className={`grid gap-2 border-b py-5 first:border-t sm:grid-cols-12 sm:items-baseline sm:gap-8 ${line}`}
        >
          <dt className={`${name} ${nameColor}`}>{item.title}</dt>
          <dd className="sm:col-span-8">
            <p className={`text-[15px] leading-relaxed ${body}`}>{item.text}</p>
            {item.meta}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function SpecPills({
  items,
  tone = "light",
}: {
  items: ReadonlyArray<{ value: string; label: string }>;
  tone?: "light" | "dark";
}) {
  const chip =
    tone === "dark"
      ? "border-white/18 text-ivory"
      : "border-ink/12 text-ink";
  const caption = tone === "dark" ? "text-white/50" : "text-stone";

  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={`${item.value}-${item.label}`}
          className={`rounded-full border px-3.5 py-1.5 ${chip}`}
        >
          <span className="font-serif text-[1.35rem] leading-none">{item.value}</span>
          <span
            className={`ml-1.5 text-[10px] tracking-[0.14em] uppercase ${caption}`}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
