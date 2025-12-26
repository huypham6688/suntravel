// src/collections/Videos.ts
import { CollectionConfig } from "payload";

const Videos: CollectionConfig = {
    slug: "videos",
    labels: {
        singular: "Video",
        plural: "Videos",
    },
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "category", "featured"],
        group: "Content",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            label: "Tiêu đề",
        },
        {
            name: "thumbnail",
            type: "upload",
            relationTo: "media",
            required: true,
            label: "Ảnh thumbnail",
        },
        {
            name: "videoFile",
            type: "upload",
            relationTo: "media",
            required: true,
            label: "File Video",
            admin: {
                description: "Upload video từ máy tính (MP4, MOV, AVI...)",
            },
        },
        {
            name: "category",
            type: "select",
            label: "Danh mục",
            options: [
                { label: "Trong nước", value: "domestic" },
                { label: "Nước ngoài", value: "international" },
                { label: "Ẩm thực", value: "food" },
                { label: "Mẹo du lịch", value: "tips" },
                { label: "Review", value: "review" },
                { label: "Hướng dẫn", value: "guide" },
            ],
            defaultValue: "domestic",
            required: true,
        },
        {
            name: "featured",
            type: "checkbox",
            defaultValue: false,
            label: "Video nổi bật",
            admin: {
                description: "Hiển thị ở trang chủ",
            },
        },
        {
            name: "date",
            type: "text",
            label: "Ngày đăng",
            admin: {
                description: "VD: 28/03/2025 (tự động nếu để trống)",
            },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data }) => {
                // Auto-generate date if not provided
                if (!data.date) {
                    const now = new Date();
                    data.date = now.toLocaleDateString("vi-VN");
                }
                return data;
            },
        ],
    },
};

export default Videos;