"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra authentication
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("payload-token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Verify token với Payload API
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Check role admin
        if (data.user && data.user.role === "admin") {
          setIsAuthenticated(true);
        } else {
          // Valid token but not admin
          localStorage.removeItem("payload-token");
          setIsAuthenticated(false);
          alert("Bạn không có quyền truy cập trang quản trị.");
        }
      } else {
        localStorage.removeItem("payload-token");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}
