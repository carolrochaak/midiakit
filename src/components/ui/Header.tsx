"use client";

import { useEffect, useId, useRef, useState } from "react";
import { mediaKit } from "@/data/media-kit";
import { useActiveSection } from "@/hooks/useActiveSection";
import { WhatsAppIcon } from "@/components/ui/Icons";

const sectionIds = [
  "topo",
  ...mediaKit.nav.map((item) => item.id),
  "contato",
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const current = useActiveSection(sectionIds);

  function openMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
    setOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-ivory/95 text-ink backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 md:h-20 md:px-8">
          <a
            href="#topo"
            className="flex items-baseline gap-1.5"
            aria-label="Início do mídia kit"
            aria-current={current === "topo" ? "location" : undefined}
          >
            <span className="font-serif text-[1.7rem] leading-none italic">Carol</span>
            <span className="hidden text-sm font-light tracking-[0.16em] sm:inline">
              Rocha
            </span>
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Seções">
            {mediaKit.nav.map((item) => {
              const active = current === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                    active ? "text-ink" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={mediaKit.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 bg-white/70 px-3 text-[11px] font-medium uppercase tracking-[0.16em] transition hover:bg-ink hover:text-ivory sm:px-4"
            >
              <WhatsAppIcon className="size-3.5" />
              <span className="hidden min-[380px]:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={open ? closeMenu : openMenu}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative flex size-11 items-center justify-center rounded-full border border-ink/20 bg-white/70 lg:hidden"
            >
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="menu-mobile"
        aria-labelledby={titleId}
        className="site-dialog lg:hidden"
      >
        <div className="flex h-full flex-col px-5 pt-24 pb-10">
          <p id={titleId} className="sr-only">
            Menu de seções
          </p>
          <nav className="flex flex-col" aria-label="Seções">
            {mediaKit.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                aria-current={current === item.id ? "location" : undefined}
                className="border-b border-ink/10 py-4 font-serif text-4xl leading-none"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={closeMenu}
              aria-current={current === "contato" ? "location" : undefined}
              className="border-b border-ink/10 py-4 font-serif text-4xl leading-none"
            >
              Contato
            </a>
          </nav>
          <a
            href={mediaKit.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-ink text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </dialog>
    </>
  );
}
