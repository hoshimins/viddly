'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/contexts/theme-context"
import { Search, Upload, Menu, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="glass sticky top-0 z-40 border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-bg bg-clip-text text-transparent flex-shrink-0">
            Viddly
          </Link>
          
          {/* Desktop Navigation and Actions */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
            <nav className="flex space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                動画一覧
              </Link>
              <Link href="/mypage" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                マイページ
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="動画を検索..."
                  className="w-48 bg-background/50 border-border/50"
                />
                <Button size="icon" variant="ghost" className="ml-1">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={toggleTheme}
                className="relative"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">テーマを切り替え</span>
              </Button>
              <Button asChild className="gradient-bg">
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  アップロード
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/40 pt-4 animate-fade-in">
            <nav className="flex flex-col space-y-3 mb-4">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                動画一覧
              </Link>
              <Link 
                href="/mypage" 
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                マイページ
              </Link>
            </nav>
            <div className="space-y-3">
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="動画を検索..."
                  className="flex-1 bg-background/50 border-border/50"
                />
                <Button size="icon" variant="ghost" className="ml-1">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={toggleTheme}
                  className="relative"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">テーマを切り替え</span>
                </Button>
                <Button asChild className="flex-1 gradient-bg">
                  <Link href="/upload" onClick={() => setIsMobileMenuOpen(false)}>
                    <Upload className="h-4 w-4 mr-2" />
                    動画をアップロード
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
