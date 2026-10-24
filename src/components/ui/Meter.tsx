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
      <div className="mb-2.5 flex items-baseline justify-between gap-4 text-sm">
        <span className="text-white/70">{label}</span>
        <span className="shrink-0 font-medium tabular-nums text-ivory">
          {display}
        </span>
      </div>
      <div className="h-[2px] w-full bg-white/15">
        <motion.div
          className="h-[2px] w-full origin-left bg-blush"
          initial={reduceMotion ? { scaleX: value / 100 } : { scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
