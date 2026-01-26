"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Phone, MapPin, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCompanyInfo } from "@/hooks/use-company-info";

type NavItem = {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: "Trang chủ", href: "/" },
  { name: "Du lịch trong nước", href: "/du-lich-trong-nuoc" },
  { name: "Du lịch nước ngoài", href: "/du-lich-nuoc-ngoai" },
  {
    name: "MICE",
    href: "/mice",
  },
  { name: "Dịch vụ du lịch", href: "/dich-vu" },
  { name: "Thông tin du lịch", href: "/cam-nang" },
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
  { name: "Liên hệ", href: "/lien-he" },
];

export function Header() {
  const pathname = usePathname();
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
                  item.submenu
                    ? handleMouseEnter(item.name)
                    : handleMouseLeave()
                }
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`transition-colors font-medium flex items-center gap-1 uppercase text-xs xl:text-base px-2 py-1.5 rounded-md whitespace-nowrap ${
                      (item.href === "/" && pathname === "/") ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`transition-colors font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer uppercase text-sm px-2 py-1.5 rounded-md whitespace-nowrap ${
                      pathname.startsWith(item.name.toLowerCase()) // Adjust this logic if needed for non-link items like MICE if they had a path
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
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

                    {item.submenu && (
                      <button
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.name ? null : item.name,
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
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
