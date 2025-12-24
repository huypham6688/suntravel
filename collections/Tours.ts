import { CollectionConfig } from 'payload';

export const Tours: CollectionConfig = {
    slug: "tours",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "location", "price", "category", "region", "badge"],
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
            label: "Tên Tour",
        },
        {
            name: "location",
            type: "text",
            required: true,
            label: "Địa điểm",
            admin: {
                description: "VD: Đà Nẵng, Việt Nam",
            },
        },
        {
            name: "category",
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
            name: "region",
            type: "select",
            required: true,
            options: [
                // Trong nước - Miền Bắc
                { label: "Cát Bà", value: "Cát Bà" },
                { label: "Hạ Long", value: "Hạ Long" },
                { label: "Hải Phòng", value: "Hải Phòng" },
                { label: "Ba Vì", value: "Ba Vì" },
                { label: "Cao Bằng", value: "Cao Bằng" },
                { label: "Cô Tô", value: "Cô Tô" },
                { label: "Hà Giang", value: "Hà Giang" },
                { label: "Hà Nội", value: "Hà Nội" },
                { label: "Hòa Bình", value: "Hòa Bình" },
                { label: "Ninh Bình", value: "Ninh Bình" },
                { label: "Sapa", value: "Sapa" },
                { label: "Sơn La", value: "Sơn La" },
                { label: "Yên Bái", value: "Yên Bái" },
                { label: "Điện Biên", value: "Điện Biên" },
                { label: "Phú Thọ", value: "Phú Thọ" },

                // Trong nước - Miền Trung
                { label: "Nha Trang", value: "Nha Trang" },
                { label: "Quy Nhơn", value: "Quy Nhơn" },
                { label: "Đà Nẵng", value: "Đà Nẵng" },
                { label: "Đà Lạt", value: "Đà Lạt" },
                { label: "Huế", value: "Huế" },
                { label: "Cửa Lò", value: "Cửa Lò" },
                { label: "Quảng Bình", value: "Quảng Bình" },
                { label: "Sầm Sơn", value: "Sầm Sơn" },
                { label: "Tây Nguyên", value: "Tây Nguyên" },

                // Trong nước - Miền Nam
                { label: "Phú Quốc", value: "Phú Quốc" },
                { label: "Cần Thơ", value: "Cần Thơ" },
                { label: "Côn Đảo", value: "Côn Đảo" },
                { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },

                // Nước ngoài
                { label: "Đông Nam Á", value: "Đông Nam Á" },
                { label: "Đông Bắc Á", value: "Đông Bắc Á" },
                { label: "Trung Quốc", value: "Trung Quốc" },
                { label: "Trung Đông", value: "Trung Đông" },
                { label: "Châu Âu", value: "Châu Âu" },
                { label: "Châu Úc", value: "Châu Úc" },
                { label: "Châu Mỹ", value: "Châu Mỹ" },
            ],
            label: "Khu vực",
            admin: {
                description: "Chọn khu vực phù hợp với danh mục",
            },
        },
        {
            name: "duration",
            type: "text",
            required: true,
            label: "Thời gian",
            admin: {
                description: "VD: 4 ngày 3 đêm",
            },
        },
        {
            name: "price",
            type: "number",
            required: true,
            label: "Giá (VNĐ)",
            min: 0,
        },
        {
            name: "originalPrice",
            type: "number",
            label: "Giá gốc (VNĐ)",
            min: 0,
            admin: {
                description: "Để trống nếu không có giảm giá",
            },
        },
        {
            name: "rating",
            type: "number",
            required: true,
            defaultValue: 4.5,
            min: 0,
            max: 5,
            label: "Đánh giá",
        },
        {
            name: "reviews",
            type: "number",
            required: true,
            defaultValue: 0,
            min: 0,
            label: "Số đánh giá",
        },
        {
            name: "image",
            type: "text",
            required: true,
            label: "URL Ảnh chính",
            admin: {
                description: "Link ảnh đại diện cho tour",
            },
        },
        {
            name: "badge",
            type: "select",
            options: [
                { label: "Không có", value: "" },
                { label: "Best Seller", value: "Best Seller" },
                { label: "Hot", value: "Hot" },
                { label: "Sale", value: "Sale" },
                { label: "Được yêu thích", value: "Được yêu thích" },
                { label: "Siêu hot", value: "Siêu hot" },
                { label: "Deal hời", value: "Deal hời" },
                { label: "Mới", value: "Mới" },
                { label: "Luxury", value: "Luxury" },
            ],
            label: "Badge",
            admin: {
                description: "Nhãn đặc biệt hiển thị trên tour",
            },
        },
        {
            name: "maxPeople",
            type: "number",
            label: "Số người tối đa",
            defaultValue: 20,
            min: 1,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
            label: "Mô tả tour",
            admin: {
                description: "Mô tả tổng quan về tour",
            },
        },
        {
            name: "highlights",
            type: "array",
            required: true,
            label: "Điểm nổi bật",
            minRows: 1,
            admin: {
                description: "Các điểm nổi bật của tour",
            },
            fields: [
                {
                    name: "item",
                    type: "text",
                    required: true,
                    label: "Nội dung",
                },
            ],
        },
        {
            name: "itinerary",
            type: "array",
            required: true,
            label: "Lịch trình",
            minRows: 1,
            admin: {
                description: "Chi tiết lịch trình từng ngày",
            },
            fields: [
                {
                    name: "day",
                    type: "number",
                    required: true,
                    label: "Ngày",
                    min: 1,
                },
                {
                    name: "title",
                    type: "text",
                    required: true,
                    label: "Tiêu đề",
                },
                {
                    name: "description",
                    type: "textarea",
                    required: true,
                    label: "Mô tả",
                },
            ],
        },
        {
            name: "includes",
            type: "array",
            required: true,
            label: "Bao gồm",
            minRows: 1,
            admin: {
                description: "Các dịch vụ được bao gồm trong giá tour",
            },
            fields: [
                {
                    name: "item",
                    type: "text",
                    required: true,
                    label: "Nội dung",
                },
            ],
        },
        {
            name: "excludes",
            type: "array",
            required: true,
            label: "Không bao gồm",
            minRows: 1,
            admin: {
                description: "Các chi phí không bao gồm trong giá tour",
            },
            fields: [
                {
                    name: "item",
                    type: "text",
                    required: true,
                    label: "Nội dung",
                },
            ],
        },
        {
            name: "gallery",
            type: "array",
            required: true,
            label: "Thư viện ảnh",
            minRows: 1,
            admin: {
                description: "Các ảnh minh họa cho tour",
            },
            fields: [
                {
                    name: "url",
                    type: "text",
                    required: true,
                    label: "URL Ảnh",
                },
            ],
        },
        {
            name: "departureDate",
            type: "array",
            required: true,
            label: "Ngày khởi hành",
            minRows: 1,
            admin: {
                description: "Các ngày khởi hành có sẵn",
            },
            fields: [
                {
                    name: "date",
                    type: "text",
                    required: true,
                    label: "Ngày",
                    admin: {
                        description: "VD: 05/04/2025",
                    },
                },
            ],
        },
    ],
};