"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// 1. Cập nhật Interface khớp với database mới
interface TourismItem {
   id: string;
   title: string;
   sort_des: string;
   thumbnail: string;
   region: "trong-nuoc" | "nuoc-ngoai"; // Phân loại địa lý
   category: {                         // Quan hệ (Relationship)
      title: string;
      slug: string;
   };
   createdAt: string;
}

export function TravelGuides() {
   const [items, setItems] = useState<TourismItem[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchTourism = async () => {
      try {
         setLoading(true);
         // API đã được tối ưu để trả về depth: 1, lấy được cả category.title
         const response = await fetch(`/api/info-tourism?limit=3`);
         const data = await response.json();

         console.log(data)
         if (data.success) {
            setItems(data.docs);
         }
      } catch (error) {
         console.error("Lỗi khi lấy danh sách du lịch:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchTourism();
   }, []);

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("vi-VN");
   };

   // 2. Hàm hỗ trợ hiển thị nhãn Vùng miền
   const getRegionLabel = (region: string) => {
      return region === "trong-nuoc" ? "Trong nước" : "Nước ngoài";
   };

   return (
      <section className="py-20 bg-background">
         <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <p className="text-primary font-semibold mb-2">Thông tin Du Lịch</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground ">Thông tin du lịch</h2>
               </div>
               <Button asChild variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  <Link href="/cam-nang">
                     Xem tất cả
                     <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
               </Button>
            </div>

            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>
                  ))}
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {items.map((guide) => (
                     <article key={guide.id} className="bg-card rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow border border-border/50 flex flex-col">
                        <div className="relative h-52 overflow-hidden">
                           <Image 
                              src={guide.thumbnail || "/placeholder.svg"} 
                              alt={guide.title} 
                              fill 
                              className="object-cover group-hover:scale-110 transition-transform duration-500" 
                           />
                           {/* Nhãn Vùng miền (Trong nước/Nước ngoài) */}
                           <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                              {getRegionLabel(guide.region)}
                           </span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                           <div className="flex items-center justify-between text-muted-foreground text-xs mb-3">
                              <div className="flex items-center gap-1">
                                 <Calendar className="w-3.5 h-3.5" />
                                 <span>{formatDate(guide.createdAt)}</span>
                              </div>
                              {/* Hiển thị thêm Chủ đề (Review, Ẩm thực...) từ relationship */}
                              <div className="flex items-center gap-1 font-medium text-primary">
                                 <Tag className="w-3.5 h-3.5" />
                                 <span>{guide.category?.title}</span>
                              </div>
                           </div>
                           
                           <h3 className="font-bold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors ">
                              <Link href={`/cam-nang/${guide.id}`}>{guide.title}</Link>
                           </h3>
                           
                           <p className="text-muted-foreground line-clamp-2 text-sm mb-4">
                              {guide.sort_des}
                           </p>

                           <Link 
                              href={`/cam-nang/${guide.id}`}
                              className="mt-auto text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                           >
                              Đọc thêm <ArrowRight className="w-4 h-4" />
                           </Link>
                        </div>
                     </article>
                  ))}
               </div>
            )}

            {!loading && items.length === 0 && (
               <p className="text-center text-muted-foreground">Hiện chưa có thông tin du lịch nào.</p>
            )}

            <div className="mt-8 text-center md:hidden">
               <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  <Link href="/cam-nang">
                     Xem tất cả
                     <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
               </Button>
            </div>
         </div>
      </section>
   );
}