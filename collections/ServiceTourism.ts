import { CollectionConfig } from "payload";

export const ServiceTourismCollection: CollectionConfig = {
   slug: "service_tourism",
   admin: {
      useAsTitle: "title",
   },
   access: {
      read: () => true,
      create: ({ req: { user } }) => !!user,
      update: ({ req: { user } }) => !!user,
      delete: ({ req: { user } }) => !!user,
   },
   fields: [
      {
         name: "title",
         type: "text",
         required: true,
         label: "Tiêu đề",
      },
      {
         name: "sort_des",
         type: "text",
         required: true,
         label: "Mô tả ngắn",
      },
      {
            name: 'thumbnail',
            type: "text",
            required: true,
            label: "Thumbnail",
            admin: {
                description: "Link ảnh chính cho bài viết",
            },
      },
      {
         name: "region",
         type: "select",
         required: true,
         options: [
            { label: "Trong nước", value: "trong-nuoc" },
            { label: "Nước ngoài", value: "nuoc-ngoai" },
         ],
         defaultValue: "trong-nuoc",
         label: "Danh mục",
      },
      {
         name: "category",
         type: "relationship",
         relationTo: "tourism_categories", // Review, Ẩm thực, Mẹo...
         required: true,
         label: "Chủ đề bài viết",
      },
      {
         name: "hash_tags",
         type: "array",
         minRows: 1,
         fields: [
            {
               name: "tag",
               type: "text",
               required: true,
            },
         ],
         admin: {
            description: "Nhập hashtag bài viết",
         },
         label: 'Hashtag'
      },
      {
            name: 'content',
            type: 'textarea',
            required: true,
            label: 'Nội dung bài viết',

      }
   ],
};
