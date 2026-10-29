"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const instant = { duration: 0 };

const groupVariants: Variants = {
  hidden: { opacity: 0 },
  show: ({ stagger, reduce }: { stagger: number; reduce: boolean }) => ({
    opacity: 1,
    transition: reduce
      ? instant
      : { duration: 0.4, ease, staggerChildren: stagger, delayChildren: 0.08 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduce ? instant : { duration: 0.6, ease },
  }),
};

const groupTags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
};

const itemTags = {
  div: motion.div,
  li: motion.li,
  figure: motion.figure,
  span: motion.span,
  p: motion.p,
  dt: motion.dt,
  dd: motion.dd,
};

type StaggerProps = {
  children: ReactNode;
  as?: keyof typeof groupTags;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  "aria-label"?: string;
};

export function Stagger({
  children,
  as = "div",
  className = "",
  style,
  stagger = 0.07,
  ...rest
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const Tag = groupTags[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      style={style}
      variants={groupVariants}
      custom={{ stagger, reduce: Boolean(reduceMotion) }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  as?: keyof typeof itemTags;
  className?: string;
  style?: CSSProperties;
};

export function StaggerItem({
  children,
  as = "div",
  className = "",
  style,
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Tag = itemTags[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      style={style}
      variants={itemVariants}
      custom={Boolean(reduceMotion)}
    >
      {children}
    </Tag>
  );
}

export function LineMask({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  return (
    <span
      ref={ref}
      className="-mx-[0.08em] -my-[0.14em] block overflow-hidden px-[0.08em] py-[0.14em]"
    >
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={inView ? { y: 0 } : undefined}
        transition={reduceMotion ? instant : { duration: 0.95, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function DrawLine({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={reduceMotion ? instant : { duration: 1.1, delay: 0.15, ease }}
    />
  );
}

export function ImageReveal({
  children,
  className = "",
  radius = 28,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: `inset(100% 0% 0% 0% round ${radius}px)` }}
        animate={
          inView ? { clipPath: `inset(0% 0% 0% 0% round ${radius}px)` } : undefined
        }
        transition={reduceMotion ? instant : { duration: 1.1, ease }}
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={reduceMotion ? instant : { duration: 1.6, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

function parseFigure(value: string) {
  const match = value.match(/^(.*?)(\d[\d.,]*)(.*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const [integer, decimals = ""] = digits.split(",");

  return {
    prefix,
    suffix,
    target: Number(`${integer.replace(/\./g, "")}.${decimals || "0"}`),
    decimals: decimals.length,
    grouped: integer.includes("."),
  };
}

function formatFigure(
  amount: number,
  figure: NonNullable<ReturnType<typeof parseFigure>>,
) {
  const [integer, decimals] = amount.toFixed(figure.decimals).split(".");
  const grouped = figure.grouped
    ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : integer;

  return `${figure.prefix}${decimals ? `${grouped},${decimals}` : grouped}${figure.suffix}`;
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    const figure = parseFigure(value);
    if (!node || !figure || reduceMotion || inView) return;
    node.textContent = formatFigure(0, figure);
  }, [value, reduceMotion, inView]);

  useEffect(() => {
    const node = ref.current;
    const figure = parseFigure(value);
    if (!node || !figure || reduceMotion || !inView) return;

    const controls = animate(0, figure.target, {
      duration: 1.6,
      ease,
      onUpdate: (latest) => {
        node.textContent = formatFigure(latest, figure);
      },
      onComplete: () => {
        node.textContent = value;
      },
    });

    return () => controls.stop();
  }, [value, reduceMotion, inView]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </>
  );
}
