import React from 'react';
import { CalendarPlus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const DARSENA_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Jos%C3%A9+A.+Cabrera+4354,+Palermo,+Buenos+Aires';

const LAS_CORTADERAS_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=J.+M.+Loreto+4600,+Dique+Luj%C3%A1n,+Provincia+de+Buenos+Aires,+Argentina';

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
  const saturdayTimelineItems = [
    {
      key: 'bus-pickup',
      time: t.busPickupTime,
      title: t.busPickup,
      optional: true,
      locationLabel: t.busPickupLocation,
      locationUrl: null,
    },
    {
      key: 'guest-arrive',
      time: t.guestsArriveTime,
      title: t.guestsArrive,
    },
    { key: 'ceremony', time: t.ceremonyTime, title: t.ceremony },
    { key: 'cocktail', time: t.cocktailTime, title: t.cocktailHour },
    { key: 'dinner', time: t.dinnerTime, title: t.dinner },
    { key: 'mesa-dulce', time: t.mesaDulceTime, title: t.mesaDulce },
    { key: 'bajon', time: t.bajonTime, title: t.bajon },
    { key: 'party-end', time: t.partyEndTime, title: t.partyEnd },
    {
      key: 'optional-buses',
      time: t.optionalBusesTime,
      title: t.optionalBuses,
      optional: true,
      note: t.optionalBusesNote,
      locationLabel: t.optionalBusesLocation,
      locationUrl: null,
    },
  ];

  const renderTimelineRow = (item, { isLast = false } = {}) => (
    <div
      key={item.key}
      className="grid grid-cols-[88px_22px_minmax(0,1fr)] md:grid-cols-[128px_28px_minmax(0,1fr)] gap-3 md:gap-4 pb-7 last:pb-0"
    >
      <div className="pt-0.5 text-right">
        {item.time ? (
          <p className="text-sm md:text-base font-semibold text-onyx font-bodoni leading-tight">{item.time}</p>
        ) : (
          <span className="block h-5" aria-hidden="true" />
        )}
      </div>

      <div className="relative flex justify-center">
        {!isLast ? (
          <span
            className="absolute top-3 bottom-[-28px] w-[2px] bg-wedding-accent/80"
          />
        ) : null}
        <span
          className="mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-off-white bg-wedding-accent shadow-[0_0_0_1px_rgba(63,91,66,0.18)]"
        />
      </div>

      <div className="min-w-0 grid grid-cols-1 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-y-1 md:gap-x-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base md:text-lg font-semibold text-onyx font-bodoni leading-tight">{item.title}</p>
            {item.optional ? (
              <span className="inline-flex items-center rounded-full bg-wedding-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-burnished-copper font-poppins">
                {t.optionalBadge}
              </span>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 md:pt-0.5">
          {item.note ? (
            <p className="text-sm leading-relaxed font-poppins text-onyx/75">{item.note}</p>
          ) : null}
          {item.locationLabel ? (
            <p className="text-sm font-poppins text-onyx/75 leading-relaxed break-words">
              {item.locationUrl ? (
                <a
                  href={item.locationUrl}
                  className="underline hover:text-onyx break-words"
                >
                  {item.locationLabel}
                </a>
              ) : (
                <span>{item.locationLabel}</span>
              )}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <div id="schedule-section" className="min-h-screen py-10 md:py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-onyx mb-8 text-center font-bodoni">
          {t.title}
        </h1>

        <div className="space-y-6">
          <section className="bg-off-white rounded-2xl shadow-md border border-wedding-accent px-5 md:px-8 py-7 md:py-8">
            <p className="text-4xl md:text-5xl font-black text-onyx font-bodoni leading-tight md:whitespace-nowrap">
              {t.preWeddingEvent}
            </p>
            <p className="mt-3 text-lg md:text-2xl text-onyx font-bodoni">{t.preWeddingDate} | {t.preWeddingTime}</p>
            <div className="mt-3 rounded-xl border border-wedding-accent/55 bg-wedding-secondary/20 px-4 py-3">
              <p className="text-xs md:text-[13px] font-semibold uppercase tracking-[0.14em] text-onyx font-poppins">
                {t.venueLabel} {t.preWeddingVenueName}
              </p>
              <p className="mt-1 min-w-0 text-sm md:text-[15px] text-onyx/80 font-poppins leading-relaxed break-words">
                <a
                  href={DARSENA_MAPS_URL}
                  className="underline hover:text-onyx break-words"
                >
                  {t.preWeddingVenueAddress}
                </a>
              </p>
            </div>
            <AddToCalendarLink
              title={t.preWeddingEvent}
              date="20270401"
              location={`${t.preWeddingVenueName}, ${t.preWeddingVenueAddress}`}
              details={t.preWeddingDetails}
              label={t.addToCalendar}
            />
          </section>

          <section id="schedule-timeline" className="bg-off-white rounded-2xl shadow-md border border-wedding-accent overflow-hidden">
            <div className="px-5 md:px-8 py-7 md:py-8 bg-wedding-secondary/30">
              <p className="text-4xl md:text-5xl font-black text-onyx font-bodoni leading-tight">
                {t.weddingHeadline}
              </p>
              <p className="mt-3 text-lg md:text-2xl text-onyx font-bodoni">{t.weddingDate} | {t.weddingCeremonyStartTime}</p>
              <div className="mt-3 rounded-xl border border-wedding-accent/55 bg-wedding-secondary/20 px-4 py-3">
                <p className="text-xs md:text-[13px] font-semibold uppercase tracking-[0.14em] text-onyx font-poppins">
                  {t.venueLabel} {t.weddingLocation}
                </p>
                <p className="mt-1 min-w-0 text-sm md:text-[15px] text-onyx/80 font-poppins leading-relaxed break-words">
                  <a
                    href={LAS_CORTADERAS_MAPS_URL}
                    className="underline hover:text-onyx break-words"
                  >
                    {t.weddingAddress}
                  </a>
                </p>
              </div>
              <AddToCalendarLink
                title={t.weddingEventTitle}
                date="20270403"
                location={`${t.weddingLocation}, ${t.weddingAddress}`}
                details={`${t.weddingDate} • ${t.weddingCeremonyStartTime} • ${t.venueLabel} ${t.weddingLocation} • ${t.weddingAddress}`}
                label={t.addToCalendar}
              />
            </div>

            <div className="px-5 md:px-8 py-7 md:py-8">
              {saturdayTimelineItems.map((item, index) => (
                <React.Fragment key={item.key}>
                  {renderTimelineRow(item, {
                    isLast: index === saturdayTimelineItems.length - 1,
                  })}
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
