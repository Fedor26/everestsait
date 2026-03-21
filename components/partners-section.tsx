  "use client"

import Image from "next/image"

const partners = [
  { name: "ХОЛДИНГ АКВА", logo: "/images/partners/holdingaqua.png", url: "https://holdingaqua.ru/" },
  { name: "Alvisa", logo: "/images/partners/alvisa.svg", url: "https://www.alvisa.ru/" },
  { name: "Wildberries",logo: "/images/partners/wb.png",   url: "https://www.wildberries.ru/" },
  { name: "Аквалайн", logo: "/images/partners/aqualine.svg", url: "https://aqualine.ru/" },
  { name: "megapack",      logo: "/images/partners/megapack.png",      url: "https://megapack.ru/" },
  { name: "Черноголовка", logo: "/images/partners/chernogolovka.svg", url: "https://chernogolovka.com/" },
  { name: "Регион50",      logo: "/images/partners/region50.png",      url: "https://www.region-50.ru/" },
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
  
  <div className="flex partners-scroll">
    {duplicatedPartners.map((partner, index) => (
      <div
        key={`${partner.name}-${index}`}
        className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center group"
      >
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          aria-label={`Перейти на сайт ${partner.name}`}
        >
          <div className="relative w-full h-full flex items-center justify-center rounded-lg bg-card border border-border p-4 transition-all hover:border-primary hover:bg-card/80">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={120}
              height={120}
              className="object-contain h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
            />
          </div>
        </a>
      </div>
    ))}
  </div>
</div>

{/* Static grid for mobile */}
<div className="container mx-auto px-4 mt-8 lg:hidden">
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {partners.map((partner) => (
      <a
        key={partner.name}
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Перейти на сайт ${partner.name}`}
      >
        <div className="flex items-center justify-center rounded-lg bg-card border border-border p-4 h-20 transition-all hover:border-primary hover:bg-card/80">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={80}
            height={80}
            className="object-contain h-12 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </a>
    ))}
  </div>
</div>
    </section>
  )
}
