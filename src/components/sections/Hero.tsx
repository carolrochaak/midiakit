import { mediaKit } from "@/data/media-kit";
import { Button } from "@/components/ui/Button";
import { Seal } from "@/components/ui/Monogram";
import { Container } from "@/components/ui/Section";

const sparks = [
  "left-[8%] top-[22%]",
  "left-[46%] top-[14%] [animation-delay:1.2s]",
  "left-[38%] bottom-[18%] [animation-delay:2.1s]",
  "right-[6%] top-[30%] [animation-delay:0.6s]",
  "right-[14%] bottom-[12%] [animation-delay:2.8s]",
];

export function HeroDecor() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full"
        fill="none"
        stroke="#c7a46b"
      >
        <circle cx="1060" cy="430" r="430" strokeOpacity="0.13" />
        <circle cx="1060" cy="430" r="560" strokeOpacity="0.07" />
        <path d="M-40 690 C 340 560, 700 820, 1480 600" strokeOpacity="0.14" />
        <path d="M-40 250 C 300 140, 560 330, 900 210" strokeOpacity="0.08" />
      </svg>
      {sparks.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`twinkle pointer-events-none absolute size-1 rounded-full bg-gold-hi ${position}`}
        />
      ))}
    </>
  );
}

export function Hero() {
  const { hero, contact, numbers } = mediaKit;
  const gmv = numbers.highlights[numbers.highlights.length - 1];

  return (
    <section id="topo" className="bg-glow relative overflow-hidden text-ivory">
      <HeroDecor />

      <Container className="relative grid items-center gap-14 pt-[calc(var(--header-h)+2rem)] pb-16 lg:min-h-svh lg:grid-cols-12 lg:gap-8 lg:pb-14">
        <div className="lg:col-span-6 lg:pr-6">
          <p className="rise-in flex items-center gap-4 text-[11px] font-bold tracking-[0.32em] text-gold uppercase">
            <span aria-hidden="true" className="draw-in h-px w-10 shrink-0 bg-gold/70" />
            Mídia kit · {hero.location}
          </p>

          <h1 className="mt-7 font-serif text-[clamp(4.2rem,11.5vw,7.6rem)] leading-[0.94] font-light tracking-[-0.015em]">
            <span className="mask-line">
              <span className="[animation-delay:120ms]">{hero.name}</span>
            </span>
            <span className="mask-line">
              <span className="[animation-delay:240ms]">
                <em className="text-foil pr-[0.06em] italic">{hero.surname}.</em>
              </span>
            </span>
          </h1>

          <div className="rise-in [animation-delay:420ms]">
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ivory/85 md:text-[17px]">
              {hero.lead}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={contact.whatsappHref} variant="foil" arrow>
                {hero.primaryLabel}
              </Button>
              <Button href="#numeros" variant="outlineLight">
                {hero.secondaryLabel}
              </Button>
            </div>

            <ul
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gold/20 pt-6 text-[10.5px] font-bold tracking-[0.24em] text-gold uppercase"
              aria-label="Nichos"
            >
              {hero.niches.map((niche) => (
                <li key={niche} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="size-1 rotate-45 bg-gold" />
                  {niche}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="-order-1 lg:order-none lg:col-span-6">
          <div className="relative mx-auto w-[82%] max-w-[26rem] lg:w-full lg:max-w-[27rem]">
            <div
              aria-hidden="true"
              className="absolute -inset-3.5 rounded-t-full border border-gold/50 md:-inset-5"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-7 rounded-t-full border border-gold/15 md:-inset-10"
            />

            <div className="arch-in relative aspect-[3/4] overflow-hidden rounded-t-full bg-wine-deep">
              {/* eslint-disable-next-line @next/next/no-img-element -- arquivo já otimizado, sem reprocessar */}
              <img
                src={hero.imageMobile}
                alt={hero.imageAlt}
                fetchPriority="high"
                decoding="async"
                className="settle absolute inset-0 size-full object-cover object-[center_22%]"
              />
            </div>

            <div className="rise-in absolute top-[10%] -left-8 [animation-delay:700ms] md:-left-14">
              <Seal id="seal-hero" text="MÍDIA KIT · CAROL ROCHA · CRIADORA · " className="size-24 md:size-32" />
            </div>

            <div className="rise-in absolute -right-6 -bottom-5 bg-ivory px-4 pt-3 pb-4 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] [animation-delay:900ms] md:-right-16 md:bottom-[9%] md:w-[15rem] md:px-5 md:pt-4 md:pb-5">
              <span aria-hidden="true" className="absolute top-0 left-5 h-[2px] w-12 bg-foil" />
              <p className="text-[10px] font-bold tracking-[0.22em] text-marsala uppercase">
                {gmv.label}
              </p>
              <p className="mt-2 font-serif text-[1.8rem] leading-none whitespace-nowrap text-marsala-deep md:text-[2.6rem]">
                {gmv.value}
              </p>
              <p className="mt-1.5 font-serif text-[0.95rem] text-ink-soft italic md:mt-2 md:text-[1.05rem]">
                {gmv.hint}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
