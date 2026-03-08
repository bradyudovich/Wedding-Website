import React from 'react';

const PhotoCarousel = ({ photos, base }) => {
  if (photos.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        gap: 0,
        padding: 0,
        margin: 0,
      }}
    >
      {photos.map((photo, i) => (
        <div
          key={i}
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
