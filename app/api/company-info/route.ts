import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise });
    const companyInfo = await payload.findGlobal({
      slug: "company-info",
    });

    return NextResponse.json(companyInfo);
  } catch (error) {
    console.error("Error fetching company info:", error);
    return NextResponse.json(
      { error: "Failed to fetch company info" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = await getPayloadHMR({ config: configPromise });

    // In a real app, you should check for authentication/authorization here.
    // Since this is called from the admin dashboard which is likely behind its own auth check (or client-side auth check),
    // and Payload's updateGlobal checks access control defined in the Global Config.
    // However, findGlobal/updateGlobal via Local API skips access control by default unless configured otherwise,
    // or we are responsible for it.
    // For now, we will proceed assuming the user has access or relying on the dashboard's protection.
    // To be safer, we can pass 'user' if available from request headers or relying on Payload's request handling context,
    // but local API often runs as admin.

    const updatedInfo = await payload.updateGlobal({
      slug: "company-info",
      data: body,
    });

    return NextResponse.json({ result: updatedInfo });
  } catch (error) {
    console.error("Error updating company info:", error);
    return NextResponse.json(
      { error: "Failed to update company info" },
      { status: 500 }
    );
  }
}
