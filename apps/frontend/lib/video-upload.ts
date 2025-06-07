import type { UploadVideoData } from "@packages/types/video";
import { uploadFilesWithUppy } from "./tus-upload";

export const videoUpload = async (data: UploadVideoData): Promise<any> => {

  const metaData = new FormData();
  const fileData = new FormData();
  fileData.append('videoFile', data.videoFile);
  metaData.append('title', data.title);
  metaData.append('description', data.description);
  metaData.append('actors', data.actors);
  // サムネイルファイルがある場合のみ追加
  if (data.thumbnailFile) {
    fileData.append('thumbnailFile', data.thumbnailFile);
    metaData.append('thumbnail', data.thumbnailFile.name);
  }

  try {
    // db に保存するメタデータを送信
    // const dbResponse = await fetch('http://localhost:3000/videos/upload')
    const dbResponse = await fetch('http://localhost:3001/videos/upload', {
      method: 'POST',
      body: metaData,
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    });

    // ファイルサーバに直接動画、サムネを送信
    const fileResponse = await uploadFilesWithUppy(fileData);

    if (!dbResponse.ok || !fileResponse.ok) {
      throw new Error('Failed to upload video');
    }

    return dbResponse.json();
  } catch (error: any) {
    console.error('Failed to upload video:', error);
  }

  return null;
}