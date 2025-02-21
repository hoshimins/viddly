'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface RelatedVideo {
  id: string
  title: string
  thumbnail: string
}

interface RelatedVideosProps {
  videos: RelatedVideo[]
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">関連動画</h2>
      {videos.map((video) => (
        <Link href={`/video/${video.id}`} key={video.id} className="flex items-center space-x-3 group">
          <div className="flex-shrink-0 w-24 h-16 relative overflow-hidden rounded">
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-200 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="flex-grow text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 ease-in-out">
            {video.title}
          </p>
        </Link>
      ))}
    </div>
  )
}
