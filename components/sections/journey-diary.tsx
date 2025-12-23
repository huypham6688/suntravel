"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for journey diary images
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

        {/* Filter Buttons */}
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

              {/* Full Screen Lightbox Modal */}
              <DialogContent className="max-w-5xl w-full p-0 bg-background border-none shadow-xl flex flex-col rounded-xl overflow-hidden h-auto">
                <div className="sr-only">
                  <DialogTitle>{image.alt}</DialogTitle>
                  <DialogDescription>Xem ảnh chi tiết</DialogDescription>
                </div>

                <div className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden bg-background">
                  {selectedTour && (
                    <div className="relative w-full h-[50vh] flex items-center justify-center p-4">
                      <Image
                        src={selectedTour.gallery[currentImageIndex]}
                        alt={`${selectedTour.alt} - Ảnh ${
                          currentImageIndex + 1
                        }`}
                        fill
                        className="object-contain"
                        priority
                        quality={100}
                      />
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 text-black hover:bg-white hover:text-black border border-black/10 shadow-sm z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrev();
                    }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 text-black hover:bg-white hover:text-black border border-black/10 shadow-sm z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </div>

                {/* Bottom Thumbnails & Info */}
                <div className="bg-background border-t border-border p-4 shrink-0 z-50">
                  <div className="container mx-auto max-w-7xl flex flex-col  items-center gap-6">
                    <div className="text-foreground flex-1 text-center md:text-left">
                      <h4 className="font-bold text-lg md:text-xl">
                        {image.alt}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {image.tourName} • {image.date} •{" "}
                        {currentImageIndex + 1}/{image.gallery.length}
                      </p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
                      {selectedTour?.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={cn(
                            "relative w-20 h-14 rounded-md overflow-hidden border-2 transition-all shrink-0",
                            currentImageIndex === idx
                              ? "border-primary opacity-100 ring-2 ring-primary/50"
                              : "border-transparent opacity-40 hover:opacity-100"
                          )}
                        >
                          <Image
                            src={img}
                            alt="thumbnail"
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
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
