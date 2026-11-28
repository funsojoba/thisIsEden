import './WeddingCalendar.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Month view with the wedding day highlighted. Reads the calendar date
 * straight from the ISO string ("2027-02-27T…") so the visitor's own
 * timezone can never shift it to a different day.
 */
export default function WeddingCalendar({ dateISO, caption }) {
  const [year, month, day] = dateISO.slice(0, 10).split('-').map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const monthName = first.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  const fullDate = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  // Leading blanks for the days before the 1st, then the month, padded to full weeks.
  const cells = [...Array(first.getUTCDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  return (
    <div className="wedding-calendar">
      <div className="wedding-calendar__rings" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="wedding-calendar__header" id="wedding-calendar-title">
        <span className="wedding-calendar__month">{monthName}</span>
        <span className="wedding-calendar__year">{year}</span>
      </div>

      <table className="wedding-calendar__sheet" aria-labelledby="wedding-calendar-title">
        <thead>
          <tr>
            {WEEKDAYS.map((name) => (
              <th key={name} scope="col" abbr={name}>
                {name[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={w}>
              {week.map((date, d) =>
                date === day ? (
                  <td key={d} className="wedding-calendar__day is-wedding" aria-current="date" aria-label={`${fullDate} — our wedding day`}>
                    <span>{date}</span>
                  </td>
                ) : (
                  <td key={d} className="wedding-calendar__day">
                    {date}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {caption && <p className="wedding-calendar__caption">{caption}</p>}
    </div>
  );
}
