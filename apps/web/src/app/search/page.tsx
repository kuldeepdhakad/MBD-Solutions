"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api(`/search?q=${encodeURIComponent(q)}`, { revalidate: false });
        const flat = [
          ...(data.services || []).map((s: any) => ({
            type: "Service",
            title: s.title,
            description: s.shortDesc,
            slug: s.slug,
            href: `/services/${s.slug}`,
          })),
          ...(data.products || []).map((p: any) => ({
            type: "Product",
            title: p.name,
            description: p.tagline,
            slug: p.slug,
            href: `/products/${p.slug}`,
          })),
          ...(data.projects || []).map((p: any) => ({
            type: "Project",
            title: p.title,
            description: p.overview,
            slug: p.slug,
            href: `/portfolio/${p.slug}`,
          })),
          ...(data.blogs || []).map((b: any) => ({
            type: "Blog",
            title: b.title,
            description: b.excerpt,
            slug: b.slug,
            href: `/blog/${b.slug}`,
          })),
        ];
        setResults(flat);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [q]);

  return (
    <>
      <PageHero eyebrow="Search" title="Search MBD Solutions" description="Find services, products, projects, blogs and careers." />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <Input
              className="pl-11"
              placeholder="Search products, services, blogs..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
              aria-label="Search Mon Bai Dhakad Solutions"
              type="search"
              name="q"
              autoComplete="off"
            />
          </div>
          <div className="mt-8 space-y-3">
            {loading && <p className="text-sm text-muted">Searching...</p>}
            {!loading && q && results.length === 0 && (
              <p className="text-sm text-muted">No results found for &ldquo;{q}&rdquo;.</p>
            )}
            {results.map((item) => (
              <Link key={`${item.type}-${item.slug}`} href={item.href}>
                <Card className="mb-3">
                  <CardContent className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-accent">{item.type}</p>
                    <h2 className="mt-1 font-semibold text-primary">{item.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
