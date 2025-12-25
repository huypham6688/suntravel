"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

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
   }, [view, filterRegion, filterCategory]);

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

         const response = await fetch(`/api/info-tourism?${params.toString()}`);
         const data = await response.json();
         console.log(data)
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
         category: typeof item.category === "object" ? item.category.id : item.category,
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
            alert("Thành công!");
            setView("list");
            resetForm();
         } else {
            const err = await response.json();
            alert(`Lỗi: ${err.error}`);
         }
      } catch (error) {
         alert("Lỗi kết nối");
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
      if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
      try {
         const response = await fetch(`/api/info-tourism?id=${id}`, {
            method: "DELETE",
         });

         if (response.ok) {
            alert("Xóa thành công!");
            fetchTourism();
         } else {
            alert("Xóa thất bại");
         }
      } catch (error) {
         console.error("Lỗi xóa:", error);
      }
   };

   if (view === "list") {
      return (
         <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
               <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Quản Lý Dịch Vụ Du Lịch</h1>
                  <button
                     onClick={() => {
                        resetForm();
                        setView("form");
                     }}
                     className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700"
                  >
                     + Thêm bài viết mới
                  </button>
               </div>

               {/* BỘ LỌC KÉP */}
               <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl border">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-semibold text-gray-500">Vùng:</span>
                     {["", "trong-nuoc", "nuoc-ngoai"].map((v) => (
                        <button key={v} onClick={() => setFilterRegion(v)} className={`px-3 py-1 rounded-md text-xs font-medium ${filterRegion === v ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                           {v === "" ? "Tất cả" : v === "trong-nuoc" ? "Trong nước" : "Nước ngoài"}
                        </button>
                     ))}
                  </div>
                  <div className="h-6 w-px bg-gray-200 mx-2" />
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-semibold text-gray-500">Chủ đề:</span>
                     <button onClick={() => setFilterCategory("")} className={`px-3 py-1 rounded-md text-xs font-medium ${filterCategory === "" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                        Tất cả
                     </button>
                     {categories.map((c) => (
                        <button key={c.id} onClick={() => setFilterCategory(c.slug)} className={`px-3 py-1 rounded-md text-xs font-medium ${filterCategory === c.id ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                           {c.title}
                        </button>
                     ))}
                  </div>
               </div>

               {/* BẢNG DANH SÁCH */}
               <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Bài viết</th>
                           <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Phân loại</th>
                           <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Tags</th>
                           <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Thao tác</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                        {loading ? (
                           <tr>
                              <td colSpan={4} className="p-10 text-center italic text-gray-400">
                                 Đang tải...
                              </td>
                           </tr>
                        ) : (
                           items.map((item) => (
                              <tr key={item.id} className="hover:bg-gray-50">
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                       <img src={item.thumbnail} className="w-12 h-12 object-cover rounded-md" />
                                       <div>
                                          <div className="text-sm font-bold">{item.title}</div>
                                          <div className="text-xs text-gray-400 line-clamp-1">{item.sort_des}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                       <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{item.region === "trong-nuoc" ? "Trong nước" : "Nước ngoài"}</span>
                                       <span className="text-xs text-gray-600 font-medium">#{item.category?.title || "N/A"}</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                       {item.hash_tags?.map((t, i) => (
                                          <span key={i} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                                             #{t.tag}
                                          </span>
                                       ))}
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(item)} className="text-blue-600 text-sm font-bold">
                                       Sửa
                                    </button>
                                    <button onClick={() => handleDelete(item.id!)} className="text-red-600 text-sm font-bold">
                                       Xóa
                                    </button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="p-8 bg-gray-100 min-h-screen">
         <div className="max-w-4xl mx-auto">
            <button onClick={() => setView("list")} className="mb-4 text-gray-500">
               ← Quay lại danh sách
            </button>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
               <h2 className="text-xl font-bold text-gray-800 border-b pb-4">{formData.id ? "Chỉnh Sửa" : "Tạo Mới"}</h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Tiêu đề</label>
                     <input type="text" required className="w-full border p-3 rounded-xl outline-none" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Phạm vi vùng</label>
                     <select className="w-full border p-3 rounded-xl outline-none" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value as any })}>
                        <option value="trong-nuoc">Trong nước</option>
                        <option value="nuoc-ngoai">Nước ngoài</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Thumbnail URL</label>
                     <input type="text" required className="w-full border p-3 rounded-xl outline-none" value={formData.thumbnail} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Chủ đề bài viết (Review, Mẹo...)</label>
                     <select required className="w-full border p-3 rounded-xl outline-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
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
                  <label className="text-xs font-bold text-gray-500 uppercase">Mô tả ngắn</label>
                  <textarea required rows={2} className="w-full border p-3 rounded-xl outline-none" value={formData.sort_des} onChange={(e) => setFormData({ ...formData, sort_des: e.target.value })} />
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Nội dung chi tiết</label>
                  <Editor
                     apiKey="yfyaqykybcjkbmpwvjz3hutd6okw7ahoyg4aj0iohkoiivzi"
                     value={editorHtml}
                     onEditorChange={(content) => setEditorHtml(content)}
                     init={{ height: 400, menubar: false, plugins: ["link", "image", "lists", "table", "code"], toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code", branding: false }}
                  />
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between">
                     <label className="text-xs font-bold text-gray-500 uppercase">Hashtags</label>
                     <button type="button" onClick={() => setFormData({ ...formData, hash_tags: [...formData.hash_tags, { tag: "" }] })} className="text-blue-600 text-xs font-bold">
                        + Thêm Tag
                     </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {formData.hash_tags.map((tag, index) => (
                        <input key={index} type="text" className="border p-2 rounded-lg text-sm w-32" value={tag.tag} onChange={(e) => updateTag(index, e.target.value)} placeholder="Tag..." />
                     ))}
                  </div>
               </div>

               <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50">
                  {loading ? "ĐANG XỬ LÝ..." : formData.id ? "CẬP NHẬT" : "ĐĂNG BÀI"}
               </button>
            </form>
         </div>
      </div>
   );
}
