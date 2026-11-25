import { colours } from '../data/content';
import useReveal from '../hooks/useReveal';
import './ColoursOfTheDay.css';

export default function ColoursOfTheDay() {
  const { ref, visible } = useReveal();

  return (
    <section id="colours" className="section colours">
      <div ref={ref} className={`container colours__inner reveal ${visible ? 'is-visible' : ''}`}>
        <p className="eyebrow">{colours.eyebrow}</p>
        <h2 className="script colours__heading">{colours.heading}</h2>
        <div className="divider divider--center" />
        <p className="colours__lead">{colours.intro}</p>

        <ul className="colours__list">
          {colours.swatches.map((swatch) => (
            <li key={swatch.hex} className="colours__item">
              <span className="colours__swatch" style={{ background: swatch.hex }} aria-hidden="true" />
              <span className="colours__name">{swatch.name}</span>
              <span className="colours__hex">{swatch.hex}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
