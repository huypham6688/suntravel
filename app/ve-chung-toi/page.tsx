import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { Award, Users, MapPin, Calendar, Target, Heart, Lightbulb } from "lucide-react"
import Image from "next/image"

const stats = [
  { number: "15+", label: "Năm kinh nghiệm", icon: Calendar },
  { number: "50,000+", label: "Khách hàng hài lòng", icon: Users },
  { number: "500+", label: "Tour đa dạng", icon: MapPin },
  { number: "20+", label: "Giải thưởng", icon: Award },
]

const values = [
  {
    icon: Target,
    title: "Sứ mệnh",
    description:
        "Mang đến những trải nghiệm du lịch tuyệt vời nhất, giúp khách hàng khám phá thế giới với sự an tâm và hài lòng tuyệt đối.",
  },
  {
    icon: Heart,
    title: "Tận tâm",
    description:
        "Chúng tôi đặt khách hàng làm trung tâm, luôn lắng nghe và thấu hiểu để mang đến dịch vụ tốt nhất có thể.",
  },
  {
    icon: Lightbulb,
    title: "Sáng tạo",
    description:
        "Không ngừng đổi mới, thiết kế những tour du lịch độc đáo, mang đến trải nghiệm khác biệt cho khách hàng.",
  },
]

const partners = [ {
  name: "Emirates",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
},
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  },
]

export default function VeChungToiPage() {
  return (
      <>
        <Header />
        <main>
          {/* Hero */}
          <section className="relative h-[400px] md:h-[500px]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(/doanhnhan.jpg)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-foreground/60" />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">Về Suntravel</h1>
              <p className="text-xl text-background/90 max-w-2xl">
                Hơn 15 năm đồng hành cùng hàng triệu khách hàng trên mọi hành trình khám phá thế giới
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-primary">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary-foreground/80" />
                      <p className="text-4xl md:text-5xl font-bold text-primary-foreground font-serif">{stat.number}</p>
                      <p className="text-primary-foreground/80 mt-2">{stat.label}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-primary font-semibold mb-2">Câu chuyện của chúng tôi</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-6">
                    Hành Trình 15 Năm Cùng Suntravel
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Được thành lập vào năm 2010, Suntravel bắt đầu từ một văn phòng nhỏ tại Hà Nội với đam mê mang đến
                      những trải nghiệm du lịch tuyệt vời cho khách hàng Việt Nam.
                    </p>
                    <p>
                      Trải qua hơn 15 năm phát triển, chúng tôi đã phục vụ hơn 50,000 khách hàng, tổ chức hàng ngàn tour
                      trong và ngoài nước, từ những chuyến đi gia đình ấm cúng đến những hành trình khám phá châu lục.
                    </p>
                    <p>
                      Với đội ngũ nhân viên chuyên nghiệp và tận tâm, Suntravel cam kết mang đến cho bạn những hành trình
                      đáng nhớ nhất, nơi mỗi chuyến đi không chỉ là du lịch mà còn là những kỷ niệm vô giá.
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-3xl overflow-hidden">
                  <Image src="/phu-quoc-island-vietnam-beach-resort.jpg" alt="Suntravel Story" fill className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold mb-2">Giá trị cốt lõi</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">Điều Chúng Tôi Theo Đuổi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                    <div key={index} className="bg-card rounded-2xl p-8 text-center shadow-lg">
                      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4 font-serif">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Đối tác & Khách hàng - THAY THẾ PHẦN ĐỘI NGŨ */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold mb-2">Hợp tác cùng chúng tôi</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                  Đối Tác & Khách Hàng Tin Cậy
                </h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                  Chúng tôi tự hào hợp tác với những hãng hàng không, nền tảng đặt phòng và đối tác du lịch hàng đầu thế giới
                  để mang đến dịch vụ chất lượng cao nhất cho khách hàng.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-10 items-center justify-items-center">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        className="group flex items-center justify-center w-full h-32 bg-muted/50 rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105"
                    >
                      <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={180}
                          height={80}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-secondary-foreground font-serif">Chứng nhận & Giải thưởng</h2>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="w-32 h-32 bg-secondary-foreground/10 rounded-2xl flex items-center justify-center"
                    >
                      <Award className="w-12 h-12 text-secondary-foreground/50" />
                    </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingChat />
      </>
  )
}