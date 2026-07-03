import './globals.css'

export const metadata = { title: 'EasyPeasy' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  )
}
