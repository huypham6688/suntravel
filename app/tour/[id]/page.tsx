import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin,
  Clock,
  Star,
  Users,
  Calendar,
  Check,
  X,
  Phone,
  MessageCircle,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - trong thực tế sẽ fetch từ database
const toursData: Record<string, Tour> = {
  "1": {
    id: "1",
    title: "Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
    location: "Đà Nẵng, Việt Nam",
    duration: "4 ngày 3 đêm",
    price: 4990000,
    originalPrice: 5990000,
    rating: 4.9,
    reviews: 234,
    image: "/da-nang-golden-bridge-tour.jpg",
    badge: "Best Seller",
    maxPeople: 20,
    description:
      "Khám phá vẻ đẹp miền Trung với tour Đà Nẵng - Hội An - Bà Nà Hills. Trải nghiệm Cầu Vàng nổi tiếng thế giới, phố cổ Hội An lung linh về đêm và nhiều điểm đến hấp dẫn khác.",
    highlights: [
      "Tham quan Cầu Vàng - biểu tượng du lịch Việt Nam",
      "Khám phá phố cổ Hội An về đêm",
      "Trải nghiệm Bà Nà Hills với nhiều trò chơi hấp dẫn",
      "Tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh",
      "Thưởng thức ẩm thực đặc sản miền Trung",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Đà Nẵng - Bà Nà Hills",
        description:
          "Đón khách tại sân bay Đà Nẵng, di chuyển đến Bà Nà Hills. Tham quan Cầu Vàng, vườn hoa Le Jardin D'Amour, làng Pháp. Tối check-in khách sạn tại Đà Nẵng.",
      },
      {
        day: 2,
        title: "Đà Nẵng City Tour",
        description:
          "Tham quan Ngũ Hành Sơn, làng đá Non Nước, bán đảo Sơn Trà - ngắm voọc chà vá chân nâu. Chiều tự do tắm biển Mỹ Khê.",
      },
      {
        day: 3,
        title: "Đà Nẵng - Hội An",
        description:
          "Di chuyển đến Hội An, tham quan phố cổ: Chùa Cầu, nhà cổ Tấn Ký, hội quán Phúc Kiến. Tối thả đèn hoa đăng trên sông Hoài.",
      },
      {
        day: 4,
        title: "Hội An - Đà Nẵng - Hà Nội",
        description:
          "Sáng tự do mua sắm tại chợ Hội An. Trưa di chuyển ra sân bay Đà Nẵng, bay về Hà Nội. Kết thúc tour.",
      },
    ],
    includes: [
      "Vé máy bay khứ hồi Hà Nội - Đà Nẵng",
      "Khách sạn 4 sao (2 người/phòng)",
      "Xe đưa đón tham quan theo chương trình",
      "Vé tham quan các điểm trong chương trình",
      "Hướng dẫn viên suốt tuyến",
      "Bảo hiểm du lịch",
      "Các bữa ăn theo chương trình",
    ],
    excludes: ["Chi phí cá nhân", "Đồ uống trong các bữa ăn", "Tip cho HDV và lái xe", "Phụ thu phòng đơn: 1.500.000đ"],
    gallery: [
      "/da-nang-golden-bridge-tour.jpg",
      "/hoi-an-ancient-town-night.jpg",
      "/ba-na-hills-castle.jpg",
      "/my-khe-beach-danang.jpg",
    ],
    departureDate: ["05/04/2025", "12/04/2025", "19/04/2025", "26/04/2025"],
    category: "trong-nuoc",
  },
  "2": {
    id: "2",
    title: "Phú Quốc - Đảo Ngọc 4N3Đ",
    location: "Phú Quốc, Việt Nam",
    duration: "4 ngày 3 đêm",
    price: 5490000,
    originalPrice: 6490000,
    rating: 4.8,
    reviews: 189,
    image: "/phu-quoc-sunset-beach-resort.jpg",
    badge: "Hot",
    maxPeople: 25,
    description:
      "Khám phá đảo ngọc Phú Quốc với những bãi biển hoang sơ, làn nước trong xanh và hệ sinh thái đa dạng. Tour bao gồm tham quan các điểm nổi tiếng và trải nghiệm ẩm thực hải sản tươi ngon.",
    highlights: [
      "Tham quan VinWonders Phú Quốc",
      "Khám phá Grand World - thành phố không ngủ",
      "Lặn ngắm san hô tại Hòn Thơm",
      "Thưởng thức hải sản tươi sống",
      "Check-in Sunset Sanato đẹp lung linh",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội/HCM - Phú Quốc",
        description:
          "Đón khách tại sân bay Phú Quốc, check-in khách sạn. Chiều tự do tắm biển. Tối khám phá chợ đêm Phú Quốc.",
      },
      {
        day: 2,
        title: "Nam Đảo - Hòn Thơm",
        description:
          "Trải nghiệm cáp treo Hòn Thơm - cáp treo vượt biển dài nhất thế giới. Tham quan Aquatopia Water Park, lặn ngắm san hô.",
      },
      {
        day: 3,
        title: "Bắc Đảo Tour",
        description:
          "Tham quan VinWonders Phú Quốc, Safari Phú Quốc. Tối khám phá Grand World với show nhạc nước và Venice thu nhỏ.",
      },
      {
        day: 4,
        title: "Phú Quốc - Hà Nội/HCM",
        description: "Sáng tự do mua sắm đặc sản. Trưa ra sân bay về Hà Nội/HCM. Kết thúc tour.",
      },
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn 4 sao",
      "Xe đưa đón theo chương trình",
      "Vé tham quan",
      "HDV suốt tuyến",
      "Bảo hiểm du lịch",
      "Bữa ăn theo chương trình",
    ],
    excludes: ["Chi phí cá nhân", "Đồ uống", "Tip HDV và lái xe", "Phụ thu phòng đơn"],
    gallery: ["/phu-quoc-sunset-beach-resort.jpg", "/hon-thom-cable-car.jpg", "/vinwonders-phu-quoc.jpg"],
    departureDate: ["06/04/2025", "13/04/2025", "20/04/2025"],
    category: "trong-nuoc",
  },
  "3": {
    id: "3",
    title: "Singapore - Sentosa 4N3Đ",
    location: "Singapore",
    duration: "4 ngày 3 đêm",
    price: 12990000,
    originalPrice: 14990000,
    rating: 4.9,
    reviews: 156,
    image: "/singapore-marina-bay-night.jpg",
    badge: "Được yêu thích",
    maxPeople: 20,
    description:
      "Khám phá đảo quốc sư tử với kiến trúc hiện đại, ẩm thực đa dạng và những công trình biểu tượng. Tour bao gồm Universal Studios, Gardens by the Bay và nhiều điểm đến hấp dẫn.",
    highlights: [
      "Vui chơi tại Universal Studios Singapore",
      "Ngắm siêu cây tại Gardens by the Bay",
      "Check-in Marina Bay Sands",
      "Thưởng thức ẩm thực đường phố Hawker",
      "Mua sắm tại Orchard Road",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Singapore",
        description: "Bay đến Singapore, check-in khách sạn. Tối khám phá Marina Bay, xem show Wonder Full.",
      },
      {
        day: 2,
        title: "Sentosa Island",
        description:
          "Cả ngày vui chơi tại Universal Studios Singapore với hơn 24 trò chơi cảm giác mạnh và show diễn đặc sắc.",
      },
      {
        day: 3,
        title: "City Tour Singapore",
        description:
          "Tham quan Merlion Park, Gardens by the Bay, Marina Bay Sands SkyPark. Chiều shopping tại Orchard Road.",
      },
      {
        day: 4,
        title: "Singapore - Hà Nội",
        description: "Sáng tự do. Trưa ra sân bay về Hà Nội. Kết thúc tour.",
      },
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn 4 sao",
      "Vé Universal Studios",
      "Vé Gardens by the Bay",
      "HDV tiếng Việt",
      "Bảo hiểm du lịch",
    ],
    excludes: ["Visa Singapore", "Chi phí cá nhân", "Tip HDV", "Bữa ăn tự túc"],
    gallery: ["/singapore-marina-bay-night.jpg", "/universal-studios-singapore.jpg", "/gardens-by-the-bay.jpg"],
    departureDate: ["10/04/2025", "24/04/2025", "08/05/2025"],
    category: "nuoc-ngoai",
  },
  "4": {
    id: "4",
    title: "Thái Lan - Bangkok - Pattaya 5N4Đ",
    location: "Thái Lan",
    duration: "5 ngày 4 đêm",
    price: 8990000,
    originalPrice: 10990000,
    rating: 4.7,
    reviews: 312,
    image: "/thailand-bangkok-temple-golden.jpg",
    badge: "Sale",
    maxPeople: 30,
    description:
      "Hành trình khám phá xứ sở chùa vàng với những ngôi đền linh thiêng, ẩm thực độc đáo và cuộc sống về đêm sôi động tại Bangkok và Pattaya.",
    highlights: [
      "Tham quan Hoàng Cung và chùa Phật Ngọc",
      "Trải nghiệm chợ nổi Damnoen Saduak",
      "Xem show Alcazar nổi tiếng tại Pattaya",
      "Khám phá đảo Coral",
      "Mua sắm tại Icon Siam",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Bangkok",
        description: "Bay đến Bangkok, check-in khách sạn. Tối tự do khám phá Khao San Road.",
      },
      {
        day: 2,
        title: "Bangkok City Tour",
        description: "Tham quan Hoàng Cung, chùa Phật Ngọc, chùa Phật Nằm. Chiều mua sắm tại Icon Siam.",
      },
      {
        day: 3,
        title: "Bangkok - Pattaya",
        description: "Sáng tham quan chợ nổi. Di chuyển đến Pattaya, check-in khách sạn. Tối xem show Alcazar.",
      },
      {
        day: 4,
        title: "Đảo Coral",
        description: "Cả ngày tham quan đảo Coral, tắm biển, các môn thể thao dưới nước.",
      },
      {
        day: 5,
        title: "Pattaya - Bangkok - Hà Nội",
        description: "Di chuyển về Bangkok, mua sắm tại King Power. Ra sân bay về Hà Nội.",
      },
    ],
    includes: ["Vé máy bay khứ hồi", "Khách sạn 4 sao", "Xe đưa đón", "Vé tham quan", "HDV tiếng Việt", "Bảo hiểm"],
    excludes: ["Visa Thái Lan", "Chi phí cá nhân", "Tip HDV", "Một số bữa ăn"],
    gallery: ["/thailand-bangkok-temple-golden.jpg", "/pattaya-beach.jpg", "/floating-market-bangkok.jpg"],
    departureDate: ["08/04/2025", "15/04/2025", "22/04/2025", "29/04/2025"],
    category: "nuoc-ngoai",
  },
}

