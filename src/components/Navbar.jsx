import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plane, Calendar, Map, HelpCircle, Send, Gift } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const RSVP_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfx5AVkAgdBjFCfGELmYfRlCHaAZT67t5P6kQHG2XAjlnyJOw/viewform?usp=dialog';

const openRsvpPopup = () => {
  window.open(
    RSVP_FORM_URL,
    'rsvpPopup',
    'width=700,height=800,resizable=yes,scrollbars=yes'
  );
};

// April 3, 2027 00:00:00 ART (UTC-3) = April 3, 2027 03:00:00 UTC
const WEDDING_DATE = new Date('2027-04-03T03:00:00Z');

function calcTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CompactCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <span className="font-bodoni tabular-nums text-[17.5px] text-burnished-copper tracking-tight">
      {pad(timeLeft.days)}<span className="text-onyx/50 mx-0.5">d</span>{pad(timeLeft.hours)}<span className="text-onyx/50 mx-0.5">h</span>{pad(timeLeft.minutes)}<span className="text-onyx/50 mx-0.5">m</span>{pad(timeLeft.seconds)}<span className="text-onyx/50 mx-0.5">s</span>
    </span>
  );
};

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const location = useLocation();

  const navLinks = [
    { to: '/', icon: <Home size={20} />, label: t.home },
    { to: '/schedule', icon: <Calendar size={20} />, label: t.schedule },
    { to: '/things-to-do', icon: <Map size={20} />, label: t.thingsToDo },
    { to: '/travel', icon: <Plane size={20} />, label: t.travel },
    { to: '/faq', icon: <HelpCircle size={20} />, label: t.faq },
    { to: '/registry', icon: <Gift size={20} />, label: t.registry },
  ];

  return (
    <>
      {/* ── Top navbar (always visible) ─────────────────────────── */}
      <nav className="bg-off-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Brand */}
            <Link to="/" className="text-xl md:text-2xl font-bold text-onyx font-bodoni whitespace-nowrap flex-shrink-0">
              Cami & Brady
            </Link>

            {/* Compact countdown — mobile only, between brand and language toggle */}
            <div className="md:hidden flex-1 flex justify-center">
              <CompactCountdown />
            </div>

            {/* Navigation Links — hidden on mobile, shown on md+ */}
            <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
              {navLinks.map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-1 text-onyx hover:text-onyx/60 transition-colors font-medium font-poppins whitespace-nowrap"
                >
                  {React.cloneElement(icon, { size: 16 })}
                  <span>{label}</span>
                </Link>
              ))}
              <button
                onClick={openRsvpPopup}
                className="flex items-center gap-1 bg-burnished-copper text-white px-3 py-1.5 rounded-md hover:bg-burnished-copper/90 transition-colors font-medium font-poppins whitespace-nowrap"
              >
                <Send size={16} />
                <span>{t.rsvp}</span>
              </button>
            </div>

            {/* Compact countdown — desktop only, between nav links and language toggle */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <CompactCountdown />
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-auto bg-gray-200 hover:bg-gray-300 h-9 w-9 p-1 rounded-md font-medium transition-colors flex-shrink-0 flex items-center justify-center"
              aria-label="Toggle Language"
            >
              <span className="text-2xl leading-none">
                {language === 'en' ? '🇦🇷' : '🇺🇸'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Fixed bottom nav (mobile only) ──────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-off-white/80 backdrop-blur-md border-t border-onyx/10 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex items-stretch">
          {navLinks.map(({ to, icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center justify-center flex-1 py-2 gap-0.5 text-[10px] font-medium font-poppins transition-colors ${
                  active ? 'text-onyx' : 'text-onyx/40'
                }`}
              >
                <span className={active ? 'text-onyx' : 'text-onyx/40'}>
                  {icon}
                </span>
                <span className="leading-tight text-center px-0.5">{label}</span>
              </Link>
            );
          })}
          {/* RSVP button */}
          <button
            onClick={openRsvpPopup}
            className={`flex flex-col items-center justify-center flex-1 py-2 gap-0.5 text-[10px] font-medium font-poppins transition-colors text-burnished-copper`}
          >
            <Send size={20} className="text-burnished-copper" />
            <span className="leading-tight">{t.rsvp}</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
