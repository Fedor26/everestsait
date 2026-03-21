import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ServicesSection } from "@/components/services-section"
import { PartnersSection } from "@/components/partners-section"
import { NewsSection } from "@/components/news-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection videoUrl="/videos/hero-trucks.mp4" />
        <AboutSection />
        <GallerySection />
        <ServicesSection />
        <PartnersSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
