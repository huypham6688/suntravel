"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data (Dữ liệu giữ nguyên theo yêu cầu của bạn)
const journeyImages = [
  {
    id: 1,
    src: "/mice/my-1.jpeg",
    alt: "Đoàn khách Tour Mỹ",
    tourName: "Tour Châu Mỹ",
    date: "09/2025",
    category: "Tour Châu Mỹ",
    gallery: [
      "/mice/my-1.jpeg",
      "/mice/my-2.jpeg",
      "/mice/my-3.jpeg",
      "/mice/my-4.jpeg",
      "/mice/my-5.jpeg",
      "/mice/my-6.jpeg",
      "/mice/my-7.jpeg",
      "/mice/my-8.jpeg",
    ],
  },
  {
    id: 2,
    src: "/mice/hoa-anh-dao-1.jpg",
    alt: "Mỹ hoa anh đào",
    tourName: "Tour Châu Mỹ",
    date: "04/2025",
    category: "Tour Châu Mỹ",
    gallery: [
      "/mice/hoa-anh-dao-1.jpg",
      "/mice/hoa-anh-dao-2.jpg",
      "/mice/hoa-anh-dao-3.jpg",
      "/mice/hoa-anh-dao-4.jpg",
      "/mice/hoa-anh-dao-5.jpg",
    ],
  },
  {
    id: 3,
    src: "/mice/chau-my-6.jpg",
    alt: "Đoàn khách Tour Mỹ",
    tourName: "Tour Châu Mỹ",
    date: "09/2025",
    category: "Tour Châu Mỹ",
    gallery: [
      "/mice/chau-my-1.jpg",
      "/mice/chau-my-2.jpg",
      "/mice/chau-my-3.jpg",
      "/mice/chau-my-4.jpg",
      "/mice/chau-my-5.jpg",
      "/mice/chau-my-6.jpg",
    ],
  },
  {
    id: 4,
    src: "/mice/my-sun-1.jpg",
    alt: "Đoàn khách Tour Mỹ",
    tourName: "Tour Châu Mỹ",
    date: "02/2025",
    category: "Tour Châu Mỹ",
    gallery: [
      "/mice/my-sun-1.jpg",
      "/mice/my-sun-2.jpg",
      "/mice/my-sun-3.jpg",
      "/mice/my-sun-4.jpg",
      "/mice/my-sun-5.jpg",
      "/mice/my-sun-6.jpg",
    ],
  },
  {
    id: 5,
    src: "/mice/chau-uc-1.jpeg",
    alt: "Đoàn khách Tour Úc",
    tourName: "Tour Châu Úc",
    date: "02/2025",
    category: "Tour Châu Úc",
    gallery: [
      "/mice/chau-uc-1.jpeg",
      "/mice/chau-uc-2.jpeg",
      "/mice/chau-uc-3.jpeg",
      "/mice/chau-uc-4.jpg",
      "/mice/chau-uc-5.jpeg",
    ],
  },
  {
    id: 6,
    src: "/mice/chau-phi-1.jpg",
    alt: "Đoàn khách Tour Châu Phi",
    tourName: "Tour Châu Phi",
    date: "02/2025",
    category: "Tour Châu Phi",
    gallery: [
      "/mice/chau-phi-1.jpg",
      "/mice/chau-phi-2.jpg",
      "/mice/chau-phi-3.jpg",
      "/mice/chau-phi-4.jpg",
      "/mice/chau-phi-5.png",
    ],
  },
  {
    id: 7,
    src: "/mice/nam-phi-1.jpg",
    alt: "Đoàn khách Tour Nam Phi",
    tourName: "Tour Châu Phi",
    date: "02/2025",
    category: "Tour Châu Phi",
    gallery: [
      "/mice/nam-phi-1.jpg",
      "/mice/nam-phi-2.jpg",
      "/mice/nam-phi-3.jpg",
      "/mice/nam-phi-4.jpg",
      "/mice/nam-phi-5.jpg",
    ],
  },
  {
    id: 8,
    src: "/mice/nga-1.jpg",
    alt: "Đoàn khách Tour Châu Âu - Nga",
    tourName: "Tour Châu Âu",
    date: "06/2025",
    category: "Tour Châu Âu",
    gallery: [
      "/mice/nga-1.jpg",
      "/mice/nga-2.jpg",
      "/mice/nga-3.jpg",
      "/mice/nga-4.jpg",
      "/mice/nga-5.jpg",
      "/mice/nga-6.jpg",
    ],
  },
  {
    id: 9,
    src: "/mice/anh-1.jpg",
    alt: "Đoàn khách Tour Châu Âu - Anh",
    tourName: "Tour Châu Âu",
    date: "09/2023",
    category: "Tour Châu Âu",
    gallery: ["/mice/anh-1.jpg", "/mice/anh-2.jpg", "/mice/anh-3.jpg"],
  },
  {
    id: 10,
    src: "/mice/cuu-trai-cau-1.jpg",
    alt: "Đoàn khách Tour Châu Á - Trung Quốc - Cửu Trại Câu",
    tourName: "Tour Châu Á",
    date: "09/2024",
    category: "Tour Châu Á",
    gallery: [
      "/mice/cuu-trai-cau-1.jpg",
      "/mice/cuu-trai-cau-2.jpg",
      "/mice/cuu-trai-cau-3.jpg",
      "/mice/cuu-trai-cau-4.jpg",
      "/mice/cuu-trai-cau-5.jpg",
      "/mice/cuu-trai-cau-6.jpg",
      "/mice/cuu-trai-cau-7.jpg",
    ],
  },
  {
    id: 11,
    src: "/mice/le-chau-1.jpg",
    alt: "Đoàn khách Tour Châu Á - Trung Quốc - Lệ Châu",
    tourName: "Tour Châu Á",
    date: "09/2024",
    category: "Tour Châu Á",
    gallery: [
      "/mice/le-chau-1.jpg",
      "/mice/le-chau-2.jpg",
      "/mice/le-chau-3.jpg",
      "/mice/le-chau-4.jpg",
      "/mice/le-chau-5.jpg",
    ],
  },
  {
    id: 12,
    src: "/mice/thai-lan-1.jpg",
    alt: "Đoàn khách Tour Châu Á - Thái Lan",
    tourName: "Tour Châu Á",
    date: "09/2024",
    category: "Tour Châu Á",
    gallery: [
      "/mice/thai-lan-1.jpg",
      "/mice/thai-lan-2.jpg",
      "/mice/thai-lan-3.jpg",
      "/mice/thai-lan-4.jpg",
    ],
  },
  {
    id: 13,
    src: "/mice/singapore-1.jpg",
    alt: "Đoàn khách Tour Châu Á - Singapore",
    tourName: "Tour Châu Á",
    date: "09/2024",
    category: "Tour Châu Á",
    gallery: [
      "/mice/singapore-1.jpg",
      "/mice/singapore-2.jpg",
      "/mice/singapore-3.jpg",
      "/mice/singapore-4.jpg",
    ],
  },
  {
    id: 14,
    src: "/mice/nhat-ban-1.jpeg",
    alt: "Đoàn khách Tour Châu Á - Nhật Bản",
    tourName: "Tour Châu Á",
    date: "05/2024",
    category: "Tour Châu Á",
    gallery: [
      "/mice/nhat-ban-1.jpeg",
      "/mice/nhat-ban-2.jpg",
      "/mice/nhat-ban-3.jpeg",
      "/mice/nhat-ban-4.jpg",
      "/mice/nhat-ban-5.jpg",
    ],
  },
  {
    id: 15,
    src: "/mice/tra-co-1.jpg",
    alt: "Đoàn khách Tour Nội địa - Trà Cổ",
    tourName: "Nội địa",
    date: "05/2024",
    category: "Nội địa",
    gallery: [
      "/mice/tra-co-1.jpg",
      "/mice/tra-co-2.jpg",
      "/mice/tra-co-3.jpg",
      "/mice/tra-co-4.jpg",
      "/mice/tra-co-5.jpg",
    ],
  },
  {
    id: 16,
    src: "/mice/mui-ne-1.jpg",
    alt: "Đoàn khách Tour Nội địa - Mũi Né",
    tourName: "Nội địa",
    date: "05/2024",
    category: "Nội địa",
    gallery: [
      "/mice/mui-ne-1.jpg",
      "/mice/mui-ne-2.jpg",
      "/mice/mui-ne-3.jpg",
      "/mice/mui-ne-4.jpg",
    ],
  },
   {
    id: 17,
    src: "/mice/ha-long-1.jpg",
    alt: "Đoàn khách Tour Nội địa - Hạ Long",
    tourName: "Nội địa",
    date: "05/2024",
    category: "Nội địa",
    gallery: [
      "/mice/ha-long-1.jpg",
      "/mice/ha-long-2.jpg",
      "/mice/ha-long-3.jpg",
      "/mice/ha-long-4.jpg",
    ],
  },
];

