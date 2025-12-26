"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    X,
    Upload,
    Save,
    Play,
    Star,
    Calendar,
} from "lucide-react";

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    date: string;
    category: string;
    featured: boolean;
}

interface Props {
    onStatsUpdate?: () => void;
}

const categories = [
    { label: "Trong nước", value: "domestic" },
    { label: "Nước ngoài", value: "international" },
    { label: "Ẩm thực", value: "food" },
    { label: "Mẹo du lịch", value: "tips" },
    { label: "Review", value: "review" },
    { label: "Hướng dẫn", value: "guide" },
];

export default function VideosCRUD({ onStatsUpdate }: Props) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingVideo, setEditingVideo] = useState<Video | null>(null);
    const [mediaFiles, setMediaFiles] = useState<any[]>([]);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [mediaPickerType, setMediaPickerType] = useState<"thumbnail" | "video">("thumbnail");

    const [formData, setFormData] = useState({
        title: "",
        thumbnail: "",
        videoFile: "",
        date: "",
        category: "domestic",
        featured: false,
    });

    useEffect(() => {
        fetchVideos();
        fetchMediaFiles();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await fetch("/api/videos");
            const data = await response.json();
            if (data.success) {
                setVideos(data.docs);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMediaFiles = async () => {
        try {
            const response = await fetch("/api/media?limit=200");
            const data = await response.json();
            if (data.docs) {
                setMediaFiles(data.docs);
            }
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    };

    const handleFileUpload = async (file: File, type: "image" | "video") => {
        if (type === "image") {
            setUploadingImage(true);
        } else {
            setUploadingVideo(true);
        }

        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);
            formDataUpload.append("alt", file.name.replace(/\.[^/.]+$/, ""));

            const response = await fetch("/api/upload-cloudinary", {
                method: "POST",
                body: formDataUpload,
            });

            const data = await response.json();

            if (data.success && data.doc) {
                await fetchMediaFiles();
                return data.doc.id;
            } else {
                throw new Error(data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert(`Có lỗi khi upload ${type === "image" ? "ảnh" : "video"}`);
            return null;
        } finally {
            if (type === "image") {
                setUploadingImage(false);
            } else {
                setUploadingVideo(false);
            }
        }
    };

    const handleCreate = () => {
        setEditingVideo(null);
        setFormData({
            title: "",
            thumbnail: "",
            videoFile: "",
            date: new Date().toLocaleDateString("vi-VN"),
            category: "domestic",
            featured: false,
        });
        setShowModal(true);
    };

    const handleEdit = (video: Video) => {
        setEditingVideo(video);
        setFormData({
            title: video.title,
            thumbnail: video.thumbnail,
            videoFile: video.videoUrl,
            date: video.date,
            category: video.category,
            featured: video.featured,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.thumbnail) {
            alert("Vui lòng chọn ảnh thumbnail");
            return;
        }

        if (!formData.videoFile) {
            alert("Vui lòng chọn file video");
            return;
        }

        try {
            const payload = {
                title: formData.title,
                thumbnail: formData.thumbnail,
                videoFile: formData.videoFile,
                date: formData.date,
                category: formData.category,
                featured: formData.featured,
            };

            const url = editingVideo
                ? `/api/videos/${editingVideo.id}`
                : "/api/videos";
            const method = editingVideo ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                alert(editingVideo ? "Cập nhật thành công!" : "Thêm mới thành công!");
                setShowModal(false);
                fetchVideos();
                onStatsUpdate?.();
            } else {
                alert("Có lỗi xảy ra: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Có lỗi xảy ra khi lưu dữ liệu");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa video này?")) return;

        try {
            const response = await fetch(`/api/videos/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                alert("Xóa thành công!");
                fetchVideos();
                onStatsUpdate?.();
            } else {
                alert("Có lỗi xảy ra khi xóa");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Có lỗi xảy ra khi xóa");
        }
    };

    const selectMedia = (mediaId: string) => {
        if (mediaPickerType === "thumbnail") {
            setFormData({ ...formData, thumbnail: mediaId });
        } else {
            setFormData({ ...formData, videoFile: mediaId });
        }
        setShowMediaPicker(false);
    };

    const openMediaPicker = (type: "thumbnail" | "video") => {
        setMediaPickerType(type);
        setShowMediaPicker(true);
    };

    const filteredVideos = videos.filter((video) => {
        const matchesSearch = video.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            filterCategory === "all" || video.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const getMediaUrl = (mediaId: string) => {
        if (!mediaId) return "";
        const media = mediaFiles.find((m) => m.id === mediaId);
        return media?.url || media?.cloudinaryUrl || "";
    };

    const getCategoryLabel = (value: string) => {
        return categories.find((c) => c.value === value)?.label || value;
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-gray-500">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold">Quản lý Videos</h2>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                    <Plus className="h-5 w-5" />
                    Thêm mới
                </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none"
                    />
                </div>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((video) => {
                    const imageUrl = video.thumbnail || getMediaUrl(video.thumbnail);

                    return (
                        <div
                            key={video.id}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-gray-100">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={video.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}

                                {/* Play Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="rounded-full bg-white/90 p-3">
                                        <Play className="h-6 w-6 fill-orange-600 text-orange-600" />
                                    </div>
                                </div>

                                {/* Category & Featured Badges */}
                                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                    {getCategoryLabel(video.category)}
                  </span>
                                    {video.featured && (
                                        <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                      <Star className="h-3 w-3" /> Nổi bật
                    </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar className="h-3 w-3" />
                                    {video.date}
                                </div>
                                <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                                    {video.title}
                                </h3>
                            </div>

                            {/* Actions */}
                            <div className="flex border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(video)}
                                    className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-blue-600 transition-colors hover:bg-blue-50"
                                >
                                    <Edit className="h-4 w-4" />
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(video.id)}
                                    className="flex flex-1 items-center justify-center gap-2 border-l border-gray-100 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Xóa
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredVideos.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                    Không tìm thấy kết quả nào
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
                        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">
                            <h3 className="text-xl font-bold">
                                {editingVideo ? "Chỉnh sửa" : "Thêm mới"} Video
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg p-2 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Tiêu đề *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                                        placeholder="VD: Khám phá vẻ đẹp Hà Giang"
                                    />
                                </div>

                                {/* Thumbnail */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Ảnh thumbnail *
                                    </label>
                                    <div className="flex gap-4">
                                        {formData.thumbnail && (
                                            <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                                                <Image
                                                    src={getMediaUrl(formData.thumbnail)}
                                                    alt="Thumbnail"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => openMediaPicker("thumbnail")}
                                            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 hover:border-orange-500"
                                        >
                                            <Upload className="h-5 w-5" />
                                            Chọn ảnh
                                        </button>
                                    </div>
                                </div>

                                {/* Video File */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        File Video *
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        {formData.videoFile && (
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                                                <p className="text-sm text-green-700">
                                                    ✓ Video đã được chọn
                                                </p>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => openMediaPicker("video")}
                                            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 hover:border-orange-500"
                                        >
                                            <Upload className="h-5 w-5" />
                                            {formData.videoFile ? "Đổi video" : "Chọn video"}
                                        </button>
                                        <p className="text-xs text-gray-500">
                                            Hỗ trợ: MP4, MOV, AVI, MKV. Kích thước tối đa: 100MB
                                        </p>
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Ngày đăng
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                                        placeholder="28/03/2025"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Để trống sẽ tự động lấy ngày hiện tại
                                    </p>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Danh mục *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Featured Checkbox */}
                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    featured: e.target.checked,
                                                })
                                            }
                                            className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <span className="text-sm font-medium">Video nổi bật</span>
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-gray-300 px-6 py-2 hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-2 text-white hover:bg-orange-700"
                                >
                                    <Save className="h-5 w-5" />
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Media Picker Modal */}
            {showMediaPicker && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white">
                        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">
                            <h3 className="text-xl font-bold">
                                {mediaPickerType === "thumbnail"
                                    ? "Chọn ảnh thumbnail"
                                    : "Chọn file video"}
                            </h3>
                            <button
                                onClick={() => setShowMediaPicker(false)}
                                className="rounded-lg p-2 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Upload Section */}
                        <div className="border-b bg-gray-50 p-6">
                            <label className="mb-2 block text-sm font-medium">
                                {mediaPickerType === "thumbnail"
                                    ? "Upload ảnh mới"
                                    : "Upload video mới"}
                            </label>
                            <input
                                type="file"
                                accept={
                                    mediaPickerType === "thumbnail"
                                        ? "image/*"
                                        : "video/*"
                                }
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const mediaId = await handleFileUpload(
                                            file,
                                            mediaPickerType === "thumbnail" ? "image" : "video"
                                        );
                                        if (mediaId) {
                                            if (mediaPickerType === "thumbnail") {
                                                setFormData({ ...formData, thumbnail: mediaId });
                                            } else {
                                                setFormData({ ...formData, videoFile: mediaId });
                                            }
                                            setShowMediaPicker(false);
                                        }
                                    }
                                }}
                                disabled={uploadingImage || uploadingVideo}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-600 hover:file:bg-orange-100 disabled:opacity-50"
                            />
                            {(uploadingImage || uploadingVideo) && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-orange-600">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
                                    Đang upload... (có thể mất vài phút với video lớn)
                                </div>
                            )}
                        </div>

                        {/* Media Grid */}
                        <div className="grid grid-cols-3 gap-4 p-6 md:grid-cols-4">
                            {mediaFiles
                                .filter((media) => {
                                    if (mediaPickerType === "thumbnail") {
                                        return media.mimeType?.startsWith("image/");
                                    } else {
                                        return media.mimeType?.startsWith("video/");
                                    }
                                })
                                .map((media) => (
                                    <button
                                        key={media.id}
                                        type="button"
                                        onClick={() => selectMedia(media.id)}
                                        className="group relative aspect-square overflow-hidden rounded-lg border hover:border-orange-500"
                                    >
                                        {media.mimeType?.startsWith("video/") ? (
                                            <div className="flex h-full items-center justify-center bg-gray-100">
                                                <Play className="h-8 w-8 text-gray-400" />
                                            </div>
                                        ) : (
                                            <Image
                                                src={media.url || media.cloudinaryUrl}
                                                alt={media.alt || "Media"}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-110"
                                            />
                                        )}
                                    </button>
                                ))}
                        </div>

                        {mediaFiles.filter((media) =>
                                mediaPickerType === "thumbnail"
                                    ? media.mimeType?.startsWith("image/")
                                    : media.mimeType?.startsWith("video/")
                            ).length === 0 &&
                            !uploadingImage &&
                            !uploadingVideo && (
                                <div className="p-6 text-center text-gray-500">
                                    Chưa có {mediaPickerType === "thumbnail" ? "ảnh" : "video"}{" "}
                                    nào. Upload ngay!
                                </div>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}