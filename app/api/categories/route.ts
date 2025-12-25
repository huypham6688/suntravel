import { getPayload } from "payload";
import configPromise from "../../../payload.config";
import { NextResponse } from "next/server";

// --- GET: Lấy danh sách hoặc 1 danh mục ---
export async function GET(req: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (id) {
         const category = await payload.findByID({
            collection: "tourism_categories",
            id: id,
         });
         return NextResponse.json({ success: true, data: category });
      }

      const categories = await payload.find({
         collection: "tourism_categories",
         sort: "title", // Sắp xếp theo tên A-Z
         limit: 100,    // Thường danh mục không quá nhiều
      });

      return NextResponse.json({
         success: true,
         docs: categories.docs,
      });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}

// --- POST: Tạo danh mục mới ---
export async function POST(request: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const body = await request.json();

      if (!body.title || !body.slug) {
         return NextResponse.json({ 
            success: false, 
            error: "Tiêu đề và Slug là bắt buộc" 
         }, { status: 400 });
      }

      const newCategory = await payload.create({
         collection: "tourism_categories",
         data: {
            title: body.title,
            slug: body.slug,
         },
      });

      return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}

// --- PATCH: Cập nhật danh mục ---
export async function PATCH(request: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const body = await request.json();
      const { id, ...updateData } = body;

      if (!id) return NextResponse.json({ success: false, error: "Thiếu ID" }, { status: 400 });

      const updated = await payload.update({
         collection: "tourism_categories",
         id: id,
         data: updateData,
      });

      return NextResponse.json({ success: true, data: updated });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}

// --- DELETE: Xóa danh mục ---
export async function DELETE(request: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) return NextResponse.json({ success: false, error: "Thiếu ID" }, { status: 400 });

      await payload.delete({
         collection: "tourism_categories",
         id: id,
      });

      return NextResponse.json({ success: true, message: "Xóa danh mục thành công" });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}