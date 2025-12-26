// src/collections/Media.ts
import { CollectionConfig } from "payload";

const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  admin: {
    group: "Assets",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    // Không cần resize local vì dùng Cloudinary
    imageSizes: [],
    // Sử dụng Cloudinary URL cho admin thumbnail
    adminThumbnail: ({ doc }) => (doc as any).cloudinaryUrl || null,
    // Cho phép cả ảnh và video
    mimeTypes: [
      "image/*",
      "video/mp4",
      "video/mpeg",
      "video/quicktime", // .mov
      "video/x-msvideo", // .avi
      "video/x-matroska", // .mkv
      "video/webm",
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      admin: {
        description: "Mô tả cho ảnh/video (SEO)",
      },
    },
    {
      name: "cloudinaryUrl",
      type: "text",
      label: "Cloudinary URL",
      admin: {
        readOnly: true,
        description: "URL từ Cloudinary (auto-generated)",
      },
    },
  ],
};

export default Media;