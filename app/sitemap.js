import { site } from '@/content/site'
import { services } from '@/content/services'

export default function sitemap() {
  const now = new Date()
  const staticRoutes = ['', '/sg', '/my', '/services', '/case-studies', '/contact'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
  }))
  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
  }))
  return [...staticRoutes, ...serviceRoutes]
}
