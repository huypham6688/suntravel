import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { Plane, Hotel, Car, Ticket, Camera, FileText, CreditCard, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Plane,
    title: "Đặt vé máy bay",
    description:
      "Đặt vé máy bay nội địa và quốc tế với giá ưu đãi. Hỗ trợ đặt vé khứ hồi, một chiều với tất cả các hãng hàng không.",
    features: ["Giá vé cạnh tranh", "Nhiều hãng bay", "Hỗ trợ 24/7", "Hoàn/đổi vé linh hoạt"],
  },
  {
    icon: Hotel,
    title: "Đặt phòng khách sạn",
    description:
      "Hệ thống khách sạn đối tác từ 3-5 sao trên toàn quốc và quốc tế. Cam kết giá tốt nhất với nhiều ưu đãi hấp dẫn.",
    features: ["Khách sạn 3-5 sao", "Giá cam kết tốt nhất", "Miễn phí hủy phòng", "Điểm thưởng thành viên"],
  },
  {
    icon: Car,
    title: "Thuê xe du lịch",
    description:
      "Dịch vụ cho thuê xe du lịch từ 4-45 chỗ với tài xế kinh nghiệm. Xe đời mới, sạch sẽ, an toàn tuyệt đối.",
    features: ["Xe 4-45 chỗ", "Tài xế chuyên nghiệp", "Xe đời mới 2022-2024", "Bảo hiểm đầy đủ"],
  },
  {
    icon: Ticket,
    title: "Vé tham quan",
    description:
      "Đặt trước vé tham quan các điểm du lịch nổi tiếng trong và ngoài nước với giá ưu đãi, không cần xếp hàng.",
    features: ["Không cần xếp hàng", "Giá ưu đãi", "E-ticket tiện lợi", "Nhiều điểm đến"],
  },
  {
    icon: FileText,
    title: "Làm visa",
    description: "Dịch vụ làm visa du lịch, công tác cho tất cả các quốc gia. Tư vấn hồ sơ miễn phí, tỷ lệ đậu cao.",
    features: ["Tư vấn miễn phí", "Tỷ lệ đậu cao", "Xử lý nhanh", "Hỗ trợ toàn diện"],
  },
  {
    icon: Camera,
    title: "Chụp ảnh du lịch",
    description:
      "Dịch vụ chụp ảnh chuyên nghiệp tại các điểm du lịch. Lưu giữ những khoảnh khắc đẹp nhất của chuyến đi.",
    features: ["Nhiếp ảnh gia chuyên nghiệp", "Thiết bị hiện đại", "Chỉnh sửa chuyên nghiệp", "Giao ảnh nhanh"],
  },
  {
    icon: CreditCard,
    title: "Bảo hiểm du lịch",
    description:
      "Gói bảo hiểm du lịch toàn diện, bảo vệ bạn trong suốt hành trình với mức phí hợp lý và quyền lợi tối đa.",
    features: ["Chi phí y tế", "Mất hành lý", "Hủy/hoãn chuyến", "Hỗ trợ 24/7"],
  },
  {
    icon: Users,
    title: "Tour theo yêu cầu",
    description:
      "Thiết kế tour riêng theo yêu cầu của khách hàng. Lịch trình linh hoạt, trải nghiệm độc đáo, phù hợp mọi ngân sách.",
    features: ["Lịch trình tùy chỉnh", "Hướng dẫn riêng", "Linh hoạt thời gian", "Trải nghiệm độc đáo"],
  },
]

export default function DichVuPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">DỊCH VỤ DU LỊCH</h1>
            <p className="text-xl text-background/90 max-w-2xl">
              Đa dạng các dịch vụ đi kèm cho cả khách lẻ và khách đoàn
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 font-serif">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Link href="/lien-he">Liên hệ tư vấn</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-serif mb-4">
              Bạn cần tư vấn dịch vụ?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận ưu đãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Gọi ngay: 024 39393539
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/lien-he">Gửi yêu cầu</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  )
}
