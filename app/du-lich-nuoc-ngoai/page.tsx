"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { TourCard } from "@/components/tour-card";
import { MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Tour {
  id: string;
  title: string;
  location: string;
  region?: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

const allRegions = [
  "Tất cả",
  "Đông Nam Á",
  "Trung Quốc",
  "Đông Bắc Á",
  "Trung Đông",
  "Châu Âu",
  "Châu Úc",
  "Châu Mỹ",
];

const ITEMS_PER_PAGE = 8;

export default function DuLichNuocNgoaiPage() {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region") || "";
  const searchQuery = searchParams.get("search") || "";

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortOption, setSortOption] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/api/tours?category=nuoc-ngoai&limit=100"
        );
        const data = await response.json();

        if (data.success) {
          setTours(data.docs);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Set region from URL parameter
  useEffect(() => {
    if (regionParam && allRegions.includes(regionParam)) {
      setSelectedFilter(regionParam);
    }
  }, [regionParam]);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, searchTerm, sortOption]);

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (selectedFilter !== "Tất cả") {
      result = result.filter((tour) => tour.region === selectedFilter);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(lowerTerm) ||
          tour.location.toLowerCase().includes(lowerTerm) ||
          (tour.region && tour.region.toLowerCase().includes(lowerTerm))
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [tours, selectedFilter, searchTerm, sortOption]);

  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-75 md:h-100">
          <div
            className="absolute inset-0 bg-cover bg-bottom"
            style={{
              backgroundImage: `url(/newyork.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl capitalize font-bold text-background mb-4">
              Du Lịch Nước Ngoài
            </h1>
            <p className="text-xl text-background/90 max-w-3xl">
              Khám phá thế giới rộng lớn với những hành trình đáng nhớ cùng
              Suntravel
            </p>
            {selectedFilter !== "Tất cả" && (
              <p className="text-lg text-background mt-2">
                📍 Đang xem:{" "}
                <span className="font-semibold">{selectedFilter}</span>
              </p>
            )}
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b border-border z-30 shadow-sm/50 backdrop-blur-sm bg-muted/95">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <div className="flex gap-2">
                  {allRegions.map((region) => (
                    <Button
                      key={region}
                      variant={
                        selectedFilter === region ? "default" : "outline"
                      }
                      onClick={() => setSelectedFilter(region)}
                      className={`rounded-full whitespace-nowrap ${
                        selectedFilter === region
                          ? ""
                          : "bg-background hover:bg-muted border-input text-foreground font-normal"
                      }`}
                      size="sm"
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 items-center w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial w-full md:w-auto">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm quốc gia..."
                    className="pl-10 w-full md:w-62.5 bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Quick filter indicator */}
            {selectedFilter !== "Tất cả" && (
              <div className="mt-4 flex gap-2 items-center">
                <span className="text-sm text-muted-foreground">Đang lọc:</span>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm">
                  <span>{selectedFilter}</span>
                  <button
                    onClick={() => setSelectedFilter("Tất cả")}
                    className="hover:text-primary"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <p className="text-muted-foreground font-medium">
                Hiển thị{" "}
                <span className="text-foreground font-bold">
                  {filteredTours.length}
                </span>{" "}
                tour
                {selectedFilter !== "Tất cả" && ` tại ${selectedFilter}`}
              </p>
              <select
                className="border border-input rounded-md px-4 py-2 bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-hidden min-w-50"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="popular">Sắp xếp: Phổ biến nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : paginatedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedTours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Không tìm thấy tour phù hợp
                </h3>
                <p className="text-muted-foreground">
                  Vui lòng thử lại với từ khóa hoặc bộ lọc khác.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedFilter("Tất cả");
                    setSearchTerm("");
                    setSortOption("popular");
                  }}
                  className="mt-4 text-primary"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-transparent hover:bg-muted"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        className={`${
                          currentPage === page
                            ? ""
                            : "bg-transparent hover:bg-muted"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-transparent hover:bg-muted"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
