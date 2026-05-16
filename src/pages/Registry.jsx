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
          <p className="text-onyx leading-relaxed text-lg mb-6 max-w-2xl mx-auto md:text-justify">
            {t.message}
          </p>
          <p className="inline-flex items-center gap-2 text-burnished-copper font-medium font-poppins text-base bg-wedding-secondary px-5 py-3 rounded-[8px]">
            <Gift size={18} />
            Registry coming soon — check back closer to the date!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registry;
