import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { SearchBar } from "@/components/search-bar";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/contact-section";
import Partners from "@/components/partners";

import { HeroBannerWrapper } from "@/components/hero-banner-wrapper";
import { NewToursWrapper } from "@/components/sections/new-tours-wrapper";
import { TravelGuidesWrapper } from "@/components/sections/travel-guides-wrapper";

// Loading Skeletons
function HeroSkeleton() {
  return (
    <div className="relative h-[500px] md:h-[600px] bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="py-20 container mx-auto px-4">
      <div className="h-10 w-1/3 bg-gray-200 rounded mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-80 bg-gray-200 rounded-2xl animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroBannerWrapper />
        </Suspense>

        <SearchBar />

        <Suspense fallback={<SectionSkeleton />}>
          <NewToursWrapper />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TravelGuidesWrapper />
        </Suspense>

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
