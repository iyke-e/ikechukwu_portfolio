import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

// Initialize Cloudinary if credentials are present
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const oldUrl = formData.get("oldUrl") as string | null;
    const oldPublicId = formData.get("oldPublicId") as string | null;
    const folder = (formData.get("folder") as string) || "portfolio_media";

    if (!file) {
      return NextResponse.json({ error: "No media file provided." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const isVideo = file.type.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".webm");

    // =========================================================================
    // CASE 1: CLOUDINARY CLOUD UPLOAD (Optimal for production & Vercel)
    // =========================================================================
    if (isCloudinaryConfigured) {
      // Clean up previous video from Cloudinary if requested
      if (oldPublicId) {
        try {
          await cloudinary.uploader.destroy(oldPublicId, {
            resource_type: isVideo ? "video" : "image",
          });
        } catch (cleanupErr) {
          console.warn("Could not delete previous Cloudinary asset:", cleanupErr);
        }
      }

      // Upload to Cloudinary stream
      const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `portfolio/${folder}`,
            resource_type: isVideo ? "video" : "auto",
            transformation: isVideo ? [{ quality: "auto" }, { fetch_format: "auto" }] : undefined,
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          }
        );
        uploadStream.end(buffer);
      });

      return NextResponse.json(
        {
          success: true,
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          provider: "cloudinary",
          message: "Media successfully uploaded to Cloudinary CDN.",
        },
        { status: 200 }
      );
    }

    // =========================================================================
    // CASE 2: LOCAL STORAGE FALLBACK WITH AUTO-GARBAGE COLLECTION
    // =========================================================================
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Clean up previous local file if it lived in /uploads/
    if (oldUrl && oldUrl.startsWith("/uploads/")) {
      try {
        const oldFilename = path.basename(oldUrl);
        const oldFilePath = path.join(uploadsDir, oldFilename);
        await fs.unlink(oldFilePath);
      } catch (err) {
        // File may not exist; non-fatal
        console.warn("Old local file cleanup skipped:", err);
      }
    }

    // Generate safe clean filename with timestamp
    const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".png");
    const sanitizedBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const filename = `${Date.now()}_${sanitizedBase}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        provider: "local",
        message:
          "Media saved to local storage with auto-cleanup. (Set CLOUDINARY_CLOUD_NAME in .env.local for automatic Cloud CDN uploads).",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload media file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url, publicId, isVideo } = await request.json();

    if (isCloudinaryConfigured && publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: isVideo ? "video" : "image",
      });
      return NextResponse.json({ message: "Cloudinary media deleted" }, { status: 200 });
    }

    if (url && url.startsWith("/uploads/")) {
      const filename = path.basename(url);
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      await fs.unlink(filePath);
      return NextResponse.json({ message: "Local media deleted" }, { status: 200 });
    }

    return NextResponse.json({ message: "No asset deleted" }, { status: 200 });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
