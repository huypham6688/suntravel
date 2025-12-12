import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { TourCard } from "@/components/tour-card"
import { Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const domesticTours = [
  {
    id: "1",
    title: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
    location: "Đà Nẵng",
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
    duration: "4 ngày 3 đêm",
    price: 4590000,
    rating: 4.9,
    reviews: 67,
    image: "/da-nang-ba-na-hills-golden-bridge.jpg",
    badge: "Hot",
  },
]

const regions = ["Tất cả", "Miền Bắc", "Miền Trung", "Miền Nam", "Tây Nguyên"]

export default function DuLichTrongNuocPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/phu-quoc-beach-sunset-vietnam.jpg)` }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">Du Lịch Trong Nước</h1>
            <p className="text-xl text-background/90 max-w-2xl">
              Khám phá vẻ đẹp Việt Nam từ Bắc vào Nam với những tour du lịch chất lượng cao
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={region === "Tất cả" ? "default" : "outline"}
                    className={region === "Tất cả" ? "" : "bg-transparent"}
                  >
                    {region}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm điểm đến..." className="pl-10 w-[200px]" />
                </div>
                <Button variant="outline" className="bg-transparent">
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
              <p className="text-muted-foreground">Hiển thị {domesticTours.length} tour</p>
              <select className="border border-border rounded-lg px-4 py-2 bg-background text-foreground">
                <option>Sắp xếp: Phổ biến nhất</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
                <option>Đánh giá cao nhất</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {domesticTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>

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
  )
}
