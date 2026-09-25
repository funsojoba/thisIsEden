import './PhotoFrame.css';

/**
 * Layered "polaroid stack" frame used throughout the site for couple
 * photography. Pass a real `src` once you have photos — until then it
 * renders a soft, on-brand placeholder instead of a broken image. Pass
 * `matted` to keep that placeholder visible as a mat around the photo.
 */
export default function PhotoFrame({ src, alt = '', tone = 'gold', label, matted = false, className = '' }) {
  return (
    <div className={`photo-stack photo-stack--${tone} ${className}`}>
      <div className="photo-stack__backing photo-stack__backing--1" />
      <div className="photo-stack__backing photo-stack__backing--2" />
      <div className="photo-stack__frame">
        {src && matted ? (
          <div className="photo-stack__placeholder photo-stack__placeholder--matted">
            <img src={src} alt={alt} loading="lazy" />
          </div>
        ) : src ? (
          <img src={src} alt={alt} loading="lazy" />
        ) : (
          <div className="photo-stack__placeholder">
            <span className="script">{label ?? 'Photo coming soon'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
