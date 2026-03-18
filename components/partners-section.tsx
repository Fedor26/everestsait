"use client"

import Image from "next/image"

const partners = [
  { name: "Газпром", logo: "/images/partners/gazprom.svg" },
  { name: "Роснефть", logo: "/images/partners/rosneft.svg" },
  { name: "Лукойл", logo: "/images/partners/lukoil.svg" },
  { name: "Сбербанк", logo: "/images/partners/sberbank.svg" },
  { name: "РЖД", logo: "/images/partners/rzd.svg" },
  { name: "Ростелеком", logo: "/images/partners/rostelecom.svg" },
  { name: "МТС", logo: "/images/partners/mts.svg" },
  { name: "Магнит", logo: "/images/partners/magnit.svg" },
]

export function PartnersSection() {
  // Duplicate partners for seamless scrolling
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section id="partners" className="py-16 lg:py-24" style={{ backgroundColor: '#0f1829' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
          Наши партнеры
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Мы гордимся сотрудничеством с ведущими компаниями России, которые доверяют нам свои грузы
        </p>
      </div>

      {/* Scrolling Partners */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex partners-scroll">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center group"
            >
              <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-card border border-border p-4 transition-all hover:border-primary hover:bg-card/80">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={120}
                  className="object-contain h-16 w-auto opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static grid for mobile */}
      <div className="container mx-auto px-4 mt-8 lg:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center rounded-lg bg-card border border-border p-4 h-20"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={80}
                height={80}
                className="object-contain h-12 w-auto opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
