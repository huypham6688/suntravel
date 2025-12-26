import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import sharp from "sharp";
import { Users, Tours, ServiceTourismCollection } from "./collections";
import { TourismCategoryCollection } from "./collections/TourismCategories";
import JourneyGallery from "./collections/JourneyGallery";
import Media from "./collections/Media";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",

  admin: {
    user: "users",
  },

  routes: {
    api: "/api",
    admin: "/admin",
  },

  collections: [
    Users,
    Tours,
    ServiceTourismCollection,
    TourismCategoryCollection,
    JourneyGallery,
    Media,
  ],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),

  sharp,
});
