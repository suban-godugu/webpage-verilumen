import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-elevated/50 text-text-muted transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-elevated hover:shadow-[0_0_15px_var(--vl-glow)] overflow-hidden"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 -rotate-90'}`}>
        <Sun size={16} />
      </div>
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-90'}`}>
        <Moon size={16} />
      </div>
    </button>
  )
}
