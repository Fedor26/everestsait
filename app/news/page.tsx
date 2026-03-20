"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { CalendarDays, ArrowRight, ArrowLeft, X } from "lucide-react"
import { useNewsManager, type NewsItem } from "@/hooks/use-news-manager"
import { tagColors } from "@/lib/news-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.image && (
          <div className="relative w-full h-64 bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-card border-b border-border">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagColors[item.tag] ?? "bg-muted text-muted-foreground border-border"}`}
            >
              {item.tag}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              {item.date}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-5 leading-snug">{item.title}</h2>
          <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
            {item.body}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">{item.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewsPage() {
  const { news } = useNewsManager()
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null)
  const [filter, setFilter] = useState<string>("Все")

  const categories = ["Все", ...Array.from(new Set(news.map((n) => n.category)))]
  const filtered = filter === "Все" ? news : news.filter((n) => n.category === filter)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-10 lg:py-14">
            <Link
              href="/#news"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Все новости</h1>
            <p className="text-muted-foreground max-w-xl">
              Актуальные события, обновления маршрутов и достижения транспортной компании «Эверест».
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-16">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Новости по этой категории не найдены</p>
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNews(item)}
                  className="text-left"
                >
                  <Card className="flex flex-col h-full overflow-hidden border-border hover:border-primary transition-colors bg-card cursor-pointer hover:shadow-lg hover:shadow-primary/10">
                    {item.image && (
                      <div className="relative w-full h-40 bg-muted">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagColors[item.tag] ?? "bg-muted text-muted-foreground border-border"}`}
                        >
                          {item.tag}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 leading-snug text-foreground">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {item.excerpt}
                      </p>

                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                        <span className="text-xs text-primary font-medium flex items-center gap-1">
                          Читать далее <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </button>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />

      {activeNews && (
        <NewsModal item={activeNews} onClose={() => setActiveNews(null)} />
      )}
    </>
  )
}
