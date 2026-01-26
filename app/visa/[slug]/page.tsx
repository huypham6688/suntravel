import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { HeroSection } from "@/components/visa/hero-section";
import { VisaServicePackages } from "@/components/visa/visa-packages";
import { notFound } from "next/navigation";
import configPromise from "@/payload.config";
import { getPayload } from "payload";

export async function generateStaticParams() {
  const payload = await getPayload({
    config: configPromise,
  });

  const { docs: countries } = await payload.find({
    collection: "countries",
    limit: 100,
  });

  return countries.map((country) => ({
    slug: country.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VisaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({
    config: configPromise,
  });

  const { docs: countries } = await payload.find({
    collection: "countries",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  if (!countries || countries.length === 0) {
    notFound();
  }

  const country = countries[0];

  return (
    <>
      <Header />
      <main className="bg-muted/10">
        <HeroSection
          title={`Dịch vụ Visa ${country.name}`}
          subtitle={`Hỗ trợ xin visa ${country.name} nhanh chóng`}
        />
        <div className="container mx-auto px-4 py-8">
          <VisaServicePackages
            countryName={country.name}
            // @ts-ignore - payload types might need generation but structure matches
            packages={country.packages}
          />
        </div>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
