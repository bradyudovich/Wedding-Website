import React from 'react';
import { Gift } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Registry = () => {
  const { language } = useLanguage();
  const t = translations[language].registry;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="bg-off-white rounded-lg shadow-md p-10 text-center border border-wedding-accent">
          <Gift size={56} className="text-burnished-copper mx-auto mb-6" />
          <p className="text-onyx leading-relaxed text-lg mb-8 max-w-2xl mx-auto text-justify">
            {t.message}
          </p>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex items-center gap-2 bg-burnished-copper text-white px-6 py-3 rounded-[8px] opacity-60 cursor-not-allowed transition-colors font-medium font-poppins text-base"
          >
            <Gift size={18} />
            {t.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registry;
