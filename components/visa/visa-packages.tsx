import { Check, UserRound, Luggage, Handshake } from "lucide-react";
import Link from "next/link";

interface VisaServicePackagesProps {
  countryName: string;
}

export function VisaServicePackages({ countryName }: VisaServicePackagesProps) {
  const packages = [
    {
      title: "VISA DU LỊCH",
      subtitle: "Từ Hà Nội",
      icon: <UserRound className="w-12 h-12 text-primary" />, // Orange/Secondary to match image
      requirements: [
        "Hộ chiếu",
        "Ảnh chân dung",
        "Tờ khai xin visa",
        "Chứng minh nghề nghiệp",
        "Chứng minh tài chính",
        "Giấy tờ khác theo yêu cầu",
      ],
      includes: [
        "Tư vấn chuẩn bị hồ sơ",
        "Thẩm định hồ sơ",
        "Nộp hồ sơ và theo dõi kết quả",
        "Trọn gói chi phí",
      ],
      price: "3.000.000đ",
    },
    {
      title: "VISA DU LỊCH",
      subtitle: "Từ TP. HCM",
      icon: <Luggage className="w-12 h-12 text-primary" />,
      requirements: [
        "Hộ chiếu",
        "Ảnh chân dung",
        "Tờ khai xin visa",
        "Chứng minh nghề nghiệp",
        "Chứng minh tài chính",
        "Giấy tờ khác theo yêu cầu",
      ],
      includes: [
        "Tư vấn chuẩn bị hồ sơ",
        "Thẩm định hồ sơ",
        "Nộp hồ hồ sơ và theo dõi kết quả",
        "Trọn gói chi phí",
      ],
      price: "3.300.000đ",
    },
    {
      title: "VISA THƯƠNG MẠI",
      subtitle: "Từ Hà Nội",
      icon: <Handshake className="w-12 h-12 text-primary" />, // Orange
      requirements: [
        "Hộ chiếu",
        "Ảnh chân dung",
        "Tờ khai xin visa",
        "Giấy phép kinh doanh",
        "Quyết định cử đi công tác",
        "Thư mời của phía đối tác",
      ],
      includes: [
        "Tư vấn chuẩn bị hồ sơ",
        "Thẩm định hồ sơ",
        "Nộp hồ sơ và theo dõi kết quả",
        "Trọn gói chi phí",
      ],
      price: "3.000.000đ",
    },
    {
      title: "VISA THĂM THÂN",
      subtitle: "Từ Hà Nội",
      icon: <UserRound className="w-12 h-12 text-primary" />,
      requirements: [
        "Hộ chiếu",
        "Ảnh chân dung",
        "Tờ khai xin visa",
        "Giấy tờ yêu cầu phía Việt Nam",
        "Giấy tờ yêu cầu phía Đại Loan",
        "Chứng minh mối quan hệ",
      ],
      includes: [
        "Tư vấn chuẩn bị hồ sơ",
        "Thẩm định hồ sơ",
        "Nộp hồ sơ và theo dõi kết quả",
        "Trọn gói chi phí",
      ],
      price: "3.000.000đ",
    },
    {
      title: "VISA THĂM THÂN",
      subtitle: "Từ TP.HCM",
      icon: <UserRound className="w-12 h-12 text-primary" />,
      requirements: [
        "Hộ chiếu",
        "Ảnh chân dung",
        "Tờ khai xin visa",
        "Giấy tờ yêu cầu phía Việt Nam",
        "Giấy tờ yêu cầu phía Đại Loan",
        "Chứng minh mối quan hệ",
      ],
      includes: [
        "Tư vấn chuẩn bị hồ sơ",
        "Thẩm định hồ sơ",
        "Nộp hồ sơ và theo dõi kết quả",
        "Trọn gói chi phí",
      ],
      price: "3.300.000đ",
    },
    {
      title: "VISA THƯƠNG MẠI",
      subtitle: "Từ TP.HCM",
      icon: <Handshake className="w-12 h-12 text-primary" />,
      requirements: [
        "Hộ chiếu",
        "Ảnh chân dung",
        "Tờ khai xin visa",
        "Giấy phép kinh doanh",
        "Quyết định cử đi công tác",
        "Thư mời của phía cóc đối tác",
      ],
      includes: [
        "Tư vấn chuẩn bị hồ sơ",
        "Thẩm định hồ sơ",
        "Nộp hồ sơ và theo dõi kết quả",
        "Trọn gói chi phí",
      ],
      price: "3.300.000đ",
    },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900 uppercase">
          Dịch vụ làm visa {countryName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center"
          >
            {/* Icon Circle */}
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
              {pkg.icon}
            </div>

            <h3 className="text-xl font-bold text-blue-900 uppercase mb-2">
              {pkg.title}
            </h3>
            <div className="w-16 h-0.5 bg-gray-300 mb-2"></div>
            <p className="font-semibold text-gray-700 mb-6">{pkg.subtitle}</p>

            <div className="w-full text-left space-y-6 flex-1">
              {/* Requirements */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Hồ sơ yêu cầu:</h4>
                <ul className="space-y-2">
                  {pkg.requirements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-secondary mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Dịch vụ bao gồm:
                </h4>
                <ul className="space-y-2">
                  {pkg.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-secondary mr-2 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price Button */}
            <Link href="/lien-he" className="mt-8 w-full">
              <button className="w-full cursor-pointer bg-secondary hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center transition-colors">
                {pkg.price}/Khách
                <span className="ml-2 text-xl">›</span>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
