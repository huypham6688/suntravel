"use client";

import { useState, useEffect } from "react";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [checkingUsers, setCheckingUsers] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    checkIfUsersExist();
  }, []);

  const checkIfUsersExist = async () => {
    try {
      setDebugInfo("Đang kiểm tra Payload API...");

      // Thử API test trước
      const testResponse = await fetch("/api/test-payload");

      if (!testResponse.ok) {
        throw new Error(`API not ready: ${testResponse.status}`);
      }

      const testData = await testResponse.json();
      console.log("Test API result:", testData);
      setDebugInfo(`API OK - Found ${testData.totalUsers} users`);

      if (testData.totalUsers === 0) {
        setIsRegisterMode(true);
      }
    } catch (error) {
      console.error("Error checking users:", error);
      setDebugInfo(`Lỗi kết nối API: ${error instanceof Error ? error.message : String(error)}`);
      // Nếu API lỗi, cho phép đăng ký
      setIsRegisterMode(true);
    } finally {
      setCheckingUsers(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("payload-token", data.token);
        localStorage.setItem("payload-user", JSON.stringify(data.user));
        onLoginSuccess();
      } else {
        setError(data.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập: " + (err instanceof Error ? err.message : String(err)));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Tự động đăng nhập sau khi đăng ký
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginData.success && loginData.token) {
          localStorage.setItem("payload-token", loginData.token);
          localStorage.setItem("payload-user", JSON.stringify(loginData.user));
          onLoginSuccess();
        }
      } else {
        setError(data.error || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng ký: " + (err instanceof Error ? err.message : String(err)));
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (checkingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="text-lg mb-2">Đang kiểm tra hệ thống...</div>
            {debugInfo && (
              <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-100 rounded">
                {debugInfo}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegisterMode ? "Tạo tài khoản Admin đầu tiên" : "Đăng nhập Admin"}
        </h1>

        {isRegisterMode && (
          <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
            ℹ️ Chưa có tài khoản nào. Hãy tạo tài khoản admin đầu tiên.
          </div>
        )}

        {debugInfo && (
          <div className="mb-4 bg-gray-50 border border-gray-200 text-gray-600 px-4 py-2 rounded text-xs">
            Debug: {debugInfo}
          </div>
        )}

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nguyễn Văn A"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {isRegisterMode && (
              <p className="text-xs text-gray-500 mt-1">
                Tối thiểu 6 ký tự
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? (isRegisterMode ? "Đang tạo tài khoản..." : "Đang đăng nhập...")
              : (isRegisterMode ? "Tạo tài khoản Admin" : "Đăng nhập")
            }
          </button>
        </form>

        {!isRegisterMode && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegisterMode(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Chưa có tài khoản? Đăng ký ngay
            </button>
          </div>
        )}

        {isRegisterMode && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegisterMode(false)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}