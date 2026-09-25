import { useState } from 'react';
import { gift } from '../data/content';
import useReveal from '../hooks/useReveal';
import './GiftSection.css';

function BankCard({ account, index, copiedIndex, onCopy }) {
  const copied = copiedIndex === index;

  return (
    <div className="gift-card">
      <span className="gift-card__label">{account.label}</span>
      <p className="gift-card__bank">{account.bankName}</p>
      <p className="gift-card__name">{account.accountName}</p>

      <div className="gift-card__number-row">
        <span className="gift-card__number">{account.accountNumber}</span>
        <button type="button" className="gift-card__copy" onClick={() => onCopy(account.accountNumber, index)}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default function GiftSection() {
  const { ref, visible } = useReveal();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (value, index) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 2000);
    } catch {
      // Clipboard API unavailable — the account number is still selectable/visible on the card.
    }
  };

  return (
    <section id="gift" className="section gift">
      <div ref={ref} className={`container gift__inner reveal ${visible ? 'is-visible' : ''}`}>
        <div className="gift__intro">
          <p className="eyebrow">{gift.eyebrow}</p>
          <h2 className="script gift__heading">{gift.heading}</h2>
          <div className="divider divider--center" />
          <p className="gift__lead">{gift.intro}</p>
        </div>

        <div className="gift__grid">
          {gift.accounts.map((account, index) => (
            <BankCard key={account.label} account={account} index={index} copiedIndex={copiedIndex} onCopy={handleCopy} />
          ))}

          <div className="gift-card gift-card--registry">
            <span className="gift-card__label">{gift.registry.heading}</span>
            <p className="gift-card__registry-note">{gift.registry.note}</p>
            <a href={gift.registry.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold gift-card__registry-cta">
              {gift.registry.label} &nbsp;&#8599;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
