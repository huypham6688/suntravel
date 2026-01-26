import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("JWT ", "");

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload = await getPayload({
      config: configPromise,
    });

    const result = await payload.auth({ headers: request.headers });

    if (result.user) {
      return NextResponse.json({ user: result.user });
    }

    return NextResponse.json({ user: null }, { status: 401 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
