import type { Metadata } from "next";

import { PageHero } from "@/components/ui/section";

import { CTABand } from "@/components/shared/cta";

import { ProductCard } from "@/components/shared/product-card";

import { JsonLd } from "@/components/seo/json-ld";

import { getList } from "@/lib/api";

import { resolveProductDemoUrl } from "@/lib/demos";

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

        <div className="mx-auto grid max-w-container gap-6 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">

          {products.map((product) => (

            <ProductCard

              key={product.id}

              product={product}

              demoUrl={resolveProductDemoUrl(product)}

            />

          ))}

        </div>

      </section>

      <CTABand />

    </>

  );

}


