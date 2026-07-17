import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "#about", label: "О нас" },
  { href: "#gallery", label: "Автопарк" },
  { href: "#services", label: "Услуги" },
  { href: "#partners", label: "Партнеры" },
  { href: "#news", label: "Новости" },
  { href: "/parts", label: "Автозапчасти" },
  { href: "#contact", label: "Контакты" },
]

const services = ["Грузоперевозки", "Логистика", "Экспедирование"]

export function Footer() {
  return (
    <footer className="border-t border-border py-12" style={{ backgroundColor: '#0f1829' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">ЭВЕРЕСТ</h3>
            <p className="text-muted-foreground">
              Надежные грузовые перевозки по всей России
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>8(8652) 90-61-48</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>Everest-26@mail.ru</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Юридический адрес 115201, г. Москва, вн.тер.г. муниципальный округ Москворечье-Сабурово, ул. Котляковская, д. 9, стр. 3</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Почтовый адрес/обособленное подразделение в г.Ставрополе 355002, г. Ставрополь ул. Пушкина 69, этаж 3,оф.304</span>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} ЭВЕРЕСТ. Все права защищены.
          </p>
          
        </div>
      </div>
    </footer>
  )
}
