import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/section";
import { CTABand } from "@/components/shared/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { ContentImage } from "@/components/shared/content-image";
import { getOne } from "@/lib/api";
import { getBlogImage } from "@/lib/images";
import { articleJsonLd, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const blog = await getOne("blogs", slug);
    const title = blog.metaTitle || blog.title;
    const description =
      blog.metaDesc ||
      blog.excerpt ||
      `${blog.title} — insights from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).`;
    return createPageMetadata({
      title,
      description,
      path: `/blog/${slug}`,
      image: blog.coverImage,
      type: "article",
    });
  } catch {
    return createPageMetadata({
      title: "Blog",
      description:
        "Insights from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
}

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-10 mb-4 text-2xl font-semibold text-primary">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-5 list-disc text-muted">
          {line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
        </li>
      );
    }
    if (line.match(/^\d+\./)) {
      return (
        <li key={i} className="ml-5 list-decimal text-muted">
          {line.replace(/^\d+\.\s*/, "")}
        </li>
      );
    }
    if (!line.trim()) return <div key={i} className="h-3" />;
    return (
      <p key={i} className="mb-4 leading-relaxed text-muted">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: Props) {
  let blog: any;
  try {
    blog = await getOne("blogs", (await params).slug);
  } catch {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: blog.title, path: `/blog/${blog.slug}` },
          ]),
          articleJsonLd({
            title: blog.title,
            description: blog.excerpt || blog.title,
            path: `/blog/${blog.slug}`,
            image: blog.coverImage,
            datePublished: blog.publishedAt,
            dateModified: blog.updatedAt,
            authorName: blog.author?.name,
          }),
        ]}
      />
      <PageHero
        eyebrow={blog.category?.name || "Blog"}
        title={blog.title}
        description={blog.excerpt}
      />
      <section className="border-b border-border bg-panel py-8 md:py-10">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="relative h-48 overflow-hidden rounded-2xl border border-border shadow-soft sm:h-56 md:h-72">
            <ContentImage
              src={getBlogImage(blog.slug, blog.coverImage)}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <article className="py-16 md:py-20" itemScope itemType="https://schema.org/Article">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="mb-8 text-sm text-muted">
            By {blog.author?.name || "MBD Solutions"}
            {blog.publishedAt ? ` · ${formatDate(blog.publishedAt)}` : ""}
            {blog.views ? ` · ${blog.views} views` : ""}
          </p>
          <div className="prose-mbd">{renderContent(blog.content || "")}</div>
          <div className="mt-10">
            <Link href="/blog" className="text-sm font-medium text-accent">
              ← Back to blog
            </Link>
          </div>
        </div>
      </article>
      <CTABand />
    </>
  );
}
