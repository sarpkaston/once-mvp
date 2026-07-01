// Bkz. strateji dokümanı Bölüm 5.4 — ağırlıklı dağılım.
// 08:00–22:00 → %85, 22:00–02:00 → %10, 02:00–08:00 → %5
// Gerçek üründe bu mantık sunucu tarafında, kullanıcı ID + gün damgasıyla
// seed'lenmiş biçimde çalışır. Burada MVP/demo amaçlı istemci tarafında simüle edilir.

export function generateNotificationHour(): { hour: number; minute: number } {
  const roll = Math.random();
  let hour: number;

  if (roll < 0.85) {
    hour = 8 + Math.floor(Math.random() * 14); // 08:00–22:00
  } else if (roll < 0.95) {
    const offset = Math.floor(Math.random() * 4); // 22:00–02:00
    hour = (22 + offset) % 24;
  } else {
    hour = 2 + Math.floor(Math.random() * 6); // 02:00–08:00
  }

  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
}

export function formatHour({ hour, minute }: { hour: number; minute: number }): string {
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m}`;
}
