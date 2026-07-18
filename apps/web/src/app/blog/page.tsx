import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { BlogCard } from "@/components/shared/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getList } from "@/lib/api";

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
        <div className="mx-auto grid max-w-container gap-6 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </>
  );
}
