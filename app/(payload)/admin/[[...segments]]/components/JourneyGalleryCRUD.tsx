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
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";

interface JourneyGalleryItem {
  id: string;
  alt: string;
  category: string;
  tourName: string;
  date: string;
  featuredImage: any;
  gallery: any[];
  description?: string;
  status: string;
  featured: boolean;
  order: number;
}

interface Props {
  onStatsUpdate?: () => void;
}

const categories = [
  "Nội địa",
  "Tour Châu Á",
  "Tour Châu Âu",
  "Tour Châu Mỹ",
  "Tour Châu Úc",
  "Tour Châu Phi",
];

export default function JourneyGalleryCRUD({ onStatsUpdate }: Props) {
  const [items, setItems] = useState<JourneyGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<JourneyGalleryItem | null>(
    null
  );
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerMode, setMediaPickerMode] = useState<
    "featured" | "gallery"
  >("featured");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    alt: "",
    category: "Nội địa",
    tourName: "",
    date: "",
    featuredImage: "",
    gallery: [] as string[],
    description: "",
    status: "published",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchItems();
    fetchMediaFiles();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/journey-gallery");
      const data = await response.json();
      if (data.success) {
        setItems(data.docs);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaFiles = async () => {
    try {
      const response = await fetch("/api/media?limit=100");
      const data = await response.json();
      if (data.docs) {
        setMediaFiles(data.docs);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadingImage(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      const response = await fetch("/api/upload-cloudinary", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();

      if (data.success) {
        await fetchMediaFiles();
        toast.success("Upload thành công!");
        return data.doc.id;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Có lỗi khi upload ảnh");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      alt: "",
      category: "Nội địa",
      tourName: "",
      date: "",
      featuredImage: "",
      gallery: [],
      description: "",
      status: "published",
      featured: false,
      order: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (item: JourneyGalleryItem) => {
    setEditingItem(item);
    setFormData({
      alt: item.alt,
      category: item.category,
      tourName: item.tourName,
      date: item.date,
      featuredImage:
        typeof item.featuredImage === "object"
          ? item.featuredImage.id
          : item.featuredImage,
      gallery:
        item.gallery?.map((g: any) =>
          typeof g.image === "object" ? g.image.id : g.image
        ) || [],
      description: item.description || "",
      status: item.status,
      featured: item.featured,
      order: item.order,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        gallery: formData.gallery.map((imageId) => ({ image: imageId })),
      };

      const url = editingItem
        ? `/api/journey-gallery/${editingItem.id}`
        : "/api/journey-gallery";
      const method = editingItem ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          editingItem ? "Cập nhật thành công!" : "Thêm mới thành công!"
        );
        setShowModal(false);
        fetchItems();
        onStatsUpdate?.();
      } else {
        toast.error("Có lỗi xảy ra: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Có lỗi xảy ra khi lưu dữ liệu");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mục này?")) return;

    try {
      const response = await fetch(`/api/journey-gallery/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Xóa thành công!");
        fetchItems();
        onStatsUpdate?.();
      } else {
        toast.error("Có lỗi xảy ra khi xóa");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Có lỗi xảy ra khi xóa");
    }
  };

  const selectMedia = (mediaId: string) => {
    if (mediaPickerMode === "featured") {
      setFormData({ ...formData, featuredImage: mediaId });
      setShowMediaPicker(false);
    } else {
      if (!formData.gallery.includes(mediaId)) {
        setFormData({
          ...formData,
          gallery: [...formData.gallery, mediaId],
        });
      }
    }
  };

  const removeGalleryImage = (imageId: string) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((id) => id !== imageId),
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tourName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getMediaUrl = (mediaId: string) => {
    if (!mediaId) return "";
    const media = mediaFiles.find((m) => m.id === mediaId);
    return media?.url || media?.cloudinaryUrl || "";
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
        <h2 className="text-2xl font-bold">Quản lý Journey Gallery</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
            placeholder="Tìm kiếm theo tên hành trình hoặc tour..."
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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          // Get featured image URL
          let imageUrl = "";
          if (item.featuredImage) {
            if (typeof item.featuredImage === "object") {
              imageUrl =
                item.featuredImage.cloudinaryUrl ||
                item.featuredImage.url ||
                "";
            } else if (typeof item.featuredImage === "string") {
              imageUrl = getMediaUrl(item.featuredImage);
            }
          }

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-medium text-white">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                      Nổi bật
                    </span>
                  )}
                  {item.status === "draft" && (
                    <span className="rounded-full bg-gray-500 px-2 py-1 text-xs font-medium text-white">
                      Nháp
                    </span>
                  )}
                </div>

                {/* Gallery count */}
                <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  {item.gallery?.length || 0} ảnh
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-gray-900">{item.alt}</h3>
                <p className="mb-2 text-sm text-gray-600">{item.tourName}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>

              {/* Actions */}
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-blue-600 transition-colors hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4" />
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          Không tìm thấy kết quả nào
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">
              <h3 className="text-xl font-bold">
                {editingItem ? "Chỉnh sửa" : "Thêm mới"} Journey Gallery
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
                {/* Basic Info */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Tên hành trình *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.alt}
                      onChange={(e) =>
                        setFormData({ ...formData, alt: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                      placeholder="Ví dụ: Hội An - Phố Cổ Tình Yêu"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Danh mục *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Tên tour đầy đủ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tourName}
                      onChange={(e) =>
                        setFormData({ ...formData, tourName: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                      placeholder="Ví dụ: Tour Hội An - Đà Nẵng 3N2Đ"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Ngày khởi hành *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                      placeholder="Ví dụ: Tháng 12/2024"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Ảnh đại diện *
                  </label>
                  <div className="flex gap-4">
                    {formData.featuredImage && (
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                        <Image
                          src={getMediaUrl(formData.featuredImage)}
                          alt="Featured"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMediaPickerMode("featured");
                        setShowMediaPicker(true);
                      }}
                      className="flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 hover:border-orange-500"
                    >
                      <Upload className="h-5 w-5" />
                      Chọn ảnh
                    </button>
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Album ảnh (Tối đa 20 ảnh)
                  </label>
                  <div className="grid grid-cols-4 gap-4 md:grid-cols-6">
                    {formData.gallery.map((imageId) => (
                      <div
                        key={imageId}
                        className="group relative aspect-square overflow-hidden rounded-lg border"
                      >
                        <Image
                          src={getMediaUrl(imageId)}
                          alt="Gallery"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(imageId)}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {formData.gallery.length < 20 && (
                      <button
                        type="button"
                        onClick={() => {
                          setMediaPickerMode("gallery");
                          setShowMediaPicker(true);
                        }}
                        className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500"
                      >
                        <ImagePlus className="h-8 w-8 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Mô tả ngắn
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    placeholder="Mô tả về hành trình..."
                  />
                </div>

                {/* Settings */}
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Trạng thái
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    >
                      <option value="published">Đã xuất bản</option>
                      <option value="draft">Nháp</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Thứ tự
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-end">
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
                      <span className="text-sm font-medium">Nổi bật</span>
                    </label>
                  </div>
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
              <h3 className="text-xl font-bold">Chọn ảnh từ Media</h3>
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
                Upload ảnh mới{" "}
                {mediaPickerMode === "gallery" && "(Chọn nhiều ảnh)"}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple={mediaPickerMode === "gallery"}
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length === 0) return;

                  if (mediaPickerMode === "featured") {
                    // Featured image: chỉ upload 1 ảnh
                    const mediaId = await handleFileUpload(files[0]);
                    if (mediaId) {
                      setFormData({ ...formData, featuredImage: mediaId });
                      setShowMediaPicker(false);
                    }
                  } else {
                    // Gallery: upload nhiều ảnh
                    const uploadedIds: string[] = [];
                    for (const file of files) {
                      const mediaId = await handleFileUpload(file);
                      if (mediaId) {
                        uploadedIds.push(mediaId);
                      }
                    }
                    if (uploadedIds.length > 0) {
                      setFormData({
                        ...formData,
                        gallery: [...formData.gallery, ...uploadedIds],
                      });
                    }
                  }

                  // Reset input
                  e.target.value = "";
                }}
                disabled={uploadingImage}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-600 hover:file:bg-orange-100 disabled:opacity-50"
              />
              {uploadingImage && (
                <div className="mt-2 flex items-center gap-2 text-sm text-orange-600">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
                  Đang upload...
                </div>
              )}
              {mediaPickerMode === "gallery" && (
                <p className="mt-2 text-xs text-gray-500">
                  💡 Tip: Giữ Ctrl (Windows) hoặc Cmd (Mac) để chọn nhiều ảnh
                  cùng lúc
                </p>
              )}
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 md:grid-cols-4">
              {mediaFiles.map((media) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => selectMedia(media.id)}
                  className="group relative aspect-square overflow-hidden rounded-lg border hover:border-orange-500"
                >
                  <Image
                    src={media.url}
                    alt={media.alt || "Media"}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </button>
              ))}
            </div>

            {mediaFiles.length === 0 && !uploadingImage && (
              <div className="p-6 text-center text-gray-500">
                Chưa có ảnh nào. Upload ảnh đầu tiên!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
