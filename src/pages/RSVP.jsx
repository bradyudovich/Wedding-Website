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
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfx5AVkAgdBjFCfGELmYfRlCHaAZT67t5P6kQHG2XAjlnyJOw/viewform?embedded=true" width="640" height="1319" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
