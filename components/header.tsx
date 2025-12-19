"use client"

import Link from "next/link"
import { useState } from "react"
import { Phone, MapPin, Menu, X, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"


const navItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Du lịch trong nước", href: "/du-lich-trong-nuoc" },
  { name: "Du lịch nước ngoài", href: "/du-lich-nuoc-ngoai" },
  {
    name: "MICE",
    href: "/mice",
    submenu: [
      { name: "Tour công tác", href: "/mice/tour-cong-tac" },
      { name: "Tour hội nghị hội thảo", href: "/mice/hoi-nghi-hoi-thao" },
      { name: "Team building", href: "/mice/team-building" },
    ]
  },
  { name: "Dịch vụ du lịch", href: "/dich-vu" },
  { name: "Thông tin du lịch", href: "/cam-nang" },
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
  { name: "Liên hệ", href: "/lien-he" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"vi" | "en">("vi")
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

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
            <Link href="/" className="flex flex-col items-center text-center gap-1">
              <Image
                  src="/logo.png"
                  alt="Suntravel Logo"
                  width={64}
                  height={64}
                  priority
                  className="object-contain scale-[5] translate-x-9 origin-center"
              />
            </Link>




            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                  <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                      onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
                        >
                          {item.name}
                          {item.submenu && <ChevronDown className="h-4 w-4" />}
                        </Link>
                    ) : (
                        <button
                            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer"
                        >
                          {item.name}
                          {item.submenu && <ChevronDown className="h-4 w-4" />}
                        </button>
                    )}

                    {item.submenu && (
                        <div
                            className={`absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 border border-border ${
                                openSubmenu === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                        >
                          {item.submenu.map((subitem) => (
                              <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block px-4 py-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                {subitem.name}
                              </Link>
                          ))}
                        </div>
                    )}
                  </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                      <div key={item.name}>
                        <div className="py-2">
                          {item.href ? (
                              <Link
                                  href={item.href}
                                  className="text-foreground hover:text-primary transition-colors font-medium"
                                  onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                          ) : (
                              <span className="text-foreground font-medium">
                        {item.name}
                      </span>
                          )}
                        </div>
                        {item.submenu && (
                            <div className="pl-4 flex flex-col gap-1 mt-1">
                              {item.submenu.map((subitem) => (
                                  <Link
                                      key={subitem.name}
                                      href={subitem.href}
                                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
                                      onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subitem.name}
                                  </Link>
                              ))}
                            </div>
                        )}
                      </div>
                  ))}
                </div>
              </div>
          )}
        </nav>
      </header>
  )
}