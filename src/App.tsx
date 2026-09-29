import { ThemeProvider } from './theme/ThemeProvider'
import { BackToTop } from './components/BackToTop'
import { Careers } from './components/Careers'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { SmoothScroll } from './components/SmoothScroll'
import { Solutions } from './components/Solutions'

function AppShell() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg-primary text-text">
        <Navbar />
        <main>
          <Hero />
          <Solutions />
          <Careers />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </SmoothScroll>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}
