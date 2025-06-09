import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

export default function UploadSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto bg-card p-6 sm:p-8 lg:p-10 rounded-2xl card-shadow text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-bg rounded-full mb-6">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              アップロード完了！
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              動画が正常にアップロードされました。
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-primary font-medium">
                動画の処理が完了次第、サイトに表示されます。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gradient-bg">
                <Link href="/">
                  トップページに戻る
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/upload">
                  別の動画をアップロード
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}