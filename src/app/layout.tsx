import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import { Suspense } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'
import Navbar from '../components/Navbar'
import { FilterProvider } from '../context/FilterContext'
import { FolderProvider } from '../context/FolderContext'
import ModalProvider from '../context/ModalContext'
import './globals.css'

const kanit = Kanit({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export const metadata: Metadata = {
  title: 'Frontend Intern Test',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html data-theme="light" lang="en">
      <body className={`${kanit.className} antialiased overflow-hidden bg-gray-100`}>
        <ModalProvider>
          <FolderProvider>
            <FilterProvider>
              <Navbar />
              <div className="relative px-4 lg:pl-0">
                <Suspense fallback={<LuLoaderCircle className="animate-spin" />}>{children}</Suspense>
              </div>
            </FilterProvider>
          </FolderProvider>
        </ModalProvider>
      </body>
    </html>
  )
}
