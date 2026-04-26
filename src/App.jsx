import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import LanguagePopup from './components/LanguagePopup';
import SiteLock from './components/SiteLock';
import { SiteLockProvider, useSiteLock } from './context/SiteLockContext';
import Home from './pages/Home';
import Travel from './pages/Travel';
import Schedule from './pages/Schedule';
import ThingsToDo from './pages/ThingsToDo';
import FAQ from './pages/FAQ';
import RSVP from './pages/RSVP';
import Registry from './pages/Registry';

function AppContent() {
  const { language } = useLanguage();
  const { unlocked } = useSiteLock();
  
  return (
    <>
      <SiteLock />
      <Router basename="/">
        {/* Keep content invisible (not just covered) until unlock is confirmed,
            preventing any flash of underlying content on mobile during unlock */}
        <div className={`min-h-screen bg-wedding-bg font-poppins pb-16 md:pb-0${!unlocked ? ' invisible' : ''}`} lang={language}>
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
      <SiteLockProvider>
        <AppContent />
      </SiteLockProvider>
    </LanguageProvider>
  );
}

export default App;
