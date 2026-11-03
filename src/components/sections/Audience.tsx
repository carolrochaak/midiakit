import { mediaKit } from "@/data/media-kit";
import { AudienceFigure } from "@/components/sections/AudienceFigure";
import { Seal } from "@/components/ui/Monogram";
import { CountUp, LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Container, Eyebrow, titleClass } from "@/components/ui/Section";

export function Audience() {
  const { audience } = mediaKit;

  return (
    <section id="publico" className="scroll-mt-20 overflow-hidden bg-ivory pt-24 md:pt-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="pb-4 lg:col-span-6 lg:pb-28">
            <Eyebrow>Público</Eyebrow>
            <h2 className={`mt-6 text-ink ${titleClass}`}>
              <LineMask>
                <Accent text={audience.title} words={2} />
              </LineMask>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-ink-soft md:text-base">
              {audience.text}
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-gold/40 bg-white px-6 py-6 shadow-[0_24px_50px_-36px_rgba(58,15,34,0.45)]">
                <p className="text-[10px] font-bold tracking-[0.22em] text-marsala uppercase">
                  Público
                </p>
                <p className="mt-3 font-serif text-[3.6rem] leading-none font-light text-marsala-deep">
                  <CountUp value={audience.stat} />
                </p>
                <p className="mt-2 text-[13px] text-ink-soft">{audience.statLabel}</p>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-marsala-deep px-6 py-6 text-ivory">
                <p className="text-[10px] font-bold tracking-[0.22em] text-gold uppercase">
                  Quem acompanha
                </p>
                <blockquote className="mt-4 font-serif text-[1.45rem] leading-snug italic">
                  “{audience.quote}”
                </blockquote>
              </div>
            </div>

            <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.05}>
              {audience.pillars.map((pillar) => (
                <StaggerItem
                  as="li"
                  key={pillar}
                  className="rounded-full border border-gold/50 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-marsala uppercase transition-colors duration-300 hover:bg-marsala-deep hover:text-ivory"
                >
                  {pillar}
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <div className="relative lg:col-span-6">
            <AudienceFigure src={audience.image} alt={audience.imageAlt} />
            <div className="absolute bottom-[16%] left-0 md:left-[2%]">
              <Seal
                id="seal-audience"
                text="LIFESTYLE · MODA · BELEZA · MATERNIDADE · "
                className="size-24 md:size-28"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
