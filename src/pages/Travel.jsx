import React, { useState, useEffect } from 'react';
import { Plane, Hotel, CloudSun, AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const FALLBACK_RATE = 1420;
const RATE_SOURCES = [
  {
    url: 'https://dolarapi.com/v1/dolares/oficial',
    getRate: (data) => data?.venta ?? data?.promedio ?? data?.compra,
  },
  {
    url: 'https://api.bluelytics.com.ar/v2/latest',
    getRate: (data) => data?.oficial?.value_sell ?? data?.oficial?.value_avg ?? data?.oficial?.value_buy,
  },
];

const Travel = () => {
  const { language } = useLanguage();
  const t = translations[language].travel;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveRateUnavailable, setLiveRateUnavailable] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchExchangeRate = async () => {
      for (const source of RATE_SOURCES) {
        try {
          const response = await fetch(source.url, {
            signal: controller.signal,
            cache: 'no-store',
          });
          if (response.ok) {
            const data = await response.json();
            const rate = source.getRate(data);
            if (rate && isMounted) {
              setExchangeRate(rate);
              setLoading(false);
              return;
            }
          }
        } catch {
          // try the next source before falling back
        }
      }

      if (isMounted) {
        setExchangeRate(FALLBACK_RATE);
        setLiveRateUnavailable(true);
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
    <div className="min-h-screen bg-wedding-bg py-10 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        {/* Passport Reminder */}
        <div className="bg-wedding-secondary/30 p-6 rounded-2xl shadow-md mb-8 border border-wedding-accent border-l-4 border-l-burnished-copper">
          <div className="flex items-start gap-3">
            <AlertCircle size={28} className="text-burnished-copper mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-onyx mb-2 font-bodoni">{t.passportReminderTitle}</h2>
              <p className="text-onyx font-poppins md:text-justify">{t.passportReminderText}</p>
            </div>
          </div>
        </div>

        {/* April Weather in Buenos Aires */}
        <div className="bg-off-white p-8 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <div className="flex items-center justify-center mb-4">
            <CloudSun size={32} className="text-burnished-copper mr-3" />
            <h2 className="text-3xl font-semibold text-onyx font-bodoni">{t.weatherTitle}</h2>
          </div>
          <p className="text-onyx leading-relaxed text-lg mb-4 font-poppins text-center">
            {t.weatherDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-wedding-secondary/30 p-4 rounded-xl">
              <p className="text-sm text-onyx/60 font-poppins">{t.weatherHighLabel}</p>
              <p className="text-xl font-semibold text-onyx font-bodoni">{t.weatherHigh}</p>
            </div>
            <div className="bg-wedding-secondary/30 p-4 rounded-xl">
              <p className="text-sm text-onyx/60 font-poppins">{t.weatherLowLabel}</p>
              <p className="text-xl font-semibold text-onyx font-bodoni">{t.weatherLow}</p>
            </div>
            <div className="bg-wedding-secondary/30 p-4 rounded-xl flex flex-col items-center justify-center min-w-0">
              <p className="text-base font-semibold text-onyx font-poppins text-center break-words">{t.weatherRain}</p>
            </div>
          </div>
        </div>

        {/* Exchange Rate Display */}
        <div className="bg-off-white p-6 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <h2 className="text-2xl font-semibold text-onyx mb-4 font-bodoni">{t.exchangeRateTitle}</h2>
          {loading ? (
            <p className="text-onyx/70 font-poppins">{t.loading}</p>
          ) : (
            <>
              <p className="text-lg text-onyx font-poppins">
                1 USD = {formatRate(exchangeRate)} ARS ({t.officialRateLabel})
              </p>
              {liveRateUnavailable ? (
                <p className="text-sm text-amber-600 mt-2 font-poppins">{t.liveRateUnavailable}</p>
              ) : (
                <p className="text-sm text-onyx/60 mt-2 font-poppins">{t.exchangeNote}</p>
              )}
            </>
          )}
        </div>

        {/* Getting There */}
        <div className="bg-off-white p-8 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <div className="flex items-center mb-4">
            <Plane size={32} className="text-burnished-copper mr-3" />
            <h2 className="text-3xl font-semibold text-onyx font-bodoni">{t.gettingThereTitle}</h2>
          </div>
          <p className="text-onyx leading-relaxed text-lg font-poppins md:text-justify">
            {t.gettingThereTextPart1}{' '}
            <strong>{t.airport1Name}</strong>
            {t.gettingThereTextPart2}{' '}
            <strong>{t.airport2Name}</strong>
            {t.gettingThereTextPart3}
          </p>
        </div>

        {/* Accommodations */}
        <div className="bg-off-white p-8 rounded-2xl shadow-md mb-8 border border-wedding-accent">
          <div className="flex items-center mb-4">
            <Hotel size={32} className="text-burnished-copper mr-3" />
            <h2 className="text-3xl font-semibold text-onyx font-bodoni">{t.accommodationsTitle}</h2>
          </div>
          <p className="text-onyx leading-relaxed text-lg mb-6 font-poppins md:text-justify">
            {t.accommodationsText}
          </p>
          <div className="space-y-4">
            <div className="bg-wedding-secondary/30 p-4 rounded-xl">
              <h3 className="font-semibold text-xl text-onyx mb-1 font-bodoni">
                <a
                  href="https://plenohotels.com/palermosoho/"
                  className="underline hover:text-onyx/60"
                >
                  {t.hotel1Name}
                </a>
              </h3>
              <p className="text-onyx/80 font-poppins">{t.hotel1Details}</p>
            </div>
            <div className="bg-wedding-secondary/30 p-4 rounded-xl">
              <h3 className="font-semibold text-xl text-onyx mb-1 font-bodoni">
                <a
                  href="https://www.bromeliahotel.com.ar/"
                  className="underline hover:text-onyx/60"
                >
                  {t.hotel2Name}
                </a>
              </h3>
              <p className="text-onyx/80 font-poppins">{t.hotel2Details}</p>
            </div>
            <div className="bg-wedding-secondary/30 p-4 rounded-xl">
              <h3 className="font-semibold text-xl text-onyx mb-1 font-bodoni">
                <a
                  href="https://www.airbnb.com"
                  className="underline hover:text-onyx/60"
                >
                  {t.hotel3Name}
                </a>
              </h3>
              <p className="text-onyx/80 font-poppins">{t.hotel3Details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
