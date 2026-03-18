import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ЭВЕРЕСТ - Надежные грузовые перевозки',
  description: 'Надежные грузовые перевозки по всей России. Современный автопарк, профессиональная команда, безопасная и своевременная доставка вашего груза.',
  generator: 'v0.app',
  keywords: ['грузоперевозки', 'логистика', 'транспорт', 'доставка', 'Россия', 'Эверест'],
}

export const viewport: Viewport = {
  themeColor: '#f97316',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
