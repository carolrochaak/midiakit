import Image from "next/image";
import { mediaKit } from "@/data/media-kit";
import { Button } from "@/components/ui/Button";
import { LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Container, Eyebrow, titleClass } from "@/components/ui/Section";

export function Measures() {
  const { measures, contact } = mediaKit;

  return (
    <section id="medidas" className="scroll-mt-20 overflow-hidden bg-ivory py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[26rem]">
              <div aria-hidden="true" className="absolute -inset-4 rounded-t-full border border-gold/50" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-rose">
                <Image
                  src={measures.image}
                  alt={measures.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 26rem"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Medidas</Eyebrow>
              <h2 className={`mt-6 text-ink ${titleClass}`}>
                <LineMask>
                  <Accent text={measures.title} words={2} />
                </LineMask>
              </h2>
              <p className="mt-5 font-serif text-[1.35rem] text-ink-soft italic md:text-[1.5rem]">
                {measures.text}
              </p>
            </Reveal>

            <Stagger as="dl" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.05}>
              {measures.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gold/35 bg-white px-4 py-5 transition-colors duration-300 hover:border-gold"
                >
                  <StaggerItem
                    as="dt"
                    className="text-[10px] font-bold tracking-[0.2em] text-marsala uppercase"
                  >
                    {item.label}
                  </StaggerItem>
                  <StaggerItem
                    as="dd"
                    className="mt-2 font-serif text-[1.75rem] leading-none text-ink sm:text-[1.9rem]"
                  >
                    {item.value}
                  </StaggerItem>
                </div>
              ))}
            </Stagger>

            <Reveal className="mt-10">
              <Button href={contact.whatsappHref} variant="wine" arrow>
                {mediaKit.numbers.cta}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
