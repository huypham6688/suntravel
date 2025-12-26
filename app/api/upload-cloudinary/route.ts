import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getPayload } from "payload";
import config from "../../../payload.config";
import { promises as fs } from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "tachudu",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const uploadResult = result as any;

    // Save to Payload Media collection
    const payload = await getPayload({ config });
    const media = await payload.create({
      collection: "media",
      data: {
        alt: alt || file.name,
        cloudinaryUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        // Helper fields
        width: uploadResult.width,
        height: uploadResult.height,
        // Payload handles mimeType and filesize automatically from the file object usually,
        // but we can pass them in data if we want to override or if they are custom fields.
        // However, standard upload fields are handled by 'file' property below.
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: file.size,
      },
    });

    // Cleanup: Delete the local file to save space (storage is handled by Cloudinary)
    // We only keep the DB record for relations
    if (media.filename) {
      try {
        const filePath = path.join(process.cwd(), "media", media.filename);
        await fs.unlink(filePath);
      } catch (err) {
        console.warn("Failed to delete local file:", err);
      }
    }

    return NextResponse.json({
      success: true,
      doc: {
        id: media.id,
        url: uploadResult.secure_url,
        alt: media.alt,
      },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
