import { mediaKit } from "@/data/media-kit";
import { AudienceFigure } from "@/components/sections/AudienceFigure";
import { CountUp, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Audience() {
  const { audience } = mediaKit;

  return (
    <section
      id="publico"
      className="scroll-mt-24 overflow-hidden bg-blush-soft pt-24 md:pt-32"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="lg:col-span-6 lg:pb-28">
            <SectionHeading title={audience.title} text={audience.text} />

            <div className="mt-12 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
              <p>
                <span className="block font-serif text-[5.5rem] leading-[0.78] tracking-[-0.05em] text-ink md:text-[7rem]">
                  <CountUp value={audience.stat} />
                </span>
                <span className="mt-4 block text-[11px] tracking-[0.22em] text-stone uppercase">
                  {audience.statLabel}
                </span>
              </p>
              <blockquote className="font-serif text-[1.6rem] leading-snug text-ink italic sm:border-l sm:border-ink/15 sm:pl-10 md:text-[1.9rem]">
                “{audience.quote}”
              </blockquote>
            </div>

            <Stagger as="ul" className="mt-10 flex flex-wrap gap-2" stagger={0.05}>
              {audience.pillars.map((pillar) => (
                <StaggerItem
                  as="li"
                  key={pillar}
                  className="rounded-full bg-white/75 px-4 py-2 text-[12px] tracking-[0.06em] text-ink ring-1 ring-ink/8 transition-colors duration-300 hover:bg-white hover:ring-ink/20"
                >
                  {pillar}
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <div className="lg:col-span-6">
            <AudienceFigure src={audience.image} alt={audience.imageAlt} />
          </div>
        </div>
      </Container>
    </section>
  );
}
