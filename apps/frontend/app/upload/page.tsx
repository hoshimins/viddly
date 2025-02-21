import { Header } from '@/components/header'
import { RelatedVideos } from '@/components/related-videos'
import { VideoPlayer } from '@/components/video-player'
import { Suspense } from 'react'

// 仮のデータ
const videoData = {
  id: '1',
  title: '美しい自然風景',
  src: '/placeholder.mp4',
  addedDate: '2023-05-15',
  actors: ['自然愛好家A', '自然愛好家B'],
  description: 'この動画では、世界中の美しい自然風景を紹介します。壮大な山々、広大な海、豊かな森林など、地球の素晴らしさを感じることができます。',
}

const relatedVideos = [
  { id: '2', title: '都市の夜景', thumbnail: '/placeholder.svg?height=90&width=160' },
  { id: '3', title: '海中の生き物たち', thumbnail: '/placeholder.svg?height=90&width=160' },
  { id: '4', title: '四季の移ろい', thumbnail: '/placeholder.svg?height=90&width=160' },
  { id: '5', title: '世界の絶景', thumbnail: '/placeholder.svg?height=90&width=160' },
]

export default function VideoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading video player...</div>}>
              <VideoPlayer
                src={videoData.src}
                title={videoData.title}
                addedDate={videoData.addedDate}
                actors={videoData.actors}
                description={videoData.description}
              />
            </Suspense>
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{videoData.title}</h1>
              <p className="text-sm text-gray-600 mb-4">追加日: {videoData.addedDate}</p>
              <p className="text-sm text-gray-600 mb-4">出演: {videoData.actors.join(', ')}</p>
              <p className="text-gray-700">{videoData.description}</p>
            </div>
          </div>
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading related videos...</div>}>
              <RelatedVideos videos={relatedVideos} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
