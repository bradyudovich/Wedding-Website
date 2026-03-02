// src/pages/Home.jsx
import React, { useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const photoList = [
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

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const base = import.meta.env.BASE_URL;

  const photos = useMemo(() => shuffleArray(photoList), []);

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
      <div className="max-w-4xl mx-auto py-12 px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-bodoni">{t.photoGalleryTitle}</h2>
        <div className="overflow-x-auto md:overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex flex-row gap-3 md:animate-scroll-x" style={{ width: 'max-content' }}>
            {[...photos, ...photos].map((photo, index) => (
              <div key={`${photo}-${index}`} className="flex-shrink-0 w-64 h-64 overflow-hidden rounded-lg shadow-md bg-wedding-secondary">
                <img
                  src={`${base}photos/${photo}`}
                  alt=""
                  width="256"
                  height="256"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
