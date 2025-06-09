import type { UploadVideoData } from "@packages/types/video";
import { uploadFilesWithUppy } from "./tus-upload";

export const videoUpload = async (data: UploadVideoData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // 1. まずメタデータをデータベースに保存
    const metaData = new FormData();
    metaData.append('title', data.title);
    metaData.append('description', data.description);
    metaData.append('actors', data.actors);
    
    if (data.thumbnailFile) {
      metaData.append('thumbnail', data.thumbnailFile.name);
    }

    const dbResponse = await fetch('http://localhost:3001/videos/upload', {
      method: 'POST',
      body: metaData,
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    });

    if (!dbResponse.ok) {
      const errorText = await dbResponse.text();
      throw new Error(`データベースへの保存に失敗しました: ${errorText}`);
    }

    const dbResult = await dbResponse.json();

    // 2. ファイルアップロード（将来的にMinIOやファイルサーバーに）
    const fileData = new FormData();
    fileData.append('videoFile', data.videoFile);
    
    if (data.thumbnailFile) {
      fileData.append('thumbnailFile', data.thumbnailFile);
    }

    // 現在はファイルアップロードをスキップ（エンドポイントが未実装のため）
    // const fileResponse = await uploadFilesWithUppy(fileData);

    return {
      success: true,
      data: dbResult
    };

  } catch (error: any) {
    console.error('動画アップロードに失敗:', error);
    return {
      success: false,
      error: error.message || '動画アップロードに失敗しました'
    };
  }
}