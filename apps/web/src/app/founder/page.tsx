import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { getFounder, siteConfig } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Founder",
  description:
    "Kuldeep Dhakad, Founder and CEO of Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) - building production software for real businesses.",
  path: "/founder",
});

async function loadFounder() {
  try {
    const founder = await getFounder();
    if (founder) return founder;
  } catch {
    /* fallback below */
  }
  return {
    name: siteConfig.founder,
    title: "Founder & CEO, MBD Solutions",
    biography:
      "Kuldeep Dhakad is the founder of MBD Solutions (Mon Bai Dhakad Solutions), a technology company dedicated to helping businesses across India grow digitally. Named in honour of Mon Bai Dhakad, the company delivers websites, ERP systems, mobile apps, AI solutions, and digital marketing at prices that work for startups and growing businesses.",
    experience: [
      {
        role: "Founder & CEO",
        company: "MBD Solutions",
        period: "2023 ? Present",
        description:
          "Leading product strategy, engineering, and client delivery across websites, ERP, mobile apps, and AI solutions.",
      },
    ],
    skills: [
      "Full Stack Development",
      "Product Strategy",
      "Next.js",
      "PostgreSQL",
      "AI Solutions",
      "Client Consulting",
    ],
    achievements: [
      "Delivered 100+ digital projects across India",
      "Built industry platforms for healthcare, gyms, restaurants, and labour contractors",
      "Established MBD Solutions in honour of Mon Bai Dhakad",
    ],
    timeline: [
      { year: "2023", title: "Founded MBD Solutions", description: "Launched Mon Bai Dhakad Solutions." },
      { year: "2025", title: "100+ Projects", description: "Crossed 100 delivered projects." },
      { year: "2026", title: "Enterprise Platform", description: "Launched the full company platform." },
    ],
    email: siteConfig.email,
    phone: siteConfig.phone,
  };
}

export default async function FounderPage() {
  const founder: any = await loadFounder();

  return (
    <>
      <PageHero eyebrow="Founder" title={founder.name} description={founder.title} />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container space-y-8 px-5 md:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold">Biography</h2>
              <div className="mt-4 space-y-4 text-muted leading-relaxed">
                {String(founder.biography || "")
                  .split("\n\n")
                  .map((para: string, index: number) => (
                    <p key={`bio-${index}`}>{para}</p>
                  ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {founder.email && (
                  <Button asChild variant="outline">
                    <a href={`mailto:${founder.email}`}>Email</a>
                  </Button>
                )}
                {founder.phone && (
                  <Button asChild>
                    <a href={`tel:+91${founder.phone}`}>Call {founder.phone}</a>
                  </Button>
                )}
                {founder.linkedinUrl && (
                  <Button asChild variant="outline">
                    <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </Button>
                )}
                {founder.githubUrl && (
                  <Button asChild variant="outline">
                    <a href={founder.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">Experience</h2>
                <div className="mt-4 space-y-4">
                  {(founder.experience || []).map((item: any, index: number) => (
                    <div key={`exp-${index}`} className="border-b border-border pb-4 last:border-0">
                      <p className="font-medium text-primary">{item.role}</p>
                      <p className="text-sm text-accent">
                        {item.company}  - {item.period}
                      </p>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(founder.skills || []).map((skill: string, index: number) => (
                    <span key={`skill-${index}`} className="rounded-full bg-background px-3 py-1.5 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <h2 className="mt-8 text-xl font-semibold">Achievements</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {(founder.achievements || []).map((item: string, index: number) => (
                    <li key={`achievement-${index}`}>? {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {(founder.timeline || []).length > 0 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold">Timeline</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {(founder.timeline || []).map((item: any, index: number) => (
                    <div key={`timeline-${index}`} className="rounded-xl border border-border p-4">
                      <p className="text-sm font-medium text-accent">{item.year}</p>
                      <p className="mt-1 font-medium">{item.title}</p>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}
