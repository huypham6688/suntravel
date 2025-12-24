// src/app/api/payload/[...slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getPayloadHMR } from "@payloadcms/next/utilities";

// Import relative - điều chỉnh số ../ sao cho đúng vị trí payload.config.ts ở root
import configPromise from "../../../../payload.config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handler(req: NextRequest) {
  try {
    // Await configPromise để lấy SanitizedConfig thực sự
    const config = await configPromise;

    // Khởi tạo Payload instance
    const payload = await getPayloadHMR({ config });

    // Lấy serverURL từ config (bây giờ hợp lệ, không còn lỗi TS2339)
    const baseURL = config.serverURL || new URL(req.url).origin;

    // Loại bỏ prefix /api/payload
    const url = new URL(req.url);
    const pathname = url.pathname.replace(/^\/api\/payload/, "");
    const targetURL = new URL(pathname + url.search, baseURL);

    // Clone headers và xóa 'host' để tránh infinite loop
    const headers = new Headers(req.headers);
    headers.delete("host");

    // Xử lý body (hỗ trợ streaming lớn, không đọc hết vào memory)
    let body: BodyInit | null = null;
    if (req.body) {
      body = await req.blob();  // blob giữ streaming tốt nhất
    }

    // Proxy fetch đến internal Payload
    const response = await fetch(targetURL.toString(), {
      method: req.method,
      headers,
      body,
      // @ts-ignore - duplex cần cho streaming body (Next.js 14+)
      duplex: body ? "half" : undefined,
    });

    // Return response với full streaming
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Payload API Proxy Error:", error);
    return NextResponse.json(
      {
        error: "Payload API proxy error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };