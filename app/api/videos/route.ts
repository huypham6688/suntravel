import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../payload.config";

export async function GET(req: NextRequest) {
    try {
        const payload = await getPayload({ config });
        const { searchParams } = new URL(req.url);

        const featured = searchParams.get("featured");
        const limit = parseInt(searchParams.get("limit") || "100");
        const category = searchParams.get("category");

        const query: any = {};

        if (featured === "true") {
            query.featured = { equals: true };
        }

        if (category) {
            query.category = { equals: category };
        }

        const result = await payload.find({
            collection: "videos",
            where: query,
            limit,
            sort: "-createdAt",
            depth: 2,
        });

        // Transform data
        const docs = result.docs.map((doc: any) => {
            let thumbnailUrl = "";
            if (doc.thumbnail) {
                if (typeof doc.thumbnail === "object") {
                    thumbnailUrl = doc.thumbnail.cloudinaryUrl || doc.thumbnail.url || "";
                } else {
                    thumbnailUrl = doc.thumbnail;
                }
            }

            let videoUrl = "";
            if (doc.videoFile) {
                if (typeof doc.videoFile === "object") {
                    videoUrl = doc.videoFile.cloudinaryUrl || doc.videoFile.url || "";
                } else {
                    videoUrl = doc.videoFile;
                }
            }

            return {
                id: doc.id,
                title: doc.title,
                thumbnail: thumbnailUrl,
                videoUrl: videoUrl,
                date: doc.date,
                category: doc.category,
                featured: doc.featured,
            };
        });

        return NextResponse.json({
            success: true,
            docs,
            totalDocs: result.totalDocs,
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const payload = await getPayload({ config });
        const body = await req.json();

        const video = await payload.create({
            collection: "videos",
            data: body,
        });

        return NextResponse.json({ success: true, doc: video });
    } catch (error: any) {
        console.error("Error creating video:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create video" },
            { status: 500 }
        );
    }
}

