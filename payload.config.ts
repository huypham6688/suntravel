import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import sharp from "sharp";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",

  admin: {
    user: "users",
  },

  routes: {
    api: '/api',
    admin: '/admin',
  },

  collections: [
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Tên",
        },
        {
          name: "role",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ],
          defaultValue: "user",
          required: true,
          label: "Vai trò",
        },
      ],
    },
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