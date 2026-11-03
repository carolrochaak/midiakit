import { mediaKit } from "@/data/media-kit";
import { pillarIcons } from "@/components/ui/Icons";
import { LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Container, SectionHead, watermark } from "@/components/ui/Section";

export function Craft() {
  const { craft } = mediaKit;

  return (
    <section
      id="universo"
      className="relative scroll-mt-20 overflow-hidden bg-onyx py-24 text-ivory md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_0%,rgba(122,30,67,0.8)_0%,transparent_70%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHead
            eyebrow="Universo"
            title={craft.title}
            accent={2}
            text={craft.text}
            tone="dark"
          />
        </Reveal>

        <Stagger
          as="ol"
          className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
          stagger={0.08}
        >
          {craft.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index % pillarIcons.length];
            const number = String(index + 1).padStart(2, "0");

            return (
              <StaggerItem
                as="li"
                key={pillar.title}
                className="group relative flex min-h-[16.5rem] flex-col overflow-hidden rounded-[1.4rem] border border-gold/20 bg-linear-to-b from-white/[0.07] to-white/[0.015] p-7 transition-[border-color,translate] duration-500 hover:-translate-y-1 hover:border-gold/50"
              >
                <span aria-hidden="true" className={`${watermark} -right-2 -bottom-9 text-[8.5rem]`}>
                  {number}
                </span>
                <div className="relative flex items-center justify-between">
                  <span className="font-serif text-[14px] text-gold italic">Nº {number}</span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-wine">
                    <Icon className="size-5" />
                  </span>
                </div>
                <h3 className="relative mt-16 font-serif text-[1.95rem] leading-none">
                  {pillar.title}
                </h3>
                <p className="relative mt-3 max-w-[18rem] text-[14px] leading-relaxed text-ivory/70">
                  {pillar.text}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-4 md:mt-5">
          <div className="grid gap-10 rounded-[1.6rem] border border-gold/20 bg-wine/60 px-6 py-9 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-12">
            <h3 className="font-serif text-[2.3rem] leading-[1.02] font-light md:text-[2.8rem] lg:col-span-4">
              <LineMask>
                <Accent text={craft.favoritesTitle} words={2} tone="dark" />
              </LineMask>
            </h3>
            <Stagger as="ul" className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8" stagger={0.06}>
              {craft.favorites.map((item) => (
                <StaggerItem as="li" key={item.label} className="border-t border-gold/15 py-5">
                  <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
                    <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                    {item.label}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ivory/75">{item.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
