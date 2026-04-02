import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </AuthProvider>
  {/*this is commented */}
   {/*// <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </AuthProvider>
  </BrowserRouter>*/}
  
  </StrictMode>,
)
