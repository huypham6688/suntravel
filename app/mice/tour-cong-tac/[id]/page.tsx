import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Phone, Mail, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

// Dữ liệu chi tiết tour (đầy đủ 6 tour)
const tourDetails: Record<
  string,
  {
    title: string;
    location: string;
    duration: string;
    price: number | string;
    originalPrice?: number;
    rating: number;
    reviews: number;
    badge?: string;
    description: string;
    itinerary: string[];
    included: string[];
  }
> = {
  "singapore-malaysia": {
    title: "Tour Công Tác Singapore - Malaysia",
    location: "Singapore • Malaysia",
    duration: "5 ngày 4 đêm",
    price: 28000000,
    originalPrice: 35000000,
    rating: 4.9,
    reviews: 89,
    badge: "Hot",
    description:
      "Hành trình công tác kết hợp hoàn hảo giữa trung tâm tài chính Singapore và thủ đô sôi động Kuala Lumpur. Lý tưởng cho các cuộc họp đối tác, hội nghị khu vực Đông Nam Á.",
    itinerary: [
      "Ngày 1: Hà Nội/Sài Gòn → Singapore – Đưa đón sân bay VIP, nhận phòng khách sạn 5 sao.",
      "Ngày 2: Họp đối tác tại khu Marina Bay – Xe riêng + hỗ trợ thông dịch.",
      "Ngày 3: Singapore → Kuala Lumpur (chuyến bay ngắn) – Tham quan & họp hành.",
      "Ngày 4: Công tác tự do tại KL – Hỗ trợ đặt phòng họp hoặc event nhỏ.",
      "Ngày 5: Kuala Lumpur → Hà Nội/Sài Gòn – Kết thúc chuyến đi.",
    ],
    included: [
      "Vé máy bay khứ hồi hạng thương gia",
      "Khách sạn 4-5 sao trung tâm thành phố",
      "Xe riêng đưa đón sân bay & di chuyển theo lịch",
      "Hỗ trợ visa nhanh (nếu cần)",
      "Bảo hiểm du lịch toàn cầu",
      "Hỗ trợ 24/7 từ đội ngũ Suntravel",
    ],
  },
  "nhat-ban": {
    title: "Tour Công Tác Nhật Bản",
    location: "Tokyo • Osaka",
    duration: "7 ngày 6 đêm",
    price: 65000000,
    originalPrice: 75000000,
    rating: 4.8,
    reviews: 156,
    badge: "Mới",
    description:
      "Khám phá hai trung tâm kinh tế lớn nhất Nhật Bản với lịch trình tối ưu cho doanh nghiệp. Hỗ trợ thông dịch và kết nối đối tác địa phương.",
    itinerary: [
      "Ngày 1-3: Tokyo – Họp đối tác tại khu Shibuya/Shinjuku, thăm các tập đoàn lớn.",
      "Ngày 4: Di chuyển Shinkansen đến Osaka.",
      "Ngày 5-6: Công tác tại Osaka – Hỗ trợ đặt phòng họp & networking.",
      "Ngày 7: Osaka → Hà Nội/Sài Gòn.",
    ],
    included: [
      "Vé máy bay hạng thương gia Vietnam Airlines/JAL",
      "Khách sạn trung tâm Tokyo & Osaka",
      "Vé Shinkansen khứ hồi",
      "Thông dịch viên tiếng Nhật (nửa ngày)",
      "Hỗ trợ visa Nhật Bản",
      "Hỗ trợ 24/7",
    ],
  },
  "chau-au": {
    title: "Tour Công Tác Châu Âu (Đức - Pháp)",
    location: "Frankfurt • Paris",
    duration: "10 ngày 9 đêm",
    price: 120000000,
    rating: 5.0,
    reviews: 45,
    description:
      "Hành trình công tác cao cấp đến hai trung tâm tài chính châu Âu. Phù hợp cho lãnh đạo cấp cao và đoàn doanh nghiệp lớn.",
    itinerary: [
      "Ngày 1-4: Frankfurt – Công tác tại trung tâm tài chính Đức.",
      "Ngày 5: Di chuyển TGV cao tốc đến Paris.",
      "Ngày 6-9: Họp hành & networking tại Paris.",
      "Ngày 10: Paris → Hà Nội/Sài Gòn.",
    ],
    included: [
      "Vé hạng thương gia Lufthansa/Air France",
      "Khách sạn 5 sao suite phòng",
      "Xe Mercedes riêng suốt hành trình",
      "Visa Schengen ưu tiên",
      "Hỗ trợ tổ chức hội nghị nhỏ",
      "Hỗ trợ 24/7",
    ],
  },
  "han-quoc": {
    title: "Tour Công Tác Hàn Quốc",
    location: "Seoul",
    duration: "4 ngày 3 đêm",
    price: 22000000,
    originalPrice: 28000000,
    rating: 4.7,
    reviews: 112,
    badge: "Deal hời",
    description:
      "Chuyến công tác ngắn ngày đến thủ đô công nghệ Seoul. Tiết kiệm thời gian nhưng vẫn đảm bảo tiện nghi cao cấp.",
    itinerary: [
      "Ngày 1: Hà Nội/Sài Gòn → Seoul – Đưa đón sân bay.",
      "Ngày 2-3: Lịch họp đối tác tại Gangnam/Myeongdong.",
      "Ngày 4: Seoul → Hà Nội/Sài Gòn.",
    ],
    included: [
      "Vé hạng thương gia",
      "Khách sạn Lotte hoặc khu trung tâm",
      "Xe riêng & hướng dẫn viên",
      "Visa Hàn miễn phí (hộ chiếu Việt Nam)",
      "Hỗ trợ 24/7",
    ],
  },
  "thai-lan": {
    title: "Tour Công Tác Thái Lan",
    location: "Bangkok",
    duration: "3 ngày 2 đêm",
    price: 15000000,
    originalPrice: 19000000,
    rating: 4.6,
    reviews: 201,
    description:
      "Tour công tác ngắn, chi phí hợp lý đến Bangkok – trung tâm kinh doanh Đông Nam Á.",
    itinerary: [
      "Ngày 1: Hà Nội/Sài Gòn → Bangkok.",
      "Ngày 2: Công tác tại khu Silom/Sathorn.",
      "Ngày 3: Bangkok → Hà Nội/Sài Gòn.",
    ],
    included: [
      "Vé máy bay phổ thông nâng cấp",
      "Khách sạn 4-5 sao ven sông",
      "Xe đưa đón sân bay",
      "Hỗ trợ 24/7",
    ],
  },
  my: {
    title: "Tour Công Tác Mỹ (New York - Washington)",
    location: "New York • Washington D.C.",
    duration: "12 ngày 11 đêm",
    price: "Liên hệ",
    rating: 4.9,
    reviews: 34,
    badge: "Cao cấp",
    description:
      "Tour cao cấp dành cho lãnh đạo doanh nghiệp đến hai thành phố quan trọng nhất nước Mỹ. Hỗ trợ visa & kết nối riêng.",
    itinerary: [
      "Ngày 1-6: New York – Họp đối tác tại Wall Street/Manhattan.",
      "Ngày 7: Di chuyển đến Washington D.C.",
      "Ngày 8-11: Công tác tại thủ đô.",
      "Ngày 12: Washington → Hà Nội/Sài Gòn.",
    ],
    included: [
      "Vé hạng nhất/thương gia",
      "Khách sạn cao cấp Manhattan",
      "Xe limousine riêng",
      "Hỗ trợ visa Mỹ",
      "Đội ngũ hỗ trợ riêng",
    ],
  },
};

