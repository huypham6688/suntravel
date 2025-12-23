import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Home } from "lucide-react";

export default function TourNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4 ">
          Tour không tồn tại
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Rất tiếc, tour bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ. Hãy
          khám phá các tour khác của chúng tôi!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/du-lich-trong-nuoc">
              <MapPin className="w-4 h-4 mr-2" />
              Tour trong nước
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
