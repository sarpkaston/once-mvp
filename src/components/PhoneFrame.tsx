import type { ReactNode, CSSProperties } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={frameStyle}>
      <div style={screenStyle}>{children}</div>
    </div>
  );
}

const frameStyle: CSSProperties = {
  width: 390,
  height: 844,
  borderRadius: 48,
  border: '10px solid #050505',
  background: '#000',
  boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
  overflow: 'hidden',
  position: 'relative',
};

const screenStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--once-bg)',
};
