// Bkz. strateji dokümanı Bölüm 5.4.1 — bildirimler tek sabit mesaj kullanmaz,
// kullanıcı aynı cümleyi art arda görmemelidir.

export const NOTIFICATION_POOL = [
  '✨ Today only happens once.',
  '📸 Your moment is here.',
  "🌙 Don't let today disappear.",
  '☀️ Pause for a second.',
  "🕰️ One day, you'll come back to this.",
  '🌧️ Capture this ordinary day.',
  '🌙 The world is quiet tonight.',
  '📷 Leave something for your future self.',
  "✨ A year from now, you'll thank yourself.",
  '🌅 Save a piece of today.',
  '🍂 Some moments deserve to wait.',
  '🌌 This night will only happen once.',
];

export const OPENING_RITUAL_POOL = [
  'These moments waited an entire year for you.',
  "You haven't seen these in 365 days.",
  'The year you lived is waiting.',
  'Tonight, your memories come home.',
  'Some moments deserve patience.',
];

export const TRANSITION_POOL = [
  "It's time to remember.",
  'Open your year.',
  'The person you were is waiting.',
  'Tonight, the year becomes a memory.',
  "Let's go back.",
];

let lastNotificationIndex = -1;
let lastOpeningIndex = -1;
let lastTransitionIndex = -1;

function pickFrom(pool: string[], lastIndex: number, setLast: (i: number) => void): string {
  let index: number;
  do {
    index = Math.floor(Math.random() * pool.length);
  } while (pool.length > 1 && index === lastIndex);
  setLast(index);
  return pool[index];
}

export function pickNotification(): string {
  return pickFrom(NOTIFICATION_POOL, lastNotificationIndex, (i) => (lastNotificationIndex = i));
}

export function pickOpeningLine(): string {
  return pickFrom(OPENING_RITUAL_POOL, lastOpeningIndex, (i) => (lastOpeningIndex = i));
}

export function pickTransitionLine(): string {
  return pickFrom(TRANSITION_POOL, lastTransitionIndex, (i) => (lastTransitionIndex = i));
}
