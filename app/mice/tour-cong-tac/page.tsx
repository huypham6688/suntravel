import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const tours = [
    {
        id: "singapore-malaysia",
        title: "Tour Công Tác Singapore - Malaysia",
        location: "Singapore • Malaysia",
        duration: "5 ngày 4 đêm",
        price: 28000000,
        originalPrice: 35000000,
        rating: 4.9,
        reviews: 89,
        badge: "Hot",
        image: "https://media.istockphoto.com/id/1939500219/photo/singapore-cityscape-at-night-twilight-drone-flight-panorama.jpg?s=612x612&w=0&k=20&c=WzBoQ0MoFPfwXVjICcjSGJHUOWlCvARaDIbhBK7hBig=",
    },
    {
        id: "nhat-ban",
        title: "Tour Công Tác Nhật Bản",
        location: "Tokyo • Osaka",
        duration: "7 ngày 6 đêm",
        price: 65000000,
        originalPrice: 75000000,
        rating: 4.8,
        reviews: 156,
        badge: "Mới",
        image: "https://media.istockphoto.com/id/1087403002/photo/the-sun-rises-over-the-city-of-tokyo-in-the-morning-japan.jpg?s=612x612&w=0&k=20&c=I-SEZxKHPxKOA3K2khwq7ekU1TOqjciW2V6GLROvc1s=",
    },
    {
        id: "chau-au",
        title: "Tour Công Tác Châu Âu (Đức - Pháp)",
        location: "Frankfurt • Paris",
        duration: "10 ngày 9 đêm",
        price: 120000000,
        rating: 5.0,
        reviews: 45,
        image: "https://thumbs.dreamstime.com/b/view-modern-business-district-paris-la-defense-may-old-town-eiffel-tower-may-france-41119366.jpg",
    },
    {
        id: "han-quoc",
        title: "Tour Công Tác Hàn Quốc",
        location: "Seoul",
        duration: "4 ngày 3 đêm",
        price: 22000000,
        originalPrice: 28000000,
        rating: 4.7,
        reviews: 112,
        badge: "Deal hời",
        image: "https://media.istockphoto.com/id/464629385/photo/seoul-skyline.jpg?s=612x612&w=0&k=20&c=Wo9LYxk6L9z0VORPkMxjubMcAZfWAJtRJWVfiJR8jmw=",
    },
    {
        id: "thai-lan",
        title: "Tour Công Tác Thái Lan",
        location: "Bangkok",
        duration: "3 ngày 2 đêm",
        price: 15000000,
        originalPrice: 19000000,
        rating: 4.6,
        reviews: 201,
        image: "https://media.istockphoto.com/id/505779722/photo/bangkok-city-view-from-above-thailand.jpg?s=612x612&w=0&k=20&c=rCvIhLpKQwr_HnRKArjTvqBLCmXNVvh4XWYAcA0vN6E=",
    },
    {
        id: "my",
        title: "Tour Công Tác Mỹ (New York - Washington)",
        location: "New York • Washington D.C.",
        duration: "12 ngày 11 đêm",
        price: "Liên hệ",
        rating: 4.9,
        reviews: 34,
        badge: "Cao cấp",
        image: "https://media.gettyimages.com/id/2192851005/photo/hudson-yards-business-district-and-manhattan-skyline-at-sunset-aerial-view-new-york-city-usa.jpg?s=612x612&w=gi&k=20&c=NluDW9ISMBVdDa4F-QVMxqF0lMaOFJkb1KM-hqwZOvE=",
    },
]

export default function TourCongTac() {
    return (
        <>
            <Header />

            {/* Dùng HeroBanner mặc định như các trang khác */}
            <HeroBanner />

            {/* Danh sách tour */}
            <section className="py-20 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <p className="text-primary font-semibold mb-2">Ưu đãi đặc biệt</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                                Tour Công Tác Nổi Bật
                            </h2>
                        </div>
                        <Button asChild variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                            <Link href="/mice/tour-cong-tac">
                                Xem tất cả <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.map((tour) => (
                            <TourCard
                                key={tour.id}
                                {...tour}
                                href={`/mice/tour-cong-tac/${tour.id}`}
                            />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                            <Link href="/mice/tour-cong-tac">
                                Xem tất cả <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Phần dịch vụ nổi bật */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-serif">
                        Dịch Vụ Cao Cấp Trong Mọi Tour
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src="https://www.luxurycarservicenyc.com/wp-content/uploads/2020/05/Luxury-Car-Service-NYC-Premium-Airport-Transfers-NYC-EWR-JFK-LGA-960-540-min.jpg"
                                    alt="Vé Máy Bay Hạng Thương Gia"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">Vé Máy Bay Hạng Thương Gia</h3>
                        </div>
                        <div className="text-center">
                            <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src="https://media.cntraveller.com/photos/65e2024862f0a46aca87d298/16:9/w_1280,c_limit/Liberty%20Club%20Suite%20Living%20Area%20View%20Sunset%20%20-%20Photo%20Credit_%20The%20Ritz-Carlton%20New%20York,%20NoMad.jpg"
                                    alt="Khách Sạn Cao Cấp & Bàn Làm Việc"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">Khách Sạn Cao Cấp & Bàn Làm Việc</h3>
                        </div>
                        <div className="text-center">
                            <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src="https://www.luxurycarservicenyc.com/wp-content/uploads/2020/05/Luxury-Car-Service-NYC-Premium-Airport-Transfers-NYC-EWR-JFK-LGA-960-540-min.jpg"
                                    alt="Xe Riêng Đưa Đón Sân Bay"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">Xe Riêng Đưa Đón Sân Bay</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Cần tour công tác tùy chỉnh?</h2>
                    <p className="text-xl mb-8 opacity-90">Liên hệ để nhận tư vấn & báo giá miễn phí trong 24h</p>
                    <Button size="lg" variant="secondary">
                        Liên Hệ Ngay
                    </Button>
                </div>
            </section>

            <Footer />
        </>
    )
}