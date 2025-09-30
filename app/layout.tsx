import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BearTracks.Nice - Campus Lost & Found',
  description: 'Find your lost items and help others find theirs on campus',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}