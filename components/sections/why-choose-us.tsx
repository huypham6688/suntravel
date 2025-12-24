import {
  Shield,
  Clock,
  HeadphonesIcon,
  Award,
  Heart,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "An toàn tuyệt đối",
    description:
      "Cam kết đảm bảo an toàn cho khách hàng trong suốt hành trình với bảo hiểm du lịch toàn diện.",
  },
  {
    icon: Clock,
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ tư vấn viên luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi trong suốt chuyến đi.",
  },
  {
    icon: Award,
    title: "Chất lượng hàng đầu",
    description:
      "Hơn 15 năm kinh nghiệm với hàng nghìn tour thành công và khách hàng hài lòng.",
  },
  {
    icon: Wallet,
    title: "Giá cả hợp lý",
    description:
      "Cam kết giá tốt nhất thị trường với nhiều ưu đãi hấp dẫn cho khách hàng thân thiết.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dịch vụ chuyên nghiệp",
    description:
      "Hướng dẫn viên giàu kinh nghiệm, thông thạo nhiều ngôn ngữ và am hiểu văn hóa địa phương.",
  },
  {
    icon: Heart,
    title: "Trải nghiệm độc đáo",
    description:
      "Tour thiết kế riêng biệt, mang đến những trải nghiệm khác biệt và đáng nhớ.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20  bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-white font-bold tracking-widest uppercase text-sm mb-2">
            Suntravel
          </p>
          <h2 className="text-3xl md:text-4xl font-bold  mb-4 text-white">
            Vì Sao Bạn Nên Chọn Chúng Tôi?
          </h2>
          <p className="text-white max-w-2xl mx-auto leading-relaxed">
            Với hơn 20 năm kinh nghiệm trong ngành du lịch, chúng tôi tự hào
            mang đến những hành trình tuyệt vời nhất cho bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3  text-secondary group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
