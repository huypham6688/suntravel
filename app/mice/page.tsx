import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroBanner } from "@/components/hero-banner";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Presentation } from "lucide-react";
import { JourneyDiary } from "@/components/sections/journey-diary";
import Partners from "@/components/partners";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

const services = [
  {
    title: "Công tác doanh nghiệp",
    description:
      "Chuyến đi công tác trọn gói với vé máy bay, khách sạn 4-5 sao và hỗ trợ visa.",
    icon: Presentation,
    href: "?category=Công tác doanh nghiệp#journey-diary",
  },
  {
    title: "Hội nghị, hội thảo",
    description:
      "Setup trọn gói âm thanh ánh sáng, sân khấu, backdrop và lễ tân chuyên nghiệp.",
    icon: Sparkles,
    href: "?category=Hội nghị, hội thảo#journey-diary",
  },
  {
    title: "Team Building",
    description:
      "Thiết kế kịch bản team building gắn kết, đo lường KPI rõ ràng cho đội ngũ.",
    icon: Users,
    href: "?category=Team Building#journey-diary",
  },
];

const miceBanners = [
  {
    id: 1,
    title: "Du Lịch MICE Chuyên Nghiệp",
    subtitle: "Kết nối thành công - Nâng tầm vị thế",
    description:
      "Giải pháp tổ chức sự kiện, hội nghị và du lịch khen thưởng trọn gói, đẳng cấp quốc tế cho doanh nghiệp.",
    image: "/banner-mice.jpg",
    cta: "Liên hệ tư vấn",
  },
];

export default function MiceOverviewPage() {
  return (
    <>
      <Header />
      <HeroBanner items={miceBanners} />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Giải Pháp MICE Cho Doanh Nghiệp
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Suntravel thiết kế và vận hành trọn gói hội nghị, hội thảo,
              incentive, team building và sự kiện ra mắt sản phẩm với tiêu chuẩn
              quốc tế.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative bg-white rounded-4xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/10 hover:border-primary/30 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-10 h-10" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-primary font-bold tracking-wide text-sm uppercase group-hover:gap-4 transition-all">
                  Xem chi tiết
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <JourneyDiary />
      <WhyChooseUs />
      <Partners />
      <Footer />
    </>
  );
}
