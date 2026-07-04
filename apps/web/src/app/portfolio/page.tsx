import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Explore delivered projects and live demos across healthcare, fitness, restaurants and enterprise software by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  let projects: any[] = [];
  try {
    const res = await getList("projects", { limit: "50" });
    projects = res.data || [];
  } catch {
    projects = [];
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <PageHero
        eyebrow="Portfolio"
        title="Selected Work"
        description="Real projects delivered for clinics, gyms, restaurants, contractors and growing businesses."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.overview}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  {(project.techStack || []).slice(0, 5).map((tech: string, index: number) => (
                    <span key={`${project.id}-tech-${index}`} className="rounded-full bg-background px-3 py-1 text-xs text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  View case study <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
