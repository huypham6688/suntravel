import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import {
  Award,
  Users,
  MapPin,
  Calendar,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";
import Partners from "@/components/partners";
import { DreamDestination } from "@/components/sections/dream-destination";

const stats = [
  { number: "15+", label: "Năm kinh nghiệm", icon: Calendar },
  { number: "50,000+", label: "Khách hàng hài lòng", icon: Users },
  { number: "500+", label: "Tour đa dạng", icon: MapPin },
  { number: "20+", label: "Giải thưởng", icon: Award },
];

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
];

export default function VeChungToiPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
            style={{
              backgroundImage: `url(/doanhnhan.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <div className="relative container mx-auto px-4 z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white  mb-6 drop-shadow-md">
              Về Suntravel
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed">
              Hơn{" "}
              <span className="font-bold text-secondary-foreground">
                20 năm
              </span>{" "}
              đồng hành cùng hàng triệu khách hàng trên mọi hành trình khám phá
              thế giới.
            </p>
          </div>
        </section>

        {/* Stats - Redesigned: White BG, Blue Text, Red Icons */}
        <section className="py-12 bg-white border-b border-primary/5 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-dashed divide-primary/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center px-4 group">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 transition-all duration-300 group-hover:text-red-600 group-hover:scale-125">
                    {index === 0 ? "20+" : stat.number}
                  </p>
                  <p className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro & History - Clean & Typography Focused */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                    Giới thiệu chung
                  </span>
                  <h2 className="text-4xl font-bold text-primary  mb-6 relative inline-block">
                    Định Vị & Phát Triển
                  </h2>
                  <p className="text-foreground/80 text-lg leading-relaxed text-justify">
                    Không chỉ đem lại những{" "}
                    <strong className="text-secondary">
                      ĐIỂM ĐẾN TRONG MƠ
                    </strong>
                    , trên hành trình phát triển, Suntravel định vị và luôn
                    hướng tới chính mình trở thành một{" "}
                    <span className="italic">"điểm đến"</span> phù hợp và tốt
                    nhất với khách hàng từ dịch vụ, con người đến chất lượng,
                    chi phí.
                  </p>
                </div>

                <div className="bg-blue-50/50 p-8 rounded-2xl border-l-4 border-primary">
                  <h3 className="text-2xl font-bold text-foreground  mb-4 flex items-center gap-3">
                    <span className="text-primary text-3xl">❝</span>
                    Uy tín dẫn đường, tận tâm theo bước
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Trải qua hơn 20 năm xây dựng và phát triển, Suntravel là một
                    trong những doanh nghiệp du lịch và tổ chức sự kiện có uy
                    tín hàng đầu hiện nay.
                  </p>
                </div>
              </div>

              <div className="relative h-150 rounded-[2rem] overflow-hidden shadow-2xl group">
                <Image
                  src="/about.png"
                  alt="Suntravel Story"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-2xl  font-bold mb-2">Hành trình 20 năm</p>
                  <p className="opacity-90">
                    Kiến tạo những kỷ niệm vô giá cho hàng triệu khách hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Motto - Redesigned Section */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          {/* Decor Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {[
                {
                  icon: Award,
                  title: "SỨ MỆNH",
                  description:
                    "Cung cấp giải pháp, sản phẩm và dịch vụ chất lượng cao. Thỏa mãn nhu cầu đa dạng của khách hàng trong nước và quốc tế với sự chuyên nghiệp cao nhất.",
                },
                {
                  icon: Target,
                  title: "TÔN CHỈ",
                  description:
                    '"Uy tín dẫn đường, tận tâm theo bước"\nLấy khách hàng làm trung tâm. Phục vụ khách hàng một cách tận tâm, nhiệt thành và đầy trách nhiệm.',
                },
                {
                  icon: Lightbulb,
                  title: "TẦM NHÌN",
                  description:
                    "Phấn đấu trở thành doanh nghiệp hàng đầu trong các lĩnh vực tổ chức sự kiện, lữ hành, vé máy bay và các dịch vụ đi kèm.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary hover:border-red-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                    <item.icon className="w-32 h-32 text-red-500" />
                  </div>

                  <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 relative z-10">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-red-600 transition-colors relative z-10">
                    {item.title}
                  </h3>
                  <div className="h-1 w-12 bg-primary/20 group-hover:bg-red-500 group-hover:w-20 mb-6 transition-all duration-300 rounded-full relative z-10"></div>
                  <p className="text-muted-foreground leading-relaxed flex-grow whitespace-pre-line relative z-10">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operating Principles - Clean List Design */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 text-white bg-primary rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 w-[500px] h-full bg-secondary/10 skew-x-12 translate-x-20"></div>

              <div className="p-12 md:w-[36%] relative z-10 flex flex-col justify-center border-r border-white/10">
                <h3 className="text-4xl font-bold  mb-6">
                  TÔN CHỈ
                  <br />
                  HOẠT ĐỘNG
                </h3>
                <p className="opacity-90 leading-relaxed mb-8">
                  Cam kết cốt lõi của chúng tôi đối với các bên liên quan, đảm
                  bảo sự phát triển bền vững và thịnh vượng.
                </p>
                <div className="w-20 h-2 bg-secondary rounded-full"></div>
              </div>

              <div className="p-12 md:w-2/3 grid grid-cols-1 gap-8 relative z-10">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">
                      Đối với Khách hàng
                    </h4>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Mang lại giá trị và lợi ích bền vững. Tiếp cận mới và hiện
                      đại để mang đến sự hài lòng tuyệt đối.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">
                      Đối với Nhân viên
                    </h4>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Xây dựng môi trường làm việc hiệu quả, văn hóa gắn kết.
                      Phát huy tối đa nguồn nhân lực.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">
                      Đối với Cộng đồng
                    </h4>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Tích cực đóng góp vào sự phát triển chung. Bảo tồn di sản
                      văn hóa và giá trị xã hội.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fields of Activity - Grid with Hover Effects */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-white/80 font-bold tracking-widest uppercase text-sm">
                Quy mô phát triển
              </span>
              <h2 className="text-4xl font-bold text-white mt-2">
                LĨNH VỰC HOẠT ĐỘNG
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
              {[
                "Dịch vụ lữ hành quốc tế và nội địa chuyên nghiệp",
                "Dịch vụ vé máy bay",
                "Tổ chức hội nghị, hội thảo, xúc tiến thương mại",
                "Định hướng nghề nghiệp & Team building",
                "Dịch vụ vận chuyển hành khách và hàng hoá",
              ].map((field, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-white/20 overflow-hidden hover:scale-105"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[4rem] group-hover:from-secondary/10 transition-colors"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <span className="text-5xl font-bold text-red-500 mb-4 transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors flex-grow">
                      {field}
                    </h4>
                  </div>
                </div>
              ))}

              {/* Decorative Box */}
              <div className="flex items-center justify-center p-8 rounded-2xl border-2 border-dashed border-white/30 bg-white/10">
                <p className="text-white font-semibold text-center">
                  Và nhiều dịch vụ mở rộng khác...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dream Destination */}
        <DreamDestination />
        {/* Partners */}
        <Partners />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
