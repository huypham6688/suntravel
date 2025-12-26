"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Calendar,
  Loader2,
} from "lucide-react";
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

const regions = [
  "Tất cả",
  "Nội địa",
  "Tour Châu Á",
  "Tour Châu Âu",
  "Tour Châu Mỹ",
  "Tour Châu Úc",
  "Tour Châu Phi",
];

const miceTypes = [
  "Công tác doanh nghiệp",
  "Hội nghị, hội thảo",
  "Team Building",
];

export function JourneyDiary() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  const ITEMS_PER_PAGE = 8;

  // Data fetching state
  const [journeyImages, setJourneyImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "100", // Fetch all to handle pagination locally for now, or implement server pagination
      });

      if (selectedCategory && selectedCategory !== "Tất cả") {
        // Note: API integration for category filter needs to be supported in backend or filtered here
        // The provided API /api/journey-gallery handles category param
        params.append("category", selectedCategory);
      }

      // If we want to filter by category via API, query param is passed.
      // But currently UI mixes "regions" and "miceTypes" as categories.
      // Backend schema has one 'category' field. We pass it directly.

      const res = await fetch(`/api/journey-gallery?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setJourneyImages(data.docs);
      }
    } catch (error) {
      console.error("Failed to fetch gallery", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      if (regions.includes(category) || miceTypes.includes(category)) {
        setSelectedCategory(category);
      }
    }
  }, [searchParams]);

  // Pagination Logic (Client-side for simplicity as we fetch list)
  const totalPages = Math.ceil(journeyImages.length / ITEMS_PER_PAGE);
  const currentImages = journeyImages.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const selectedTour = journeyImages.find((img) => img.id === selectedTourId);

  const getGalleryImages = (tour: any) => {
    if (!tour || !tour.gallery) return [];
    return tour.gallery
      .map((g: any) => g.image?.cloudinaryUrl || g.image?.url || "")
      .filter((url: string) => url !== "");
  };

  const currentGallery = getGalleryImages(selectedTour);

  const handleNext = () => {
    if (!currentGallery.length) return;
    setCurrentImageIndex((prev) =>
      prev === currentGallery.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (!currentGallery.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentGallery.length - 1 : prev - 1
    );
  };

  return (
    <section id="journey-diary" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-primary font-semibold mb-2 uppercase tracking-wider">
            Khoảnh khắc đáng nhớ
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold  text-foreground">
            Nhật Ký Hành Trình
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Lưu giữ những khoảnh khắc tuyệt vời cùng khách hàng trong mỗi chuyến
            đi. Sự hài lòng của quý khách là niềm hạnh phúc của chúng tôi.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((category) => (
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
          {/* Use same state for mice types - assuming backend handles categorization properly */}
          <div className="flex flex-wrap justify-center gap-3">
            {miceTypes.map((category) => (
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
        </div>

        {/* List Ảnh Ngoài */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-10 h-10 text-primary" />
            </div>
          ) : journeyImages.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Chưa có nhật ký hành trình nào.
            </div>
          ) : (
            <>
              {/* Side Arrows (Chỉ hiện trên màn hình 2xl trở lên) */}
              {totalPages > 1 && (
                <div className="hidden xl:block">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="absolute top-1/2 -left-20 -translate-y-1/2 z-20 group disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-95"
                    aria-label="Previous page"
                  >
                    <div className="relative w-20 h-20">
                      <ChevronLeft className="w-full h-full text-primary relative z-10 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="absolute top-1/2 -right-20 -translate-y-1/2 z-20 group disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-95"
                    aria-label="Next page"
                  >
                    <div className="relative w-20 h-20">
                      <ChevronRight className="w-full h-full text-primary relative z-10 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {currentImages.map((image) => (
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
                        <motion.div
                          layout
                          className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col"
                        >
                          <div className="relative aspect-4/3 overflow-hidden">
                            {image.featuredImage?.cloudinaryUrl ||
                            image.featuredImage?.url ? (
                              <Image
                                src={
                                  image.featuredImage?.cloudinaryUrl ||
                                  image.featuredImage?.url
                                }
                                alt={image.alt || "Tour image"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                No Image
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Camera className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Xem {image.gallery?.length || 0} ảnh
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
                        </motion.div>
                      </DialogTrigger>

                      {/* MODAL CHI TIẾT */}
                      <DialogContent className="h-[90vh] max-w-[95vw] overflow-hidden rounded-3xl border-none p-0 lg:max-w-[85vw]">
                        <div className="sr-only">
                          <DialogTitle>{image.alt}</DialogTitle>
                          <DialogDescription>
                            Xem ảnh chi tiết
                          </DialogDescription>
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
                                {currentGallery[currentImageIndex] && (
                                  <Image
                                    src={currentGallery[currentImageIndex]}
                                    alt="Gallery"
                                    fill
                                    className="object-contain"
                                    priority
                                  />
                                )}
                              </motion.div>
                            </AnimatePresence>

                            {/* Nav Buttons */}
                            {currentGallery.length > 1 && (
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
                            )}
                          </div>

                          {/* Right: Info Sidebar */}
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
                                {selectedTour?.description ||
                                  "Hình ảnh thực tế từ Lộ trình tour tham gia hành trình. Chúng tôi cam kết chất lượng dịch vụ và những trải nghiệm chân thực nhất."}
                              </p>

                              <div className="grid grid-cols-4 gap-2">
                                {currentGallery.map(
                                  (img: string, idx: number) => (
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
                                  )
                                )}
                              </div>
                            </div>
                            <Link
                              href="/lien-he"
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
                </motion.div>
              </AnimatePresence>

              {/* Numeric Pagination (Hiện trên màn hình < 2xl) */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2 xl:hidden">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="rounded-full w-10 h-10 border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <Button
                      key={idx}
                      variant={currentPage === idx ? "default" : "outline"}
                      onClick={() => setCurrentPage(idx)}
                      className={cn(
                        "rounded-full w-10 h-10 transition-all",
                        currentPage === idx
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {idx + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="rounded-full w-10 h-10 border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
