import React, { useState, useEffect } from 'react';
import { Car, Hotel, Bus, Theater } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Travel = () => {
  const { language } = useLanguage();
  const t = translations[language].travel;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchExchangeRate = async () => {
      const primaryUrl = 'https://open.er-api.com/v6/latest/USD';
      const backupUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

      try {
        // Try primary source
        const primaryResponse = await fetch(primaryUrl, { signal: controller.signal });
        if (primaryResponse.ok) {
          const primaryData = await primaryResponse.json();
          if (primaryData.rates && primaryData.rates.ARS) {
            if (isMounted) {
              setExchangeRate(primaryData.rates.ARS);
              setLoading(false);
            }
            return;
          }
        }
      } catch (primaryError) {
        // Primary failed, continue to backup
        console.log('Primary exchange rate source failed, trying backup');
      }

      try {
        // Try backup source
        const backupResponse = await fetch(backupUrl, { signal: controller.signal });
        if (backupResponse.ok) {
          const backupData = await backupResponse.json();
          if (backupData.rates && backupData.rates.ARS) {
            if (isMounted) {
              setExchangeRate(backupData.rates.ARS);
              setLoading(false);
            }
            return;
          }
        }
      } catch (backupError) {
        // Both failed
        console.log('Backup exchange rate source also failed');
      }

      // Both sources failed
      if (isMounted) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchangeRate();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const formatRate = (rate) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(rate);
  };

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        {/* Exchange Rate Display */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-bodoni">{t.exchangeRateTitle}</h2>
          {loading ? (
            <p className="text-gray-600 font-poppins">{t.loading}</p>
          ) : error || !exchangeRate ? (
            <p className="text-gray-600 font-poppins">{t.notAvailable}</p>
          ) : (
            <p className="text-lg text-gray-800 font-poppins">
              1 USD = {formatRate(exchangeRate)} ARS
            </p>
          )}
        </div>

        {/* Getting There */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Car size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.gettingThereTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg font-poppins" style={{ textAlign: 'justify', hyphens: 'auto' }}>
            {t.gettingThereText}
          </p>
        </div>

        {/* Accommodations */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Hotel size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.accommodationsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 font-poppins" style={{ textAlign: 'justify', hyphens: 'auto' }}>
            {t.accommodationsText}
          </p>
          <div className="space-y-4">
            <div className="bg-wedding-secondary p-4 rounded-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2 font-bodoni">{t.hotel1Name}</h3>
              <p className="text-gray-600 font-poppins">{t.hotel1Details}</p>
            </div>
            <div className="bg-wedding-secondary p-4 rounded-md">
              <h3 className="font-semibold text-xl text-gray-800 mb-2 font-bodoni">{t.hotel2Name}</h3>
              <p className="text-gray-600 font-poppins">{t.hotel2Details}</p>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Bus size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.transportationTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg font-poppins" style={{ textAlign: 'justify', hyphens: 'auto' }}>
            {t.transportationText}
          </p>
        </div>

        {/* Local Attractions */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Theater size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.localAttractionsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg font-poppins" style={{ textAlign: 'justify', hyphens: 'auto' }}>
            {t.localAttractionsText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Travel;
