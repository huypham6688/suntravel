import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const { id } = await params;

    const result = await payload.findByID({
      collection: "countries",
      id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching country:", error);
    return NextResponse.json(
      { error: "Failed to fetch country" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const { id } = await params;
    const data = await request.json();

    const result = await payload.update({
      collection: "countries",
      id,
      data,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json(
      { error: "Failed to update country", details: error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const { id } = await params;

    const result = await payload.delete({
      collection: "countries",
      id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json(
      { error: "Failed to delete country", details: error },
      { status: 500 },
    );
  }
}
