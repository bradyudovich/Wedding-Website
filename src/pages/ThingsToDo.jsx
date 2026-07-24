import React from 'react';
import { MapPin, ExternalLink, Mountain, Globe, Instagram } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import WebsiteLink from '../components/WebsiteLink';

const buenosAiresActivities = [
  { key: 'sanTelmo' },
  { key: 'laBoca' },
  { key: 'tangoShow' },
  { key: 'palermo' },
  {
    key: 'hopOnHopOff',
    url: 'https://www.hop-on-hop-off-bus-tours.com/city/buenos-aires-bus-tours?gad_source=1&gad_campaignid=20940768125&gbraid=0AAAAAoTfqyymgIiO3NBfdKXsoPg719sC0&gclid=CjwKCAjwwdbPBhBgEiwAxBRA4V3PMsnx36qcxZdhgSbz34E2g2NrIvfw7wNgnvJDdRxqH20ICDJMPxoC9r4QAvD_BwE',
  },
  { key: 'recoleta' },
  { key: 'ateneo' },
  { key: 'puertoMadero' },
];

const restaurants = [
  {
    key: 'restaurant1',
    mapsUrl: 'https://maps.google.com/?q=Atte+Pizzeria+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/attepizza/',
  },
  {
    key: 'restaurant2',
    mapsUrl: 'https://maps.google.com/?q=La+Cabrera+5099+Palermo+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/lacabrera_bsas/',
  },
  {
    key: 'restaurant3',
    mapsUrl: 'https://maps.google.com/?q=La+Alacena+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/laalacenatrattoria/',
  },
  {
    key: 'restaurant4',
    mapsUrl: 'https://maps.google.com/?q=El+Preferido+de+Palermo+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/elpreferidodepalermo/',
  },
  {
    key: 'restaurant5',
    mapsUrl: 'https://www.google.com/maps?vet=10CAAQoqAOahcKEwjAmaTu_dKUAxUAAAAAHQAAAAAQCQ..i&sca_esv=c2ae7bdc94c3d893&client=safari&hs=BMc&pvq=Cg0vZy8xMWcwdHM0MHk2Ig4KCHJhcGEgbnVpEAIYAw&lqi=ChVyYXBhIG51aSBidWVub3MgYWlyZXMiA4gBAUimh4icg66AgAhaJxAAEAEYABgBGAIYAyIVcmFwYSBudWkgYnVlbm9zIGFpcmVzMgJlc5IBDmljZV9jcmVhbV9zaG9w4AEA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=us&sa=X&ftid=0x95bcb587352d1c15:0xcf105028a2f45b81&ved=1t:2428&ictx=111',
    instagramUrl: 'https://www.instagram.com/chocolates_rapanui/',
  },
  {
    key: 'restaurant6',
    mapsUrl: 'https://maps.google.com/?q=Rey+de+Copas+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/reydecopas_bar/',
  },
  {
    key: 'restaurant7',
    mapsUrl: 'https://maps.google.com/?q=G%C3%BCerrin+Pizza+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/pizzeriaguerrin/',
  },
  {
    key: 'restaurant8',
    mapsUrl: 'https://maps.google.com/?q=Cafe+Tortoni+Buenos+Aires',
    instagramUrl: 'https://www.instagram.com/grancafetortoni/',
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
    <div className="min-h-screen bg-wedding-bg py-10 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        {/* Explorer message box */}
        <div className="bg-wedding-secondary/30 p-8 rounded-2xl shadow-md mb-10 border border-wedding-accent">
          <p className="text-onyx leading-relaxed text-lg font-poppins text-center italic">
            {t.explorerMessage}
          </p>
        </div>

        {/* Buenos Aires */}
        <div className="bg-off-white p-8 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <div className="flex items-center mb-4">
            <Globe size={32} className="text-burnished-copper mr-3" />
            <h2 className="text-3xl font-semibold text-onyx font-bodoni">{t.buenosAiresTitle}</h2>
          </div>
          <p className="text-onyx leading-relaxed text-lg mb-6 font-poppins md:text-justify">
            {t.buenosAiresSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buenosAiresActivities.map((activity) => (
              <div key={activity.key} className="bg-wedding-secondary/30 rounded-xl overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-onyx mb-2 font-bodoni">
                    {t[`${activity.key}Name`]}
                  </h3>
                  <p className="text-onyx leading-relaxed font-poppins text-sm md:text-justify">
                    {t[`${activity.key}Description`]}
                  </p>
                  {activity.url ? (
                    <WebsiteLink
                      href={activity.url}
                      className="inline-flex items-center gap-2 text-sm font-medium text-onyx hover:text-onyx/70 transition-colors font-poppins mt-3"
                    >
                      <ExternalLink size={14} />
                      {t.hopOnHopOffLink}
                    </WebsiteLink>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div className="bg-off-white p-8 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <div className="flex items-center mb-4">
            <MapPin size={32} className="text-burnished-copper mr-3" />
            <h2 className="text-3xl font-semibold text-onyx font-bodoni">{t.restaurantsTitle}</h2>
          </div>
          <p className="text-onyx leading-relaxed text-lg mb-6 font-poppins md:text-justify">{t.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.key} className="bg-wedding-secondary/30 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-onyx font-bodoni">
                      {t[`${restaurant.key}Name`]}
                    </h3>
                    <div className="flex items-center gap-2">
                      <WebsiteLink
                        href={restaurant.instagramUrl}
                        aria-label={t.viewOnInstagram}
                        title={t.viewOnInstagram}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-onyx transition-colors hover:text-onyx/70"
                      >
                        <Instagram size={16} />
                      </WebsiteLink>
                      <WebsiteLink
                        href={restaurant.mapsUrl}
                        aria-label={t.viewOnMaps}
                        title={t.viewOnMaps}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-onyx transition-colors hover:text-onyx/70"
                      >
                        <MapPin size={16} />
                      </WebsiteLink>
                    </div>
                  </div>
                  <p className="text-onyx leading-relaxed font-poppins mb-3 text-sm md:text-justify">
                    {t[`${restaurant.key}Description`]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Argentina Destinations */}
        <div className="bg-off-white p-8 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <div className="flex items-center mb-4">
            <Mountain size={32} className="text-burnished-copper mr-3" />
            <h2 className="text-3xl font-semibold text-onyx font-bodoni">{t.destinationsTitle}</h2>
          </div>
          <p className="text-onyx leading-relaxed text-lg mb-6 font-poppins md:text-justify">
            {t.destinationsSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((dest) => (
              <div key={dest.key} className="bg-wedding-secondary/30 rounded-xl overflow-hidden">
                <div className="w-full h-40 bg-wedding-secondary/30 flex items-center justify-center">
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
                  <div className="hidden w-full h-full items-center justify-center bg-wedding-secondary/30">
                    <Mountain size={48} className="text-onyx/30" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-onyx mb-2 font-bodoni">
                    {t[`${dest.key}Name`]}
                  </h3>
                  <p className="text-onyx leading-relaxed font-poppins text-sm md:text-justify">
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
