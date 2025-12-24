"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { TourCard } from "@/components/tour-card";
import {
  Filter,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const internationalTours = [
  {
    id: "4",
    title: "Tour Thái Lan - Bangkok - Pattaya 5N4Đ",
    location: "Thái Lan",
    region: "Đông Nam Á",
    duration: "5 ngày 4 đêm",
    price: 6990000,
    originalPrice: 8990000,
    rating: 4.8,
    reviews: 234,
    image:
      "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit800600gsm/eventThirdParty/2022/05/19/4fa1e25b-87a2-4295-8b1f-3edc664feaa7-1652947238484-b5f11891480f7c09f365f5658055ed81.jpg",
    badge: "Hot",
  },
  {
    id: "5",
    title: "Tour Singapore - Malaysia 6N5Đ",
    location: "Singapore",
    region: "Đông Nam Á",
    duration: "6 ngày 5 đêm",
    price: 12990000,
    rating: 4.9,
    reviews: 67,
    image:
      "https://media.istockphoto.com/id/1500402629/photo/marina-bay-laser-light-show.jpg?s=612x612&w=0&k=20&c=xsXglITjqIuAQr0CZW4TsRbE4Pq39BMnnmKlbytuQd4=",
  },
  {
    id: "11",
    title: "Tour Hàn Quốc - Seoul - Nami 5N4Đ",
    location: "Hàn Quốc",
    region: "Đông Bắc Á",
    duration: "5 ngày 4 đêm",
    price: 15990000,
    originalPrice: 18990000,
    rating: 4.9,
    reviews: 189,
    image:
      "https://www.agoda.com/wp-content/uploads/2024/07/Changdeokgung-Palace-Seoul-South-Korea.jpg",
    badge: "Best seller",
  },
  {
    id: "12",
    title: "Tour Nhật Bản - Tokyo - Osaka 6N5Đ",
    location: "Nhật Bản",
    region: "Đông Bắc Á",
    duration: "6 ngày 5 đêm",
    price: 29990000,
    rating: 5.0,
    reviews: 145,
    image: "https://i.sstatic.net/sxLzZ.jpg",
  },
  {
    id: "13",
    title: "Tour Dubai - Abu Dhabi 6N5Đ",
    location: "UAE",
    region: "Trung Đông",
    duration: "6 ngày 5 đêm",
    price: 25990000,
    originalPrice: 29990000,
    rating: 4.8,
    reviews: 78,
    image:
      "https://as2.ftcdn.net/v2/jpg/03/21/26/25/1000_F_321262583_yrjvmflBlyQLqLIkpHEUogdmbQFwoYJd.jpg",
    badge: "Luxury",
  },
  {
    id: "14",
    title: "Tour Châu Âu 5 nước 10N9Đ",
    location: "Châu Âu",
    region: "Châu Âu",
    duration: "10 ngày 9 đêm",
    price: 49990000,
    rating: 4.9,
    reviews: 56,
    image:
      "https://c8.alamy.com/comp/KC8G78/paris-london-rome-set-of-european-capitals-symbols-eiffel-tower-coliseum-KC8G78.jpg",
  },
  {
    id: "15",
    title: "Tour Bali - Thiên đường nhiệt đới 5N4Đ",
    location: "Indonesia",
    region: "Đông Nam Á",
    duration: "5 ngày 4 đêm",
    price: 11990000,
    originalPrice: 13990000,
    rating: 4.7,
    reviews: 123,
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/31/72/51.jpg",
    badge: "Deal hời",
  },
  {
    id: "16",
    title: "Tour Campuchia - Angkor Wat 4N3Đ",
    location: "Campuchia",
    region: "Đông Nam Á",
    duration: "4 ngày 3 đêm",
    price: 5990000,
    rating: 4.6,
    reviews: 167,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/20171126_Angkor_Wat_4712_DxO.jpg",
  },
];

const otherContinents = ["Châu Âu", "Châu Úc", "Châu Mỹ"];

const asiaSubRegions = [
  { label: "Đông Nam Á", value: "Đông Nam Á" },
  { label: "Trung Quốc", value: "Trung Quốc" },
  { label: "Đông Bắc Á", value: "Đông Bắc Á" },
  { label: "Trung Đông", value: "Trung Đông" },
];

const ITEMS_PER_PAGE = 8;

export default function DuLichNuocNgoaiPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortOption, setSortOption] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Hàm kiểm tra xem filter hiện tại có thuộc Châu Á không
  const isAsiaSelected =
    selectedFilter === "Châu Á" ||
    asiaSubRegions.some((sub) => sub.value === selectedFilter);

  // Update searchTerm when URL parameter changes
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, searchTerm, sortOption]);

  const filteredTours = useMemo(() => {
    let result = [...internationalTours];

    // Filter by Region/Filter
    if (selectedFilter !== "Tất cả") {
      if (selectedFilter === "Châu Á") {
        // If "Châu Á" selected, show all Asian regions
        const asiaRegions = asiaSubRegions.map((r) => r.value);
        result = result.filter((tour) => asiaRegions.includes(tour.region));
      } else {
        result = result.filter((tour) => tour.region === selectedFilter);
      }
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
        break;
    }

    return result;
  }, [selectedFilter, searchTerm, sortOption]);

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
        {/* Hero Section */}
        <section className="relative h-75 md:h-100">
          <div
            className="absolute inset-0 bg-cover bg-bottom"
            style={{
              backgroundImage: `url(/newyork.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl capitalize font-bold text-background  mb-4">
              Du Lịch Nước Ngoài
            </h1>
            <p className="text-xl text-background/90 max-w-3xl">
              Khám phá thế giới rộng lớn với những hành trình đáng nhớ cùng
              Suntravel
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b border-border sticky top-18 z-30 shadow-sm/50 backdrop-blur-sm bg-muted/95">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Các button filter */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Tất cả */}
                <Button
                  variant={selectedFilter === "Tất cả" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("Tất cả")}
                  className="rounded-full"
                >
                  Tất cả
                </Button>

                {/* Châu Á với Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={isAsiaSelected ? "default" : "outline"}
                      className="rounded-full flex items-center gap-1"
                    >
                      Châu Á <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-48 mt-1 shadow-lg border"
                  >
                    {/* Add "Tất cả Châu Á" option if desired, or simplified logic */}
                    {asiaSubRegions.map((sub) => (
                      <DropdownMenuItem
                        key={sub.value}
                        onClick={() => setSelectedFilter(sub.value)}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      >
                        {sub.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Các châu lục khác */}
                {otherContinents.map((continent) => (
                  <Button
                    key={continent}
                    variant={
                      selectedFilter === continent ? "default" : "outline"
                    }
                    onClick={() => setSelectedFilter(continent)}
                    className="rounded-full"
                  >
                    {continent}
                  </Button>
                ))}
              </div>

              {/* Tìm kiếm */}
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

            {/* Pagination */}
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
