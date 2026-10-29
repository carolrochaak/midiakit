import { mediaKit } from "@/data/media-kit";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { Meter } from "@/components/ui/Meter";
import { CountUp, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SplitHeading } from "@/components/ui/Section";

const platformIcons = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

export function Numbers() {
  const { numbers } = mediaKit;
  const lastHighlight = numbers.highlights.length - 1;

  return (
    <section
      id="numeros"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-ivory md:py-32"
    >
      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute -top-48 -right-40 size-[40rem] rounded-full bg-blush-deep/45 blur-[140px]"
      />
      <Container className="relative">
        <Reveal>
          <SplitHeading
            title={numbers.title}
            text={numbers.text}
            tone="dark"
            aside={
              <p className="mt-6 border-l border-white/20 pl-4 text-[13px] leading-relaxed text-white/50">
                {numbers.disclaimer}
              </p>
            }
          />
        </Reveal>

        <Stagger
          as="ul"
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/12 bg-white/12 md:mt-20 lg:grid-cols-4"
          style={{ borderRadius: "var(--radius-card)" }}
          stagger={0.09}
        >
          {numbers.highlights.map((item, index) => (
            <li
              key={`${item.label}-${item.hint}`}
              className={`px-4 py-7 sm:px-7 sm:py-9 ${
                index === lastHighlight ? "bg-blush-deep" : "bg-ink"
              }`}
            >
              <StaggerItem>
                <p className="font-serif text-[clamp(1.55rem,7vw,2.1rem)] leading-none tracking-[-0.03em] whitespace-nowrap sm:text-[3.2rem]">
                  <CountUp value={item.value} />
                </p>
                <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-ivory uppercase sm:text-[11px]">
                  {item.label}
                </p>
                <p className="mt-1 text-[13px] text-white/55">{item.hint}</p>
              </StaggerItem>
            </li>
          ))}
        </Stagger>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {numbers.platforms.map((platform, index) => {
            const Icon = platformIcons[platform.id];

            return (
              <Reveal key={platform.id} delay={index * 0.06}>
                <article
                  className="group flex h-full flex-col bg-white/[0.035] p-6 ring-1 ring-white/10 transition-[background-color,box-shadow] duration-500 ring-inset hover:bg-white/[0.06] hover:ring-white/20 sm:p-8"
                  style={{ borderRadius: "var(--radius-card)" }}
                >
                  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-11 items-center justify-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:-rotate-6">
                        <Icon className="size-[18px]" />
                      </span>
                      <div>
                        <h3 className="font-serif text-[1.9rem] leading-none">
                          {platform.name}
                        </h3>
                        <a
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-[13px] text-white/55 underline-offset-4 hover:text-ivory hover:underline"
                        >
                          {platform.handle}
                        </a>
                      </div>
                    </div>
                    <p className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-sand uppercase">
                      {platform.window}
                    </p>
                  </header>

                  <dl className="grid gap-4 py-7 sm:grid-cols-3 sm:gap-6">
                    {platform.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:border-0 sm:pb-0"
                      >
                        <dt className="text-[10px] tracking-[0.14em] text-white/50 uppercase sm:text-[11px]">
                          {stat.label}
                        </dt>
                        <dd className="font-serif text-[1.9rem] leading-none tracking-tight whitespace-nowrap sm:text-[2.2rem]">
                          <CountUp value={stat.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto space-y-5 border-t border-white/10 pt-6">
                    {platform.meters.map((meter) => (
                      <Meter
                        key={meter.label}
                        label={meter.label}
                        display={meter.display}
                        value={meter.value}
                      />
                    ))}
                    <p className="pt-1 text-[13px] leading-relaxed text-white/55">
                      {platform.note}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <a
          href="#contato"
          className="group mt-12 inline-flex min-h-11 items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-sand uppercase"
        >
          {numbers.cta}
          <span
            aria-hidden="true"
            className="h-px w-8 bg-current transition-[width] duration-300 group-hover:w-12"
          />
        </a>
      </Container>
    </section>
  );
}
