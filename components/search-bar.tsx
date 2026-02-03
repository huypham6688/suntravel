"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

// List of international destinations/keywords
const internationalKeywords = [
  // Asian countries
  "thái lan",
  "thailand",
  "bangkok",
  "pattaya",
  "phuket",
  "singapore",
  "singapo",
  "malaysia",
  "kuala lumpur",
  "indonesia",
  "bali",
  "campuchia",
  "cambodia",
  "angkor",
  "nhật bản",
  "nhật",
  "japan",
  "tokyo",
  "osaka",
  "kyoto",
  "hàn quốc",
  "hàn",
  "korea",
  "seoul",
  "trung quốc",
  "trung",
  "china",
  "bắc kinh",
  "beijing",
  "thượng hải",
  "shanghai",
  "đài loan",
  "taiwan",

  // Middle East
  "dubai",
  "uae",
  "abu dhabi",

  // Europe
  "châu âu",
  "europe",
  "pháp",
  "france",
  "paris",
  "anh",
  "england",
  "london",
  "uk",
  "đức",
  "germany",
  "berlin",
  "ý",
  "italy",
  "rome",
  "venice",
  "tây ban nha",
  "spain",
  "madrid",
  "barcelona",
  "nga",
  "russia",
  "moscow",

  // Americas
  "châu mỹ",
  "mỹ",
  "america",
  "usa",
  "new york",
  "los angeles",

  // Africa
  "châu phi",
  "africa",
  "nam phi",
  "south africa",

  // Oceania
  "châu úc",
  "úc",
  "australia",
  "sydney",
  "melbourne",
];

// List of domestic locations
const domesticKeywords = [
  "hà nội",
  "hanoi",
  "sapa",
  "sa pa",
  "hạ long",
  "ha long",
  "quảng ninh",
  "ninh bình",
  "ninh binh",
  "đà nẵng",
  "da nang",
  "hội an",
  "hoi an",
  "bà nà",
  "ba na",
  "huế",
  "hue",
  "nha trang",
  "đà lạt",
  "da lat",
  "dalat",
  "phú quốc",
  "phu quoc",
  "vũng tàu",
  "vung tau",
  "cần thơ",
  "can tho",
  "miền bắc",
  "miền trung",
  "miền nam",
  "tây nguyên",
  "việt nam",
  "vietnam",
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const isInternational = (searchText: string): boolean => {
    const lowerText = searchText.toLowerCase().trim();

    // Check if it matches any international keyword
    const hasInternationalKeyword = internationalKeywords.some((keyword) =>
      lowerText.includes(keyword.toLowerCase()),
    );

    // Check if it matches any domestic keyword
    const hasDomesticKeyword = domesticKeywords.some((keyword) =>
      lowerText.includes(keyword.toLowerCase()),
    );

    // If has international keyword and no domestic keyword, it's international
    if (hasInternationalKeyword && !hasDomesticKeyword) {
      return true;
    }

    // Default to domestic
    return false;
  };

  const handleSearch = () => {
    if (query.trim()) {
      const searchTerm = query.trim();
      const isIntl = isInternational(searchTerm);

      // Route to appropriate page
      if (isIntl) {
        router.push(
          `/du-lich-nuoc-ngoai?search=${encodeURIComponent(searchTerm)}`,
        );
      } else {
        router.push(
          `/du-lich-trong-nuoc?search=${encodeURIComponent(searchTerm)}`,
        );
      }
    } else {
      // If no search term, default to domestic tours
      router.push("/du-lich-trong-nuoc");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="absolute bottom-0 left-1/2 z-20 w-[90%] max-w-3xl -translate-x-1/2 translate-y-1/2 transform rounded-2xl bg-white p-4 shadow-xl sm:w-full">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm tour, địa điểm..."
            className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleSearch}
          className="hidden rounded-xl bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/80 hover:shadow-orange-500/30 sm:block"
        >
          Tìm kiếm
        </button>
        <button
          onClick={handleSearch}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg transition-all hover:bg-orange-700 sm:hidden"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
