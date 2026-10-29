import type { ReactNode } from "react";
import { mediaKit } from "@/data/media-kit";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { CountUp, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { BlockTitle, Container, SplitHeading } from "@/components/ui/Section";
import { SpecPills } from "@/components/ui/SpecList";

const frame = "rounded-[4px] border border-ink/35 bg-white";
const fill =
  "transition-colors duration-300 ease-out group-hover:border-blush-deep/60 group-hover:bg-blush-soft";

const glyphs: Record<string, ReactNode> = {
  stories: (
    <div className="flex h-14 gap-1">
      {[0, 1, 2].map((key) => (
        <span
          key={key}
          className={`aspect-[9/16] h-full ${frame} ${fill}`}
          style={{ transitionDelay: `${key * 90}ms` }}
        />
      ))}
    </div>
  ),
  feed: (
    <div className="relative h-14 w-[3.4rem]">
      <span
        className={`absolute top-0 right-0 aspect-[4/5] h-[46px] ${frame} bg-blush-soft transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-3`}
      />
      <span
        className={`absolute bottom-0 left-0 aspect-[4/5] h-[46px] ${frame} transition-transform duration-500 ease-out group-hover:-translate-x-0.5 group-hover:-rotate-3`}
      />
    </div>
  ),
  reels: (
    <div
      className={`relative flex aspect-[9/16] h-14 items-center justify-center ${frame} ${fill}`}
    >
      <span className="ml-0.5 size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-ink/70 transition-transform duration-500 ease-out group-hover:scale-125" />
    </div>
  ),
  house: (
    <div className="grid h-14 grid-cols-4 grid-rows-2 gap-1">
      {Array.from({ length: 8 }, (_, key) => (
        <span
          key={key}
          className={`aspect-[3/4] h-full ${frame} ${fill}`}
          style={{ transitionDelay: `${key * 45}ms` }}
        />
      ))}
    </div>
  ),
};

function IconBadge({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  const colors = tone === "dark" ? "bg-ivory text-ink" : "bg-ink text-ivory";

  return (
    <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${colors}`}>
      {children}
    </span>
  );
}

export function Formats() {
  const { formats } = mediaKit;
  const instagram = formats.groups.find((group) => group.id === "instagram");
  const tiktok = formats.groups.find((group) => group.id === "tiktok");
  const ongoing = formats.groups.find((group) => group.id === "ongoing");
  const shop = tiktok?.items.find((item) => item.id === "shop");
  const packs = tiktok?.items.find((item) => item.id === "packs");
  const shopHighlight = shop && "highlight" in shop ? shop.highlight : undefined;
  const packOptions = packs && "options" in packs ? packs.options : undefined;

  return (
    <section id="formatos" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SplitHeading title={formats.title} text={formats.text} />
        </Reveal>

        {instagram ? (
          <Reveal className="mt-16 md:mt-24">
            <BlockTitle
              icon={
                <IconBadge>
                  <InstagramIcon className="size-[18px]" />
                </IconBadge>
              }
            >
              {instagram.title}
            </BlockTitle>
            <Stagger
              as="ul"
              className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4"
              stagger={0.09}
            >
              {instagram.items.map((item) => (
                <StaggerItem
                  as="li"
                  key={item.id}
                  className="group grid grid-cols-[6.5rem_1fr] gap-x-5 border-t border-ink/15 pt-6 sm:block sm:border-0 sm:pt-0"
                >
                  <div aria-hidden="true" className="flex h-14 items-start sm:items-end">
                    {glyphs[item.id]}
                  </div>
                  <div className="relative sm:mt-7 sm:pt-5">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 hidden h-px bg-ink/15 sm:block"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 hidden h-px w-full origin-left scale-x-0 bg-blush-deep transition-transform duration-700 ease-out group-hover:scale-x-100 sm:block"
                    />
                    <h4 className="font-serif text-[1.7rem] leading-none tracking-tight text-ink">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        ) : null}

        {tiktok && shop && packs && shopHighlight && packOptions ? (
          <Reveal className="mt-20 md:mt-24">
            <div
              className="relative isolate overflow-hidden bg-ink px-6 py-9 text-ivory md:px-10 md:py-12"
              style={{ borderRadius: "var(--radius-media)" }}
            >
              <div
                aria-hidden="true"
                className="drift pointer-events-none absolute -bottom-56 -left-32 -z-10 size-[34rem] rounded-full bg-blush-deep/40 blur-[120px]"
              />
              <BlockTitle
                tone="dark"
                icon={
                  <IconBadge tone="dark">
                    <TikTokIcon className="size-[18px]" />
                  </IconBadge>
                }
              >
                {tiktok.title}
              </BlockTitle>

              <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <h4 className="font-sans text-[11px] font-medium tracking-[0.2em] text-sand uppercase">
                    {shop.title}
                  </h4>
                  <p className="mt-5 font-serif text-[4.6rem] leading-[0.85] tracking-[-0.05em] md:text-[6.4rem]">
                    {shopHighlight.value}
                  </p>
                  <p className="mt-4 font-serif text-2xl leading-tight md:text-[1.75rem]">
                    {shopHighlight.label}
                  </p>
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
                    {shop.text}
                  </p>
                </div>

                <div className="lg:col-span-7 lg:border-l lg:border-white/12 lg:pl-12">
                  <h4 className="font-sans text-[11px] font-medium tracking-[0.2em] text-sand uppercase">
                    {packs.title}
                  </h4>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                    {packs.text}
                  </p>
                  <Stagger
                    as="ul"
                    className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-white/15 bg-white/15"
                    style={{ borderRadius: "var(--radius-card)" }}
                    stagger={0.1}
                  >
                    {packOptions.map((option) => (
                      <li
                        key={option.value}
                        className="bg-ink px-3 py-7 text-center transition-colors duration-500 hover:bg-[#5c1c2f] md:py-9"
                      >
                        <StaggerItem className="flex flex-col items-center">
                          <span className="font-serif text-[3rem] leading-none tracking-[-0.03em] md:text-[3.8rem]">
                            <CountUp value={option.value} />
                          </span>
                          <span className="mt-3 text-[10px] tracking-[0.2em] text-white/55 uppercase">
                            {option.label}
                          </span>
                        </StaggerItem>
                      </li>
                    ))}
                  </Stagger>
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        {ongoing ? (
          <Reveal className="mt-4">
            <div
              className="bg-blush-soft px-6 py-9 md:px-10 md:py-12"
              style={{ borderRadius: "var(--radius-media)" }}
            >
              <BlockTitle>{ongoing.title}</BlockTitle>
              <Stagger as="ul" className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-0" stagger={0.1}>
                {ongoing.items.map((item) => (
                  <StaggerItem
                    as="li"
                    key={item.id}
                    className="lg:border-l lg:border-ink/12 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                  >
                    <h4 className="font-serif text-[1.7rem] leading-none tracking-tight text-ink">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                    {"options" in item ? <SpecPills items={item.options} /> : null}
                    {"note" in item ? (
                      <p className="mt-5 border-t border-ink/12 pt-4 text-[13px] leading-relaxed text-stone">
                        {item.note}
                      </p>
                    ) : null}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        ) : null}

        <Stagger
          as="dl"
          className="mt-16 grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          {formats.conditions.map((condition) => (
            <div key={condition.title} className="bg-paper px-5 py-6 md:px-6 md:py-7">
              <StaggerItem
                as="dt"
                className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.18em] text-ink uppercase"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-blush-deep" />
                {condition.title}
              </StaggerItem>
              <StaggerItem as="dd" className="mt-3 text-sm leading-relaxed text-muted">
                {condition.text}
              </StaggerItem>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
