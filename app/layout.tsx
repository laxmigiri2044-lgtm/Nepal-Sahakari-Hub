import type { Metadata } from 'next'
import { Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import Providers from '../components/providers'

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-sans-devanagari',
})

export const metadata: Metadata = {
  title: 'Nepal Sahakari Hub',
  description: 'Multi-tenant cooperative website platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ne" className={notoSansDevanagari.variable}>
      <body className={notoSansDevanagari.variable}>
        <Providers>
          <body className="font-sans">{children}</body>
        </Providers>
      </body>
    </html>
  )
}