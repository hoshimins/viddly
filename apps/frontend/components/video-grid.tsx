'use client'

import { VideoData } from '@packages/types/video'
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link href={`/video/${video.id}`} key={video.id} className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-105 h-[360px] flex flex-col">
            <div className="relative w-full h-48">
              <Image
                src={"http://0.0.0.0:3002/" + video.thumbnail.url}
                alt={video.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-grow">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{video.createdAt}</p>
              <p className="text-sm text-gray-600">{video.uploader}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
