export type VideoData = {
  id: number,
  title: string,
  description: string,
  url: string,
  uploader: string,
  createdAt: string,
  updatedAt: string,
  thumbnail: {
    url: string,
  }
}

export type UploadVideoData = {
  videoFile: File,
  title: string,
  description: string,
  actors: string,
  thumbnailFile: File?,
}

export type UploadVideoMetaData = {
  title: string,
  description: string,
  actors: string,
  thumbnailData: string,
}

export type UploadVideoFileData = {
  videoFile: File,
  thumbnailFile: File?,
}