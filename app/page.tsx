import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { HeroBanner, BannerItem } from "@/components/hero-banner";
import { SearchBar } from "@/components/search-bar";
import { NewTours } from "@/components/sections/new-tours";
import { TravelGuides } from "@/components/sections/travel-guides";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/contact-section";
import Partners from "@/components/partners";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "../payload.config";

async function getInitialData() {
  const payload = await getPayloadHMR({ config: configPromise });

  const [heroBanners, tours, tourism] = await Promise.all([
    payload.find({
      collection: "hero-banners",
      sort: "order",
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "tours",
      sort: "-createdAt",
      limit: 6,
    }),
    payload.find({
      collection: "service_tourism",
      sort: "-createdAt",
      limit: 3,
      depth: 1,
    }),
  ]);

  return {
    banners: heroBanners.docs as unknown as BannerItem[],
    tours: tours.docs as any,
    tourism: tourism.docs,
  };
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getInitialData();

  return (
    <>
      <Header />
      <main>
        <HeroBanner items={data.banners} />
        <SearchBar />
        <NewTours initialTours={data.tours} />
        <TravelGuides initialGuides={data.tourism as any} />
        <WhyChooseUs />
        <Testimonials />
        <Partners />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
