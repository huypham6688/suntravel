"use client"

import { MessageCircle, Phone } from "lucide-react"

export function FloatingChat() {
    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
            {/* Phone Call */}
            <a
                href="tel:0903287313"
                className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Gọi ngay"
            >
                <Phone className="w-7 h-7 text-white" />
            </a>

            {/* Zalo */}
            <a
                href="https://zalo.me/0903287313"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Chat Zalo"
            >
                <img
                    src="/zalo.svg"
                    alt="Zalo"
                    className="w-10 h-10"
                />
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
