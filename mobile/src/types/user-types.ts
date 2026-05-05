/**
 * Tipos relacionados con usuarios y autenticación.
 */

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface GoogleAuthPayload {
  idToken: string;
}