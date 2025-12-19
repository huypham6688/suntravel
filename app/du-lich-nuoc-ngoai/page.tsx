"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { TourCard } from "@/components/tour-card";
import { Filter, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const internationalTours = [
  {
    id: "4",
    title: "Tour Thái Lan - Bangkok - Pattaya 5N4Đ",
    location: "Thái Lan",
    duration: "5 ngày 4 đêm",
    price: 6990000,
    originalPrice: 8990000,
    rating: 4.8,
    reviews: 234,
    image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit800600gsm/eventThirdParty/2022/05/19/4fa1e25b-87a2-4295-8b1f-3edc664feaa7-1652947238484-b5f11891480f7c09f365f5658055ed81.jpg",
    badge: "Hot",
  },
  {
    id: "5",
    title: "Tour Singapore - Malaysia 6N5Đ",
    location: "Singapore",
    duration: "6 ngày 5 đêm",
    price: 12990000,
    rating: 4.9,
    reviews: 67,
    image: "https://media.istockphoto.com/id/1500402629/photo/marina-bay-laser-light-show.jpg?s=612x612&w=0&k=20&c=xsXglITjqIuAQr0CZW4TsRbE4Pq39BMnnmKlbytuQd4=",
  },
  {
    id: "11",
    title: "Tour Hàn Quốc - Seoul - Nami 5N4Đ",
    location: "Hàn Quốc",
    duration: "5 ngày 4 đêm",
    price: 15990000,
    originalPrice: 18990000,
    rating: 4.9,
    reviews: 189,
    image: "https://www.agoda.com/wp-content/uploads/2024/07/Changdeokgung-Palace-Seoul-South-Korea.jpg",
    badge: "Best seller",
  },
  {
    id: "12",
    title: "Tour Nhật Bản - Tokyo - Osaka 6N5Đ",
    location: "Nhật Bản",
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
    duration: "6 ngày 5 đêm",
    price: 25990000,
    originalPrice: 29990000,
    rating: 4.8,
    reviews: 78,
    image: "https://as2.ftcdn.net/v2/jpg/03/21/26/25/1000_F_321262583_yrjvmflBlyQLqLIkpHEUogdmbQFwoYJd.jpg",
    badge: "Luxury",
  },
  {
    id: "14",
    title: "Tour Châu Âu 5 nước 10N9Đ",
    location: "Châu Âu",
    duration: "10 ngày 9 đêm",
    price: 49990000,
    rating: 4.9,
    reviews: 56,
    image: "https://c8.alamy.com/comp/KC8G78/paris-london-rome-set-of-european-capitals-symbols-eiffel-tower-coliseum-KC8G78.jpg",
  },
  {
    id: "15",
    title: "Tour Bali - Thiên đường nhiệt đới 5N4Đ",
    location: "Indonesia",
    duration: "5 ngày 4 đêm",
    price: 11990000,
    originalPrice: 13990000,
    rating: 4.7,
    reviews: 123,
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/31/72/51.jpg",
    badge: "Deal hời",
  },
  {
    id: "16",
    title: "Tour Campuchia - Angkor Wat 4N3Đ",
    location: "Campuchia",
    duration: "4 ngày 3 đêm",
    price: 5990000,
    rating: 4.6,
    reviews: 167,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/20171126_Angkor_Wat_4712_DxO.jpg",
  },
];

const otherContinents = ["Châu Âu", "Châu Úc", "Châu Mỹ"];

const asiaSubRegions = [
  { label: "Đông Nam Á", value: "Đông Nam Á" },
  { label: "Trung Quốc", value: "Trung Quốc" },
  { label: "Đông Bắc Á", value: "Đông Bắc Á" },
  { label: "Trung Đông", value: "Trung Đông" },
];

export default function DuLichNuocNgoaiPage() {
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");

  // Hàm kiểm tra xem filter hiện tại có thuộc Châu Á không
  const isAsiaSelected = selectedFilter === "Châu Á" || asiaSubRegions.some((sub) => sub.value === selectedFilter);

  return (
      <>
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[300px] md:h-[400px]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/phu-quoc-beach-sunset-vietnam.jpg)` }}

            />
            <div className="absolute inset-0 bg-foreground/60" />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">
                Du Lịch Nước Ngoài
              </h1>
              <p className="text-xl text-background/90 max-w-2xl">
                Khám phá thế giới rộng lớn với những hành trình đáng nhớ cùng Suntravel
              </p>
            </div>
          </section>

          {/* Filters Section - ĐÃ ĐẸP HOÁ */}
          <section className="py-8 bg-muted border-b border-border">
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
                    <DropdownMenuContent align="start" className="w-48 mt-1 shadow-lg border">
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
                          variant={selectedFilter === continent ? "default" : "outline"}
                          onClick={() => setSelectedFilter(continent)}
                          className="rounded-full"
                      >
                        {continent}
                      </Button>
                  ))}
                </div>

                {/* Tìm kiếm & Bộ lọc */}
                <div className="flex gap-4 items-center w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Tìm quốc gia..." className="pl-10 w-full md:w-[220px]" />
                  </div>
                  <Button variant="outline" className="rounded-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Bộ lọc
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Tours Grid */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Hiển thị {internationalTours.length} tour
                </p>
                <select className="border border-border rounded-lg px-4 py-2 bg-background text-foreground">
                  <option>Sắp xếp: Phổ biến nhất</option>
                  <option>Giá: Thấp đến cao</option>
                  <option>Giá: Cao đến thấp</option>
                  <option>Đánh giá cao nhất</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {internationalTours.map((tour) => (
                    <TourCard key={tour.id} {...tour} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-transparent">
                    1
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    2
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    3
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    ...
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingChat />
      </>
  );
}