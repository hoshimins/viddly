import '@/styles/globals.css'

export const metadata = {
  title: 'Viddly Admin',
  description: 'Viddly管理画面',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}