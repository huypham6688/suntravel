import { getPayload } from "payload";
import configPromise from "../../../payload.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const { searchParams } = new URL(req.url);

      const id = searchParams.get("id");
      if (id) {
         const tour = await payload.findByID({
            collection: "service_tourism",
            id: id,
            depth: 1,
         });
         return NextResponse.json({ success: true, data: tour });
      }
      const category = searchParams.get("category");
      const region = searchParams.get("region");
      const search = searchParams.get("search");
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");

      const where: any = { and: [] };

      if (category) {
         where.and.push({
            "category.slug": {
               equals: category,
            },
         });
      }
      if (region) {
         where.and.push({ region: { equals: region } });
      }
      if (search) {
         where.and.push({ title: { contains: search } });
      }

      if (where.and.length === 0) delete where.and;

      const tours = await payload.find({
         collection: "service_tourism",
         where,
         page,
         limit,
         sort: "-createdAt",
         depth: 1,
      });

      return NextResponse.json({
         success: true,
         docs: tours.docs,
         totalDocs: tours.totalDocs,
         totalPages: tours.totalPages,
         page: tours.page,
      });
   } catch (error: any) {
      console.error("Error fetching tours:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}

export async function POST(request: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const body = await request.json();

      // 1. Thêm 'region' vào danh sách bắt buộc
      const requiredFields = [
         "title",
         "sort_des",
         "thumbnail",
         "region", // Mới thêm
         "category",
         "hash_tags",
         "content",
      ];

      const missingFields = requiredFields.filter((field) => !body[field]);

      if (!missingFields.includes("hash_tags")) {
         if (!Array.isArray(body.hash_tags) || body.hash_tags.length === 0) {
            missingFields.push("hash_tags (phải là mảng)");
         }
      }

      if (missingFields.length > 0) {
         return NextResponse.json(
            {
               success: false,
               error: `Thiếu các trường: ${missingFields.join(", ")}`,
            },
            { status: 400 }
         );
      }

      // 3. Tạo record
      const newTourism = await payload.create({
         collection: "service_tourism",
         data: {
            title: body.title,
            sort_des: body.sort_des,
            thumbnail: body.thumbnail,
            region: body.region, // Mới thêm
            category: body.category, // ID của category
            hash_tags: body.hash_tags,
            content: body.content,
         },
      });

      return NextResponse.json({ success: true, data: newTourism }, { status: 201 });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}

export async function PATCH(request: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const body = await request.json();
      const { id, ...updateData } = body;

      if (!id) {
         return NextResponse.json({ success: false, error: "Thiếu ID" }, { status: 400 });
      }

      const updatedTourism = await payload.update({
         collection: "service_tourism",
         id: id,
         data: updateData,
      });

      return NextResponse.json({ success: true, data: updatedTourism }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}

export async function DELETE(request: Request) {
   try {
      const payload = await getPayload({ config: configPromise });
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
         return NextResponse.json({ success: false, error: "Thiếu ID" }, { status: 400 });
      }

      await payload.delete({
         collection: "service_tourism",
         id: id,
      });

      return NextResponse.json({ success: true, message: "Xóa thành công" }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
   }
}
