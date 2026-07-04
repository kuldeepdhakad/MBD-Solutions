import {
  Controller,
  Delete,
  Get,
  Injectable,
  Module,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { memoryStorage } from "multer";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Injectable()
class MediaService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const cloudName = this.config.get("CLOUDINARY_CLOUD_NAME");
    if (cloudName) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: this.config.get("CLOUDINARY_API_KEY"),
        api_secret: this.config.get("CLOUDINARY_API_SECRET"),
      });
    }
  }

  async upload(file: Express.Multer.File, folder = "mbd-solutions") {
    const cloudName = this.config.get("CLOUDINARY_CLOUD_NAME");

    if (cloudName) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "auto" },
          (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          },
        );
        stream.end(file.buffer);
      });

      return this.prisma.media.create({
        data: {
          filename: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          mimeType: file.mimetype,
          size: file.size,
          width: result.width,
          height: result.height,
          folder,
        },
      });
    }

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    return this.prisma.media.create({
      data: {
        filename: file.originalname,
        url: base64,
        mimeType: file.mimetype,
        size: file.size,
        folder,
      },
    });
  }

  async findAll(query: Record<string, string>) {
    const where: any = {};
    if (query.folder) where.folder = query.folder;
    const data = await this.prisma.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return { data, meta: { total: data.length } };
  }

  async remove(id: string) {
    const item = await this.prisma.media.findUnique({ where: { id } });
    if (!item) throw new NotFoundException("Media not found");
    if (item.publicId && this.config.get("CLOUDINARY_CLOUD_NAME")) {
      await cloudinary.uploader.destroy(item.publicId);
    }
    await this.prisma.media.delete({ where: { id } });
    return { success: true };
  }
}

@Controller("media")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("SUPER_ADMIN", "ADMIN", "EDITOR")
class MediaController {
  constructor(private service: MediaService) {}

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.service.findAll(query);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  upload(@UploadedFile() file: Express.Multer.File, @Query("folder") folder?: string) {
    return this.service.upload(file, folder);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}

@Module({
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
