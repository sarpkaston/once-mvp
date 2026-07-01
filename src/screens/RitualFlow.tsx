import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/AppStore';
import { OnceLogo } from '../components/OnceLogo';
import { computeWrappedStats } from '../data/mockData';
import { pickOpeningLine, pickTransitionLine } from '../data/notifications';
import type { Screen, Memory } from '../types';

type RitualStep = 'opening' | 'wrapped' | 'transition' | 'begin' | 'cinema' | 'final';

const NARRATIVE_CARDS = [
  'You returned to Kadıköy 17 times.',
  'The sea appeared in your life\nmore than any other place.',
  'Most of your quiet moments\nhappened after midnight.',
];

export function RitualFlow({ onComplete }: { onComplete: (screen: Screen) => void }) {
  const { state, dispatch } = useStore();
  const [step, setStep] = useState<RitualStep>('opening');
  const [cinemaIndex, setCinemaIndex] = useState(0);

  const stats = useMemo(() => computeWrappedStats(state.sealedMemories), [state.sealedMemories]);
  const openingLine = useMemo(() => pickOpeningLine(), []);
  const transitionLine = useMemo(() => pickTransitionLine(), []);

  const cinemaItems = useMemo(() => {
    const items: Array<{ type: 'memory'; index: number } | { type: 'narrative'; text: string }> = [];
    state.sealedMemories.forEach((_, i) => {
      items.push({ type: 'memory', index: i });
      if (i > 0 && i % 30 === 0) {
        const narrative = NARRATIVE_CARDS[(i / 30 - 1) % NARRATIVE_CARDS.length];
        items.push({ type: 'narrative', text: narrative });
      }
    });
    return items;
  }, [state.sealedMemories]);

  function handleFinishCinema() {
    setStep('final');
  }

  function handleViewYear() {
    dispatch({ type: 'COMPLETE_RITUAL' });
    onComplete('year-view');
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      <AnimatePresence mode="wait">
        {step === 'opening' && (
          <OpeningScene
            key="opening"
            line={openingLine}
            count={state.sealedMemories.length}
            onContinue={() => setStep('wrapped')}
          />
        )}
        {step === 'wrapped' && (
          <WrappedScene key="wrapped" stats={stats} onDone={() => setStep('transition')} />
        )}
        {step === 'transition' && (
          <TransitionScene
            key="transition"
            line={transitionLine}
            count={state.sealedMemories.length}
            onBegin={() => setStep('begin')}
          />
        )}
        {step === 'begin' && (
          <BeginScene
            key="begin"
            year={state.currentYear}
            count={state.sealedMemories.length}
            onBegin={() => setStep('cinema')}
          />
        )}
        {step === 'cinema' && (
          <CinemaScene
            key="cinema"
            items={cinemaItems}
            memories={state.sealedMemories}
            index={cinemaIndex}
            setIndex={setCinemaIndex}
            onFinish={handleFinishCinema}
          />
        )}
        {step === 'final' && (
          <FinalScene
            key="final"
            stats={stats}
            onViewYear={handleViewYear}
            onShare={handleViewYear}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Fade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 36px', textAlign: 'center',
        position: 'absolute', inset: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

function OpeningScene({ line, count, onContinue }: { line: string; count: number; onContinue: () => void }) {
  return (
    <Fade>
      <OnceLogo size={20} opacity={0.7} />
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 19,
        lineHeight: 1.6, color: 'var(--once-text)', margin: '32px 0 20px',
      }}>
        {line}
      </div>
      <div style={{ fontSize: 12, color: 'var(--once-text-dim)', marginBottom: 64 }}>
        {count} moments are ready.
      </div>
      <button onClick={onContinue} style={{ background: 'none', border: 'none', fontSize: 11, letterSpacing: 2, color: 'var(--once-text-muted)' }}>
        CONTINUE
      </button>
    </Fade>
  );
}

function WrappedScene({ stats, onDone }: { stats: ReturnType<typeof computeWrappedStats>; onDone: () => void }) {
  const cards = useMemo(() => ([
    { type: 'stat' as const, value: stats.photoCount, label: 'photos captured' },
    { type: 'stat' as const, value: stats.placeCount, label: 'places visited' },
    { type: 'stat' as const, value: stats.longestStreak, label: 'day streak' },
    { type: 'sentence' as const, text: `You felt ${stats.topEmotion} most often.` },
    { type: 'sentence' as const, text: `You captured more moments in ${stats.mostActiveMonth} than any other month.` },
    { type: 'sentence' as const, text: `Most of your memories happened ${stats.mostActiveTimeOfDay}.` },
    { type: 'map' as const, text: `You left pieces of yourself in ${stats.placeCount} places.` },
  ]), [stats]);

  const [index, setIndex] = useState(0);
  const card = cards[index];

  function next() {
    if (index < cards.length - 1) setIndex(index + 1);
    else onDone();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={next}
      style={{
        width: '100%', height: '100%', position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 32px', textAlign: 'center', cursor: 'pointer',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {card.type === 'stat' && (
            <>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 84, lineHeight: 1, color: 'var(--once-text)' }}>
                {card.value}
              </div>
              <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--once-text-muted)', marginTop: 14 }}>
                {card.label}
              </div>
            </>
          )}
          {card.type === 'sentence' && (
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 19, lineHeight: 1.6, color: 'var(--once-text)' }}>
              {card.text}
            </div>
          )}
          {card.type === 'map' && (
            <>
              <MiniMap />
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: 'var(--once-text)', marginTop: 8 }}>
                {card.text}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'absolute', bottom: 32, display: 'flex', gap: 6 }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            width: i === index ? 18 : 6, height: 2, borderRadius: 1,
            background: i === index ? 'var(--once-accent)' : 'var(--once-line)', transition: 'width 0.3s',
          }} />
        ))}
      </div>
    </motion.div>
  );
}

