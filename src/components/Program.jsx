import { program } from '../data/content';
import useReveal from '../hooks/useReveal';
import './Program.css';

function ProgramEvent({ event, index }) {
  const { ref, visible } = useReveal();

  return (
    <li ref={ref} className={`program-event reveal ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 120}ms` }}>
      <span className="program-event__marker" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="program-event__card">
        <time className="program-event__time">{event.time}</time>
        <h3 className="program-event__title">{event.title}</h3>
        {/* Venue hidden for now — uncomment to show it again (data is still in content.js).
        <p className="program-event__venue">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          <span>
            <strong>{event.venue}</strong>
            {event.address}
          </span>
        </p>
        */}
      </div>
    </li>
  );
}

export default function Program() {
  const heading = useReveal();

  return (
    <section id="program" className="section program">
      <div className="container">
        <div ref={heading.ref} className={`program__intro reveal ${heading.visible ? 'is-visible' : ''}`}>
          <p className="eyebrow">{program.eyebrow}</p>
          <h2 className="script program__heading">{program.heading}</h2>
          <div className="divider divider--center" />
        </div>

        <ol className="program__list">
          {program.events.map((event, index) => (
            <ProgramEvent key={event.title} event={event} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
