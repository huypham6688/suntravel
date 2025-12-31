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

// Module-level cache
let cachedData: CompanyInfo | null = null;
let pendingPromise: Promise<CompanyInfo> | null = null;

export function useCompanyInfo() {
  const [data, setData] = useState<CompanyInfo>(
    cachedData || defaultCompanyInfo
  );
  const [isLoading, setIsLoading] = useState(!cachedData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If we already have data, just ensure state is up to date (though initial state should handle it)
    if (cachedData) {
      setData(cachedData);
      setIsLoading(false);
      return;
    }

    // If a fetch is already in progress, wait for it
    if (pendingPromise) {
      pendingPromise
        .then((result) => {
          setData(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
      return;
    }

    // Start a new fetch
    pendingPromise = fetch("/api/company-info")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch company info");
        }
        return response.json();
      })
      .then((result) => {
        cachedData = result; // Update cache
        return result;
      });

    pendingPromise
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error("Error in useCompanyInfo:", err);
        setError(err instanceof Error ? err : new Error("An error occurred"));
        pendingPromise = null; // Reset promise on error so we can try again later
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
