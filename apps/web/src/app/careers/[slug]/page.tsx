import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { ApplyForm } from "@/components/careers/apply-form";
import { JsonLd } from "@/components/seo/json-ld";
import { getOne } from "@/lib/api";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const job = await getOne("jobs", slug);
    return createPageMetadata({
      title: `${job.title} — Careers`,
      description:
        job.description ||
        `Apply for ${job.title} at Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).`,
      path: `/careers/${slug}`,
    });
  } catch {
    return createPageMetadata({
      title: "Job Opening",
      description:
        "Careers at Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
      path: `/careers/${slug}`,
      noIndex: true,
    });
  }
}

export default async function JobDetailPage({ params }: Props) {
  let job: any;
  try {
    job = await getOne("jobs", (await params).slug);
  } catch {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
            { name: job.title, path: `/careers/${job.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: job.description,
            datePosted: job.createdAt,
            employmentType: job.type || "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: siteConfig.legalName,
              alternateName: siteConfig.name,
              sameAs: siteConfig.url,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressLocality: job.location || "India",
              },
            },
          },
        ]}
      />
      <PageHero
        eyebrow={job.department}
        title={job.title}
        description={`${job.location} · ${job.type.replace("_", " ")}${job.salaryRange ? ` · ${job.salaryRange}` : ""}`}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-8 px-5 md:px-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">About the role</h2>
                <p className="mt-3 leading-relaxed text-muted">{job.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">Responsibilities</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {(job.responsibilities || []).map((item: string, index: number) => (
                    <li key={`${job.id}-resp-${index}`}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {(job.requirements || []).map((item: string, index: number) => (
                    <li key={`${job.id}-req-${index}`}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {(job.benefits || []).map((item: string, index: number) => (
                    <li key={`${job.id}-benefit-${index}`}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="h-fit">
            <CardContent className="p-8">
              <h2 className="mb-4 text-xl font-semibold">Apply Now</h2>
              <ApplyForm jobId={job.id} jobTitle={job.title} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
