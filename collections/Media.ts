// src/collections/Media.ts
import { CollectionConfig } from "payload";

// Media collection uses Cloudinary for storage, not local file storage
// We disable upload config completely to prevent Payload from requiring files
// All uploads go through /api/upload-cloudinary which stores files in Cloudinary
// and only saves metadata (cloudinaryUrl) to this collection
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
  // NO upload config - we use Cloudinary for storage
  // This prevents Payload from requiring files when creating Media records
  // Files are uploaded to Cloudinary via /api/upload-cloudinary
  // and only metadata (cloudinaryUrl) is stored in this collection
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
      required: true,
      admin: {
        readOnly: true,
        description: "URL từ Cloudinary (auto-generated)",
      },
    },
    {
      name: "cloudinaryId",
      type: "text",
      label: "Cloudinary Public ID",
      admin: {
        readOnly: true,
        description: "Public ID từ Cloudinary",
      },
    },
    {
      name: "width",
      type: "number",
      label: "Chiều rộng (px)",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "height",
      type: "number",
      label: "Chiều cao (px)",
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default Media;
