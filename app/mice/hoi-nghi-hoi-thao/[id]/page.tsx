import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Star, Phone, Mail, CheckCircle, Presentation, Lightbulb, Coffee } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Home } from "lucide-react"

const conferenceDetails: Record<
    string,
    {
      title: string
      location: string
      duration: string
      capacity: string
      price: string
      rating: number
      reviews: number
      badge?: string
      description: string
      highlights: string[]
      included: string[]
    }
> = {
  "hoi-nghi-khach-hang": {
    title: "Hội Nghị Khách Hàng Toàn Quốc",
    location: "Hà Nội • Đà Nẵng • TP.HCM",
    duration: "1 - 2 ngày",
    capacity: "100 - 800 khách",
    price: "Gói trọn gói, liên hệ tư vấn",
    rating: 4.9,
    reviews: 48,
    badge: "Hot",
    description: "Sự kiện tri ân và vinh danh khách hàng lớn nhất năm với không gian ballroom sang trọng, sân khấu chuyên nghiệp, chương trình được thiết kế riêng để truyền tải thông điệp doanh nghiệp một cách ấn tượng nhất.",
    highlights: [
      "Không gian ballroom 4-5 sao với màn LED P3/P4 cao cấp",
      "Kịch bản chương trình vinh danh, trao giải, tri ân khách hàng",
      "Tea-break cao cấp & buffet/gala dinner theo yêu cầu",
      "Hiệu ứng ánh sáng, âm thanh sống động",
    ],
    included: [
      "Tư vấn concept, kịch bản & ý tưởng chương trình",
      "Thiết kế thi công backdrop, photobooth, standee",
      "Âm thanh, ánh sáng chuyên nghiệp, màn hình LED",
      "MC chuyên nghiệp, PG, quay phim – chụp ảnh – flycam",
      "Quà tặng khách mời & hỗ trợ kỹ thuật suốt sự kiện",
      "Hỗ trợ 24/7 từ đội ngũ tổ chức",
    ],
  },
  "kick-off-sales": {
    title: "Kick-off Sales & Ra Mắt Sản Phẩm Mới",
    location: "Toàn quốc (tại văn phòng hoặc khách sạn 4-5 sao)",
    duration: "Nửa ngày - 1 ngày",
    capacity: "50 - 500 khách",
    price: "Thiết kế theo ngân sách doanh nghiệp",
    rating: 4.8,
    reviews: 36,
    badge: "Mới",
    description: "Sự kiện khởi động năm kinh doanh mới hoặc ra mắt sản phẩm với năng lượng bùng nổ, kết hợp trình chiếu chuyên nghiệp, minigame tương tác và livestream đa nền tảng.",
    highlights: [
      "Trình chiếu sản phẩm 3D/demo trực tiếp trên sân khấu",
      "Minigame tương tác, bốc thăm trúng thưởng hấp dẫn",
      "Livestream song song Facebook/YouTube/TikTok",
      "Key visual ấn tượng, slide trình chiếu chuyên nghiệp",
    ],
    included: [
      "Tư vấn chủ đề & kịch bản MC chi tiết",
      "Thiết kế key visual, slide, video teaser",
      "Âm thanh ánh sáng, LED backdrop hiện đại",
      "Nhân sự kỹ thuật, MC, PG & điều phối viên",
      "Quà tặng nhân viên & giải thưởng minigame",
      "Hỗ trợ 24/7",
    ],
  },
  "hoi-thao-chuyen-de": {
    title: "Hội Thảo Chuyên Đề & Đào Tạo Nội Bộ",
    location: "Khách sạn/Resort 4-5 sao toàn quốc",
    duration: "1 ngày",
    capacity: "30 - 200 khách",
    price: "Gói tiêu chuẩn / nâng cao, liên hệ",
    rating: 4.7,
    reviews: 22,
    description: "Chương trình đào tạo chuyên sâu hoặc hội thảo chuyên đề với không gian yên tĩnh, setup linh hoạt, tập trung tối đa vào nội dung truyền đạt và tương tác giữa diễn giả - học viên.",
    highlights: [
      "Không gian hội trường trang nhã, yên tĩnh",
      "Setup bàn classroom/U-shape/theater theo yêu cầu",
      "Tea-break giữa giờ & ăn trưa set menu/buffet",
      "Hỗ trợ tài liệu in ấn & ghi chép",
    ],
    included: [
      "Setup phòng họp theo layout mong muốn",
      "Máy chiếu, micro không dây, flipchart, bảng trắng",
      "Trà, café, bánh ngọt teabreak cao cấp",
      "Ăn trưa tại nhà hàng khách sạn",
      "Nhân sự kỹ thuật trực suốt chương trình",
      "Hỗ trợ 24/7",
    ],
  },
}

