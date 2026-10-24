import Image from "next/image";
import { mediaKit } from "@/data/media-kit";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero, contact } = mediaKit;

  return (
    <section id="topo" className="relative bg-ivory pt-16 md:pt-20 lg:min-h-svh lg:pt-0">
      <div className="relative h-[58svh] overflow-hidden lg:absolute lg:inset-x-0 lg:top-20 lg:bottom-0 lg:h-auto">
        <Image
          src={hero.imageMobile}
          alt={hero.imageAlt}
          fill
          priority
          unoptimized
          className="object-cover object-[center_38%] lg:hidden"
        />
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          unoptimized
          className="hidden object-cover object-[62%_22%] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(243,239,233,0.78)_0%,rgba(243,239,233,0.32)_38%,transparent_64%)] lg:block"
        />
      </div>

      <div className="relative z-10 px-5 py-8 md:px-10 md:py-12 lg:flex lg:min-h-svh lg:items-center lg:pt-28 lg:pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-xl text-ink">
            <p className="text-[11px] font-medium tracking-[0.28em] text-stone uppercase">
              Mídia kit
            </p>
            <h1 className="mt-5 font-serif leading-[0.82] tracking-[-0.045em]">
              <span className="block text-[clamp(3.2rem,12vw,5.6rem)] font-medium">
                {hero.name}
              </span>
              <span className="block text-[clamp(3.2rem,12vw,5.6rem)] font-normal italic">
                {hero.surname}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
              {hero.lead}
            </p>
            <p className="mt-3 text-sm text-stone">{hero.location}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Nichos">
              {hero.niches.map((niche) => (
                <li
                  key={niche}
                  className="rounded-full border border-ink/12 px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] text-ink/80 uppercase"
                >
                  {niche}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </div>
      </div>
    </section>
  );
}
