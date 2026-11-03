"use client";

import { motion, useReducedMotion } from "motion/react";

type MeterProps = {
  label: string;
  display: string;
  value: number;
};

export function Meter({ label, display, value }: MeterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-4 text-[13px]">
        <span className="text-ivory/75">{label}</span>
        <span className="shrink-0 font-serif text-[1.35rem] leading-none text-gold-hi">
          {display}
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="bg-foil h-full w-full origin-left rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }
          }
        />
      </div>
    </div>
  );
}
