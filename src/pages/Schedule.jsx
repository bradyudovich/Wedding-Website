import React from 'react';
import { Calendar, MapPin, CalendarPlus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const PLENO_PALERMO_SOHO_MAPS_URL =
  'https://www.google.com/maps/place/Pleno+Palermo+Soho/@-34.5861776,-58.4267193,17z/data=!3m1!4b1!4m9!3m8!1s0x95bcb586c0e9155d:0xe65768f2c8fd000c!5m2!4m1!1i2!8m2!3d-34.586182!4d-58.424139!16s%2Fg%2F11b6d7rhm_?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D';

const LAS_CORTADERAS_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Las+Cortaderas+Buenos+Aires+Argentina';

const escapeIcsText = (text = '') =>
  text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

const getUtcTimestamp = (date = new Date()) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

const getNextDateString = (yyyymmdd) => {
  const year = Number(yyyymmdd.slice(0, 4));
  const month = Number(yyyymmdd.slice(4, 6)) - 1;
  const day = Number(yyyymmdd.slice(6, 8));
  const date = new Date(Date.UTC(year, month, day));
  date.setUTCDate(date.getUTCDate() + 1);
  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
  const nextDay = String(date.getUTCDate()).padStart(2, '0');
  return `${nextYear}${nextMonth}${nextDay}`;
};

const getSafeFilename = (title, date) => {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${normalized || 'event'}-${date}.ics`;
};

const buildIcsContent = ({ title, date, location, details }) => {
  const uid = `${date}-${title.replace(/\s+/g, '-').toLowerCase()}@wedding-website`;
  const dtStamp = getUtcTimestamp();
  const dtEndDate = getNextDateString(date);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Website//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(uid)}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;VALUE=DATE:${date}`,
    `DTEND;VALUE=DATE:${dtEndDate}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(location || '')}`,
    `DESCRIPTION:${escapeIcsText(details || '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
};

const AddToCalendarLink = ({ title, date, location, details, label }) => {
  const handleDownload = () => {
    const icsContent = buildIcsContent({ title, date, location, details });
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = getSafeFilename(title, date);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-1 text-xs text-burnished-copper underline hover:text-burnished-copper-hover mt-1 bg-transparent border-0 p-0 cursor-pointer"
    >
      <CalendarPlus size={13} />
      {label}
    </button>
  );
};

const Schedule = () => {
  const { language } = useLanguage();
  const t = translations[language].schedule;
  const timelineItems = [
    {
      key: 'pre-wedding',
      time: t.preWeddingTime,
      title: t.preWeddingEvent,
      detail: t.preWeddingDate,
      locationLabel: t.preWeddingLocation,
      locationUrl: 'https://maps.app.goo.gl/qo4p5QoEbnxorbcA6?g_st=ic',
      calendar: {
        title: t.preWeddingEvent,
        date: '20270401',
        location: 'Darsena, Buenos Aires',
        details: t.preWeddingEvent,
      },
    },
    {
      key: 'wedding-day',
      time: t.weddingTime,
      detail: t.dateDetails,
      title: t.weddingEventTitle,
      locationLabel: t.weddingLocation,
      locationUrl: LAS_CORTADERAS_MAPS_URL,
      calendar: {
        title: t.weddingEventTitle,
        date: '20270403',
        location: 'Las Cortaderas, Buenos Aires',
        details: t.weddingEventTitle,
      },
    },
    {
      key: 'bus-pickup',
      time: t.busPickupTime,
      title: t.busPickup,
      note: t.busPickupNote,
      locationLabel: t.busPickupLocation,
      locationUrl: PLENO_PALERMO_SOHO_MAPS_URL,
    },
    { key: 'guest-arrive', time: t.guestsArriveTime, title: t.guestsArrive },
    { key: 'ceremony', time: t.ceremonyTime, title: t.ceremony },
    { key: 'cocktail', time: t.cocktailTime, title: t.cocktailHour },
    { key: 'dinner', time: t.dinnerTime, title: t.dinner },
    { key: 'mesa-dulce', time: t.mesaDulceTime, title: t.mesaDulce },
    { key: 'bajon', time: t.bajonTime, title: t.bajon },
    { key: 'party-end', time: t.partyEndTime, title: t.partyEnd },
    { key: 'optional-buses', time: t.optionalBusesTime, title: t.optionalBuses },
  ];

  return (
    <div id="schedule-section" className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        <div id="schedule-timeline" className="bg-off-white rounded-lg shadow-md border border-wedding-accent px-5 md:px-8 py-8">
          <div className="relative">
            {timelineItems.map((item, index) => {
              const isLast = index === timelineItems.length - 1;
              return (
                <div
                  key={item.key}
                  className="grid grid-cols-[90px_22px_1fr] md:grid-cols-[140px_28px_1fr] gap-3 md:gap-4 pb-7 last:pb-0"
                >
                  <div className="text-right">
                    {item.detail ? (
                      <p className="text-base md:text-2xl font-bold text-onyx font-bodoni leading-tight">
                        {item.detail}
                      </p>
                    ) : null}
                    {item.time ? (
                      <p className="text-sm md:text-base text-onyx font-bodoni mt-1">{item.time}</p>
                    ) : null}
                  </div>

                  <div className="relative flex justify-center">
                    {!isLast ? (
                      <span className="absolute top-3 bottom-[-28px] w-px bg-wedding-accent" />
                    ) : null}
                    <span className="mt-2 h-3 w-3 rounded-full bg-burnished-copper border-2 border-off-white shadow-[0_0_0_1px_rgba(92,112,85,0.35)]" />
                  </div>

                  <div>
                    <div className="flex items-start gap-2">
                      {index < 2 ? <Calendar size={16} className="text-onyx/60 mt-[2px] flex-shrink-0" /> : null}
                      <p className="text-base md:text-lg font-semibold text-onyx font-bodoni">{item.title}</p>
                    </div>
                    {item.note ? (
                      <p className="text-sm text-onyx/70 mt-1 font-poppins">{item.note}</p>
                    ) : null}
                    {item.locationLabel ? (
                      <div className="mt-1 flex items-start gap-2">
                        <MapPin size={15} className="text-onyx/55 mt-[2px] flex-shrink-0" />
                        <p className="text-sm text-onyx font-poppins">
                          <a
                            href={item.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-onyx/70"
                          >
                            {item.locationLabel}
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {item.calendar ? (
                      <AddToCalendarLink
                        title={item.calendar.title}
                        date={item.calendar.date}
                        location={item.calendar.location}
                        details={item.calendar.details}
                        label={t.addToCalendar}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
