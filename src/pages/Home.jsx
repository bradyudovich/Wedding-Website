// src/pages/Home.jsx
import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const FallingGallery = () => {
  const SESSION_KEY = 'fallingPhotosSeen';
  const [seen, setSeen] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {}
    setSeen(true);
  };

  const squares = [0, 1, 2];

  return (
    // Keep horizontal max width / padding alignment with the "Our Story" box by using px-10 here
    <div className="mt-6 px-10">
      {/* 
        Mobile: stacked column (w-full)
        Desktop: row (md:flex-row) with equal widths (flex-1)
        Gap between squares is gap-4; thin black border on each square.
      */}
      <div className="flex flex-col md:flex-row gap-4">
        {squares.map((_, i) => (
          <motion.div
            key={i}
            // On mobile use full width; on desktop allow flex to split available width equally
            className="w-full md:flex-1 min-w-0 aspect-square border border-black bg-[rgba(248,246,242,0.6)]"
            // Ensure initial is explicitly set so the browser doesn't skip the transition.
            // When the session has been seen, render in-place immediately.
            initial={seen ? { y: 0, opacity: 1 } : { y: -1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 14,
              mass: 1,
              // individual stagger via delay per square
              delay: i * 0.12,
            }}
            onAnimationComplete={i === squares.length - 1 && !seen ? handleComplete : undefined}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    // Apply hyphens: auto globally inside this page container to keep text hyphenation consistent.
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

      {/* Date and Location Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-gray-700 flex justify-center mb-4">
              <Calendar size={40} color="black" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 font-bodoni">{t.date}</h3>
            <p className="text-gray-600 text-lg">{t.dateDetails}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-gray-700 flex justify-center mb-4">
              <MapPin size={40} color="black" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 font-bodoni">{t.location}</h3>
            <p className="text-gray-600 text-lg">{t.locationDetails}</p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center font-bodoni">
            {t.welcomeTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 text-justify">
            {t.welcomeText}
          </p>
        </div>
      </div>

      {/* Our Story Section + Falling Photos (integrated and width-aligned) */}
      <div className="max-w-4xl mx-auto py-12 px-4 pb-20">
        <div className="bg-wedding-secondary p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center font-bodoni">
            {t.storyTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">{t.storyText}</p>
        </div>

        {/* FallingGallery lives directly underneath the Our Story box inside the same max-w-4xl container. */}
        <FallingGallery />
      </div>
    </div>
  );
};

export default Home;
