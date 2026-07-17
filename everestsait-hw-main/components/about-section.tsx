import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const stats = [
  { number: "10+", label: "Лет опыта" },
  { number: "1000+", label: "Довольных клиентов" },
  { number: "20+", label: "Единиц техники" },
  { number: "1500+", label: "Доставок в год" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24" style={{ backgroundColor: '#0f1829' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
            О компании "Эверест"
          </h2>

          <div className="space-y-6 text-muted-foreground mb-12">
            <p>
              Транспортная компания "Эверест" - это надежный партнер логистического рынка России с 15-летним опытом надежного обслуживания. Мы специализируемся на комплексных решениях в сфере грузоперевозок, обеспечивая безопасную и своевременную доставку грузов по  России.
            </p>
            <p>
              Наш современный автопарк включает более 20 единиц специализированного транспорта. Каждый автомобиль оборудован GPS-системой отслеживания и встроенной системой видеонаблюдения для полного контроля над грузом.
            </p>
            <p>
              Наша команда состоит из сертифицированных водителей, логистов и диспетчеров с многолетним опытом. Мы предлагаем гибкие условия доставки,лучшие цены на рынке. С "Эверестом" ваш груз всегда в надежных руках.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="p-4 text-center border-border hover:border-primary transition-colors"
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="#gallery">
                Посмотреть наш автопарк
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
