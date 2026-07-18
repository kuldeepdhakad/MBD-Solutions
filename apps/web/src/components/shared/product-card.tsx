import Link from "next/link";
import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { DynamicIcon } from "@/components/shared/icon";
import { getProductImage } from "@/lib/images";

type ProductCardProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    icon: string;
    bannerImage?: string | null;
  };
  demoUrl?: string | null;
};

function ProductCardBase({ product, demoUrl }: ProductCardProps) {
  return (
    <Card className="group h-full overflow-hidden">
      <div className="relative h-40 overflow-hidden sm:h-44">
        <ContentImage
          src={getProductImage(product.slug, product.bannerImage)}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
          <DynamicIcon name={product.icon} className="h-5 w-5" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href={`/products/${product.slug}`} prefetch>
            View Product
          </Link>
        </Button>
        {demoUrl && (
          <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export const ProductCard = memo(ProductCardBase);
