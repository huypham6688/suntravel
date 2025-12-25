import { Tour } from "./types";
import { List, MapPin, Clock } from "lucide-react";

interface TourFormBasicInfoProps {
  formData: Partial<Tour>;
  setFormData: (data: Partial<Tour>) => void;
}

export default function TourFormBasicInfo({
  formData,
  setFormData,
}: TourFormBasicInfoProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex gap-2 items-center">
        <List size={20} className="text-blue-500" /> Thông tin cơ bản
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">
            Tên Tour <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">
            Mô tả chi tiết <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Điểm xuất phát <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Thời gian <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Clock
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                placeholder="VD: 4 ngày 3 đêm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
