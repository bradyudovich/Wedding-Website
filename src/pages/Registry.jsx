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
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-4 text-center font-bodoni">
          {t.title}
        </h1>

        <p className="text-onyx/70 leading-relaxed text-lg mb-10 max-w-2xl mx-auto text-center font-poppins">
          {t.message}
        </p>

        <div id="registry-details" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Brady's Venmo */}
          <div className="bg-off-white rounded-lg shadow-md p-8 border border-wedding-accent flex flex-col items-center text-center">
            <Gift size={44} className="text-burnished-copper mb-4" />
            <h2 className="text-2xl font-bold text-onyx mb-1 font-bodoni">{t.bradyTitle}</h2>
            <p className="text-sm uppercase tracking-widest text-onyx/50 font-poppins mb-4">{t.bradyMethod}</p>
            <p className="text-2xl font-semibold text-burnished-copper font-bodoni mb-3">{t.bradyHandle}</p>
            <p className="text-sm text-onyx/60 font-poppins leading-relaxed">{t.bradyNote}</p>
          </div>

          {/* Column 2: Cami's Bank Transfer */}
          <div className="bg-off-white rounded-lg shadow-md p-8 border border-wedding-accent flex flex-col items-center text-center">
            <Gift size={44} className="text-burnished-copper mb-4" />
            <h2 className="text-2xl font-bold text-onyx mb-1 font-bodoni">{t.camiTitle}</h2>
            <p className="text-sm uppercase tracking-widest text-onyx/50 font-poppins mb-4">{t.camiMethod}</p>
            <p className="text-2xl font-semibold text-burnished-copper font-bodoni mb-3">{t.camiAccountName}</p>
            <p className="text-sm text-onyx/60 font-poppins leading-relaxed">{t.camiAccountNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registry;
