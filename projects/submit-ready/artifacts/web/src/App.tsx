import { Link, Routes, Route } from 'react-router-dom'
import { ColophonFooter } from './components/ColophonFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

/** Shell only (shot C). No PDF/image pipeline here. */
export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <strong>SubmitReady</strong>
        <nav>
          <Link to="/">Home</Link>
          {' · '}
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <ColophonFooter />
    </div>
  )
}
