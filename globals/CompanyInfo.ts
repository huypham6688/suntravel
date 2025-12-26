import { GlobalConfig } from "payload";

export const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  label: "Thông tin công ty",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "address",
      label: "Địa chỉ",
      type: "text",
      required: true,
      defaultValue: "Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội",
    },
    {
      name: "hotline",
      label: "Hotline",
      type: "text",
      required: true,
      defaultValue: "024 39393539",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
      defaultValue: "info@suntravel.vn",
    },
    {
      name: "workingHours",
      label: "Giờ làm việc",
      type: "group",
      fields: [
        {
          name: "weekdays",
          label: "Thứ 2 - Thứ 6",
          type: "text",
          defaultValue: "8:00-18:00",
        },
        {
          name: "saturday",
          label: "Thứ 7",
          type: "text",
          defaultValue: "8:00-12:00",
        },
      ],
    },
    {
      name: "socialLinks",
      label: "Mạng xã hội",
      type: "group",
      fields: [
        {
          name: "facebook",
          label: "Facebook URL",
          type: "text",
          defaultValue: "https://www.facebook.com/suntravel.com.vn",
        },
        {
          name: "zalo",
          label: "Zalo URL",
          type: "text",
          defaultValue: "https://zalo.me/0974248805",
        },
      ],
    },
    {
      name: "supportStaff",
      label: "Nhân viên hỗ trợ",
      type: "array",
      fields: [
        {
          name: "name",
          label: "Tên",
          type: "text",
          required: true,
        },
        {
          name: "phone",
          label: "Số điện thoại",
          type: "text",
          required: true,
        },
        {
          name: "extension",
          label: "Máy lẻ",
          type: "text",
        },
      ],
      defaultValue: [
        {
          name: "Ms. Quyên",
          phone: "0903.287.313",
          extension: "17",
        },
        {
          name: "Ms. Hồng Anh",
          phone: "0974.248.805",
          extension: "16",
        },
      ],
    },
  ],
};
