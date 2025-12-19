import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { HeroBanner } from "@/components/hero-banner"
import { SearchBar } from "@/components/search-bar"
import { NewTours } from "@/components/sections/new-tours"
import { TravelGuides } from "@/components/sections/travel-guides"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Testimonials } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <NewTours />
        <TravelGuides />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChat />
    </>
  )
}