export default async function TourDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = tourDetails[id];

  if (!tour) {
    return (
      <>
        <Header />
        <section className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <div className="mx-auto mb-8 w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
              Tour không tồn tại
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
              Rất tiếc, tour bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
              <br />
              Hãy khám phá các tour khác của chúng tôi!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/du-lich-trong-nuoc">
                  <MapPin className="mr-2 h-5 w-5" /> Tour trong nước
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
    );
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-96 md:h-[80vh] overflow-hidden">
        <Image
          src={
            id === "singapore-malaysia"
              ? "https://media.istockphoto.com/id/1939500219/photo/singapore-cityscape-at-night-twilight-drone-flight-panorama.jpg?s=612x612&w=0&k=20&c=WzBoQ0MoFPfwXVjICcjSGJHUOWlCvARaDIbhBK7hBig="
              : id === "nhat-ban"
              ? "https://media.istockphoto.com/id/1087403002/photo/the-sun-rises-over-the-city-of-tokyo-in-the-morning-japan.jpg?s=612x612&w=0&k=20&c=I-SEZxKHPxKOA3K2khwq7ekU1TOqjciW2V6GLROvc1s="
              : id === "chau-au"
              ? "https://thumbs.dreamstime.com/b/view-modern-business-district-paris-la-defense-may-old-town-eiffel-tower-may-france-41119366.jpg"
              : id === "han-quoc"
              ? "https://media.istockphoto.com/id/464629385/photo/seoul-skyline.jpg?s=612x612&w=0&k=20&c=Wo9LYxk6L9z0VORPkMxjubMcAZfWAJtRJWVfiJR8jmw="
              : id === "thai-lan"
              ? "https://media.istockphoto.com/id/505779722/photo/bangkok-city-view-from-above-thailand.jpg?s=612x612&w=0&k=20&c=rCvIhLpKQwr_HnRKArjTvqBLCmXNVvh4XWYAcA0vN6E="
              : "https://media.gettyimages.com/id/2192851005/photo/hudson-yards-business-district-and-manhattan-skyline-at-sunset-aerial-view-new-york-city-usa.jpg?s=612x612&w=gi&k=20&c=NluDW9ISMBVdDa4F-QVMxqF0lMaOFJkb1KM-hqwZOvE="
          }
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
          {tour.badge && (
            <Badge className="mb-4 text-lg px-4 py-1">{tour.badge}</Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 ">{tour.title}</h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6" /> {tour.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" /> {tour.duration}
            </div>
            {tour.rating && (
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-primary text-primary" />
                {tour.rating} ({tour.reviews} đánh giá)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nội dung chính */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Mô tả & lịch trình */}
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 ">Mô tả tour</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {tour.description}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8 ">
                  Lịch trình chi tiết
                </h2>
                <ol className="space-y-6">
                  {tour.itinerary.map((day, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="font-bold text-primary text-lg">
                        Ngày {idx + 1}
                      </span>
                      <span className="text-muted-foreground">{day}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-card p-8 rounded-2xl shadow-lg h-fit">
              <div className="mb-8">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {typeof tour.price === "number"
                    ? `Từ ${tour.price.toLocaleString("vi-VN")} VNĐ`
                    : tour.price}
                  /người
                </p>
                {tour.originalPrice && (
                  <p className="text-lg text-muted-foreground line-through mt-2">
                    {tour.originalPrice.toLocaleString("vi-VN")} VNĐ
                  </p>
                )}
              </div>

              <h3 className="text-2xl font-semibold mb-6">Dịch vụ bao gồm</h3>
              <ul className="space-y-4 mb-10">
                {tour.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

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

          {/* Gallery */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
              Trải nghiệm dịch vụ cao cấp
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://media.cntraveller.com/photos/65e2024862f0a46aca87d298/16:9/w_1280,c_limit/Liberty%20Club%20Suite%20Living%20Area%20View%20Sunset%20%20-%20Photo%20Credit_%20The%20Ritz-Carlton%20New%20York,%20NoMad.jpg"
                  alt="Phòng khách sạn"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">
                    Ghế hạng thương gia sang trọng
                  </h3>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://media.cntraveller.com/photos/65e2024862f0a46aca87d298/16:9/w_1280,c_limit/Liberty%20Club%20Suite%20Living%20Area%20View%20Sunset%20%20-%20Photo%20Credit_%20The%20Ritz-Carlton%20New%20York,%20NoMad.jpg"
                  alt="Phòng khách sạn"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">
                    Phòng khách sạn hiện đại với bàn làm việc
                  </h3>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://www.luxurycarservicenyc.com/wp-content/uploads/2020/05/Luxury-Car-Service-NYC-Premium-Airport-Transfers-NYC-EWR-JFK-LGA-960-540-min.jpg"
                  alt="Xe Mercedes"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">
                    Xe riêng Mercedes đưa đón sân bay
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