const categories = [
  "Tất cả",
  "Nội địa",
  "Tour Châu Á",
  "Tour Châu Âu",
  "Tour Châu Mỹ",
  "Tour Châu Úc",
  "Tour Châu Phi",
];

export function JourneyDiary() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredImages =
    selectedCategory === "Tất cả"
      ? journeyImages
      : journeyImages.filter((img) => img.category === selectedCategory);

  const selectedTour = journeyImages.find((img) => img.id === selectedTourId);

  const handleNext = () => {
    if (!selectedTour) return;
    setCurrentImageIndex((prev) =>
      prev === selectedTour.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (!selectedTour) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedTour.gallery.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section (Giữ nguyên giao diện hiện tại) */}
        <div className="text-center mb-12">
          <h2 className="text-primary font-semibold mb-2 uppercase tracking-wider">
            Khoảnh khắc đáng nhớ
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
            Nhật Ký Hành Trình
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Lưu giữ những khoảnh khắc tuyệt vời cùng khách hàng trong mỗi chuyến
            đi. Sự hài lòng của quý khách là niềm hạnh phúc của chúng tôi.
          </p>
        </div>

        {/* Filter Buttons (Giữ nguyên) */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-6 py-2 transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* List Ảnh Ngoài (Giữ nguyên) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <Dialog
              key={image.id}
              open={selectedTourId === image.id}
              onOpenChange={(open) => {
                if (open) {
                  setSelectedTourId(image.id);
                  setCurrentImageIndex(0);
                } else {
                  setSelectedTourId(null);
                }
              }}
            >
              <DialogTrigger asChild>
                <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Camera className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Xem {image.gallery.length} ảnh
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <h4 className="font-bold text-lg mb-2 text-foreground line-clamp-2">
                      {image.alt}
                    </h4>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto pt-2 border-t border-border/50">
                      <span className="font-medium text-primary">
                        {image.tourName}
                      </span>
                      <span>{image.date}</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              {/* LẤY GIAO DIỆN MODAL CHI TIẾT TỪ CODE CŨ */}
              <DialogContent className="h-[90vh] max-w-[95vw] overflow-hidden rounded-3xl border-none p-0 lg:max-w-[85vw]">
                <div className="sr-only">
                  <DialogTitle>{image.alt}</DialogTitle>
                  <DialogDescription>Xem ảnh chi tiết</DialogDescription>
                </div>
                <div className="flex h-full flex-col lg:flex-row">
                  {/* Left: Image Viewer */}
                  <div className="relative flex flex-1 items-center justify-center bg-black p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedTourId(null)}
                      className="absolute right-4 top-4 z-50 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 lg:hidden"
                    >
                      <X className="h-5 w-5" />
                    </Button>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={selectedTour?.gallery[currentImageIndex] || ""}
                          alt="Gallery"
                          fill
                          className="object-contain"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav Buttons */}
                    <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePrev();
                        }}
                        className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                      >
                        <ChevronLeft className="h-8 w-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                        className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                      >
                        <ChevronRight className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>

                  {/* Right: Info Sidebar (Từ code cũ) */}
                  <div className="flex w-full flex-col bg-white p-8 lg:w-[380px]">
                    <div className="flex-1">
                      <Badge
                        variant="outline"
                        className="mb-4 border-orange-200 bg-orange-50 text-orange-600"
                      >
                        {selectedTour?.category}
                      </Badge>
                      <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900">
                        {selectedTour?.alt}
                      </h2>

                      <div className="mb-8 space-y-3">
                        <div className="flex items-center gap-3 text-slate-600">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">
                            {selectedTour?.tourName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">
                            Khởi hành: {selectedTour?.date}
                          </span>
                        </div>
                      </div>

                      <p className="mb-6 text-sm leading-relaxed text-slate-500">
                        Hình ảnh thực tế từ đoàn khách tham gia hành trình.
                        Chúng tôi cam kết chất lượng dịch vụ và những trải
                        nghiệm chân thực nhất.
                      </p>

                      <div className="grid grid-cols-4 gap-2">
                        {selectedTour?.gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={cn(
                              "relative aspect-square overflow-hidden rounded-xl transition-all",
                              currentImageIndex === idx
                                ? "ring-2 ring-orange-500 ring-offset-2"
                                : "opacity-50 hover:opacity-100"
                            )}
                          >
                            <Image
                              src={img}
                              alt="thumb"
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="#contact"
                      onClick={() => setSelectedTourId(null)}
                    >
                      <Button className="mt-8 flex w-full items-center justify-center rounded-md bg-orange-600 py-6 text-lg font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700">
                        Tư vấn Tour này
                      </Button>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}