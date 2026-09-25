import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-linked parallax. Moves the element a fraction
 * (`speed`) of the page's scroll distance via a GPU-friendly transform,
 * rAF-throttled so it never fights the browser's own scroll handling.
 * `speed` of 0.3 means the layer travels 30% as fast as the page —
 * i.e. it appears to lag behind, the classic parallax "depth" cue.
 */
export default function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let ticking = false;

    const update = () => {
      const rect = node.parentElement.getBoundingClientRect();
      // Offset relative to the viewport centre so the image sits centred
      // when the section is centred on screen, drifting as it passes.
      const offset = rect.top * speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return ref;
}
