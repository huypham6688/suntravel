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
    src: "/da-nang-ba-na-hills-golden-bridge.jpg",
    alt: "Đoàn khách tại Cầu Vàng - Bà Nà Hills",
    tourName: "Tour Đà Nẵng - Hội An",
    date: "12/2024",
    gallery: [
      "/da-nang-ba-na-hills-golden-bridge.jpg",
      "/phu-quoc-beach-sunset-vietnam.jpg",
      "/sapa-rice-terraces-vietnam-mountains.jpg",
    ],
  },
  {
    id: 2,
    src: "/phu-quoc-beach-sunset-vietnam.jpg",
    alt: "Teambuilding bãi biển Phú Quốc",
    tourName: "Teambuilding Phú Quốc",
    date: "11/2024",
    gallery: [
      "/phu-quoc-beach-sunset-vietnam.jpg",
      "/ha-long-bay-vietnam-cruise.jpg",
      "/bangkok-thailand-temple.jpg",
    ],
  },
  {
    id: 3,
    src: "/sapa-rice-terraces-vietnam-mountains.jpg",
    alt: "Chinh phục đỉnh Fansipan",
    tourName: "Tour Sapa - Fansipan",
    date: "10/2024",
    gallery: [
      "/sapa-rice-terraces-vietnam-mountains.jpg",
      "/da-nang-ba-na-hills-golden-bridge.jpg",
      "/singapore-marina-bay-sands-night.jpg",
    ],
  },
  {
    id: 4,
    src: "/ha-long-bay-vietnam-cruise.jpg",
    alt: "Gala Dinner trên du thuyền Hạ Long",
    tourName: "MICE Hạ Long",
    date: "09/2024",
    gallery: [
      "/ha-long-bay-vietnam-cruise.jpg",
      "/phu-quoc-beach-sunset-vietnam.jpg",
      "/da-nang-ba-na-hills-golden-bridge.jpg",
    ],
  },
  {
    id: 5,
    src: "/bangkok-thailand-temple.jpg",
    alt: "Đoàn tham quan Chùa Vàng Thái Lan",
    tourName: "Tour Thái Lan",
    date: "08/2024",
    gallery: [
      "/bangkok-thailand-temple.jpg",
      "/singapore-marina-bay-sands-night.jpg",
      "/sapa-rice-terraces-vietnam-mountains.jpg",
    ],
  },
  {
    id: 6,
    src: "/singapore-marina-bay-sands-night.jpg",
    alt: "Khám phá Singapore về đêm",
    tourName: "Tour Singapore - Malaysia",
    date: "07/2024",
    gallery: [
      "/singapore-marina-bay-sands-night.jpg",
      "/bangkok-thailand-temple.jpg",
      "/ha-long-bay-vietnam-cruise.jpg",
    ],
  },
];

export function JourneyDiary() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journeyImages.map((image) => (
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
                  <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-6">
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
