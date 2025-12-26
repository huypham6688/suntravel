"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Phone, MapPin, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCompanyInfo } from "@/hooks/use-company-info";

const navItems = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Du lịch trong nước",
    href: "/du-lich-trong-nuoc",
    megaMenu: [
      {
        title: "DU LỊCH MIỀN BẮC",
        items: [
          { name: "Du lịch Cát Bà", href: "/du-lich-trong-nuoc?region=Cát Bà" },
          {
            name: "Du lịch Hạ Long",
            href: "/du-lich-trong-nuoc?region=Hạ Long",
          },
          {
            name: "Du lịch Hải Phòng",
            href: "/du-lich-trong-nuoc?region=Hải Phòng",
          },
          { name: "Du lịch Ba Vì", href: "/du-lich-trong-nuoc?region=Ba Vì" },
          {
            name: "Du lịch Cao Bằng",
            href: "/du-lich-trong-nuoc?region=Cao Bằng",
          },
          { name: "Du lịch Cô Tô", href: "/du-lich-trong-nuoc?region=Cô Tô" },
          {
            name: "Du lịch Hà Giang",
            href: "/du-lich-trong-nuoc?region=Hà Giang",
          },
          { name: "Du lịch Hà Nội", href: "/du-lich-trong-nuoc?region=Hà Nội" },
          {
            name: "Du lịch Hòa Bình",
            href: "/du-lich-trong-nuoc?region=Hòa Bình",
          },
          {
            name: "Du lịch Ninh Bình",
            href: "/du-lich-trong-nuoc?region=Ninh Bình",
          },
          { name: "Du lịch Sapa", href: "/du-lich-trong-nuoc?region=Sapa" },
          { name: "Du lịch Sơn La", href: "/du-lich-trong-nuoc?region=Sơn La" },
          {
            name: "Du lịch Yên Bái",
            href: "/du-lich-trong-nuoc?region=Yên Bái",
          },
          {
            name: "Du lịch Điện Biên",
            href: "/du-lich-trong-nuoc?region=Điện Biên",
          },
          {
            name: "Du lịch Phú Thọ",
            href: "/du-lich-trong-nuoc?region=Phú Thọ",
          },
        ],
      },
      {
        title: "DU LỊCH MIỀN TRUNG",
        items: [
          {
            name: "Du lịch Nha Trang",
            href: "/du-lich-trong-nuoc?region=Nha Trang",
          },
          {
            name: "Du lịch Quy Nhơn",
            href: "/du-lich-trong-nuoc?region=Quy Nhơn",
          },
          {
            name: "Du lịch Đà Nẵng",
            href: "/du-lich-trong-nuoc?region=Đà Nẵng",
          },
          { name: "Du lịch Đà Lạt", href: "/du-lich-trong-nuoc?region=Đà Lạt" },
          { name: "Du lịch Huế", href: "/du-lich-trong-nuoc?region=Huế" },
          { name: "Du lịch Cửa Lò", href: "/du-lich-trong-nuoc?region=Cửa Lò" },
          {
            name: "Du lịch Quảng Bình",
            href: "/du-lich-trong-nuoc?region=Quảng Bình",
          },
          {
            name: "Du lịch Sầm Sơn",
            href: "/du-lich-trong-nuoc?region=Sầm Sơn",
          },
          {
            name: "Du lịch Tây Nguyên",
            href: "/du-lich-trong-nuoc?region=Tây Nguyên",
          },
        ],
      },
      {
        title: "DU LỊCH MIỀN NAM",
        items: [
          {
            name: "Du lịch Phú Quốc",
            href: "/du-lich-trong-nuoc?region=Phú Quốc",
          },
          {
            name: "Du lịch Cần Thơ",
            href: "/du-lich-trong-nuoc?region=Cần Thơ",
          },
          {
            name: "Du lịch Côn Đảo",
            href: "/du-lich-trong-nuoc?region=Côn Đảo",
          },
          {
            name: "Du lịch TP. Hồ Chí Minh",
            href: "/du-lich-trong-nuoc?region=TP. Hồ Chí Minh",
          },
        ],
      },
    ],
  },
  {
    name: "Du lịch nước ngoài",
    href: "/du-lich-nuoc-ngoai",
    megaMenu: [
      {
        title: "CHÂU Á",
        items: [
          { name: "Đông Nam Á", href: "/du-lich-nuoc-ngoai?region=Đông Nam Á" },
          { name: "Trung Quốc", href: "/du-lich-nuoc-ngoai?region=Trung Quốc" },
          { name: "Đông Bắc Á", href: "/du-lich-nuoc-ngoai?region=Đông Bắc Á" },
          { name: "Trung Đông", href: "/du-lich-nuoc-ngoai?region=Trung Đông" },
        ],
      },
      {
        title: "CHÂU ÂU",
        items: [
          {
            name: "Du lịch Châu Âu",
            href: "/du-lich-nuoc-ngoai?region=Châu Âu",
          },
        ],
      },
      {
        title: "CHÂU ÚC - MỸ",
        items: [
          { name: "Châu Úc", href: "/du-lich-nuoc-ngoai?region=Châu Úc" },
          { name: "Châu Mỹ", href: "/du-lich-nuoc-ngoai?region=Châu Mỹ" },
        ],
      },
    ],
  },
  {
    name: "MICE",
    href: "/mice",
    submenu: [
      {
        name: "Công Tác Doanh Nghiệp",
        href: "/mice?category=Công tác doanh nghiệp#journey-diary",
      },
      {
        name: "Hội Nghị, Hội Thảo",
        href: "/mice?category=Hội nghị, hội thảo#journey-diary",
      },
      {
        name: "Team Building",
        href: "/mice?category=Team Building#journey-diary",
      },
    ],
  },
  { name: "Dịch vụ du lịch", href: "/dich-vu" },
  { name: "Thông tin du lịch", href: "/cam-nang" },
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
  { name: "Liên hệ", href: "/lien-he" },
];

