"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToursManagement from "./ToursManagement";
import ServiceTourismManager from "./ServiceTourismManager";
import CategoryManager from "./ServiceTourismManager/CategoriesManager";
import JourneyGalleryCRUD from "./JourneyGalleryCRUD";
import VideosCRUD from "./VideosCRUD";
import CompanyInfoManager from "./CompanyInfoManager";
import Image from "next/image";
import {
  LayoutDashboard,
  Map,
  FileText,
  List,
  Image as ImageIcon,
  Building2,
  Database,
  Cloud,
  Server,
  ShieldCheck,
  BookOpen,
  LogOut,
  ChevronRight,
  MonitorPlay,
} from "lucide-react";

type Tab =
  | "dashboard"
  | "tours"
  | "tourism"
  | "categories"
  | "gallery"
  | "company-info"
  | "videos";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    tours: 0,
    tourism: 0,
    gallery: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("payload-user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch Tours Stats
      const toursRes = await fetch("/api/tours");
      const toursData = await toursRes.json();

      // Fetch Tourism Stats
      const tourismRes = await fetch("/api/info-tourism?limit=1");
      const tourismData = await tourismRes.json();

      // Fetch Gallery Stats
      const galleryRes = await fetch("/api/journey-gallery?limit=1");
      const galleryData = await galleryRes.json();

      setStats({
        tours: toursData.success ? toursData.totalDocs : 0,
        tourism: tourismData.success ? tourismData.totalDocs : 0,
        gallery: galleryData.success ? galleryData.totalDocs : 0,
      });
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

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "tours",
      label: "Tours",
      icon: Map,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "tourism",
      label: "Thông tin du lịch",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "categories",
      label: "Danh mục",
      icon: List,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "gallery",
      label: "Nhật ký hành trình",
      icon: ImageIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "videos",
      label: "Videos",
      icon: MonitorPlay,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "company-info",
      label: "Thông tin công ty",
      icon: Building2,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={80}
                className="w-[200px] h-auto object-contain"
              />
              <span className="hidden md:inline-block text-gray-300">|</span>
              <span className="hidden md:inline-block font-medium text-gray-700">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">
                    Administrator
                  </span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="xl:w-64 w-full flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <nav className="flex flex-col p-2 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as Tab)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? `${item.bgColor} ${item.color}`
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                      {isActive && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-100 text-sm font-medium mb-1">
                          Tổng số Tours
                        </p>
                        <h3 className="text-3xl font-bold">
                          {stats.tours || 0}
                        </h3>
                      </div>
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Map className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-blue-100">
                      Đang hoạt động trên hệ thống
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-orange-100 text-sm font-medium mb-1">
                          Tin tức & Sự kiện
                        </p>
                        <h3 className="text-3xl font-bold">
                          {stats.tourism || 0}
                        </h3>
                      </div>
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FileText className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-orange-100">
                      Bài viết đã được đăng tải
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-pink-100 text-sm font-medium mb-1">
                          Ảnh nhật ký
                        </p>
                        <h3 className="text-3xl font-bold">
                          {stats.gallery || 0}
                        </h3>
                      </div>
                      <div className="p-2 bg-white/20 rounded-lg">
                        <ImageIcon className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-pink-100">
                      Khoảnh khắc khách hàng
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-gray-400" />
                    Truy cập nhanh
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {menuItems.slice(1).map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id as Tab)}
                          className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                          <div
                            className={`p-3 rounded-full ${item.bgColor} ${item.color} mb-3 group-hover:scale-110 transition-transform`}
                          >
                            <Icon size={24} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* System Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Server size={20} className="text-gray-400" />
                      Thông tin hệ thống
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Database size={18} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Database
                            </p>
                            <p className="text-xs text-gray-500">
                              MongoDB Atlas
                            </p>
                          </div>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Cloud size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Storage
                            </p>
                            <p className="text-xs text-gray-500">
                              Cloudinary (10GB miễn phí)
                            </p>
                          </div>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <LayoutDashboard
                              size={18}
                              className="text-purple-600"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              CMS
                            </p>
                            <p className="text-xs text-gray-500">
                              Payload 3.0 + Next.js 15
                            </p>
                          </div>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-lg border border-green-100 mt-2">
                        <ShieldCheck size={14} />
                        Mọi thay đổi được lưu trữ an toàn trên cloud
                      </div>
                    </div>
                  </div>

                  {/* User Manual */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BookOpen size={20} className="text-gray-400" />
                      Hướng dẫn sử dụng
                    </h2>
                    <div className="space-y-4">
                      <div className="group p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer">
                        <h3 className="font-medium text-gray-900 flex items-center justify-between">
                          Quản lý Tours
                          <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-blue-500"
                          />
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Thêm mới, chỉnh sửa thông tin giá, lịch trình và hình
                          ảnh cho các tour du lịch.
                        </p>
                      </div>

                      <div className="group p-4 border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                        <h3 className="font-medium text-gray-900 flex items-center justify-between">
                          Thông tin du lịch
                          <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-orange-500"
                          />
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Đăng bài viết tin tức, cẩm nang và quản lý các sự kiện
                          sắp diễn ra.
                        </p>
                      </div>

                      <div className="group p-4 border border-gray-100 rounded-xl hover:border-pink-200 hover:bg-pink-50 transition-all cursor-pointer">
                        <h3 className="font-medium text-gray-900 flex items-center justify-between">
                          Nhật ký hành trình
                          <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-pink-500"
                          />
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Upload và quản lý thư viện hình ảnh khách hàng, cập
                          nhật khoảnh khắc đẹp.
                        </p>
                      </div>

                      <div className="group p-4 border border-gray-100 rounded-xl hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer">
                        <h3 className="font-medium text-gray-900 flex items-center justify-between">
                          Videos
                          <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-red-500"
                          />
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Quản lý video, phim tư liệu và các khoảnh khắc hành
                          trình sinh động.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tours" && <ToursManagement />}
            {activeTab === "tourism" && <ServiceTourismManager />}
            {activeTab === "categories" && <CategoryManager />}
            {activeTab === "gallery" && <JourneyGalleryCRUD />}
            {activeTab === "videos" && <VideosCRUD />}
            {activeTab === "company-info" && <CompanyInfoManager />}
          </main>
        </div>
      </div>
    </div>
  );
}
