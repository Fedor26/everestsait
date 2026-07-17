import { Card } from "@/components/ui/card"
import { Truck, Package, Clock, Package2, Shield, MapPin } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Грузоперевозки",
    description:
      "Осуществляем перевозки грузов различного типа по всей России.Собственный автопарк современных фур.",
  },
  {
    icon: MapPin,
    title: "Логистическое планирование",
    description:
      "Профессиональная разработка оптимальных маршрутов, координация отправок и отслеживание в реальном времени через GPS-систему.",
  },
  {
    icon: Package,
    title: "Экспедирование",
    description:
      "Предоставляем услуги экспедирования грузов, обеспечивая полный контроль над процессом перевозки.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-24" style={{ backgroundColor: '#0f1829' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
          Наши услуги
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Мы предлагаем полный спектр услуг по грузоперевозкам и логистике, чтобы обеспечить безопасную и своевременную
          доставку вашего груза.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="p-6 border-border hover:border-primary transition-colors"
            >
              <service.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
