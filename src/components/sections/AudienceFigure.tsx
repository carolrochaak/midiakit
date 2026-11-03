"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function AudienceFigure({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const play = <T,>(value: T) => (inView ? value : undefined);
  const timing = (duration: number, delay = 0) =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease };

  return (
    <div ref={ref} className="relative mx-auto aspect-[3/4] w-full max-w-[30rem]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-[4%] top-[6%] bottom-0 rounded-t-full border border-gold/45"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={play({ opacity: 1, scale: 1 })}
        transition={timing(1.2, 0.3)}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-[10%] top-[12%] bottom-0 origin-bottom rounded-t-full bg-linear-to-b from-rose/80 via-beige to-beige"
        initial={{ scaleY: 0.85, opacity: 0 }}
        animate={play({ scaleY: 1, opacity: 1 })}
        transition={timing(1.1)}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ y: 40, opacity: 0 }}
        animate={play({ y: 0, opacity: 1 })}
        transition={timing(1.2, 0.15)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={100}
          sizes="(max-width: 1024px) 90vw, 30rem"
          className="object-contain object-bottom"
        />
      </motion.div>
    </div>
  );
}
