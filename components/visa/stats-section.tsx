"use client";

import { Award, CheckCircle, ThumbsUp, Trophy } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-8 bg-white -mt-10 relative z-10 shadow-lg mx-4 md:mx-auto max-w-6xl rounded-xl border border-gray-100">
      <div className="flex flex-col lg:flex-row items-center gap-8 px-6 py-2">
        {/* Left Block */}
        <div className="flex items-center gap-4 lg:pr-12 lg:border-r border-gray-200 shrink-0 relative">
          <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <div>
            <p className="text-orange-500 font-semibold text-base sm:text-lg">
              20 năm chặng đường
            </p>
            <p className="text-primary font-bold text-lg sm:text-xl uppercase tracking-wide">
              CHINH PHỤC MỘT NIỀM TIN
            </p>
          </div>
        </div>

        {/* Right Block */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 rounded-full border-2 border-primary/20">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">5,000+</p>
              <p className="text-muted-foreground text-sm">Visa thành công</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 rounded-full border-2 border-primary/20">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground text-sm">Tỷ lệ đậu Visa</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 rounded-full border-2 border-primary/20">
              <ThumbsUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">99%+</p>
              <p className="text-muted-foreground text-sm">
                Khách hàng hài lòng
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
