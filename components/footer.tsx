import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="mb-6">
              <Link
                  href="/"
                  className="flex flex-col items-start gap-1"
              >
                <Image
                    src="/logo2.png"
                    alt="Suntravel Logo"
                    width={64}
                    height={64}
                    priority
                    className="object-contain scale-[2] translate-x-6 origin-center"
                />


              </Link>
            </div>

            <p className="text-secondary-foreground/80 mb-6">
              Uy tín dẫn đường, tận tâm theo bước
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/du-lich-trong-nuoc" className="hover:text-primary transition-colors">
                  Du lịch trong nước
                </Link>
              </li>
              <li>
                <Link href="/du-lich-nuoc-ngoai" className="hover:text-primary transition-colors">
                  Du lịch nước ngoài
                </Link>
              </li>
              <li>
                <Link href="/mice" className="hover:text-primary transition-colors">
                  Dịch vụ MICE
                </Link>
              </li>
              <li>
                <Link href="/cam-nang" className="hover:text-primary transition-colors">
                  Dịch vụ du lịch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0" />
                <span>Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>024 39393539</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>info@suntravel.vn</span>
              </li>
            </ul>
          </div>

          {/* Hotline */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hotline tư vấn</h4>
            <div className="space-y-4">
              <div className="bg-secondary-foreground/10 p-4 rounded-lg">
                <p className="font-semibold">Ms. Quyên</p>
                <p className="text-lg font-bold">0903.287.313</p>
                <p className="text-sm text-secondary-foreground/70">Máy lẻ 17</p>
              </div>
              <div className="bg-secondary-foreground/10 p-4 rounded-lg">
                <p className="font-semibold">Ms. Hồng Anh</p>
                <p className=" text-lg font-bold">0974.248.805</p>
                <p className="text-sm text-secondary-foreground/70">Máy lẻ 16</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/70">
          <p>&copy; 2025 Suntravel. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
