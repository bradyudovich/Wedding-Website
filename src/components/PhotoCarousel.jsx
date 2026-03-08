import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Desktop masonry grid ────────────────────────────────────────────────────

const MasonryGallery = ({ photos, base }) => (
  <div
    style={{
      columnCount: 3,
      columnGap: '12px',
    }}
  >
    {photos.map((photo, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-lg shadow-md mb-3 break-inside-avoid"
        style={{ display: 'block' }}
      >
        <img
          src={`${base}photos/${photo}`}
          alt=""
          className="w-full block object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    ))}
  </div>
);

// ─── Mobile centered carousel ─────────────────────────────────────────────────

const SCROLL_THRESHOLD = 5;
const TOUCH_SWIPE_THRESHOLD = 40;
const MOBILE_BREAKPOINT = 768;

const MobileCarousel = ({ photos, base }) => {
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
  const stripRef = useRef(null);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;
      e.preventDefault();
      setAnimated(true);
      setIndex((i) => i + (delta > 0 ? 1 : -1));
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Card widths: center = 76vw, side peek = 12vw each, gap = 8px
  const centerW = '76vw';
  const peekW = '12vw';
  const gap = 8;

  return (
    <div className="relative select-none" style={{ overflow: 'hidden' }}>
      {/* Left arrow */}
      <button
        onClick={() => go(-1)}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/75 hover:bg-white rounded-full p-1.5 shadow opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Previous photo"
      >
        <ChevronLeft size={18} className="text-gray-600" />
      </button>

      {/* Strip container — shows peek on both sides */}
      <div
        ref={stripRef}
        style={{ overflow: 'hidden', padding: `0 ${peekW}` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex items-center"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${index} * (${centerW} + ${gap}px)))`,
            transition: animated ? 'transform 0.35s ease-in-out' : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {items.map((photo, i) => {
            const isCenter = i === index;
            return (
              <div
                key={i}
                className="flex-shrink-0 overflow-hidden rounded-xl shadow-md bg-wedding-secondary"
                style={{
                  width: centerW,
                  aspectRatio: '1 / 1',
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
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => go(1)}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/75 hover:bg-white rounded-full p-1.5 shadow opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Next photo"
      >
        <ChevronRight size={18} className="text-gray-600" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {photos.map((_, i) => {
          const realIndex = ((index - cloneCount) % len + len) % len;
          return (
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
          );
        })}
      </div>
    </div>
  );
};

// ─── Exported component — picks layout by screen size ────────────────────────

const PhotoCarousel = ({ photos, base }) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (photos.length === 0) return null;

  return isMobile ? (
    <MobileCarousel photos={photos} base={base} />
  ) : (
    <MasonryGallery photos={photos} base={base} />
  );
};

export default PhotoCarousel;
