import {
  Body,
  Controller,
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
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

class ApplyDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  portfolioUrl?: string;
}

@Injectable()
class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  create(dto: ApplyDto) {
    return this.prisma.application.create({ data: dto });
  }

  async findAll(query: Record<string, string>) {
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.jobId) where.jobId = query.jobId;
    const data = await this.prisma.application.findMany({
      where,
      include: { job: { select: { id: true, title: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });
    return { data, meta: { total: data.length } };
  }

  async update(id: string, data: any) {
    const item = await this.prisma.application.findUnique({ where: { id } });
    if (!item) throw new NotFoundException("Application not found");
    return this.prisma.application.update({ where: { id }, data });
  }
}

@Controller("applications")
class ApplicationsController {
  constructor(private service: ApplicationsService) {}

  @Post()
  create(@Body() dto: ApplyDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.service.findAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }
}

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
