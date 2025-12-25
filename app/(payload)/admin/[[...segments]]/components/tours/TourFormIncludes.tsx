import { Tour } from "./types";
import { CheckCircle, XCircle, X } from "lucide-react";

interface TourFormIncludesProps {
  formData: Partial<Tour>;
  addItem: (field: keyof Tour, template: any) => void;
  removeItem: (field: keyof Tour, index: number) => void;
  updateItem: (field: keyof Tour, index: number, value: any) => void;
}

export default function TourFormIncludes({
  formData,
  addItem,
  removeItem,
  updateItem,
}: TourFormIncludesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between mb-4">
          <h4 className="font-semibold text-green-700 flex gap-2 items-center">
            <CheckCircle size={18} /> Bao gồm
          </h4>
          <button
            type="button"
            onClick={() => addItem("includes", { item: "" })}
            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
          >
            + Thêm
          </button>
        </div>
        <div className="space-y-2">
          {formData.includes?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.item}
                onChange={(e) =>
                  updateItem("includes", index, { item: e.target.value })
                }
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded outline-none focus:border-green-500"
                placeholder="Bao gồm..."
              />
              <button
                type="button"
                onClick={() => removeItem("includes", index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between mb-4">
          <h4 className="font-semibold text-red-700 flex gap-2 items-center">
            <XCircle size={18} /> Không bao gồm
          </h4>
          <button
            type="button"
            onClick={() => addItem("excludes", { item: "" })}
            className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded"
          >
            + Thêm
          </button>
        </div>
        <div className="space-y-2">
          {formData.excludes?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.item}
                onChange={(e) =>
                  updateItem("excludes", index, { item: e.target.value })
                }
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded outline-none focus:border-red-500"
                placeholder="Không bao gồm..."
              />
              <button
                type="button"
                onClick={() => removeItem("excludes", index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
