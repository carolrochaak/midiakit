"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mediaKit } from "@/data/media-kit";

type Shot = (typeof mediaKit.numbers.proofs)[number];

function isPortrait(shot: Shot) {
  return shot.height > shot.width;
}

function DeviceFrame({
  shot,
  sizes,
}: {
  shot: Shot;
  sizes: string;
}) {
  const portrait = isPortrait(shot);

  return (
    <div
        className={`overflow-hidden bg-white shadow-[0_22px_55px_-28px_rgba(107,33,54,0.4)] ring-1 ring-ink/10 ${
        portrait
          ? "h-[22rem] w-[10.15rem] rounded-[1.85rem] p-1.5 md:h-[28rem] md:w-[12.9rem]"
          : "w-[min(100%,34rem)] rounded-[1.35rem] p-1.5"
      }`}
    >
      {portrait ? (
        <div className="relative h-full overflow-hidden rounded-[1.4rem] bg-white">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            quality={90}
            sizes={sizes}
            className="object-contain"
          />
        </div>
      ) : (
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          quality={90}
          sizes={sizes}
          className="h-auto w-full rounded-[1.05rem]"
        />
      )}
    </div>
  );
}

export function MetricShots() {
  const { proofs, proofsTitle, proofsText } = mediaKit.numbers;
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLButtonElement | null>(null);
  const shouldFocusClose = useRef(false);
  const openTrigger = useRef<HTMLButtonElement | null>(null);
  const pointerStart = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const shot = proofs[selected];
  const current = active === null ? null : proofs[active];
  const wide = current ? current.width > current.height : false;
  const total = proofs.length;

  function goTo(index: number) {
    setSelected((index + total) % total);
  }

  function open() {
    if (didSwipe.current) return;
    returnTo.current = openTrigger.current;
    shouldFocusClose.current = true;
    setActive(selected);
  }

  function close() {
    setActive(null);
  }

  function stepLightbox(direction: -1 | 1) {
    const from = active ?? selected;
    const next = (from + direction + total) % total;
    setActive(next);
    setSelected(next);
  }

  useEffect(() => {
    if (active === null) {
      returnTo.current?.focus();
      returnTo.current = null;
      return;
    }

    if (shouldFocusClose.current) {
      closeRef.current?.focus();
      shouldFocusClose.current = false;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const direction = event.key === "ArrowLeft" ? -1 : 1;
        setActive((currentIndex) => {
          if (currentIndex === null) return currentIndex;
          const next = (currentIndex + direction + total) % total;
          setSelected(next);
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, total]);

  return (
    <div className="mt-16 bg-ivory px-4 py-8 text-ink sm:px-8 sm:py-10" style={{ borderRadius: "var(--radius-media)" }}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium tracking-[0.28em] text-stone uppercase">
            Prints
          </p>
          <h3 className="mt-3 font-serif text-4xl leading-none tracking-tight text-balance md:text-5xl">
            {proofsTitle}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {proofsText}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[11px] tracking-[0.22em] text-stone uppercase tabular-nums">
            {String(selected + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={() => goTo(selected - 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/15 text-[11px] tracking-[0.16em] uppercase"
            aria-label="Print anterior"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(selected + 1)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/15 text-[11px] tracking-[0.16em] uppercase"
            aria-label="Próximo print"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="mt-8 rounded-[1.45rem] bg-sand/80 px-4 py-8 md:px-10 md:py-10"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
          didSwipe.current = false;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const delta = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(delta) < 48) return;
          didSwipe.current = true;
          goTo(selected + (delta < 0 ? 1 : -1));
        }}
      >
        <div className="flex min-h-[22rem] items-center justify-center md:min-h-[30rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={shot.src}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <button
                type="button"
                ref={openTrigger}
                onClick={open}
                className="cursor-zoom-in"
                aria-label={`Ampliar print: ${shot.alt}`}
              >
                <DeviceFrame
                  shot={shot}
                  sizes={
                    isPortrait(shot)
                      ? "(max-width: 768px) 11rem, 13rem"
                      : "(max-width: 768px) 100vw, 34rem"
                  }
                />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] font-medium tracking-[0.18em] text-ink uppercase">
            {shot.label}
          </p>
          <p className="mt-1 text-sm text-stone">{shot.caption}</p>
          <p className="mt-3 text-[11px] tracking-[0.16em] text-stone/80 uppercase">
            Toque para ampliar
          </p>
        </div>
      </div>

      <ul className="mt-6 flex items-end justify-center gap-3">
        {proofs.map((item, index) => {
          const portrait = isPortrait(item);
          const currentShot = index === selected;

          return (
            <li key={item.src}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ver print de ${item.label}`}
                aria-current={currentShot ? "true" : undefined}
                className={`relative overflow-hidden bg-white ring-2 transition ${
                  portrait
                    ? "h-[4.75rem] w-11 rounded-xl"
                    : "h-[4.75rem] w-[6rem] rounded-xl"
                } ${
                  currentShot
                    ? "ring-ink"
                    : "opacity-50 ring-transparent hover:opacity-100"
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {current && active !== null
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex flex-col bg-ink text-ivory"
              role="dialog"
              aria-modal="true"
              aria-label={current.alt}
              onClick={close}
            >
              <div
                className="flex items-center justify-between px-4 py-4 md:px-8"
                onClick={(event) => event.stopPropagation()}
              >
                <p className="text-[11px] tracking-[0.22em] uppercase">
                  {current.label}
                  <span className="text-white/45">
                    {" "}
                    · {active + 1} / {total}
                  </span>
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-[11px] tracking-[0.18em] uppercase"
                >
                  Fechar
                </button>
              </div>

              <div
                className={`relative mx-auto w-full ${wide ? "h-[58vh] max-w-3xl" : "h-[74vh] max-w-md"}`}
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div
                className="flex items-center justify-between gap-3 px-4 py-5 md:px-8"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => stepLightbox(-1)}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-[11px] tracking-[0.16em] uppercase"
                >
                  Anterior
                </button>
                <p className="text-sm text-white/70">{current.caption}</p>
                <button
                  type="button"
                  onClick={() => stepLightbox(1)}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-[11px] tracking-[0.16em] uppercase"
                >
                  Próximo
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
