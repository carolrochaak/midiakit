import { mediaKit } from "@/data/media-kit";
import { Monogram } from "@/components/ui/Monogram";
import { Container } from "@/components/ui/Section";

export function Footer() {
  const { nav, contact, site, updated } = mediaKit;
  const heading = "text-[10px] font-bold tracking-[0.26em] text-gold uppercase";
  const link = "transition-colors hover:text-gold-hi";

  return (
    <footer className="bg-wine-deep text-ivory/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <Monogram className="size-12 text-[1.25rem]" />
            <div className="leading-tight">
              <p className="font-serif text-[1.5rem] text-ivory">{site.name}</p>
              <p className="text-[10px] font-bold tracking-[0.26em] text-gold uppercase">Mídia kit</p>
            </div>
          </div>
          <p className="mt-6 max-w-xs font-serif text-[1.2rem] leading-snug italic">
            {mediaKit.hero.lead}
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2">
          <h2 className={`font-sans ${heading}`}>Navegação</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {[...nav, { id: "contato", label: "Contato" }].map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={`font-sans ${heading}`}>Contato</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            <li>
              <a href={`mailto:${contact.email}`} className={`break-all ${link}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp {contact.phone}
              </a>
            </li>
            <li>
              {contact.city}, {contact.state}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className={`font-sans ${heading}`}>Redes</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {contact.socials.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {social.label} {social.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={contact.linkInBio} target="_blank" rel="noopener noreferrer" className={link}>
                {contact.linkLabel}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-gold/15">
        <Container className="flex flex-col gap-2 pt-6 pb-24 text-[11px] tracking-[0.14em] text-ivory/55 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name} · Mídia kit</p>
          <p>Dados atualizados em {updated.toLowerCase()}</p>
        </Container>
      </div>
    </footer>
  );
}
