import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone, AlertCircle, Cog } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Автозапчасти | ЭВЕРЕСТ",
  description: "Купить качественные автозапчасти для грузовиков и специального транспорта",
}

export default function PartsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-10 lg:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 flex items-center gap-3">
              <Cog className="h-8 w-8 text-primary" />
              Автозапчасти
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Купить качественные автозапчасти для грузовиков и специального транспорта
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border bg-card p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Раздел находится в стадии наполнения</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Мы работаем над расширением каталога автозапчастей. В настоящее время данный раздел активно пополняется новыми позициями и информацией о наличии запасных частей.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Свяжитесь с нами
                </h3>
                <p className="text-muted-foreground mb-4">
                  По вопросам касаемо покупки автозапчастей обращаться по телефону:
                </p>
                <div className="bg-background border border-border rounded-lg p-4 mb-4">
                  <a
                    href="tel:+79614750755"
                    className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    +7 961 475 07 55
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  Наши специалисты ответят на все ваши вопросы и помогут подобрать необходимые запчасти для вашего транспорта.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Мы предлагаем оригинальные и качественные запасные части для грузовиков, с гарантией качества и конкурентными ценами.
                </p>
                <Button asChild className="w-full">
                  <Link href="/#contact">Написать нам</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
