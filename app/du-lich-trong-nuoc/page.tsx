"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { TourCard } from "@/components/tour-card";
import { Filter, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Enhanced data with 'region' field for filtering
const domesticTours = [
  {
    id: "1",
    title: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
    location: "Đà Nẵng",
    region: "Miền Trung",
    duration: "4 ngày 3 đêm",
    price: 4990000,
    originalPrice: 5990000,
    rating: 4.8,
    reviews: 125,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
    badge: "Hot",
  },
  {
    id: "2",
    title: "Tour Phú Quốc - Đảo Ngọc Thiên Đường 3N2Đ",
    location: "Phú Quốc",
    region: "Miền Nam",
    duration: "3 ngày 2 đêm",
    price: 3490000,
    originalPrice: 4290000,
    rating: 4.9,
    reviews: 89,
    image: "/phu-quoc-beach-sunset-vietnam.jpg",
    badge: "Deal hời",
  },
  {
    id: "3",
    title: "Tour Sapa - Fansipan - Bản Cát Cát 3N2Đ",
    location: "Sapa",
    region: "Miền Bắc",
    duration: "3 ngày 2 đêm",
    price: 2990000,
    rating: 4.7,
    reviews: 156,
    image: "/sapa-rice-terraces-vietnam-mountains.jpg",
  },
  {
    id: "6",
    title: "Tour Hạ Long - Cát Bà 3N2Đ",
    location: "Quảng Ninh",
    region: "Miền Bắc",
    duration: "3 ngày 2 đêm",
    price: 3290000,
    originalPrice: 3990000,
    rating: 4.6,
    reviews: 198,
    image: "/ha-long-bay-vietnam-cruise.jpg",
    badge: "Sale",
  },
  {
    id: "7",
    title: "Tour Nha Trang - Vinpearl Land 4N3Đ",
    location: "Nha Trang",
    region: "Miền Trung",
    duration: "4 ngày 3 đêm",
    price: 4290000,
    rating: 4.7,
    reviews: 145,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
  },
  {
    id: "8",
    title: "Tour Đà Lạt - Thành phố ngàn hoa 3N2Đ",
    location: "Đà Lạt",
    region: "Tây Nguyên",
    duration: "3 ngày 2 đêm",
    price: 2790000,
    originalPrice: 3290000,
    rating: 4.8,
    reviews: 210,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
    badge: "Mới",
  },
  {
    id: "9",
    title: "Tour Huế - Cố đô di sản 2N1Đ",
    location: "Huế",
    region: "Miền Trung",
    duration: "2 ngày 1 đêm",
    price: 1990000,
    rating: 4.6,
    reviews: 178,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
  },
  {
    id: "10",
    title: "Tour Quy Nhơn - Phú Yên 4N3Đ",
    location: "Quy Nhơn",
    region: "Miền Trung",
    duration: "4 ngày 3 đêm",
    price: 4590000,
    rating: 4.9,
    reviews: 67,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
    badge: "Hot",
  },
  {
    id: "11",
    title: "Tour Đà Lạt - Thành phố ngàn hoa 3N2Đ",
    location: "Đà Lạt",
    region: "Tây Nguyên",
    duration: "3 ngày 2 đêm",
    price: 2790000,
    originalPrice: 3290000,
    rating: 4.8,
    reviews: 210,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
    badge: "Mới",
  },
];

const regions = ["Tất cả", "Miền Bắc", "Miền Trung", "Miền Nam", "Tây Nguyên"];
const ITEMS_PER_PAGE = 8;

export default function DuLichTrongNuocPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [selectedRegion, setSelectedRegion] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortOption, setSortOption] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Update searchTerm when URL parameter changes
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, searchTerm, sortOption]);

  const filteredTours = useMemo(() => {
    let result = [...domesticTours];

    // Filter by Region
    if (selectedRegion !== "Tất cả") {
      result = result.filter((tour) => tour.region === selectedRegion);
    }

    // Filter by Search Term
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(lowerTerm) ||
          tour.location.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
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
        // "popular" - keep original order or add specific logic if "popularity" field exists
        break;
    }

    return result;
  }, [selectedRegion, searchTerm, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/phuquoc.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-background capitalize mb-4">
              Du Lịch Trong Nước
            </h1>
            <p className="text-xl text-background/90 max-w-3xl">
              Khám phá vẻ đẹp Việt Nam từ Bắc vào Nam với những tour du lịch
              chất lượng cao
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 z-30  bg-muted/95">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    className={
                      selectedRegion === region
                        ? ""
                        : "bg-transparent hover:bg-muted-foreground/10"
                    }
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4 items-center w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm điểm đến..."
                    className="pl-10 w-full md:w-62.5 bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
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
                {selectedRegion !== "Tất cả" && ` tại ${selectedRegion}`}
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

            {paginatedTours.length > 0 ? (
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
                    setSelectedRegion("Tất cả");
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
