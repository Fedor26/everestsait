import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ServicesSection } from "@/components/services-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <ServicesSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
