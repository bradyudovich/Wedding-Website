import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language].home;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-wedding-secondary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 font-bodoni">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Date and Location Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-gray-700 text-4xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{t.date}</h3>
            <p className="text-gray-600 text-lg">{t.dateDetails}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-gray-700 text-4xl mb-4">📍</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{t.location}</h3>
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

      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto py-12 px-4 pb-20">
        <div className="bg-wedding-accent p-10 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center font-bodoni">
            {t.storyTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify">
            {t.storyText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
