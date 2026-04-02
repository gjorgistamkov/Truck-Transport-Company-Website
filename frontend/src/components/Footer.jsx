import { Globe2, Mail, MessageSquare, Phone, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './Container.jsx'
import diviLogo from '../assets/divi/divi_logo-removebg.png'
import { company } from '../data/content.js'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {/* Source: https://divitransport.wordpress.com/ (downloaded to local assets) */}
            <img
              src={diviLogo}
              alt="DI-VI Transport logo"
              className="h-11 w-11 rounded-2xl object-cover ring-1 ring-white/15"
              loading="lazy"
            />
            <div>
              <div className="text-lg font-extrabold">DI-VI Transport</div>
              {/* <div className="text-xs text-white/70 font-semibold tracking-widest">TRANSPORT & LOGISTICS</div> */}
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Reliable transport across Europe with clear communication, disciplined dispatch, and predictable timelines.
          </p>
          <div className="flex gap-3 pt-2">
            <a className="rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition" href="#">
              <Globe2 className="h-4 w-4" />
            </a>
            <a className="rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition" href="#">
              <MessageSquare className="h-4 w-4" />
            </a>
            <a className="rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition" href="#">
              <Mail className="h-4 w-4" />
            </a>
            <a className="rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition" href="#">
              <Truck className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-bold">Navigation</div>
          <div className="grid gap-2 text-sm">
            <Link className="text-white/80 hover:text-white transition" to="/">
              Home
            </Link>
            <Link className="text-white/80 hover:text-white transition" to="/about">
              About
            </Link>
            <Link className="text-white/80 hover:text-white transition" to="/services">
              Services
            </Link>
            <Link className="text-white/80 hover:text-white transition" to="/fleet">
              Fleet
            </Link>
            <Link className="text-white/80 hover:text-white transition" to="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-bold">Services</div>
          <div className="grid gap-2 text-sm text-white/80">
            <div>International transport</div>
            <div>Domestic transport</div>
            <div>Logistics solutions</div>
            <div>Freight forwarding</div>
          </div>
          {/*<Link
            to="/quote"
            className="inline-flex mt-3 text-sm font-semibold text-primary bg-accent-500 px-4 py-2 rounded-xl hover:bg-accent-600 transition w-fit"
          >
            Request a Quote
          </Link>*/}
        </div>

        <div className="space-y-3">
          <div className="text-sm font-bold">Contact</div>
          <div className="text-sm text-white/80 space-y-3">
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 text-accent-500" />
              <div>Viber: {company.phones.viber.join(', ')}</div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 text-accent-500" />
              <div>WhatsApp: {company.phones.whatsapp.join(', ')}</div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-accent-500" />
              <div>Email: {company.email}</div>
            </div>
            <div className="text-white/70">Address: {company.locationAddress}</div>
          </div>
          {/*<Link
            to="/admin/login"
            className="inline-flex mt-3 text-sm font-semibold text-white/90 hover:text-white underline underline-offset-4"
          >
            Admin login
          </Link>
          */}
        </div>
      </Container>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/70">
        © {new Date().getFullYear()} DI-VI Transport. All rights reserved.
      </div>
    </footer>
  )
}

