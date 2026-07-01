import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Memory, HomeState, Emotion } from '../types';
import { generateMockMemories } from '../data/mockData';

interface AppState {
  onboarded: boolean;
  homeState: HomeState;
  currentYear: number;
  sealedMemories: Memory[]; // mevcut yılın mühürlü ama görüntülenemez anıları
  archivedMemories: Memory[]; // önceki, açılmış yılın kalıcı arşivi
  pendingPhoto: { gradient: string } | null; // çekim akışındaki taslak
  draftNote: string;
  draftEmotion: Emotion | undefined;
  draftLocationOptIn: boolean;
  draftLocation: string | undefined;
  ritualCompleted: boolean;
}

type Action =
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RECEIVE_NOTIFICATION' }
  | { type: 'MISS_DAY' }
  | { type: 'CAPTURE_PHOTO'; gradient: string }
  | { type: 'RETAKE_PHOTO' }
  | { type: 'SET_NOTE'; note: string }
  | { type: 'SET_EMOTION'; emotion: Emotion | undefined }
  | { type: 'TOGGLE_LOCATION'; optIn: boolean; location?: string }
  | { type: 'SEAL_MEMORY' }
  | { type: 'UNDO_SEAL' }
  | { type: 'FINALIZE_SEAL' }
  | { type: 'RESET_TO_HOME' }
  | { type: 'COMPLETE_RITUAL' };

const initialMemories = generateMockMemories(91, 2026);

const initialState: AppState = {
  onboarded: false,
  homeState: 'normal',
  currentYear: 2026,
  sealedMemories: initialMemories,
  archivedMemories: [],
  pendingPhoto: null,
  draftNote: '',
  draftEmotion: undefined,
  draftLocationOptIn: false,
  draftLocation: undefined,
  ritualCompleted: false,
};

const DEMO_GRADIENTS = [
  'linear-gradient(150deg, #4a3a2e, #1f1916)',
  'linear-gradient(150deg, #2e3a38, #101614)',
  'linear-gradient(150deg, #3a2e3a, #14101a)',
];

const clearDraft = {
  pendingPhoto: null,
  draftNote: '',
  draftEmotion: undefined,
  draftLocationOptIn: false,
  draftLocation: undefined,
  homeState: 'normal' as const,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboarded: true };

    case 'RECEIVE_NOTIFICATION':
      return { ...state, homeState: 'notified' };

    case 'MISS_DAY':
      return { ...state, homeState: 'missed' };

    case 'CAPTURE_PHOTO':
      return { ...state, pendingPhoto: { gradient: action.gradient } };

    case 'RETAKE_PHOTO': {
      const next = DEMO_GRADIENTS[Math.floor(Math.random() * DEMO_GRADIENTS.length)];
      return { ...state, pendingPhoto: { gradient: next } };
    }

    case 'SET_NOTE':
      return { ...state, draftNote: action.note };

    case 'SET_EMOTION':
      return { ...state, draftEmotion: action.emotion };

    case 'TOGGLE_LOCATION':
      return { ...state, draftLocationOptIn: action.optIn, draftLocation: action.location };

    case 'SEAL_MEMORY': {
      if (!state.pendingPhoto) return state;
      const newMemory: Memory = {
        id: `mem-${Date.now()}`,
        photoGradient: state.pendingPhoto.gradient,
        note: state.draftNote.trim() || undefined,
        emotion: state.draftEmotion,
        location: state.draftLocationOptIn ? state.draftLocation : undefined,
        locationOptIn: state.draftLocationOptIn,
        capturedAt: new Date().toISOString(),
        status: 'pending',
        pendingUntil: Date.now() + 30_000,
      };
      return {
        ...state,
        sealedMemories: [...state.sealedMemories, newMemory],
      };
    }

    case 'UNDO_SEAL': {
      // Son eklenen pending anıyı kaldırır, çekim akışına geri döner
      const last = state.sealedMemories[state.sealedMemories.length - 1];
      if (!last || last.status !== 'pending') return state;
      return {
        ...state,
        sealedMemories: state.sealedMemories.slice(0, -1),
      };
    }

    case 'FINALIZE_SEAL': {
      const updated = state.sealedMemories.map((m, i) =>
        i === state.sealedMemories.length - 1 ? { ...m, status: 'sealed' as const, pendingUntil: undefined } : m
      );
      return { ...state, sealedMemories: updated, ...clearDraft };
    }

    case 'RESET_TO_HOME':
      return { ...state, ...clearDraft };

    case 'COMPLETE_RITUAL':
      // sealed → open: kalıcı, geri dönüşsüz (bkz. strateji dokümanı 3.3.9, 5.2)
      return {
        ...state,
        archivedMemories: [...state.archivedMemories, ...state.sealedMemories],
        sealedMemories: [],
        ritualCompleted: true,
        currentYear: state.currentYear + 1,
      };

    default:
      return state;
  }
}

const StoreContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
