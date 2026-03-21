import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    lines: ["8(8652) 90-61-48"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["Everest-26@mail.ru"],
  },
  {
    icon: MapPin,
    label: "Юридический адрес",
    lines: ["115201, г. Москва, вн.тер.г. муниципальный округ Москворечье-Сабурово, ул. Котляковская, д. 9, стр. 3"],
  },
   {
    icon: MapPin,
    label: "Почтовый адрес/обособленное подразделение в г.Ставрополе",
    lines: ["355002, г. Ставрополь ул. Пушкина 69, этаж 3,оф.304"],
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

<div className="rounded-lg overflow-hidden h-[400px] md:h-[500px] w-full relative">
  <iframe
    src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac48686c712b7b00492876df11c7b4b0a27ebc9c3c6f196d2ee293ef746114ac0&source=constructor"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
  />
  {/* Лёгкое затемнение для лучшей сочетаемости с тёмной темой сайта */}
  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
</div>
        </Card>
      </div>
    </section>
  )
}
