import { useState } from 'react';
import { OnceLogo } from '../components/OnceLogo';
import { useStore } from '../store/AppStore';

export function OnboardingScreen() {
  const { dispatch } = useStore();
  const [step, setStep] = useState<'welcome' | 'notifications'>('welcome');

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 40px', textAlign: 'center',
    }}>
      <OnceLogo size={28} opacity={0.85} />

      <div style={{ marginTop: 28, marginBottom: 64 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: 4, color: 'var(--once-text-muted)' }}>
          ONCE
        </div>
      </div>

      {step === 'welcome' && (
        <>
          <p style={{
            fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 19,
            lineHeight: 1.6, color: 'var(--once-text)', marginBottom: 56,
          }}>
            Today only happens once.
          </p>
          <button
            onClick={() => setStep('notifications')}
            style={appleButtonStyle}
          >
            <AppleMark />
            Sign in with Apple
          </button>
        </>
      )}

      {step === 'notifications' && (
        <>
          <p style={{
            fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 17,
            lineHeight: 1.7, color: 'var(--once-text)', marginBottom: 12,
          }}>
            We'll send you one quiet moment a day.
          </p>
          <p style={{
            fontSize: 13, color: 'var(--once-text-muted)', marginBottom: 56, lineHeight: 1.6,
          }}>
            A single notification, at a random time. That's how you'll know it's time to capture today.
          </p>
          <button
            onClick={() => dispatch({ type: 'COMPLETE_ONBOARDING' })}
            style={primaryButtonStyle}
          >
            Allow Notifications
          </button>
        </>
      )}
    </div>
  );
}

function AppleMark() {
  return (
    <svg width="15" height="18" viewBox="0 0 14 17" fill="none" style={{ marginRight: 8 }}>
      <path
        d="M11.5 0.5c-1.5-.1-2.8.85-3.5.85-.75 0-1.85-.8-3.05-.78C3.2.6 1.7 1.55 1 3.05c-1.45 2.5-.37 6.2 1.05 8.23.7 1 1.5 2.13 2.6 2.09 1.03-.04 1.43-.67 2.67-.67 1.23 0 1.6.67 2.67.65 1.1-.02 1.8-1 2.5-2.02.8-1.13 1.13-2.23 1.13-2.28-.02-.02-2.17-.85-2.2-3.32-.02-2.07 1.68-3.05 1.75-3.1-.95-1.43-2.45-1.6-2.97-1.63z"
        fill="#F4F1EA"
      />
    </svg>
  );
}

const appleButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 50,
  background: '#F4F1EA',
  border: 'none',
  borderRadius: 25,
  color: '#0B0B0A',
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0.3,
};

const primaryButtonStyle = {
  width: '100%',
  height: 50,
  background: 'transparent',
  border: '1px solid #F4F1EA',
  borderRadius: 25,
  color: '#F4F1EA',
  fontSize: 13,
  letterSpacing: 1.5,
};
