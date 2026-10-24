"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [current, setCurrent] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (elements.length === 0) return;

    const observed = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          observed.set(entry.target.id, entry.intersectionRatio);
        }

        let next = ids[0] ?? "";
        let best = 0;
        for (const id of ids) {
          const ratio = observed.get(id) ?? 0;
          if (ratio > best) {
            best = ratio;
            next = id;
          }
        }
        if (best > 0) setCurrent(next);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);

  return current;
}
