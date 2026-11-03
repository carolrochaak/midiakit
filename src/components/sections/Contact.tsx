import Image from "next/image";
import type { ReactNode } from "react";
import { mediaKit } from "@/data/media-kit";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { LineMask, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Container, Eyebrow, titleClass } from "@/components/ui/Section";

const frames = [
  "left-[4%] top-10 z-10 w-[44%] -rotate-6",
  "right-[4%] top-4 z-20 w-[46%] rotate-3",
  "bottom-2 left-[27%] z-30 w-[42%] -rotate-2",
];

function InfoCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <StaggerItem
      as="li"
      className="rounded-xl border border-gold/35 bg-ivory px-5 py-5 transition-colors duration-300 hover:border-gold"
    >
      <p className="text-[10px] font-bold tracking-[0.22em] text-marsala uppercase">{label}</p>
      <div className="mt-2 font-serif text-[1.3rem] leading-snug text-ink">{children}</div>
    </StaggerItem>
  );
}

export function Contact() {
  const { contact, contactSection } = mediaKit;
  const icons = { instagram: InstagramIcon, tiktok: TikTokIcon };
  const link = "underline-offset-4 break-all hover:text-marsala hover:underline";

  return (
    <section id="contato" className="scroll-mt-20 overflow-hidden bg-beige py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Contato</Eyebrow>
              <h2 className={`mt-6 text-ink ${titleClass}`}>
                <LineMask>
                  <Accent text={contactSection.title} words={1} />
                </LineMask>
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-ink-soft md:text-base">
                {contactSection.text}
              </p>
            </Reveal>

            <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2" stagger={0.07}>
              <InfoCard label="E-mail">
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </InfoCard>
              <InfoCard label="WhatsApp">
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                  {contact.phone}
                </a>
                <CopyButton value={contact.phone} label="Copiar número" />
              </InfoCard>
              <InfoCard label="Cidade">
                {contact.city}, {contact.state}
              </InfoCard>
              <InfoCard label={contact.linkLabel}>
                <a href={contact.linkInBio} target="_blank" rel="noopener noreferrer" className={link}>
                  {contact.linkInBio.replace("https://", "")}
                </a>
              </InfoCard>
            </Stagger>

            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={contact.whatsappHref} variant="wine" arrow>
                Chamar no WhatsApp
              </Button>
              <Button href={`mailto:${contact.email}`} variant="outlineDark">
                Enviar e-mail
              </Button>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="bg-glow overflow-hidden rounded-[1.6rem] text-ivory shadow-[0_40px_80px_-40px_rgba(58,15,34,0.7)]">
              <Stagger className="relative mx-auto h-[19rem] max-w-[24rem] sm:h-[22rem]" stagger={0.14}>
                {contactSection.polaroids.map((photo, index) => (
                  <StaggerItem
                    as="figure"
                    key={photo.src}
                    className={`absolute bg-ivory p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.4)] transition-[rotate,translate] duration-500 hover:z-40 hover:-translate-y-2 hover:rotate-0 ${frames[index]}`}
                  >
                    <div className="relative aspect-[3/4] bg-rose">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="200px"
                        className={`object-cover ${
                          "object" in photo ? photo.object : "object-[center_20%]"
                        }`}
                      />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="border-t border-gold/20 px-6 pt-6 pb-7 md:px-8">
                <p className="text-[10px] font-bold tracking-[0.26em] text-gold uppercase">
                  {contact.city} · {contact.state}
                </p>
                <p className="mt-2 font-serif text-[1.7rem] leading-tight">Onde ela publica</p>
                <ul className="mt-5 grid gap-3">
                  {contact.socials.map((social, index) => {
                    const Icon = icons[social.id];
                    return (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-12 items-center justify-between gap-3 rounded-full px-5 text-[11px] font-bold tracking-[0.16em] uppercase transition-[background-position,border-color,color] duration-300 ${
                            index === 0
                              ? "bg-foil text-wine"
                              : "border border-ivory/30 text-ivory hover:border-gold hover:text-gold-hi"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="size-4" />
                            {social.label}
                          </span>
                          <span className="normal-case tracking-normal">{social.handle}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
