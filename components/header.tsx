"use client"

import Link from "next/link"
import { useState } from "react"
import { Phone, MapPin, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Du lịch trong nước", href: "/du-lich-trong-nuoc" },
  { name: "Du lịch nước ngoài", href: "/du-lich-nuoc-ngoai" },
  { name: "Dịch vụ du lịch", href: "/dich-vu" },
  { name: "Cẩm nang du lịch", href: "/cam-nang" },
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
  { name: "Liên hệ", href: "/lien-he" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"vi" | "en">("vi")

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar with contact info */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>024 39393539</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <button
              onClick={() => setLanguage("vi")}
              className={`${language === "vi" ? "font-semibold" : "opacity-70"}`}
            >
              VI
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`${language === "en" ? "font-semibold" : "opacity-70"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl font-serif">S</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-primary font-serif">Suntravel</span>
              <p className="text-xs text-muted-foreground">Khám phá thế giới</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
