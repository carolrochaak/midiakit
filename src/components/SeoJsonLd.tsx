import { mediaKit } from "@/data/media-kit";
import { mediaKitUrl, siteImage, siteUrl } from "@/lib/site";

export function SeoJsonLd() {
  const { contact, site } = mediaKit;
  const image = `${siteUrl}${siteImage.share}`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Caroline Rocha",
    alternateName: ["Carol Rocha", "carolinerochaak", "carolinerocha.br"],
    description: site.description,
    image,
    jobTitle: "Criadora de conteúdo",
    email: contact.email,
    telephone: "+55-45-99157-1015",
    url: mediaKitUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: "PR",
      addressCountry: "BR",
    },
    sameAs: [...contact.socials.map((social) => social.href), contact.linkInBio],
    knowsAbout: [
      "lifestyle",
      "moda",
      "beleza",
      "maternidade",
      "TikTok Shop",
      "conteúdo para marcas",
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: site.title,
    description: site.description,
    url: mediaKitUrl,
    inLanguage: "pt-BR",
    primaryImageOfPage: image,
    mainEntity: {
      "@type": "Person",
      name: "Caroline Rocha",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}
