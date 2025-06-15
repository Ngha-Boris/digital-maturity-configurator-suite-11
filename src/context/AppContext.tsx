import React, { createContext, useReducer, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Config, Language, LocalizedText, Action, StateItem } from '@/types';
import { initialConfig } from '@/data/initialConfig';
import { translations } from '@/data/translations';

interface AppContextType {
  state: Config;
  dispatch: React.Dispatch<Action>;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: Config, action: Action): Config => {
  switch (action.type) {
    case 'SET_CONFIG':
      return action.payload;
    case 'ADD_DIMENSION':
      return { ...state, dimensions: [...state.dimensions, action.payload] };
    case 'UPDATE_DIMENSION':
      return {
        ...state,
        dimensions: state.dimensions.map(d => d.id === action.payload.id ? action.payload : d)
      };
    case 'DELETE_DIMENSION':
      return {
        ...state,
        dimensions: state.dimensions.filter(d => d.id !== action.payload)
      };
    case 'ADD_STATE': {
      const { dimensionId, stateType, state: newStateItem } = action.payload;
      return {
        ...state,
        dimensions: state.dimensions.map(d =>
          d.id === dimensionId
            ? { ...d, [stateType]: [...d[stateType], newStateItem] }
            : d
        ),
      };
    }
    case 'UPDATE_STATE': {
      const { dimensionId, stateType, state: updatedStateItem } = action.payload;
      return {
        ...state,
        dimensions: state.dimensions.map(d =>
          d.id === dimensionId
            ? { ...d, [stateType]: d[stateType].map(s => s.id === updatedStateItem.id ? updatedStateItem : s) }
            : d
        ),
      };
    }
    case 'DELETE_STATE': {
        const { dimensionId, stateType, stateId } = action.payload;
        return {
            ...state,
            dimensions: state.dimensions.map(d =>
                d.id === dimensionId
                    ? { ...d, [stateType]: d[stateType].filter(s => s.id !== stateId) }
                    : d
            ),
        };
    }
    case 'ADD_RECOMMENDATION':
      return { ...state, recommendations: [...state.recommendations, action.payload] };
    case 'UPDATE_RECOMMENDATION':
      return {
        ...state,
        recommendations: state.recommendations.map(r => r.id === action.payload.id ? action.payload : r)
      };
    case 'DELETE_RECOMMENDATION':
      return {
        ...state,
        recommendations: state.recommendations.filter(r => r.id !== action.payload)
      };
    case 'UPDATE_GAP_SETTINGS':
      return {
        ...state,
        gapSettings: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialConfig);
  const [language, setLanguage] = React.useState<Language>('en');

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('gapAnalysisConfig');
      if (storedState) {
        dispatch({ type: 'SET_CONFIG', payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Failed to parse config from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gapAnalysisConfig', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save config to localStorage", error);
    }
  }, [state]);

  const t = useCallback((key: keyof typeof translations): string => {
    return translations[key][language];
  }, [language]);

  return (
    <AppContext.Provider value={{ state, dispatch, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
