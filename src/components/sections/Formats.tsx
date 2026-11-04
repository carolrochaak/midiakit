import type { ReactNode } from "react";
import { mediaKit } from "@/data/media-kit";
import { FormatVideos } from "@/components/sections/FormatVideos";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { CountUp, LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import {
  Accent,
  Container,
  Eyebrow,
  SectionHead,
  watermark,
} from "@/components/ui/Section";

const frame = "rounded-[3px] border border-marsala/45 bg-ivory";
const fill =
  "transition-colors duration-300 ease-out group-hover:border-marsala group-hover:bg-rose/70";

const glyphs: Record<string, ReactNode> = {
  stories: (
    <div className="flex h-12 gap-1">
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
    <div className="relative h-12 w-[3rem]">
      <span
        className={`absolute top-0 right-0 aspect-[4/5] h-10 ${frame} bg-rose/60 transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-3`}
      />
      <span
        className={`absolute bottom-0 left-0 aspect-[4/5] h-10 ${frame} transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-rotate-3`}
      />
    </div>
  ),
  reels: (
    <div className={`relative flex aspect-[9/16] h-12 items-center justify-center ${frame} ${fill}`}>
      <span className="ml-0.5 size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-marsala transition-transform duration-500 group-hover:scale-125" />
    </div>
  ),
  house: (
    <div className="grid h-12 grid-cols-4 grid-rows-2 gap-1">
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

function GroupTitle({
  icon,
  children,
  tone = "light",
}: {
  icon?: ReactNode;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const ring = tone === "dark" ? "border-gold/50 text-gold" : "border-gold/60 text-marsala";

  return (
    <div className="flex items-center gap-4">
      {icon ? (
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-full border ${ring}`}>
          {icon}
        </span>
      ) : null}
      <h3 className="font-serif text-[2rem] leading-none md:text-[2.4rem]">{children}</h3>
      <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-gold/35" />
    </div>
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
    <section id="formatos" className="scroll-mt-20">
      <div className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Formatos" title={formats.title} text={formats.text} />
          </Reveal>

          {instagram ? (
            <div className="mt-16 md:mt-24">
              <Reveal>
                <GroupTitle icon={<InstagramIcon className="size-[18px]" />}>
                  {instagram.title}
                </GroupTitle>
              </Reveal>
              <Stagger
                as="ul"
                className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                stagger={0.09}
              >
                {instagram.items.map((item, index) => (
                  <StaggerItem
                    as="li"
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-[1.4rem] border border-gold/35 bg-white p-6 transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_30px_60px_-40px_rgba(58,15,34,0.5)]"
                  >
                    <div className="flex items-start justify-between">
                      <div aria-hidden="true" className="flex h-12 items-end">
                        {glyphs[item.id]}
                      </div>
                      <span className="font-serif text-[13px] text-marsala italic">
                        Nº {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="mt-8 font-serif text-[1.75rem] leading-none text-ink">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{item.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
              <FormatVideos items={formats.samples} />
            </div>
          ) : null}
        </Container>
      </div>

      {tiktok && shop && packs && shopHighlight && packOptions ? (
        <div className="relative overflow-hidden bg-marsala py-24 text-ivory md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_15%_20%,rgba(235,215,168,0.12)_0%,transparent_60%),radial-gradient(50%_60%_at_100%_100%,rgba(58,15,34,0.7)_0%,transparent_70%)]"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 700"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 size-full"
            fill="none"
            stroke="#c7a46b"
          >
            <path d="M-40 420 C 300 300, 620 560, 980 380 S 1400 260, 1500 330" strokeOpacity="0.2" />
            <path d="M-40 500 C 340 380, 660 640, 1020 460 S 1420 340, 1500 410" strokeOpacity="0.1" />
          </svg>

          <Container className="relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
            <Reveal className="lg:col-span-6">
              <Eyebrow tone="dark">
                <span className="flex items-center gap-2">
                  <TikTokIcon className="size-3.5" />
                  {tiktok.title}
                </span>
              </Eyebrow>
              <h3 className="mt-6 font-serif text-[clamp(4.6rem,15vw,9.5rem)] leading-[0.86] font-light tracking-[-0.03em]">
                <LineMask>{shopHighlight.value}</LineMask>
              </h3>
              <p className="text-foil mt-4 font-serif text-[1.9rem] leading-tight italic md:text-[2.3rem]">
                {shopHighlight.label}
              </p>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-ivory/85">{shop.text}</p>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.1}>
              <div className="relative rounded-[1.6rem] border border-gold/30 bg-wine/45 p-7 backdrop-blur-sm md:p-10">
                <span className="bg-foil absolute -top-9 right-6 flex size-[5.5rem] flex-col items-center justify-center rounded-full text-center text-wine shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:-top-12 md:size-28">
                  <span className="font-serif text-[0.95rem] leading-none italic md:text-[1.1rem]">sem</span>
                  <span className="mt-1 font-serif text-[1.15rem] leading-none md:text-[1.4rem]">fee fixo</span>
                </span>
                <h4 className="pr-24 font-serif text-[2rem] leading-none md:text-[2.4rem]">{packs.title}</h4>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ivory/75">{packs.text}</p>
                <Stagger as="ul" className="mt-8 grid grid-cols-3 gap-3" stagger={0.1}>
                  {packOptions.map((option) => (
                    <StaggerItem
                      as="li"
                      key={option.value}
                      className="rounded-2xl border border-gold/30 bg-white/[0.04] px-2 py-6 text-center transition-colors duration-500 hover:border-gold md:py-8"
                    >
                      <span className="text-foil block font-serif text-[2.8rem] leading-none font-light md:text-[3.6rem]">
                        <CountUp value={option.value} />
                      </span>
                      <span className="mt-2 block text-[10px] font-bold tracking-[0.2em] text-ivory/70 uppercase">
                        {option.label}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </Container>
        </div>
      ) : null}

      <div className="bg-beige py-24 md:py-28">
        <Container>
          {ongoing ? (
            <>
              <Reveal>
                <GroupTitle>
                  <Accent text={ongoing.title} words={1} />
                </GroupTitle>
              </Reveal>
              <Stagger as="ul" className="mt-10 grid gap-4 lg:grid-cols-3" stagger={0.1}>
                {ongoing.items.map((item, index) => {
                  const featured = "options" in item;
                  return (
                    <StaggerItem
                      as="li"
                      key={item.id}
                      className={`relative flex flex-col overflow-hidden rounded-[1.4rem] p-7 md:p-8 ${
                        featured
                          ? "bg-marsala-deep text-ivory"
                          : "border border-gold/35 bg-ivory text-ink"
                      }`}
                    >
                      {featured ? (
                        <span aria-hidden="true" className={`${watermark} -right-2 -bottom-8 text-[8rem]`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      ) : null}
                      <span className={`font-serif text-[13px] italic ${featured ? "text-gold" : "text-marsala"}`}>
                        Nº {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="mt-6 font-serif text-[1.9rem] leading-none">{item.title}</h4>
                      <p className={`mt-3 text-[14px] leading-relaxed ${featured ? "text-ivory/80" : "text-ink-soft"}`}>
                        {item.text}
                      </p>
                      {"options" in item ? (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {item.options.map((option) => (
                            <li
                              key={option.value}
                              className="rounded-full border border-gold/45 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-gold-hi uppercase"
                            >
                              {option.value} {option.label}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {"note" in item ? (
                        <p className="relative mt-6 border-t border-gold/25 pt-4 text-[13px] leading-relaxed text-ivory/70">
                          {item.note}
                        </p>
                      ) : null}
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </>
          ) : null}

          <Stagger
            as="dl"
            className="mt-14 grid gap-x-10 gap-y-8 border-t border-gold/40 pt-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {formats.conditions.map((condition) => (
              <div key={condition.title}>
                <StaggerItem
                  as="dt"
                  className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-marsala uppercase"
                >
                  <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                  {condition.title}
                </StaggerItem>
                <StaggerItem as="dd" className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  {condition.text}
                </StaggerItem>
              </div>
            ))}
          </Stagger>
        </Container>
      </div>
    </section>
  );
}
