import { useEffect, useState } from 'react';
import { nav, couple, message } from '../data/content';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled || open ? 'navbar--solid' : ''}`}>
      <div className="container navbar__inner">
        <a href="#hero" className="navbar__mark" onClick={handleLinkClick} aria-label={`${couple.monogram} — back to top`}>
          <img src="/images/logo.png" alt="" />
        </a>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={handleLinkClick}>
              {item.label}
            </a>
          ))}
          <a href={message.giftCta.href} className="navbar__gift" onClick={handleLinkClick}>
            {message.giftCta.label}
          </a>
        </nav>

        <button
          type="button"
          className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
