"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Image from "next/image";
// import Image from "next/image"; // Uncomment when real images are available

// Placeholder data for "Visa HOT"
const hotVisas = [
  {
    country: "Trung Quốc",
    image: "/visa/du-lich-trung-quoc.jpg", // Ensure these images exist or use placeholders
    price: "Liên hệ",
    desc: "Visa du lịch, thương mại. Tỷ lệ đậu cao.",
  },
  {
    country: "Nhật Bản",
    image: "/visa/du-lich-japan.jpg",
    price: "Liên hệ",
    desc: "Thủ tục đơn giản, không cần phỏng vấn.",
  },
  {
    country: "Châu Âu (Schengen)",
    image: "/visa/du-lich-chau-au.jpg",
    price: "Liên hệ",
    desc: "Visa đi 26 nước Châu Âu. Hỗ trợ trọn gói.",
  },
];

export function HotVisasSection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
        Visa HOT
      </h2>
      <div className="w-20 h-1 bg-secondary mx-auto mb-10 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hotVisas.map((visa, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 group"
          >
            <div className="h-48 relative overflow-hidden bg-gray-200">
              {/* Placeholder for image */}
              <Image src={visa.image} alt={visa.country} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
             
              <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                HOT
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {visa.country}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {visa.desc}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-primary font-semibold">{visa.price}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/lien-he">Chi tiết</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
