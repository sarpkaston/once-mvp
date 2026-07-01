import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StoreProvider, useStore } from './store/AppStore';
import { PhoneFrame } from './components/PhoneFrame';
import { ScreenTransition } from './components/ScreenTransition';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CaptureFlow } from './screens/CaptureFlow';
import { RitualFlow } from './screens/RitualFlow';
import { YearViewScreen } from './screens/YearViewScreen';
import type { Screen } from './types';
import './styles/tokens.css';

function AppShell() {
  const { state } = useStore();
  const [screen, setScreen] = useState<Screen>('onboarding');

  // Onboarding tamamlanınca ana ekrana geç — render sırasında değil,
  // commit sonrası net bir efekt olarak.
  useEffect(() => {
    if (state.onboarded && screen === 'onboarding') {
      setScreen('home');
    }
  }, [state.onboarded, screen]);

  function navigate(next: Screen) {
    setScreen(next);
  }

  if (!state.onboarded) {
    return (
      <PhoneFrame>
        <AnimatePresence mode="wait">
          <ScreenTransition key="onboarding">
            <OnboardingScreen />
          </ScreenTransition>
        </AnimatePresence>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        <ScreenTransition key={screen}>
          <Router screen={screen} navigate={navigate} />
        </ScreenTransition>
      </AnimatePresence>
    </PhoneFrame>
  );
}

function Router({ screen, navigate }: { screen: Screen; navigate: (s: Screen) => void }) {
  switch (screen) {
    case 'capture-camera':
      return <CaptureFlow onComplete={navigate} />;
    case 'ritual-opening':
      return <RitualFlow onComplete={navigate} />;
    case 'year-view':
      return <YearViewScreen navigate={navigate} />;
    case 'home':
    default:
      return <HomeScreen navigate={navigate} />;
  }
}

export default function App() {
  return (
    <div style={{
      width: '100%', minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#000',
    }}>
      <StoreProvider>
        <AppShell />
      </StoreProvider>
    </div>
  );
}
