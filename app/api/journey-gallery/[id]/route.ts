// src/app/api/journey-gallery/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../../payload.config";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config });

    const item = await payload.findByID({
      collection: "journey-gallery",
      id: id,
      depth: 2,
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, doc: item });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config });
    const body = await req.json();

    const item = await payload.update({
      collection: "journey-gallery",
      id: id,
      data: body,
    });

    return NextResponse.json({ success: true, doc: item });
  } catch (error: any) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config });

    await payload.delete({
      collection: "journey-gallery",
      id: id,
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete" },
      { status: 500 }
    );
  }
}