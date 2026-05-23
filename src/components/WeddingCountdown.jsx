import React, { useEffect, useState } from 'react';

const WEDDING_DATE = new Date('2027-04-03T03:00:00Z');

const calcTimeLeft = () => {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n) => String(n).padStart(2, '0');

const WeddingCountdown = ({ variant = 'compact' }) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (variant === 'hero') {
    const units = [
      { label: 'days', value: String(timeLeft.days) },
      { label: 'hours', value: pad(timeLeft.hours) },
      { label: 'mins', value: pad(timeLeft.minutes) },
      { label: 'secs', value: pad(timeLeft.seconds) },
    ];

    return (
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {units.map(({ label, value }) => (
            <div key={label} className="bg-off-white/90 border border-wedding-accent rounded-xl py-4 md:py-5 shadow-sm">
              <div className="font-lora text-4xl md:text-5xl text-onyx tabular-nums leading-none">
                {value}
              </div>
              <div className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-onyx/60 font-manrope">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <span className="font-bodoni tabular-nums text-[17.5px] text-burnished-copper tracking-tight">
      {pad(timeLeft.days)}<span className="text-onyx/50 mx-0.5">d</span>{pad(timeLeft.hours)}<span className="text-onyx/50 mx-0.5">h</span>{pad(timeLeft.minutes)}<span className="text-onyx/50 mx-0.5">m</span>{pad(timeLeft.seconds)}<span className="text-onyx/50 mx-0.5">s</span>
    </span>
  );
};

export default WeddingCountdown;
