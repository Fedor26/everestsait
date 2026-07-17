'use client'

import { useState, useRef, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useNewsManager, type NewsItem } from '@/hooks/use-news-manager'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { X, Upload, Download, UploadCloud, LogOut } from 'lucide-react'

const CATEGORIES = ['Компания', 'Логистика', 'Партнёрство', 'Безопасность', 'Сервис']
const TAGS = ['Новинка', 'Маршрут', 'Партнёры', 'Безопасность', 'Итоги', 'Сервис']

export default function AdminNewsPage() {
  const router = useRouter()
  const { news, loading, addNews, updateNews, deleteNews, exportJSON, importJSON } = useNewsManager()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Omit<NewsItem, 'id'>>({
    date: new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Компания',
    title: '',
    excerpt: '',
    tag: 'Новинка',
    body: '',
  })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
        })
        router.push('/admin/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    })
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormData(prev => ({ ...prev, image: base64 }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.body) {
      alert('Заполните обязательные поля: Заголовок и Текст')
      return
    }
    
    if (editingId) {
      updateNews(editingId, formData)
      setEditingId(null)
    } else {
      addNews(formData)
    }

    setFormData({
      date: new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: 'Компания',
      title: '',
      excerpt: '',
      tag: 'Новинка',
      body: '',
    })
  }

  const handleEdit = (item: NewsItem) => {
    setFormData({
      date: item.date,
      category: item.category,
      title: item.title,
      excerpt: item.excerpt,
      tag: item.tag,
      body: item.body,
      image: item.image,
    })
    setEditingId(item.id)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      importJSON(file)
      alert('Новости успешно импортированы')
      e.target.value = ''
    }
  }

  if (loading) return <div className="container py-12">Загрузка...</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline">← Вернуться на сайт</Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Управление новостями</h1>
              <p className="text-muted-foreground">Добавляйте, редактируйте и удаляйте новости. Прикрепляйте изображения в формате Base64.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isPending}
              className="gap-2 h-fit"
            >
              <LogOut className="h-4 w-4" />
              {isPending ? 'Выход...' : 'Выход'}
            </Button>
          </div>

          <Tabs defaultValue="form" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="form">Новая новость</TabsTrigger>
              <TabsTrigger value="list">Список ({news.length})</TabsTrigger>
              <TabsTrigger value="backup">Резервная копия</TabsTrigger>
            </TabsList>

            {/* Форма для добавления/редактирования */}
            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? 'Редактирование новости' : 'Создание новой новости'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Дата */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Дата</label>
                      <Input
                        type="text"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        placeholder="15 марта 2025"
                      />
                    </div>

                    {/* Категория и Тег */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Категория</label>
                        <Select value={formData.category} onValueChange={(v) => handleInputChange('category', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Тег</label>
                        <Select value={formData.tag} onValueChange={(v) => handleInputChange('tag', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TAGS.map(tag => (
                              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Заголовок */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Заголовок *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Введите заголовок новости"
                        required
                      />
                    </div>

                    {/* Краткое описание */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Краткое описание</label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Краткая выдержка для карточки новости"
                        rows={3}
                      />
                    </div>

                    {/* Полный текст */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Полный текст *</label>
                      <Textarea
                        value={formData.body}
                        onChange={(e) => handleInputChange('body', e.target.value)}
                        placeholder="Введите полный текст новости"
                        rows={8}
                        required
                      />
                    </div>

                    {/* Изображение */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Изображение</label>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => imageInputRef.current?.click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Загрузить изображение
                          </Button>
                        </div>
                      </div>
                      {formData.image && (
                        <div className="mt-4 relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={formData.image}
                            alt="Превью"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: undefined }))}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Кнопки */}
                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1">
                        {editingId ? 'Сохранить изменения' : 'Создать новость'}
                      </Button>
                      {editingId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingId(null)
                            setFormData({
                              date: new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }),
                              category: 'Компания',
                              title: '',
                              excerpt: '',
                              tag: 'Новинка',
                              body: '',
                            })
                          }}
                        >
                          Отменить
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Список новостей */}
            <TabsContent value="list">
              <div className="space-y-4">
                {news.length === 0 ? (
                  <Card className="p-8 text-center text-muted-foreground">
                    Нет новостей. Создайте первую!
                  </Card>
                ) : (
                  news.map(item => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          {item.image && (
                            <div className="relative w-24 h-24 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.date} • {item.category} • {item.tag}
                                </p>
                                <p className="text-sm line-clamp-2">{item.excerpt}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(item)}
                            >
                              Редактировать
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setDeleteId(item.id)}
                            >
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Резервная копия */}
            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle>Резервная копия данных</CardTitle>
                  <CardDescription>Скачайте данные всех новостей или импортируйте из файла</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={exportJSON} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать все новости (JSON)
                  </Button>
                  
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud className="w-4 h-4 mr-2" />
                      Загрузить из файла (JSON)
                    </Button>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Совет:</strong> Регулярно скачивайте резервную копию ваших новостей. Данные хранятся локально в браузере.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Диалог подтверждения удаления */}
      {deleteId !== null && (
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Удалить новость?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Новость будет безвозвратно удалена.
            </AlertDialogDescription>
            <div className="flex gap-4">
              <AlertDialogCancel>Отменить</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                  deleteNews(deleteId)
                  setDeleteId(null)
                }}
              >
                Удалить
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
