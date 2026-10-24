import { mediaKit } from "@/data/media-kit";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

export function About() {
  const { about } = mediaKit;

  return (
    <section
      id="sobre"
      className="scroll-mt-24 overflow-hidden bg-paper py-24 md:py-32"
    >
      <Container>
        <Reveal>
          <h2
            aria-label="Propósito"
            className="font-serif text-[clamp(4.6rem,16vw,9rem)] leading-[0.76] font-medium tracking-[-0.055em] text-ink"
          >
            <span aria-hidden="true" className="block">
              propó
            </span>
            <span aria-hidden="true" className="block font-normal italic">
              sito
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <figure>
              <PhotoFrame
                src={about.image}
                alt={about.imageAlt}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <figcaption className="mt-4 text-[11px] tracking-[0.22em] text-stone uppercase">
                Caroline Rocha
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.08}>
            <div className="space-y-5 text-base leading-[1.7] text-muted md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-10 border-l-2 border-blush-deep pl-6">
              <p className="font-serif text-[1.65rem] leading-snug text-ink italic md:text-[2.1rem]">
                “{about.quote}”
              </p>
            </blockquote>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-ink/10 pt-4">
                  <dt className="text-[10px] tracking-[0.2em] text-stone uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[1.65rem] leading-tight text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
