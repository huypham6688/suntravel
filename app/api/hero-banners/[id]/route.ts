import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "../../../../payload.config";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const config = await configPromise;
    const payload = await getPayload({ config });
    const { id } = await params;

    const banner = await payload.findByID({
      collection: "hero-banners",
      id,
      depth: 2, // Populate image relationship
    });

    // Transform image data
    let imageUrl = "";
    if (banner.image) {
      if (typeof banner.image === "object") {
        imageUrl =
          (banner.image as any).cloudinaryUrl ||
          (banner.image as any).url ||
          "";
      } else {
        imageUrl = banner.image;
      }
    }

    return NextResponse.json({
      success: true,
      doc: {
        ...banner,
        image: banner.image
          ? {
              id:
                typeof banner.image === "object"
                  ? (banner.image as any).id
                  : banner.image,
              url: imageUrl,
              cloudinaryUrl: imageUrl,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Error fetching hero banner:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Hero banner not found",
      },
      { status: 404 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const config = await configPromise;
    const payload = await getPayload({ config });
    const { id } = await params;
    const body = await req.json();

    const banner = await payload.update({
      collection: "hero-banners",
      id,
      data: body,
    });

    return NextResponse.json({
      success: true,
      doc: banner,
    });
  } catch (error) {
    console.error("Error updating hero banner:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update hero banner",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const config = await configPromise;
    const payload = await getPayload({ config });
    const { id } = await params;

    await payload.delete({
      collection: "hero-banners",
      id,
    });

    return NextResponse.json({
      success: true,
      message: "Hero banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hero banner:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete hero banner",
      },
      { status: 400 }
    );
  }
}
