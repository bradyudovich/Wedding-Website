import React, { useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import PhotoCarousel from '../components/PhotoCarousel';
import WeddingCountdown from '../components/WeddingCountdown';

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
      <div className="relative overflow-hidden bg-pumice pt-24 pb-20 md:pt-28 md:pb-24 px-4 md:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(92,112,85,0.16),_transparent_58%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] font-bold text-onyx mb-3 font-bodoni">
            {t.coupleNames}
          </h1>
          <p className="text-base md:text-lg font-manrope tracking-[0.18em] uppercase text-onyx/70 mb-4">
            {t.heroDateLocation}
          </p>
          <p className="text-lg md:text-2xl text-onyx/60 font-light font-manrope tracking-wide max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      {/* Photo Gallery — directly beneath Hero */}
      <div id="gallery" className="max-w-6xl mx-auto px-4 md:px-6 pb-6 md:pb-8 overflow-hidden">
        <PhotoCarousel photos={photos} base={base} />
      </div>

      {/* Countdown — directly below gallery */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-4">
        <WeddingCountdown variant="hero" />
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4 md:px-6">
        <div className="bg-off-white p-8 md:p-10 rounded-2xl shadow-md border border-wedding-accent">
          <h2 className="text-[clamp(1.5rem,6vw,2.25rem)] font-bold text-onyx mb-5 text-center font-bodoni leading-tight">
            {t.welcomeHeading}
          </h2>
          <p className="text-onyx leading-relaxed text-lg md:text-justify">{t.bodyText}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
