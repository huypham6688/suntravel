"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Hương",
    avatar: "/vietnamese-woman-smiling-portrait.jpg",
    location: "Hà Nội",
    rating: 5,
    tour: "Tour Đà Nẵng - Hội An 4N3Đ",
    content:
      "Chuyến đi tuyệt vời! Hướng dẫn viên rất nhiệt tình và am hiểu. Khách sạn sạch sẽ, đồ ăn ngon. Chắc chắn sẽ quay lại với Suntravel.",
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    avatar: "/vietnamese-man-business-portrait.jpg",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    tour: "Tour Thái Lan 5N4Đ",
    content:
      "Lần đầu đi nước ngoài với gia đình, mọi thứ đều được sắp xếp chu đáo. Giá cả hợp lý, dịch vụ chuyên nghiệp. Rất hài lòng!",
  },
  {
    id: 3,
    name: "Lê Thu Trang",
    avatar: "/vietnamese-young-woman-portrait.jpg",
    location: "Đà Nẵng",
    rating: 5,
    tour: "Tour Sapa 3N2Đ",
    content:
      "Cảnh đẹp như mơ, HDV hài hước và rất chăm sóc đoàn. Đặc biệt ấn tượng với lịch trình được thiết kế rất hợp lý, không quá gấp gáp.",
  },
  {
    id: 4,
    name: "Phạm Đức Anh",
    avatar: "/placeholder.svg?height=80&width=80",
    location: "Hải Phòng",
    rating: 5,
    tour: "Tour Phú Quốc 3N2Đ",
    content:
      "Resort 5 sao đúng như quảng cáo, bãi biển đẹp tuyệt vời. Đội ngũ hỗ trợ nhanh chóng khi mình cần đổi lịch. 10 điểm!",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">Khách hàng nói gì</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary ">
            Đánh Giá Từ Khách Hàng
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-card rounded-3xl p-8 shadow-xl flex flex-col ${
                  index > 0 ? "hidden md:flex" : "flex"
                }`}
              >
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/30" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-base text-card-foreground mb-6 leading-relaxed grow">
                  {`"${testimonial.content}"`}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.location}
                    </p>
                    <p className="text-primary text-xs font-medium mt-1">
                      {testimonial.tour}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary w-8" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
