import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const RSVP = () => {
  const { language } = useLanguage();
  const t = translations[language].nav;

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center font-bodoni">
          {t.rsvp}
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/1SuwIRRoHyp5-oiN665x-qfgtmp2uD9yQVl_mWvgcuaU/viewform?embedded=true"
            width="100%"
            height="900"
            title="RSVP Form"
            style={{ display: 'block', border: 'none' }}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
