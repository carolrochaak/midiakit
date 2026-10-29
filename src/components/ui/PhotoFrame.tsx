import Image from "next/image";

type PhotoFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  object?: string;
  contain?: boolean;
};

export function PhotoFrame({
  src,
  alt,
  sizes,
  className = "aspect-[3/4] overflow-hidden",
  object = "object-cover object-[center_18%]",
  contain = false,
}: PhotoFrameProps) {
  return (
    <div
      className={`relative bg-sand ${className}`}
      style={{ borderRadius: "var(--radius-media)" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={contain ? "object-contain" : object}
      />
    </div>
  );
}
