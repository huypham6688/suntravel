import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { FloatingChat } from "@/components/floating-chat";
import { Footer } from "@/components/footer";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tour {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  maxPeople?: number;
  description: string;
  highlights: { item: string }[];
  itinerary: { day: number; title: string; description: string }[];
  includes: { item: string }[];
  excludes: { item: string }[];
  gallery: { url: string }[];
  departureDate: { date: string }[];
  category: string;
}

async function getTour(id: string): Promise<Tour | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/tours/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.success && data.tour) {
      return data.tour;
    }

    return null;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export default async function TourDetailPage({
                                               params,
                                             }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await getTour(id);

  if (!tour) {
    notFound();
  }

  return (
      <>
        <Header />

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
                    href={
                      tour.category === "trong-nuoc"
                          ? "/du-lich-trong-nuoc"
                          : "/du-lich-nuoc-ngoai"
                    }
                    className="hover:text-primary transition-colors"
                >
                  {tour.category === "trong-nuoc"
                      ? "Du lịch trong nước"
                      : "Du lịch nước ngoài"}
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
                  <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      fill
                      className="object-cover"
                  />
                  {tour.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-base px-4 py-2">
                        {tour.badge}
                      </Badge>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Gallery thumbnails */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {tour.gallery?.map((item, index) => (
                      <div
                          key={index}
                          className="relative h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                      >
                        <Image
                            src={item.url || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                      </div>
                  ))}
                </div>

                {/* Tour Info */}
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {tour.title}
                  </h1>
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
                      <span className="font-semibold text-foreground">
                      {tour.rating}
                    </span>
                      <span>({tour.reviews} đánh giá)</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {tour.description}
                  </p>
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
                      {tour.highlights?.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight.item}</span>
                          </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="itinerary" className="mt-6">
                    <div className="space-y-6">
                      {tour.itinerary?.map((day) => (
                          <div
                              key={day.day}
                              className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-0"
                          >
                            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px]" />
                            <div className="bg-card p-4 rounded-xl">
                              <h4 className="font-semibold text-foreground mb-2">
                                Ngày {day.day}: {day.title}
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                {day.description}
                              </p>
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
                          {tour.includes?.map((item, index) => (
                              <li
                                  key={index}
                                  className="flex items-start gap-2 text-muted-foreground text-sm"
                              >
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {item.item}
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
                          {tour.excludes?.map((item, index) => (
                              <li
                                  key={index}
                                  className="flex items-start gap-2 text-muted-foreground text-sm"
                              >
                                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                {item.item}
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
                          <Badge variant="destructive">
                            -
                            {Math.round(
                                (1 - tour.price / tour.originalPrice) * 100
                            )}
                            %
                          </Badge>
                      )}
                    </div>
                    <p className="text-primary text-3xl font-bold">
                      {tour.price.toLocaleString("vi-VN")}đ
                    </p>
                    <span className="text-muted-foreground text-sm">/người</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Ngày khởi hành
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.departureDate?.map((item, index) => (
                          <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {item.date}
                          </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
                      size="lg"
                  >
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
                    <p className="text-sm text-muted-foreground mb-4">
                      Liên hệ tư vấn trực tiếp:
                    </p>
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
                          <p className="text-sm text-muted-foreground">
                            0903.287.313
                          </p>
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
                          <p className="text-sm text-muted-foreground">
                            0974.248.805
                          </p>
                        </div>
                      </a>
                      <a
                          href="https://zalo.me/0974248805"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Chat Zalo</p>
                          <p className="text-sm text-muted-foreground">
                            Tư vấn nhanh 24/7
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingChat />
      </>
  );
}