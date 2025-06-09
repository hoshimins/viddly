'use client'

interface UploadProgressProps {
  isUploading: boolean
  progress?: number
  fileName?: string
  stage?: 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}

export function UploadProgress({ 
  isUploading, 
  progress = 0, 
  fileName, 
  stage = 'uploading',
  error 
}: UploadProgressProps) {
  if (!isUploading && stage !== 'error') {
    return null
  }

  const getStageText = () => {
    switch (stage) {
      case 'uploading':
        return 'アップロード中...'
      case 'processing':
        return '処理中...'
      case 'complete':
        return 'アップロード完了'
      case 'error':
        return 'エラーが発生しました'
      default:
        return 'アップロード中...'
    }
  }

  const getProgressColor = () => {
    switch (stage) {
      case 'error':
        return 'bg-red-500'
      case 'complete':
        return 'bg-green-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card p-6 sm:p-8 rounded-2xl card-shadow max-w-md w-full animate-fade-in">
        <div className="text-center">
          {stage === 'error' ? (
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                <svg 
                  className="w-6 h-6 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </div>
            </div>
          ) : stage === 'complete' ? (
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <svg 
                  className="w-6 h-6 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <svg 
                  className="w-6 h-6 text-blue-600 animate-spin" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
          )}
          
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
            {getStageText()}
          </h3>
          
          {fileName && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 break-all">
              ファイル: {fileName}
            </p>
          )}
          
          {stage === 'error' && error && (
            <p className="text-xs sm:text-sm text-destructive mb-4">
              {error}
            </p>
          )}
          
          {stage !== 'error' && stage !== 'complete' && (
            <>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {Math.round(progress)}%
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}