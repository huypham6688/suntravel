import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { TourCard } from "@/components/tour-card"

const conferences = [
  {
    id: "hoi-nghi-khach-hang",
    title: "Hội Nghị Khách Hàng Toàn Quốc",
    location: "Hà Nội • Đà Nẵng • TP.HCM",
    duration: "1 - 2 ngày",
    price: "Gói trọn gói, liên hệ",
    rating: 4.9,
    reviews: 48,
    image: "/doanhnhan.jpg",
    badge: "Hot",
  },
  {
    id: "kick-off-sales",
    title: "Kick-off Sales & Ra Mắt Sản Phẩm",
    location: "Tại văn phòng hoặc khách sạn 4-5 sao",
    duration: "Nửa ngày - 1 ngày",
    price: "Thiết kế theo ngân sách",
    rating: 4.8,
    reviews: 36,
    image: "/placeholder.jpg",
    badge: "Mới",
  },
  {
    id: "hoi-thao-chuyen-de",
    title: "Hội Thảo Chuyên Đề & Đào Tạo",
    location: "Phòng họp khách sạn 4-5 sao",
    duration: "1 ngày",
    price: "Gói tiêu chuẩn / nâng cao",
    rating: 4.7,
    reviews: 22,
    image: "/placeholder-user.jpg",
  },
]

export default function HoiNghiHoiThao() {
    return (
        <>
            <Header />
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Dịch Vụ Tổ Chức Hội Nghị & Hội Thảo Trọn Gói</h2>
                        <p className="text-lg text-muted-foreground">
                            Từ quy mô nhỏ đến hàng nghìn người, Suntravel thiết kế và vận hành trọn gói hội nghị, hội thảo,
                            kick-off, ra mắt sản phẩm với tiêu chuẩn khách sạn 4-5 sao, âm thanh ánh sáng chuyên nghiệp.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {conferences.map((c) => (
                            <TourCard
                                key={c.id}
                                {...c}
                                href={`/mice/hoi-nghi-hoi-thao/${c.id}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}