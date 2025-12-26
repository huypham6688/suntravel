// src/collections/Media.ts
import { CollectionConfig } from "payload";

const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticDir: "media",
    // We don't want local resized images since we use Cloudinary
    imageSizes: [],
    // Use Cloudinary URL for admin thumbnail if available
    adminThumbnail: ({ doc }) => (doc as any).cloudinaryUrl || null,
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt Text",
    },
    {
      name: "cloudinaryUrl",
      type: "text",
      required: true,
      label: "Cloudinary URL",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "cloudinaryId",
      type: "text",
      label: "Cloudinary ID",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "width",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "height",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "mimeType",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "filesize",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
  ],
  admin: {
    useAsTitle: "alt",
  },
};

export default Media;
