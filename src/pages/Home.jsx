import React, { useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import PhotoCarousel from '../components/PhotoCarousel';

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
      <div className="bg-pumice py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-onyx mb-3 font-bodoni">
            {t.coupleNames}
          </h1>
          <p className="text-base md:text-lg font-manrope tracking-[0.18em] uppercase text-onyx/70 mb-4">
            {t.heroDateLocation}
          </p>
          <p className="text-xl md:text-2xl text-onyx/60 font-light font-manrope tracking-wide">{t.subtitle}</p>
        </div>
      </div>

      {/* Photo Gallery — directly beneath Hero */}
      <div id="gallery" className="max-w-4xl mx-auto md:max-w-none md:mx-0 pb-4 overflow-hidden">
        <PhotoCarousel photos={photos} base={base} />
      </div>

      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-off-white p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-onyx text-center font-bodoni">
            {t.welcomeTitle}
          </h2>
          <p className="text-onyx leading-relaxed text-lg mb-6" style={{ textAlign: 'justify' }}>
            {t.welcomeText}
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div id="our-story" className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-off-white p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-onyx text-center font-bodoni">
            {t.storyTitle}
          </h2>
          <p className="text-onyx leading-relaxed text-lg" style={{ textAlign: 'justify' }}>{t.storyText}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
