import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEM_WIDTH = 256;
const GAP = 12;
const ITEM_SIZE = ITEM_WIDTH + GAP;

const PhotoCarousel = ({ photos, base }) => {
  const len = photos.length;
  const cloneCount = Math.min(3, len);

  // Create extended array: [last cloneCount items] + [all items] + [first cloneCount items]
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
    if (delta > 50) go(1);
    else if (delta < -50) go(-1);
    touchStartRef.current = null;
  };

  return (
    <div className="relative select-none">
      {/* Left arrow */}
      <button
        onClick={() => go(-1)}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/75 hover:bg-white rounded-full p-1.5 shadow opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Previous photo"
      >
        <ChevronLeft size={18} className="text-gray-600" />
      </button>

      {/* Photos strip */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${-index * ITEM_SIZE}px)`,
            transition: animated ? 'transform 0.3s ease-in-out' : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {items.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-lg shadow-md bg-wedding-secondary"
              style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
            >
              <img
                src={`${base}photos/${photo}`}
                alt=""
                width={ITEM_WIDTH}
                height={ITEM_WIDTH}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => go(1)}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/75 hover:bg-white rounded-full p-1.5 shadow opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Next photo"
      >
        <ChevronRight size={18} className="text-gray-600" />
      </button>
    </div>
  );
};

export default PhotoCarousel;
