import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated/90 text-text shadow-lg backdrop-blur-sm transition hover:border-accent-teal/50 hover:text-accent-teal"
    >
      <ChevronUp size={18} />
    </button>
  )
}
