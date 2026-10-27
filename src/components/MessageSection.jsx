import { message } from '../data/content';
import useReveal from '../hooks/useReveal';
import PhotoFrame from './PhotoFrame';
import coupleImage from '../images/funso&tolu.jpg';
import './MessageSection.css';

export default function MessageSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="message" className="section message">
      <div className="container message__grid">
        <div ref={ref} className={`message__copy reveal ${visible ? 'is-visible' : ''}`}>
          <p className="script message__heading">{message.eyebrow}</p>
          <div className="divider" />
          <p className="message__body">{message.body}</p>

          <div className="message__ctas">
            <a href={message.giftCta.href} className="btn btn-primary">
              {message.giftCta.label}
            </a>
          </div>
        </div>

        <div className="message__photo">
          <PhotoFrame src={coupleImage} alt="Tolulope and Funso" tone="gold" matted />
        </div>
      </div>
    </section>
  );
}
