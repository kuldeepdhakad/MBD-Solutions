import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

function ContentImageBase({
  src,
  alt,
  className,
  fill,
  width = 800,
  height = 500,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ContentImageProps) {
  const isDataUri = src.startsWith("data:");

  const shared = {
    src,
    className: cn("object-cover", className),
    priority,
    loading: priority ? undefined : ("lazy" as const),
    unoptimized: isDataUri,
  };

  if (fill) {
    return (
      <Image
        alt={alt}
        {...shared}
        fill
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      alt={alt}
      {...shared}
      width={width}
      height={height}
      sizes={sizes}
    />
  );
}

export const ContentImage = memo(ContentImageBase);
