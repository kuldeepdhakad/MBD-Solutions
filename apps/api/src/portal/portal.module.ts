import { Controller, Get, Injectable, Module, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Injectable()
class PortalService {
  constructor(private prisma: PrismaService) {}

  async dashboard(userId: string) {
    const [projects, invoices, tickets] = await Promise.all([
      this.prisma.clientProject.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      }),
      this.prisma.invoice.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.supportTicket.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
    ]);
    return { projects, invoices, tickets };
  }
}

@Controller("portal")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("CLIENT", "SUPER_ADMIN", "ADMIN")
class PortalController {
  constructor(private service: PortalService) {}

  @Get("dashboard")
  dashboard(@CurrentUser() user: any) {
    return this.service.dashboard(user.id);
  }
}

@Module({
  controllers: [PortalController],
  providers: [PortalService],
})
export class PortalModule {}
