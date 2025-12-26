// src/collections/JourneyGallery.ts
import { CollectionConfig } from "payload";

const JourneyGallery: CollectionConfig = {
  slug: "journey-gallery",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "category", "date", "tourName"],
    group: "Gallery",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Tên hành trình",
      admin: {
        description: "Ví dụ: Hội An - Phố Cổ Tình Yêu",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Danh mục",
      options: [
        { label: "Nội địa", value: "Nội địa" },
        { label: "Tour Châu Á", value: "Tour Châu Á" },
        { label: "Tour Châu Âu", value: "Tour Châu Âu" },
        { label: "Tour Châu Mỹ", value: "Tour Châu Mỹ" },
        { label: "Tour Châu Úc", value: "Tour Châu Úc" },
        { label: "Tour Châu Phi", value: "Tour Châu Phi" },
      ],
      defaultValue: "Nội địa",
    },
    {
      name: "tourName",
      type: "text",
      required: true,
      label: "Tên tour đầy đủ",
      admin: {
        description: "Ví dụ: Tour Hội An - Đà Nẵng 3N2Đ",
      },
    },
    {
      name: "date",
      type: "text",
      required: true,
      label: "Ngày khởi hành",
      admin: {
        description: "Ví dụ: Tháng 12/2024",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Ảnh đại diện",
      admin: {
        description: "Ảnh hiển thị trong lưới gallery",
      },
    },
    {
      name: "gallery",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 20,
      label: "Album ảnh",
      admin: {
        description: "Tối đa 20 ảnh cho mỗi hành trình",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Ảnh",
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô tả ngắn",
      admin: {
        description: "Mô tả về hành trình (tùy chọn)",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      label: "Trạng thái",
      options: [
        { label: "Đã xuất bản", value: "published" },
        { label: "Nháp", value: "draft" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Nổi bật",
      admin: {
        description: "Hiển thị ưu tiên trong gallery",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Thứ tự sắp xếp",
      admin: {
        description: "Số càng nhỏ hiển thị càng trước (0, 1, 2...)",
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Auto generate slug nếu cần
        if (data.alt && !data.slug) {
          data.slug = data.alt
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
        }
        return data;
      },
    ],
  },
};

export default JourneyGallery;