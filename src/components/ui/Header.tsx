"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { mediaKit } from "@/data/media-kit";
import { useActiveSection } from "@/hooks/useActiveSection";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Monogram } from "@/components/ui/Monogram";

const sectionIds = [
  "topo",
  ...mediaKit.nav.map((item) => item.id),
  "contato",
] as const;

const links = [...mediaKit.nav, { id: "contato", label: "Contato" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const current = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-gold/15 bg-wine/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[78rem] items-center justify-between gap-4 px-5 md:px-10">
          <a
            href="#topo"
            className="flex items-center gap-3"
            aria-label="Início do mídia kit"
            aria-current={current === "topo" ? "location" : undefined}
          >
            <Monogram className="size-10 text-[1.1rem] md:size-11" />
            <span className="leading-tight">
              <span className="block text-[12px] font-bold tracking-[0.24em] uppercase">
                Carol Rocha
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.26em] text-gold uppercase">
                Mídia kit
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 rounded-full border border-gold/20 bg-white/[0.04] p-1 lg:flex"
            aria-label="Seções"
          >
            {links.map((item) => {
              const active = current === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[10.5px] font-bold tracking-[0.14em] uppercase transition-colors xl:px-4 ${
                    active ? "text-gold-hi" : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-gold/25"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={mediaKit.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foil hidden min-h-11 items-center gap-2 rounded-full px-5 text-[10.5px] font-bold tracking-[0.18em] text-wine uppercase sm:inline-flex"
            >
              <WhatsAppIcon className="size-3.5" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={open ? closeMenu : openMenu}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative flex size-11 items-center justify-center rounded-full border border-gold/45 lg:hidden"
            >
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-3.5 translate-x-[3px] bg-current transition duration-300 ${
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
        className="site-dialog bg-glow-soft lg:hidden"
      >
        <div className="flex h-full min-h-0 flex-col overflow-y-auto px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))]">
          <div className="flex items-center justify-between gap-4">
            <p id={titleId} className="flex items-center gap-3">
              <Monogram className="size-10 text-[1.1rem]" />
              <span className="leading-tight">
                <span className="block text-[12px] font-bold tracking-[0.24em] uppercase">
                  Carol Rocha
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.26em] text-gold uppercase">
                  Mídia kit
                </span>
              </span>
            </p>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="relative flex size-11 items-center justify-center rounded-full border border-gold/45"
            >
              <span aria-hidden="true" className="absolute h-px w-5 rotate-45 bg-current" />
              <span aria-hidden="true" className="absolute h-px w-5 -rotate-45 bg-current" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col" aria-label="Seções">
            {links.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                aria-current={current === item.id ? "location" : undefined}
                className="flex items-baseline gap-4 border-b border-gold/15 py-4 font-serif text-[2.3rem] leading-none font-light"
              >
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={mediaKit.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="bg-foil mt-auto mb-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full text-[11px] font-bold tracking-[0.2em] text-wine uppercase"
          >
            <WhatsAppIcon className="size-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </dialog>
    </>
  );
}
