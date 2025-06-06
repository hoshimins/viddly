// uploadFilesWithUppy.ts
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'

export const uploadFilesWithUppy = (formData: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uppy = new Uppy({ autoProceed: true })
    uppy.use(XHRUpload, {
      endpoint: 'http://your-server.com/upload', // バックエンドのアップロードエンドポイント
      formData: true,
      fieldName: 'file', // 全ファイルに同じキーを使う
    })

    // 複数ファイルの場合、getAll()で取得
    const files = formData.getAll('file')
    if (!files || files.length === 0) {
      reject(new Error('ファイルが含まれていません'))
      return
    }

    files.forEach((file) => {
      if (file instanceof File) {
        uppy.addFile({
          name: file.name,
          type: file.type,
          data: file,
          source: 'formData',
          isRemote: false,
        })
      }
    })

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
