import React from 'react';
import { MapPin, ExternalLink, Mountain, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const buenosAiresActivities = [
  { key: 'sanTelmo' },
  { key: 'laBoca' },
  { key: 'tangoShow' },
  { key: 'palermo' },
];

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

const destinations = [
  { key: 'iguazu' },
  { key: 'jujuy' },
  { key: 'mendoza' },
  { key: 'bariloche' },
];

const ThingsToDo = () => {
  const { language } = useLanguage();
  const t = translations[language].thingsToDo;
  const base = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        {/* Explorer message box */}
        <div className="bg-wedding-secondary p-8 rounded-lg shadow-md mb-10">
          <p className="text-gray-700 leading-relaxed text-lg font-poppins text-center italic">
            {t.explorerMessage}
          </p>
        </div>

        {/* Buenos Aires */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Globe size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.buenosAiresTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 font-poppins" style={{ textAlign: 'justify' }}>
            {t.buenosAiresSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buenosAiresActivities.map((activity) => (
              <div key={activity.key} className="bg-wedding-secondary rounded-lg overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-bodoni">
                    {t[`${activity.key}Name`]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-poppins text-sm" style={{ textAlign: 'justify' }}>
                    {t[`${activity.key}Description`]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <MapPin size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.restaurantsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 font-poppins" style={{ textAlign: 'justify' }}>{t.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.key} className="bg-wedding-secondary rounded-lg overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-bodoni">
                    {t[`${restaurant.key}Name`]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-poppins mb-3 text-sm" style={{ textAlign: 'justify' }}>
                    {t[`${restaurant.key}Description`]}
                  </p>
                  <a
                    href={restaurant.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-poppins"
                  >
                    <ExternalLink size={14} />
                    {t.viewOnMaps}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Argentina Destinations */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <Mountain size={32} className="text-black mr-3" />
            <h2 className="text-3xl font-semibold text-gray-800 font-bodoni">{t.destinationsTitle}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 font-poppins" style={{ textAlign: 'justify' }}>
            {t.destinationsSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((dest) => (
              <div key={dest.key} className="bg-wedding-secondary rounded-lg overflow-hidden">
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <img
                    src={`${base}photos/${dest.key}.jpg`}
                    alt={t[`${dest.key}Name`]}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center bg-wedding-secondary">
                    <Mountain size={48} className="text-gray-400" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-bodoni">
                    {t[`${dest.key}Name`]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-poppins text-sm" style={{ textAlign: 'justify' }}>
                    {t[`${dest.key}Description`]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDo;
