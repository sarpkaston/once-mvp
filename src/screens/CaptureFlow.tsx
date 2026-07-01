import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/AppStore';
import { OnceLogo } from '../components/OnceLogo';
import type { Emotion, Screen } from '../types';

const DEMO_GRADIENTS = [
  'linear-gradient(150deg, #4a3a2e, #1f1916)',
  'linear-gradient(150deg, #2e3a38, #101614)',
  'linear-gradient(150deg, #3a2e3a, #14101a)',
];

const EMOTIONS: Emotion[] = ['😊', '😌', '😐', '😔', '❤️'];
const DEMO_LOCATION = 'Kadıköy';

type CaptureStep = 'camera' | 'preview' | 'details' | 'sealing' | 'undo' | 'closing';

export function CaptureFlow({ onComplete }: { onComplete: (screen: Screen) => void }) {
  const { state, dispatch } = useStore();
  const [step, setStep] = useState<CaptureStep>('camera');

  function handleShutter() {
    const gradient = DEMO_GRADIENTS[Math.floor(Math.random() * DEMO_GRADIENTS.length)];
    dispatch({ type: 'CAPTURE_PHOTO', gradient });
    setStep('preview');
  }

  function handleClose() {
    dispatch({ type: 'RESET_TO_HOME' });
    onComplete('home');
  }

  function handleRetake() {
    dispatch({ type: 'RETAKE_PHOTO' });
  }

  function handleContinue() {
    setStep('details');
  }

  function handleSeal() {
    dispatch({ type: 'SEAL_MEMORY' });
    setStep('sealing');
    setTimeout(() => setStep('undo'), 1400);
  }

  function handleUndo() {
    dispatch({ type: 'UNDO_SEAL' });
    setStep('preview');
  }

  function handleUndoExpire() {
    dispatch({ type: 'FINALIZE_SEAL' });
    setStep('closing');
    setTimeout(() => onComplete('home'), 2200);
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      <AnimatePresence mode="wait">
        {step === 'camera' && <CameraStep key="camera" onShutter={handleShutter} onClose={handleClose} />}
        {step === 'preview' && (
          <PreviewStep
            key="preview"
            gradient={state.pendingPhoto?.gradient ?? DEMO_GRADIENTS[0]}
            onRetake={handleRetake}
            onContinue={handleContinue}
          />
        )}
        {step === 'details' && <DetailsStep key="details" onSeal={handleSeal} />}
        {step === 'sealing' && <SealingStep key="sealing" />}
        {step === 'undo' && <UndoStep key="undo" onUndo={handleUndo} onExpire={handleUndoExpire} />}
        {step === 'closing' && <ClosingStep key="closing" />}
      </AnimatePresence>
    </div>
  );
}

function CameraStep({ onShutter, onClose }: { onShutter: () => void; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        flex: 1, background: 'linear-gradient(160deg, #2e2520, #0B0B0A)',
        position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 24,
      }}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 20, right: 20, background: 'none', border: 'none',
            color: 'rgba(244,241,234,0.4)', fontSize: 18,
          }}
        >
          ×
        </button>
        <div style={{
          fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 15,
          color: 'rgba(244,241,234,0.85)',
        }}>
          Capture today.
        </div>
      </div>
      <div style={{
        background: 'var(--once-bg)', padding: '26px 0 30px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <button onClick={onShutter} aria-label="Take photo" style={shutterOuterStyle}>
          <div style={shutterInnerStyle} />
        </button>
      </div>
    </motion.div>
  );
}

function PreviewStep({
  gradient, onRetake, onContinue,
}: { gradient: string; onRetake: () => void; onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, margin: '16px 16px 0', borderRadius: 10, background: gradient }} />
      <div style={{ display: 'flex', gap: 12, padding: '20px 16px 28px' }}>
        <button onClick={onRetake} style={ghostButtonStyle}>Retake</button>
        <button onClick={onContinue} style={filledButtonStyle}>Continue</button>
      </div>
    </motion.div>
  );
}

