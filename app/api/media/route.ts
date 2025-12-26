// src/app/api/media/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../payload.config";

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    const result = await payload.find({
      collection: "media",
      limit,
      sort: "-createdAt",
    });

    // Transform data to include url
    const docs = result.docs.map((doc: any) => ({
      ...doc,
      url: doc.cloudinaryUrl,
    }));

    return NextResponse.json({
      success: true,
      docs,
      totalDocs: result.totalDocs,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}