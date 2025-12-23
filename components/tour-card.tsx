import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number | string;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  maxPeople?: number;
  href?: string;
}

export function TourCard({
  id,
  title,
  location,
  duration,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  badge,
  maxPeople,
  href,
}: TourCardProps) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {badge && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}
        {originalPrice && (
          <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
            -{Math.round((1 - price / originalPrice) * 100)}%
          </Badge>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <h3 className="font-semibold text-lg text-card-foreground mb-3 line-clamp-2 ">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {maxPeople && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Tối đa {maxPeople} người</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-semibold text-card-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({reviews} đánh giá)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                {originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
            <p className="text-primary text-xl font-bold">
              {typeof price === "number"
                ? `${price.toLocaleString("vi-VN")}đ`
                : price}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href={href || `/tour/${id}`}>Chi tiết</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
