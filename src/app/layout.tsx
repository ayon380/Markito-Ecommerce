import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Markito',
  description: 'Ecommerce Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.png'/>
      </head>
      <body className={inter.className}>
        <Header />
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
