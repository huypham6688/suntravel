import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Sparkles, Users, Presentation } from "lucide-react"

const services = [
  {
    title: "Tour Công Tác Doanh Nghiệp",
    description:
      "Chuyến đi công tác trọn gói với vé máy bay, khách sạn 4–5 sao và hỗ trợ visa.",
    icon: Presentation,
    href: "/mice/tour-cong-tac",
    badge: "06 tuyến nổi bật",
  },
  {
    title: "Tổ Chức Hội Nghị – Hội Thảo",
    description:
      "Setup trọn gói âm thanh, ánh sáng, sân khấu, backdrop và lễ tân chuyên nghiệp.",
    icon: Sparkles,
    href: "/mice/hoi-nghi-hoi-thao",
    badge: "50 – 1.000 khách",
  },
  {
    title: "Team Building",
    description:
      "Thiết kế kịch bản team building gắn kết, đo lường KPI rõ ràng cho đội ngũ.",
    icon: Users,
    href: "/mice/team-building",
    badge: "15+ concept",
  },
]

const journeyPhotos = [
  {
    image: "/mice/mice-1.jpg",
    title: "Du lịch khen thưởng Hàn Quốc mùa hè",
  },
  {
    image: "/mice/mice-2.jpg",
    title: "Suntravel MICE đồng hành cùng doanh nghiệp",
  },
  {
    image: "/mice/mice-3.jpg",
    title: "Hội nghị doanh nghiệp quy mô lớn",
  },
  {
    image: "/mice/mice-4.jpg",
    title: "Doanh nghiệp hài lòng ngay lần đầu hợp tác",
  },
]

export default function MiceOverviewPage() {
  return (
    <>
      <Header />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Nhật Ký Hành Trình
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {journeyPhotos.map((item, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground text-center">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Giải Pháp MICE Cho Doanh Nghiệp
            </h2>
            <p className="text-lg text-muted-foreground">
              Suntravel thiết kế và vận hành trọn gói hội nghị, hội thảo,
              incentive, team building và sự kiện ra mắt sản phẩm theo tiêu
              chuẩn quốc tế.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group border border-border rounded-2xl p-6 bg-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="text-primary font-medium flex items-center gap-2">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
