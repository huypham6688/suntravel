import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <p className="text-primary font-semibold mb-2">
              Liên hệ với chúng tôi
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground  mb-6">
              Suntravel Luôn Sẵn Sàng Hỗ Trợ Bạn
            </h2>
            <p className="text-muted-foreground mb-8">
              Hãy liên hệ với chúng tôi để được tư vấn miễn phí về các tour du
              lịch phù hợp nhất với nhu cầu của bạn.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Địa chỉ
                  </h4>
                  <p className="text-muted-foreground">
                    Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Hotline
                  </h4>
                  <p className="text-muted-foreground">024 39393539</p>
                  <p className="text-muted-foreground">
                    Ms. Quyên: 0903.287.313 (Máy lẻ 17)
                  </p>
                  <p className="text-muted-foreground">
                    Ms. Hồng Anh: 0974.248.805 (Máy lẻ 16)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">info@suntravel.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Giờ làm việc
                  </h4>
                  <p className="text-muted-foreground">
                    Thứ 2 - Thứ 6: 8:00 - 18:00
                  </p>
                  <p className="text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-card-foreground mb-6 ">
              Gửi yêu cầu tư vấn
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Họ và tên *" className="h-12" />
                <Input placeholder="Số điện thoại *" className="h-12" />
              </div>
              <Input placeholder="Email" type="email" className="h-12" />
              <Input placeholder="Tour bạn quan tâm" className="h-12" />
              <Textarea placeholder="Nội dung yêu cầu" rows={4} />
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                Gửi yêu cầu
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
