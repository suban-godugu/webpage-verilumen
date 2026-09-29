import { useRef, type MouseEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

const base =
  'fluid-btn inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-[colors,box-shadow] will-change-transform cursor-pointer sm:w-auto'

const variants = {
  primary:
    'bg-gradient-to-r from-accent to-accent-blue text-bg-primary shadow-[0_0_20px_var(--vl-glow)] hover:opacity-95',
  secondary:
    'border border-border bg-bg-elevated/80 text-text backdrop-blur-md hover:border-accent/55',
  ghost: 'border border-transparent text-text-muted hover:text-text hover:border-border',
}

export function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  disabled,
}: Props) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const classes = `${base} ${variants[variant]} ${className}`

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = href ? anchorRef.current : buttonRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`
  }

  const onLeave = () => {
    const el = href ? anchorRef.current : buttonRef.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={classes}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  )
}
