import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Travel from './pages/Travel';
import FAQ from './pages/FAQ';

function AppContent() {
  const { language } = useLanguage();
  
  return (
    <div lang={language} className="min-h-screen bg-wedding-bg font-poppins">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router basename="/Wedding-Website">
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
