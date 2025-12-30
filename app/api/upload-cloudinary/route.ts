import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "../../../payload.config";
import { promises as fs } from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // Validate Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing Cloudinary environment variables");
      return NextResponse.json(
        { success: false, error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

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
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "tachudu",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error("Cloudinary upload failed - no URL returned");
    }

    // Save to Payload Media collection
    const config = await configPromise;
    const payload = await getPayloadHMR({ config });
    
    const media = await payload.create({
      collection: "media",
      data: {
        alt: alt || file.name,
        cloudinaryUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
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
    // Note: On Vercel serverless, this might not be necessary as files are ephemeral
    if (media.filename) {
      try {
        const filePath = path.join(process.cwd(), "media", media.filename);
        await fs.unlink(filePath);
      } catch (err) {
        // Ignore errors on Vercel as filesystem is read-only
        console.warn("Failed to delete local file (this is normal on Vercel):", err);
      }
    }

    return NextResponse.json({
      success: true,
      doc: {
        id: media.id,
        url: uploadResult.secure_url,
        cloudinaryUrl: uploadResult.secure_url,
        alt: media.alt,
      },
    });
  } catch (error: any) {
    console.error("Upload error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Upload failed",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
