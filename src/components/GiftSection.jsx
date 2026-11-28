import { useState } from 'react';
import { gift } from '../data/content';
import useReveal from '../hooks/useReveal';
import './GiftSection.css';

function CopyButton({ value, copyKey, copiedKey, onCopy }) {
  return (
    <button type="button" className="gift-card__copy" onClick={() => onCopy(value, copyKey)}>
      {copiedKey === copyKey ? 'Copied' : 'Copy'}
    </button>
  );
}

// Splits a flat details list into sections at each `{ group }` marker.
function groupDetails(details) {
  return details.reduce((groups, row) => {
    if (row.group) groups.push({ title: row.group, rows: [] });
    else groups[groups.length - 1].rows.push(row);
    return groups;
  }, []);
}

function BankCard({ account, copiedKey, onCopy }) {
  return (
    <div className={`gift-card ${account.details ? 'gift-card--wire' : ''}`}>
      <span className="gift-card__label">{account.label}</span>
      <p className="gift-card__bank">{account.bankName}</p>
      <p className="gift-card__name">{account.accountName}</p>

      {account.details ? (
        <div className="gift-card__details">
          {groupDetails(account.details).map((group) => (
            <section key={group.title} className="gift-card__group">
              <h3 className="gift-card__group-title">{group.title}</h3>
              <dl>
                {group.rows.map((row) => (
                  <div key={row.label} className="gift-card__detail">
                    <dt>{row.label}</dt>
                    <dd>
                      <span>{row.value}</span>
                      {row.copy && (
                        <CopyButton value={row.value} copyKey={`${group.title}-${row.label}`} copiedKey={copiedKey} onCopy={onCopy} />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      ) : (
        <div className="gift-card__number-row">
          <span className="gift-card__number">{account.accountNumber}</span>
          <CopyButton value={account.accountNumber} copyKey={account.label} copiedKey={copiedKey} onCopy={onCopy} />
        </div>
      )}
    </div>
  );
}

export default function GiftSection() {
  const { ref, visible } = useReveal();
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2000);
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
          {gift.accounts.map((account) => (
            <BankCard key={account.label} account={account} copiedKey={copiedKey} onCopy={handleCopy} />
          ))}
        </div>
      </div>
    </section>
  );
}
