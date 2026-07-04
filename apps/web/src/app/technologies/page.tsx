import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Technologies",
  description:
    "Frontend, backend, databases, cloud, monitoring and security technologies used by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/technologies",
});

export default async function TechnologiesPage() {
  let technologies: any[] = [];
  try {
    const res = await getList("technologies", { limit: "100" });
    technologies = res.data || [];
  } catch {
    technologies = [];
  }

  const categories = Array.from(new Set(technologies.map((t) => t.category)));

  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Technology Stack"
        description="Modern, scalable technologies powering every MBD Solutions product and client delivery."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container space-y-12 px-5 md:px-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-5 text-2xl font-semibold text-primary">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {technologies
                  .filter((t) => t.category === category)
                  .map((tech) => (
                    <Card key={tech.id}>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-primary">{tech.name}</h3>
                        <p className="mt-2 text-sm text-muted">{tech.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
