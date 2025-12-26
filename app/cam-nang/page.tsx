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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CamNangPage() {
  // --- States ---
  const [articles, setArticles] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("Tất cả");
  
  // Phân trang
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        
        // Nếu chọn category cụ thể (khác "Tất cả") thì thêm vào param
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

    // Debounce search để tránh gọi API liên tục
    const timeoutId = setTimeout(() => {
      fetchArticles();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategorySlug, page]);

  const formatDate = (date: string) => new Date(date).toLocaleDateString("vi-VN");

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
            <Tabs defaultValue="articles" className="w-full">
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <TabsList className="bg-muted p-1">
                    <TabsTrigger value="articles" className="px-6">Bài viết</TabsTrigger>
                    <TabsTrigger value="videos" className="px-6">Video</TabsTrigger>
                  </TabsList>

                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm bài viết..."
                      className="pl-9 bg-white"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>

                {/* Filter Categories từ DB */}
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
              </div>

              <TabsContent value="articles" className="space-y-12">
                {loading ? (
                  <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
                ) : articles.length > 0 ? (
                  <>
                    {/* Featured Article (Bài đầu tiên trong danh sách) */}
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

                    {/* Pagination đơn giản */}
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

              <TabsContent value="videos">
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}