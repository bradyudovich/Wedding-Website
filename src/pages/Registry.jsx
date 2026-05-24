import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { VENMO_URL } from '../constants/links';
import WebsiteLink from '../components/WebsiteLink';

const Registry = () => {
  const { language } = useLanguage();
  const t = translations[language].registry;
  const [openPanel, setOpenPanel] = useState(null);

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <div className="min-h-screen py-10 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-4 text-center font-bodoni">
          {t.title}
        </h1>

        <p className="text-onyx/70 leading-relaxed text-lg mb-10 max-w-2xl mx-auto text-center font-poppins">
          {t.message}
        </p>

        <div id="registry-details" className="bg-off-white rounded-2xl shadow-md p-6 md:p-8 border border-wedding-accent">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => togglePanel('us')}
              className={`rounded-xl border px-4 py-4 text-center transition-colors ${
                openPanel === 'us' ? 'border-burnished-copper bg-wedding-secondary' : 'border-wedding-accent bg-white hover:bg-wedding-secondary/60'
              }`}
              aria-expanded={openPanel === 'us'}
              aria-controls="registry-us-details"
            >
              <div className="text-4xl leading-none">🇺🇸</div>
              <p className="mt-2 text-sm md:text-base font-semibold text-onyx font-poppins">{t.usLabel}</p>
            </button>
            <button
              type="button"
              onClick={() => togglePanel('ar')}
              className={`rounded-xl border px-4 py-4 text-center transition-colors ${
                openPanel === 'ar' ? 'border-burnished-copper bg-wedding-secondary' : 'border-wedding-accent bg-white hover:bg-wedding-secondary/60'
              }`}
              aria-expanded={openPanel === 'ar'}
              aria-controls="registry-ar-details"
            >
              <div className="text-4xl leading-none">🇦🇷</div>
              <p className="mt-2 text-sm md:text-base font-semibold text-onyx font-poppins">{t.argentinaLabel}</p>
            </button>
          </div>

          {openPanel === 'us' ? (
            <div id="registry-us-details" className="mt-6 border border-wedding-accent rounded-xl p-5 md:p-6">
              <p className="text-sm uppercase tracking-widest text-onyx/50 font-poppins mb-4">{t.bradyMethod}</p>
              <p className="text-2xl font-semibold text-burnished-copper font-bodoni mb-3">
                <WebsiteLink href={VENMO_URL} className="underline hover:text-burnished-copper-hover">
                  {t.bradyHandle}
                </WebsiteLink>
              </p>
              <p className="text-sm text-onyx/60 font-poppins leading-relaxed">{t.bradyNote}</p>
            </div>
          ) : null}

          {openPanel === 'ar' ? (
            <div id="registry-ar-details" className="mt-6 border border-wedding-accent rounded-xl p-5 md:p-6 space-y-6">
              <div>
                <p className="text-lg font-semibold text-onyx font-bodoni">Banco Galicia - Caja Ahorro Pesos</p>
                <p className="text-sm text-onyx/80 font-poppins mt-2">Número de cuenta: 4032920-7 010-8</p>
                <p className="text-sm text-onyx/80 font-poppins">CBU: 00700108 30004032920780</p>
                <p className="text-sm text-onyx/80 font-poppins">DNI: 38795271</p>
                <p className="text-sm text-onyx/80 font-poppins">Alias de CBU: BLANCOCAMI</p>
              </div>

              <div>
                <p className="text-lg font-semibold text-onyx font-bodoni">Banco Galicia - Caja Ahorro Dólares</p>
                <p className="text-sm text-onyx/80 font-poppins mt-2">Número de cuenta: 4014920-9 010-5</p>
                <p className="text-sm text-onyx/80 font-poppins">CBU: 00700108 31004014920950</p>
                <p className="text-sm text-onyx/80 font-poppins">DNI: 38795271</p>
                <p className="text-sm text-onyx/80 font-poppins">Alias de CBU: BLANCOCAMIUSD</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Registry;
