import { mediaKit } from "@/data/media-kit";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";

export function Craft() {
  const { craft } = mediaKit;

  return (
    <section id="universo" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading title={craft.title} text={craft.text} />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.06}>
            <SpecList items={craft.pillars} />
          </Reveal>
        </div>

        <div className="mt-20 grid items-start gap-10 border-t border-ink/10 pt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h3 className="max-w-sm font-serif text-[2rem] leading-[0.95] tracking-tight text-ink md:text-4xl">
              {craft.favoritesTitle}
            </h3>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.06}>
            <SpecList
              title="caps"
              items={craft.favorites.map((item) => ({
                title: item.label,
                text: item.text,
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
