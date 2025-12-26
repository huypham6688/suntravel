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
  Loader2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CamNangPage() {
  // --- States ---
  const [articles, setArticles] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(true);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoSearchTerm, setVideoSearchTerm] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("Tất cả");
  const [selectedVideoCategory, setSelectedVideoCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("articles");

  // Phân trang
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Video categories
  const videoCategories = [
    { label: "Tất cả", value: "all" },
    { label: "Trong nước", value: "domestic" },
    { label: "Nước ngoài", value: "international" },
    { label: "Ẩm thực", value: "food" },
    { label: "Mẹo du lịch", value: "tips" },
    { label: "Review", value: "review" },
    { label: "Hướng dẫn", value: "guide" },
  ];

  // --- 1. Fetch Danh mục khi mount ---
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) setDbCategories(data.docs);
      } catch (err) {
        console.error("Lỗi fetch categories", err);
      }
    };
    fetchCats();
  }, []);

  // --- 2. Fetch Bài viết khi Filter thay đổi ---
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
          search: searchTerm,
        });

        if (selectedCategorySlug !== "Tất cả") {
          params.append("category", selectedCategorySlug);
        }

        const res = await fetch(`/api/info-tourism?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setArticles(data.docs);
          setTotalPages(data.totalPages);
        }
      } catch (err) {
        console.error("Lỗi fetch articles", err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchArticles();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategorySlug, page]);

  // --- 3. Fetch Videos ---
  useEffect(() => {
    const fetchVideos = async () => {
      setVideosLoading(true);
      try {
        const params = new URLSearchParams({ limit: "100" });

        if (selectedVideoCategory !== "all") {
          params.append("category", selectedVideoCategory);
        }

        const res = await fetch(`/api/videos?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setVideos(data.docs);
        }
      } catch (err) {
        console.error("Lỗi fetch videos", err);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, [selectedVideoCategory]);

  const formatDate = (date: string) => new Date(date).toLocaleDateString("vi-VN");

  // Filter videos by search
  const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(videoSearchTerm.toLowerCase())
  );

  return (
      <>
        <Header />
        <main>
          {/* Hero giữ nguyên */}
          <section className="relative h-[300px] md:h-[400px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/banner-du-lich.webp)` }} />
            <div className="absolute inset-0 bg-foreground/60" />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-background capitalize mb-4">Thông tin du lịch</h1>
              <p className="text-xl text-background/90 max-w-2xl">Kinh nghiệm và hướng dẫn chi tiết từ chuyên gia</p>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <TabsList className="bg-muted p-1">
                      <TabsTrigger value="articles" className="px-6">Bài viết</TabsTrigger>
                      <TabsTrigger value="videos" className="px-6">Video</TabsTrigger>
                    </TabsList>

                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                          placeholder={activeTab === "articles" ? "Tìm kiếm bài viết..." : "Tìm kiếm video..."}
                          className="pl-9 bg-white"
                          value={activeTab === "articles" ? searchTerm : videoSearchTerm}
                          onChange={(e) => {
                            if (activeTab === "articles") {
                              setSearchTerm(e.target.value);
                              setPage(1);
                            } else {
                              setVideoSearchTerm(e.target.value);
                            }
                          }}
                      />
                    </div>
                  </div>

                  {/* Filter Categories - Show different filters based on active tab */}
                  {activeTab === "articles" && (
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Button
                            variant={selectedCategorySlug === "Tất cả" ? "default" : "outline"}
                            size="sm"
                            onClick={() => { setSelectedCategorySlug("Tất cả"); setPage(1); }}
                            className="rounded-full"
                        >
                          Tất cả
                        </Button>
                        {dbCategories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={selectedCategorySlug === cat.slug ? "default" : "outline"}
                                size="sm"
                                onClick={() => { setSelectedCategorySlug(cat.slug); setPage(1); }}
                                className="rounded-full"
                            >
                              {cat.title}
                            </Button>
                        ))}
                      </div>
                  )}

                  {activeTab === "videos" && (
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {videoCategories.map((cat) => (
                            <Button
                                key={cat.value}
                                variant={selectedVideoCategory === cat.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedVideoCategory(cat.value)}
                                className="rounded-full"
                            >
                              {cat.label}
                            </Button>
                        ))}
                      </div>
                  )}
                </div>

                <TabsContent value="articles" className="space-y-12">
                  {loading ? (
                      <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
                  ) : articles.length > 0 ? (
                      <>
                        {/* Featured Article */}
                        <article className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
                          <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-[300px] lg:h-auto">
                              <Image src={articles[0].thumbnail} alt={articles[0].title} fill className="object-cover" />
                              <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Mới nhất</span>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <span className="text-primary font-medium mb-2 uppercase text-xs tracking-widest">
                            {articles[0].region === 'trong-nuoc' ? 'Trong nước' : 'Nước ngoài'}
                          </span>
                              <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">{articles[0].title}</h2>
                              <p className="text-muted-foreground mb-6 line-clamp-3">{articles[0].sort_des}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(articles[0].createdAt)}</div>
                                <div className="flex items-center gap-2"><User className="w-4 h-4" />Suntravel Team</div>
                              </div>
                              <Button asChild className="w-fit bg-primary hover:bg-primary/90">
                                <Link href={`/cam-nang/${articles[0].id}`}>Đọc bài viết <ArrowRight className="w-4 h-4 ml-2" /></Link>
                              </Button>
                            </div>
                          </div>
                        </article>

                        {/* Grid bài viết còn lại */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {articles.slice(1).map((article) => (
                              <article key={article.id} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-border flex flex-col">
                                <div className="relative h-52 overflow-hidden">
                                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                  <span className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase">
                              {article.region === 'trong-nuoc' ? 'Trong nước' : 'Nước ngoài'}
                            </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                  <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(article.createdAt)}</div>
                                    <div className={`px-2 py-0.5 `}>
                                      <span>8 phút đọc</span>
                                    </div>
                                  </div>
                                  <h3 className="font-semibold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    <Link href={`/cam-nang/${article.id}`}>{article.title}</Link>
                                  </h3>
                                  <p className="text-muted-foreground line-clamp-2 text-sm mb-4">{article.sort_des}</p>
                                  <Link href={`/cam-nang/${article.id}`} className="mt-auto text-primary text-sm font-bold flex items-center gap-1">
                                    Chi tiết <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </div>
                              </article>
                          ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-12">
                              <Button
                                  variant="outline"
                                  disabled={page === 1}
                                  onClick={() => setPage(p => p - 1)}
                              >Trước</Button>
                              <div className="flex items-center px-4 font-medium">Trang {page} / {totalPages}</div>
                              <Button
                                  variant="outline"
                                  disabled={page === totalPages}
                                  onClick={() => setPage(p => p + 1)}
                              >Sau</Button>
                            </div>
                        )}
                      </>
                  ) : (
                      <div className="text-center py-20 text-muted-foreground">Không tìm thấy bài viết nào phù hợp.</div>
                  )}
                </TabsContent>

                <TabsContent value="videos" className="space-y-8">
                  {videosLoading ? (
                      <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin w-8 h-8 text-primary" />
                      </div>
                  ) : filteredVideos.length > 0 ? (
                      <>
                        {/* Featured Videos */}
                        {filteredVideos.filter(v => v.featured).length > 0 && (
                            <div className="space-y-6">
                              <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                Video nổi bật
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredVideos.filter(v => v.featured).map((video) => (
                                    <div
                                        key={video.id}
                                        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                        onClick={() => setSelectedVideo(video.videoUrl)}
                                    >
                                      <div className="relative aspect-video">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                          <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                                            <Play className="w-8 h-8 text-primary fill-primary" />
                                          </div>
                                        </div>
                                        <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                  <Star className="w-3 h-3" /> Nổi bật
                                </span>
                                      </div>
                                      <div className="p-4 bg-card">
                                        <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                          {video.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {video.date}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                ))}
                              </div>
                            </div>
                        )}

                        {/* All Videos Grid */}
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold">Tất cả video</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-card"
                                    onClick={() => setSelectedVideo(video.videoUrl)}
                                >
                                  <div className="relative aspect-video">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                      <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-primary fill-primary" />
                                      </div>
                                    </div>
                                    {video.featured && (
                                        <span className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                </span>
                                    )}
                                  </div>
                                  <div className="p-4">
                                    <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                      {video.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Calendar className="w-3 h-3" />
                                      {video.date}
                                    </div>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>
                      </>
                  ) : (
                      <div className="text-center py-20 text-muted-foreground">
                        Không tìm thấy video nào phù hợp.
                      </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>

        {/* Video Player Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-7xl w-[98vw] p-0 bg-transparent border-0 shadow-none">
            <DialogTitle className="sr-only">Xem video</DialogTitle>

            {/* Video Container with Black Blur Border */}
            <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              {/* Close Button - Small and inside blur border */}
              <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-2 right-2 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 transition-all hover:scale-110"
                  aria-label="Đóng video"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Video Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                {selectedVideo && (
                    <video
                        src={selectedVideo}
                        controls
                        autoPlay
                        className="w-full h-full"
                    >
                      Trình duyệt của bạn không hỗ trợ video.
                    </video>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
        <FloatingChat />
      </>
  );
}