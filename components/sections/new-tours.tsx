"use client";

import { useEffect, useState } from "react";
import { TourCard } from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
}

export function NewTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tours?limit=6');
      const data = await response.json();

      if (data.success) {
        setTours(data.docs);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary"></div>
              <p className="mt-4 text-muted-foreground">Đang tải tours...</p>
            </div>
          </div>
        </section>
    );
  }

  return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-primary font-semibold mb-2">Ưu đãi đặc biệt</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Tour Mới - Deal Hời
              </h2>
            </div>
            <Button
                asChild
                variant="outline"
                className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Link href="/du-lich-trong-nuoc">
                Xem tất cả
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {tours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chưa có tour nào</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                    <TourCard key={tour.id} {...tour} />
                ))}
              </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Link href="/du-lich-trong-nuoc">
                Xem tất cả
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
  );
}