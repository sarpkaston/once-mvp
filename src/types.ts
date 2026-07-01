export type Emotion = '😊' | '😌' | '😐' | '😔' | '😡' | '❤️';

export interface Memory {
  id: string;
  photoGradient: string;
  note?: string;
  emotion?: Emotion;
  location?: string;
  locationOptIn: boolean;
  capturedAt: string;
  status: 'pending' | 'sealed';
  pendingUntil?: number;
}

export type CapsuleStatus = 'open' | 'sealed';

export interface Capsule {
  year: number;
  status: CapsuleStatus;
  memories: Memory[];
}

export interface WrappedStats {
  photoCount: number;
  placeCount: number;
  longestStreak: number;
  topEmotion: Emotion;
  mostActiveMonth: string;
  mostActiveTimeOfDay: string;
}

export type HomeState = 'normal' | 'notified' | 'missed';

export type Screen =
  | 'onboarding'
  | 'home'
  | 'capture-camera'
  | 'capture-preview'
  | 'capture-details'
  | 'capture-undo'
  | 'capture-closing'
  | 'ritual-opening'
  | 'ritual-wrapped'
  | 'ritual-transition'
  | 'open-year'
  | 'ritual-final'
  | 'year-view'
  | 'memory-detail';
