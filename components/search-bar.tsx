"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const isInternational = (searchText: string): boolean => {
    const lowerText = searchText.toLowerCase().trim();

    // Check if it matches any international keyword
    const hasInternationalKeyword = internationalKeywords.some((keyword) =>
      lowerText.includes(keyword.toLowerCase())
    );

    // Check if it matches any domestic keyword
    const hasDomesticKeyword = domesticKeywords.some((keyword) =>
      lowerText.includes(keyword.toLowerCase())
    );

    // If has international keyword and no domestic keyword, it's international
    if (hasInternationalKeyword && !hasDomesticKeyword) {
      return true;
    }

    // Default to domestic
    return false;
  };

  const handleSearch = () => {
    if (destination.trim()) {
      const searchTerm = destination.trim();
      const isIntl = isInternational(searchTerm);

      // Route to appropriate page
      if (isIntl) {
        router.push(
          `/du-lich-nuoc-ngoai?search=${encodeURIComponent(searchTerm)}`
        );
      } else {
        router.push(
          `/du-lich-trong-nuoc?search=${encodeURIComponent(searchTerm)}`
        );
      }
    } else {
      // If no search term, default to domestic tours
      router.push("/du-lich-trong-nuoc");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative -mt-16 z-10 container mx-auto px-4">
      <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Bạn muốn đi đâu?"
              className="pl-10 h-12"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="date" className="pl-10 h-12" />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Số người"
              type="number"
              min="1"
              className="pl-10 h-12"
            />
          </div>
          <Button
            size="lg"
            className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </section>
  );
}
