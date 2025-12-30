// src/collections/Media.ts
import { CollectionConfig } from "payload";

// On Vercel, we don't use local file storage (filesystem is read-only)
// All files are stored in Cloudinary, so we disable upload collection features
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

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
<<<<<<< Updated upstream
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
=======
  // Only enable upload features in local/development
  // On Vercel, we use Cloudinary for storage, so we don't need local upload
  ...(isVercel
    ? {}
    : {
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
      }),
>>>>>>> Stashed changes
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
  // Disable file uploads on Vercel - all uploads should go through /api/upload-cloudinary
  hooks: isVercel
    ? {
        beforeChange: [
          async ({ data, operation }) => {
            // On Vercel, prevent direct file uploads through Payload
            // Files must be uploaded via /api/upload-cloudinary first
            if (operation === "create" && !data.cloudinaryUrl) {
              throw new Error(
                "File uploads are not supported on this server. Please use the upload API endpoint."
              );
            }
            return data;
          },
        ],
      }
    : undefined,
};

export default Media;