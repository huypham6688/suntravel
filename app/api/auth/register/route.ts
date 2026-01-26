import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "../../../../payload.config";

export async function POST(request: NextRequest) {
  try {
    const config = await configPromise;
    const payload = await getPayload({ config });
    const body = await request.json();

    // Kiểm tra số lượng users
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    });

    // Chỉ cho phép đăng ký nếu chưa có user nào (Setup mode)
    if (existingUsers.totalDocs > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Registration is disabled. Please contact an administrator.",
        },
        { status: 403 },
      );
    }

    const registrationSecret = process.env.REGISTRATION_SECRET;
    if (!registrationSecret || body.registrationSecret !== registrationSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid registration secret",
        },
        { status: 403 },
      );
    }

    // Tạo user mới (luôn là admin vì là user đầu tiên)
    const user = await payload.create({
      collection: "users",
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        role: "admin",
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 400 },
    );
  }
}
