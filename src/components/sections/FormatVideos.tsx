"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

type Sample = {
  src: string;
  href: string;
  caption: string;
  note?: string;
};

type VideoNode = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 translate-x-px fill-current">
      <path d="M8 5.8v12.4L19 12 8 5.8Z" />
    </svg>
  );
}

function MuteMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 10v4h3.2L12 18V6L7.2 10H4Z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </svg>
  );
}

function SoundMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 10v4h3.2L12 18V6L7.2 10H4Z" />
      <path d="M16 9.2a4.2 4.2 0 0 1 0 5.6M18.6 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

function ExpandMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[17px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

function CollapseMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[17px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5" />
    </svg>
  );
}

function Control({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="flex size-9 items-center justify-center rounded-full border border-gold/55 bg-wine/70 text-gold-hi backdrop-blur-sm transition-colors hover:border-gold hover:text-ivory"
    >
      {children}
    </button>
  );
}

export function FormatVideos({ items }: { items: readonly Sample[] }) {
  const nodes = useRef<Record<string, VideoNode | null>>({});
  const frames = useRef<Record<string, HTMLDivElement | null>>({});
  const [playing, setPlaying] = useState<string | null>(null);
  const [unmuted, setUnmuted] = useState<string | null>(null);
  const [wide, setWide] = useState<string | null>(null);
  const wideRef = useRef<string | null>(null);
  const nativeWide = useRef(false);
  wideRef.current = wide;

  useEffect(() => {
    const watched = Object.values(nodes.current).filter(Boolean) as VideoNode[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) continue;
          const video = entry.target as VideoNode;
          if (video.webkitDisplayingFullscreen) continue;
          const expanded = wideRef.current;
          if (expanded && nodes.current[expanded] === video) continue;
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    for (const video of watched) observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function syncWide() {
      const active = document.fullscreenElement;
      if (!active) {
        if (nativeWide.current) {
          nativeWide.current = false;
          setWide(null);
        }
        return;
      }
      nativeWide.current = true;
      const match = Object.entries(frames.current).find(([, node]) => node === active);
      setWide(match?.[0] ?? null);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (document.fullscreenElement) return;
      setWide(null);
    }

    document.addEventListener("fullscreenchange", syncWide);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", syncWide);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!wide) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [wide]);

  function pauseOthers(src: string) {
    for (const [key, node] of Object.entries(nodes.current)) {
      if (key === src || !node) continue;
      node.pause();
      node.muted = true;
    }
  }

  function toggle(src: string) {
    const video = nodes.current[src];
    if (!video) return;

    if (playing === src && !video.paused) {
      video.pause();
      setPlaying(null);
      return;
    }

    pauseOthers(src);
    video.muted = unmuted !== src;
    void video.play();
    setPlaying(src);
  }

  function toggleSound(src: string) {
    const video = nodes.current[src];
    if (!video) return;

    const next = unmuted !== src;
    pauseOthers(src);
    video.muted = !next;
    video.volume = 1;
    setUnmuted(next ? src : null);

    if (next && video.paused) {
      void video.play();
      setPlaying(src);
    }
  }

  async function toggleWide(src: string) {
    const video = nodes.current[src];
    const frame = frames.current[src];
    if (!video) return;

    if (wide === src || document.fullscreenElement || video.webkitDisplayingFullscreen) {
      if (document.fullscreenElement) await document.exitFullscreen();
      video.webkitExitFullscreen?.();
      nativeWide.current = false;
      setWide(null);
      return;
    }

    pauseOthers(src);
    video.muted = unmuted !== src;
    if (video.paused) {
      void video.play();
      setPlaying(src);
    }

    setWide(src);

    const iOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (iOS && video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      return;
    }

    try {
      if (frame?.requestFullscreen) {
        await frame.requestFullscreen();
        nativeWide.current = Boolean(document.fullscreenElement);
      }
    } catch {
      nativeWide.current = false;
    }
  }

  return (
    <Stagger as="ul" className="mt-16 grid grid-cols-2 gap-5 lg:mt-20 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
      {items.map((item, index) => {
        const active = playing === item.src;
        const hasSound = unmuted === item.src;
        const isWide = wide === item.src;

        return (
          <StaggerItem as="li" key={item.src} className="min-w-0">
            <figure className="group">
              <div className="relative px-1.5 pt-1.5 md:px-2 md:pt-2">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-t-full border border-gold/40"
                />
                <div className="relative aspect-[9/16]">
                <div
                  ref={(node) => {
                    frames.current[item.src] = node;
                  }}
                  className={`reel-frame absolute inset-0 overflow-hidden rounded-t-full border border-gold/55 bg-wine-deep ${
                    isWide ? "is-expanded" : ""
                  }`}
                >
                  <video
                    ref={(node) => {
                      nodes.current[item.src] = node;
                    }}
                    src={`${item.src}#t=0.1`}
                    muted={unmuted !== item.src}
                    loop
                    playsInline
                    preload="metadata"
                    onPlay={() => setPlaying(item.src)}
                    onPause={() => setPlaying((current) => (current === item.src ? null : current))}
                    onVolumeChange={(event) => {
                      const video = event.currentTarget;
                      setUnmuted((current) => {
                        if (!video.muted) return item.src;
                        return current === item.src ? null : current;
                      });
                    }}
                    className={
                      isWide
                        ? "size-full object-contain"
                        : "absolute inset-0 size-full object-cover"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => toggle(item.src)}
                    aria-label={active ? `Pausar: ${item.caption}` : `Reproduzir: ${item.caption}`}
                    className="absolute inset-x-0 top-0 bottom-12 flex items-center justify-center"
                  >
                    <span
                      className={`flex size-12 items-center justify-center rounded-full bg-foil text-wine shadow-[0_16px_32px_-18px_rgba(0,0,0,0.7)] transition-opacity duration-300 ${
                        active ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      }`}
                    >
                      {active ? (
                        <span aria-hidden="true" className="flex gap-1">
                          <span className="h-3.5 w-[3px] rounded-full bg-current" />
                          <span className="h-3.5 w-[3px] rounded-full bg-current" />
                        </span>
                      ) : (
                        <PlayMark />
                      )}
                    </span>
                  </button>
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-linear-to-t from-wine-deep/80 to-transparent px-3 pt-8 pb-3">
                    <Control
                      label={hasSound ? "Desativar som" : "Ativar som"}
                      pressed={hasSound}
                      onClick={() => toggleSound(item.src)}
                    >
                      {hasSound ? <SoundMark /> : <MuteMark />}
                    </Control>
                    <Control
                      label={isWide ? "Sair da tela cheia" : "Tela cheia"}
                      pressed={isWide}
                      onClick={() => void toggleWide(item.src)}
                    >
                      {isWide ? <CollapseMark /> : <ExpandMark />}
                    </Control>
                  </div>
                </div>
                </div>
              </div>
              <figcaption className="mt-4 px-1">
                <p className="font-serif text-[13px] text-marsala italic">
                  Nº {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1.5 font-serif text-[1.15rem] leading-tight text-ink md:text-[1.25rem]">
                  {item.caption}
                </p>
                {item.note ? (
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{item.note}</p>
                ) : null}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-marsala uppercase transition-colors hover:text-marsala-deep"
                >
                  <InstagramIcon className="size-3.5" />
                  Ver no Instagram
                </a>
              </figcaption>
            </figure>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
