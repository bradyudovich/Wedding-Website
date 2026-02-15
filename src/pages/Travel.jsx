import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Travel = () => {
  const { language } = useLanguage();
  const t = translations[language].travel;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.rates && data.rates.ARS) {
          setExchangeRate(data.rates.ARS);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12 text-center font-bodoni">
          {t.title}
        </h1>

        {/* Exchange Rate Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-bodoni">{t.exchangeRateTitle}</h2>
          {loading ? (
            <p className="text-gray-600">{t.loading}</p>
          ) : error || !exchangeRate ? (
            <p className="text-gray-600">{t.notAvailable}</p>
          ) : (
            <div>
              <p className="text-lg text-gray-800 mb-3">
                <span className="font-semibold">{t.currentRateLabel}:</span> 1 USD = {exchangeRate.toFixed(2)} ARS
              </p>
              <p className="text-sm text-gray-600 italic text-justify">{t.exchangeNote}</p>
            </div>
          )}
        </div>

        {/* Getting There */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🚗</span>
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.gettingThereTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            {t.gettingThereText}
          </p>
        </div>

        {/* Accommodations */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🏨</span>
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.accommodationsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 text-justify">
            {t.accommodationsText}
          </p>
          <div className="space-y-4">
            <div className="bg-wedding-secondary p-4 rounded-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2 font-bodoni">{t.hotel1Name}</h3>
              <p className="text-gray-600">{t.hotel1Details}</p>
            </div>
            <div className="bg-wedding-secondary p-4 rounded-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2 font-bodoni">{t.hotel2Name}</h3>
              <p className="text-gray-600">{t.hotel2Details}</p>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🚌</span>
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.transportationTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            {t.transportationText}
          </p>
        </div>

        {/* Local Attractions */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🎭</span>
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.localAttractionsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            {t.localAttractionsText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Travel;
