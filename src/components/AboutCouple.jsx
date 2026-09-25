import { bride, groom } from '../data/content';
import useReveal from '../hooks/useReveal';
import './AboutCouple.css';

function AboutRow({ data, imageSide, tone }) {
  const { ref, visible } = useReveal();

  return (
    <div className={`about-row about-row--${imageSide} about-row--${tone}`}>
      <div className="about-row__image">
        <div className="about-row__placeholder">
          <span className="script">{data.name}</span>
        </div>
      </div>

      <div ref={ref} className={`about-row__copy reveal ${visible ? 'is-visible' : ''}`}>
        <p className="script about-row__heading">{data.heading}</p>
        <div className="divider" />
        <p className="about-row__bio">{data.bio}</p>
        <a href={data.cta.href} className="btn btn-outline-dark">
          {data.cta.label}
        </a>
      </div>
    </div>
  );
}

export default function AboutCouple() {
  return (
    <section id="about" className="about-couple">
      <AboutRow data={bride} imageSide="left" tone="cream" />
      <AboutRow data={groom} imageSide="right" tone="blush" />
    </section>
  );
}
