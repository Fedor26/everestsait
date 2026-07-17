"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { CalendarDays, ArrowRight, X } from "lucide-react"
import { useNewsManager } from "@/hooks/use-news-manager"
import { tagColors } from "@/lib/news-data"
import type { NewsItem } from "@/hooks/use-news-manager"

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
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

        {/* Header */}
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

        {/* Body */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-5 leading-snug text-balance">
            {item.title}
          </h2>
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

export function NewsSection() {
  const { news } = useNewsManager()
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null)
  const preview = news.slice(0, 3)

  return (
    <section id="news" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Новости</h2>
            <p className="text-muted-foreground max-w-xl">
              Следите за последними событиями и обновлениями транспортной компании «Эверест».
            </p>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-1.5 text-primary font-medium hover:underline shrink-0"
          >
            Все новости
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Новости будут добавлены в ближайшее время</p>
            </div>
          ) : (
            preview.map((item) => (
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

                    <h3 className="text-lg font-semibold mb-3 leading-snug text-balance text-foreground">
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

      {activeNews && (
        <NewsModal item={activeNews} onClose={() => setActiveNews(null)} />
      )}
    </section>
  )
}
