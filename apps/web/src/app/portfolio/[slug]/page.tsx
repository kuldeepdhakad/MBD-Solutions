import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { DetailBanner } from "@/components/shared/detail-banner";
import { getOne } from "@/lib/api";
import { resolveProjectDemoUrl } from "@/lib/demos";
import { getProjectImage } from "@/lib/images";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const project = await getOne("projects", slug);
    return createPageMetadata({
      title: project.title,
      description:
        project.overview ||
        `${project.title} — portfolio project by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).`,
      path: `/portfolio/${slug}`,
      image: project.coverImage || project.image,
    });
  } catch {
    return createPageMetadata({
      title: "Project",
      description:
        "Portfolio projects by Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  let project: any;
  try {
    project = await getOne("projects", (await params).slug);
  } catch {
    notFound();
  }

  const demoUrl = resolveProjectDemoUrl(project);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
      <section className="border-b border-border bg-surface/60 pt-28 pb-16 md:pt-36">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <DetailBanner
            src={getProjectImage(project.slug, project.coverImage)}
            alt={project.title}
            priority
          />
          <p className="mb-3 text-sm font-medium text-accent">Case Study</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{project.overview}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {demoUrl && (
              <Button asChild variant="accent">
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              </Button>
            )}
            <Button asChild>
              <Link href="/contact">Start Similar Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:px-8 lg:grid-cols-2">
          <Card><CardContent className="p-8"><h2 className="text-xl font-semibold">Problem</h2><p className="mt-3 text-muted leading-relaxed">{project.problem}</p></CardContent></Card>
          <Card><CardContent className="p-8"><h2 className="text-xl font-semibold">Solution</h2><p className="mt-3 text-muted leading-relaxed">{project.solution}</p></CardContent></Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Features</h2>
              <ul className="mt-4 space-y-2">
                {(project.features || []).map((f: string, index: number) => (
                  <li key={`${project.id}-feature-${index}`} className="flex gap-2 text-sm text-secondary"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />{f}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Results</h2>
              <ul className="mt-4 space-y-2">
                {(project.results || []).map((r: string, index: number) => (
                  <li key={`${project.id}-result-${index}`} className="flex gap-2 text-sm text-secondary"><CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />{r}</li>
                ))}
              </ul>
              {project.timeline && <p className="mt-6 text-sm text-muted"><span className="font-medium text-primary">Timeline:</span> {project.timeline}</p>}
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto mt-8 max-w-container px-5 md:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Tech Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(project.techStack || []).map((tech: string, index: number) => (
                  <span key={`${project.id}-tech-${index}`} className="rounded-full bg-background px-3 py-1.5 text-sm">{tech}</span>
                ))}
              </div>
              {project.clientReview && (
                <blockquote className="mt-8 border-l-2 border-accent pl-4 text-muted italic">
                  {project.clientReview}
                </blockquote>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <CTABand />
    </>
  );
}
