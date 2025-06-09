'use client'

import { Button } from '@/components/ui/button'
import { VideoData } from '@packages/types/video'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface VideoGridProps {
  videos: VideoData[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Upload className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">動画がまだありません</h3>
          <p className="text-muted-foreground mb-6">最初の動画をアップロードして始めましょう！</p>
          <Button asChild className="gradient-bg">
            <Link href="/upload">
              <Upload className="w-4 h-4 mr-2" />
              動画をアップロード
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video, index) => (
        <Link href={`/video/${video.id}`} key={video.id} className="group">
          <div
            className="bg-card rounded-xl card-shadow overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl h-auto sm:h-[320px] flex flex-col animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative w-full h-48 sm:h-48 overflow-hidden">
              <Image
                // src={`http://localhost:3002/${video.thumbnail.url}`}
                src={`/${video.thumbnail.url}`}
                alt={video.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 line-clamp-2 flex-grow group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <div className="mt-auto space-y-1">
                <p className="text-xs sm:text-sm text-muted-foreground">{video.createdAt}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{video.uploader}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
