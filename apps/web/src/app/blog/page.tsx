import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Tips and guides to grow your business digitally from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/blog",
});

export default async function BlogPage() {
  let blogs: any[] = [];
  try {
    const res = await getList("blogs", { limit: "50" });
    blogs = res.data || [];
  } catch {
    blogs = [];
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero eyebrow="Blog" title="Insights" description="Practical guides on websites, software, AI and digital growth." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-wide text-accent">
                  {blog.category?.name || "Insight"}
                </p>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
                <CardDescription>{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-xs text-muted">
                  {blog.author?.name || "MBD Solutions"}
                  {blog.publishedAt ? ` · ${formatDate(blog.publishedAt)}` : ""}
                </p>
                <Link href={`/blog/${blog.slug}`} className="text-sm font-medium text-accent">
                  Read article →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
