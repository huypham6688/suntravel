"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

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
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">Khách hàng nói gì</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">Đánh Giá Từ Khách Hàng</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl">
            <Quote className="w-12 h-12 text-primary/30 mb-6" />

            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-lg md:text-xl text-card-foreground mb-8 leading-relaxed">
              {`"${testimonials[currentIndex].content}"`}
            </p>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground font-serif">{testimonials[currentIndex].name}</h4>
                <p className="text-muted-foreground text-sm">{testimonials[currentIndex].location}</p>
                <p className="text-primary text-sm font-medium">{testimonials[currentIndex].tour}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
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
  )
}
