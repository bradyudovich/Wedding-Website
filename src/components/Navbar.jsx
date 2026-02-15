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
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Mobile-first: Stacked Layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          {/* Branding - centered on mobile, left on desktop */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold text-gray-800 font-bodoni">
              Cami &amp; Brady
            </Link>
          </div>

          {/* Navigation + Language Toggle - centered on mobile, right on desktop */}
          <div className="flex items-center justify-center md:justify-end space-x-4 md:space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-800 transition-colors font-medium flex items-center space-x-1"
            >
              <Home size={18} />
              <span className="hidden sm:inline">{t.home}</span>
            </Link>
            <Link 
              to="/travel" 
              className="text-gray-700 hover:text-gray-800 transition-colors font-medium flex items-center space-x-1"
            >
              <Plane size={18} />
              <span className="hidden sm:inline">{t.travel}</span>
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-700 hover:text-gray-800 transition-colors font-medium flex items-center space-x-1"
            >
              <HelpCircle size={18} />
              <span className="hidden sm:inline">{t.faq}</span>
            </Link>
            <a 
              href="https://docs.google.com/forms/d/1SuwIRRoHyp5-oiN665x-qfgtmp2uD9yQVl_mWvgcuaU/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wedding-accent text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium flex items-center space-x-1"
            >
              <Send size={18} />
              <span className="hidden sm:inline">{t.rsvp}</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              aria-label="Toggle Language"
            >
              {language === 'en' ? '🇦🇷 ES' : '🇺🇸 EN'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
