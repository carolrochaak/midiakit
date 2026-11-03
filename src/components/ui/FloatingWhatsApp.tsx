"use client";

import { useEffect, useState } from "react";
import { mediaKit } from "@/data/media-kit";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={mediaKit.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar a Carol no WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 inline-flex min-h-12 items-center gap-2.5 rounded-full border border-gold/50 bg-marsala-deep px-5 text-[10.5px] font-bold tracking-[0.18em] text-ivory uppercase shadow-[0_0_0_6px_rgba(199,164,107,0.12),0_18px_40px_-16px_rgba(0,0,0,0.6)] transition-[opacity,translate,background-color] duration-500 hover:bg-marsala md:right-6 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-4 text-gold" />
      WhatsApp
    </a>
  );
}
