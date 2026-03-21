"use client"

import { useState } from "react"
import Link from "next/link"
import { Truck, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "#about", label: "О нас" },
  { href: "#gallery", label: "Автопарк" },
  { href: "#services", label: "Услуги" },
  { href: "#partners", label: "Партнеры" },
  { href: "#news", label: "Новости" },
  { href: "#contact", label: "Контакты" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
         <Link href="/" className="flex items-center gap-2.5 md:gap-3">
  <Image
    src="/images/logo-everest.png"          // ← твой путь к файлу
    alt="Эверест — транспортная компания"
    width={180}                             // базовый размер для расчёта пропорций
    height={54}                             // подбери под свой логотип
    className="h-8 w-auto md:h-11 lg:h-12"  // ← здесь магия
    priority
  />
  <span className="text-xl font-bold text-primary md:text-2xl lg:text-2.5xl">
    ЭВЕРЕСТ
  </span>
</Link>
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button asChild>
              <Link href="#contact">Связаться с нами</Link>
            </Button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-4 w-full">
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                Связаться с нами
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
