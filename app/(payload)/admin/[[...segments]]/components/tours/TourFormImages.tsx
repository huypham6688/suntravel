import { Tour } from "./types";
import { Image as ImageIcon, X, CheckCircle } from "lucide-react";

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
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex gap-2 items-center">
        <ImageIcon size={20} className="text-blue-500" /> Hình ảnh & Điểm nổi
        bật
      </h3>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          URL Ảnh chính <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-100 rounded border overflow-hidden flex-shrink-0">
            {formData.image ? (
              <img
                src={formData.image}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="text"
            required
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 h-11"
            placeholder="https://example.com/image.jpg"
          />
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
            className="text-xs text-blue-600 font-medium"
          >
            + Thêm ảnh
          </button>
        </div>
        <div className="space-y-2">
          {formData.gallery?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.url}
                onChange={(e) =>
                  updateItem("gallery", index, { url: e.target.value })
                }
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                placeholder="URL ảnh..."
              />
              <button
                type="button"
                onClick={() => removeItem("gallery", index)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
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
