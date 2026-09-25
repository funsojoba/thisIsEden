import { message } from '../data/content';
import useReveal from '../hooks/useReveal';
import PhotoFrame from './PhotoFrame';
import coupleImage from '../images/funso&tolu.jpg';
import './RsvpSection.css';

export default function RsvpSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="rsvp" className="section rsvp">
      <div className="container rsvp__grid">
        <div ref={ref} className={`rsvp__copy reveal ${visible ? 'is-visible' : ''}`}>
          <p className="script rsvp__heading">{message.eyebrow}</p>
          <div className="divider" />
          <p className="rsvp__body">{message.body}</p>

          <div className="rsvp__ctas">
            <a href="#rsvp-form" className="btn btn-primary">
              {message.rsvpCta.label}
            </a>
            <a href="#gift" className="btn btn-outline-dark">
              {message.giftCta.label}
            </a>
          </div>
        </div>

        <div className="rsvp__photo">
          <PhotoFrame src={coupleImage} alt="Tolulope and Funso" tone="gold" matted />
        </div>
      </div>
    </section>
  );
}
