import { CollectionConfig } from "payload";

export const Countries: CollectionConfig = {
  slug: "countries",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên nước",
    },
    {
      name: "code",
      type: "text",
      required: true,
      label: "Mã nước (Icon)",
      admin: {
        description: "Mã quốc gia 2 ký tự (vd: jp, vn, us)",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug (URL)",
      admin: {
        description: "Đường dẫn URL (vd: nhat-ban, dai-loan)",
      },
    },
    {
      name: "region",
      type: "select",
      options: [
        { label: "Châu Á", value: "asia" },
        { label: "Châu Âu", value: "europe" },
        { label: "Châu Mỹ", value: "americas" },
        { label: "Châu Úc", value: "oceania" },
      ],
      label: "Khu vực",
    },
    {
      name: "packages",
      type: "array",
      label: "Các gói dịch vụ",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Tên gói (VD: VISA DU LỊCH)",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Mô tả ngắn (VD: Từ Hà Nội)",
        },
        {
          name: "price",
          type: "text",
          required: true,
          label: "Giá (VD: 3.000.000đ)",
        },
        {
          name: "type",
          type: "select",
          options: [
            { label: "Du lịch", value: "tourist" },
            { label: "Thương mại", value: "business" },
            { label: "Thăm thân", value: "relative" },
          ],
          defaultValue: "tourist",
          label: "Loại Visa (Icon)",
        },
        {
          name: "requirements",
          type: "array",
          label: "Hồ sơ yêu cầu",
          fields: [
            {
              name: "text",
              type: "text",
            },
          ],
        },
        {
          name: "includes",
          type: "array",
          label: "Dịch vụ bao gồm",
          fields: [
            {
              name: "text",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
