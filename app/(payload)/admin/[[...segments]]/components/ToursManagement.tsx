"use client";

import { useState, useEffect } from "react";

interface Tour {
    id: string;
    title: string;
    location: string;
    region: string;
    duration: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    category: string;
    maxPeople: number;
    description: string;
    highlights: { item: string }[];
    itinerary: { day: number; title: string; description: string }[];
    includes: { item: string }[];
    excludes: { item: string }[];
    gallery: { url: string }[];
    departureDate: { date: string }[];
}

type View = "list" | "form";

export default function ToursManagement() {
    const [view, setView] = useState<View>("list");
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterCategory, setFilterCategory] = useState("");
    const [editingTour, setEditingTour] = useState<Tour | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<Tour>>({
        title: "",
        location: "",
        region: "Hạ Long",
        duration: "",
        price: 0,
        originalPrice: 0,
        rating: 4.5,
        reviews: 0,
        image: "",
        badge: "",
        category: "trong-nuoc",
        maxPeople: 20,
        description: "",
        highlights: [{ item: "" }],
        itinerary: [{ day: 1, title: "", description: "" }],
        includes: [{ item: "" }],
        excludes: [{ item: "" }],
        gallery: [{ url: "" }],
        departureDate: [{ date: "" }],
    });

    useEffect(() => {
        if (view === "list") {
            fetchTours();
        }
    }, [view, filterCategory]);

    useEffect(() => {
        if (editingTour) {
            setFormData(editingTour);
        }
    }, [editingTour]);

    // Reset region when category changes
    useEffect(() => {
        if (formData.category === "trong-nuoc") {
            setFormData(prev => ({ ...prev, region: "Hạ Long" }));
        } else {
            setFormData(prev => ({ ...prev, region: "Đông Nam Á" }));
        }
    }, [formData.category]);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const url = filterCategory
                ? `/api/tours?category=${filterCategory}&limit=100`
                : "/api/tours?limit=100";

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setTours(data.docs);
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTour = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa tour này?")) return;

        try {
            const response = await fetch(`/api/tours/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Xóa tour thành công!");
                fetchTours();
            } else {
                alert("Xóa tour thất bại!");
            }
        } catch (error) {
            console.error("Error deleting tour:", error);
            alert("Có lỗi xảy ra!");
        }
    };

    const handleEdit = (tour: Tour) => {
        setEditingTour(tour);
        setView("form");
    };

    const handleCreateNew = () => {
        setEditingTour(null);
        setFormData({
            title: "",
            location: "",
            region: "Hạ Long",
            duration: "",
            price: 0,
            originalPrice: 0,
            rating: 4.5,
            reviews: 0,
            image: "",
            badge: "",
            category: "trong-nuoc",
            maxPeople: 20,
            description: "",
            highlights: [{ item: "" }],
            itinerary: [{ day: 1, title: "", description: "" }],
            includes: [{ item: "" }],
            excludes: [{ item: "" }],
            gallery: [{ url: "" }],
            departureDate: [{ date: "" }],
        });
        setView("form");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = editingTour ? `/api/tours/${editingTour.id}` : "/api/tours";
            const method = editingTour ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(
                    editingTour ? "Cập nhật tour thành công!" : "Tạo tour thành công!"
                );
                setView("list");
                setEditingTour(null);
            } else {
                alert(`Có lỗi xảy ra: ${result.error || 'Unknown error'}`);
                console.error('Error details:', result);
            }
        } catch (error) {
            console.error("Error saving tour:", error);
            alert("Có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    };

    // Array helper functions
    const addItem = (field: keyof Tour, template: any) => {
        setFormData({
            ...formData,
            [field]: [...(formData[field] as any[]), template],
        });
    };

    const removeItem = (field: keyof Tour, index: number) => {
        setFormData({
            ...formData,
            [field]: (formData[field] as any[]).filter((_, i) => i !== index),
        });
    };

    const updateItem = (field: keyof Tour, index: number, value: any) => {
        const items = [...(formData[field] as any[])];
        items[index] = value;
        setFormData({ ...formData, [field]: items });
    };

    // List View
    if (view === "list") {
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Quản lý Tours</h2>
                    <button
                        onClick={handleCreateNew}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Thêm Tour Mới
                    </button>
                </div>

                {/* Filter */}
                <div className="mb-6 flex gap-2">
                    <button
                        onClick={() => setFilterCategory("")}
                        className={`px-4 py-2 rounded-lg ${
                            filterCategory === ""
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilterCategory("trong-nuoc")}
                        className={`px-4 py-2 rounded-lg ${
                            filterCategory === "trong-nuoc"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        Trong nước
                    </button>
                    <button
                        onClick={() => setFilterCategory("nuoc-ngoai")}
                        className={`px-4 py-2 rounded-lg ${
                            filterCategory === "nuoc-ngoai"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        Nước ngoài
                    </button>
                </div>

                {/* Tours Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                        <p className="mt-4 text-gray-600">Đang tải...</p>
                    </div>
                ) : tours.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Chưa có tour nào</p>
                        <button
                            onClick={handleCreateNew}
                            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Tạo tour đầu tiên
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Ảnh
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Tên Tour
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Địa điểm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Khu vực
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Thao tác
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {tours.map((tour) => (
                                <tr key={tour.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">
                                            {tour.title}
                                        </div>
                                        {tour.badge && (
                                            <span className="text-xs text-blue-600">
                                                {tour.badge}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {tour.location}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {tour.region}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {tour.price.toLocaleString()}đ
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                tour.category === "trong-nuoc"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-purple-100 text-purple-800"
                                            }`}
                                        >
                                            {tour.category === "trong-nuoc"
                                                ? "Trong nước"
                                                : "Nước ngoài"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(tour)}
                                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => deleteTour(tour.id)}
                                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    // Form View
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                    {editingTour ? "Chỉnh sửa Tour" : "Tạo Tour Mới"}
                </h2>
                <button
                    onClick={() => setView("list")}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                {/* Thông tin cơ bản */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-4">Thông tin cơ bản</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Tên Tour *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Địa điểm *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Danh mục *
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="trong-nuoc">Trong nước</option>
                                <option value="nuoc-ngoai">Nước ngoài</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Khu vực *
                            </label>
                            <select
                                required
                                value={formData.region || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, region: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                {formData.category === "trong-nuoc" ? (
                                    <>
                                        <optgroup label="MIỀN BẮC">
                                            <option value="Cát Bà">Cát Bà</option>
                                            <option value="Hạ Long">Hạ Long</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                            <option value="Ba Vì">Ba Vì</option>
                                            <option value="Cao Bằng">Cao Bằng</option>
                                            <option value="Cô Tô">Cô Tô</option>
                                            <option value="Hà Giang">Hà Giang</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="Hòa Bình">Hòa Bình</option>
                                            <option value="Ninh Bình">Ninh Bình</option>
                                            <option value="Sapa">Sapa</option>
                                            <option value="Sơn La">Sơn La</option>
                                            <option value="Yên Bái">Yên Bái</option>
                                            <option value="Điện Biên">Điện Biên</option>
                                            <option value="Phú Thọ">Phú Thọ</option>
                                        </optgroup>
                                        <optgroup label="MIỀN TRUNG">
                                            <option value="Nha Trang">Nha Trang</option>
                                            <option value="Quy Nhơn">Quy Nhơn</option>
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                            <option value="Đà Lạt">Đà Lạt</option>
                                            <option value="Huế">Huế</option>
                                            <option value="Cửa Lò">Cửa Lò</option>
                                            <option value="Quảng Bình">Quảng Bình</option>
                                            <option value="Sầm Sơn">Sầm Sơn</option>
                                            <option value="Tây Nguyên">Tây Nguyên</option>
                                        </optgroup>
                                        <optgroup label="MIỀN NAM">
                                            <option value="Phú Quốc">Phú Quốc</option>
                                            <option value="Cần Thơ">Cần Thơ</option>
                                            <option value="Côn Đảo">Côn Đảo</option>
                                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                        </optgroup>
                                    </>
                                ) : (
                                    <>
                                        <optgroup label="CHÂU Á">
                                            <option value="Đông Nam Á">Đông Nam Á</option>
                                            <option value="Trung Quốc">Trung Quốc</option>
                                            <option value="Đông Bắc Á">Đông Bắc Á</option>
                                            <option value="Trung Đông">Trung Đông</option>
                                        </optgroup>
                                        <optgroup label="CHÂU ÂU">
                                            <option value="Châu Âu">Châu Âu</option>
                                        </optgroup>
                                        <optgroup label="CHÂU ÚC - MỸ">
                                            <option value="Châu Úc">Châu Úc</option>
                                            <option value="Châu Mỹ">Châu Mỹ</option>
                                        </optgroup>
                                    </>
                                )}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Thời gian *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="VD: 4 ngày 3 đêm"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData({ ...formData, duration: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giá (VNĐ) *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: parseInt(e.target.value) })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giá gốc (VNĐ)
                            </label>
                            <input
                                type="number"
                                value={formData.originalPrice || ""}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        originalPrice: parseInt(e.target.value) || undefined,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge</label>
                            <select
                                value={formData.badge || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, badge: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="">Không có</option>
                                <option value="Best Seller">Best Seller</option>
                                <option value="Hot">Hot</option>
                                <option value="Sale">Sale</option>
                                <option value="Được yêu thích">Được yêu thích</option>
                                <option value="Siêu hot">Siêu hot</option>
                                <option value="Deal hời">Deal hời</option>
                                <option value="Mới">Mới</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Số người tối đa *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.maxPeople}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        maxPeople: parseInt(e.target.value),
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Đánh giá (0-5) *
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                required
                                value={formData.rating}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        rating: parseFloat(e.target.value),
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Số đánh giá *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.reviews}
                                onChange={(e) =>
                                    setFormData({ ...formData, reviews: parseInt(e.target.value) })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                URL Ảnh chính *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Mô tả tour *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Điểm nổi bật */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Điểm nổi bật</h3>
                        <button
                            type="button"
                            onClick={() => addItem("highlights", { item: "" })}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            + Thêm
                        </button>
                    </div>
                    {formData.highlights?.map((highlight, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={highlight.item}
                                onChange={(e) =>
                                    updateItem("highlights", index, { item: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="Điểm nổi bật..."
                            />
                            <button
                                type="button"
                                onClick={() => removeItem("highlights", index)}
                                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                {/* Lịch trình */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Lịch trình</h3>
                        <button
                            type="button"
                            onClick={() =>
                                addItem("itinerary", {
                                    day: (formData.itinerary?.length || 0) + 1,
                                    title: "",
                                    description: "",
                                })
                            }
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            + Thêm ngày
                        </button>
                    </div>
                    {formData.itinerary?.map((item, index) => (
                        <div key={index} className="mb-4 p-3 bg-white rounded border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Ngày {item.day}</span>
                                <button
                                    type="button"
                                    onClick={() => removeItem("itinerary", index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Xóa
                                </button>
                            </div>
                            <input
                                type="text"
                                value={item.title}
                                onChange={(e) =>
                                    updateItem("itinerary", index, { ...item, title: e.target.value })
                                }
                                placeholder="Tiêu đề..."
                                className="w-full px-3 py-2 border rounded-lg mb-2"
                            />
                            <textarea
                                value={item.description}
                                onChange={(e) =>
                                    updateItem("itinerary", index, {
                                        ...item,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Mô tả..."
                                rows={3}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* Bao gồm */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Bao gồm</h3>
                        <button
                            type="button"
                            onClick={() => addItem("includes", { item: "" })}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            + Thêm
                        </button>
                    </div>
                    {formData.includes?.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={item.item}
                                onChange={(e) =>
                                    updateItem("includes", index, { item: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="Bao gồm..."
                            />
                            <button
                                type="button"
                                onClick={() => removeItem("includes", index)}
                                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                {/* Không bao gồm */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Không bao gồm</h3>
                        <button
                            type="button"
                            onClick={() => addItem("excludes", { item: "" })}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            + Thêm
                        </button>
                    </div>
                    {formData.excludes?.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={item.item}
                                onChange={(e) =>
                                    updateItem("excludes", index, { item: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="Không bao gồm..."
                            />
                            <button
                                type="button"
                                onClick={() => removeItem("excludes", index)}
                                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                {/* Thư viện ảnh */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Thư viện ảnh</h3>
                        <button
                            type="button"
                            onClick={() => addItem("gallery", { url: "" })}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            + Thêm
                        </button>
                    </div>
                    {formData.gallery?.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={item.url}
                                onChange={(e) =>
                                    updateItem("gallery", index, { url: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="URL ảnh..."
                            />
                            <button
                                type="button"
                                onClick={() => removeItem("gallery", index)}
                                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                {/* Ngày khởi hành */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Ngày khởi hành</h3>
                        <button
                            type="button"
                            onClick={() => addItem("departureDate", { date: "" })}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            + Thêm
                        </button>
                    </div>
                    {formData.departureDate?.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={item.date}
                                onChange={(e) =>
                                    updateItem("departureDate", index, { date: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="VD: 05/04/2025"
                            />
                            <button
                                type="button"
                                onClick={() => removeItem("departureDate", index)}
                                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                {/* Submit buttons */}
                <div className="flex gap-4 sticky bottom-0 bg-white py-4 border-t">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Đang lưu..." : editingTour ? "Cập nhật" : "Tạo mới"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setView("list")}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}