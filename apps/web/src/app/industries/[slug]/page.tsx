import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { DetailBanner } from "@/components/shared/detail-banner";
import { getOne } from "@/lib/api";
import { getIndustryImage } from "@/lib/images";
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const industry = await getOne("industries", slug);
    return createPageMetadata({
      title: industry.name,
      description:
        industry.description ||
        `${industry.name} solutions by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).`,
      path: `/industries/${slug}`,
      image: industry.image,
    });
  } catch {
    return createPageMetadata({
      title: "Industry",
      description:
        "Industry solutions by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
      path: `/industries/${slug}`,
      noIndex: true,
    });
  }
}

export default async function IndustryDetailPage({ params }: Props) {
  let industry: any;
  try {
    industry = await getOne("industries", (await params).slug);
  } catch {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
          serviceJsonLd({
            name: `${industry.name} Solutions`,
            description: industry.description || industry.name,
            path: `/industries/${industry.slug}`,
            image: industry.image,
          }),
        ]}
      />
      <PageHero eyebrow="Industry" title={industry.name} description={industry.description} />
      <section className="border-b border-border bg-panel py-8 md:py-10">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <DetailBanner
            src={getIndustryImage(industry.slug, industry.image)}
            alt={industry.name}
            priority
          />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <p className="max-w-2xl text-lg text-muted">
            MBD Solutions builds websites, management software, mobile apps and marketing systems tailored for the{" "}
            {industry.name.toLowerCase()} sector.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent"><Link href="/contact">Discuss Your Project</Link></Button>
            <Button asChild variant="outline"><Link href="/products">View Products</Link></Button>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
