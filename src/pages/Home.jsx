// src/pages/Home.jsx
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const photos = [
  'FullSizeRender.jpeg',
  'IMG_0173.JPG',
  'IMG_0492.jpeg',
  'IMG_1614.jpeg',
  'IMG_2253.jpeg',
  'IMG_5776.JPG',
  'IMG_6896.jpeg',
  'IMG_7965.jpeg',
  'IMG_8147.jpeg',
  'IMG_8219.jpeg',
  'IMG_8922.jpeg',
  'IMG_8954.jpeg',
  'IMG_9875.jpeg',
  'ad6116e0-34ba-4755-8e35-0a7a640ad3d5.jpg',
];

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const base = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen" style={{ WebkitHyphens: 'auto', hyphens: 'auto' }}>
      {/* Hero Section */}
      <div className="bg-wedding-secondary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 font-bodoni">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">{t.subtitle}</p>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-bodoni">{t.scheduleTitle}</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-2 bg-wedding-secondary px-6 py-3">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide font-poppins">{t.scheduleEventHeader}</span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide font-poppins">{t.scheduleLocationHeader}</span>
          </div>

          {/* Pre-Wedding Row */}
          <div className="grid grid-cols-2 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 font-bodoni text-lg">{t.preWeddingEvent}</p>
                <p className="text-sm text-gray-500 font-poppins">{t.preWeddingDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-500 flex-shrink-0" />
              <p className="text-gray-700 font-poppins">{t.preWeddingLocation}</p>
            </div>
          </div>

          {/* Wedding Row */}
          <div className="grid grid-cols-2 items-start px-6 py-5">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800 font-bodoni text-lg">{t.weddingEventTitle}</p>
                <p className="text-sm text-gray-500 font-poppins">{t.dateDetails}</p>
                {/* Nested Wedding Day Timeline */}
                <div className="mt-3 ml-2 border-l-2 border-gray-200 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins">{t.ceremony} <span className="text-gray-400">— {t.ceremonyTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins">{t.cocktailHour} <span className="text-gray-400">— {t.cocktailTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins">{t.dinner} <span className="text-gray-400">— {t.dinnerTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins">{t.dancing} <span className="text-gray-400">— {t.dancingTime}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <MapPin size={20} className="text-gray-500 flex-shrink-0" />
              <p className="text-gray-700 font-poppins">{t.weddingLocation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center font-bodoni">
            {t.welcomeTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6" style={{ textAlign: 'justify' }}>
            {t.welcomeText}
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-wedding-secondary p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center font-bodoni">
            {t.storyTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg" style={{ textAlign: 'justify' }}>{t.storyText}</p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="max-w-6xl mx-auto py-12 px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-bodoni">{t.photoGalleryTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div key={photo} className="aspect-square overflow-hidden rounded-lg shadow-md bg-wedding-secondary">
              <img
                src={`${base}photos/${photo}`}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
