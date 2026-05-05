/**
 * Hook para lógica de autenticación.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth-service';
import { useAuthStore } from '@/stores/auth-store';
import type {
  LoginPayload,
  RegisterPayload,
  User,
} from '@/types/user-types';

export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  me: () => [...AUTH_QUERY_KEYS.all, 'me'] as const,
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.tokens);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.tokens);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), data.user);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.me(),
    queryFn: () => authService.getMe(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (payload: Partial<User>) =>
      authService.updateProfile(payload),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me(), user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};