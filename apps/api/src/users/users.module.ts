import {
  Body,
  Controller,
  Get,
  Injectable,
  Module,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Injectable()
class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    });
    return users.map(({ password, refreshToken, ...u }) => u);
  }

  async updateProfile(userId: string, data: any) {
    const payload: any = {};
    if (data.name) payload.name = data.name;
    if (data.phone) payload.phone = data.phone;
    if (data.avatar) payload.avatar = data.avatar;
    if (data.password) payload.password = await bcrypt.hash(data.password, 12);
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: payload,
      include: { role: true },
    });
    const { password, refreshToken, ...safe } = user;
    return safe;
  }

  async update(id: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    const payload: any = {};
    if (data.name) payload.name = data.name;
    if (data.isActive !== undefined) payload.isActive = data.isActive;
    if (data.roleId) payload.roleId = data.roleId;
    const updated = await this.prisma.user.update({
      where: { id },
      data: payload,
      include: { role: true },
    });
    const { password, refreshToken, ...safe } = updated;
    return safe;
  }
}

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
class UsersController {
  constructor(private service: UsersService) {}

  @Roles("SUPER_ADMIN", "ADMIN")
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch("me")
  updateProfile(@CurrentUser() user: any, @Body() body: any) {
    return this.service.updateProfile(user.id, body);
  }

  @Roles("SUPER_ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }
}

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
