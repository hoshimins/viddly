'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadProgress } from "@/components/upload-progress"
import { videoUpload } from "@/lib/video-upload"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function VideoUploadForm() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStage, setUploadStage] = useState<'uploading' | 'processing' | 'complete' | 'error'>('uploading')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [actors, setActors] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // クリーンアップ用のuseEffect
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl)
      }
      if (thumbnailPreviewUrl) {
        URL.revokeObjectURL(thumbnailPreviewUrl)
      }
    }
  }, [videoPreviewUrl, thumbnailPreviewUrl])

  const handleVideFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setVideoFile(file)
      
      // 前のプレビューURLを削除
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl)
      }
      
      // 新しいプレビューURLを作成
      const url = URL.createObjectURL(file)
      setVideoPreviewUrl(url)
    }
  }

  const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setThumbnailFile(file)
      
      // 前のプレビューURLを削除
      if (thumbnailPreviewUrl) {
        URL.revokeObjectURL(thumbnailPreviewUrl)
      }
      
      // 新しいプレビューURLを作成
      const url = URL.createObjectURL(file)
      setThumbnailPreviewUrl(url)
    }
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUploadError(null)
    
    // Validate input fields before uploading
    if (!videoFile) {
      setUploadError('動画ファイルを選択してください')
      return
    }
    if (!title.trim()) {
      setUploadError('タイトルを入力してください')
      return
    }
    if (!description.trim()) {
      setUploadError('説明文を入力してください')
      return
    }
    if (!actors.trim()) {
      setUploadError('出演者名を入力してください')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadStage('uploading')
    
    try {
      // プログレスのシミュレーション
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            setUploadStage('processing')
            return 90
          }
          return prev + 10
        })
      }, 200)

      const result = await videoUpload({ 
        videoFile, 
        title: title.trim(), 
        description: description.trim(), 
        actors: actors.trim(), 
        thumbnailFile 
      });

      clearInterval(progressInterval)

      if (result.success) {
        setUploadProgress(100)
        setUploadStage('complete')
        
        // 少し待ってからリダイレクト
        setTimeout(() => {
          router.push('/upload/success')
        }, 1500)
      } else {
        setUploadStage('error')
        setUploadError(result.error || 'アップロードに失敗しました')
      }
    } catch (error) {
      setUploadStage('error')
      setUploadError('予期しないエラーが発生しました')
    } finally {
      setTimeout(() => {
        setIsUploading(false)
      }, 1500)
    }
  };

  if (!mounted) {
    return null
  }

  return (
    <>
      <UploadProgress
        isUploading={isUploading}
        progress={uploadProgress}
        fileName={videoFile?.name}
        stage={uploadStage}
        error={uploadError}
      />
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-card p-6 sm:p-8 rounded-2xl card-shadow animate-fade-in">
        {uploadError && !isUploading && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm font-medium">{uploadError}</p>
          </div>
        )}
      
      <div className="space-y-3">
        <Label htmlFor="video-file" className="text-sm font-semibold text-card-foreground">動画ファイル *</Label>
        <Input
          id="video-file"
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          onChange={handleVideFileChange}
          className="border-2 border-dashed border-border hover:border-primary/50 transition-colors p-6 text-center cursor-pointer"
          disabled={isUploading}
        />
        {videoFile && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3 font-medium">選択されたファイル: {videoFile.name}</p>
            {videoPreviewUrl && (
              <video 
                src={videoPreviewUrl} 
                controls 
                className="w-full max-w-md rounded-lg border mx-auto card-shadow"
                style={{ maxHeight: '200px' }}
              >
                お使いのブラウザは動画の再生に対応していません。
              </video>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="video-title" className="text-sm font-semibold text-card-foreground">動画タイトル *</Label>
        <Input
          id="video-title"
          type="text"
          placeholder="魅力的なタイトルを入力してください"
          className="bg-background border-border focus:border-primary transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUploading}
          maxLength={255}
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="video-description" className="text-sm font-semibold text-card-foreground">説明文 *</Label>
        <Textarea
          id="video-description"
          placeholder="動画の内容について詳しく説明してください"
          className="bg-background border-border focus:border-primary transition-colors min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isUploading}
          maxLength={500}
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="video-actors" className="text-sm font-semibold text-card-foreground">出ている人 *</Label>
        <Input
          id="video-actors"
          type="text"
          placeholder="出演者名（カンマ区切り）"
          className="bg-background border-border focus:border-primary transition-colors"
          value={actors}
          onChange={(e) => setActors(e.target.value)}
          disabled={isUploading}
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="thumbnail-file" className="text-sm font-semibold text-card-foreground">サムネイル（任意）</Label>
        <Input
          id="thumbnail-file"
          type="file"
          accept="image/*"
          onChange={handleThumbnailFileChange}
          className="border-2 border-dashed border-border hover:border-primary/50 transition-colors p-6 text-center cursor-pointer"
          disabled={isUploading}
        />
        {thumbnailFile && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3 font-medium">選択されたファイル: {thumbnailFile.name}</p>
            {thumbnailPreviewUrl && (
              <img 
                src={thumbnailPreviewUrl} 
                alt="サムネイルプレビュー"
                className="w-full max-w-xs rounded-lg border object-cover mx-auto card-shadow"
                style={{ maxHeight: '150px' }}
              />
            )}
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full gradient-bg h-12 text-base font-semibold" 
        disabled={isUploading}
      >
        {isUploading ? '動画を登録中...' : '動画を登録'}
      </Button>
      </form>
    </>
  )
}
