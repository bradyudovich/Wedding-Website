import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import LanguagePopup from './components/LanguagePopup';
import Home from './pages/Home';
import Travel from './pages/Travel';
import Schedule from './pages/Schedule';
import ThingsToDo from './pages/ThingsToDo';
import FAQ from './pages/FAQ';
import RSVP from './pages/RSVP';
import Registry from './pages/Registry';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const { language } = useLanguage();
  
  return (
    <>
      <Router basename="/">
        <div className="min-h-screen bg-wedding-bg font-poppins overflow-x-hidden pb-16 md:pb-0" lang={language}>
          <ScrollToHash />
          <Navbar />
          <LanguagePopup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/things-to-do" element={<ThingsToDo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/registry" element={<Registry />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