function DetailsStep({ onSeal }: { onSeal: () => void }) {
  const { state, dispatch } = useStore();
  const [note, setNote] = useState(state.draftNote);

  function handleNoteChange(value: string) {
    if (value.length > 140) return;
    setNote(value);
    dispatch({ type: 'SET_NOTE', note: value });
  }

  function toggleEmotion(emotion: Emotion) {
    dispatch({ type: 'SET_EMOTION', emotion: state.draftEmotion === emotion ? undefined : emotion });
  }

  function toggleLocation() {
    const next = !state.draftLocationOptIn;
    dispatch({ type: 'TOGGLE_LOCATION', optIn: next, location: next ? DEMO_LOCATION : undefined });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        width: '100%', height: '100%', background: 'var(--once-bg)',
        display: 'flex', flexDirection: 'column', padding: '28px 22px',
      }}
    >
      <div style={{
        textAlign: 'center', fontSize: 10, letterSpacing: 1.5,
        color: 'var(--once-text-dim)', marginBottom: 28,
      }}>
        OPTIONAL
      </div>

      <Field label="One sentence">
        <input
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Today felt..."
          style={{
            width: '100%', height: 38, border: '0.5px solid var(--once-line)',
            borderRadius: 8, padding: '0 12px', fontSize: 13, color: 'var(--once-text)',
          }}
        />
      </Field>

      <Field label="One feeling">
        <div style={{ display: 'flex', gap: 8 }}>
          {EMOTIONS.map(e => (
            <button
              key={e}
              onClick={() => toggleEmotion(e)}
              style={{
                width: 34, height: 34, borderRadius: '50%', fontSize: 16,
                border: state.draftEmotion === e ? '1.5px solid var(--once-accent)' : '0.5px solid var(--once-line)',
                background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: state.draftEmotion && state.draftEmotion !== e ? 0.4 : 1,
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </Field>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'auto',
      }}>
        <div style={{ fontSize: 12, color: 'var(--once-text-muted)' }}>
          Location <span style={{ color: 'var(--once-text-dim)' }}>· {DEMO_LOCATION}</span>
        </div>
        <Toggle on={state.draftLocationOptIn} onClick={toggleLocation} />
      </div>

      <button onClick={onSeal} style={{ ...ghostButtonStyle, width: '100%', marginTop: 24, letterSpacing: 1.5, fontSize: 12 }}>
        SEAL MEMORY
      </button>
    </motion.div>
  );
}

function SealingStep() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}
    >
      <motion.div
        initial={{ y: -40, opacity: 1, scale: 1 }}
        animate={{ y: 60, opacity: 0.3, scale: 0.6 }}
        transition={{ duration: 1.3, ease: 'easeIn' }}
        style={{ width: 90, height: 110, borderRadius: 8, background: 'linear-gradient(150deg, #3a2e28, #1a1410)' }}
      />
      <div style={{ position: 'absolute', bottom: 90 }}>
        <OnceLogo size={18} opacity={0.5} />
      </div>
    </motion.div>
  );
}

function UndoStep({ onUndo, onExpire }: { onUndo: () => void; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(30);
  const expiredRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire();
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 36px', textAlign: 'center',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 17,
        lineHeight: 1.6, color: 'var(--once-text)', marginBottom: 32,
      }}>
        This moment is now waiting for you.
      </div>
      <button
        onClick={onUndo}
        style={{
          background: 'none', border: 'none', fontSize: 12,
          color: 'var(--once-text-muted)', textDecoration: 'underline',
        }}
      >
        Undo ({remaining})
      </button>
    </motion.div>
  );
}

function ClosingStep() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '0 36px', textAlign: 'center',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 18, color: 'var(--once-text)',
      }}>
        See you on December 31.
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 11, color: 'var(--once-text-muted)', marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      style={{
        width: 38, height: 22, borderRadius: 11, position: 'relative',
        background: on ? 'var(--once-accent)' : 'var(--once-surface)',
        border: '0.5px solid var(--once-line)', transition: 'background 0.2s',
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%', background: '#F4F1EA',
        position: 'absolute', top: 2, left: on ? 19 : 2, transition: 'left 0.2s',
      }} />
    </button>
  );
}

const shutterOuterStyle = {
  width: 64, height: 64, borderRadius: '50%', border: '2px solid #F4F1EA',
  background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const shutterInnerStyle = {
  width: 52, height: 52, borderRadius: '50%', background: '#F4F1EA',
};

const ghostButtonStyle = {
  flex: 1, height: 44, background: 'transparent', border: '0.5px solid var(--once-line)',
  borderRadius: 22, color: 'var(--once-text-muted)', fontSize: 13,
};

const filledButtonStyle = {
  flex: 1, height: 44, background: '#F4F1EA', border: 'none',
  borderRadius: 22, color: '#0B0B0A', fontSize: 13, fontWeight: 500,
};
