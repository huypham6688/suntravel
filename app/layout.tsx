import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin", "vietnamese"] })
const _playfair = Playfair_Display({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
  title: "Suntravel - Công ty Du lịch Hàng đầu Việt Nam",
  description:
    "Suntravel - Đồng hành cùng bạn trên mọi hành trình khám phá thế giới. Tour trong nước, nước ngoài, dịch vụ du lịch chất lượng cao.",
  keywords: ["du lịch", "tour", "travel", "Việt Nam", "du lịch trong nước", "du lịch nước ngoài", "Suntravel"],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
