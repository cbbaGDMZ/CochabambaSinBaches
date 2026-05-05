/**
 * Servicio de autenticación y usuario.
 */

import { apiClient } from '@/lib/api-client';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from '@/types/user-types';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },

  updateProfile: async (payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.patch('/auth/me', payload);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};