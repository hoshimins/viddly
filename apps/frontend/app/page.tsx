'use client'

import { Header } from '@/components/header'
import { VideoGrid } from '@/components/video-grid'
import { Suspense, useEffect, useState } from 'react'
import { VideoData } from 'shared/types/video'


export default function Home() {
  const [videoData, setVideoData] = useState<VideoData[]>([])

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/videos`, {
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
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">動画一覧</h1>
        <Suspense fallback={<div>Loading videos...</div>}>
          <VideoGrid videos={videoData} />
        </Suspense>
      </main>
    </div>
  )
}
