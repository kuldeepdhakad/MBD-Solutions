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

class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  businessType?: string;

  @IsString()
  @IsNotEmpty()
  requirement: string;

  @IsOptional()
  @IsString()
  budget?: string;
}

@Injectable()
class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(dto: ContactDto) {
    return this.prisma.contact.create({ data: dto });
  }

  async findAll(query: Record<string, string>) {
    const where: any = {};
    if (query.isRead === "true") where.isRead = true;
    if (query.isRead === "false") where.isRead = false;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { phone: { contains: query.search, mode: "insensitive" } },
        { requirement: { contains: query.search, mode: "insensitive" } },
      ];
    }
    const data = await this.prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return { data, meta: { total: data.length } };
  }

  async update(id: string, data: any) {
    const item = await this.prisma.contact.findUnique({ where: { id } });
    if (!item) throw new NotFoundException("Contact not found");
    return this.prisma.contact.update({ where: { id }, data });
  }
}

@Controller("contacts")
class ContactsController {
  constructor(private service: ContactsService) {}

  @Post()
  create(@Body() dto: ContactDto) {
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
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
