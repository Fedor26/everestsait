"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  { src: "/images/gallery/truck1.jpg", alt: "Грузовик 1" },
  { src: "/images/gallery/truck2.jpg", alt: "Грузовик 2" },
  { src: "/images/gallery/truck3.jpg", alt: "Грузовик 3" },
  { src: "/images/gallery/truck4.jpg", alt: "Грузовик 4" },
  { src: "/images/gallery/truck5.jpg", alt: "Грузовик 5" },
  { src: "/images/gallery/truck6.jpg", alt: "Грузовик 6" },
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="gallery" className="py-16 lg:py-24" style={{ backgroundColor: '#090e1a' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Наш автопарк
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
            </button>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div 
          className="gallery-scroll md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative flex-none w-[280px] aspect-[4/3] rounded-lg overflow-hidden snap-start"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            onClick={goToPrevious}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative w-full max-w-4xl max-h-[80vh] aspect-[4/3] mx-16">
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            onClick={goToNext}
            aria-label="Следующее изображение"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </section>
  )
}
