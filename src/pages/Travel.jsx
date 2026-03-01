import React, { useState, useEffect } from 'react';
import { Car, Hotel, Bus, Theater, CloudSun, AlertCircle, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const restaurants = [
  {
    key: 'restaurant1',
    mapsUrl: 'https://maps.google.com/?q=Atte+Pizzeria+Buenos+Aires',
  },
  {
    key: 'restaurant2',
    mapsUrl: 'https://maps.google.com/?q=La+Cabrera+5099+Palermo+Buenos+Aires',
  },
  {
    key: 'restaurant3',
    mapsUrl: 'https://maps.google.com/?q=La+Alacena+Buenos+Aires',
  },
  {
    key: 'restaurant4',
    mapsUrl: 'https://maps.google.com/?q=El+Preferido+de+Palermo+Buenos+Aires',
  },
];

const Travel = () => {
  const { language } = useLanguage();
  const t = translations[language].travel;
  const tr = translations[language].recommendations;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchExchangeRate = async () => {
      const apis = [
        {
          url: 'https://open.er-api.com/v6/latest/USD',
          extract: (data) => data?.rates?.ARS,
        },
        {
          url: 'https://api.exchangerate-api.com/v4/latest/USD',
          extract: (data) => data?.rates?.ARS,
        },
        {
          url: 'https://api.frankfurter.app/latest?from=USD&to=ARS',
          extract: (data) => data?.rates?.ARS,
        },
      ];

      for (const api of apis) {
        try {
          const response = await fetch(api.url, { signal: controller.signal });
          if (response.ok) {
            const data = await response.json();
            const rate = api.extract(data);
            if (rate) {
              if (isMounted) {
                setExchangeRate(rate);
                setLoading(false);
              }
              return;
            }
          }
        } catch {
          // Try next API
        }
      }

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

        {/* Passport Reminder */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-yellow-400">
          <div className="flex items-start gap-3">
            <AlertCircle size={28} className="text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 font-bodoni">{t.passportReminderTitle}</h2>
              <p className="text-gray-700 font-poppins" style={{ textAlign: 'justify' }}>{t.passportReminderText}</p>
            </div>
          </div>
        </div>

        {/* April Weather in Buenos Aires */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-center mb-4">
            <CloudSun size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.weatherTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4 font-poppins text-center">
            {t.weatherDescription}
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-wedding-secondary p-4 rounded-md">
              <p className="text-sm text-gray-500 font-poppins">{t.weatherHighLabel}</p>
              <p className="text-xl font-semibold text-gray-800 font-bodoni">{t.weatherHigh}</p>
            </div>
            <div className="bg-wedding-secondary p-4 rounded-md">
              <p className="text-sm text-gray-500 font-poppins">{t.weatherLowLabel}</p>
              <p className="text-xl font-semibold text-gray-800 font-bodoni">{t.weatherLow}</p>
            </div>
            <div className="bg-wedding-secondary p-4 rounded-md">
              <p className="text-sm text-gray-500 font-poppins">&nbsp;</p>
              <p className="text-base font-semibold text-gray-700 font-poppins">{t.weatherRain}</p>
            </div>
          </div>
        </div>

        {/* Exchange Rate Display */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-bodoni">{t.exchangeRateTitle}</h2>
          {loading ? (
            <p className="text-gray-600 font-poppins">{t.loading}</p>
          ) : error || !exchangeRate ? (
            <p className="text-gray-600 font-poppins">{t.notAvailable}</p>
          ) : (
            <>
              <p className="text-lg text-gray-800 font-poppins">
                1 USD = {formatRate(exchangeRate)} ARS
              </p>
              <p className="text-sm text-gray-500 mt-2 font-poppins">{t.exchangeNote}</p>
            </>
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

        {/* Recommendations */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-6">
            <MapPin size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{tr.restaurantsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 font-poppins" style={{ textAlign: 'justify' }}>{tr.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.key} className="bg-wedding-secondary rounded-lg overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-bodoni">
                    {tr[`${restaurant.key}Name`]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-poppins mb-3 text-sm" style={{ textAlign: 'justify' }}>
                    {tr[`${restaurant.key}Description`]}
                  </p>
                  <a
                    href={restaurant.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-poppins"
                  >
                    <ExternalLink size={14} />
                    {tr.viewOnMaps}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
