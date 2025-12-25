import { Tour } from "./types";
import { Search, Plus, Globe, Clock, Star, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface TourListProps {
  tours: Tour[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  onEdit: (tour: Tour) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export default function TourList({
  tours,
  loading,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  onEdit,
  onDelete,
  onCreateNew,
}: TourListProps) {
  // Filter tours based on search term
  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <span>Quản lý Tours</span>
            </h2>
            <button
              onClick={onCreateNew}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              <Plus size={18} /> Thêm Tour Mới
            </button>
          </div>

          {/* Search & Tabs */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            {/* Scrollable Tabs for Mobile */}
            <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto no-scrollbar whitespace-nowrap">
              {[
                { id: "", label: "Tất cả" },
                { id: "trong-nuoc", label: "Trong nước" },
                { id: "nuoc-ngoai", label: "Nước ngoài" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    filterCategory === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">Không tìm thấy tour nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Mobile Horizontal Scroll */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-[900px] w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Thông tin
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Vị trí
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Giá & Loại
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                      Đánh giá
                    </th>
                    {/* Sticky Action Column */}
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase sticky right-0 bg-gray-50 z-10 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)]">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTours.map((tour) => (
                    <tr
                      key={tour.id}
                      className="hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border flex-shrink-0">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 line-clamp-1">
                              {tour.title}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Clock size={12} /> {tour.duration}
                            </div>
                            {tour.badge && (
                              <span className="text-xs text-blue-600 bg-blue-50 px-1 rounded mt-1 inline-block">
                                {tour.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">
                          {tour.location}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tour.region}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-blue-600">
                          {tour.price.toLocaleString()}đ
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${tour.category === "trong-nuoc" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}
                        >
                          {tour.category === "trong-nuoc"
                            ? "Trong nước"
                            : "Nước ngoài"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Star
                            size={14}
                            className="text-yellow-400 fill-yellow-400"
                          />
                          {tour.rating}{" "}
                          <span className="text-gray-400">
                            ({tour.reviews})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right sticky right-0 bg-white z-10 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/50">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onEdit(tour)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => onDelete(tour.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
