import { mediaKit } from "@/data/media-kit";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero, contact } = mediaKit;

  return (
    <section id="topo" className="relative bg-ivory pt-16 md:pt-20 lg:min-h-svh lg:pt-0">
      <div className="relative h-[58svh] overflow-hidden lg:absolute lg:inset-x-0 lg:top-20 lg:bottom-0 lg:h-auto">
        <img
          src={hero.imageMobile}
          alt={hero.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="hero-photo settle absolute inset-0 h-full w-full object-cover object-[center_28%] lg:hidden"
        />
        <img
          src={hero.image}
          alt={hero.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="hero-photo settle absolute inset-0 hidden h-full w-full object-cover object-[58%_28%] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(247,236,238,0.9)_0%,rgba(247,236,238,0.5)_34%,transparent_62%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ivory to-transparent lg:hidden"
        />
      </div>

      <div className="relative z-10 px-5 pt-2 pb-12 md:px-10 md:pb-16 lg:flex lg:min-h-svh lg:items-center lg:pt-28 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="hero-copy max-w-xl text-ink">
            <p className="rise-in flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-stone uppercase">
              <span aria-hidden="true" className="draw-in h-px w-8 bg-current" />
              Mídia kit
            </p>

            <h1 className="mt-6 font-serif text-[clamp(3.6rem,13vw,7rem)] leading-[0.8] tracking-[-0.045em]">
              <span className="mask-line">
                <span className="font-medium [animation-delay:120ms]">{hero.name}</span>
              </span>
              <span className="mask-line">
                <span className="pl-[0.55em] font-normal italic [animation-delay:240ms]">
                  {hero.surname}
                </span>
              </span>
            </h1>

            <div className="rise-in [animation-delay:420ms]">
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted md:text-[17px]">
                {hero.lead}
              </p>

              <ul
                className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium tracking-[0.2em] text-ink/80 uppercase"
                aria-label="Nichos"
              >
                {hero.niches.map((niche) => (
                  <li key={niche} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1 rounded-full bg-blush-deep" />
                    {niche}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={contact.whatsappHref}
                  variant="solid"
                  className="w-full sm:w-auto"
                >
                  {hero.primaryLabel}
                </Button>
                <Button
                  href="#numeros"
                  variant="ghost"
                  className="w-full sm:w-auto"
                >
                  {hero.secondaryLabel}
                </Button>
              </div>

              <p className="mt-8 border-t border-ink/10 pt-5 text-[13px] tracking-[0.04em] text-stone">
                {hero.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-10 z-10 hidden px-10 lg:block"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <span className="relative h-12 w-px overflow-hidden bg-ink/15">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/3 bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
