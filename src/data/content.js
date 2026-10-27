// ---------------------------------------------------------------------------
// Single source of truth for all wedding copy & details.
// Edit the values below — every section on the site reads from this file.
// ---------------------------------------------------------------------------

export const couple = {
  brideFirstName: 'Tolulope',
  brideLastName: 'Oga',
  groomFirstName: 'Folorunso',
  groomLastName: 'Elujoba',
  monogram: 'T & F',
  siteName: 'Eden',
};

export const wedding = {
  // ISO string, used to drive the live countdown. Keep the timezone offset
  // accurate for your venue so the countdown lands on the right second.
  dateISO: '2027-02-05T13:00:00+01:00',
  dayLabel: 'Saturday',
  dateLabel: 'Feb 5th',
  yearLabel: '2027',
  ceremonyTime: '1:00 PM',
  venueName: 'Whitegold Gardens',
  venueCity: 'Ibadan, Nigeria',
};

export const nav = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Schedule', href: '#schedule' },
];

export const hero = {
  eyebrow: 'This is',
  title: 'Eden',
  subtitle: `${couple.groomFirstName} & ${couple.brideFirstName}`,
  dateLine: `${wedding.dateLabel}, ${wedding.yearLabel}`,
  image: '/images/hero-couple.jpg',
};

export const bride = {
  heading: 'About the Bride',
  name: couple.brideFirstName,
  bio: "Tolulope is a marketing and communications expert. She is known for her creativity, empathy, and dedication to making a positive impact in the world. In her free time, she enjoys exploring new cultures, trying out new recipes, and spending quality time with loved ones.",
  cta: { label: 'More about Tolulope', href: '#story' },
};

export const groom = {
  heading: 'About the Groom',
  name: couple.groomFirstName,
  bio: "Funso a tech bro, steady, funny when you least expect it, and fiercely loyal to the people he loves. He shows up quietly and consistently — the kind of good you only notice once you have it. Ask Tolulope, she will tell you.",
  cta: { label: 'More about Funso', href: '#story' },
};

export const message = {
  eyebrow: 'Message from the couple',
  body: "We're beyond excited to share our special day with you! We'll share additional details as they become available.",
  giftCta: { label: 'Send us a gift', href: '#gift' },
};

// Placeholder gift details — swap in the real account numbers whenever you
// have them (see GiftSection.jsx).
export const gift = {
  eyebrow: 'With love',
  heading: 'Send a Gift',
  intro:
    "Honestly, having you celebrate with us is gift enough. But if you'd like to bless us a little further, you can send a cash gift to either account below.",
  accounts: [
    {
      label: couple.groomFirstName,
      bankName: 'Vale Bank',
      accountName: `${couple.groomFirstName} ${couple.groomLastName}`,
      accountNumber: '1010000821',
    },
    {
      label: couple.brideFirstName,
      bankName: 'Access Bank',
      accountName: `${couple.brideFirstName} ${couple.brideLastName}`,
      accountNumber: '0987654321',
    },
  ],
};

export const story = {
  eyebrow: 'Our Story',
  heading: 'How it began',
  intro:
    "From a chance conversation to forever — a few of our favourite chapters so far.",
  milestones: [
    {
      year: '2024',
      title: 'We met',
      text: 'There\'s really no timeline to this, we met in church, what do you expect? We were paired together as ministry-buddies in media ministry, and the rest is history.',
    },
    {
      year: '2026',
      title: 'First date (unofficial)',
      text: 'That\'d be at Panarotiz pizza, where we had a long conversation about life, love, and everything in between.',
    },
    {
      year: '2026',
      title: 'He asked. She said yes.',
      text: 'We hung out at ICM, Ikeja, the conversation came up, and the rest is history, don\'t ask how nervous I was. We are now engaged to be married.',
    },
    {
      year: '2027',
      title: 'We say "I do"',
      text: 'And the story keeps going — this time, with you there to witness it.',
    },
  ],
};

export const verse = {
  text: 'One will chase a thousand, and two will chase ten thousand.',
  reference: 'Deuteronomy 32:30',
  image: '/images/hero-couple.jpg',
};

export const schedule = {
  eyebrow: 'Mark your calendar',
  heading: `${wedding.dayLabel}, ${wedding.dateLabel} ${wedding.yearLabel}`,
  detail: `Ceremony begins at ${wedding.ceremonyTime} · ${wedding.venueName}, ${wedding.venueCity}`,
};

export const footer = {
  addressLine1: wedding.venueName,
  addressLine2: wedding.venueCity,
  dateLine: `${wedding.dateLabel}, ${wedding.yearLabel}`,
  links: nav,
  giftCta: { label: 'Send a Gift', href: '#gift' },
};
