import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "../../../payload.config";

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
      console.error("No file in FormData. FormData keys:", Array.from(formData.keys()));
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file object
    if (!(file instanceof File)) {
      console.error("File is not a File instance:", typeof file, file);
      return NextResponse.json(
        { success: false, error: "Invalid file object" },
        { status: 400 }
      );
    }

    console.log("Uploading file:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

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
    // CRITICAL: We don't pass the file to payload.create() because:
    // 1. File is already uploaded to Cloudinary
    // 2. On Vercel, filesystem is read-only and can't create directories
    // 3. Passing file would cause Payload to try creating 'media' directory
    // 4. We only need to store metadata (cloudinaryUrl) in the database
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
      // DO NOT pass file here - this causes Payload to create 'media' directory on Vercel
      // File is already stored in Cloudinary, we only need the URL in database
    });

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
