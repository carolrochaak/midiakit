import { MetricShots } from "@/components/sections/MetricShots";
import { mediaKit } from "@/data/media-kit";
import { Meter } from "@/components/ui/Meter";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Numbers() {
  const { numbers } = mediaKit;

  return (
    <section
      id="numeros"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-ivory md:py-32"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-0 font-serif text-[clamp(6rem,22vw,15rem)] leading-none tracking-[-0.06em] text-white/[0.04] select-none"
      >
        métricas
      </p>
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            title={numbers.title}
            text={numbers.text}
            tone="dark"
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/50">
            {numbers.disclaimer}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ul className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {numbers.highlights.map((item) => (
              <li
                key={`${item.label}-${item.hint}`}
                className="bg-ink px-4 py-6 sm:px-6 sm:py-8"
              >
                <p className="font-serif text-[1.85rem] leading-none tracking-tight sm:text-[2.6rem]">
                  {item.value}
                </p>
                <p className="mt-4 text-[11px] tracking-[0.18em] text-white/80 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-white/45">{item.hint}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {numbers.platforms.map((platform) => (
            <Reveal key={platform.id}>
              <article
                className="h-full border border-white/12 p-6 sm:p-8"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-serif text-4xl leading-none">{platform.name}</h3>
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-white/60 underline-offset-4 hover:text-ivory hover:underline"
                    >
                      {platform.handle}
                    </a>
                  </div>
                  <p className="text-[11px] tracking-[0.16em] text-blush uppercase sm:pt-2 sm:text-right">
                    {platform.window}
                  </p>
                </div>

                <dl className="mt-8 grid gap-5 sm:grid-cols-3">
                  {platform.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-end justify-between gap-4 border-b border-white/10 pb-3 sm:block sm:border-0 sm:pb-0"
                    >
                      <dd className="font-serif text-[2rem] leading-none tracking-tight sm:text-[2.35rem]">
                        {stat.value}
                      </dd>
                      <dt className="text-[10px] tracking-[0.14em] text-white/50 uppercase sm:mt-2 sm:text-[11px]">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-sm leading-relaxed text-white/60">{platform.note}</p>

                <div className="mt-7 space-y-5">
                  {platform.meters.map((meter) => (
                    <Meter
                      key={meter.label}
                      label={meter.label}
                      display={meter.display}
                      value={meter.value}
                    />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* <MetricShots /> */}

        <a
          href="#contato"
          className="mt-12 inline-flex min-h-11 items-center text-[11px] font-medium tracking-[0.2em] text-blush uppercase underline-offset-4 hover:underline"
        >
          {numbers.cta}
        </a>
      </Container>
    </section>
  );
}
