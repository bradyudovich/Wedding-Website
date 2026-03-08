import React, { useRef, useLayoutEffect } from 'react';

const PhotoCarousel = ({ photos, base }) => {
  if (photos.length === 0) return null;

  const containerRef = useRef(null);

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

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        scrollBehavior: 'auto',
        WebkitOverflowScrolling: 'touch',
        gap: 0,
        padding: 0,
        margin: 0,
      }}
    >
      {tripled.map(({ photo, key }) => (
        <div
          key={key}
          style={{
            flex: '0 0 auto',
            height: 'min(280px, 60vw)',
            width: 'min(280px, 60vw)',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${base}photos/${photo}`}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoCarousel;
