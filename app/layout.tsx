import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

// Cấu hình font Inter
const inter = Inter({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["vietnamese"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Suntravel - Công ty Du lịch Hàng đầu Việt Nam",
    template: "%s | Suntravel",
  },
  description:
    "Suntravel - Đồng hành cùng bạn trên mọi hành trình khám phá thế giới. Chuyên tổ chức tour du lịch trong nước và quốc tế, dịch vụ visa, đặt vé máy bay, khách sạn uy tín, chất lượng.",
  keywords: [
    "du lịch",
    "tour du lịch",
    "du lịch việt nam",
    "du lịch nước ngoài",
    "suntravel",
    "đặt tour",
    "vé máy bay",
    "khách sạn",
  ],
  authors: [{ name: "Suntravel" }],
  creator: "Suntravel",
  publisher: "Suntravel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://suntravel.vn"), // Thay thế bằng domain thực tế của bạn
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Suntravel - Công ty Du lịch Hàng đầu Việt Nam",
    description:
      "Suntravel - Đồng hành cùng bạn trên mọi hành trình khám phá thế giới. Dịch vụ du lịch chuyên nghiệp, tận tâm.",
    url: "https://suntravel.vn",
    siteName: "Suntravel",
    images: [
      {
        url: "/og-image.jpg", // Đảm bảo bạn có file ảnh này trong thư mục public
        width: 1200,
        height: 630,
        alt: "Suntravel - Khám phá thế giới",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suntravel - Công ty Du lịch Hàng đầu Việt Nam",
    description:
      "Suntravel - Đồng hành cùng bạn trên mọi hành trình khám phá thế giới.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
