import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import LanguagePopup from './components/LanguagePopup';
import Home from './pages/Home';
import Travel from './pages/Travel';
import Schedule from './pages/Schedule';
import ThingsToDo from './pages/ThingsToDo';
import FAQ from './pages/FAQ';
import RSVP from './pages/RSVP';
function AppContent() {
  const { language } = useLanguage();
  
  return (
    <Router basename="/Wedding-Website">
      <div className="min-h-screen bg-wedding-bg font-poppins pb-16 md:pb-0" lang={language}>
        <Navbar />
        <LanguagePopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
      </div>
    </Router>
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
