import type { Metadata } from "next";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { mediaKit } from "@/data/media-kit";
import { mediaKitPath, mediaKitUrl, siteImage, siteName } from "@/lib/site";

const title = mediaKit.site.title;
const description = mediaKit.site.description;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [...mediaKit.site.keywords],
  category: "media kit",
  alternates: { canonical: mediaKitPath },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: mediaKitUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: siteImage.share,
        alt: "Caroline Rocha, criadora de lifestyle, moda e maternidade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteImage.share],
  },
};

export default function MediaKitLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SeoJsonLd />
      {children}
    </>
  );
}
