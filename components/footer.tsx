"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import { useCompanyInfo } from "@/hooks/use-company-info";

export function Footer() {
  const { data: companyInfo } = useCompanyInfo();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="mb-6">
              <Link href="/" className="flex flex-col items-start gap-1">
                <Image
                  src="/logo2.png"
                  alt="Suntravel Logo"
                  width={180}
                  height={60}
                  priority
                  className="object-contain translate-x-6 origin-center"
                />
              </Link>
            </div>

            <p className="text-secondary-foreground/80 mb-6">
              Uy tín dẫn đường, tận tâm theo bước
            </p>
            <div className="flex gap-4">
              {companyInfo.socialLinks?.facebook && (
                <a
                  href={companyInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {companyInfo.socialLinks?.zalo && (
                <a
                  href={companyInfo.socialLinks.zalo}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white"
                  title="Zalo"
                >
                  <span className="font-bold text-xs">Zalo</span>
                </a>
              )}
              <a
                href={`tel:${companyInfo.hotline.replace(/\./g, "").replace(/\s/g, "")}`}
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white"
                title="Hotline"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/du-lich-trong-nuoc"
                  className="hover:text-primary transition-colors"
                >
                  Du lịch trong nước
                </Link>
              </li>
              <li>
                <Link
                  href="/du-lich-nuoc-ngoai"
                  className="hover:text-primary transition-colors"
                >
                  Du lịch nước ngoài
                </Link>
              </li>
              <li>
                <Link
                  href="/mice"
                  className="hover:text-primary transition-colors"
                >
                  Dịch vụ MICE
                </Link>
              </li>
              <li>
                <Link
                  href="/cam-nang"
                  className="hover:text-primary transition-colors"
                >
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
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>{companyInfo.hotline}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Hotline */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hotline tư vấn</h4>
            <div className="space-y-4">
              {companyInfo.supportStaff?.map((staff, index) => (
                <div
                  key={index}
                  className="bg-secondary-foreground/10 p-4 rounded-lg"
                >
                  <p className="font-semibold">{staff.name}</p>
                  <a
                    href={`tel:${staff.phone.replace(/\./g, "").replace(/\s/g, "")}`}
                    className="text-lg font-bold hover:text-primary transition-colors block"
                  >
                    {staff.phone}
                  </a>
                  {staff.extension && (
                    <p className="text-sm text-secondary-foreground/70">
                      Máy lẻ {staff.extension}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/70">
          <p>&copy; 2025 Suntravel. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
