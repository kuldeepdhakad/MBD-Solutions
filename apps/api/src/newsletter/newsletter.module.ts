import { Body, Controller, Get, Injectable, Module, Post, UseGuards } from "@nestjs/common";
import { IsEmail } from "class-validator";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

class SubscribeDto {
  @IsEmail()
  email: string;
}

@Injectable()
class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string) {
    return this.prisma.newsletter.upsert({
      where: { email: email.toLowerCase() },
      update: { isActive: true },
      create: { email: email.toLowerCase() },
    });
  }

  findAll() {
    return this.prisma.newsletter.findMany({ orderBy: { createdAt: "desc" } });
  }
}

@Controller("newsletter")
class NewsletterController {
  constructor(private service: NewsletterService) {}

  @Post()
  subscribe(@Body() dto: SubscribeDto) {
    return this.service.subscribe(dto.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Get()
  findAll() {
    return this.service.findAll();
  }
}

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
