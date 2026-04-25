import React from 'react';
import { Calendar, MapPin, CalendarPlus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const PLENO_PALERMO_SOHO_MAPS_URL =
  'https://www.google.com/maps/place/Pleno+Palermo+Soho/@-34.5861776,-58.4267193,17z/data=!3m1!4b1!4m9!3m8!1s0x95bcb586c0e9155d:0xe65768f2c8fd000c!5m2!4m1!1i2!8m2!3d-34.586182!4d-58.424139!16s%2Fg%2F11b6d7rhm_?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D';

const LAS_CORTADERAS_MAPS_URL =
  'https://www.google.com/maps/place/Las+Cortaderas/@-34.4667,-58.8320,17z';

function buildGoogleCalendarUrl({ title, date, location, details }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${date}/${date}`,
    location: location || '',
    details: details || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const AddToCalendarLink = ({ title, date, location, details, label }) => (
  <a
    href={buildGoogleCalendarUrl({ title, date, location, details })}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-xs text-burnished-copper underline hover:text-burnished-copper/70 mt-1"
  >
    <CalendarPlus size={13} />
    {label}
  </a>
);

const Schedule = () => {
  const { language } = useLanguage();
  const t = translations[language].schedule;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="bg-off-white rounded-lg shadow-md overflow-hidden">
          {/* Header row - hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 bg-pumice px-6 py-3">
            <span className="text-sm font-semibold text-onyx uppercase tracking-wide font-poppins">{t.scheduleEventHeader}</span>
            <span className="text-sm font-semibold text-onyx uppercase tracking-wide font-poppins">{t.scheduleLocationHeader}</span>
          </div>

          {/* Pre-Wedding Row */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-start px-6 py-5 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-onyx/60 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-onyx font-bodoni text-lg">{t.preWeddingEvent}</p>
                <p className="text-sm text-onyx/60 font-poppins">{t.preWeddingDate}</p>
                <p className="text-sm text-onyx/60 font-poppins">{t.preWeddingTime}</p>
                <AddToCalendarLink
                  title={t.preWeddingEvent}
                  date="20270401"
                  location="Darsena, Buenos Aires"
                  details={t.preWeddingEvent}
                  label={t.addToCalendar}
                />
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3 md:mt-1">
              <MapPin size={20} className="text-onyx/60 flex-shrink-0" />
              <p className="text-onyx font-poppins">
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
              <Calendar size={20} className="text-onyx/60 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-onyx font-bodoni text-lg">{t.weddingEventTitle}</p>
                <p className="text-sm text-onyx/60 font-poppins">{t.dateDetails}</p>
                <AddToCalendarLink
                  title={t.weddingEventTitle}
                  date="20270403"
                  location="Las Cortaderas, Buenos Aires"
                  details={t.weddingEventTitle}
                  label={t.addToCalendar}
                />
                {/* Nested Wedding Day Timeline */}
                <div className="mt-3 ml-2 border-l-2 border-onyx/20 pl-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0 mt-1.5"></span>
                    <span className="text-sm text-onyx font-poppins">
                      {t.busPickup}{' '}
                      <span className="text-onyx/50">— {t.busPickupTime}</span>
                      {' '}(
                      <a
                        href={PLENO_PALERMO_SOHO_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-500"
                      >
                        {t.busPickupLocation}
                      </a>
                      )
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.ceremony} <span className="text-onyx/50">— {t.ceremonyTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.cocktailHour} <span className="text-onyx/50">— {t.cocktailTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.dinner} <span className="text-onyx/50">— {t.dinnerTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.mesaDulce} <span className="text-onyx/50">— {t.mesaDulceTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.bahon} <span className="text-onyx/50">— {t.bahonTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.partyEnd} <span className="text-onyx/50">— {t.partyEndTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-onyx/40 flex-shrink-0"></span>
                    <span className="text-sm text-onyx font-poppins">{t.optionalBuses} <span className="text-onyx/50">— {t.optionalBusesTime}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3 md:mt-1">
              <MapPin size={20} className="text-onyx/60 flex-shrink-0" />
              <p className="text-onyx font-poppins">
                <a
                  href={LAS_CORTADERAS_MAPS_URL}
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
