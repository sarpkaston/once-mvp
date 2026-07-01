import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

export function ScreenTransition({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, ...style }}
    >
      {children}
    </motion.div>
  );
}
