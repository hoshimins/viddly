'use client'

import { Header } from '@/components/header'
import { RelatedVideos } from '@/components/related-videos'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/video-player'
import { VideoData } from '@packages/types/video'
import { Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'

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
        const response = await fetch(`http://localhost:3001/videos/${params.id}`)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground text-lg">動画を読み込み中...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!videoData) {
    return (
      <div className="min-h-screen bg-background">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">動画が見つかりません</h1>
            <p className="text-muted-foreground mb-8">指定された動画は存在しないか、削除された可能性があります。</p>
            <Button asChild className="gradient-bg">
              <Link href="/">
                トップページに戻る
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
          <div className="xl:w-3/4">
            <Suspense fallback={
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground mt-4">プレーヤーを読み込み中...</p>
              </div>
            }>
              <VideoPlayer
                // src={"http://localhost:3002/" + videoData.url}
                src={`/${videoData.url}`}
                title={videoData.title}
                addedDate={videoData.createdAt}
                actors={videoData.uploader}
                description={videoData.description}
              />
            </Suspense>
            <div className="mt-6 bg-card p-6 sm:p-8 rounded-2xl card-shadow">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{videoData.title}</h1>
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {videoData.createdAt}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {videoData.uploader}
                </span>
              </div>
              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">説明</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{videoData.description}</p>
              </div>
            </div>
          </div>
          <div className="xl:w-1/4">
            <Suspense fallback={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <p className="text-muted-foreground mt-2 text-sm">関連動画を読み込み中...</p>
              </div>
            }>
              <RelatedVideos videos={relatedVideos} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
