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

        const doc = await payload.findByID({
            collection: "videos",
            id: id,
            depth: 2,
        });

        if (!doc) {
            return NextResponse.json(
                { success: false, error: "Video not found" },
                { status: 404 }
            );
        }

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

        const videoData = {
            id: doc.id,
            title: doc.title,
            thumbnail: thumbnailUrl,
            videoUrl: videoUrl,
            date: doc.date,
            category: doc.category,
            featured: doc.featured,
        };

        return NextResponse.json({
            success: true,
            doc: videoData,
        });
    } catch (error: any) {
        console.error("Error fetching video:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch video" },
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
            collection: "videos",
            id: id,
        });

        return NextResponse.json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error: any) {
        console.error("Error deleting video:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to delete" },
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

        const video = await payload.update({
            collection: "videos",
            id: id,
            data: body,
        });

        return NextResponse.json({ success: true, doc: video });
    } catch (error: any) {
        console.error("Error updating video:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to update" },
            { status: 500 }
        );
    }
}