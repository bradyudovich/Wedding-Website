import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { RSVP_FORM_URL } from '../constants/links';
import WebsiteLink from '../components/WebsiteLink';

const RSVP = () => {
  const { language } = useLanguage();
  const t = (translations[language] || translations['en']).rsvp;

  return (
    <div className="min-h-screen bg-pumice py-10 md:py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-4 text-center font-bodoni">
          {t.title}
        </h1>
        <p className="text-center text-onyx/70 font-poppins mb-8 text-lg leading-relaxed">
          {t.intro}
        </p>

        <div className="bg-off-white rounded-2xl shadow-lg p-10 text-center border border-wedding-accent">
          <WebsiteLink
            href={RSVP_FORM_URL}
            className="inline-block bg-burnished-copper hover:bg-burnished-copper-hover text-white font-poppins font-semibold text-lg px-8 py-4 rounded-[8px] transition-colors"
          >
            {t.buttonText}
          </WebsiteLink>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
