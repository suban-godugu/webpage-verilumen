import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import { BackToTop } from './components/BackToTop'
import { BspValidationPage } from './components/bsp/BspValidationPage'
import { Careers } from './components/Careers'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { SmoothScroll } from './components/SmoothScroll'
import { Solutions } from './components/Solutions'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const scroll = () => {
      if (hash) {
        const target = document.getElementById(hash.slice(1))
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY
          window.scrollTo(0, top)
          return
        }
      }
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
    }

    scroll()
    const frame = window.requestAnimationFrame(scroll)
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <Careers />
      <Contact />
    </>
  )
}

function AppShell() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll>
        <div className="min-h-screen bg-bg-primary text-text flex flex-col font-sans transition-colors duration-300 overflow-x-hidden">
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions/bsp-validation" element={<BspValidationPage />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}
