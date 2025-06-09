import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AdjusterTrack - Insurance Adjuster License Management & CE Tracking Software',
  description: 'Professional license management software for insurance adjusters. Track licenses, manage CE credits, get renewal reminders across all 50 states. Never miss a deadline again.',
  keywords: 'insurance adjuster license tracking, adjuster license management, CE credit tracking, insurance license renewal, continuing education tracking, adjuster compliance software, license renewal reminders, insurance adjuster software, multi-state license tracking',
  authors: [{ name: 'AdjusterTrack' }],
  creator: 'AdjusterTrack',
  publisher: 'AdjusterTrack',
  category: 'Business Software',
  classification: 'Insurance Technology',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adjustertrack.com',
    siteName: 'AdjusterTrack',
    title: 'AdjusterTrack - Insurance Adjuster License Management Software',
    description: 'Professional license management software for insurance adjusters. Track licenses, manage CE credits, get renewal reminders across all 50 states.',
    images: [
      {
        url: 'https://adjustertrack.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdjusterTrack - Insurance Adjuster License Management Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@adjustertrack',
    creator: '@adjustertrack',
    title: 'AdjusterTrack - Insurance Adjuster License Management Software',
    description: 'Track licenses, manage CE credits, get renewal reminders. Never miss a deadline again.',
    images: ['https://adjustertrack.com/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  alternates: {
    canonical: 'https://adjustertrack.com',
  },
  other: {
    'application-name': 'AdjusterTrack',
    'apple-mobile-web-app-title': 'AdjusterTrack',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#000000',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8WNZP0DW66"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8WNZP0DW66');
            `,
          }}
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AdjusterTrack",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Professional license management software for insurance adjusters. Track licenses, manage CE credits, get renewal reminders across all 50 states.",
              "url": "https://adjustertrack.com",
              "publisher": {
                "@type": "Organization",
                "name": "AdjusterTrack",
                "url": "https://adjustertrack.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://adjustertrack.com/logo.png"
                },
                "sameAs": [
                  "https://twitter.com/adjustertrack",
                  "https://linkedin.com/company/adjustertrack"
                ]
              },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "39",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "category": "SoftwareApplication"
              },
              "audience": {
                "@type": "ProfessionalAudience",
                "audienceType": "Insurance Adjusters"
              },
              "featureList": [
                "License tracking across all 50 states",
                "Continuing education credit management",
                "Automated renewal reminders",
                "Document storage and management",
                "Calendar view of important dates",
                "SMS and email notifications"
              ],
              "screenshot": "https://adjustertrack.com/screenshot.jpg",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "247",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AdjusterTrack",
              "url": "https://adjustertrack.com",
              "description": "Insurance adjuster license management and continuing education tracking software",
              "publisher": {
                "@type": "Organization",
                "name": "AdjusterTrack"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://adjustertrack.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Structured Data - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is AdjusterTrack?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AdjusterTrack is professional license management software designed specifically for insurance adjusters to track licenses, manage continuing education credits, and receive renewal reminders across all 50 states."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does license tracking work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our software automatically tracks your adjuster licenses across multiple states, monitors expiration dates, tracks continuing education requirements, and sends you timely reminders before deadlines."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which states are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AdjusterTrack supports license tracking and continuing education management for insurance adjusters in all 50 U.S. states, with state-specific requirements and regulations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer a free trial?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer a 30-day free trial with full access to all features. No credit card required to start your trial."
                  }
                }
              ]
            })
          }}
        />

        {/* Performance and SEO optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://adjustertrack.com" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon and Apple Touch Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Additional meta for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AdjusterTrack" />
      </head>
      <body>{children}</body>
    </html>
  )
}