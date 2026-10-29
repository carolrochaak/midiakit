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
      : "border-ink/12 bg-white/60 text-ink";
  const caption = tone === "dark" ? "text-white/50" : "text-stone";

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
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
