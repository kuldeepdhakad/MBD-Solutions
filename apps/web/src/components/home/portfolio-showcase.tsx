"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { Button } from "@/components/ui/button";
import { resolveProjectDemoUrl } from "@/lib/demos";
import { getProjectImage } from "@/lib/images";

type Project = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  techStack?: string[];
  liveDemoUrl?: string | null;
  coverImage?: string | null;
  category?: string | null;
  industry?: { name: string } | null;
};

export function PortfolioShowcase({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <div className="space-y-8">
      {projects.map((project, index) => {
        const demoUrl = resolveProjectDemoUrl(project);
        const category =
          project.category || project.industry?.name || "Case Study";

        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`group grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-surface shadow-card lg:grid-cols-2 ${
              index % 2 === 1 ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div
              className={`relative h-64 overflow-hidden lg:h-full lg:min-h-[320px] ${
                index % 2 === 1 ? "lg:[direction:ltr]" : ""
              }`}
            >
              <ContentImage
                src={getProjectImage(project.slug, project.coverImage)}
                alt={project.title}
                fill
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-primary shadow-soft backdrop-blur-sm">
                {category}
              </span>
            </div>

            <div className={`p-6 md:p-8 lg:p-10 ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {category}
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-primary md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{project.overview}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(project.techStack || []).slice(0, 6).map((tech, i) => (
                  <span
                    key={`${project.id}-tech-${i}`}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/portfolio/${project.slug}`}>
                    View Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {demoUrl && (
                  <Button asChild variant="outline">
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
