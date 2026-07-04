import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ADMIN_ROLES, error, json, withAuth } from "@/lib/api-helpers";
import { prisma } from "@/lib/db";

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return false;
  cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return true;
}

export async function POST(req: NextRequest) {
  return withAuth(req, ADMIN_ROLES, async (user) => {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "mbd-solutions";

      if (!file) return error("No file provided");

      const buffer = Buffer.from(await file.arrayBuffer());
      const hasCloudinary = configureCloudinary();

      if (hasCloudinary) {
        const result = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "auto" },
            (err, uploadResult) => {
              if (err) reject(err);
              else resolve(uploadResult);
            },
          );
          stream.end(buffer);
        });

        const media = await prisma.media.create({
          data: {
            filename: file.name,
            url: result.secure_url,
            publicId: result.public_id,
            mimeType: file.type,
            size: file.size,
            width: result.width,
            height: result.height,
            folder,
          },
        });

        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "CREATE",
            entity: "Media",
            entityId: media.id,
          },
        });

        return json(media, 201);
      }

      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      const media = await prisma.media.create({
        data: {
          filename: file.name,
          url: base64,
          mimeType: file.type,
          size: file.size,
          folder,
        },
      });

      return json(media, 201);
    } catch (e: any) {
      return error(e.message || "Upload failed", 400);
    }
  });
}
