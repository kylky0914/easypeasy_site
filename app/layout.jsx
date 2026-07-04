import './globals.css'
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import JsonLd from '@/components/JsonLd'
import { LanguageProvider } from '@/components/LanguageProvider'
import { site } from '@/content/site'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'EasyPeasy — Customized AI Solutions for Singapore SMEs',
    template: '%s | EasyPeasy',
  },
  description:
    'EasyPeasy builds customized AI automations, chatbots and tools for Singapore SMEs. Free AI audit, fixed-price delivery, Singapore-based team.',
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_SG',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  address: { '@type': 'PostalAddress', addressCountry: 'SG' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd} />
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
