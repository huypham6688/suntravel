"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ImageIcon, Eye, EyeOff } from "lucide-react";

interface MediaType {
    id: string;
    url?: string;
    cloudinaryUrl?: string;
    filename?: string;
}

interface BannerType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: MediaType | string;
    cta: string;
    ctaLink: string;
    isActive: boolean;
    order: number;
}

export default function HeroBannersManager() {
    const [banners, setBanners] = useState<BannerType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<BannerType | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image: null as File | null,
        cta: "Đặt ngay",
        ctaLink: "/lien-he",
        isActive: true,
        order: "0",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/hero-banners?sort=order");

            if (!res.ok) {
                const text = await res.text();
                console.error("API Error:", text);
                throw new Error(`API returned ${res.status}`);
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error("Expected JSON but got:", contentType);
                throw new Error("Invalid response format");
            }

            const data = await res.json();
            if (data.docs) {
                setBanners(data.docs);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
            if (banners.length > 0) {
                alert("Lỗi khi tải dữ liệu banners");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("alt", file.name.replace(/\.[^/.]+$/, ""));

        const uploadRes = await fetch("/api/upload-cloudinary", {
            method: "POST",
            body: imageFormData,
        });

        if (!uploadRes.ok) {
            const error = await uploadRes.text();
            console.error("Upload error:", error);
            throw new Error(`Failed to upload image: ${uploadRes.status}`);
        }

        const contentType = uploadRes.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid upload response format");
        }

        const uploadData = await uploadRes.json();

        if (!uploadData.success || !uploadData.doc || !uploadData.doc.id) {
            throw new Error(uploadData.error || "Invalid upload response structure");
        }

        return uploadData.doc.id;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!formData.title || !formData.subtitle || !formData.description) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        if (!formData.image && !editingBanner) {
            alert("Vui lòng chọn hình ảnh!");
            return;
        }

        setIsLoading(true);
        setUploadProgress(0);

        try {
            let imageId = "";

            if (editingBanner) {
                if (typeof editingBanner.image === "object") {
                    imageId = (editingBanner.image as any).id || editingBanner.image.id;
                } else if (typeof editingBanner.image === "string") {
                    imageId = editingBanner.image;
                }
            }

            if (formData.image) {
                setUploadProgress(30);
                imageId = await uploadImage(formData.image);
                setUploadProgress(60);
            }

            const payload = {
                title: formData.title,
                subtitle: formData.subtitle,
                description: formData.description,
                image: imageId,
                cta: formData.cta,
                ctaLink: formData.ctaLink,
                isActive: formData.isActive,
                order: parseInt(formData.order),
            };

            const url = editingBanner
                ? `/api/hero-banners/${editingBanner.id}`
                : "/api/hero-banners";

            setUploadProgress(80);

            const res = await fetch(url, {
                method: editingBanner ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const error = await res.text();
                console.error("Save error:", error);
                throw new Error(`Failed to save banner: ${res.status}`);
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid save response format");
            }

            setUploadProgress(100);
            alert(editingBanner ? "Đã cập nhật banner!" : "Đã thêm banner mới!");
            closeModal();
            fetchBanners();
        } catch (error) {
            console.error("Error saving banner:", error);
            alert(
                `Lỗi khi lưu banner: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa banner này?")) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/hero-banners/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete");
            alert("Đã xóa banner!");
            fetchBanners();
        } catch (error) {
            console.error("Error deleting banner:", error);
            alert("Lỗi khi xóa banner");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (banner: BannerType) => {
        setEditingBanner(banner);
        setFormData({
            title: banner.title,
            subtitle: banner.subtitle,
            description: banner.description,
            image: null,
            cta: banner.cta,
            ctaLink: banner.ctaLink || "/lien-he",
            isActive: banner.isActive,
            order: banner.order.toString(),
        });

        if (typeof banner.image === "object") {
            // Handle Media object with cloudinaryUrl
            const imageUrl = (banner.image as any).cloudinaryUrl || (banner.image as any).url;
            if (imageUrl) {
                setImagePreview(imageUrl);
            }
        } else if (typeof banner.image === "string") {
            setImagePreview(banner.image);
        }

        setIsModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Kích thước file không được vượt quá 5MB!");
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Vui lòng chọn file hình ảnh!");
                return;
            }

            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const toggleActive = async (banner: BannerType) => {
        try {
            const res = await fetch(`/api/hero-banners/${banner.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !banner.isActive }),
            });

            if (!res.ok) throw new Error("Failed to toggle");
            fetchBanners();
        } catch (error) {
            console.error("Error toggling banner:", error);
            alert("Lỗi khi cập nhật trạng thái");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBanner(null);
        setFormData({
            title: "",
            subtitle: "",
            description: "",
            image: null,
            cta: "Đặt ngay",
            ctaLink: "/lien-he",
            isActive: true,
            order: "0",
        });
        setImagePreview("");
        setUploadProgress(0);
    };

    const getImageUrl = (image: MediaType | string): string => {
        if (typeof image === "string") return image;
        // Handle Media object with cloudinaryUrl
        return (image as any).cloudinaryUrl || image.url || "";
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hero Banners</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Quản lý banner slideshow trang chủ
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={18} />
                    Thêm Banner
                </button>
            </div>

            {isLoading && !isModalOpen ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : banners.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Chưa có banner nào
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Tạo banner đầu tiên để hiển thị trên trang chủ
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={18} />
                        Thêm Banner Đầu Tiên
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative h-48 bg-gray-100">
                                {banner.image ? (
                                    <img
                                        src={getImageUrl(banner.image)}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon size={48} className="text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 flex gap-2">
                  <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                          banner.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {banner.isActive ? "Kích hoạt" : "Tắt"}
                  </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    #{banner.order}
                  </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                    {banner.title}
                                </h3>
                                <p className="text-sm text-blue-600 font-medium mb-2">
                                    {banner.subtitle}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {banner.description}
                                </p>

                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => toggleActive(banner)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                            banner.isActive
                                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                        }`}
                                    >
                                        {banner.isActive ? (
                                            <EyeOff size={14} />
                                        ) : (
                                            <Eye size={14} />
                                        )}
                                        {banner.isActive ? "Tắt" : "Bật"}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(banner)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                    >
                                        <Edit2 size={14} />
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors ml-auto"
                                    >
                                        <Trash2 size={14} />
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingBanner ? "Chỉnh sửa Banner" : "Thêm Banner Mới"}
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-700 font-medium">
                      Đang upload...
                    </span>
                                        <span className="text-blue-600">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-blue-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề chính <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Du lịch Paris - Pháp"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề phụ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subtitle}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subtitle: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Combo 3N2Đ chỉ từ 2.990.000đ"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mô tả <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Bay thẳng + Khách sạn 4 sao + Buffet sáng"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hình ảnh Banner{" "}
                                    {!editingBanner && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Kích thước khuyến nghị: 1920x600px (tối đa 5MB)
                                </p>
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Text nút CTA
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cta}
                                        onChange={(e) =>
                                            setFormData({ ...formData, cta: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Link CTA
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ctaLink}
                                        onChange={(e) =>
                                            setFormData({ ...formData, ctaLink: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thứ tự
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) =>
                                            setFormData({ ...formData, order: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    isActive: e.target.checked,
                                                })
                                            }
                                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                      Kích hoạt banner
                    </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading
                                        ? "Đang xử lý..."
                                        : editingBanner
                                            ? "Cập nhật"
                                            : "Thêm mới"}
                                </button>
                                <button
                                    onClick={closeModal}
                                    disabled={isLoading}
                                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}