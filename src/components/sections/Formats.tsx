import type { ReactNode } from "react";
import { mediaKit } from "@/data/media-kit";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { SpecList, SpecPills } from "@/components/ui/SpecList";

function Catalog({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-16">
      <h3 className="font-serif text-[2rem] leading-none tracking-tight text-ink lg:col-span-3 md:text-3xl">
        {title}
      </h3>
      <div className="lg:col-span-9">{children}</div>
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
  const monthly = ongoing?.items.find((item) => item.id === "monthly");
  const ugc = ongoing?.items.find((item) => item.id === "ugc");
  const custom = ongoing?.items.find((item) => item.id === "custom");
  const ugcOptions = ugc && "options" in ugc ? ugc.options : undefined;
  const ugcNote = ugc && "note" in ugc ? ugc.note : undefined;

  return (
    <section id="formatos" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading title={formats.title} text={formats.text} />
        </Reveal>

        {instagram ? (
          <Reveal className="mt-16 md:mt-20">
            <Catalog title={instagram.title}>
              <SpecList items={instagram.items} />
            </Catalog>
          </Reveal>
        ) : null}

        {tiktok && shop && packs && shopHighlight && packOptions ? (
          <Reveal className="mt-16 md:mt-20">
            <div
              className="bg-ink px-6 py-8 text-ivory md:px-10 md:py-10"
              style={{ borderRadius: "var(--radius-media)" }}
            >
              <p className="text-[11px] font-medium tracking-[0.22em] text-blush uppercase">
                {tiktok.title}
              </p>
              <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="font-serif text-[4.4rem] leading-none tracking-[-0.05em] md:text-[6rem]">
                    {shopHighlight.value}
                  </p>
                  <p className="mt-4 font-serif text-2xl leading-tight text-ivory md:text-3xl">
                    {shopHighlight.label}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[15px] leading-relaxed text-white/65">
                    {shop.text}
                  </p>
                  <p className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ivory uppercase">
                    {packs.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                    {packs.text}
                  </p>
                  <SpecPills items={packOptions} tone="dark" />
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        {ongoing && monthly && ugc && custom ? (
          <Reveal className="mt-16 md:mt-20">
            <Catalog title={ongoing.title}>
              <SpecList
                items={[
                  { title: monthly.title, text: monthly.text },
                  {
                    title: ugc.title,
                    text: ugc.text,
                    meta: (
                      <>
                        {ugcOptions ? <SpecPills items={ugcOptions} /> : null}
                        {ugcNote ? (
                          <p className="mt-4 text-sm leading-relaxed text-stone">
                            {ugcNote}
                          </p>
                        ) : null}
                      </>
                    ),
                  },
                  { title: custom.title, text: custom.text },
                ]}
              />
            </Catalog>
          </Reveal>
        ) : null}

        <ul className="mt-16 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {formats.conditions.map((condition) => (
            <li key={condition.title}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-ink uppercase">
                {condition.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {condition.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
