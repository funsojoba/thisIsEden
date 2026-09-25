import { useCallback, useEffect, useRef, useState } from 'react';
import './StoryGallery.css';

// The numbered images in src/images (1.jpg, 2.jpg, …), in numeric order.
const photos = Object.entries(import.meta.glob('../images/[0-9]*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src], i) => ({ src, alt: `Tolulope and Funso — photo ${i + 1}` }));

const tone = (i) => `story-gallery__tone--${(i % 3) + 1}`;

// Horizontal swipe handlers shared by the stage and the lightbox.
function useSwipe(onPrev, onNext) {
  const startX = useRef(null);
  return {
    onTouchStart: (e) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) < 40) return;
      dx > 0 ? onPrev() : onNext();
    },
  };
}

function Arrow({ dir, onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`story-gallery__arrow story-gallery__arrow--${dir} ${className}`}
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous photo' : 'Next photo'}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
}

export default function StoryGallery() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const thumbsRef = useRef(null);
  const count = photos.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const swipe = useSwipe(prev, next);

  // Keep the active thumbnail in view without scrolling the page.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index];
    if (!strip || !thumb) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: 'smooth' });
  }, [index]);

  // Lightbox: arrow keys navigate, Escape closes, page scroll is locked.
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, prev, next]);

  const onStageKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  };

  if (count === 0) return null;

  return (
    <div className="story-gallery" role="region" aria-roledescription="carousel" aria-label="Photo gallery">
      <div className="story-gallery__stage" tabIndex={0} onKeyDown={onStageKey} {...swipe}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={`story-gallery__slide ${tone(i)} ${i === index ? 'is-active' : ''}`}
            onClick={() => setLightbox(true)}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            aria-label={`Open ${photo.alt} full screen`}
          >
            <img src={photo.src} alt={photo.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </button>
        ))}

        <Arrow dir="prev" onClick={prev} />
        <Arrow dir="next" onClick={next} />

        <span className="story-gallery__counter" aria-live="polite">
          {index + 1} / {count}
        </span>
      </div>

      <div className="story-gallery__thumbs" ref={thumbsRef}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={`story-gallery__thumb ${tone(i)} ${i === index ? 'is-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
          >
            <img src={photo.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="story-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setLightbox(false)} {...swipe}>
          <button type="button" className="story-lightbox__close" onClick={() => setLightbox(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            key={photos[index].src}
            className="story-lightbox__img"
            src={photos[index].src}
            alt={photos[index].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <Arrow dir="prev" className="story-lightbox__arrow" onClick={(e) => { e.stopPropagation(); prev(); }} />
          <Arrow dir="next" className="story-lightbox__arrow" onClick={(e) => { e.stopPropagation(); next(); }} />
          <span className="story-lightbox__counter">
            {index + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
