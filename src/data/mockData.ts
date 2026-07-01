import type { Memory, WrappedStats } from '../types';

// Fotoğraf yerine kullanılan gradyan paleti (gerçek kamera entegrasyonu sonrası kaldırılacak)
const GRADIENTS = [
  'linear-gradient(150deg, #3a2e28, #1a1410)',
  'linear-gradient(150deg, #2e3a38, #101614)',
  'linear-gradient(150deg, #3a2e3a, #14101a)',
  'linear-gradient(150deg, #2e2e3a, #10101a)',
  'linear-gradient(150deg, #3a3228, #1a1610)',
];

function gradientFor(seed: number): string {
  return GRADIENTS[seed % GRADIENTS.length];
}

const LOCATIONS = [
  'Kadıköy', 'Karaköy', 'Beşiktaş', 'Moda', 'Cihangir',
  'Bebek', 'Üsküdar', 'Balat', 'Nişantaşı', 'Arnavutköy',
  'Şişli', 'Beyoğlu', 'Ortaköy',
];

const NOTES = [
  'Today felt lighter.',
  'The sea was loud tonight.',
  'I almost forgot to look up.',
  'Quiet morning, full heart.',
  'Nothing happened, and that was enough.',
  'The light was good today.',
  'I missed this feeling.',
  'Slow coffee, slower thoughts.',
];

const EMOTIONS: Memory['emotion'][] = ['😊', '😌', '😐', '😔', '❤️'];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateMockMemories(count: number, year: number): Memory[] {
  const memories: Memory[] = [];
  const startOfYear = new Date(year, 0, 1).getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  const usedDays = new Set<number>();

  for (let i = 0; i < count; i++) {
    let dayOffset: number;
    do {
      dayOffset = Math.floor(seededRandom(i * 7.13 + 1) * 364);
    } while (usedDays.has(dayOffset));
    usedDays.add(dayOffset);

    const hasNote = seededRandom(i * 3.1) > 0.35;
    const hasEmotion = seededRandom(i * 5.7) > 0.25;
    const hasLocation = seededRandom(i * 2.3) > 0.3;

    memories.push({
      id: `mem-${year}-${i}`,
      photoGradient: gradientFor(i),
      note: hasNote ? NOTES[Math.floor(seededRandom(i * 9.1) * NOTES.length)] : undefined,
      emotion: hasEmotion ? EMOTIONS[Math.floor(seededRandom(i * 4.4) * EMOTIONS.length)] : undefined,
      location: hasLocation ? LOCATIONS[Math.floor(seededRandom(i * 6.6) * LOCATIONS.length)] : undefined,
      locationOptIn: hasLocation,
      capturedAt: new Date(startOfYear + dayOffset * dayMs).toISOString(),
      status: 'sealed',
    });
  }

  return memories.sort((a, b) => new Date(a.capturedAt).getTime() - new Date(b.capturedAt).getTime());
}

export function computeWrappedStats(memories: Memory[]): WrappedStats {
  const places = new Set(memories.filter(m => m.location).map(m => m.location));
  const emotionCounts: Record<string, number> = {};
  memories.forEach(m => {
    if (m.emotion) emotionCounts[m.emotion] = (emotionCounts[m.emotion] || 0) + 1;
  });
  const topEmotion = (Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '😌') as WrappedStats['topEmotion'];

  const monthCounts: Record<string, number> = {};
  memories.forEach(m => {
    const month = new Date(m.capturedAt).toLocaleString('en-US', { month: 'long' });
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });
  const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'August';

  return {
    photoCount: memories.length,
    placeCount: places.size,
    longestStreak: 28,
    topEmotion,
    mostActiveMonth,
    mostActiveTimeOfDay: 'after sunset',
  };
}
