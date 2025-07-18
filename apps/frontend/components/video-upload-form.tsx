'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { videoUpload } from "@/lib/video-upload"
import { useEffect, useState } from 'react'

export function VideoUploadForm() {
  const [mounted, setMounted] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [actors, setActors] = useState('')
  // const [category, setCategory] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVideFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0])
    }
  }

  const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setThumbnailFile(event.target.files[0])
    }
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Validate input fields before uploading
    if (!videoFile) {
      alert('動画ファイルを選択してください')
      return
    }
    if (!title) {
      alert('タイトルを入力してください')
      return
    }
    if (!description) {
      alert('説明文を入力してください')
      return
    }
    if (!actors) {
      alert('出演者名を入力してください')
      return
    }

    await videoUpload({ videoFile, title, description, actors, thumbnailFile });
  };

  if (!mounted) {
    return null // or a loading placeholder
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div>
        <Label htmlFor="video-file">動画ファイル</Label>
        <Input
          id="video-file"
          type="file"
          accept="video/mp4"
          onChange={handleVideFileChange}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="video-title">動画タイトル</Label>
        <Input
          id="video-title"
          type="text"
          placeholder="タイトルを入力"
          className="mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="video-description">説明文</Label>
        <Textarea
          id="video-description"
          placeholder="動画の説明を入力"
          className="mt-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="video-actors">出ている人</Label>
        <Input
          id="video-actors"
          type="text"
          placeholder="出演者名（カンマ区切り）"
          className="mt-1"
          value={actors}
          onChange={(e) => setActors(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="video-file">サムネイル</Label>
        <Input
          id="thumbnail-file"
          type="file"
          accept="image/*"
          onChange={handleThumbnailFileChange}
          className="mt-1"
        />
      </div>
      {/* <div>
        <Label htmlFor="video-category">タグ</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="カテゴリーを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nature">自然</SelectItem>
            <SelectItem value="travel">旅行</SelectItem>
            <SelectItem value="food">料理</SelectItem>
            <SelectItem value="technology">テクノロジー</SelectItem>
            <SelectItem value="other">その他</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <Button type="submit" className="w-full">動画を登録</Button>
    </form>
  )
}
