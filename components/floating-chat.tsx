"use client"

import { MessageCircle } from "lucide-react"

export function FloatingChat() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {/* Zalo */}
      <a
        href="https://zalo.me/0903287313"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Chat Zalo"
      >
        <svg viewBox="0 0 48 48" className="w-8 h-8 fill-white">
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm8.85 27.85c-.35.35-.8.53-1.25.53s-.9-.18-1.25-.53l-3.6-3.6-3.6 3.6c-.35.35-.8.53-1.25.53s-.9-.18-1.25-.53a1.77 1.77 0 010-2.5l3.6-3.6-3.6-3.6a1.77 1.77 0 012.5-2.5l3.6 3.6 3.6-3.6a1.77 1.77 0 012.5 2.5l-3.6 3.6 3.6 3.6c.7.7.7 1.8 0 2.5z" />
        </svg>
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/suntravel"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-gradient-to-br from-[#00B2FF] to-[#006AFF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Chat Messenger"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  )
}
