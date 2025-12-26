"use client";

import React, { useState, useEffect } from "react";
import { Tag, Edit2, Trash2, ArrowLeft, Plus, Save } from "lucide-react";
import { toast } from "sonner";

interface CategoryItem {
  id?: string;
  title: string;
  slug: string;
}

type View = "list" | "form";

export default function CategoryManager() {
  const [view, setView] = useState<View>("list");
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CategoryItem>({
    title: "",
    slug: "",
  });

  useEffect(() => {
    if (view === "list") fetchCategories();
  }, [view]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success) setItems(data.docs);
    } catch (error) {
      console.error("Lỗi fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tự động tạo slug từ tiêu đề (Tiện ích thêm)
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData({ ...formData, title, slug });
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "" });
  };

  const handleEdit = (item: CategoryItem) => {
    setFormData({
      id: item.id,
      title: item.title,
      slug: item.slug,
    });
    setView("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isUpdate = !!formData.id;
    const method = isUpdate ? "PATCH" : "POST";

    try {
      const response = await fetch("/api/categories", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          isUpdate ? "Cập nhật thành công!" : "Tạo danh mục thành công!"
        );
        setView("list");
        resetForm();
      } else {
        const err = await response.json();
        toast.error(`Lỗi: ${err.error}`);
      }
    } catch (error) {
      toast.error("Lỗi kết nối API");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    toast(
      "Xóa danh mục này có thể ảnh hưởng đến các bài viết đang thuộc danh mục này. Bạn chắc chắn chứ?",
      {
        action: {
          label: "Xóa",
          onClick: async () => {
            try {
              const response = await fetch(`/api/categories?id=${id}`, {
                method: "DELETE",
              });

              if (response.ok) {
                toast.success("Xóa thành công!");
                fetchCategories();
              } else {
                toast.error("Xóa thất bại");
              }
            } catch (error) {
              console.error("Lỗi xóa:", error);
            }
          },
        },
        cancel: {
          label: "Hủy",
          onClick: () => {},
        },
        duration: 8000,
      }
    );
  };

  if (view === "list") {
    return (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quản Lý Danh Mục
              </h1>
              <p className="text-sm text-gray-500">
                Phân loại cho bài viết du lịch (Review, Cẩm nang...)
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setView("form");
              }}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-lg"
            >
              <Plus size={18} /> Thêm danh mục
            </button>
          </div>

          {/* TABLE VIEW (DESKTOP) */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-400 italic"
                    >
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      Chưa có danh mục nào.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Tag size={16} />
                          </div>
                          <span className="font-bold text-gray-800">
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                        /{item.slug}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id!)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* CARD VIEW (MOBILE) */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="text-center p-8 text-gray-400 italic">
                Đang tải...
              </div>
            ) : items.length === 0 ? (
              <div className="text-center p-8 text-gray-400">
                Chưa có danh mục nào.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <Tag size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">
                          /{item.slug}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setView("list")}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-gray-100"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {formData.id ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
            </h2>
            <p className="text-sm text-gray-500">
              Thông tin này sẽ xuất hiện ở bộ lọc bài viết
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Tên danh mục
              </label>
              <input
                type="text"
                required
                placeholder="VD: Review du lịch"
                className="w-full border-gray-200 border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.title}
                onChange={(e) => generateSlug(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Slug (Đường dẫn)
              </label>
              <input
                type="text"
                required
                placeholder="vd: review-du-lich"
                className="w-full border-gray-200 border p-4 rounded-2xl outline-none bg-gray-50 text-gray-500"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {loading
                  ? "ĐANG LƯU..."
                  : formData.id
                    ? "CẬP NHẬT THAY ĐỔI"
                    : "XÁC NHẬN TẠO MỚI"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