export default async function ConferenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = conferenceDetails[id]

  if (!data) {
    return (
        <>
          <Header />
          <section className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
              <div className="mx-auto mb-8 w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <Presentation className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Chương trình không tồn tại</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
                Rất tiếc, dịch vụ hội nghị/hội thảo bạn đang tìm không tồn tại hoặc đã kết thúc.<br /> Hãy khám phá các dịch vụ khác!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/mice/hoi-nghi-hoi-thao">
                    <Presentation className="mr-2 h-5 w-5" /> Các dịch vụ Hội nghị - Hội thảo
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" /> Về trang chủ
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <Footer />
        </>
    )
  }

  // Hero image theo từng chương trình
  const heroImageUrl =
      id === "hoi-nghi-khach-hang"
          ? "https://landmark72.intercontinental.com/wp-content/uploads/intercontinental-hanoi-grand-ballroom-event-venue.jpg" // image:3
          : id === "kick-off-sales"
              ? "https://media.rheemsingapore.com/blobazrheem/wp-content/uploads/sites/47/2023/12/RAD-58-scaled.jpg" // image:14
              : "https://grandfresa-saigon.sotetsu-hotels.com/banquet/img/slide/1.webp" // image:18

  return (
      <>
        <Header />

        {/* Hero Section */}
        <section className="relative h-96 md:h-[80vh] overflow-hidden">
          <Image
              src={heroImageUrl}
              alt={data.title}
              fill
              className="object-cover"
              priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
            {data.badge && <Badge className="mb-4 text-lg px-4 py-1">{data.badge}</Badge>}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{data.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                {data.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                {data.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                {data.capacity}
              </div>
              {data.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    {data.rating} ({data.reviews} đánh giá)
                  </div>
              )}
            </div>
          </div>
        </section>

        {/* Nội dung chính */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Left: Mô tả, Điểm nổi bật, Dịch vụ bao gồm */}
              <div className="md:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 font-serif">Mô tả dịch vụ</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{data.description}</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-8 font-serif flex items-center gap-3">
                    <Lightbulb className="h-8 w-8 text-primary" />
                    Điểm nổi bật chương trình
                  </h2>
                  <ul className="space-y-4">
                    {data.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-8 font-serif flex items-center gap-3">
                    <Presentation className="h-8 w-8 text-primary" />
                    Dịch vụ bao gồm
                  </h2>
                  <ul className="space-y-4">
                    {data.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar: Giá & Liên hệ */}
              <div className="bg-card p-8 rounded-2xl shadow-lg h-fit">
                <div className="mb-8">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{data.price}</p>
                </div>
                <div className="space-y-4">
                  <Button className="w-full text-lg" size="lg">
                    <Phone className="mr-2 h-5 w-5" /> Gọi ngay: 024 3939 3539
                  </Button>
                  <Button variant="outline" className="w-full text-lg" size="lg">
                    <Mail className="mr-2 h-5 w-5" /> Yêu cầu báo giá chi tiết
                  </Button>
                </div>
              </div>
            </div>

            {/* Gallery hoạt động thực tế */}
            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-serif">
                Hình ảnh sự kiện thực tế
              </h2>
              <div className="grid md:grid-cols-3 gap-8">


              </div>
            </div>

            {/* Gallery dịch vụ chuyên nghiệp */}
            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-serif flex items-center justify-center gap-3">
                <Coffee className="h-8 w-8 text-primary" />
                Trải nghiệm dịch vụ chuyên nghiệp
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">


                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                    <h3 className="text-xl font-semibold">Sân khấu LED hiện đại & ánh sáng chuyên nghiệp</h3>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">


                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                    <h3 className="text-xl font-semibold">MC & nhân sự sự kiện giàu kinh nghiệm</h3>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">


                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                    <h3 className="text-xl font-semibold">Tea-break & tiệc buffet cao cấp</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
  )
}