import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Home />
  </ThemeProvider>,
)
