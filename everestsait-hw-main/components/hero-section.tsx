// components/hero-section.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const HERO_TEXT = {
  title: "ЭВЕРЕСТ",
  subtitle: "- Надежный федеральный автоперевозчик",
  description: "\u041c\u044b \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u043c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u0443\u0441\u043b\u0443\u0433\u0438 \u0433\u0440\u0443\u0437\u043e\u043f\u0435\u0440\u0435\u0432\u043e\u0437\u043e\u043a \u043f\u043e \u0432\u0441\u0435\u0439 \u0420\u043e\u0441\u0441\u0438\u0438. \u041d\u0430\u0448 \u0430\u0432\u0442\u043e\u043f\u0430\u0440\u043a \u0438 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u0430\u044f \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0430\u0442 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e \u0438 \u0441\u0432\u043e\u0435\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u0443\u044e \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0443 \u0432\u0430\u0448\u0435\u0433\u043e \u0433\u0440\u0443\u0437\u0430.",
  contactBtn: "Связаться с нами",
  servicesBtn: "Наши услуги",
}

interface HeroSectionProps {
  videoUrl?: string
  useParticles?: boolean
}

export function HeroSection({ videoUrl="public/video.mp4", useParticles = false }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  // Если видео не загрузилось → показываем либо частицы, либо статичную картинку
  const showParticles = !videoUrl || videoError || !videoReady
  const useParticlesAsFallback = useParticles

  // Particles (оставляем как запасной вариант)
  useEffect(() => {
    if (!useParticlesAsFallback || !showParticles) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      containerWidth: number
      containerHeight: number

      constructor(containerWidth: number, containerHeight: number) {
        this.containerWidth = containerWidth
        this.containerHeight = containerHeight
        this.x = Math.random() * containerWidth
        this.y = Math.random() * containerHeight
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.4 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.containerWidth + 10) this.x = -10
        else if (this.x < -10) this.x = this.containerWidth + 10

        if (this.y > this.containerHeight + 10) this.y = -10
        else if (this.y < -10) this.y = this.containerHeight + 10
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(249, 115, 22, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function resizeCanvas() {
      if (!canvas) return
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return

      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx?.scale(dpr, dpr)

      initParticles(rect.width, rect.height)
    }

    function initParticles(width: number, height: number) {
      const particleCount = Math.floor((width * height) / 10000) + 30
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height))
      }
    }

    function connectParticles(ctx: CanvasRenderingContext2D) {
      const maxDistance = 150
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return

      ctx.clearRect(0, 0, rect.width, rect.height)

      for (const particle of particles) {
        particle.update()
        particle.draw(ctx)
      }

      connectParticles(ctx)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* 1. Видео-фон */}
      {videoUrl && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"           // или "metadata" если хотите экономить трафик
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Можно добавить webm как запасной вариант */}
          {/* <source src={videoUrl.replace(".mp4", ".webm")} type="video/webm" /> */}
          Ваш браузер не поддерживает видео.
        </video>
      )}

      {/* 2. Запасная картинка (если видео не загрузилось) */}
      {(videoError || !videoUrl) && !useParticlesAsFallback && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* 3. Частицы — только если явно попросили и видео не работает */}
      {showParticles && useParticlesAsFallback && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Затемняющий оверлей — очень важен для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60" />

      {/* Контент */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center py-12 md:py-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-primary">{HERO_TEXT.title}</span> {HERO_TEXT.subtitle}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {HERO_TEXT.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#contact">{HERO_TEXT.contactBtn}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#services">{HERO_TEXT.servicesBtn}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
