"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Globe,
  Save,
  Flag,
  Settings,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Package {
  id?: string;
  title: string;
  subtitle?: string;
  price: string;
  type?: "tourist" | "business" | "relative";
  requirements?: { text: string }[];
  includes?: { text: string }[];
}

interface Country {
  id: string;
  name: string;
  code: string;
  slug: string;
  region: string;
  packages?: Package[];
}

const regions = [
  { label: "Châu Á", value: "asia" },
  { label: "Châu Âu", value: "europe" },
  { label: "Châu Mỹ", value: "americas" },
  { label: "Châu Úc", value: "oceania" },
];

const packageTypes = [
  { label: "Du lịch", value: "tourist" },
  { label: "Thương mại", value: "business" },
  { label: "Thăm thân", value: "relative" },
];

export default function CountriesManager() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Country Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [formData, setFormData] = useState<Partial<Country>>({
    name: "",
    code: "",
    slug: "",
    region: "asia",
  });

  // Package Modal State
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [activeCountryForPackages, setActiveCountryForPackages] =
    useState<Country | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [editingPackageIndex, setEditingPackageIndex] = useState<number | null>(
    null,
  ); // null means adding new
  const [packageFormData, setPackageFormData] = useState<Package>({
    title: "",
    subtitle: "",
    price: "",
    type: "tourist",
    requirements: [],
    includes: [],
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("/api/countries?limit=100");
      const data = await response.json();
      if (data.docs) {
        setCountries(data.docs);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCountry(null);
    setFormData({
      name: "",
      code: "",
      slug: "",
      region: "asia",
    });
    setShowModal(true);
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
    setFormData({
      name: country.name,
      code: country.code,
      slug: country.slug,
      region: country.region,
    });
    setShowModal(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCountry
        ? `/api/countries/${editingCountry.id}`
        : "/api/countries";
      const method = editingCountry ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Failed to parse JSON response:", err);
        const text = await response.text().catch(() => "Unknown error");
        toast.error(
          `Lỗi hệ thống (${response.status}): ${text.substring(0, 100)}...`,
        );
        return;
      }

      if (response.ok) {
        toast.success(
          editingCountry ? "Cập nhật thành công!" : "Thêm mới thành công!",
        );
        setShowModal(false);
        fetchCountries();
      } else {
        console.error("API Error Response:", data);
        const errorMessage =
          data.errors?.[0]?.message ||
          data.error ||
          "Có lỗi xảy ra khi lưu dữ liệu";
        toast.error(`Lỗi: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Có lỗi xảy ra khi gọi API. Vui lòng kiểm tra console.");
    }
  };

  const handleDelete = (id: string) => {
    toast("Bạn có chắc chắn muốn xóa quốc gia này?", {
      action: {
        label: "Xóa",
        onClick: async () => {
          try {
            const response = await fetch(`/api/countries/${id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              toast.success("Xóa thành công!");
              fetchCountries();
            } else {
              toast.error("Có lỗi xảy ra khi xóa");
            }
          } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Có lỗi xảy ra khi xóa");
          }
        },
      },
      cancel: {
        label: "Hủy",
        onClick: () => {},
      },
    });
  };

  // --- Package Management Logic ---

  const handleOpenPackages = async (country: Country) => {
    setActiveCountryForPackages(country);
    // Fetch fresh data for this country to make sure we have latest packages
    try {
      const res = await fetch(`/api/countries/${country.id}`);
      const data = await res.json();
      if (data && data.packages) {
        setPackages(data.packages);
      } else {
        setPackages([]);
      }
    } catch (e) {
      console.error("Error fetching country details", e);
      setPackages([]);
    }

    // Reset form
    setEditingPackageIndex(null);
    setPackageFormData({
      title: "",
      subtitle: "",
      price: "",
      type: "tourist",
      requirements: [],
      includes: [],
    });

    setShowPackageModal(true);
  };

  const handleEditPackage = (index: number) => {
    setEditingPackageIndex(index);
    setPackageFormData({ ...packages[index] });
  };

  const handleDeletePackage = (index: number) => {
    toast("Xóa gói này khỏi danh sách?", {
      action: {
        label: "Xóa",
        onClick: () => {
          const newPackages = [...packages];
          newPackages.splice(index, 1);
          setPackages(newPackages);
          toast.success("Đã xóa gói khỏi danh sách (chưa lưu)");
        },
      },
      cancel: {
        label: "Hủy",
        onClick: () => {},
      },
    });
  };

  const handleSavePackage = () => {
    if (!packageFormData.title || !packageFormData.price) {
      toast.error("Vui lòng nhập tên gói và giá");
      return;
    }

    const newPackages = [...packages];
    if (editingPackageIndex !== null) {
      newPackages[editingPackageIndex] = packageFormData;
    } else {
      newPackages.push(packageFormData);
    }
    setPackages(newPackages);

    // Reset form but keep modal open to allow adding more or saving details
    setEditingPackageIndex(null);
    setPackageFormData({
      title: "",
      subtitle: "",
      price: "",
      type: "tourist",
      requirements: [],
      includes: [],
    });
    toast.success("Đã thêm/cập nhật gói vào danh sách");
  };

  const handleSaveAllPackages = async () => {
    if (!activeCountryForPackages) return;
    try {
      const response = await fetch(
        `/api/countries/${activeCountryForPackages.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packages: packages,
          }),
        },
      );

      if (response.ok) {
        toast.success("Đã lưu danh sách gói thành công!");
        setShowPackageModal(false);
        fetchCountries(); // Refresh list
      } else {
        toast.error("Lỗi khi lưu gói dịch vụ");
      }
    } catch (e) {
      console.error(e);
      toast.error("Lỗi kết nối");
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <h2 className="text-2xl font-bold">Quản lý Visa (Quốc gia)</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Thêm quốc gia
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên nước..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCountries.map((country) => (
          <div
            key={country.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-blue-200"
          >
            {/* Top Section: Flag & Name */}
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-9 rounded overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 relative bg-gray-50">
                  <img
                    src={`https://flagcdn.com/w80/${country.code}.png`}
                    alt={country.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">
                    {country.name}
                  </h3>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <span className="uppercase text-[10px] font-semibold tracking-wider bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                      {country.code}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Meta Info */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                <Globe size={14} className="text-blue-500" />
                <span className="truncate">/{country.slug}</span>
              </div>
            </div>

            {/* Footer: Actions */}
            <div className="mt-auto border-t border-gray-100 p-3 flex items-center gap-2">
              <button
                onClick={() => handleOpenPackages(country)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                <Settings className="h-4 w-4" />
                Cấu hình
              </button>

              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(country)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Sửa thông tin cơ bản"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(country.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Xóa quốc gia"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Country Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {editingCountry ? "Cập nhật" : "Thêm mới"} Quốc gia
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tên quốc gia *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: !editingCountry
                        ? generateSlug(name)
                        : formData.slug,
                    });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="VD: Nhật Bản"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Mã quốc gia (Icon) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toLowerCase(),
                      })
                    }
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="VD: jp, vn, us"
                  />
                  {formData.code && (
                    <div className="w-10 h-10 flex items-center justify-center rounded border bg-gray-50">
                      <span className={`fi fi-${formData.code} text-2xl`} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Sử dụng mã ISO 2 ký tự (vd: vn, jp, kr)
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Khu vực
                </label>
                <select
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                >
                  {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                  <Save className="h-5 w-5" />
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Management Modal */}
      {showPackageModal && activeCountryForPackages && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold">Cấu hình Packages</h3>
                <p className="text-sm text-gray-500">
                  Quốc gia: {activeCountryForPackages.name}
                </p>
              </div>
              <button
                onClick={() => setShowPackageModal(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* List Column */}
              <div className="w-1/3 border-r overflow-y-auto bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-700">Danh sách gói</h4>
                  <button
                    onClick={() => {
                      setEditingPackageIndex(null);
                      setPackageFormData({
                        title: "",
                        subtitle: "",
                        price: "",
                        type: "tourist",
                        requirements: [],
                        includes: [],
                      });
                    }}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    + Thêm mới
                  </button>
                </div>

                <div className="space-y-2">
                  {packages.length === 0 && (
                    <p className="text-sm text-gray-400 italic text-center py-4">
                      Chưa có gói nào
                    </p>
                  )}
                  {packages.map((pkg, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleEditPackage(idx)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${editingPackageIndex === idx ? "border-blue-500 bg-white shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">
                            {pkg.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pkg.price}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePackage(idx);
                          }}
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Column */}
              <div className="w-2/3 overflow-y-auto p-6">
                <h4 className="font-bold text-gray-800 mb-4">
                  {editingPackageIndex !== null
                    ? "Chỉnh sửa gói"
                    : "Thêm gói mới"}
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tên gói *
                      </label>
                      <input
                        type="text"
                        value={packageFormData.title}
                        onChange={(e) =>
                          setPackageFormData({
                            ...packageFormData,
                            title: e.target.value,
                          })
                        }
                        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="VD: VISA DU LỊCH"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Giá *
                      </label>
                      <input
                        type="text"
                        value={packageFormData.price}
                        onChange={(e) =>
                          setPackageFormData({
                            ...packageFormData,
                            price: e.target.value,
                          })
                        }
                        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="VD: 3.000.000đ"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={packageFormData.subtitle || ""}
                        onChange={(e) =>
                          setPackageFormData({
                            ...packageFormData,
                            subtitle: e.target.value,
                          })
                        }
                        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="VD: Từ Hà Nội"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Loại Visa
                      </label>
                      <select
                        value={packageFormData.type}
                        onChange={(e) =>
                          setPackageFormData({
                            ...packageFormData,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {packageTypes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Hồ sơ yêu cầu
                    </label>
                    <textarea
                      rows={4}
                      value={
                        packageFormData.requirements
                          ?.map((r) => r.text)
                          .join("\n") || ""
                      }
                      onChange={(e) => {
                        const lines = e.target.value.split("\n");
                        setPackageFormData({
                          ...packageFormData,
                          requirements: lines.map((line) => ({ text: line })),
                        });
                      }}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                      placeholder="Nhập mỗi yêu cầu một dòng..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mỗi dòng là một mục trong danh sách
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Dịch vụ bao gồm
                    </label>
                    <textarea
                      rows={3}
                      value={
                        packageFormData.includes
                          ?.map((r) => r.text)
                          .join("\n") || ""
                      }
                      onChange={(e) => {
                        const lines = e.target.value.split("\n");
                        setPackageFormData({
                          ...packageFormData,
                          includes: lines.map((line) => ({ text: line })),
                        });
                      }}
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                      placeholder="Nhập mỗi dịch vụ một dòng..."
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleSavePackage}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-sm font-medium transition-colors"
                    >
                      {editingPackageIndex !== null
                        ? "Cập nhật gói"
                        : "Thêm vào danh sách"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Tổng cộng: {packages.length} gói
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 text-sm font-medium"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSaveAllPackages}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
                >
                  <Save size={16} /> Lưu toàn bộ thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
