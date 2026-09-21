import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import '../styles/tailwind.css';

const outfitFont = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'JK Staffing — UK Staffing & Workforce Management Services',
  description: 'JK Staffing & Services Management Ltd connects UK businesses with reliable staff and helps job seekers find opportunities across security, logistics, hospitality, healthcare and more.',
  keywords: 'staffing agency UK, recruitment services UK, temporary staffing, permanent recruitment, security staffing, workforce management, HR support UK',
  openGraph: {
    title: 'JK Staffing — Connecting People & Businesses',
    description: 'UK-based workforce agency specialising in staffing, recruitment and workforce management.',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JK Staffing — UK Staffing & Workforce Management',
    description: 'Connecting businesses with reliable people and candidates with great opportunities.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={outfitFont.variable}>
      <body className={outfitFont.className}>
        {children}
</body>
    </html>
  );
}