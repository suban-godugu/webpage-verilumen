import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeScale, fadeUp } from '../../lib/motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'scale'
}

export function ScrollReveal({ children, className = '', delay = 0, variant = 'up' }: Props) {
  const reduced = useReducedMotion()
  const variants = variant === 'scale' ? fadeScale : fadeUp

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
