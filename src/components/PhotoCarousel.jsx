import React, { useState, useRef, useEffect } from 'react';

// ─── Centered carousel ────────────────────────────────────────────────────────

const TOUCH_SWIPE_THRESHOLD = 40;

const Carousel = ({ photos, base }) => {
  const len = photos.length;
  const cloneCount = Math.min(3, len);

  const items = [
    ...photos.slice(len - cloneCount),
    ...photos,
    ...photos.slice(0, cloneCount),
  ];

  const [index, setIndex] = useState(cloneCount);
  const [animated, setAnimated] = useState(true);
  const touchStartRef = useRef(null);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  if (len === 0) return null;

  const onTransitionEnd = () => {
    if (index < cloneCount) {
      setAnimated(false);
      setIndex(index + len);
    } else if (index >= cloneCount + len) {
      setAnimated(false);
      setIndex(index - len);
    }
  };

  const go = (dir) => {
    setAnimated(true);
    setIndex((i) => i + dir);
  };

  const onTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const delta = touchStartRef.current - e.changedTouches[0].clientX;
    if (delta > TOUCH_SWIPE_THRESHOLD) go(1);
    else if (delta < -TOUCH_SWIPE_THRESHOLD) go(-1);
    touchStartRef.current = null;
  };

  // Card width: 64vw on all screens, properly centered so 18vw of each neighbor peeks in
  const centerW = '64vw';
  const halfCenterW = '32vw';
  const gap = 12;

  const realIndex = ((index - cloneCount) % len + len) % len;

  return (
    <div className="relative select-none" style={{ overflow: 'hidden', maxHeight: '500px' }}>
      {/* Strip container — overflow clips neighbor cards symmetrically */}
      <div
        style={{ overflow: 'hidden' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex items-center"
          style={{
            gap: `${gap}px`,
            // Center active card at 50vw: translate = 50vw - halfCenterW - index*(centerW+gap)
            transform: `translateX(calc(50vw - ${halfCenterW} - ${index} * (${centerW} + ${gap}px)))`,
            transition: animated ? 'transform 0.35s ease-in-out' : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {items.map((photo, i) => {
            const isCenter = i === index;
            return (
              <div
                key={i}
                className="flex-shrink-0 overflow-hidden rounded-xl shadow-md bg-gray-100"
                style={{
                  width: centerW,
                  aspectRatio: '4 / 3',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease',
                  transform: isCenter ? 'scale(1)' : 'scale(0.92)',
                  opacity: isCenter ? 1 : 0.55,
                  boxShadow: isCenter
                    ? '0 8px 24px rgba(0,0,0,0.18)'
                    : '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={`${base}photos/${photo}`}
                  alt=""
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev/Next arrows — low-profile, visible on all screen sizes */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-white/60 hover:bg-white/90 text-gray-600 hover:text-gray-900 transition-all shadow-sm z-10"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next photo"
        className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-white/60 hover:bg-white/90 text-gray-600 hover:text-gray-900 transition-all shadow-sm z-10"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAnimated(true); setIndex(i + cloneCount); }}
            className={`rounded-full transition-all ${
              i === realIndex
                ? 'w-4 h-2 bg-gray-600'
                : 'w-2 h-2 bg-gray-300'
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────

const PhotoCarousel = ({ photos, base }) => {
  if (photos.length === 0) return null;

  return <Carousel photos={photos} base={base} />;
};

export default PhotoCarousel;
