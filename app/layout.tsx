import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AdmitFlow — Never miss a university deadline',
  description: 'Track every university application, document, and exam in one place. Built for Bangladeshi students applying abroad.',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f1612'/%3E%3Cstop offset='100%25' stop-color='%230c0d0f'/%3E%3C/linearGradient%3E%3ClinearGradient id='stroke' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2322c55e'/%3E%3Cstop offset='100%25' stop-color='%234ade80'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='512' height='512' rx='112' fill='url(%23bg)'/%3E%3Cpath d='M148 370 L256 130 L364 370' stroke='url(%23stroke)' stroke-width='40' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Cline x1='188' y1='280' x2='324' y2='280' stroke='url(%23stroke)' stroke-width='36' stroke-linecap='round'/%3E%3Ccircle cx='256' cy='130' r='34' fill='%2322c55e'/%3E%3C%2Fsvg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'AdmitFlow — Never miss a university deadline',
    description: 'Track every university application, document, and exam in one place.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
