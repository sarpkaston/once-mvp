import { OnceLogo } from '../components/OnceLogo';
import { useStore } from '../store/AppStore';
import type { Screen } from '../types';

const TOTAL_DAYS = 365;

export function HomeScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  const { state, dispatch } = useStore();
  const sealedCount = state.sealedMemories.filter(m => m.status === 'sealed').length;
  const daysRemaining = TOTAL_DAYS - sealedCount - 90; // demo amaçlı sabit ofset

  if (state.homeState === 'notified') {
    return <NotifiedState onCapture={() => navigate('capture-camera')} />;
  }

  if (state.homeState === 'missed') {
    return <MissedState onDismiss={() => dispatch({ type: 'RESET_TO_HOME' })} />;
  }

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 32px',
    }}>
      <div style={{ marginBottom: 36 }}>
        <OnceLogo size={30} opacity={0.7} />
      </div>

      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 36,
        letterSpacing: 3, color: 'var(--once-text)', marginBottom: 36,
      }}>
        {state.currentYear}
      </div>

      <div style={{ fontSize: 14, color: 'var(--once-text)', marginBottom: 6 }}>
        {sealedCount} memories sealed
      </div>
      <div style={{ fontSize: 13, color: 'var(--once-text-muted)', marginBottom: 36 }}>
        {Math.max(daysRemaining, 0)} days remaining
      </div>

      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
        fontSize: 14, color: 'var(--once-text-dim)',
      }}>
        Today is still waiting.
      </div>

      {/* Yalnızca geliştirme modunda görünür — gerçek üründe bu kontroller yoktur,
         bildirim durumu sunucu tarafından, tarih değişimi cihaz saatinden tetiklenir. */}
      {import.meta.env.DEV && (
        <div style={{ position: 'absolute', bottom: 28, display: 'flex', gap: 10 }}>
          <DemoButton label="Simulate notification" onClick={() => dispatch({ type: 'RECEIVE_NOTIFICATION' })} />
          <DemoButton label="Simulate missed day" onClick={() => dispatch({ type: 'MISS_DAY' })} />
          <DemoButton label="Dec 31" onClick={() => navigate('ritual-opening')} />
        </div>
      )}
    </div>
  );
}

function NotifiedState({ onCapture }: { onCapture: () => void }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#000', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 36px',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 18,
        color: 'var(--once-accent)', letterSpacing: 0.3, marginBottom: 36, textAlign: 'center',
      }}>
        ✨ Your moment is here.
      </div>
      <button onClick={onCapture} style={captureButtonStyle} aria-label="Capture today">
        <div style={captureButtonInnerStyle} />
      </button>
      <div style={{ marginTop: 28, fontSize: 14, color: 'var(--once-text)' }}>Capture today.</div>
      <div style={{ fontSize: 12, color: 'var(--once-text-muted)', marginTop: 4 }}>
        You have until midnight.
      </div>
    </div>
  );
}

function MissedState({ onDismiss }: { onDismiss: () => void }) {
  return (
    <button
      onClick={onDismiss}
      style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 36px', textAlign: 'center',
        background: 'none', border: 'none',
      }}
      aria-label="Return to home"
    >
      <div style={{ fontSize: 12, color: 'var(--once-text-muted)', letterSpacing: 1, marginBottom: 24 }}>
        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()}
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300,
        fontSize: 18, color: 'var(--once-text)', marginBottom: 14,
      }}>
        A quiet day.
      </div>
      <div style={{ fontSize: 13, color: 'var(--once-text-dim)', lineHeight: 1.6 }}>
        Not every memory<br />needs a photograph.
      </div>
    </button>
  );
}

function DemoButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 9, padding: '6px 10px', background: 'var(--once-surface)',
        border: '0.5px solid var(--once-line)', borderRadius: 6, color: 'var(--once-text-muted)',
      }}
    >
      {label}
    </button>
  );
}

const captureButtonStyle = {
  width: 88, height: 88, borderRadius: '50%', border: '2px solid #F4F1EA',
  display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent',
};

const captureButtonInnerStyle = {
  width: 72, height: 72, borderRadius: '50%', background: '#F4F1EA',
};
