import Link from "next/link";
import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentImage } from "@/components/shared/content-image";
import { getBlogImage } from "@/lib/images";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  blog: {
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    coverImage?: string | null;
    publishedAt?: string | null;
    category?: { name?: string } | null;
    author?: { name?: string } | null;
  };
};

function BlogCardBase({ blog }: BlogCardProps) {
  const image = getBlogImage(blog.slug, blog.coverImage);

  return (
    <Card className="group h-full overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <ContentImage
          src={image}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>
      <CardHeader className="pb-2">
        <p className="text-xs font-medium uppercase tracking-wide text-accent">
          {blog.category?.name || "Insight"}
        </p>
        <CardTitle className="line-clamp-2 text-lg sm:text-xl">{blog.title}</CardTitle>
        <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-xs text-muted">
          {blog.author?.name || "MBD Solutions"}
          {blog.publishedAt ? ` · ${formatDate(blog.publishedAt)}` : ""}
        </p>
        <Link
          href={`/blog/${blog.slug}`}
          prefetch
          className="link-hover text-sm font-medium text-primary transition-colors duration-200 hover:text-accent"
        >
          Read article →
        </Link>
      </CardContent>
    </Card>
  );
}

export const BlogCard = memo(BlogCardBase);
