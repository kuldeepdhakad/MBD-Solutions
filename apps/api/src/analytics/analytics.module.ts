import { Controller, Get, Injectable, Module, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Injectable()
class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [
      contacts,
      unreadContacts,
      applications,
      blogs,
      products,
      projects,
      services,
      jobs,
      newsletter,
      media,
      recentContacts,
      recentApplications,
    ] = await Promise.all([
      this.prisma.contact.count(),
      this.prisma.contact.count({ where: { isRead: false } }),
      this.prisma.application.count(),
      this.prisma.blog.count(),
      this.prisma.product.count(),
      this.prisma.project.count(),
      this.prisma.service.count(),
      this.prisma.job.count({ where: { isActive: true } }),
      this.prisma.newsletter.count(),
      this.prisma.media.count(),
      this.prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      this.prisma.application.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { job: { select: { title: true } } },
      }),
    ]);

    return {
      stats: {
        contacts,
        unreadContacts,
        applications,
        blogs,
        products,
        projects,
        services,
        jobs,
        newsletter,
        media,
      },
      recentContacts,
      recentApplications,
    };
  }

  auditLogs() {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }
}

@Controller("analytics")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("SUPER_ADMIN", "ADMIN")
class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Get("dashboard")
  dashboard() {
    return this.service.dashboard();
  }

  @Get("audit-logs")
  auditLogs() {
    return this.service.auditLogs();
  }
}

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
