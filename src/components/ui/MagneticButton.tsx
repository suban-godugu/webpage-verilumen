import { useRef, type MouseEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

const base =
  'inline-flex w-full px-6 py-3 text-sm items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-[colors,box-shadow,transform] will-change-transform cursor-pointer sm:w-auto overflow-hidden relative group'

const variants = {
  primary:
    'bg-text text-bg-primary shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_var(--vl-glow)] border border-transparent',
  secondary:
    'border border-border-subtle bg-elevated/80 text-text backdrop-blur-md hover:border-primary/50 hover:bg-card',
  ghost: 'border border-transparent text-text-muted hover:text-text hover:bg-border-subtle/50',
  danger: 'border border-transparent bg-critical/10 text-critical hover:bg-critical/20'
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
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const onLeave = () => {
    const el = href ? anchorRef.current : buttonRef.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === 'primary' && <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>}
    </>
  )

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
        {content}
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
      {content}
    </button>
  )
}
