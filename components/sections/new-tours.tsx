import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const tours = [
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
    id: "4",
    title: "Tour Thái Lan - Bangkok - Pattaya 5N4Đ",
    location: "Thái Lan",
    duration: "5 ngày 4 đêm",
    price: 6990000,
    originalPrice: 8990000,
    rating: 4.8,
    reviews: 234,
    image: "/bangkok-thailand-temple.jpg",
    badge: "Mới",
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
]

export function NewTours() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-primary font-semibold mb-2">Ưu đãi đặc biệt</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">Tour Mới - Deal Hời</h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/du-lich-trong-nuoc">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/du-lich-trong-nuoc">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
