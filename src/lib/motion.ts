import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function useMotionSafe() {
  const reduced = useReducedMotion()
  return !reduced
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 },
}

export const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
}

export type WithChildren = { children: ReactNode; className?: string }
