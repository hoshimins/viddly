'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a simple placeholder
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          VideoSite
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">動画一覧</Link>
          <Link href="/upload" className="text-gray-600 hover:text-blue-600">動画登録</Link>
          <Link href="/mypage" className="text-gray-600 hover:text-blue-600">マイページ</Link>
        </nav>
        <div className="flex items-center">
          <Input
            type="search"
            placeholder="動画を検索..."
            className="mr-2"
          />
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
          </div>
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
