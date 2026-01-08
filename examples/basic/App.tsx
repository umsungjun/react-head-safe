import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <img src="/logo.png" alt="React Head Safe Logo" className="logo" />
            <span className="brand-name">React Head Safe</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Built with React Head Safe | Open DevTools to inspect meta tags</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
