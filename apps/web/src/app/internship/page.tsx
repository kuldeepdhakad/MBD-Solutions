import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Internship",
  description:
    "Internship programs in software development, web, mobile and AI at Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/internship",
});

export default async function InternshipPage() {
  let jobs: any[] = [];
  try { const res = await getList("jobs", { isInternship: "true" }); jobs = res.data || []; } catch {}
  return (
    <>
      <PageHero eyebrow="Careers" title="Internship Program" description="Learn production engineering by contributing to real client and product codebases under mentorship." />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container space-y-6 px-5 md:px-8">
          <Card><CardContent className="p-8"><h2 className="text-xl font-semibold">What you will learn</h2><ul className="mt-4 space-y-2 text-sm text-muted"><li>- Full stack development with Next.js and NestJS</li><li>- Clean architecture and code reviews</li><li>- Real client delivery workflows</li><li>- Product thinking and documentation</li></ul></CardContent></Card>
          {jobs.map((job) => (
            <Card key={job.id}><CardContent className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between"><div><h3 className="text-lg font-semibold">{job.title}</h3><p className="mt-1 text-sm text-muted">{job.location}</p></div><Button asChild><Link href={`/careers/${job.slug}`}>Apply Now</Link></Button></CardContent></Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
