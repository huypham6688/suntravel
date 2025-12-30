// collections/HeroBanners.ts
import type { CollectionConfig } from "payload";

export const HeroBanners: CollectionConfig = {
    slug: "hero-banners",
    labels: {
        singular: "Hero Banner",
        plural: "Hero Banners",
    },
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "subtitle", "isActive", "order"],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            label: "Tiêu đề chính",
        },
        {
            name: "subtitle",
            type: "text",
            required: true,
            label: "Tiêu đề phụ",
        },
        {
            name: "description",
            type: "textarea",
            required: true,
            label: "Mô tả",
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
            label: "Hình ảnh banner",
            admin: {
                description: "Kích thước khuyến nghị: 1920x600px. Upload ảnh banner",
            },
        },
        {
            name: "cta",
            type: "text",
            required: true,
            label: "Text nút CTA",
            defaultValue: "Đặt ngay",
        },
        {
            name: "ctaLink",
            type: "text",
            required: false,
            label: "Link nút CTA",
            defaultValue: "/lien-he",
        },
        {
            name: "isActive",
            type: "checkbox",
            required: true,
            defaultValue: true,
            label: "Kích hoạt",
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "order",
            type: "number",
            required: true,
            defaultValue: 0,
            label: "Thứ tự hiển thị",
            admin: {
                position: "sidebar",
            },
        },
    ],
};

export default HeroBanners;