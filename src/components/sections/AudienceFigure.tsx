"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function AudienceFigure({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const play = <T,>(value: T) => (inView ? value : undefined);
  const timing = (duration: number, delay = 0) =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease };

  return (
    <div ref={ref} className="relative mx-auto max-w-[34rem]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-[7%] top-[13%] bottom-0 origin-bottom rounded-t-full bg-sand"
        initial={{ scaleY: 0.82, opacity: 0 }}
        animate={play({ scaleY: 1, opacity: 1 })}
        transition={timing(1.1)}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-[7%] top-[13%] bottom-0 rounded-t-full border border-b-0 border-blush-deep/25"
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={play({ x: 12, y: -12, opacity: 1 })}
        transition={timing(1.2, 0.35)}
      />
      <motion.div
        className="relative aspect-[3/4]"
        initial={{ y: 48, opacity: 0 }}
        animate={play({ y: 0, opacity: 1 })}
        transition={timing(1.2, 0.15)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={100}
          sizes="(max-width: 1024px) 90vw, 34rem"
          className="object-contain object-bottom"
        />
      </motion.div>
    </div>
  );
}
