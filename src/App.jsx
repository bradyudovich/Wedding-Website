import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Travel from './pages/Travel';
import FAQ from './pages/FAQ';

function App() {
  return (
    <LanguageProvider>
      <Router basename="/Wedding-Website">
        <div className="min-h-screen bg-wedding-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
