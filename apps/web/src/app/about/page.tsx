import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/api";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions), our mission, vision and journey helping businesses grow digitally across India.",
  path: "/about",
});

const values = [
  { title: "Quality First", description: "Clean architecture, modern design and production standards on every project." },
  { title: "Transparent Pricing", description: "Clear packages and honest quotes with no hidden charges." },
  { title: "Client Partnership", description: "We stay available after delivery with 24×7 support." },
  { title: "Practical Innovation", description: "We use modern technology only when it creates real business value." },
];

const timeline = [
  { year: "2023", title: "Founded", description: "MBD Solutions launched in honour of Mon Bai Dhakad." },
  { year: "2024", title: "Product Suite", description: "Released DoctorCare Pro, FitZone Gym and FoodHub Restaurant." },
  { year: "2025", title: "100+ Projects", description: "Crossed 100 delivered projects across India." },
  { year: "2026", title: "Enterprise Platform", description: "Launched the full company platform with admin and client portals." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About"
        title="Built to Help Businesses Grow Digitally"
        description="MBD Solutions (Mon Bai Dhakad Solutions) delivers websites, software, mobile apps, AI solutions and digital marketing for businesses across India."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container space-y-10 px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold">Our Story</h2>
                <p className="mt-4 leading-relaxed text-muted">
                  MBD Solutions was established to help businesses grow digitally through websites, software,
                  mobile apps, AI solutions and digital marketing services. Founded by {siteConfig.founder} in
                  honour of Mon Bai Dhakad, the company focuses on practical, affordable and production-ready
                  digital products.
                </p>
              </CardContent>
            </Card>
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold">Mission</h2>
                  <p className="mt-3 text-muted">
                    Make professional digital solutions accessible to every business — from clinics and gyms to
                    restaurants, schools and enterprises.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold">Vision</h2>
                  <p className="mt-3 text-muted">
                    Become India&apos;s most trusted partner for industry-ready software platforms and digital growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-semibold">Core Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={`value-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-semibold">Timeline</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {timeline.map((item, index) => (
                <Card key={`timeline-${index}`}>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-accent">{item.year}</p>
                    <h3 className="mt-2 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-primary text-white">
            <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold">Meet the Founder</h2>
                <p className="mt-2 text-white/70">
                  Learn more about {siteConfig.founder}, Founder & CEO of MBD Solutions.
                </p>
              </div>
              <Button asChild variant="accent">
                <Link href="/founder">View Founder Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <CTABand />
    </>
  );
}
