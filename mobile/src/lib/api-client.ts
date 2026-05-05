/**
 * Cliente HTTP configurado con axios.
 */

import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import Constants from 'expo-constants';

const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT automáticamente
apiClient.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// Interceptor para manejar 401 y refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: Lógica de refresh token aquí
    return Promise.reject(error);
  },
);