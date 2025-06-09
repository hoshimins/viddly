import { Uppy } from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'

export const uploadFilesWithUppy = (formData: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uppy = new Uppy({ autoProceed: true })
    uppy.use(XHRUpload, {
      endpoint: 'http://localhost:3001/files/upload',
      formData: true,
      fieldName: 'files',
    })

    // FormDataから全てのファイルを取得
    const videoFile = formData.get('videoFile') as File
    const thumbnailFile = formData.get('thumbnailFile') as File

    if (videoFile) {
      uppy.addFile({
        name: videoFile.name,
        type: videoFile.type,
        data: videoFile,
        source: 'formData',
        isRemote: false,
      })
    }

    if (thumbnailFile) {
      uppy.addFile({
        name: thumbnailFile.name,
        type: thumbnailFile.type,
        data: thumbnailFile,
        source: 'formData',
        isRemote: false,
      })
    }

    if (!videoFile && !thumbnailFile) {
      reject(new Error('ファイルが含まれていません'))
      return
    }

    uppy.on('complete', (result) => {
      resolve(result);
      // 型定義にclose()がない場合はanyでキャスト
      (uppy as any).close && (uppy as any).close()
    })

    uppy.on('error', (error) => {
      reject(error);
      (uppy as any).close && (uppy as any).close()
    })
  })
}
