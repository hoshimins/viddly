'use client'

import { Header } from '@/components/header'
import { RelatedVideos } from '@/components/related-videos'
import { VideoPlayer } from '@/components/video-player'
import { Suspense, useEffect, useState } from 'react'
import { VideoData } from 'shared/types/video'

const relatedVideos = [
  { id: '2', title: '都市の夜景', thumbnail: '/placeholder.svg?height=90&width=160' },
  { id: '3', title: '海中の生き物たち', thumbnail: '/placeholder.svg?height=90&width=160' },
  { id: '4', title: '四季の移ろい', thumbnail: '/placeholder.svg?height=90&width=160' },
  { id: '5', title: '世界の絶景', thumbnail: '/placeholder.svg?height=90&width=160' },
]

export default function VideoPage({ params }: { params: { id: string } }) {
  const [videoData,setVideoData] = useState<VideoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/videos/${params.id}`)
        if(!response.ok) {
          throw new Error('Failed to fetch video data')
        }
        const data: VideoData = await response.json()
        setVideoData(data)
      } catch (error) {
        console.error('Failed to fetch video data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVideoData()
  }, [params.id])

  if(!videoData) {
    return <div>Video not found</div>
  }

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
                src={"http://localhost:3002/" + videoData.url}
                title={videoData.title}
                addedDate={videoData.createdAt}
                actors={videoData.uploader}
                description={videoData.description}
              />
            </Suspense>
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{videoData.title}</h1>
              <p className="text-sm text-gray-600 mb-4">追加日: {videoData.createdAt}</p>
              <p className="text-sm text-gray-600 mb-4">出演: {videoData.uploader}</p>
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
