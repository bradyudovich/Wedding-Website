import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold text-rose-600 font-playfair">
            💍 Wedding
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
            >
              {t.home}
            </Link>
            <Link 
              to="/travel" 
              className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
            >
              {t.travel}
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
            >
              {t.faq}
            </Link>
            <a 
              href="https://docs.google.com/forms/d/1SuwIRRoHyp5-oiN665x-qfgtmp2uD9yQVl_mWvgcuaU/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors font-medium"
            >
              {t.rsvp}
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              aria-label="Toggle Language"
            >
              {language === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
