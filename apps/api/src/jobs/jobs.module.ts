import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Module,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Injectable()
class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: Record<string, string>) {
    const where: any = {};
    if (query.status !== "ALL") where.isActive = query.isActive !== "false";
    if (query.isInternship === "true") where.isInternship = true;
    if (query.isInternship === "false") where.isInternship = false;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { department: { contains: query.search, mode: "insensitive" } },
      ];
    }
    const data = await this.prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    });
    return { data, meta: { total: data.length } };
  }

  async findOne(slug: string) {
    const job = await this.prisma.job.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: { _count: { select: { applications: true } } },
    });
    if (!job) throw new NotFoundException("Job not found");
    return job;
  }

  create(data: any) {
    return this.prisma.job.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.job.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.job.delete({ where: { id } });
    return { success: true };
  }
}

@Controller("jobs")
class JobsController {
  constructor(private service: JobsService) {}

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.service.findAll(query);
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.service.findOne(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}

@Module({
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
