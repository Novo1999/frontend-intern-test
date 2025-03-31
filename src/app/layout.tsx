import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import Navbar from '../components/Navbar'
import './globals.css'

const kanit = Kanit({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html data-theme="light" lang="en">
      <body className={`${kanit.className} antialiased`}>
        <Navbar />
        <div className="max-w-[1440px] mx-4">{children}</div>
      </body>
    </html>
  )
}
