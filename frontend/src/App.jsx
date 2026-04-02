import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Navbar } from './components/Navbar.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { AdminDashboardPage } from './pages/AdminDashboardPage.jsx'
import { AdminLoginPage } from './pages/AdminLoginPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { FleetPage } from './pages/FleetPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { QuotePage } from './pages/QuotePage.jsx'
import { ServicesPage } from './pages/ServicesPage.jsx'

export default function App() {
  return (
    <Router>
    <div className="min-h-dvh flex flex-col bg-gray-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/quote" element={<QuotePage />} /> */}

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
    </Router>
  )
}