function MiniMap() {
  const points: Array<[number, number]> = [[65, 75], [95, 60], [120, 95], [80, 130], [110, 155], [60, 170], [135, 180], [85, 200]];
  return (
    <svg width="180" height="240" viewBox="0 0 200 280" style={{ marginBottom: 8 }}>
      <path
        d="M30,40 Q50,20 90,30 Q130,15 160,50 Q180,80 150,110 Q170,140 140,170 Q150,200 110,220 Q90,250 60,230 Q30,240 25,200 Q10,170 30,140 Q15,100 30,40Z"
        fill="none" stroke="var(--once-line)" strokeWidth="1"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="var(--once-accent)" opacity={0.5 + (i % 5) * 0.1} />
      ))}
    </svg>
  );
}

function TransitionScene({ line, count, onBegin }: { line: string; count: number; onBegin: () => void }) {
  return (
    <Fade>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 21, color: 'var(--once-text)', marginBottom: 24 }}>
        {line}
      </div>
      <div style={{ fontSize: 12, color: 'var(--once-text-dim)', lineHeight: 1.8, marginBottom: 56 }}>
        {count} moments.<br />365 days apart.
      </div>
      <button
        onClick={onBegin}
        style={{
          background: 'none', border: '0.5px solid var(--once-line)', borderRadius: 22,
          padding: '12px 36px', fontSize: 11, letterSpacing: 2, color: 'var(--once-text)',
        }}
      >
        BEGIN
      </button>
    </Fade>
  );
}

function BeginScene({ year, count, onBegin }: { year: number; count: number; onBegin: () => void }) {
  return (
    <Fade>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 24, color: 'var(--once-text)', marginBottom: 36 }}>
        Open Your Year
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 17, letterSpacing: 2, color: 'var(--once-accent)', marginBottom: 8 }}>
        {year}
      </div>
      <div style={{ fontSize: 13, color: 'var(--once-text-muted)', marginBottom: 56 }}>
        {count} sealed memories
      </div>
      <button onClick={onBegin} style={{ width: '100%', height: 50, background: 'transparent', border: '1px solid #F4F1EA', borderRadius: 25, color: '#F4F1EA', fontSize: 13, letterSpacing: 2 }}>
        BEGIN
      </button>
    </Fade>
  );
}

function CinemaScene({
  items, memories, index, setIndex, onFinish,
}: {
  items: Array<{ type: 'memory'; index: number } | { type: 'narrative'; text: string }>;
  memories: Memory[];
  index: number;
  setIndex: (i: number) => void;
  onFinish: () => void;
}) {
  const current = items[index];

  function next() {
    if (index < items.length - 1) setIndex(index + 1);
    else onFinish();
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  if (!current) {
    onFinish();
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
    >
      <div
        onClick={(e) => {
          const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
          const width = e.currentTarget.getBoundingClientRect().width;
          if (x > width / 2) next(); else prev();
        }}
        style={{ flex: 1, position: 'relative', cursor: 'pointer' }}
      >
        <AnimatePresence mode="wait">
          {current.type === 'memory' ? (
            <MemoryFrame key={index} memory={memories[current.index]} />
          ) : (
            <NarrativeFrame key={index} text={current.text} />
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={onFinish}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 20, background: 'none', border: 'none',
          color: 'rgba(244,241,234,0.4)', fontSize: 18,
        }}
      >
        ×
      </button>
    </motion.div>
  );
}

function MemoryFrame({ memory }: { memory: Memory }) {
  const date = new Date(memory.capturedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 22px 16px' }}>
        <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 6, background: memory.photoGradient }} />
      </div>
      <div style={{ padding: '0 32px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 13, color: 'var(--once-text)' }}>{date}</div>
        {memory.location && <div style={{ fontSize: 13, color: 'var(--once-text-muted)' }}>{memory.location}</div>}
        {memory.emotion && <div style={{ fontSize: 15 }}>{memory.emotion}</div>}
        {memory.note && (
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 15, color: 'var(--once-text)' }}>
            {memory.note}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function NarrativeFrame({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '0 36px', textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--once-text)', whiteSpace: 'pre-line' }}>
        {text}
      </div>
    </motion.div>
  );
}

function FinalScene({
  stats, onViewYear, onShare,
}: { stats: ReturnType<typeof computeWrappedStats>; onViewYear: () => void; onShare: () => void }) {
  return (
    <Fade>
      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 22, color: 'var(--once-text)', marginBottom: 48 }}>
        This was your 2026.
      </div>
      <button onClick={onViewYear} style={{ width: '100%', height: 48, background: '#F4F1EA', border: 'none', borderRadius: 24, color: '#0B0B0A', fontSize: 13, letterSpacing: 1.5, fontWeight: 500, marginBottom: 12 }}>
        VIEW YEAR
      </button>
      <button onClick={onShare} style={{ width: '100%', height: 48, background: 'transparent', border: '0.5px solid var(--once-line)', borderRadius: 24, color: 'var(--once-text-muted)', fontSize: 13, letterSpacing: 1.5, marginBottom: 48 }}>
        SHARE WRAPPED
      </button>
      <div style={{ fontSize: 11, color: 'var(--once-text-dim)', lineHeight: 1.8 }}>
        {stats.photoCount} moments.<br />{stats.placeCount} places.<br />One year.
      </div>
    </Fade>
  );
}