export function Header() {
  const { data: companyInfo } = useCompanyInfo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenSubmenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar with contact info */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{companyInfo.address}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{companyInfo.hotline}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <button
              onClick={() => setLanguage("vi")}
              className={`${
                language === "vi" ? "font-semibold" : "opacity-70"
              }`}
            >
              VI
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`${
                language === "en" ? "font-semibold" : "opacity-70"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="xl:max-w-[1536px] mx-auto px-6 lg:px-4 xl:px-4 2xl:px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="relative w-[140px] h-[64px] flex items-center"
          >
            <Image
              src="/logo1.png"
              alt="Suntravel Logo"
              fill
              priority
              sizes="555px"
              className="object-contain "
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-4 2xl:gap-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() =>
                  item.submenu || item.megaMenu
                    ? handleMouseEnter(item.name)
                    : handleMouseLeave()
                }
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1 uppercase text-xs xl:text-base"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer uppercase text-sm">
                    {item.name}
                  </button>
                )}

                {/* Standard Submenu */}
                {item.submenu && openSubmenu === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 border border-border before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-['']">
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

                {/* Mega Menu */}
                {item.megaMenu && openSubmenu === item.name && (
                  <div className="absolute top-full -left-20 lg:-left-32 xl:-left-40 mt-2 w-[900px] bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 border border-border p-6 grid grid-cols-3 gap-8 before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-['']">
                    {item.megaMenu.map((column, index) => (
                      <div key={index} className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm  text-blue-700 uppercase border-b-2 border-primary/20 pb-2 mb-2">
                          {column.title}
                        </h3>
                        <div className="flex flex-col gap-2">
                          {column.items.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="text-gray-600 hover:text-primary transition-colors text-sm"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="col-span-3 text-center mt-4 border-t pt-4">
                      <Link
                        href={item.href || "#"}
                        className="text-primary hover:underline font-medium"
                      >
                        Xem tất cả
                      </Link>
                    </div>
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
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-background border-t border-border shadow-lg overflow-y-auto max-h-[85vh] p-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="border-b border-border/50 pb-2 last:border-none"
                >
                  <div className="flex items-center justify-between py-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors font-medium flex-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium flex-1">
                        {item.name}
                      </span>
                    )}

                    {(item.submenu || item.megaMenu) && (
                      <button
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.name ? null : item.name
                          )
                        }
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu handling */}
                  {item.submenu && openSubmenu === item.name && (
                    <div className="pl-4 flex flex-col gap-1 mt-1 border-l-2 border-primary/20 animate-in slide-in-from-top-2 duration-200">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors py-2 block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mobile Mega Menu handling */}
                  {item.megaMenu && openSubmenu === item.name && (
                    <div className="pl-4 flex flex-col gap-4 mt-1 border-l-2 border-primary/20 animate-in slide-in-from-top-2 duration-200">
                      {item.megaMenu.map((section) => (
                        <div key={section.title}>
                          <p className="text-xs font-bold text-primary uppercase mb-2 mt-2">
                            {section.title}
                          </p>
                          <div className="flex flex-col gap-1">
                            {section.items.map((subitem) => (
                              <Link
                                key={subitem.name}
                                href={subitem.href}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 block"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subitem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
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
  );
}
