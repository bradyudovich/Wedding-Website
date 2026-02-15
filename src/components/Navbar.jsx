import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plane, HelpCircle, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile-first: Stacked layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          {/* Brand - centered on mobile, left-aligned on desktop */}
          <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-800 font-bodoni text-center md:text-left">
            Cami &amp; Brady
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-1 text-gray-700 hover:text-gray-800 transition-colors font-medium"
            >
              <Home size={18} />
              <span>{t.home}</span>
            </Link>
            <Link 
              to="/travel" 
              className="flex items-center gap-1 text-gray-700 hover:text-gray-800 transition-colors font-medium"
            >
              <Plane size={18} />
              <span>{t.travel}</span>
            </Link>
            <Link 
              to="/faq" 
              className="flex items-center gap-1 text-gray-700 hover:text-gray-800 transition-colors font-medium"
            >
              <HelpCircle size={18} />
              <span>{t.faq}</span>
            </Link>
            <a 
              href="https://docs.google.com/forms/d/1SuwIRRoHyp5-oiN665x-qfgtmp2uD9yQVl_mWvgcuaU/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-wedding-accent text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              <Send size={18} />
              <span>{t.rsvp}</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              aria-label="Toggle Language"
            >
              {language === 'en' ? '🇦🇷' : '🇺🇸'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
