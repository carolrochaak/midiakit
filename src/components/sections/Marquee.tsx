import { Fragment } from "react";
import { mediaKit } from "@/data/media-kit";

export function Marquee() {
  const items = mediaKit.audience.pillars;

  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden bg-blush-deep py-5 text-ivory md:py-6"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <Fragment key={item}>
                <span className="px-6 font-serif text-[1.55rem] leading-none whitespace-nowrap italic md:px-9 md:text-[2rem]">
                  {item}
                </span>
                <span className="size-1.5 shrink-0 rounded-full bg-sand" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
