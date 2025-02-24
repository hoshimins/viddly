import './styles/globals.css';


export const metadata = {
  title: 'Viddly',
  description: 'A video streaming platform',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html >
  )
}