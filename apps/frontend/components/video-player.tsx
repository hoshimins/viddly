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
    <div className="bg-card rounded-2xl card-shadow overflow-hidden">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
          <div className="flex items-center justify-between text-white">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlay} 
              className="h-10 w-10 sm:h-12 sm:w-12 hover:bg-white/20 transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute} 
                className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white/20 transition-colors"
              >
                {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
              <Slider
                className="w-16 sm:w-24"
                value={[volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => videoRef.current?.requestFullscreen()}
                className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white/20 transition-colors"
              >
                <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