interface Tour {
  id: string
  title: string
  location: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  maxPeople?: number
  description: string
  highlights: string[]
  itinerary: { day: number; title: string; description: string }[]
  includes: string[]
  excludes: string[]
  gallery: string[]
  departureDate: string[]
  category: string
}

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tour = toursData[id]

  if (!tour) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={tour.category === "trong-nuoc" ? "/du-lich-trong-nuoc" : "/du-lich-nuoc-ngoai"}
              className="hover:text-primary transition-colors"
            >
              {tour.category === "trong-nuoc" ? "Du lịch trong nước" : "Du lịch nước ngoài"}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{tour.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-6">
              <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
              {tour.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-base px-4 py-2">
                  {tour.badge}
                </Badge>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Gallery thumbnails */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {tour.gallery.map((img, index) => (
                <div key={index} className="relative h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                  <Image
                    src={img || "/placeholder.svg?height=80&width=120&query=tour destination"}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Tour Info */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-serif">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Tối đa {tour.maxPeople} người</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{tour.rating}</span>
                  <span>({tour.reviews} đánh giá)</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="highlights" className="mb-8">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="highlights"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Điểm nổi bật
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Lịch trình
                </TabsTrigger>
                <TabsTrigger
                  value="includes"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Bao gồm
                </TabsTrigger>
              </TabsList>

              <TabsContent value="highlights" className="mt-6">
                <ul className="space-y-3">
                  {tour.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <div className="space-y-6">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-0">
                      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px]" />
                      <div className="bg-card p-4 rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2">
                          Ngày {day.day}: {day.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="includes" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      Bao gồm
                    </h4>
                    <ul className="space-y-2">
                      {tour.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      Không bao gồm
                    </h4>
                    <ul className="space-y-2">
                      {tour.excludes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  {tour.originalPrice && (
                    <span className="text-muted-foreground line-through text-lg">
                      {tour.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                  {tour.originalPrice && (
                    <Badge variant="destructive">-{Math.round((1 - tour.price / tour.originalPrice) * 100)}%</Badge>
                  )}
                </div>
                <p className="text-primary text-3xl font-bold">{tour.price.toLocaleString("vi-VN")}đ</p>
                <span className="text-muted-foreground text-sm">/người</span>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Ngày khởi hành
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tour.departureDate.map((date, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {date}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3" size="lg">
                Đặt Tour Ngay
              </Button>

              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                size="lg"
              >
                Yêu cầu báo giá
              </Button>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">Liên hệ tư vấn trực tiếp:</p>
                <div className="space-y-3">
                  <a
                    href="tel:0903287313"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Ms. Quyên</p>
                      <p className="text-sm text-muted-foreground">0903.287.313</p>
                    </div>
                  </a>
                  <a
                    href="tel:0974248805"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Ms. Hồng Anh</p>
                      <p className="text-sm text-muted-foreground">0974.248.805</p>
                    </div>
                  </a>
                  <a
                    href="https://zalo.me/0903287313"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Chat Zalo</p>
                      <p className="text-sm text-muted-foreground">Tư vấn nhanh 24/7</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
