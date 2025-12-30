import { NextRequest, NextResponse } from "next/server";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "../../../payload.config";

export async function GET(req: NextRequest) {
  try {
    const config = await configPromise;
    const payload = await getPayloadHMR({ config });
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get("sort") || "order";
    const limit = parseInt(searchParams.get("limit") || "100");
    const isActive = searchParams.get("isActive");

    const where: any = {};
    if (isActive === "true") {
      where.isActive = { equals: true };
    }

    const result = await payload.find({
      collection: "hero-banners",
      where,
      limit,
      sort: sort === "order" ? "order" : `-${sort}`,
      depth: 2, // Populate image relationship
    });

    // Transform data to include image URL
    const docs = result.docs.map((doc: any) => {
      let imageUrl = "";
      if (doc.image) {
        if (typeof doc.image === "object") {
          imageUrl = doc.image.cloudinaryUrl || doc.image.url || "";
        } else {
          imageUrl = doc.image;
        }
      }

      return {
        ...doc,
        image: doc.image
          ? {
              id: typeof doc.image === "object" ? doc.image.id : doc.image,
              url: imageUrl,
              cloudinaryUrl: imageUrl,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      docs,
      totalDocs: result.totalDocs,
    });
  } catch (error) {
    console.error("Error fetching hero banners:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hero banners" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const config = await configPromise;
    const payload = await getPayloadHMR({ config });
    const body = await req.json();

    const banner = await payload.create({
      collection: "hero-banners",
      data: body,
    });

    return NextResponse.json({
      success: true,
      doc: banner,
    });
  } catch (error) {
    console.error("Error creating hero banner:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create hero banner",
      },
      { status: 400 }
    );
  }
}

