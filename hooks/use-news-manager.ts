import { useState, useEffect } from 'react'

export interface NewsItem {
  id: number
  date: string
  category: string
  title: string
  excerpt: string
  tag: string
  body: string
  image?: string
}

const STORAGE_KEY = 'everest_news_data'

export function useNewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage on client
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setNews(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse stored news:', error)
      }
    }
    setLoading(false)
  }, [])

  const saveNews = (updatedNews: NewsItem[]) => {
    setNews(updatedNews)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNews))
  }

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1
    const newItem: NewsItem = { ...item, id: newId }
    saveNews([newItem, ...news])
    return newId
  }

  const updateNews = (id: number, updates: Partial<NewsItem>) => {
    const updated = news.map(item => (item.id === id ? { ...item, ...updates } : item))
    saveNews(updated)
  }

  const deleteNews = (id: number) => {
    saveNews(news.filter(item => item.id !== id))
  }

  const exportJSON = () => {
    const dataStr = JSON.stringify(news, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `news-backup-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importJSON = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        if (Array.isArray(imported)) {
          saveNews(imported)
          return true
        }
      } catch (error) {
        console.error('Failed to import JSON:', error)
      }
      return false
    }
    reader.readAsText(file)
  }

  return {
    news,
    loading,
    addNews,
    updateNews,
    deleteNews,
    exportJSON,
    importJSON,
  }
}
