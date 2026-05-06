/**
 * Hook para lógica de autenticación.
 * Usa authService para llamadas a la API, useAuthStore para estado global,
 * y expo-secure-store para persistir tokens.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { authService } from '@/services/auth-service';
import { useAuthStore } from '@/stores/auth-store';
import type {
  LoginPayload,
  RegisterPayload,
  GoogleAuthPayload,
  LoginResponse,
  User,
} from '@/types/user-types';

const SECURE_STORE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

/**
 * Persiste tokens en almacenamiento seguro
 */
async function persistTokens(accessToken: string, refreshToken: string): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken),
    SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken),
  ]);
}

/**
 * Recupera tokens del almacenamiento seguro
 */
async function retrieveTokens(): Promise<{ accessToken: string; refreshToken: string } | null> {
  const accessToken = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
  const refreshToken = await SecureStore.getItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

/**
 * Limpia tokens del almacenamiento seguro
 */
async function clearTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN),
    SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN),
  ]);
}

export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  me: () => [...AUTH_QUERY_KEYS.all, 'me'] as const,
};

/**
 * Hook para login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async (response: LoginResponse) => {
      // Guardar tokens localmente
      await persistTokens(response.tokens.accessToken, response.tokens.refreshToken);

      // Actualizar store global
      setTokens(response.tokens);
      setUser(response.user);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), response.user);
    },
  });
};

/**
 * Hook para registro
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: async (response: LoginResponse) => {
      // Guardar tokens localmente
      await persistTokens(response.tokens.accessToken, response.tokens.refreshToken);

      // Actualizar store global
      setTokens(response.tokens);
      setUser(response.user);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), response.user);
    },
  });
};

/**
 * Hook para login con Google
 */
export const useGoogleAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (payload: GoogleAuthPayload) => authService.loginWithGoogle(payload),
    onSuccess: async (response: LoginResponse) => {
      // Guardar tokens localmente
      await persistTokens(response.tokens.accessToken, response.tokens.refreshToken);

      // Actualizar store global
      setTokens(response.tokens);
      setUser(response.user);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), response.user);
    },
  });
};

/**
 * Hook para obtener el perfil actual
 */
export const useGetProfile = () => {
  return useMutation({
    mutationFn: async () => {
      const profile = await authService.getProfile();
      return profile;
    },
    onSuccess: (profile: User) => {
      const { setUser } = useAuthStore.getState();
      setUser(profile);
    },
  });
};

/**
 * Hook para logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      // Limpiar tokens
      await clearTokens();

      // Limpiar store global
      logout();

      // Limpiar caché
      queryClient.clear();
    },
  });
};

/**
 * Hook para recuperar sesión existente
 * Se ejecuta al iniciar la app para verificar si hay una sesión guardada
 */
export async function restoreAuthSession(): Promise<boolean> {
  try {
    const tokens = await retrieveTokens();

    if (!tokens) {
      return false;
    }

    // Verificar que los tokens sean válidos llamando a /auth/me
    const profile = await authService.getProfile();

    // Actualizar store global
    const { setTokens, setUser } = useAuthStore.getState();
    setTokens(tokens);
    setUser(profile);

    return true;
  } catch (error) {
    // Si hay error, limpiar tokens
    await clearTokens();
    const { logout } = useAuthStore.getState();
    logout();
    return false;
  }
}