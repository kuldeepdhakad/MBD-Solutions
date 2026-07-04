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
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Injectable()
class BlogsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: Record<string, string>, publicOnly = false) {
    const page = Math.max(1, parseInt(query.page || "1", 10));
    const limit = Math.min(50, parseInt(query.limit || "12", 10));
    const where: any = publicOnly ? { status: "PUBLISHED" } : {};
    if (query.status && query.status !== "ALL") where.status = query.status;
    if (query.category) where.category = { slug: query.category };
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { excerpt: { contains: query.search, mode: "insensitive" } },
      ];
    }
    const [data, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          category: true,
          tags: true,
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.blog.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(slug: string, publicOnly = false) {
    const blog = await this.prisma.blog.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
        ...(publicOnly ? { status: "PUBLISHED" } : {}),
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        category: true,
        tags: true,
      },
    });
    if (!blog) throw new NotFoundException("Blog not found");
    if (publicOnly) {
      await this.prisma.blog.update({
        where: { id: blog.id },
        data: { views: { increment: 1 } },
      });
    }
    return blog;
  }

  create(data: any, userId: string) {
    return this.prisma.blog.create({
      data: {
        ...data,
        authorId: data.authorId || userId,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    if (data.status === "PUBLISHED" && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    return this.prisma.blog.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.blog.delete({ where: { id } });
    return { success: true };
  }

  categories() {
    return this.prisma.blogCategory.findMany({ orderBy: { name: "asc" } });
  }

  tags() {
    return this.prisma.blogTag.findMany({ orderBy: { name: "asc" } });
  }
}

@Controller("blogs")
class BlogsController {
  constructor(private service: BlogsService) {}

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.service.findAll(query, query.status !== "ALL");
  }

  @Get("meta/categories")
  categories() {
    return this.service.categories();
  }

  @Get("meta/tags")
  tags() {
    return this.service.tags();
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string, @Query("admin") admin?: string) {
    return this.service.findOne(slug, admin !== "true");
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN", "EDITOR")
  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.service.create(body, user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN", "EDITOR")
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
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
