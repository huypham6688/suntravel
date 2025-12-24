import Image from "next/image";
import React from "react";

const partners = [
  {
    name: "Bộ Giáo dục và Đào tạo",
    logo: "/partners/bo-giao-duc-dao-tao.png",
  },
  {
    name: "Công đoàn Việt Nam",
    logo: "/partners/cdvn.png",
  },
  {
    name: "Bộ Kế hoạch và Đầu tư",
    logo: "/partners/bo-ke-hoach-dau-tu.png",
  },
  {
    name: "Viettel",
    logo: "/partners/viettel.png",
  },
  {
    name: "VICEM",
    logo: "/partners/vicem.png",
  },
  {
    name: "Kurabe",
    logo: "/partners/kurabe.png",
  },
  {
    name: "TOHO",
    logo: "/partners/toho.png",
  },
  {
    name: "Agribank",
    logo: "/partners/agribank.png",
  },
  {
    name: "Vietcombank",
    logo: "/partners/vietcombank.png",
  },
  {
    name: "VietinBank",
    logo: "/partners/viettinbank.png",
  },
  {
    name: "BIDV",
    logo: "/partners/bidv.png",
  },
  {
    name: "Vietnam Airlines",
    logo: "/partners/vietnam-airlines.png",
  },
  {
    name: "FPT",
    logo: "/partners/fpt.png",
  },
  {
    name: "HABECO",
    logo: "/partners/habeco.png",
  },
  {
    name: "BICO",
    logo: "/partners/bico.png",
  },
  {
    name: "Vietlott",
    logo: "/partners/vietlot.png",
  },
  {
    name: "AASC",
    logo: "/partners/aasc.png",
  },
  {
    name: "Đại học Hà Nội",
    logo: "/partners/dhy.png",
  },
];
const Partners = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">
            Hợp tác
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary  mt-2">
            Đối Tác & Khách Hàng
          </h2>
        </div>

        <div className="relative w-full overflow-hidden mask-fade-sides space-y-8">
          {/* First Row */}
          <div className="flex w-max animate-marquee space-x-12">
            {[
              ...partners.slice(0, Math.ceil(partners.length / 2)),
              ...partners.slice(0, Math.ceil(partners.length / 2)),
            ].map((partner, index) => (
              <div
                key={`row1-${index}`}
                className="group relative h-28 w-48 shrink-0"
              >
                <div className="absolute inset-0 bg-white rounded-xl border border-border/50 hover:border-primary/30 flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={90}
                    className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div
            className="flex w-max animate-marquee space-x-12"
            style={{ animationDirection: "reverse" }}
          >
            {[
              ...partners.slice(Math.ceil(partners.length / 2)),
              ...partners.slice(Math.ceil(partners.length / 2)),
            ].map((partner, index) => (
              <div
                key={`row2-${index}`}
                className="group relative h-28 w-48 shrink-0"
              >
                <div className="absolute inset-0 bg-white rounded-xl border border-border/50 hover:border-primary/30 flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={90}
                    className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
