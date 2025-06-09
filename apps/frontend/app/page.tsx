'use client'

import { Header } from '@/components/header'
import { VideoGrid } from '@/components/video-grid'
import { VideoData } from '@packages/types/video'
import { Suspense, useEffect, useState } from 'react'


export default function Home() {
  const [videoData, setVideoData] = useState<VideoData[]>([])

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/videos`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch video data: ${response.status}`)
        }
        const data: VideoData[] = await response.json()
        setVideoData(data)
      } catch (error) {
        console.error('Failed to fetch video data:', error)
      } finally {
      }
    }
    fetchVideoData()
  }, [])


  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            お気に入りの動画を
            <span className="gradient-bg bg-clip-text text-transparent block sm:inline sm:ml-2">
              発見しよう
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Viddlyで新しい動画体験を始めませんか？
          </p>
        </div>

        {/* Videos Section */}
        <div className="animate-fade-in">
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">動画を読み込み中...</p>
            </div>
          }>
            <VideoGrid videos={videoData} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
