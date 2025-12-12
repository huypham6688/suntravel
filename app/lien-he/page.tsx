import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function LienHePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[350px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/vietnamese-man-business-portrait.jpg)` }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">Liên Hệ</h1>
            <p className="text-xl text-background/90 max-w-2xl">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2 font-serif">Địa chỉ</h3>
                <p className="text-muted-foreground text-sm">Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội</p>
              </div>

              <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2 font-serif">Hotline</h3>
                <p className="text-primary font-bold text-lg">024 39393539</p>
              </div>

              <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2 font-serif">Email</h3>
                <p className="text-muted-foreground text-sm">info@suntravel.vn</p>
              </div>

              <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2 font-serif">Giờ làm việc</h3>
                <p className="text-muted-foreground text-sm">T2-T6: 8:00-18:00</p>
                <p className="text-muted-foreground text-sm">T7: 8:00-12:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground font-serif mb-6">Gửi Yêu Cầu Tư Vấn</h2>
                <p className="text-muted-foreground mb-8">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Họ và tên *</label>
                      <Input placeholder="Nhập họ và tên" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại *</label>
                      <Input placeholder="Nhập số điện thoại" className="h-12" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input placeholder="Nhập email" type="email" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Dịch vụ quan tâm</label>
                    <select className="w-full h-12 px-4 border border-input rounded-lg bg-background text-foreground">
                      <option>Chọn dịch vụ</option>
                      <option>Du lịch trong nước</option>
                      <option>Du lịch nước ngoài</option>
                      <option>Đặt vé máy bay</option>
                      <option>Đặt phòng khách sạn</option>
                      <option>Thuê xe du lịch</option>
                      <option>Làm visa</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nội dung yêu cầu</label>
                    <Textarea placeholder="Mô tả chi tiết yêu cầu của bạn..." rows={5} />
                  </div>
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Gửi yêu cầu
                  </Button>
                </form>
              </div>

              {/* Contact Details */}
              <div>
                <h2 className="text-3xl font-bold text-foreground font-serif mb-6">Thông Tin Liên Hệ</h2>

                {/* Hotline Staff */}
                <div className="bg-muted rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-foreground mb-4 font-serif">Hotline tư vấn</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-card rounded-xl p-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        Q
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Ms. Quyên</p>
                        <p className="text-primary font-bold">0903.287.313</p>
                        <p className="text-muted-foreground text-sm">Máy lẻ 17</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-card rounded-xl p-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        H
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Ms. Hồng Anh</p>
                        <p className="text-primary font-bold">0974.248.805</p>
                        <p className="text-muted-foreground text-sm">Máy lẻ 16</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-muted rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-foreground mb-4 font-serif">Kết nối với chúng tôi</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-card rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-card rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Youtube className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-card rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-muted rounded-2xl h-[250px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Google Maps</p>
                    <p className="text-sm text-muted-foreground">Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  )
}
