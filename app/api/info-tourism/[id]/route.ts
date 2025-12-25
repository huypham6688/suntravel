import { getPayload } from "payload";
import configPromise from "../../../../payload.config"; 
import { NextResponse } from "next/server";

export async function GET(
   req: Request,
   { params }: { params: Promise<{ id: string }> }
) {
   try {
      const { id } = await params;
      const payload = await getPayload({ config: configPromise });

      const tour = await payload.findByID({
         collection: "service_tourism",
         id: id,
         depth: 1,
      });

      if (!tour) {
         return NextResponse.json(
            { success: false, error: "Không tìm thấy bài viết" },
            { status: 404 }
         );
      }

      return NextResponse.json({
         success: true,
         data: tour,
      });

   } catch (error) {
      console.error("❌ Error fetching tour by ID:", error);
      
      return NextResponse.json(
         {
            success: false,
            error: error instanceof Error ? error.message : "Internal Server Error",
         },
         { status: 500 }
      );
   }
}