import { Controller, Get, Injectable, Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
class PublicService {
  constructor(private prisma: PrismaService) {}

  async home() {
    const [
      sections,
      stats,
      services,
      products,
      projects,
      industries,
      testimonials,
      blogs,
      faqs,
      clients,
      partners,
      processSteps,
      settings,
    ] = await Promise.all([
      this.prisma.homepageSection.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
      this.prisma.statistic.findMany({ orderBy: { sortOrder: "asc" } }),
      this.prisma.service.findMany({
        where: { status: "PUBLISHED", isFeatured: true },
        orderBy: { sortOrder: "asc" },
        take: 6,
      }),
      this.prisma.product.findMany({
        where: { status: "PUBLISHED", isFeatured: true },
        orderBy: { sortOrder: "asc" },
        take: 6,
      }),
      this.prisma.project.findMany({
        where: { status: "PUBLISHED", isFeatured: true },
        orderBy: { sortOrder: "asc" },
        take: 4,
        include: { industry: true },
      }),
      this.prisma.industry.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
      this.prisma.testimonial.findMany({
        where: { status: "PUBLISHED", isFeatured: true },
        orderBy: { sortOrder: "asc" },
      }),
      this.prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 3,
        include: { category: true, author: { select: { name: true } } },
      }),
      this.prisma.fAQ.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
        take: 6,
      }),
      this.prisma.client.findMany({
        where: { isFeatured: true },
        orderBy: { sortOrder: "asc" },
      }),
      this.prisma.partner.findMany({ orderBy: { sortOrder: "asc" } }),
      this.prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } }),
      this.prisma.setting.findMany(),
    ]);

    return {
      sections,
      stats,
      services,
      products,
      projects,
      industries,
      testimonials,
      blogs,
      faqs,
      clients,
      partners,
      processSteps,
      settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
    };
  }
}

@Controller("public")
class PublicController {
  constructor(private service: PublicService) {}

  @Get("home")
  home() {
    return this.service.home();
  }
}

@Module({
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
