import { Header } from '@/components/header'
import { VideoUploadForm } from '@/components/video-upload-form'
import { Suspense } from 'react'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">動画登録</h1>
        <Suspense fallback={<div>Loading form...</div>}>
          <VideoUploadForm />
        </Suspense>
      </main>
    </div>
  )
}
