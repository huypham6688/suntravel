"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Edit2, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  title: string;
  slug: string;
}

interface TourismItem {
  id?: string;
  title: string;
  sort_des: string;
  thumbnail: string;
  region: "trong-nuoc" | "nuoc-ngoai";
  category: any;
  hash_tags: { tag: string }[];
  content: any;
}

type View = "list" | "form";

export default function ServiceTourismManager() {
  const [view, setView] = useState<View>("list");
  const [items, setItems] = useState<TourismItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // State cho bộ lọc
  const [filterRegion, setFilterRegion] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editorHtml, setEditorHtml] = useState("");
  const [formData, setFormData] = useState<TourismItem>({
    title: "",
    sort_des: "",
    thumbnail: "",
    region: "trong-nuoc",
    category: "",
    hash_tags: [{ tag: "" }],
    content: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (view === "list") fetchTourism();
  }, [view, filterRegion, filterCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) setCategories(data.docs);
    } catch (e) {
      console.error("Lỗi lấy danh mục", e);
    }
  };

  const fetchTourism = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterRegion) params.append("region", filterRegion);
      if (filterCategory) params.append("category", filterCategory);
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/info-tourism?${params.toString()}`);
      const data = await response.json();
      console.log(data);
      if (data.success) setItems(data.docs);
    } catch (error) {
      console.error("Lỗi fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      sort_des: "",
      thumbnail: "",
      region: "trong-nuoc",
      category: categories[0]?.id || "",
      hash_tags: [{ tag: "" }],
      content: null,
    });
    setEditorHtml("");
  };

  const handleEdit = (item: TourismItem) => {
    setFormData({
      id: item.id,
      title: item.title,
      sort_des: item.sort_des,
      thumbnail: item.thumbnail,
      region: item.region,
      category:
        typeof item.category === "object" ? item.category.id : item.category,
      hash_tags: item.hash_tags?.length > 0 ? item.hash_tags : [{ tag: "" }],
      content: item.content,
    });
    setEditorHtml(item.content || "");
    setView("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isUpdate = !!formData.id;
    const method = isUpdate ? "PATCH" : "POST";

    try {
      const response = await fetch("/api/info-tourism", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, content: editorHtml }),
      });

      if (response.ok) {
        toast.success("Thành công!");
        setView("list");
        resetForm();
      } else {
        const err = await response.json();
        toast.error(`Lỗi: ${err.error}`);
      }
    } catch (error) {
      toast.error("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...formData.hash_tags];
    newTags[index].tag = value;
    setFormData({ ...formData, hash_tags: newTags });
  };

  const handleDelete = async (id: string) => {
    toast("Bạn có chắc chắn muốn xóa bài viết này?", {
      action: {
        label: "Xóa",
        onClick: async () => {
          try {
            const response = await fetch(`/api/info-tourism?id=${id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              toast.success("Xóa thành công!");
              fetchTourism();
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
      duration: 5000,
    });
  };

  if (view === "list") {
    return (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Quản Lý Dịch Vụ Du Lịch
            </h1>
            <button
              onClick={() => {
                resetForm();
                setView("form");
              }}
              className="w-full md:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
            >
              + Thêm bài viết mới
            </button>
          </div>

          {/* BỘ LỌC KÉP */}
          <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-500 w-full md:w-auto">
                Vùng:
              </span>
              {["", "trong-nuoc", "nuoc-ngoai"].map((v) => (
                <button
                  key={v}
                  onClick={() => setFilterRegion(v)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${filterRegion === v ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {v === ""
                    ? "Tất cả"
                    : v === "trong-nuoc"
                      ? "Trong nước"
                      : "Nước ngoài"}
                </button>
              ))}
            </div>
            <div className="hidden md:block h-6 w-px bg-gray-200 mx-2" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-500 w-full md:w-auto">
                Chủ đề:
              </span>
              <button
                onClick={() => setFilterCategory("")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${filterCategory === "" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                Tất cả
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.slug)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${filterCategory === c.slug ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <div className="hidden md:block h-6 w-px bg-gray-200 mx-2" />

            <div className="flex items-center gap-2 flex-1">
              <div className="relative w-full">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* BẢNG DANH SÁCH (DESKTOP) */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Bài viết
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Phân loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase whitespace-nowrap">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-10 text-center italic text-gray-400"
                    >
                      Đang tải...
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail}
                            className="w-12 h-12 object-cover rounded-md shrink-0 bg-gray-100"
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-bold truncate pr-4">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-400 line-clamp-1">
                              {item.sort_des}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                            {item.region === "trong-nuoc"
                              ? "Trong nước"
                              : "Nước ngoài"}
                          </span>
                          <span className="text-xs text-gray-600 font-medium">
                            #{item.category?.title || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {item.hash_tags?.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500"
                            >
                              #{t.tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
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

          {/* DANH SÁCH MOBILE (CARD VIEW) */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="text-center p-8 text-gray-400 italic">
                Đang tải...
              </div>
            ) : items.length === 0 ? (
              <div className="text-center p-8 text-gray-400">
                Không có bài viết nào
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.thumbnail}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter bg-blue-50 px-1.5 py-0.5 rounded">
                          {item.region === "trong-nuoc"
                            ? "Trong nước"
                            : "Nước ngoài"}
                        </span>
                        <span className="text-[10px] text-gray-600 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                          #{item.category?.title || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-3 mb-3 line-clamp-2">
                    {item.sort_des}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.hash_tags?.slice(0, 5).map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-gray-50 px-1.5 py-0.5 rounded text-gray-400 border border-gray-100"
                      >
                        #{t.tag}
                      </span>
                    ))}
                    {item.hash_tags?.length > 5 && (
                      <span className="text-[10px] text-gray-400 pl-1">
                        ...
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                    >
                      Xóa bài
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
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="">
        <button onClick={() => setView("list")} className="mb-4 text-gray-500">
          ← Quay lại danh sách
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-8 space-y-6"
        >
          <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
            {formData.id ? "Chỉnh Sửa" : "Tạo Mới"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Tiêu đề
              </label>
              <input
                type="text"
                required
                className="w-full border p-3 rounded-xl outline-none"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Phạm vi vùng
              </label>
              <select
                className="w-full border p-3 rounded-xl outline-none"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value as any })
                }
              >
                <option value="trong-nuoc">Trong nước</option>
                <option value="nuoc-ngoai">Nước ngoài</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Thumbnail URL
              </label>
              <input
                type="text"
                required
                className="w-full border p-3 rounded-xl outline-none"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Chủ đề bài viết (Review, Mẹo...)
              </label>
              <select
                required
                className="w-full border p-3 rounded-xl outline-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">-- Chọn chủ đề --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Mô tả ngắn
            </label>
            <textarea
              required
              rows={2}
              className="w-full border p-3 rounded-xl outline-none"
              value={formData.sort_des}
              onChange={(e) =>
                setFormData({ ...formData, sort_des: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Nội dung chi tiết
            </label>
            <Editor
              apiKey="yfyaqykybcjkbmpwvjz3hutd6okw7ahoyg4aj0iohkoiivzi"
              value={editorHtml}
              onEditorChange={(content) => setEditorHtml(content)}
              init={{
                height: 400,
                menubar: false,
                plugins: ["link", "image", "lists", "table", "code"],
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
                branding: false,
              }}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Hashtags
              </label>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    hash_tags: [...formData.hash_tags, { tag: "" }],
                  })
                }
                className="text-blue-600 text-xs font-bold"
              >
                + Thêm Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.hash_tags.map((tag, index) => (
                <input
                  key={index}
                  type="text"
                  className="border p-2 rounded-lg text-sm w-32"
                  value={tag.tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="Tag..."
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "ĐANG XỬ LÝ..." : formData.id ? "CẬP NHẬT" : "ĐĂNG BÀI"}
          </button>
        </form>
      </div>
    </div>
  );
}
