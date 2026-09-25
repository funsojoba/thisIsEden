import { footer, couple } from '../data/content';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <p className="script site-footer__mark">{couple.monogram}</p>
          <p className="site-footer__date">{footer.dateLine}</p>
          <p className="site-footer__address">
            {footer.addressLine1}
            <br />
            {footer.addressLine2}
          </p>
        </div>

        <nav className="site-footer__nav">
          {footer.links.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href={footer.giftCta.href} className="btn btn-gold site-footer__cta">
          {footer.giftCta.label}
        </a>
      </div>

      <div className="container site-footer__bottom">
        <p>
          &copy; {year} {couple.groomFirstName} &amp; {couple.brideFirstName}. Made with love for our people.
        </p>
      </div>
    </footer>
  );
}
