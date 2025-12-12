import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { TourCard } from "@/components/tour-card"
import { Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    image: "/bangkok-thailand-temple.jpg",
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
    image: "/singapore-marina-bay-sands-night.jpg",
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
    image: "/seoul-korea-palace.jpg",
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
    image: "/japan-tokyo-mount-fuji.jpg",
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
    image: "/dubai-burj-khalifa.jpg",
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
    image: "/europe-paris-eiffel.jpg",
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
    image: "/bali-indonesia-temple.jpg",
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
    image: "/cambodia-angkor-wat.jpg",
  },
]

const continents = ["Tất cả", "Đông Nam Á", "Đông Á", "Châu Âu", "Trung Đông", "Châu Úc"]

export default function DuLichNuocNgoaiPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/world-travel-banner.jpg)` }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">Du Lịch Nước Ngoài</h1>
            <p className="text-xl text-background/90 max-w-2xl">
              Khám phá thế giới rộng lớn với những hành trình đáng nhớ cùng Suntravel
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {continents.map((continent) => (
                  <Button
                    key={continent}
                    variant={continent === "Tất cả" ? "default" : "outline"}
                    className={continent === "Tất cả" ? "" : "bg-transparent"}
                  >
                    {continent}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm quốc gia..." className="pl-10 w-[200px]" />
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
              <p className="text-muted-foreground">Hiển thị {internationalTours.length} tour</p>
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
