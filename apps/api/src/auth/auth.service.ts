import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { role: { include: { permissions: true } } },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.issueTokens(user.id, user.email, user.role.name);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
        lastLoginAt: new Date(),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
        entity: "User",
        entityId: user.id,
      },
    });

    return {
      ...tokens,
      user: this.sanitize(user),
    };
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (exists) throw new ConflictException("Email already registered");

    const clientRole = await this.prisma.role.findUnique({
      where: { name: "CLIENT" },
    });
    if (!clientRole) throw new ConflictException("Client role not configured");

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        password: await bcrypt.hash(dto.password, 12),
        name: dto.name,
        phone: dto.phone,
        roleId: clientRole.id,
      },
      include: { role: { include: { permissions: true } } },
    });

    const tokens = await this.issueTokens(user.id, user.email, user.role.name);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(tokens.refreshToken, 10) },
    });

    return { ...tokens, user: this.sanitize(user) };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: { include: { permissions: true } } },
    });

    if (!user?.refreshToken || !user.isActive) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) throw new UnauthorizedException("Invalid refresh token");

    const tokens = await this.issueTokens(user.id, user.email, user.role.name);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(tokens.refreshToken, 10) },
    });

    return { ...tokens, user: this.sanitize(user) };
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { success: true };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: { include: { permissions: true } } },
    });
    if (!user) throw new UnauthorizedException();
    return this.sanitize(user);
  }

  private async issueTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>("JWT_SECRET") || "mbd-dev-secret",
        expiresIn: "15m",
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>("JWT_REFRESH_SECRET") || "mbd-dev-refresh",
        expiresIn: "7d",
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private sanitize(user: any) {
    const { password, refreshToken, ...safe } = user;
    return {
      ...safe,
      permissions: user.role?.permissions?.map((p: any) => p.name) || [],
    };
  }
}
