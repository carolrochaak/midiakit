import { mediaKit } from "@/data/media-kit";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Audience() {
  const { audience } = mediaKit;

  return (
    <section
      id="publico"
      className="scroll-mt-24 bg-blush-soft py-24 md:py-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              title={audience.title}
              text={audience.text}
            />
            <p className="mt-12 font-serif text-[6.5rem] leading-none tracking-[-0.05em] text-ink md:text-[8.5rem]">
              {audience.stat}
            </p>
            <p className="mt-3 text-[12px] tracking-[0.22em] text-stone uppercase">
              {audience.statLabel}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {audience.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-[12px] tracking-[0.08em] text-ink"
                >
                  {pillar}
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 max-w-md">
              <p className="font-serif text-2xl leading-snug text-ink italic md:text-[2rem]">
                “{audience.quote}”
              </p>
            </blockquote>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.08}>
            <PhotoFrame
              src={audience.image}
              alt={audience.imageAlt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[3/4] overflow-hidden bg-transparent"
              imageClassName="origin-center scale-[1.08] lg:scale-[1.12]"
              contain
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
