import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import clsx from 'clsx';

import Alert from '@/components/Alert';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import NavBar from '@/components/NavBar';
import './tailwind.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const lionandHareBold = localFont({
  src: '../public/fonts/LionandHare/LionandHareBold/font.woff2',
  variable: '--font-lionandhare-bold',
  display: 'swap',
});
const lionandhareBoldItalic = localFont({
  src: '../public/fonts/LionandHare/LionandHareBoldItalic/font.woff2',
  variable: '--font-lionandhare-bold-italic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Yuri Nezdemkovski',
    template: '%s | Yuri Nezdemkovski',
  },
  description:
    'Passionate and curious human being, with extensive technical knowledge and experience leading teams to success.',
  openGraph: {
    title: 'Yuri Nezdemkovski',
    description:
      'Passionate and curious human being, with extensive technical knowledge and experience leading teams to success.',
    url: 'https://nezdemkovski.com',
    siteName: 'Yuri Nezdemkovski',
    images: [
      {
        url: 'https://nezdemkovski.com/og.png',
        width: 1200,
        height: 628,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Yuri Nezdemkovski',
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicons/favicon-96x96.ico',
    shortcut: '/favicons/favicon.ico',
    apple: [
      { url: '/favicons/apple-icon.png' },
      {
        url: '/favicons/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-76x76.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: '/favicons/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicons/apple-touch-icon-precomposed.png',
    },
  },
  verification: {},
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-whisper dark:bg-woodsmoke',
        inter.variable,
        lionandHareBold.variable,
        lionandhareBoldItalic.variable,
      )}
    >
      <head></head>
      <body>
        <div className="min-h-screen bg-whisper px-4 dark:bg-woodsmoke">
          <Alert
            title="Available for different kinds of cooperation!"
            subtitle={
              <>
                <p>
                  Open to opportunities from mid-March 2023.{' '}
                  <Link
                    href="/contact"
                    className="font-medium text-yellow-700 underline hover:text-yellow-600"
                  >
                    More info you can find here
                  </Link>
                  .
                </p>
              </>
            }
          />

          <NavBar />
          {children}
          <AnalyticsWrapper />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
