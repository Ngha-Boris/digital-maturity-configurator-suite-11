
export type Language = 'en' | 'es' | 'fr';

export interface LocalizedText {
  en: string;
  es: string;
  fr: string;
}

export interface StateItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  score: number;
}

export interface Dimension {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  currentStates: StateItem[];
  desiredStates: StateItem[];
}

export type GapLabel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Priority = 'URGENT' | 'IMPORTANT' | 'FOLLOW UP';

export interface Recommendation {
  id: string;
  dimensionId: string;
  gapLabel: GapLabel;
  priority: Priority;
  actions: LocalizedText[];
}

export interface GapThresholds {
  LOW: number;
  MEDIUM: number;
}

export interface GapSettings {
  thresholds: GapThresholds;
  descriptions: Record<GapLabel, LocalizedText>;
}

export interface Config {
  dimensions: Dimension[];
  recommendations: Recommendation[];
  gapSettings: GapSettings;
}

export type Action =
  | { type: 'SET_CONFIG'; payload: Config }
  | { type: 'ADD_DIMENSION'; payload: Dimension }
  | { type: 'UPDATE_DIMENSION'; payload: Dimension }
  | { type: 'DELETE_DIMENSION'; payload: string }
  | { type: 'ADD_STATE'; payload: { dimensionId: string; stateType: 'currentStates' | 'desiredStates'; state: StateItem } }
  | { type: 'UPDATE_STATE'; payload: { dimensionId: string; stateType: 'currentStates' | 'desiredStates'; state: StateItem } }
  | { type: 'DELETE_STATE'; payload: { dimensionId: string; stateType: 'currentStates' | 'desiredStates'; stateId: string } }
  | { type: 'ADD_RECOMMENDATION'; payload: Recommendation }
  | { type: 'UPDATE_RECOMMENDATION'; payload: Recommendation }
  | { type: 'DELETE_RECOMMENDATION'; payload: string };
