import React, { createContext, useContext, useReducer, useEffect } from 'react';

export type Role = 'teacher' | 'student' | null;

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  class?: string;
  subject?: string;
}

export interface AppState {
  currentRole: Role;
  isOnline: boolean;
  user: User | null;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  language: 'en' | 'hi';
  notifications: Notification[];
  isLoading: boolean;
}

export interface Notification {
  id: string;
  type: 'homework' | 'competition' | 'marks' | 'announcement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

type AppAction = 
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_SYNC_STATUS'; payload: AppState['syncStatus'] }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'hi' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  currentRole: null,
  isOnline: navigator.onLine,
  user: null,
  syncStatus: 'idle',
  language: 'en',
  notifications: [],
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, currentRole: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload };
    case 'SET_SYNC_STATUS':
      return { ...state, syncStatus: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [action.payload, ...state.notifications]
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGOUT':
      return { ...initialState, isOnline: state.isOnline };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto sync when coming online
  useEffect(() => {
    if (state.isOnline && state.syncStatus === 'idle') {
      dispatch({ type: 'SET_SYNC_STATUS', payload: 'syncing' });
      setTimeout(() => {
        dispatch({ type: 'SET_SYNC_STATUS', payload: 'synced' });
      }, 2000);
    }
  }, [state.isOnline]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};