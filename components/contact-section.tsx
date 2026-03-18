import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    lines: ["+7 (495) 123-45-67", "Доступен 24/7"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["zakaz@everest-trucks.ru", "info@everest-trucks.ru"],
  },
  {
    icon: MapPin,
    label: "Адрес офиса",
    lines: ["г. Москва, ул. Логистическая, д. 42, офис 301", "Пн-Пт: 8:00 - 20:00"],
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24" style={{ backgroundColor: '#090e1a' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
          Связаться с нами
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Если у вас есть вопросы или вы хотите заказать перевозку, свяжитесь с нами по указанным контактам.
        </p>

        <Card className="max-w-4xl mx-auto p-6 lg:p-8 border-border">
          <h3 className="text-xl lg:text-2xl font-semibold text-center mb-8">
            Контактная информация
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-medium mb-2">{item.label}</h4>
                {item.lines.map((line, idx) => (
                  <p key={idx} className="text-muted-foreground text-sm">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-lg overflow-hidden h-[300px] bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Карта загрузится здесь</p>
              <p className="text-sm mt-1">г. Москва, ул. Примерная, д. 123</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
