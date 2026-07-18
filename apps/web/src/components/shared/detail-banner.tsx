import { ContentImage } from "@/components/shared/content-image";

type DetailBannerProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function DetailBanner({ src, alt, priority }: DetailBannerProps) {
  return (
    <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl border border-border shadow-soft sm:h-56 md:mb-10 md:h-64 lg:h-72">
      <ContentImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
    </div>
  );
}
