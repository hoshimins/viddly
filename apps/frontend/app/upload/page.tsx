import { Header } from '@/components/header'
import { VideoUploadForm } from '@/components/video-upload-form'
import { Suspense } from 'react'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            動画を
            <span className="gradient-bg bg-clip-text text-transparent ml-2">
              アップロード
            </span>
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            あなたの動画をViddlyで共有しましょう
          </p>
        </div>
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">フォームを読み込み中...</p>
          </div>
        }>
          <VideoUploadForm />
        </Suspense>
      </main>
    </div>
  )
}
