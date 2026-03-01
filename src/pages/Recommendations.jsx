import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const restaurants = [
  {
    key: 'restaurant1',
    mapSrc:
      'https://maps.google.com/maps?q=Atte+Pizzeria+Buenos+Aires&output=embed',
    mapsUrl: 'https://maps.google.com/?q=Atte+Pizzeria+Buenos+Aires',
  },
  {
    key: 'restaurant2',
    mapSrc:
      'https://maps.google.com/maps?q=La+Cabrera+Palermo+Buenos+Aires&output=embed',
    mapsUrl: 'https://maps.google.com/?q=La+Cabrera+5099+Palermo+Buenos+Aires',
  },
];

const Recommendations = () => {
  const { language } = useLanguage();
  const t = translations[language].recommendations;

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center font-bodoni">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12 font-poppins">{t.subtitle}</p>

        {/* Restaurants */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <MapPin size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.restaurantsTitle}</h2>
          </div>

          <div className="space-y-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.key} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2 font-bodoni">
                    {t[`${restaurant.key}Name`]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-poppins mb-4">
                    {t[`${restaurant.key}Description`]}
                  </p>
                  <a
                    href={restaurant.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-poppins"
                  >
                    <ExternalLink size={16} />
                    {t.viewOnMaps}
                  </a>
                </div>
                <div className="w-full h-64">
                  <iframe
                    title={t[`${restaurant.key}Name`]}
                    src={restaurant.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
