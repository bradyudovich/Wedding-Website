import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const RSVP_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfx5AVkAgdBjFCfGELmYfRlCHaAZT67t5P6kQHG2XAjlnyJOw/viewform?usp=dialog';

const RSVP = () => {
  const { language } = useLanguage();
  const t = (translations[language] || translations['en']).rsvp;

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center font-bodoni">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 font-poppins mb-8 text-lg leading-relaxed">
          {t.intro}
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <a
            href={RSVP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-poppins font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            {t.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RSVP;

