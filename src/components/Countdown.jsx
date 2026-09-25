import { schedule, wedding, message, hero } from '../data/content';
import useCountdown from '../hooks/useCountdown';
import useReveal from '../hooks/useReveal';
import PhotoFrame from './PhotoFrame';
import './Countdown.css';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
];

export default function Countdown() {
  const timeLeft = useCountdown(wedding.dateISO);
  const { ref, visible } = useReveal();

  return (
    <section id="schedule" className="section countdown section-dark">
      <div className="container countdown__grid">
        <div ref={ref} className={`countdown__copy reveal ${visible ? 'is-visible' : ''}`}>
          <p className="eyebrow">{schedule.eyebrow}</p>
          <h2 className="countdown__heading">{schedule.heading}</h2>
          <p className="countdown__detail">{schedule.detail}</p>

          <div className="countdown__timer" role="timer" aria-live="polite">
            {UNITS.map((unit) => (
              <div key={unit.key} className="countdown__unit">
                <span className="countdown__number">{String(timeLeft[unit.key]).padStart(2, '0')}</span>
                <span className="countdown__label">{unit.label}</span>
              </div>
            ))}
          </div>

          <div className="countdown__ctas">
            <a href={message.rsvpCta.href} className="btn btn-gold">
              {message.rsvpCta.label}
            </a>
            <a href={message.giftCta.href} className="btn btn-outline">
              {message.giftCta.label}
            </a>
          </div>
        </div>

        <div className="countdown__photo">
          <PhotoFrame src={hero.image} alt="Tolulope and Funso" tone="cream" />
        </div>
      </div>
    </section>
  );
}
