import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const myFont = localFont({
  src: '/Product Sans Regular.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Markito',
  description: 'Ecommerce Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className}>
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <Header />
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
