import { mediaKit } from "@/data/media-kit";
import { Monogram } from "@/components/ui/Monogram";
import { LineMask } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Container } from "@/components/ui/Section";

export function Quote() {
  const { about, site } = mediaKit;

  return (
    <section
      aria-label="Frase da Carol"
      className="bg-glow relative overflow-hidden py-28 text-center text-ivory md:py-40"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full"
        fill="none"
        stroke="#c7a46b"
      >
        <circle cx="720" cy="400" r="330" strokeOpacity="0.12" />
        <circle cx="720" cy="400" r="440" strokeOpacity="0.07" />
        <path d="M-40 640 C 380 520, 760 760, 1480 560" strokeOpacity="0.12" />
      </svg>

      <Container className="relative">
        <Reveal>
          <span aria-hidden="true" className="text-foil block font-serif text-[5rem] leading-[0.6]">
            “
          </span>
          <blockquote className="mx-auto mt-6 max-w-4xl font-serif text-[clamp(2.1rem,5.2vw,4.2rem)] leading-[1.08] font-light">
            <LineMask>
              <Accent text={about.quote} words={2} tone="dark" />
            </LineMask>
          </blockquote>
          <div className="mt-12 flex flex-col items-center gap-3">
            <Monogram className="size-14 text-[1.4rem]" />
            <p className="font-serif text-[1.5rem] italic">{site.name}</p>
            <p className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
              Criadora de conteúdo
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
