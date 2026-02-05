"use client";

import { Facebook, Phone } from "lucide-react";
import { useCompanyInfo } from "@/hooks/use-company-info";

export function FloatingChat() {
  const { data: companyInfo } = useCompanyInfo();
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {/* Phone Call */}
      <a
        href={`tel:${companyInfo.hotline.replace(/\./g, "").replace(/\s/g, "")}`}
        className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Gọi ngay"
      >
        <Phone className="w-7 h-7 text-white" />
      </a>

      {/* Zalo */}
      {companyInfo.socialLinks?.zalo && (
        <a
          href={companyInfo.socialLinks.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Chat Zalo"
        >
          <img src="/zalo.svg" alt="Zalo" className="w-10 h-10" />
        </a>
      )}

      {/* Messenger */}
      {companyInfo.socialLinks?.facebook && (
        <a
          href={companyInfo.socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-[#00B2FF] to-[#006AFF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Chat Messenger"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 text-white"
          >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>
      )}
    </div>
  );
}
