import Image from "next/image";
import { mediaKit } from "@/data/media-kit";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";

const frames = [
  "left-0 top-8 z-10 w-[48%] -rotate-6",
  "right-0 top-0 z-20 w-[50%] rotate-3",
  "bottom-0 left-[18%] z-30 w-[46%] -rotate-2",
];

export function Contact() {
  const { contact, contactSection } = mediaKit;
  const icons = {
    instagram: InstagramIcon,
    tiktok: TikTokIcon,
  };

  const rows = [
    {
      label: "E-mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      label: "WhatsApp",
      value: contact.phone,
      href: contact.whatsappHref,
    },
    {
      label: "Cidade",
      value: `${contact.city}, ${contact.state}`,
      href: "",
    },
    {
      label: contact.linkLabel,
      value: "linktr.ee/caroline.rochaa",
      href: contact.linkInBio,
    },
  ];

  return (
    <section id="contato" className="scroll-mt-24 bg-ink text-ivory">
      <Container className="py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h2 className="max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              {contactSection.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {contactSection.text}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={contact.whatsappHref}
                variant="light"
                className="w-full sm:w-auto"
              >
                Chamar no WhatsApp
              </Button>
              <Button
                href={`mailto:${contact.email}`}
                variant="ghostLight"
                className="w-full sm:w-auto"
              >
                Enviar e-mail
              </Button>
            </div>

            <ul className="mt-12 border-y border-white/12">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="flex flex-col gap-1 border-b border-white/12 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="text-[11px] tracking-[0.2em] text-white/45 uppercase">
                    {row.label}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-lg break-all underline-offset-4 hover:underline sm:text-right"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-lg sm:text-right">{row.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-3">
              {contact.socials.map((social) => {
                const Icon = icons[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm transition hover:bg-ivory hover:text-ink"
                    >
                      <Icon />
                      {social.handle}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto h-[26rem] max-w-md sm:h-[32rem]">
              {contactSection.polaroids.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={`absolute bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${frames[index]}`}
                >
                  <div className="relative aspect-[3/4] bg-sand">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="220px"
                      className={`object-cover ${
                        "object" in photo ? photo.object : "object-[center_20%]"
                      }`}
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <footer className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[12px] tracking-[0.12em] text-white/50 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>Caroline Rocha · Mídia kit</p>
        </Container>
      </footer>
    </section>
  );
}
