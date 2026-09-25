import { story } from '../data/content';
import useReveal from '../hooks/useReveal';
import StoryGallery from './StoryGallery';
import './OurStory.css';

function Milestone({ item, index }) {
  const { ref, visible } = useReveal();
  return (
    <li ref={ref} className={`story-timeline__item reveal ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 90}ms` }}>
      <span className="story-timeline__year">{item.year}</span>
      <span className="story-timeline__dot" aria-hidden="true" />
      <div className="story-timeline__body">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </li>
  );
}

export default function OurStory() {
  const heading = useReveal();

  return (
    <section id="story" className="section story">
      <div className="container story__grid">
        <div ref={heading.ref} className={`story__intro reveal ${heading.visible ? 'is-visible' : ''}`}>
          <p className="script story__heading">{story.eyebrow}</p>
          <div className="divider" />
          <p className="story__lead">{story.intro}</p>

          <ol className="story-timeline">
            {story.milestones.map((item, index) => (
              <Milestone key={item.year} item={item} index={index} />
            ))}
          </ol>
        </div>

        <StoryGallery />
      </div>
    </section>
  );
}
