import { CollectionConfig } from "payload";

export const TourismCategoryCollection: CollectionConfig = {
   slug: "tourism_categories",
   admin: {
      useAsTitle: "title",
   },
   access: {
      read: () => true,
   },
   fields: [
      {
         name: "title",
         type: "text",
         required: true,
         label: "Tên danh mục",
      },
      {
         name: "slug",
         type: "text",
         required: true,
         unique: true,
         label: "Slug (Dùng để lọc trên URL)",
         admin: {
            description: "Ví dụ: review, cam-nang, am-thuc",
         },
      },
   ],
};