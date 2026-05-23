import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const PhotoCarousel = ({ photos, base }) => {
  const containerRef = useRef(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  if (photos.length === 0) return null;

  // Triple the array so the carousel can loop seamlessly in both directions
  const tripled = [
    ...photos.map((p, i) => ({ photo: p, key: `0-${i}` })),
    ...photos.map((p, i) => ({ photo: p, key: `1-${i}` })),
    ...photos.map((p, i) => ({ photo: p, key: `2-${i}` })),
  ];

  // Initialise scroll position to the middle set before first paint to avoid flicker
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, [photos]);

  // When the user scrolls into the first or last copy, silently jump back to the
  // equivalent position in the middle copy so scrolling appears endless.
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const setWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= 2 * setWidth) {
      el.scrollLeft -= setWidth;
    } else if (el.scrollLeft < 1) {
      el.scrollLeft += setWidth;
    }
  };

  const scrollByDirection = (direction) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.78, 260);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!lightboxPhoto) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxPhoto(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxPhoto]);

  return (
    <>
      <div className="relative">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
            gap: 8,
            padding: '0 8px',
            margin: 0,
          }}
        >
          {tripled.map(({ photo, key }) => (
            <button
              key={key}
              type="button"
              onClick={() => setLightboxPhoto(photo)}
              className="flex-none w-[72vw] max-w-[360px] md:w-[320px] lg:w-[360px] aspect-[4/3] overflow-hidden rounded-[10px] border-0 p-0 bg-transparent cursor-zoom-in"
            >
              <img
                src={`${base}photos/${photo}`}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-pumice/90 to-transparent md:hidden" />
        <button
          type="button"
          aria-label="Previous photos"
          onClick={() => scrollByDirection(-1)}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-off-white/90 text-onyx border border-wedding-accent shadow-sm hover:bg-off-white"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next photos"
          onClick={() => scrollByDirection(1)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-off-white/90 text-onyx border border-wedding-accent shadow-sm hover:bg-off-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      {lightboxPhoto ? (
        <div
          className="fixed inset-0 z-[70] bg-black/85 p-4 md:p-8 flex items-center justify-center"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/90 hover:text-white p-2"
            onClick={() => setLightboxPhoto(null)}
            aria-label="Close photo"
          >
            <X size={28} />
          </button>
          <img
            src={`${base}photos/${lightboxPhoto}`}
            alt=""
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
};

export default PhotoCarousel;
