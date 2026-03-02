import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Schedule = () => {
  const { language } = useLanguage();
  const t = translations[language].schedule;

  return (
    <div className="min-h-screen bg-wedding-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header row - hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 bg-wedding-secondary px-6 py-3">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide font-poppins">{t.scheduleEventHeader}</span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide font-poppins">{t.scheduleLocationHeader}</span>
          </div>

          {/* Pre-Wedding Row */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-start px-6 py-5 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800 font-bodoni text-lg">{t.preWeddingEvent}</p>
                <p className="text-sm text-gray-500 font-poppins">{t.preWeddingDate}</p>
                <p className="text-sm text-gray-500 font-poppins">{t.preWeddingTime}</p>
                <p className="text-sm text-gray-500 font-poppins mt-1 italic">{t.preWeddingNote}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3 md:mt-1">
              <MapPin size={20} className="text-gray-500 flex-shrink-0" />
              <p className="text-gray-700 font-poppins">
                <a
                  href="https://maps.app.goo.gl/qo4p5QoEbnxorbcA6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-500"
                >
                  {t.preWeddingLocation}
                </a>
              </p>
            </div>
          </div>

          {/* Wedding Row */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-start px-6 py-5">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800 font-bodoni text-lg">{t.weddingEventTitle}</p>
                <p className="text-sm text-gray-500 font-poppins">{t.dateDetails}</p>
                {/* Nested Wedding Day Timeline */}
                <div className="mt-3 ml-2 border-l-2 border-gray-200 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.busPickup} <span className="text-gray-400">— {t.busPickupTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.ceremony} <span className="text-gray-400">— {t.ceremonyTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.cocktailHour} <span className="text-gray-400">— {t.cocktailTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.dinner} <span className="text-gray-400">— {t.dinnerTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.mesaDulce} <span className="text-gray-400">— {t.mesaDulceTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.bahon} <span className="text-gray-400">— {t.bahonTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-poppins whitespace-nowrap">{t.partyEnd} <span className="text-gray-400">— {t.partyEndTime}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3 md:mt-1">
              <MapPin size={20} className="text-gray-500 flex-shrink-0" />
              <p className="text-gray-700 font-poppins">
                <a
                  href="https://maps.app.goo.gl/Q1AiCJdcTWeGS8fU6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-500"
                >
                  {t.weddingLocation}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
