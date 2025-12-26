"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const banners = [
  {
    id: 1,
    title: "Du lịch Paris - Pháp",
    subtitle: "Combo 3N2Đ chỉ từ 2.990.000đ",
    description: "Bay thẳng + Khách sạn 4 sao + Buffet sáng",
    image: "/paris.jpg",
    cta: "Đặt ngay",
  },
  {
    id: 2,
    title: "Du lịch Thái Lan",
    subtitle: "Tour Bangkok - Pattaya 5N4Đ",
    description: "Khởi hành hàng tuần - Giá chỉ từ 6.990.000đ",
    image: "/thailan3.png",
    cta: "Đặt ngay",
  },
  {
    id: 3,
    title: "Du lịch London - Anh",
    subtitle: "Thiên đường nghỉ dưỡng",
    description: "Resort 5 sao - Giảm đến 40%",
    image: "/london.jpg",
    cta: "Đặt ngay",
  },
];

export interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
}

interface HeroBannerProps {
  items?: BannerItem[];
}

export function HeroBanner({ items = banners }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);

  const minSwipeDistance = 80;

const onTouchStart = (e: React.TouchEvent) => {
  setIsDragging(true);
  setTouchStartX(e.targetTouches[0].clientX);
};

const onTouchMove = (e: React.TouchEvent) => {
  if (touchStartX === null) return;

  const currentX = e.targetTouches[0].clientX;
  const delta = currentX - touchStartX;

  setDragX(delta);
};

const onTouchEnd = () => {
  if (!isDragging) return;

  setIsDragging(false);

  if (dragX < -minSwipeDistance) {
    nextSlide();
  } else if (dragX > minSwipeDistance) {
    prevSlide();
  }


  setDragX(0);
  setTouchStartX(null);
};


  return (
    <section
      className="relative h-[500px] md:h-[600px] overflow-hidden touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {items.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-background">
              <p className=" text-lg font-semibold mb-2">{banner.subtitle}</p>
              <h1 className="text-4xl md:text-6xl font-bold capitalize mb-4 text-balance">
                {banner.title}
              </h1>
              <p className="text-xl mb-8 text-background/90">
                {banner.description}
              </p>
              <Link
                href="/lien-he"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">{banner.cta}</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
             w-12 h-12 bg-background/20 hover:bg-background/40
             rounded-full items-center justify-center
             backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-background" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
             w-12 h-12 bg-background/20 hover:bg-background/40
             rounded-full items-center justify-center
             backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-background" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-background/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
