import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { HeroSection } from "@/components/visa/hero-section";
import { visaCountries } from "@/components/visa/visa-data";
import { VisaServicePackages } from "@/components/visa/visa-packages";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return visaCountries.map((country) => ({
    slug: country.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function VisaDetailPage({ params }: PageProps) {
  const country = visaCountries.find((c) => c.slug === params.slug);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-muted/10">
        <HeroSection
          title={`Dịch vụ Visa ${country.name}`}
          subtitle={`Hỗ trợ xin visa ${country.name} nhanh chóng, tỷ lệ đậu 99%`}
        />
        <div className="container mx-auto px-4 py-8">
          <VisaServicePackages countryName={country.name} />
        </div>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
