"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import {
  Calendar,
  User,
  ArrowRight,
  Play,
  Clock,
  Eye,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: "1",
    title: "Top 10 điểm check-in không thể bỏ lỡ tại Đà Nẵng 2025",
    excerpt:
      "Khám phá những địa điểm sống ảo đẹp nhất tại thành phố đáng sống nhất Việt Nam. Từ Cầu Vàng, Bà Nà đến những bãi biển tuyệt đẹp...",
    image: "/da-nang-golden-bridge-check-in.jpg",
    date: "28/03/2025",
    author: "Suntravel Team",
    category: "Trong nước",
    readTime: "5 phút đọc",
  },
  {
    id: "2",
    title: "Kinh nghiệm du lịch Thái Lan tự túc chi tiết từ A-Z",
    excerpt:
      "Hướng dẫn đầy đủ cho chuyến du lịch Thái Lan đầu tiên của bạn với ngân sách tiết kiệm. Visa, đi lại, ăn ở và mua sắm...",
    image: "/thailand-bangkok-travel-guide.jpg",
    date: "25/03/2025",
    author: "Ms. Quyên",
    category: "Nước ngoài",
    readTime: "10 phút đọc",
  },
  {
    id: "3",
    title: "Sapa mùa nào đẹp nhất? Lịch trình 3 ngày 2 đêm hoàn hảo",
    excerpt:
      "Tất tần tật về thời điểm lý tưởng và lịch trình chi tiết cho chuyến đi Sapa. Mùa lúa chín hay mùa hoa đào...",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "20/03/2025",
    author: "Suntravel Team",
    category: "Trong nước",
    readTime: "8 phút đọc",
  },
  {
    id: "4",
    title: "Review chi tiết resort 5 sao Phú Quốc - Nơi nào đáng tiền nhất?",
    excerpt:
      "So sánh chi tiết các resort 5 sao hàng đầu tại Phú Quốc. Vinpearl, JW Marriott hay InterContinental - lựa chọn nào cho bạn?",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "18/03/2025",
    author: "Ms. Hồng Anh",
    category: "Review",
    readTime: "12 phút đọc",
  },
  {
    id: "5",
    title: "Hướng dẫn xin visa Hàn Quốc 2025 - Tỷ lệ đậu 99%",
    excerpt:
      "Cập nhật mới nhất về thủ tục xin visa Hàn Quốc năm 2025. Hồ sơ cần chuẩn bị, lịch hẹn và những lưu ý quan trọng...",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "15/03/2025",
    author: "Ms. Quyên",
    category: "Hướng dẫn",
    readTime: "7 phút đọc",
  },
  {
    id: "6",
    title: "Ẩm thực đường phố Bangkok - 20 món ngon nhất định phải thử",
    excerpt:
      "Khám phá thiên đường ẩm thực đường phố Bangkok với những món ăn ngon khó cưỡng. Pad Thai, Tom Yum, Mango Sticky Rice...",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "12/03/2025",
    author: "Suntravel Team",
    category: "Ẩm thực",
    readTime: "6 phút đọc",
  },
];

