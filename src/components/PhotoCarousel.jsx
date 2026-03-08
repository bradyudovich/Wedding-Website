import React from 'react';

const PhotoCarousel = ({ photos, base }) => {
  if (photos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      {photos.map((photo, i) => (
        <div key={i} style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
          <img
            src={`${base}photos/${photo}`}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoCarousel;
