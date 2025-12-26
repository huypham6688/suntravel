"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Tour, View } from "./tours/types";
import TourList from "./tours/TourList";
import TourForm from "./tours/TourForm";

export default function ToursManagement() {
  // --- 2. STATE (Logic cũ + Thêm state cho Search) ---
  const [view, setView] = useState<View>("list");
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State mới cho ô Search

  // Form state (Giữ nguyên khởi tạo)
  const initialFormState: Partial<Tour> = {
    title: "",
    location: "",
    region: "Hạ Long",
    duration: "",
    price: 0,
    originalPrice: 0,
    rating: 4.5,
    reviews: 0,
    image: "",
    badge: "",
    category: "trong-nuoc",
    maxPeople: 20,
    description: "",
    highlights: [{ item: "" }],
    itinerary: [{ day: 1, title: "", description: "" }],
    includes: [{ item: "" }],
    excludes: [{ item: "" }],
    gallery: [{ url: "" }],
    departureDate: [{ date: "" }],
  };

  const [formData, setFormData] = useState<Partial<Tour>>(initialFormState);

  // --- 3. EFFECTS (Logic cũ) ---
  useEffect(() => {
    if (view === "list") {
      fetchTours();
    }
  }, [view, filterCategory]);

  useEffect(() => {
    if (editingTour) {
      setFormData(editingTour);
    }
  }, [editingTour]);

  // Reset region when category changes (Logic cũ)
  useEffect(() => {
    if (formData.category === "trong-nuoc") {
      // Nếu người dùng chưa chọn region hoặc region hiện tại không khớp, reset về mặc định
      if (!editingTour) setFormData((prev) => ({ ...prev, region: "Hạ Long" }));
    } else {
      if (!editingTour)
        setFormData((prev) => ({ ...prev, region: "Đông Nam Á" }));
    }
  }, [formData.category]);

  // --- 4. API FUNCTIONS (Giữ nguyên logic fetch/delete/submit) ---
  const fetchTours = async () => {
    try {
      setLoading(true);
      const url = filterCategory
        ? `/api/tours?category=${filterCategory}&limit=100`
        : "/api/tours?limit=100";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTours(data.docs);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTour = async (id: string) => {
    toast("Bạn có chắc muốn xóa tour này?", {
      action: {
        label: "Xóa",
        onClick: async () => {
          try {
            const response = await fetch(`/api/tours/${id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              toast.success("Xóa tour thành công!");
              fetchTours();
            } else {
              toast.error("Xóa tour thất bại!");
            }
          } catch (error) {
            console.error("Error deleting tour:", error);
            toast.error("Có lỗi xảy ra!");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingTour ? `/api/tours/${editingTour.id}` : "/api/tours";
      const method = editingTour ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          editingTour ? "Cập nhật tour thành công!" : "Tạo tour thành công!"
        );
        setView("list");
        setEditingTour(null);
        setFormData(initialFormState);
      } else {
        toast.error(`Có lỗi xảy ra: ${result.error || "Unknown error"}`);
        console.error("Error details:", result);
      }
    } catch (error) {
      console.error("Error saving tour:", error);
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  // --- 5. HELPER FUNCTIONS (Giữ nguyên) ---
  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setView("form");
  };

  const handleCreateNew = () => {
    setEditingTour(null);
    setFormData(initialFormState);
    setView("form");
  };

  const addItem = (field: keyof Tour, template: any) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as any[]), template],
    });
  };

  const removeItem = (field: keyof Tour, index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as any[]).filter((_, i) => i !== index),
    });
  };

  const updateItem = (field: keyof Tour, index: number, value: any) => {
    const items = [...(formData[field] as any[])];
    items[index] = value;
    setFormData({ ...formData, [field]: items });
  };

  // --- 6. RENDER (Using new Components) ---
  if (view === "list") {
    return (
      <TourList
        tours={tours}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        onEdit={handleEdit}
        onDelete={deleteTour}
        onCreateNew={handleCreateNew}
      />
    );
  }

  // VIEW: FORM
  return (
    <TourForm
      formData={formData}
      setFormData={setFormData}
      editingTour={editingTour}
      loading={loading}
      onCancel={() => setView("list")}
      onSubmit={handleSubmit}
      addItem={addItem}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  );
}
