import { useState, useEffect } from "react";

export interface SupportStaff {
  name: string;
  phone: string;
  extension?: string;
  id?: string;
}

export interface CompanyInfo {
  address: string;
  hotline: string;
  email: string;
  workingHours?: {
    weekdays?: string;
    saturday?: string;
  };
  socialLinks?: {
    facebook?: string;
    zalo?: string;
  };
  supportStaff?: SupportStaff[];
}

const defaultCompanyInfo: CompanyInfo = {
  address: "Số 1B, Ngô Quyền, Hoàn Kiếm, Hà Nội",
  hotline: "024 39393539",
  email: "info@suntravel.vn",
  workingHours: {
    weekdays: "8:00-18:00",
    saturday: "8:00-12:00",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/suntravel.com.vn",
    zalo: "https://zalo.me/0974248805",
  },
  supportStaff: [
    {
      name: "Ms. Quyên",
      phone: "0903.287.313",
      extension: "17",
    },
    {
      name: "Ms. Hồng Anh",
      phone: "0974.248.805",
      extension: "16",
    },
  ],
};

export function useCompanyInfo() {
  const [data, setData] = useState<CompanyInfo>(defaultCompanyInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/company-info");
        if (!response.ok) {
          throw new Error("Failed to fetch company info");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error("An error occurred"));
        // Keep default data on error or maybe set to empty?
        // keeping default data ensures UI doesn't break completely
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}
