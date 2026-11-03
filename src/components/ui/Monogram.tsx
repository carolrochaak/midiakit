export function Monogram({ className = "size-11" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center rounded-full border border-gold/60 ${className}`}
    >
      <span className="absolute inset-[3px] rounded-full border border-gold/25" />
      <span className="text-foil font-serif text-[1.05em] leading-none tracking-[-0.06em] italic">
        CR
      </span>
    </span>
  );
}

const radius = 44;
const circumference = 2 * Math.PI * radius;

export function Seal({
  id,
  text,
  className = "size-32",
}: {
  id: string;
  text: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex items-center justify-center rounded-full border border-gold/50 bg-wine/85 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm ${className}`}
    >
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full">
        <defs>
          <path
            id={id}
            d={`M60 60 m-${radius} 0 a${radius} ${radius} 0 1 1 ${radius * 2} 0 a${radius} ${radius} 0 1 1 -${radius * 2} 0`}
          />
        </defs>
        <text
          fill="#c7a46b"
          fontSize="8.6"
          fontWeight="700"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <textPath href={`#${id}`} textLength={circumference - 4} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[24%] rounded-full border border-gold/30" />
      <span className="text-foil font-serif text-[1.9rem] leading-none tracking-[-0.06em] italic">
        CR
      </span>
    </span>
  );
}
