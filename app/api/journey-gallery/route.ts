// src/app/api/journey-gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../payload.config";

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");

    const query: any = {};

    if (category && category !== "Tất cả") {
      query.category = { equals: category };
    }

    const result = await payload.find({
      collection: "journey-gallery",
      where: query,
      limit,
      sort: "-order,-createdAt",
      depth: 2,
    });

    return NextResponse.json({
      success: true,
      docs: result.docs,
      totalDocs: result.totalDocs,
    });
  } catch (error) {
    console.error("Error fetching journey gallery:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch journey gallery" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const body = await req.json();

    const item = await payload.create({
      collection: "journey-gallery",
      data: body,
    });

    return NextResponse.json({ success: true, doc: item });
  } catch (error: any) {
    console.error("Error creating journey gallery:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create" },
      { status: 500 }
    );
  }
}