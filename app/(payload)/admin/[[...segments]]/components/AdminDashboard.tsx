"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Tab = "dashboard" | "destinations";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    destinations: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("payload-user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // Fetch stats cho destinations
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/destinations");
      const data = await response.json();
      if (data.success) {
        setStats({ destinations: data.totalDocs });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("payload-token");
    localStorage.removeItem("payload-user");
    router.push("/admin");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Hà Anh CMS Admin</h1>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs - Chỉ giữ Dashboard và Destinations */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("destinations")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "destinations"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Destinations
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === "dashboard" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total Destinations</div>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.destinations || "-"}
                  </div>
                </div>
                {/* Bạn có thể thêm các card thống kê khác ở đây nếu cần */}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}