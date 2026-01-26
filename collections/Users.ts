import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    // Only admins can access the Payload Admin Panel
    admin: ({ req: { user } }) => {
      return user?.role === "admin";
    },
    // Prevent public creation of users via standard Payload API
    // We will use our custom /api/auth/register endpoint for the first admin
    create: ({ req: { user } }) => {
      return user?.role === "admin";
    },
    read: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    update: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req: { user } }) => {
      return user?.role === "admin";
    },
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
      access: {
        // Only admins can update the role field
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
  ],
};
