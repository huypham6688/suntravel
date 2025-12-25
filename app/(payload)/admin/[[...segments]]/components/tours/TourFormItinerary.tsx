import { Tour } from "./types";
import { Calendar, Trash2 } from "lucide-react";

interface TourFormItineraryProps {
  formData: Partial<Tour>;
  addItem: (field: keyof Tour, template: any) => void;
  removeItem: (field: keyof Tour, index: number) => void;
  updateItem: (field: keyof Tour, index: number, value: any) => void;
}

export default function TourFormItinerary({
  formData,
  addItem,
  removeItem,
  updateItem,
}: TourFormItineraryProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 flex gap-2 items-center">
          <Calendar size={20} className="text-blue-500" /> Lịch trình
        </h3>
        <button
          type="button"
          onClick={() =>
            addItem("itinerary", {
              day: (formData.itinerary?.length || 0) + 1,
              title: "",
              description: "",
            })
          }
          className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100"
        >
          + Thêm ngày
        </button>
      </div>
      <div className="space-y-6 border-l-2 border-gray-100 pl-4 ml-2">
        {formData.itinerary?.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[23px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white ring-1 ring-blue-100"></div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-blue-600 uppercase bg-blue-100 px-2 py-0.5 rounded">
                  Ngày {item.day}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem("itinerary", index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                type="text"
                required
                value={item.title}
                onChange={(e) =>
                  updateItem("itinerary", index, {
                    ...item,
                    title: e.target.value,
                  })
                }
                className="w-full font-bold bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none pb-1 mb-2 placeholder-gray-400 invalid:border-red-500 invalid:text-red-600 text-base"
                placeholder="Tiêu đề (Bắt buộc)..."
              />
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateItem("itinerary", index, {
                    ...item,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full text-sm bg-white border border-gray-200 rounded p-2 outline-none focus:border-blue-500"
                placeholder="Mô tả..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
