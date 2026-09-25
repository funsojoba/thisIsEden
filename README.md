# This Is Eden — Wedding Website

A React + Vite wedding site built from the Figma sketch, with a parallax
hero and a full set of content sections.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## Editing content

Everything text/date/venue-related lives in one file:
**[src/data/content.js](src/data/content.js)**. Change names, the wedding
date (drives the live countdown), venue, bios, story milestones, and the
scripture/quote there — no need to touch component code.

## Adding real photos

Right now most sections use soft gradient placeholders (`PhotoFrame`
component and the "Our Story" gallery grid) since only the hero photo
came from the Figma file. To swap in real photos:

1. Drop image files into `public/images/`.
2. Reference them with a path like `/images/your-photo.jpg`:
   - Hero background: `hero.image` in `content.js`.
   - Bride/groom photos: pass `src` into the `<AboutRow>` placeholders in
     `src/components/AboutCouple.jsx` (swap the `.about-row__placeholder`
     div for an `<img>`, same pattern as `Hero.jsx`).
   - Countdown & "Message from the couple" photos: pass a `src` prop to
     `<PhotoFrame />` in `Countdown.jsx` / `RsvpSection.jsx`.
   - "Our Story" gallery: replace the 6 gradient cells in `OurStory.jsx`
     with `<img>` tags.

## Structure

- `Hero` — full-bleed parallax hero, "This is Eden" (keeps the couple
  photo from the Figma sketch).
- `Countdown` — live countdown + ceremony details, dark forest-green.
- `AboutCouple` — About the Bride / About the Groom, full-bleed split
  panels.
- `RsvpSection` — message from the couple + RSVP / gift CTAs.
- `OurStory` — timeline of milestones + photo gallery grid.
- `Verse` — full-bleed scripture/quote section with a second, subtler
  parallax layer (reuses the hero photo in a duotone treatment).
- `Footer` — nav, monogram, date, venue, gift CTA.

## Design system

Tokens (colour, type, spacing) live in `src/index.css` as CSS custom
properties — burgundy + forest green + gold on warm cream, `Playfair
Display` for display type, `Alex Brush` for script accents, `Cormorant
Garamond` for long-form copy, `Montserrat` for nav/labels/buttons.

## Parallax

`src/hooks/useParallax.js` moves the hero (and verse) background image
at a fraction of scroll speed via `transform: translate3d`, rAF-throttled.
It's a plain hook with no dependencies, and automatically disables itself
when the visitor has `prefers-reduced-motion` set.

The RSVP and gift buttons currently point at in-page anchors — wire them
up to your real RSVP form / gift registry links when you have them.
