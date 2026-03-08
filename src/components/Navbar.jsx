import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plane, Calendar, Map, HelpCircle, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Single-row layout on all screen sizes, scrollable on small screens */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {/* Brand */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-gray-800 font-bodoni whitespace-nowrap flex-shrink-0">
            Cami & Brady
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-medium font-poppins whitespace-nowrap"
            >
              <Home size={16} />
              <span>{t.home}</span>
            </Link>
            <Link
              to="/travel"
              className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-medium font-poppins whitespace-nowrap"
            >
              <Plane size={16} />
              <span>{t.travel}</span>
            </Link>
            <Link
              to="/schedule"
              className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-medium font-poppins whitespace-nowrap"
            >
              <Calendar size={16} />
              <span>{t.schedule}</span>
            </Link>
            <Link
              to="/things-to-do"
              className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-medium font-poppins whitespace-nowrap"
            >
              <Map size={16} />
              <span>{t.thingsToDo}</span>
            </Link>
            <Link
              to="/faq"
              className="flex items-center gap-1 text-black hover:text-gray-800 transition-colors font-medium font-poppins whitespace-nowrap"
            >
              <HelpCircle size={16} />
              <span>{t.faq}</span>
            </Link>
            <a
              href="https://docs.google.com/forms/d/1SuwIRRoHyp5-oiN665x-qfgtmp2uD9yQVl_mWvgcuaU/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-wedding-accent text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-300 transition-colors font-medium font-poppins whitespace-nowrap"
            >
              <Send size={16} />
              <span>{t.rsvp}</span>
            </a>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="bg-gray-200 hover:bg-gray-300 h-9 w-9 p-1 rounded-md font-medium transition-colors flex-shrink-0 flex items-center justify-center"
            aria-label="Toggle Language"
          >
            <span className="text-2xl leading-none">
              {language === 'en' ? '🇦🇷' : '🇺🇸'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
