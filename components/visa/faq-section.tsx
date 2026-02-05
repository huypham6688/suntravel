"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCompanyInfo } from "@/hooks/use-company-info";

export function FaqSection() {
  const { data: companyInfo } = useCompanyInfo();

  const faqs = [
    {
      question: "Vì sao nên đặt dịch vụ làm visa tại Suntravel?",
      answer: (
        <div className="space-y-2">
          <p>
            Suntravel là doanh nghiệp lữ hành với hơn 15 năm kinh nghiệm trong
            lĩnh vực visa. Quý khách hoàn toàn yên tâm làm visa tại Suntravel
            vì:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Dịch vụ xin visa uy tín với hàng ngàn visa thành công mỗi năm.
            </li>
            <li>Tỷ lệ đậu cao, lên tới 98%.</li>
            <li>Giá tốt, chi phí minh bạch, cam kết không phát sinh.</li>
            <li>Tự tin xử lý cả những hồ sơ khó, phức tạp.</li>
            <li>Quy trình đơn giản, tối ưu thời gian.</li>
            <li>
              Chuyên viên tư vấn visa giàu kinh nghiệm, hỗ trợ khách hàng tận
              tình.
            </li>
            <li>
              Nhiều ưu đãi đặc quyền cho khách hàng thân thiết: tích điểm, tặng
              voucher dịp sinh nhật, giảm giá khi đặt dịch vụ khác như vé máy
              bay, phòng khách sạn, tour du lịch...
            </li>
          </ul>
          <p className="font-semibold text-secondary">
            Hãy gọi ngay{" "}
            <a
              href={`tel:${companyInfo.hotline.replace(/\./g, "").replace(/\s/g, "")}`}
              className="hover:text-primary transition-colors"
            >
              {companyInfo.hotline}
            </a>{" "}
            để được đội ngũ tư vấn hỗ trợ nhanh chóng nhất!
          </p>
        </div>
      ),
    },
    {
      question: "Xin visa đi nước ngoài cần chuẩn bị những gì?",
      answer:
        "Tùy quốc gia, nhưng hồ sơ xin visa cơ bản bao gồm: Hộ chiếu, ảnh thẻ, đơn xin visa, chứng minh tài chính, chứng minh công việc, lịch trình chuyến đi... Nếu xin visa công tác cần bổ sung thêm giấy tờ chứng minh quan hệ hợp tác, thư mời của đối tác...",
    },
    {
      question: "Xin visa có cần phỏng vấn không?",
      answer:
        "Một số nước (như Mỹ, Canada, Úc) yêu cầu phỏng vấn để làm rõ mục đích chuyến đi và khả năng tài chính. Các nước Châu Âu (Schengen) và Châu Á thường chỉ yêu cầu hồ sơ giấy, có thể yêu cầu phỏng vấn nếu cần.",
    },
    {
      question: "Xin visa có cần chứng minh tài chính không?",
      answer:
        "Hầu hết các quốc gia phát triển đều yêu cầu chứng minh khả năng tài chính trong hồ sơ xin visa. Có thể chứng minh bằng nhiều cách: thông qua sổ tiết kiệm, số dư tài khoản, sao kê lương (để chứng minh thu nhập ổn định), giấy tờ sở hữu tài sản (nhà đất, ô tô). Hồ sơ tài chính càng rõ ràng, tỷ lệ đậu càng cao.",
    },
    {
      question: "Thời điểm nào nên nộp hồ sơ xin visa?",
      answer:
        "Nên nộp hồ sơ xin visa trước ít nhất 1 - 2 tháng đối với chuyến du lịch hoặc công tác ngắn hạn. Với visa du học, lao động định cư nên nộp trước 3 - 6 tháng để có đủ thời gian xử lý và bổ sung hồ sơ nếu cần.",
    },
    {
      question: "Thời gian xét duyệt visa mất bao lâu?",
      answer:
        "Phần lớn các loại visa du lịch, công tác có thời gian xét duyệt từ 7 - 15 ngày làm việc. Với visa du học, lao động hoặc các nước khó, thời gian có thể kéo dài lâu hơn tùy thời điểm và quy định của Đại sứ quán.",
    },
    {
      question: "Nên tự xin visa hay xin qua dịch vụ visa?",
      answer:
        "Nếu hồ sơ rõ ràng, từng đi nước ngoài nhiều, có nhiều thời gian và chủ động về thời gian thì bạn có thể tự nộp. Tuy nhiên, nếu chưa có kinh nghiệm đi xin visa hoặc hồ sơ yếu, xin visa các nước khó như Nhật, Hàn, Úc, Mỹ, Canada, Schengen... hoặc muốn tối ưu thời gian thì bạn nên xin qua dịch vụ để được tư vấn và hỗ trợ 1:1 tận tình, chu đáo, tăng tỷ lệ đậu.",
    },
    {
      question: "Có thể xin visa cho cả gia đình đi cùng không?",
      answer:
        "Có. Hồ sơ gia đình thường sẽ được xét cùng nhau. Cần cung cấp giấy tờ chứng minh quan hệ như sổ hộ khẩu, giấy khai sinh, giấy đăng ký kết hôn...",
    },
    {
      question: "Có thể xin visa khẩn trong trường hợp nào?",
      answer:
        "Một số quốc gia cho phép dịch vụ visa khẩn với thời gian xét duyệt rút ngắn còn 1 - 3 ngày làm việc. Hồ sơ cần có lý do chính đáng như công tác đột xuất, tham dự hội nghị, tang lễ hoặc lý do nhân đạo.",
    },
    {
      question: "Nếu bị từ chối visa có thể xin lại không?",
      answer:
        "Có. Hầu hết các nước cho phép nộp lại hồ sơ sau một khoảng thời gian nhất định (thường là 3-6 tháng). Quan trọng là cần xác định rõ nguyên nhân bị từ chối và cải thiện bộ hồ sơ với thông tin đầy đủ, thuyết phục hơn cho lần nộp lại.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
          Câu hỏi thường gặp
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-10 rounded-full" />

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-white border text-blue-900 border-gray-200 rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:text-primary hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
