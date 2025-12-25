import { Tour } from "./types";
import { DollarSign, Users, Star, X } from "lucide-react";

interface TourFormSettingsProps {
  formData: Partial<Tour>;
  setFormData: (data: Partial<Tour>) => void;
  addItem: (field: keyof Tour, template: any) => void;
  removeItem: (field: keyof Tour, index: number) => void;
  updateItem: (field: keyof Tour, index: number, value: any) => void;
}

export default function TourFormSettings({
  formData,
  setFormData,
  addItem,
  removeItem,
  updateItem,
}: TourFormSettingsProps) {
  return (
    <div className="space-y-6">
      {/* 5. Price & Config */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex gap-2 items-center">
          <DollarSign size={20} className="text-blue-500" /> Giá & Cấu hình
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2.5 font-bold text-blue-600 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
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
              className="w-full px-4 py-2.5 text-gray-500 line-through border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Badge
            </label>
            <select
              value={formData.badge || ""}
              onChange={(e) =>
                setFormData({ ...formData, badge: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
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
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Danh mục
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="trong-nuoc">Trong nước</option>
              <option value="nuoc-ngoai">Nước ngoài</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Khu vực
            </label>
            <select
              required
              value={formData.region || ""}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              {/* LOGIC DATA SELECT CŨ ĐƯỢC GIỮ NGUYÊN */}
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
        </div>
      </div>

      {/* 6. Meta Stats */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex gap-2 items-center">
          <Users size={20} className="text-blue-500" /> Khác
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Số người tối đa
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
              className="w-24 px-3 py-1.5 text-right border border-gray-300 rounded focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Đánh giá (0-5)
            </label>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <input
                type="number"
                step="0.1"
                max="5"
                min="0"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value),
                  })
                }
                className="w-16 px-2 py-1.5 text-right border border-gray-300 rounded focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Số đánh giá
            </label>
            <input
              type="number"
              value={formData.reviews}
              onChange={(e) =>
                setFormData({ ...formData, reviews: parseInt(e.target.value) })
              }
              className="w-24 px-3 py-1.5 text-right border border-gray-300 rounded focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 7. Departure Dates */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Ngày khởi hành</h3>
          <button
            type="button"
            onClick={() => addItem("departureDate", { date: "" })}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium hover:bg-blue-100"
          >
            + Thêm
          </button>
        </div>
        <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {formData.departureDate?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.date}
                onChange={(e) =>
                  updateItem("departureDate", index, { date: e.target.value })
                }
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-blue-500"
                placeholder="VD: 05/04/2025"
              />
              <button
                type="button"
                onClick={() => removeItem("departureDate", index)}
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
