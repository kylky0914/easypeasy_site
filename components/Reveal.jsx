'use client'

import { useEffect, useRef, useState } from 'react'

// Fades + slides children into place the first time they enter the viewport.
// Reduced-motion users see content in its final state immediately (both via
// the `motion-reduce` CSS override below and because the transition itself
// is disabled), so this never blocks content on a scroll event.
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
