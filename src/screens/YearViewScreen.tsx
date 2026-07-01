import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/AppStore';
import type { Memory, Screen } from '../types';

export function YearViewScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  const { state } = useStore();
  const [selected, setSelected] = useState<Memory | null>(null);

  const memories = state.archivedMemories;
  const memoryByDay = new Map<number, Memory>();
  memories.forEach((m) => {
    const date = new Date(m.capturedAt);
    const startOfYear = new Date(date.getFullYear(), 0, 1).getTime();
    const day = Math.floor((date.getTime() - startOfYear) / 86400000);
    memoryByDay.set(day, m);
  });

  const cells = Array.from({ length: 220 }, (_, i) => memoryByDay.get(i));
  const displayedYear = state.currentYear - 1;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '28px 22px' }}>
      <button onClick={() => navigate('home')} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--once-text-muted)', fontSize: 13, marginBottom: 18 }}>
        ← Home
      </button>

      <div style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 24, letterSpacing: 2, color: 'var(--once-text)', marginBottom: 4 }}>
        {displayedYear}
      </div>
      <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: 1.5, color: 'var(--once-text-dim)', marginBottom: 26 }}>
        YEAR VIEW
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3, flex: 1, alignContent: 'start', overflowY: 'auto' }}>
        {cells.map((memory, i) => (
          <button
            key={i}
            onClick={() => memory && setSelected(memory)}
            disabled={!memory}
            style={{
              aspectRatio: '1', borderRadius: 2, border: 'none',
              background: memory ? 'var(--once-accent)' : 'var(--once-surface)',
              opacity: memory ? 1 : 0.6,
              cursor: memory ? 'pointer' : 'default',
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '0.5px solid var(--once-line)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--once-text-muted)' }}>
        <div style={{ width: 6, height: 6, background: 'var(--once-accent)', borderRadius: 1 }} />
        Tap a filled day to revisit
      </div>

      <AnimatePresence>
        {selected && <MemoryDetailOverlay memory={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

function MemoryDetailOverlay({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  const date = new Date(memory.capturedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 8, background: memory.photoGradient, marginBottom: 20 }} />
        <div style={{ fontSize: 13, color: 'var(--once-text)', marginBottom: 8 }}>{date}</div>
        {memory.location && <div style={{ fontSize: 13, color: 'var(--once-text-muted)', marginBottom: 8 }}>{memory.location}</div>}
        {memory.emotion && <div style={{ fontSize: 16, marginBottom: 8 }}>{memory.emotion}</div>}
        {memory.note && (
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 15, color: 'var(--once-text)' }}>
            {memory.note}
          </div>
        )}
      </div>
    </motion.div>
  );
}
