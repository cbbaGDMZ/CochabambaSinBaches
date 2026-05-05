/**
 * Zustand store para autenticación y estado global del usuario.
 */

import { create } from 'zustand';
import type { User, AuthTokens } from '@/types/user-types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

const INITIAL_STATE: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...INITIAL_STATE,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setTokens: (tokens) => set({ tokens }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set(INITIAL_STATE),
}));