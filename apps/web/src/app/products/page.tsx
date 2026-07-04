import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { DynamicIcon } from "@/components/shared/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  description:
    "DoctorCare Pro, FitZone Gym, FoodHub Restaurant, HMS, School ERP, HRMS, CRM and custom enterprise software by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/products",
});

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    const res = await getList("products", { limit: "50" });
    products = res.data || [];
  } catch {
    products = [];
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <PageHero
        eyebrow="Products"
        title="Product Suite"
        description="Production-ready platforms for healthcare, fitness, restaurants and enterprise operations."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                  <DynamicIcon name={product.icon} className="h-5 w-5" />
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link href={`/products/${product.slug}`}>View Product</Link>
                </Button>
                {product.liveDemoUrl && (
                  <Button asChild size="sm" variant="outline">
                    <a href={product.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
