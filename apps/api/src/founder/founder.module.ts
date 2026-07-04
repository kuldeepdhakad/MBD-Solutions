import { Body, Controller, Get, Injectable, Module, Patch, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Injectable()
class FounderService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const founder = await this.prisma.founder.findFirst({ orderBy: { createdAt: "asc" } });
    return founder;
  }

  async update(data: any) {
    const existing = await this.get();
    if (!existing) return this.prisma.founder.create({ data });
    return this.prisma.founder.update({ where: { id: existing.id }, data });
  }
}

@Controller("founder")
class FounderController {
  constructor(private service: FounderService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Patch()
  update(@Body() body: any) {
    return this.service.update(body);
  }
}

@Module({
  controllers: [FounderController],
  providers: [FounderService],
})
export class FounderModule {}
