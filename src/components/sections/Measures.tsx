import { mediaKit } from "@/data/media-kit";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Measures() {
  const { measures } = mediaKit;

  return (
    <section
      id="medidas"
      className="scroll-mt-24 bg-sand py-24 md:py-32"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <SectionHeading
              title={measures.title}
              text={measures.text}
            />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <PhotoFrame
              src={measures.image}
              alt={measures.imageAlt}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[3/4] overflow-hidden bg-blush"
              object="object-cover object-center"
            />
          </Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden bg-ink/10 sm:grid-cols-4 lg:col-span-7" style={{ borderRadius: "var(--radius-card)" }}>
            {measures.items.map((item) => (
              <div key={item.label} className="bg-ivory px-4 py-6">
                <dt className="text-[10px] tracking-[0.18em] text-stone uppercase sm:text-[11px]">
                  {item.label}
                </dt>
                <dd className="mt-2 font-serif text-[1.7rem] leading-none text-ink sm:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
