import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description:
    "Join Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) and build production software that helps real businesses grow.",
  path: "/careers",
});

export default async function CareersPage() {
  let jobs: any[] = [];
  try {
    const res = await getList("jobs", { limit: "50" });
    jobs = res.data || [];
  } catch {
    jobs = [];
  }

  const fullTime = jobs.filter((j) => !j.isInternship);
  const internships = jobs.filter((j) => j.isInternship);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build With MBD Solutions"
        description="Join a team shipping real products for clinics, gyms, restaurants and enterprises across India."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container space-y-12 px-5 md:px-8">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Open Roles</h2>
            <div className="grid gap-4">
              {fullTime.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <p className="mt-1 text-sm text-muted">
                        {job.department} · {job.location} · {job.type.replace("_", " ")}
                      </p>
                    </div>
                    <Button asChild>
                      <Link href={`/careers/${job.slug}`}>View Role</Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Internships</h2>
              <Button asChild variant="outline" size="sm">
                <Link href="/internship">Internship Program</Link>
              </Button>
            </div>
            <div className="grid gap-4">
              {internships.map((job) => (
                <Card key={job.id}>
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {job.department} · {job.location}
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/careers/${job.slug}`}>Apply</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABand title="Don't see the right role?" description="Send your profile to kuldeepdhakad153@gmail.com and we'll keep you in mind." />
    </>
  );
}
