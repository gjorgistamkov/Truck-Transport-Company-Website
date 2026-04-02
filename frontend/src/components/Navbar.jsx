import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from './Container.jsx'
import diviLogo from '../assets/divi/divi_logo-removebg.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/contact', label: 'Contact' },
  //{  to: '/quote', label: 'Quote' }
]

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300',
          isActive ? 'text-primary' : 'text-slate-700 hover:text-primary hover:bg-slate-100'
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setIsOpen(false), [pathname])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  //const cta = useMemo(() => links.find((l) => l.to === '/quote'), [])

  return (
    <header
      className={[
        'sticky top-0 z-50',
        'transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-transparent'
      ].join(' ')}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Source: https://divitransport.wordpress.com/ (downloaded to local assets) */}
          <img
            src={diviLogo}
            alt="DI-VI Transport logo"
            className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200"
            loading="eager"
          />
          <span className="text-sm font-extrabold tracking-wide text-primary">DI-VI Transport</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
          {/* <Link
            to={cta.to}
            className="ml-2 rounded-xl bg-accent-500 px-4 py-2 text-sm font-bold text-primary hover:bg-accent-600 shadow-md hover:shadow-xl transition-all duration-300"
          >
            Request a Quote
          </Link>*/}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className={[
            'md:hidden inline-flex items-center justify-center rounded-xl p-2',
            scrolled ? 'text-primary hover:bg-slate-100' : 'text-white/90 hover:bg-white/10'
          ].join(' ')}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <Container className="py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavItem key={l.to} {...l} onClick={() => setIsOpen(false)} />
            ))}
            {/* Mobile "Request a Quote" button - DISABLED */}
            {/* <Link
              to="/quote"
              className="mt-2 rounded-xl bg-accent-500 px-4 py-3 text-center text-sm font-bold text-primary hover:bg-accent-600 shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Request a Quote
            </Link>
            */}
          </Container>
        </motion.div>
      ) : null}
    </header>
  )
}

