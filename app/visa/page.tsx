import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingChat } from "@/components/floating-chat";
import { HeroSection } from "@/components/visa/hero-section";
import { StatsSection } from "@/components/visa/stats-section";
import { HotVisasSection } from "@/components/visa/hot-visas-section";
import { VisaAbroadSection } from "@/components/visa/visa-abroad-section";
import { WhyChooseUsSection } from "@/components/visa/why-choose-us-section";
import { FaqSection } from "@/components/visa/faq-section";

export default function VisaPage() {
  return (
    <>
      <Header />
      <main className="bg-muted/10">
        <HeroSection />
        <StatsSection />
        <HotVisasSection />
        <VisaAbroadSection />
        <WhyChooseUsSection />
        <FaqSection />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
