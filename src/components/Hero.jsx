import { hero } from '../data/content';
import useParallax from '../hooks/useParallax';
import './Hero.css';

export default function Hero() {
  const parallaxRef = useParallax(0.35);

  return (
    <section id="hero" className="hero">
      <div className="hero__media">
        <img ref={parallaxRef} className="hero__image" src={hero.image} alt="Tolu and Funso holding hands, walking toward the sea" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__title">{hero.title}</h1>
        <div className="hero__divider" />
        <p className="hero__subtitle">{hero.subtitle}</p>
        <p className="hero__date">{hero.dateLine}</p>
      </div>

      <a href="#story" className="hero__scroll" aria-label="Scroll to our story">
        <span className="hero__scroll-line" />
        Scroll
      </a>
    </section>
  );
}
