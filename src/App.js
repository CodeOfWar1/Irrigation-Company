import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DemoProduct from './pages/DemoProduct';
import ProjectDetail from './pages/ProjectDetail';
import CompanyProfile from './pages/CompanyProfile';
import Terms from './pages/Terms';

import { useDocTitle } from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';
import Booking from './components/Booking';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: false,      // allow animations every time elements scroll into view
        mirror: true,     // animate when scrolling back up as well
        duration: 900,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("MLD | Molad e Konsult - Bespoke Web and Mobile Applications");

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-demo" element={<DemoProduct />} />
            <Route path="/projects" element={<Navigate to="/get-demo" replace />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/portfolio" element={<CompanyProfile />} />
          </Routes>
        </ScrollToTop>
        <Booking />
      </Router>
    </>
  );
}


export default App;
