"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  ChevronRight,
  Tag,
  Facebook,
  Share2,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { FloatingChat } from "@/components/floating-chat";
import { Footer } from "@/components/footer";

// Hàm hỗ trợ format ngày tháng
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // --- STATE ---
  const [id, setId] = useState<string | null>(null);
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // --- LẤY ID TỪ PARAMS (Next.js 15+) ---
  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // --- FETCH DATA ---
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Gọi song song 2 API
        const [articleRes, relatedRes] = await Promise.all([
          fetch(`/api/info-tourism/${id}`),
          fetch(`/api/info-tourism?limit=5`),
        ]);

        const articleData = await articleRes.json();
        const relatedData = await relatedRes.json();

        if (articleData.success && articleData.data) {
          setArticle(articleData.data);
          // Lọc bài viết hiện tại ra khỏi danh sách liên quan
          const filtered = (relatedData.docs || []).filter(
            (item: any) => item.id !== id
          );
          setRelatedArticles(filtered.slice(0, 3));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- GIAO DIỆN TRẠNG THÁI ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Không tìm thấy bài viết</h2>
        <Button asChild>
          <Link href="/cam-nang">Quay lại cẩm nang</Link>
        </Button>
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH ---
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative h-100 md:h-125">
          <Image
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Badge className="bg-secondary text-secondary-foreground mb-4 uppercase">
                {article.category === "trong-nuoc" ? "Trong nước" : "Nước ngoài"}
              </Badge>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Suntravel Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 phút đọc</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-muted/50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Trang chủ</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/cam-nang" className="hover:text-primary">Dịch vụ du lịch</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground line-clamp-1">{article.title}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* <p className="text-xl font-medium text-foreground mb-8 italic border-l-4 border-primary pl-4">
                {article.sort_des}
              </p> */}

              <article
                className="prose prose-lg max-w-none 
                prose-headings:text-foreground 
                prose-p:text-muted-foreground 
                prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {article.hash_tags && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-5 h-5 text-muted-foreground" />
                    {article.hash_tags.map((item: any, idx: number) => (
                      <Badge key={idx} variant="secondary">#{item.tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 flex items-center justify-between gap-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/cam-nang"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/lien-he">Tư vấn ngay <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-3">Liên hệ đặt tour</h3>
                <p className="text-sm text-muted-foreground mb-4">Nhận tư vấn miễn phí từ chuyên viên của chúng tôi.</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold">Hotline: 0903.287.313</p>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/lien-he">Gửi yêu cầu</Link>
                </Button>
              </div>

              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="font-bold text-lg mb-4">Bài viết mới</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related: any) => (
                    <Link key={related.id} href={`/cam-nang/${related.id}`} className="flex gap-4 group">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={related.thumbnail} alt={related.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">{formatDate(related.createdAt)}</p>
                      </div>
                    </Link>
                  ))}
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