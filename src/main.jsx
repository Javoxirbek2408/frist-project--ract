import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from './context/AuthContext'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </BrowserRouter>

)
