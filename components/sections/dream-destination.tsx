"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { journeyImages } from "./journey-diary"; // Import shared data
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 7; // Customize based on grid slots

export function DreamDestination() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Flatten all images from journeyImages (main + gallery)
  const allDestinations = useMemo(() => {
    return journeyImages.flatMap((tour) => {
      // Main image
      const mainImage = {
        src: tour.src,
        alt: tour.tourName || tour.alt, // Prefer simpler name if available
      };
      // Gallery images
      const galleryImages = tour.gallery.map((imgSrc) => ({
        src: imgSrc,
        alt: tour.tourName || tour.alt,
      }));
      return [mainImage, ...galleryImages];
    });
  }, []);

  const totalPages = Math.ceil(allDestinations.length / ITEMS_PER_PAGE);

  // Slice for current page
  const currentItems = allDestinations.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">
            Dream Destination
          </span>
          <h2 className="text-4xl font-bold text-primary mt-2">
            Sự lựa chọn của khách hàng
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Side Arrows (Desktop) */}
          <div className="hidden xl:block">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="absolute top-1/2 -left-20 -translate-y-1/2 z-20 group disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-95"
              aria-label="Previous page"
            >
              <div className="relative w-24 h-24">
                <ChevronsLeft className="w-full h-full text-primary/20 absolute top-0 left-2" />
                <ChevronsLeft className="w-full h-full text-red-500 relative z-10 transition-transform group-hover:-translate-x-1" />
              </div>
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="absolute top-1/2 -right-20 -translate-y-1/2 z-20 group disabled:opacity-30 disabled:cursor-not-allowed transition-transform active:scale-95"
              aria-label="Next page"
            >
              <div className="relative w-24 h-24">
                <ChevronsRight className="w-full h-full text-primary/20 absolute top-0 right-2" />
                <ChevronsRight className="w-full h-full text-red-500 relative z-10 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-150 md:h-125">
            {currentItems.map((item, index) => {
              // Determine span based on index for the bento effect
              // First item is large (2x2)
              const isLarge = index === 0;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedImage(item)}
                  className={cn(
                    "relative rounded-3xl overflow-hidden group cursor-pointer",
                    isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-bold text-lg">
                      {item.alt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2 xl:hidden">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  currentPage === idx ? "bg-red-500 w-8" : "bg-gray-300"
                )}
              />
            ))}
          </div>

          {/* Lightbox Dialog */}
          <Dialog
            open={!!selectedImage}
            onOpenChange={(open) => !open && setSelectedImage(null)}
          >
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none overflow-hidden flex items-center justify-center">
              {/* Make Title visually hidden but present for accessibility */}
              <DialogTitle className="sr-only">
                {selectedImage?.alt || "Image Preview"}
              </DialogTitle>

              <div className="relative w-full h-[80vh] md:h-[90vh]">
                {selectedImage && (
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
