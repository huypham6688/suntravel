"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Shield } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Uy tín, tỷ lệ đậu cao",
    desc: "Xử lý hàng ngàn visa thành công, cả các quốc gia khó và hồ sơ phức tạp.",
  },
  {
    icon: FileText,
    title: "Giá tốt, chi phí minh bạch",
    desc: "Báo giá trọn gói, không có chi phí ẩn hay phát sinh.",
  },
  {
    icon: Clock,
    title: "Quy trình đơn giản, tối ưu",
    desc: "Hệ thống tự động kết hợp chuyên viên giàu kinh nghiệm giúp rút ngắn thời gian.",
  },
];

const steps = [
  {
    id: 1,
    title: "Đăng ký tư vấn miễn phí",
    desc: "Điền form hoặc liên hệ hotline, chuyên viên của Suntravel sẽ tư vấn bạn.",
  },
  {
    id: 2,
    title: "Chuẩn bị hồ sơ",
    desc: "Chỉ cần cung cấp giấy tờ cần thiết, chúng tôi sẽ hỗ trợ hoàn thiện toàn bộ hồ sơ chuẩn theo yêu cầu của lãnh sự.",
  },
  {
    id: 3,
    title: "Nộp hồ sơ & theo dõi kết quả",
    desc: "Suntravel đại diện nộp hồ sơ và liên tục cập nhật tiến trình cho bạn.",
  },
  {
    id: 4,
    title: "Nhận visa",
    desc: "Visa được trả tận tay, kèm tư vấn đặt dịch vụ du lịch giá ưu đãi nếu bạn cần.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-primary container-fluid">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              Dịch vụ làm Visa hoàn hảo tại Suntravel
            </h2>
            <div className="w-20 h-1 bg-secondary mb-8 rounded-full" />
            <p className="text-blue-100 mb-10 text-lg">
              Chúng tôi cung cấp giải pháp visa toàn diện, giúp bạn tiết kiệm
              thời gian, công sức và tiền bạc. Hãy để Suntravel đồng hành cùng
              bạn vươn ra thế giới.
            </p>

            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-blue-100 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-center text-blue-900">
              Các bước làm visa dễ dàng
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:h-[calc(100%-40px)] before:w-0.5 before:bg-gray-200">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 z-10 ring-4 ring-white">
                    {step.id}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <Button
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 text-lg shadow-md shadow-red-200 animate-pulse"
                asChild
              >
                <Link href="/lien-he">Đăng ký tư vấn miễn phí</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Cam kết bảo mật thông tin khách hàng 100%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
