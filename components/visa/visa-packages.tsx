import { Check, UserRound, Luggage, Handshake } from "lucide-react";
import Link from "next/link";

interface PackageItem {
  title: string;
  subtitle?: string;
  price: string;
  type?: "tourist" | "business" | "relative";
  requirements?: { text: string; id?: string }[];
  includes?: { text: string; id?: string }[];
  id?: string;
}

interface VisaServicePackagesProps {
  countryName: string;
  packages?: PackageItem[];
}

export function VisaServicePackages({
  countryName,
  packages = [],
}: VisaServicePackagesProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case "business":
        return <Handshake className="w-12 h-12 text-primary" />;
      case "relative":
        return <UserRound className="w-12 h-12 text-primary" />;
      case "tourist":
      default:
        return <Luggage className="w-12 h-12 text-primary" />;
    }
  };

  if (!packages || packages.length === 0) {
    return (
      <section className="py-12 text-center text-gray-500">
        <p>Hiện chưa có gói dịch vụ nào cho {countryName}.</p>
      </section>
    );
  }

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
            key={pkg.id || idx}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center"
          >
            {/* Icon Circle */}
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
              {getIcon(pkg.type)}
            </div>

            <h3 className="text-xl font-bold text-blue-900 uppercase mb-2">
              {pkg.title}
            </h3>
            <div className="w-16 h-0.5 bg-gray-300 mb-2"></div>
            {pkg.subtitle && (
              <p className="font-semibold text-gray-700 mb-6">{pkg.subtitle}</p>
            )}

            <div className="w-full text-left space-y-6 flex-1">
              {/* Requirements */}
              {pkg.requirements && pkg.requirements.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">
                    Hồ sơ yêu cầu:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.requirements.map((item, i) => (
                      <li
                        key={item.id || i}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-secondary mr-2 shrink-0 mt-0.5" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Includes */}
              {pkg.includes && pkg.includes.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">
                    Dịch vụ bao gồm:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, i) => (
                      <li
                        key={item.id || i}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-secondary mr-2 shrink-0 mt-0.5" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
