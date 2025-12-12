import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const guides = [
  {
    id: "1",
    title: "Top 10 điểm check-in không thể bỏ lỡ tại Đà Nẵng 2025",
    excerpt: "Khám phá những địa điểm sống ảo đẹp nhất tại thành phố đáng sống nhất Việt Nam.",
    image: "/da-nang-golden-bridge-check-in.jpg",
    date: "28/03/2025",
    category: "Trong nước",
  },
  {
    id: "2",
    title: "Kinh nghiệm du lịch Thái Lan tự túc chi tiết từ A-Z",
    excerpt: "Hướng dẫn đầy đủ cho chuyến du lịch Thái Lan đầu tiên của bạn với ngân sách tiết kiệm.",
    image: "/thailand-bangkok-travel-guide.jpg",
    date: "25/03/2025",
    category: "Nước ngoài",
  },
  {
    id: "3",
    title: "Sapa mùa nào đẹp nhất? Lịch trình 3 ngày 2 đêm hoàn hảo",
    excerpt: "Tất tần tật về thời điểm lý tưởng và lịch trình chi tiết cho chuyến đi Sapa.",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "20/03/2025",
    category: "Trong nước",
  },
]

export function TravelGuides() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-primary font-semibold mb-2">Kinh nghiệm du lịch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">Cẩm Nang Du Lịch</h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/cam-nang">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <article
              key={guide.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {guide.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{guide.date}</span>
                </div>
                <h3 className="font-semibold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors font-serif">
                  <Link href={`/cam-nang/${guide.id}`}>{guide.title}</Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2">{guide.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/cam-nang">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
