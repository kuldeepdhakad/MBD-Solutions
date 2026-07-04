import { Controller, Get, Injectable, Module, Query } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(q: string) {
    if (!q?.trim()) return { results: [] };
    const term = q.trim();

    const [services, products, projects, blogs, jobs] = await Promise.all([
      this.prisma.service.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { shortDesc: { contains: term, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, shortDesc: true },
      }),
      this.prisma.product.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { name: { contains: term, mode: "insensitive" } },
            { tagline: { contains: term, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, name: true, slug: true, tagline: true },
      }),
      this.prisma.project.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { overview: { contains: term, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, overview: true },
      }),
      this.prisma.blog.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { excerpt: { contains: term, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, excerpt: true },
      }),
      this.prisma.job.findMany({
        where: {
          isActive: true,
          title: { contains: term, mode: "insensitive" },
        },
        take: 5,
        select: { id: true, title: true, slug: true, department: true },
      }),
    ]);

    return {
      results: [
        ...services.map((s) => ({ type: "service", title: s.title, slug: s.slug, href: `/services/${s.slug}`, description: s.shortDesc })),
        ...products.map((p) => ({ type: "product", title: p.name, slug: p.slug, href: `/products/${p.slug}`, description: p.tagline })),
        ...projects.map((p) => ({ type: "project", title: p.title, slug: p.slug, href: `/portfolio/${p.slug}`, description: p.overview })),
        ...blogs.map((b) => ({ type: "blog", title: b.title, slug: b.slug, href: `/blog/${b.slug}`, description: b.excerpt })),
        ...jobs.map((j) => ({ type: "job", title: j.title, slug: j.slug, href: `/careers/${j.slug}`, description: j.department })),
      ],
    };
  }
}

@Controller("search")
class SearchController {
  constructor(private service: SearchService) {}

  @Get()
  search(@Query("q") q: string) {
    return this.service.search(q);
  }
}

@Module({
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
