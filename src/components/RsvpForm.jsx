import { useState } from 'react';
import { rsvpForm } from '../data/content';
import useReveal from '../hooks/useReveal';
import './RsvpForm.css';

const initialForm = {
  fullName: '',
  email: '',
  attending: null, // true | false | null
  guests: 1,
  dietary: '',
  note: '',
};

/**
 * Client-side only for now — `handleSubmit` just mocks a network call and
 * shows a confirmation. When a real endpoint exists (Formspree, Getform,
 * your own API route), replace the body of `submitRsvp` below with the
 * actual request; everything else can stay as is.
 */
async function submitRsvp(formState) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // eslint-disable-next-line no-console
  console.log('RSVP submitted (placeholder):', formState);
  return { ok: true };
}

export default function RsvpForm() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const setAttending = (value) => {
    setForm((prev) => ({ ...prev, attending: value, guests: value ? prev.guests || 1 : 0 }));
    setErrors((prev) => ({ ...prev, attending: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Please tell us your name.';
    if (!form.email.trim()) next.email = 'Please share an email so we can confirm.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "That email doesn't look quite right.";
    if (form.attending === null) next.attending = 'Let us know if you can make it.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const result = await submitRsvp(form);
      setStatus(result.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="rsvp-form" className="section rsvp-form">
      <div ref={ref} className={`container rsvp-form__inner reveal ${visible ? 'is-visible' : ''}`}>
        <div className="rsvp-form__intro">
          <p className="eyebrow">{rsvpForm.eyebrow}</p>
          <h2 className="script rsvp-form__heading">{rsvpForm.heading}</h2>
          <div className="divider divider--center" />
          <p className="rsvp-form__lead">{rsvpForm.intro}</p>
          <p className="rsvp-form__deadline">
            {rsvpForm.deadlineLabel} <strong>{rsvpForm.deadlineDate}</strong>
          </p>
        </div>

        <div className="rsvp-form__card">
          {status === 'done' ? (
            <div className="rsvp-form__done">
              <span className="rsvp-form__check" aria-hidden="true">
                &#10003;
              </span>
              <h3>Thank you, {form.fullName.split(' ')[0]}!</h3>
              <p>
                {form.attending
                  ? "We've saved your seat — we can't wait to celebrate with you."
                  : "We'll miss you, but thank you so much for letting us know."}
              </p>
              <p className="rsvp-form__contact">
                Need to change your response? Email {rsvpForm.contactName} at{' '}
                <a href={`mailto:${rsvpForm.contactEmail}`}>{rsvpForm.contactEmail}</a>.
              </p>
              <button type="button" className="btn btn-outline-dark" onClick={handleReset}>
                Submit another response
              </button>
            </div>
          ) : (
            <form className="rsvp-form__form" onSubmit={handleSubmit} noValidate>
              <div className="rsvp-form__field">
                <label htmlFor="rsvp-name">Full name</label>
                <input
                  id="rsvp-name"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={update('fullName')}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && <span className="rsvp-form__error">{errors.fullName}</span>}
              </div>

              <div className="rsvp-form__field">
                <label htmlFor="rsvp-email">Email address</label>
                <input
                  id="rsvp-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="rsvp-form__error">{errors.email}</span>}
              </div>

              <div className="rsvp-form__field">
                <span className="rsvp-form__label">Will you be attending?</span>
                <div className="rsvp-form__toggle" role="radiogroup" aria-label="Attending">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={form.attending === true}
                    className={`rsvp-form__pill ${form.attending === true ? 'is-active' : ''}`}
                    onClick={() => setAttending(true)}
                  >
                    Joyfully accepts
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={form.attending === false}
                    className={`rsvp-form__pill ${form.attending === false ? 'is-active' : ''}`}
                    onClick={() => setAttending(false)}
                  >
                    Regretfully declines
                  </button>
                </div>
                {errors.attending && <span className="rsvp-form__error">{errors.attending}</span>}
              </div>

              {form.attending && (
                <div className="rsvp-form__field">
                  <label htmlFor="rsvp-guests">Number of guests (including you)</label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={rsvpForm.guestCap}
                    value={form.guests}
                    onChange={update('guests')}
                  />
                </div>
              )}

              {form.attending && (
                <div className="rsvp-form__field">
                  <label htmlFor="rsvp-dietary">Dietary notes (optional)</label>
                  <input
                    id="rsvp-dietary"
                    type="text"
                    placeholder="Allergies, vegetarian, etc."
                    value={form.dietary}
                    onChange={update('dietary')}
                  />
                </div>
              )}

              <div className="rsvp-form__field">
                <label htmlFor="rsvp-note">Message to the couple (optional)</label>
                <textarea
                  id="rsvp-note"
                  rows={3}
                  placeholder="Leave us a note..."
                  value={form.note}
                  onChange={update('note')}
                />
              </div>

              {status === 'error' && (
                <p className="rsvp-form__error rsvp-form__error--form">
                  Something went wrong sending that — please try again in a moment.
                </p>
              )}

              <button type="submit" className="btn btn-primary rsvp-form__submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
