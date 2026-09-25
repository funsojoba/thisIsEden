import { verse } from '../data/content';
import useParallax from '../hooks/useParallax';
import useReveal from '../hooks/useReveal';
import './Verse.css';

export default function Verse() {
  const parallaxRef = useParallax(0.22);
  const { ref, visible } = useReveal();

  return (
    <section className="verse">
      <div className="verse__media">
        <img ref={parallaxRef} className="verse__image" src={verse.image} alt="" aria-hidden="true" />
        <div className="verse__scrim" />
      </div>

      <div ref={ref} className={`verse__content container reveal ${visible ? 'is-visible' : ''}`}>
        <blockquote>
          <p>&ldquo;{verse.text}&rdquo;</p>
          <cite>{verse.reference}</cite>
        </blockquote>
      </div>
    </section>
  );
}
