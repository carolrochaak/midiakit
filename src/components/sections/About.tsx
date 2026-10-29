import { mediaKit } from "@/data/media-kit";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ImageReveal, LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

export function About() {
  const { about } = mediaKit;
  const [lead, ...paragraphs] = about.paragraphs;

  return (
    <section
      id="sobre"
      className="scroll-mt-24 overflow-hidden bg-paper py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageReveal>
              <PhotoFrame
                src={about.image}
                alt={about.imageAlt}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/5] overflow-hidden"
                object="object-cover object-[center_32%]"
              />
            </ImageReveal>
            <Reveal className="relative z-10 -mt-20 ml-auto w-[88%] sm:w-[78%] lg:-mr-10" delay={0.45}>
              <div
                className="bg-ink p-6 text-ivory shadow-[0_24px_60px_-30px_rgba(107,33,54,0.55)] md:p-7"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <blockquote className="font-serif text-[1.35rem] leading-snug italic md:text-[1.6rem]">
                  “{about.quote}”
                </blockquote>
                <p className="mt-4 text-[10px] tracking-[0.22em] text-sand uppercase">
                  Caroline Rocha
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 lg:pt-4 lg:pl-6" delay={0.08}>
            <h2
              aria-label="Propósito"
              className="font-serif text-[clamp(3.4rem,9vw,6.2rem)] leading-[0.85] tracking-[-0.045em] text-ink"
            >
              <LineMask>
                <span aria-hidden="true">
                  Propó<span className="italic">sito</span>
                </span>
              </LineMask>
            </h2>

            <p className="mt-10 font-serif text-[1.65rem] leading-[1.2] tracking-[-0.01em] text-ink md:text-[2.15rem]">
              {lead}
            </p>

            <div className="mt-10 grid gap-6 border-t border-ink/10 pt-8 text-[15px] leading-[1.75] text-muted sm:grid-cols-2 sm:gap-10">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Stagger
              as="dl"
              className="mt-12 grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-3"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              {about.facts.map((fact) => (
                <div key={fact.label} className="bg-ivory px-5 py-6">
                  <StaggerItem
                    as="dt"
                    className="text-[10px] tracking-[0.18em] text-stone uppercase sm:text-[11px]"
                  >
                    {fact.label}
                  </StaggerItem>
                  <StaggerItem
                    as="dd"
                    className="mt-2 font-serif text-[1.5rem] leading-tight text-ink"
                  >
                    {fact.value}
                  </StaggerItem>
                </div>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
