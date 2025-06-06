'use client'

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string
  title: string
  addedDate: string
  actors: string
  description: string
}

export function VideoPlayer({ src, title, addedDate, actors, description }: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <Button variant="ghost" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
              <Slider
                className="w-24"
                value={[volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
              <Button variant="ghost" size="icon" onClick={() => videoRef.current?.requestFullscreen()}>
                <Maximize className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
