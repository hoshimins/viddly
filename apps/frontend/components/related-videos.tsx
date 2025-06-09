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
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">関連動画</h2>
      <div className="space-y-3 sm:space-y-4">
        {videos.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id} className="flex items-start space-x-3 group">
            <div className="flex-shrink-0 w-20 h-12 sm:w-24 sm:h-16 relative overflow-hidden rounded">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-200 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 ease-in-out line-clamp-2 leading-tight">
                {video.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
