import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { TourCard } from "@/components/tour-card"

const teamPrograms = [
  {
    id: "team-building-bien",
    title: "Team Building Bãi Biển – Gắn Kết Đội Ngũ",
    location: "Đà Nẵng • Nha Trang • Phú Quốc",
    duration: "Nửa ngày - 1 ngày",
    price: "Thiết kế theo quy mô đoàn",
    rating: 4.9,
    reviews: 65,
    image: "/da-nang-beach-beautiful-sunset-vietnam.jpg",
    badge: "Hot",
  },
  {
    id: "team-building-nui-rung",
    title: "Team Building Núi Rừng & Camping",
    location: "Sapa • Đà Lạt • Pù Mát",
    duration: "2 ngày 1 đêm",
    price: "Gói trọn gói, liên hệ",
    rating: 4.8,
    reviews: 41,
    image: "/sapa-rice-terraces-vietnam-mountains.jpg",
    badge: "Adventure",
  },
  {
    id: "indoor-outdoor",
    title: "Indoor & Outdoor Kết Hợp – Đào Tạo & Trải Nghiệm",
    location: "Resort / Khách sạn 4-5 sao",
    duration: "1 ngày",
    price: "Thiết kế theo mục tiêu chương trình",
    rating: 4.7,
    reviews: 29,
    image: "/phu-quoc-island-vietnam-beach-resort.jpg",
  },
]

export default function TeamBuilding() {
    return (
        <>
            <Header />

            {/* Hero chung, không truyền props */}
            <HeroBanner />

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Chương Trình Team Building Đẳng Cấp</h2>
                        <p className="text-lg text-muted-foreground">
                            Các hoạt động team building được thiết kế riêng theo mục tiêu doanh nghiệp:
                            tăng sự gắn kết, rèn luyện kỹ năng làm việc nhóm, khơi dậy tinh thần sáng tạo
                            và năng lượng tích cực cho tập thể.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {teamPrograms.map((t) => (
                            <TourCard
                                key={t.id}
                                {...t}
                                href={`/mice/team-building/${t.id}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}