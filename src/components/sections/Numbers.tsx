import { mediaKit } from "@/data/media-kit";
import { ArrowIcon } from "@/components/ui/Button";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { Meter } from "@/components/ui/Meter";
import { CountUp, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHead, watermark } from "@/components/ui/Section";

const platformIcons = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

export function Numbers() {
  const { numbers } = mediaKit;
  const last = numbers.highlights.length - 1;

  return (
    <section
      id="numeros"
      className="bg-glow-soft relative scroll-mt-20 overflow-hidden py-24 text-ivory md:py-32"
    >
      <Container className="relative">
        <Reveal>
          <SectionHead
            eyebrow="Números"
            title={numbers.title}
            accent={2}
            text={numbers.text}
            tone="dark"
          />
        </Reveal>

        <Stagger
          as="ul"
          className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-4 lg:grid-cols-4"
          stagger={0.09}
        >
          {numbers.highlights.map((item, index) => {
            const gold = index === last;
            return (
              <StaggerItem
                as="li"
                key={`${item.label}-${item.hint}`}
                className={`relative overflow-hidden rounded-2xl px-5 py-6 md:px-7 md:py-8 ${
                  gold
                    ? "bg-foil text-wine"
                    : "border border-gold/20 bg-white/[0.035] text-ivory"
                }`}
              >
                <p
                  className={`font-serif text-[13px] italic ${gold ? "text-wine/70" : "text-gold"}`}
                >
                  Nº {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className={`mt-5 font-serif text-[clamp(1.5rem,6.6vw,2.3rem)] leading-none font-light whitespace-nowrap md:text-[3.1rem] ${
                    gold ? "" : "text-foil"
                  }`}
                >
                  <CountUp value={item.value} />
                </p>
                <p className="mt-5 text-[10px] font-bold tracking-[0.2em] uppercase md:text-[10.5px]">
                  {item.label}
                </p>
                <p className={`mt-1 text-[13px] ${gold ? "text-wine/75" : "text-ivory/60"}`}>
                  {item.hint}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-4 grid gap-4 md:mt-5 lg:grid-cols-2">
          {numbers.platforms.map((platform, index) => {
            const Icon = platformIcons[platform.id];

            return (
              <Reveal key={platform.id} delay={index * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-gold/20 bg-linear-to-b from-white/[0.06] to-white/[0.01] p-6 transition-colors duration-500 hover:border-gold/45 sm:p-9">
                  <span aria-hidden="true" className={`${watermark} -right-3 -bottom-12 text-[11rem]`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <header className="relative flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 text-gold transition-transform duration-500 group-hover:rotate-[-8deg]">
                        <Icon className="size-[18px]" />
                      </span>
                      <div>
                        <h3 className="font-serif text-[2rem] leading-none">{platform.name}</h3>
                        <a
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-[13px] text-ivory/65 underline-offset-4 hover:text-gold-hi hover:underline"
                        >
                          {platform.handle}
                        </a>
                      </div>
                    </div>
                    <p className="rounded-full border border-gold/30 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] text-gold uppercase">
                      {platform.window}
                    </p>
                  </header>

                  <dl className="relative mt-8 grid grid-cols-3 gap-4 border-y border-gold/15 py-7">
                    {platform.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col-reverse justify-end gap-2">
                        <dt className="text-[9.5px] font-bold tracking-[0.16em] text-ivory/60 uppercase sm:text-[10px]">
                          {stat.label}
                        </dt>
                        <dd className="font-serif text-[1.6rem] leading-none whitespace-nowrap sm:text-[2.3rem]">
                          <CountUp value={stat.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="relative mt-7 space-y-5">
                    {platform.meters.map((meter) => (
                      <Meter
                        key={meter.label}
                        label={meter.label}
                        display={meter.display}
                        value={meter.value}
                      />
                    ))}
                  </div>

                  <p className="relative mt-7 font-serif text-[1.15rem] leading-snug text-ivory/80 italic">
                    {platform.note}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-gold/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[13px] leading-relaxed text-ivory/60">
            {numbers.disclaimer}
          </p>
          <a
            href="#contato"
            className="group inline-flex shrink-0 items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-gold uppercase hover:text-gold-hi"
          >
            {numbers.cta}
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  );
}
