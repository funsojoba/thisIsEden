import { useEffect, useState } from 'react';

const DAY = 1000 * 60 * 60 * 24;
const HOUR = 1000 * 60 * 60;
const MINUTE = 1000 * 60;

function getTimeLeft(targetISO) {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / 1000),
    done: false,
  };
}

/** Live countdown to a target ISO date, ticking once per second. */
export default function useCountdown(targetISO) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetISO));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return timeLeft;
}