const videos = [
  {
    id: "v1",
    title: "Khám phá vẻ đẹp hùng vĩ của Hà Giang",
    thumbnail: "/sapa-vietnam-rice-fields-misty.jpg",
    duration: "10:30",
    views: "15N",
    date: "28/03/2025",
    category: "Trong nước",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", // Example URL
  },
  {
    id: "v2",
    title: "Review chuyến đi Bali 4 ngày 3 đêm cực chất",
    thumbnail: "/thailand-bangkok-travel-guide.jpg",
    duration: "15:45",
    views: "22N",
    date: "25/03/2025",
    category: "Nước ngoài",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "v3",
    title: "Top 5 món ăn phải thử khi đến Hội An",
    thumbnail: "/da-nang-golden-bridge-check-in.jpg",
    duration: "08:20",
    views: "12N",
    date: "22/03/2025",
    category: "Ẩm thực",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "v4",
    title: "Trải nghiệm du thuyền 5 sao trên vịnh Hạ Long",
    thumbnail: "/sapa-vietnam-rice-fields-misty.jpg",
    duration: "12:15",
    views: "30N",
    date: "20/03/2025",
    category: "Trong nước",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "v5",
    title: "Hướng dẫn chuẩn bị hành lý đi Âu Châu mùa đông",
    thumbnail: "/thailand-bangkok-travel-guide.jpg",
    duration: "14:00",
    views: "8N",
    date: "18/03/2025",
    category: "Mẹo du lịch",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "v6",
    title: "Vlog: Một ngày ở Seoul - Hàn Quốc",
    thumbnail: "/da-nang-golden-bridge-check-in.jpg",
    duration: "18:30",
    views: "45N",
    date: "15/03/2025",
    category: "Nước ngoài",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
];

const categories = [
  "Tất cả",
  "Trong nước",
  "Nước ngoài",
  "Review",
  "Hướng dẫn",
  "Ẩm thực",
  "Mẹo du lịch",
];

export default function CamNangPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/banner-du-lich.webp)`,
            }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-background capitalize mb-4">
              Thông tin Du Lịch
            </h1>
            <p className="text-xl text-background/90 max-w-2xl">
              Kinh nghiệm, mẹo hay và hướng dẫn chi tiết cho mọi chuyến đi
            </p>
          </div>
        </section>

        {/* Content Section with Tabs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="articles" className="w-full">
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <TabsList className="bg-muted p-1">
                    <TabsTrigger value="articles" className="px-6">
                      Bài viết
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="px-6">
                      Video
                    </TabsTrigger>
                  </TabsList>

                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm..."
                      className="pl-9 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <TabsContent value="articles" className="space-y-12">
                {/* Featured Article */}
                {filteredArticles.length > 0 ? (
                  <>
                    <article className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-[300px] lg:h-auto">
                          <Image
                            src={
                              filteredArticles[0].image ||
                              "/da-nang-golden-bridge-check-in.jpg"
                            }
                            alt={filteredArticles[0].title}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                            Nổi bật
                          </span>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <span className="text-primary font-medium mb-2">
                            {filteredArticles[0].category}
                          </span>
                          <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                            {filteredArticles[0].title}
                          </h2>
                          <p className="text-muted-foreground mb-6">
                            {filteredArticles[0].excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {filteredArticles[0].date}
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {filteredArticles[0].author}
                            </div>
                          </div>
                          <Button
                            asChild
                            className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Link href={`/cam-nang/${filteredArticles[0].id}`}>
                              Đọc thêm
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>

                    {/* Other Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredArticles.slice(1).map((article) => (
                        <article
                          key={article.id}
                          className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-border"
                        >
                          <div className="relative h-52 overflow-hidden">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                              {article.category}
                            </span>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                              </div>
                              <span>{article.readTime}</span>
                            </div>
                            <h3 className="font-semibold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                              <Link href={`/cam-nang/${article.id}`}>
                                {article.title}
                              </Link>
                            </h3>
                            <p className="text-muted-foreground line-clamp-2 text-sm">
                              {article.excerpt}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      Không tìm thấy bài viết nào phù hợp.
                    </p>
                  </div>
                )}

                <div className="flex justify-center pt-8">
                  <Button
                    variant="outline"
                    className="bg-transparent border-primary/20 hover:bg-primary/5 text-primary"
                  >
                    Xem thêm bài viết
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="videos"
                className="space-y-8 animate-in fade-in-50 duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border cursor-pointer"
                      onClick={() => setSelectedVideo(video.videoUrl)}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Play className="w-5 h-5 text-primary fill-primary ml-1" />
                          </div>
                        </div>
                        <span className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {video.duration}
                        </span>
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          {video.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {video.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views} lượt xem
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg text-card-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center pt-8">
                  <Button
                    variant="outline"
                    className="bg-transparent border-primary/20 hover:bg-primary/5 text-primary"
                  >
                    Xem thêm video
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Video Dialog */}
        <Dialog
          open={!!selectedVideo}
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black border-none">
            {selectedVideo && (
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={selectedVideo}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
