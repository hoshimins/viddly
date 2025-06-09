import { ThemeProvider } from '@/contexts/theme-context'
import '@/styles/globals.css'

export const metadata = {
  title: 'Viddly',
  description: 'A modern video streaming platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
