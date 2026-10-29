import { mediaKit } from "@/data/media-kit";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SplitHeading } from "@/components/ui/Section";

export function Craft() {
  const { craft } = mediaKit;

  return (
    <section id="universo" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <SplitHeading title={craft.title} text={craft.text} />
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <ol
            className="grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            {craft.pillars.map((pillar, index) => (
              <li
                key={pillar.title}
                className="bg-ivory p-6 transition-colors duration-300 hover:bg-blush-soft md:p-8"
              >
                <span className="font-serif text-[15px] text-blush-deep italic tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-serif text-[1.85rem] leading-none tracking-tight text-ink md:mt-14 md:text-[2.1rem]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {pillar.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-4">
          <div
            className="grid gap-10 bg-blush-deep px-6 py-9 text-ivory md:px-10 md:py-12 lg:grid-cols-12 lg:gap-12"
            style={{ borderRadius: "var(--radius-media)" }}
          >
            <h3 className="max-w-xs font-serif text-[2.2rem] leading-[0.95] tracking-[-0.02em] md:text-[2.8rem] lg:col-span-4">
              {craft.favoritesTitle}
            </h3>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {craft.favorites.map((item) => (
                <li key={item.label} className="border-t border-white/15 py-5">
                  <p className="text-[11px] font-medium tracking-[0.18em] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
