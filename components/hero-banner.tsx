"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface BannerItem {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  image: {
    url: string;
    alt?: string;
  } | string;
  cta: string;
  ctaLink?: string;
}

interface HeroBannerProps {
  items?: BannerItem[];
}

export function HeroBanner({ items }: HeroBannerProps) {
  const [banners, setBanners] = useState<BannerItem[]>(items || []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(!items);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch banners from API if not provided via props
  useEffect(() => {
    if (!items) {
      fetchBanners();
    }
  }, [items]);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/hero-banners?sort=order");

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        throw new Error(`API returned ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Expected JSON but got:", contentType);
        throw new Error("Invalid response format");
      }

      const data = await res.json();

      // DEBUG LOGS
      console.log("=== BANNER DATA DEBUG ===");
      console.log("Full response:", data);
      if (data.docs && data.docs.length > 0) {
        console.log("First banner:", data.docs[0]);
        console.log("First banner image:", data.docs[0].image);
        console.log("Image type:", typeof data.docs[0].image);
        if (typeof data.docs[0].image === "object") {
          console.log("Image object keys:", Object.keys(data.docs[0].image));
          console.log("Image URL:", data.docs[0].image.url);
          console.log("Image cloudinaryUrl:", data.docs[0].image.cloudinaryUrl);
        }
      }
      console.log("========================");

      if (data.docs) {
        setBanners(data.docs);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      if (banners.length > 0) {
        alert("Lỗi khi tải dữ liệu banners");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto slideshow
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  // Touch handlers for mobile swipe
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

  if (isLoading) {
    return (
        <section className="relative h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </section>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
      <section
          className="relative h-[500px] md:h-[600px] overflow-hidden touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
      >
        {banners.map((banner, index) => {
          // Handle image - can be string, object with url, or object with cloudinaryUrl
          let imageUrl = "";
          if (typeof banner.image === "string") {
            imageUrl = banner.image;
          } else if (banner.image) {
            imageUrl = (banner.image as any).cloudinaryUrl || banner.image.url || "";
          }

          return (
              <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-2xl text-background">
                    <p className="text-lg font-semibold mb-2">{banner.subtitle}</p>
                    <h1 className="text-4xl md:text-6xl font-bold capitalize mb-4 text-balance">
                      {banner.title}
                    </h1>
                    <p className="text-xl mb-8 text-background/90">
                      {banner.description}
                    </p>
                    <Link href={banner.ctaLink || "/lien-he"}>
                      <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                      >
                        {banner.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
          );
        })}

        {/* Navigation arrows */}
        <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
             w-12 h-12 bg-background/20 hover:bg-background/40
             rounded-full items-center justify-center
             backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-background" />
        </button>
        <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
             w-12 h-12 bg-background/20 hover:bg-background/40
             rounded-full items-center justify-center
             backdrop-blur-sm transition-colors"
            aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-background" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
              <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-primary" : "bg-background/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
              />
          ))}
        </div>
      </section>
  );
}