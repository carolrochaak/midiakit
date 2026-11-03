import Image from "next/image";
import { mediaKit } from "@/data/media-kit";
import { Monogram } from "@/components/ui/Monogram";
import { LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Container, Eyebrow, titleClass } from "@/components/ui/Section";

export function About() {
  const { about, hero, contactSection } = mediaKit;
  const side = contactSection.polaroids[1];
  const highlight = about.facts[1];

  return (
    <section id="sobre" className="relative scroll-mt-20 overflow-hidden bg-beige py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Quem é a Carol</Eyebrow>
            <h2 className={`mt-6 text-ink ${titleClass}`}>
              <LineMask>
                <Accent text="Propósito, disciplina e verdade." words={2} />
              </LineMask>
            </h2>

            <div className="mt-9 flex items-center gap-4 border-y border-gold/35 py-4">
              <Monogram className="size-12 text-[1.25rem]" />
              <div>
                <p className="font-serif text-[1.55rem] leading-tight text-ink">
                  {mediaKit.site.name}
                </p>
                <p className="mt-0.5 text-[10px] font-bold tracking-[0.22em] text-marsala uppercase">
                  Criadora de conteúdo · {hero.location}
                </p>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Nichos">
              {hero.niches.map((niche) => (
                <li
                  key={niche}
                  className="rounded-full border border-gold/55 bg-ivory/60 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-marsala uppercase"
                >
                  {niche}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 text-[15px] leading-[1.75] text-ink-soft">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Stagger as="dl" className="mt-10 grid grid-cols-3 gap-3">
              {about.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-gold/30 bg-ivory/70 px-3 py-4 sm:px-4">
                  <StaggerItem
                    as="dt"
                    className="text-[9.5px] font-bold tracking-[0.18em] text-marsala uppercase sm:text-[10px]"
                  >
                    {fact.label}
                  </StaggerItem>
                  <StaggerItem
                    as="dd"
                    className="mt-1.5 font-serif text-[1.08rem] leading-tight text-ink sm:text-[1.25rem]"
                  >
                    {fact.value}
                  </StaggerItem>
                </div>
              ))}
            </Stagger>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="relative mx-auto max-w-[32rem] pr-[16%]">
              <div
                aria-hidden="true"
                className="absolute -inset-4 right-[12%] rounded-t-full border border-gold/50"
              />
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-rose">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 30rem"
                  className="object-cover object-[center_28%]"
                />
              </div>

              <figure className="absolute top-[16%] right-0 w-[40%] bg-ivory p-1.5 shadow-[0_30px_60px_-28px_rgba(58,15,34,0.55)]">
                <div className="relative aspect-[3/5] bg-rose">
                  <Image
                    src={side.src}
                    alt={side.alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 13rem"
                    className="object-cover object-[center_30%]"
                  />
                </div>
              </figure>

              <div className="absolute bottom-[12%] -left-3 bg-marsala-deep px-5 py-4 text-ivory shadow-[0_24px_50px_-24px_rgba(58,15,34,0.8)] md:-left-8">
                <p className="text-[9.5px] font-bold tracking-[0.22em] text-gold uppercase">
                  {highlight.label}
                </p>
                <p className="mt-1 font-serif text-[1.35rem] leading-tight italic">
                  {highlight.value}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
