"use client";

import { Tour } from "./types";
import { Image as ImageIcon, X, CheckCircle, Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TourFormImagesProps {
  formData: Partial<Tour>;
  setFormData: (data: Partial<Tour>) => void;
  addItem: (field: keyof Tour, template: any) => void;
  removeItem: (field: keyof Tour, index: number) => void;
  updateItem: (field: keyof Tour, index: number, value: any) => void;
}

export default function TourFormImages({
  formData,
  setFormData,
  addItem,
  removeItem,
  updateItem,
}: TourFormImagesProps) {
  const [uploadingMainImage, setUploadingMainImage] = useState(false);
  const [uploadingGalleryIndex, setUploadingGalleryIndex] = useState<number | null>(null);

  const handleFileUpload = async (file: File, type: "main" | "gallery", galleryIndex?: number) => {
    if (type === "main") {
      setUploadingMainImage(true);
    } else if (galleryIndex !== undefined) {
      setUploadingGalleryIndex(galleryIndex);
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      const response = await fetch("/api/upload-cloudinary", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        let errorMessage = `Failed to upload image: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error("Upload error details:", errorData.details);
          }
        } catch {
          const errorText = await response.text();
          console.error("Upload error response:", errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid upload response format");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Upload failed");
      }

      if (!data.doc) {
        throw new Error("Invalid upload response structure - missing doc");
      }

      // Get image URL from response
      const imageUrl = data.doc.cloudinaryUrl || data.doc.url;
      
      if (!imageUrl) {
        throw new Error("No image URL returned from upload");
      }
      
      if (type === "main") {
        setFormData({ ...formData, image: imageUrl });
        toast.success("Upload ảnh chính thành công!");
      } else if (galleryIndex !== undefined) {
        updateItem("gallery", galleryIndex, { url: imageUrl });
        toast.success("Upload ảnh gallery thành công!");
      }
      return imageUrl;
    } catch (error) {
      console.error("Error uploading:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Có lỗi khi upload ${type === "main" ? "ảnh chính" : "ảnh gallery"}: ${errorMessage}`);
      return null;
    } finally {
      if (type === "main") {
        setUploadingMainImage(false);
      } else if (galleryIndex !== undefined) {
        setUploadingGalleryIndex(null);
      }
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex gap-2 items-center">
        <ImageIcon size={20} className="text-blue-500" /> Hình ảnh & Điểm nổi
        bật
      </h3>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Ảnh chính <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-100 rounded border overflow-hidden flex-shrink-0 relative">
            {formData.image ? (
              <img
                src={formData.image}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={32} />
              </div>
            )}
            {uploadingMainImage && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 h-11"
                placeholder="https://example.com/image.jpg hoặc upload ảnh"
              />
              <label className={`px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer h-11 flex items-center gap-2 text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${uploadingMainImage ? "opacity-70" : ""}`}>
                {uploadingMainImage ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                <span className="hidden sm:inline">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    // Reset input immediately
                    e.target.value = "";
                    
                    // Validate file size
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("Kích thước file không được vượt quá 5MB!");
                      return;
                    }
                    
                    // Validate file type
                    if (!file.type.startsWith("image/")) {
                      toast.error("Vui lòng chọn file hình ảnh!");
                      return;
                    }
                    
                    // Upload file
                    await handleFileUpload(file, "main");
                  }}
                  disabled={uploadingMainImage}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Upload ảnh hoặc nhập URL. Kích thước khuyến nghị: 800x600px
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 items-center">
          <label className="text-sm font-medium text-gray-700">
            Thư viện ảnh
          </label>
          <button
            type="button"
            onClick={() => addItem("gallery", { url: "" })}
            className="text-xs text-blue-600 font-medium hover:text-blue-700"
          >
            + Thêm ảnh
          </button>
        </div>
        <div className="space-y-3">
          {formData.gallery?.map((item, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="w-20 h-20 bg-gray-100 rounded border overflow-hidden flex-shrink-0 relative">
                {item.url ? (
                  <img
                    src={item.url}
                    className="w-full h-full object-cover"
                    alt={`Gallery ${index + 1}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-gray-400" size={20} />
                  </div>
                )}
                {uploadingGalleryIndex === index && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={item.url || ""}
                  onChange={(e) =>
                    updateItem("gallery", index, { url: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  placeholder="URL ảnh hoặc upload..."
                />
                <label className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm font-medium flex items-center gap-1 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                  {uploadingGalleryIndex === index ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  <span className="hidden sm:inline">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      // Reset input immediately
                      e.target.value = "";
                      
                      // Validate file size
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error("Kích thước file không được vượt quá 5MB!");
                        return;
                      }
                      
                      // Validate file type
                      if (!file.type.startsWith("image/")) {
                        toast.error("Vui lòng chọn file hình ảnh!");
                        return;
                      }
                      
                      // Upload file
                      await handleFileUpload(file, "gallery", index);
                    }}
                    disabled={uploadingGalleryIndex === index}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem("gallery", index)}
                  className="p-2 text-gray-400 hover:text-red-500 flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div>
        <div className="flex justify-between mb-2 items-center">
          <label className="text-sm font-medium text-gray-700">
            Điểm nổi bật
          </label>
          <button
            type="button"
            onClick={() => addItem("highlights", { item: "" })}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium hover:bg-blue-100"
          >
            + Thêm
          </button>
        </div>
        <div className="space-y-2">
          {formData.highlights?.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
              <input
                type="text"
                value={item.item}
                onChange={(e) =>
                  updateItem("highlights", index, { item: e.target.value })
                }
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                placeholder="Điểm nổi bật..."
              />
              <button
                type="button"
                onClick={() => removeItem("highlights", index)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
