import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Travel = () => {
  const { language } = useLanguage();
  const t = translations[language].travel;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRate(data.rates.ARS);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setExchangeRate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12 text-center">
          {t.title}
        </h1>

        {/* Exchange Rate Card */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{t.currentRateLabel}</h2>
          {loading ? (
            <p className="text-gray-600 text-lg">{t.loading}</p>
          ) : exchangeRate ? (
            <>
              <p className="text-2xl font-bold text-gray-800 mb-4">
                1 USD = {exchangeRate.toFixed(2)} ARS
              </p>
              <p className="text-gray-700 leading-relaxed text-sm italic">
                {t.exchangeNote}
              </p>
            </>
          ) : (
            <p className="text-gray-600 text-lg">{t.notAvailable}</p>
          )}
        </div>

        {/* Getting There */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🚗</span>
            <h2 className="text-3xl font-semibold text-gray-800">{t.gettingThereTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t.gettingThereText}
          </p>
        </div>

        {/* Accommodations */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🏨</span>
            <h2 className="text-3xl font-semibold text-gray-800">{t.accommodationsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {t.accommodationsText}
          </p>
          <div className="space-y-4">
            <div className="bg-wedding-secondary p-4 rounded-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2">{t.hotel1Name}</h3>
              <p className="text-gray-600">{t.hotel1Details}</p>
            </div>
            <div className="bg-wedding-secondary p-4 rounded-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2">{t.hotel2Name}</h3>
              <p className="text-gray-600">{t.hotel2Details}</p>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🚌</span>
            <h2 className="text-3xl font-semibold text-gray-800">{t.transportationTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t.transportationText}
          </p>
        </div>

        {/* Local Attractions */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🎭</span>
            <h2 className="text-3xl font-semibold text-gray-800">{t.localAttractionsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t.localAttractionsText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Travel;
