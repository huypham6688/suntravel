import { Tour } from "./types";
import { ArrowLeft, Save } from "lucide-react";
import TourFormBasicInfo from "./TourFormBasicInfo";
import TourFormImages from "./TourFormImages";
import TourFormItinerary from "./TourFormItinerary";
import TourFormIncludes from "./TourFormIncludes";
import TourFormSettings from "./TourFormSettings";

interface TourFormProps {
  formData: Partial<Tour>;
  setFormData: (data: Partial<Tour>) => void;
  editingTour: Tour | null;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  addItem: (field: keyof Tour, template: any) => void;
  removeItem: (field: keyof Tour, index: number) => void;
  updateItem: (field: keyof Tour, index: number, value: any) => void;
}

export default function TourForm({
  formData,
  setFormData,
  editingTour,
  loading,
  onCancel,
  onSubmit,
  addItem,
  removeItem,
  updateItem,
}: TourFormProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 flex-shrink-0"
            >
              <ArrowLeft size={22} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {editingTour ? `Sửa: ${editingTour.title}` : "Tạo Tour Mới"}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="hidden sm:block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Hủy
            </button>
            <button
              onClick={onSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm font-medium whitespace-nowrap disabled:opacity-70"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
              ) : (
                <Save size={18} />
              )}
              <span className="hidden sm:inline">Lưu Thay Đổi</span>
              <span className="sm:hidden">Lưu</span>
            </button>
          </div>
        </div>
      </div>

      <form className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* --- LEFT COLUMN: MAIN CONTENT --- */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <TourFormBasicInfo formData={formData} setFormData={setFormData} />
          <TourFormImages
            formData={formData}
            setFormData={setFormData}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
          <TourFormItinerary
            formData={formData}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
          <TourFormIncludes
            formData={formData}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        </div>

        {/* --- RIGHT COLUMN: SETTINGS (STICKY ON DESKTOP) --- */}
        <div className="lg:col-span-1">
          {/* Added a wrapper div for column flow although sticky might be inside components or handled by CSS if needed, 
                         but here just wrapper as per previous code structure */}
          <TourFormSettings
            formData={formData}
            setFormData={setFormData}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        </div>
      </form>
    </div>
  );
}
