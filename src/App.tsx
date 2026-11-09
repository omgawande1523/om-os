import Home from './pages/Home'
import { ThemeProvider } from './components/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  )
}
