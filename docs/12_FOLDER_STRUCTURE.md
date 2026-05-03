# 12 — Folder Structure: Cochabamba Sin Baches

> **Documento ejecutable.** Crea toda la estructura de carpetas y archivos placeholder del proyecto móvil. Se ejecuta DESPUÉS de `11_PROJECT_INITIALIZATION.md`. Al finalizar, el proyecto tendrá la arquitectura completa lista para que las pantallas y componentes se implementen dentro de ella.

---

## Requisitos previos

- `11_PROJECT_INITIALIZATION.md` completado exitosamente.
- Terminal abierta en `mobile/`.
- El proyecto inicia correctamente con `npx expo start`.

---

## Paso 1: Crear toda la estructura de carpetas

Ejecutar este comando desde `mobile/`:

```bash
mkdir -p app/\(auth\)
mkdir -p app/\(tabs\)
mkdir -p app/report
mkdir -p src/components/ui
mkdir -p src/components/report
mkdir -p src/components/map
mkdir -p src/components/auth
mkdir -p src/hooks
mkdir -p src/stores
mkdir -p src/services
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/config
mkdir -p assets/images
mkdir -p assets/animations
```

**Verificar** que la estructura existe:

```bash
find app src -type d | sort
```

**Resultado esperado:**
```
app
app/(auth)
app/(tabs)
app/report
src
src/components
src/components/auth
src/components/map
src/components/report
src/components/ui
src/config
src/hooks
src/lib
src/services
src/stores
src/types
```

---

## Paso 2: Crear archivos de tipos (src/types/)

### 2.1 src/types/common-types.ts

```typescript
/**
 * Tipos comunes compartidos en todo el proyecto.
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
```

### 2.2 src/types/user-types.ts

```typescript
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
```

### 2.3 src/types/report-types.ts

```typescript
/**
 * Tipos relacionados con reportes de baches.
 */

import type { Coordinates, Timestamps } from './common-types';

export const REPORT_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  REPAIRED: 'repaired',
} as const;

export type ReportStatus = typeof REPORT_STATUS[keyof typeof REPORT_STATUS];

export const DAMAGE_TYPE = {
  POTHOLE: 'pothole',
  SINKHOLE: 'sinkhole',
  CRACK: 'crack',
  NO_PAVEMENT: 'no_pavement',
} as const;

export type DamageType = typeof DAMAGE_TYPE[keyof typeof DAMAGE_TYPE];

export const DAMAGE_TYPE_LABELS: Record<DamageType, string> = {
  pothole: 'Bache',
  sinkhole: 'Hundimiento',
  crack: 'Grieta',
  no_pavement: 'Sin pavimento',
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  pending: 'Pendiente',
  in_review: 'En revisión',
  assigned: 'Asignado',
  in_progress: 'En progreso',
  repaired: 'Reparado',
};

export interface Report {
  id: string;
  userId: string;
  damageType: DamageType;
  description: string | null;
  coordinates: Coordinates;
  address: string | null;
  photos: string[];
  status: ReportStatus;
  ipbScore: number | null;
  statusHistory: StatusHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistoryEntry {
  status: ReportStatus;
  changedAt: string;
  changedBy: string | null;
}

export interface CreateReportPayload {
  damageType: DamageType;
  description?: string;
  latitude: number;
  longitude: number;
  photos: string[];
}

export interface OfflineReport {
  localId: string;
  damageType: DamageType;
  description: string | null;
  latitude: number;
  longitude: number;
  photoLocalPaths: string[];
  createdAt: string;
  synced: boolean;
}
```

### 2.4 src/types/api-types.ts

```typescript
/**
 * Tipos genéricos para respuestas de la API.
 */

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  detail?: string;
}
```

### 2.5 src/types/map-types.ts

```typescript
/**
 * Tipos relacionados con mapas y geolocalización.
 */

import type { Coordinates } from './common-types';

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker {
  id: string;
  coordinate: Coordinates;
  title: string;
  priority: 'high' | 'medium' | 'low';
  isOwn: boolean;
}

/**
 * Región por defecto: centro de Cercado, Cochabamba.
 */
export const DEFAULT_REGION: MapRegion = {
  latitude: -17.3895,
  longitude: -66.1568,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};
```

---

## Paso 3: Crear archivos de configuración (src/config/)

### 3.1 src/config/theme.ts

```typescript
/**
 * Tokens de diseño exportados para uso en código.
 * Para estilos en JSX, preferir clases de NativeWind.
 * Usar este archivo solo para valores que NativeWind no puede manejar
 * (sombras, estilos de mapa, valores dinámicos).
 */

export const COLORS = {
  background: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1E1E1E',
  surfaceHover: '#282828',
  borderDefault: '#2A2A2A',
  borderStrong: '#3A3A3A',

  textPrimary: '#F5F5F5',
  textSecondary: '#A0A0A0',
  textTertiary: '#666666',
  textDisabled: '#4A4A4A',
  textInverse: '#0A0A0A',

  accent: '#FF6B2C',
  accentHover: '#E55A1F',
  accentSubtle: 'rgba(255, 107, 44, 0.1)',
  accentText: '#FF8A5C',

  success: '#34C759',
  successSubtle: 'rgba(52, 199, 89, 0.1)',
  warning: '#FFD60A',
  warningSubtle: 'rgba(255, 214, 10, 0.1)',
  error: '#FF3B30',
  errorSubtle: 'rgba(255, 59, 48, 0.1)',
  info: '#5AC8FA',
  infoSubtle: 'rgba(90, 200, 250, 0.1)',
} as const;

export const SHADOWS = {
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
} as const;

export const REPORT_STATUS_COLORS: Record<string, string> = {
  pending: COLORS.info,
  in_review: COLORS.warning,
  assigned: COLORS.accentText,
  in_progress: COLORS.warning,
  repaired: COLORS.success,
};

export const IPB_PRIORITY_COLORS = {
  high: COLORS.error,
  medium: COLORS.warning,
  low: COLORS.info,
} as const;
```

### 3.2 src/config/query-client.ts

Este archivo ya fue creado en `11_PROJECT_INITIALIZATION.md`. Verificar que existe y tiene este contenido:

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

---

## Paso 4: Crear archivos de utilidades (src/lib/)

### 4.1 src/lib/api-client.ts

```typescript
/**
 * Cliente HTTP configurado con interceptores para JWT.
 * NUNCA importar axios directamente en componentes o hooks.
 * Siempre usar esta instancia.
 */

import axios from 'axios';
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

// TODO: Agregar interceptor de JWT cuando se implemente auth-store
// TODO: Agregar interceptor de refresh token
```

### 4.2 src/lib/offline-db.ts

```typescript
/**
 * Configuración de la base de datos SQLite para modo offline.
 * Almacena reportes pendientes de sincronización.
 */

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'cochabamba_sin_baches.db';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await initializeDatabase(db);
  }
  return db;
}

async function initializeDatabase(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS offline_reports (
      local_id TEXT PRIMARY KEY,
      damage_type TEXT NOT NULL,
      description TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      photo_local_paths TEXT NOT NULL,
      created_at TEXT NOT NULL,
      synced INTEGER DEFAULT 0
    );
  `);
}

// TODO: Implementar funciones CRUD para reportes offline
// - saveOfflineReport()
// - getUnsyncedReports()
// - markAsSynced()
// - deleteOfflineReport()
```

### 4.3 src/lib/format-date.ts

```typescript
/**
 * Utilidades de formateo de fechas.
 * Usa date-fns con locale español.
 */

import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha ISO a formato legible.
 * Ejemplo: "3 de mayo de 2026"
 */
export function formatFullDate(dateString: string): string {
  return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
}

/**
 * Formatea una fecha ISO a formato corto.
 * Ejemplo: "03/05/2026"
 */
export function formatShortDate(dateString: string): string {
  return format(new Date(dateString), 'dd/MM/yyyy');
}

/**
 * Formatea una fecha ISO a tiempo relativo.
 * Ejemplo: "hace 5 minutos", "hace 2 días"
 */
export function formatRelativeDate(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es });
}

/**
 * Formatea una fecha ISO a hora.
 * Ejemplo: "14:30"
 */
export function formatTime(dateString: string): string {
  return format(new Date(dateString), 'HH:mm');
}
```

### 4.4 src/lib/compress-image.ts

```typescript
/**
 * Utilidad para comprimir imágenes antes de subirlas al servidor.
 * Según 02_DESIGN_SYSTEM.md: JPEG, 70% calidad, max 1200px ancho.
 */

import * as ImageManipulator from 'expo-image-manipulator';

const MAX_WIDTH = 1200;
const COMPRESS_QUALITY = 0.7;

export async function compressImage(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: MAX_WIDTH } }],
    {
      compress: COMPRESS_QUALITY,
      format: ImageManipulator.SaveFormat.JPEG,
    },
  );

  return result.uri;
}
```

### 4.5 src/lib/constants.ts

```typescript
/**
 * Constantes globales de la aplicación.
 */

/** Número máximo de fotos por reporte (RF-09) */
export const MAX_PHOTOS_PER_REPORT = 3;

/** Número mínimo de fotos por reporte */
export const MIN_PHOTOS_PER_REPORT = 1;

/** Tiempo de expiración del access token en minutos */
export const ACCESS_TOKEN_EXPIRE_MINUTES = 15;

/** Tiempo de expiración del refresh token en días */
export const REFRESH_TOKEN_EXPIRE_DAYS = 30;

/** Región por defecto del mapa (Cercado, Cochabamba) */
export const DEFAULT_MAP_LATITUDE = -17.3895;
export const DEFAULT_MAP_LONGITUDE = -66.1568;

/** Radio en metros para buscar reportes cercanos */
export const NEARBY_REPORTS_RADIUS_METERS = 5000;

/** Duración de los toasts en milisegundos */
export const TOAST_DURATION_MS = 3000;

/** Calidad de compresión de imágenes (0-1) */
export const IMAGE_COMPRESS_QUALITY = 0.7;

/** Ancho máximo de imágenes en px */
export const IMAGE_MAX_WIDTH = 1200;
```

---

## Paso 5: Crear archivos de stores (src/stores/)

### 5.1 src/stores/auth-store.ts

```typescript
/**
 * Store de autenticación.
 * Gestiona el estado de sesión del usuario.
 */

import { create } from 'zustand';
import type { User, AuthTokens } from '@/types/user-types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardingComplete: boolean;
}

interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setLoading: (loading: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  logout: () => void;
}

const INITIAL_STATE: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  isOnboardingComplete: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...INITIAL_STATE,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setTokens: (tokens) => set({ tokens }),
  setLoading: (isLoading) => set({ isLoading }),
  setOnboardingComplete: (isOnboardingComplete) => set({ isOnboardingComplete }),
  logout: () => set({ ...INITIAL_STATE, isLoading: false }),
}));
```

### 5.2 src/stores/report-store.ts

```typescript
/**
 * Store de reportes.
 * Gestiona estado de UI relacionado con reportes (no datos de API, eso va en React Query).
 */

import { create } from 'zustand';
import type { DamageType } from '@/types/report-types';

interface ReportState {
  /** Fotos seleccionadas para el nuevo reporte (URIs locales) */
  selectedPhotos: string[];
  /** Tipo de daño seleccionado */
  selectedDamageType: DamageType | null;
  /** Descripción del reporte */
  description: string;
  /** Si el formulario de creación está en progreso */
  isCreating: boolean;
}

interface ReportActions {
  addPhoto: (uri: string) => void;
  removePhoto: (uri: string) => void;
  setDamageType: (type: DamageType) => void;
  setDescription: (text: string) => void;
  setCreating: (creating: boolean) => void;
  resetForm: () => void;
}

const INITIAL_STATE: ReportState = {
  selectedPhotos: [],
  selectedDamageType: null,
  description: '',
  isCreating: false,
};

export const useReportStore = create<ReportState & ReportActions>((set) => ({
  ...INITIAL_STATE,

  addPhoto: (uri) =>
    set((state) => ({ selectedPhotos: [...state.selectedPhotos, uri] })),
  removePhoto: (uri) =>
    set((state) => ({
      selectedPhotos: state.selectedPhotos.filter((p) => p !== uri),
    })),
  setDamageType: (selectedDamageType) => set({ selectedDamageType }),
  setDescription: (description) => set({ description }),
  setCreating: (isCreating) => set({ isCreating }),
  resetForm: () => set(INITIAL_STATE),
}));
```

### 5.3 src/stores/offline-store.ts

```typescript
/**
 * Store de estado offline.
 * Gestiona la conectividad y la cola de sincronización.
 */

import { create } from 'zustand';

interface OfflineState {
  isConnected: boolean;
  pendingReportsCount: number;
  isSyncing: boolean;
  lastSyncAt: string | null;
}

interface OfflineActions {
  setConnected: (connected: boolean) => void;
  setPendingCount: (count: number) => void;
  setSyncing: (syncing: boolean) => void;
  setLastSync: (date: string) => void;
}

const INITIAL_STATE: OfflineState = {
  isConnected: true,
  pendingReportsCount: 0,
  isSyncing: false,
  lastSyncAt: null,
};

export const useOfflineStore = create<OfflineState & OfflineActions>((set) => ({
  ...INITIAL_STATE,

  setConnected: (isConnected) => set({ isConnected }),
  setPendingCount: (pendingReportsCount) => set({ pendingReportsCount }),
  setSyncing: (isSyncing) => set({ isSyncing }),
  setLastSync: (lastSyncAt) => set({ lastSyncAt }),
}));
```

---

## Paso 6: Crear archivos de servicios (src/services/)

### 6.1 src/services/auth-service.ts

```typescript
/**
 * Servicio de autenticación.
 * Todas las llamadas a la API relacionadas con auth.
 */

import { apiClient } from '@/lib/api-client';
import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  GoogleAuthPayload,
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

  loginWithGoogle: async (payload: GoogleAuthPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/auth/google', payload);
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken });
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
```

### 6.2 src/services/report-service.ts

```typescript
/**
 * Servicio de reportes.
 * Todas las llamadas a la API relacionadas con reportes de baches.
 */

import { apiClient } from '@/lib/api-client';
import type { Report, CreateReportPayload } from '@/types/report-types';
import type { PaginatedResponse } from '@/types/api-types';

export const reportService = {
  getMyReports: async (page: number = 1, limit: number = 20): Promise<PaginatedResponse<Report>> => {
    const { data } = await apiClient.get('/reports/me', {
      params: { page, limit },
    });
    return data;
  },

  getReportById: async (id: string): Promise<Report> => {
    const { data } = await apiClient.get(`/reports/${id}`);
    return data;
  },

  getNearbyReports: async (
    latitude: number,
    longitude: number,
    radiusMeters: number = 5000,
  ): Promise<Report[]> => {
    const { data } = await apiClient.get('/reports/nearby', {
      params: { latitude, longitude, radius: radiusMeters },
    });
    return data;
  },

  createReport: async (payload: CreateReportPayload): Promise<Report> => {
    const { data } = await apiClient.post('/reports', payload);
    return data;
  },

  uploadPhoto: async (reportId: string, photoUri: string): Promise<string> => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: `report_${reportId}_${Date.now()}.jpg`,
    } as unknown as Blob);

    const { data } = await apiClient.post(`/reports/${reportId}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.url;
  },
};
```

---

## Paso 7: Crear archivos de hooks (src/hooks/)

### 7.1 src/hooks/use-auth.ts

```typescript
/**
 * Hook de autenticación.
 * Expone funciones de login, registro, logout y estado de sesión.
 */

// TODO: Implementar cuando se construya la pantalla de login
// Debe usar:
// - authService para llamadas a la API
// - useAuthStore para estado global
// - expo-secure-store para persistir tokens
// - expo-auth-session para Google OAuth
export {};
```

### 7.2 src/hooks/use-reports.ts

```typescript
/**
 * Hooks de reportes con React Query.
 * Centraliza query keys y hooks de datos.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '@/services/report-service';
import type { CreateReportPayload } from '@/types/report-types';

export const REPORT_KEYS = {
  all: ['reports'] as const,
  myReports: (page: number) => ['reports', 'mine', page] as const,
  detail: (id: string) => ['reports', 'detail', id] as const,
  nearby: (lat: number, lng: number) => ['reports', 'nearby', lat, lng] as const,
};

export const useMyReports = (page: number = 1) => {
  return useQuery({
    queryKey: REPORT_KEYS.myReports(page),
    queryFn: () => reportService.getMyReports(page),
  });
};

export const useReportDetail = (id: string) => {
  return useQuery({
    queryKey: REPORT_KEYS.detail(id),
    queryFn: () => reportService.getReportById(id),
    enabled: !!id,
  });
};

export const useNearbyReports = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: REPORT_KEYS.nearby(latitude, longitude),
    queryFn: () => reportService.getNearbyReports(latitude, longitude),
    enabled: !!latitude && !!longitude,
  });
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReportPayload) => reportService.createReport(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.all });
    },
  });
};
```

### 7.3 src/hooks/use-location.ts

```typescript
/**
 * Hook de geolocalización.
 * Solicita permisos y obtiene la ubicación actual del usuario.
 */

// TODO: Implementar cuando se construya la pantalla de crear reporte
// Debe usar:
// - expo-location para obtener coordenadas
// - Manejar permisos de ubicación
// - Retornar { coordinates, isLoading, error, refresh }
export {};
```

### 7.4 src/hooks/use-camera.ts

```typescript
/**
 * Hook de cámara y galería.
 * Maneja captura de fotos y selección desde galería.
 */

// TODO: Implementar cuando se construya la pantalla de crear reporte
// Debe usar:
// - expo-camera para captura
// - expo-image-picker para galería
// - compress-image para comprimir antes de subir
// - Manejar permisos de cámara
// - Retornar { takePhoto, pickFromGallery, isLoading }
export {};
```

### 7.5 src/hooks/use-connectivity.ts

```typescript
/**
 * Hook de conectividad.
 * Monitorea el estado de la conexión a internet.
 */

// TODO: Implementar cuando se construya el módulo offline
// Debe usar:
// - @react-native-community/netinfo para detectar cambios
// - useOfflineStore para actualizar estado global
// - Retornar { isConnected }
export {};
```

### 7.6 src/hooks/use-offline-sync.ts

```typescript
/**
 * Hook de sincronización offline.
 * Envía reportes pendientes cuando se recupera la conexión.
 */

// TODO: Implementar cuando se construya el módulo offline
// Debe usar:
// - offline-db para leer reportes pendientes
// - report-service para enviarlos
// - use-connectivity para detectar conexión
// - useOfflineStore para actualizar contadores
// - Retornar { pendingCount, isSyncing, syncNow }
export {};
```

---

## Paso 8: Crear archivos de componentes UI (src/components/ui/)

### 8.1 src/components/ui/button.tsx

```tsx
/**
 * Componentes de botón reutilizables.
 * Variantes: primary (naranja), secondary (borde), ghost (texto).
 * Ver 02_DESIGN_SYSTEM.md sección 8.1, 8.2, 8.3.
 */

// TODO: Implementar según especificaciones del design system
// Debe soportar:
// - variant: 'primary' | 'secondary' | 'ghost'
// - isLoading: boolean (muestra spinner)
// - disabled: boolean
// - icon: ReactNode (icono opcional a la izquierda)
// - fullWidth: boolean (default true)
// - onPress: () => void
// - Animación scale(0.98) al presionar con Reanimated
export {};
```

### 8.2 src/components/ui/input.tsx

```tsx
/**
 * Componente de input de texto reutilizable.
 * Ver 02_DESIGN_SYSTEM.md sección 8.4.
 */

// TODO: Implementar según especificaciones del design system
// Debe soportar:
// - label: string
// - placeholder: string
// - error: string (mensaje de error)
// - secureTextEntry: boolean (para contraseñas)
// - leftIcon: ReactNode
// - rightIcon: ReactNode
// - Integración con react-hook-form via Controller
// - Estados: normal, focused (borde naranja), error (borde rojo)
export {};
```

### 8.3 src/components/ui/card.tsx

```tsx
/**
 * Componente de card reutilizable.
 * Ver 02_DESIGN_SYSTEM.md sección 8.5.
 */

// TODO: Implementar según especificaciones del design system
// Debe soportar:
// - children: ReactNode
// - onPress: () => void (opcional, hace la card tappable)
// - Animación scale(0.99) al presionar si es tappable
export {};
```

### 8.4 src/components/ui/badge.tsx

```tsx
/**
 * Componente de badge de estado.
 * Ver 02_DESIGN_SYSTEM.md sección 8.6.
 */

// TODO: Implementar según especificaciones del design system
// Debe soportar:
// - variant: 'pending' | 'in_review' | 'assigned' | 'in_progress' | 'repaired'
// - Mapear automáticamente colores según REPORT_STATUS_COLORS
export {};
```

### 8.5 src/components/ui/loading-skeleton.tsx

```tsx
/**
 * Componente de loading skeleton con animación pulse.
 * Ver 02_DESIGN_SYSTEM.md sección 9.2.
 */

// TODO: Implementar con Reanimated
// - Animación pulse (1500ms, ease-in-out, loop)
// - Fondo surface-elevated (#1E1E1E) oscilando a surface-hover (#282828)
// - Props: width, height, borderRadius
export {};
```

### 8.6 src/components/ui/empty-state.tsx

```tsx
/**
 * Componente de estado vacío.
 * Ver 02_DESIGN_SYSTEM.md sección 8.11.
 */

// TODO: Implementar según especificaciones del design system
// Debe soportar:
// - icon: ReactNode (Lucide icon, 48px)
// - title: string
// - description: string
// - actionLabel: string (texto del botón, opcional)
// - onAction: () => void (callback del botón, opcional)
export {};
```

### 8.7 src/components/ui/error-state.tsx

```tsx
/**
 * Componente de estado de error con botón de reintentar.
 */

// TODO: Implementar
// - Ícono de error (AlertTriangle de Lucide)
// - Título: "Algo salió mal"
// - Mensaje personalizable
// - Botón secundario "Reintentar"
// - onRetry: () => void
export {};
```

### 8.8 src/components/ui/toast.tsx

```tsx
/**
 * Sistema de toast/snackbar.
 * Ver 02_DESIGN_SYSTEM.md sección 8.12.
 */

// TODO: Implementar con Reanimated
// - Variantes: success, error, warning, info
// - Animación slide up + fade in (300ms)
// - Auto-dismiss después de TOAST_DURATION_MS (3000ms)
// - Posición: bottom, encima del tab bar
export {};
```

---

## Paso 9: Crear archivos de componentes de dominio

### 9.1 src/components/report/report-card.tsx

```tsx
/**
 * Card de reporte para lista de mis reportes.
 * Muestra: foto thumbnail, tipo de daño, estado badge, fecha relativa.
 */

// TODO: Implementar cuando se construya la pantalla de mis reportes
export {};
```

### 9.2 src/components/report/report-status-badge.tsx

```tsx
/**
 * Badge de estado específico de reportes.
 * Wrapper sobre el componente Badge genérico con mapeo de ReportStatus.
 */

// TODO: Implementar cuando se construya la pantalla de mis reportes
export {};
```

### 9.3 src/components/report/report-map-marker.tsx

```tsx
/**
 * Marcador de reporte para el mapa.
 * Color según prioridad IPB: rojo (alta), amarillo (media), azul (baja).
 * Borde blanco si es reporte propio.
 */

// TODO: Implementar cuando se construya la pantalla del mapa
export {};
```

### 9.4 src/components/report/report-photo-picker.tsx

```tsx
/**
 * Selector de fotos para crear reporte.
 * Grid de fotos seleccionadas + botón para agregar más.
 * Máximo MAX_PHOTOS_PER_REPORT (3).
 */

// TODO: Implementar cuando se construya la pantalla de crear reporte
export {};
```

### 9.5 src/components/map/map-view-wrapper.tsx

```tsx
/**
 * Wrapper sobre react-native-maps con estilo oscuro y configuración por defecto.
 * Centra en Cochabamba por defecto.
 */

// TODO: Implementar cuando se construya la pantalla del mapa
export {};
```

### 9.6 src/components/map/current-location-marker.tsx

```tsx
/**
 * Marcador de ubicación actual del usuario.
 * Punto naranja con animación de pulso.
 */

// TODO: Implementar cuando se construya la pantalla del mapa
export {};
```

### 9.7 src/components/auth/login-form.tsx

```tsx
/**
 * Formulario de login (email + contraseña).
 * Usa react-hook-form + zod para validación.
 */

// TODO: Implementar cuando se construya la pantalla de login
export {};
```

### 9.8 src/components/auth/register-form.tsx

```tsx
/**
 * Formulario de registro (nombre + email + contraseña + confirmar contraseña).
 * Usa react-hook-form + zod para validación.
 */

// TODO: Implementar cuando se construya la pantalla de registro
export {};
```

### 9.9 src/components/auth/google-auth-button.tsx

```tsx
/**
 * Botón de autenticación con Google.
 * Usa expo-auth-session para el flujo OAuth2.
 */

// TODO: Implementar cuando se construya la pantalla de login
export {};
```

---

## Paso 10: Crear layouts de navegación

### 10.1 app/(auth)/_layout.tsx

```tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0A0A' },
        animation: 'slide_from_right',
      }}
    />
  );
}
```

### 10.2 app/(auth)/login.tsx

```tsx
import { View, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Login — Placeholder
      </Text>
    </View>
  );
}
```

### 10.3 app/(auth)/register.tsx

```tsx
import { View, Text } from 'react-native';

export default function RegisterScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Registro — Placeholder
      </Text>
    </View>
  );
}
```

### 10.4 app/(tabs)/_layout.tsx

```tsx
import { Tabs } from 'expo-router';
import { Home, FileText, PlusCircle, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#141414',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FF6B2C',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontFamily: 'Poppins_500Medium',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Mis reportes',
          tabBarIcon: ({ color, size }) => (
            <FileText size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-report"
        options={{
          title: 'Reportar',
          tabBarIcon: ({ color, size }) => (
            <PlusCircle size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} strokeWidth={1.5} />,
        }}
      />
    </Tabs>
  );
}
```

### 10.5 app/(tabs)/index.tsx

```tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Mapa — Placeholder
      </Text>
    </View>
  );
}
```

### 10.6 app/(tabs)/reports.tsx

```tsx
import { View, Text } from 'react-native';

export default function ReportsScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Mis reportes — Placeholder
      </Text>
    </View>
  );
}
```

### 10.7 app/(tabs)/create-report.tsx

```tsx
import { View, Text } from 'react-native';

export default function CreateReportScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Crear reporte — Placeholder
      </Text>
    </View>
  );
}
```

### 10.8 app/(tabs)/profile.tsx

```tsx
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Perfil — Placeholder
      </Text>
    </View>
  );
}
```

### 10.9 app/report/[id].tsx

```tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ReportDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-[20px] font-poppins-semibold">
        Detalle de reporte — Placeholder
      </Text>
      <Text className="text-text-secondary text-[14px] mt-2 font-poppins">
        ID: {id}
      </Text>
    </View>
  );
}
```

---

## Paso 11: Actualizar root layout para manejar auth vs tabs

Reemplazar TODO el contenido de `app/_layout.tsx` con:

```tsx
import '../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { queryClient } from '@/config/query-client';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A0A' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="report/[id]" />
      </Stack>
    </QueryClientProvider>
  );
}
```

### Actualizar app/index.tsx como redirector

Reemplazar TODO el contenido de `app/index.tsx` con:

```tsx
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';

export default function IndexScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
```

---

## Paso 12: Verificación final

### 12.1 Verificar estructura de carpetas

```bash
find app src -type f | sort
```

**Resultado esperado:** Debe listar todos los archivos creados en este documento (aprox. 40+ archivos).

### 12.2 Verificar que compila

```bash
npx tsc --noEmit
```

Puede haber warnings menores por los archivos con `export {}` pero no debe haber errores.

### 12.3 Verificar que Expo inicia

```bash
npx expo start -c
```

En Expo Go debe:
- Redirigir automáticamente a la pantalla de Login (placeholder).
- Si cambias `isAuthenticated` a `true` en el store, debe redirigir a las tabs.
- Las tabs deben mostrarse con los 4 iconos (Mapa, Mis reportes, Reportar, Perfil).
- Los iconos de las tabs deben ser Lucide icons.
- El tab activo debe estar en naranja (#FF6B2C).

**Presionar `Ctrl+C` para detener.**

---

## Paso 13: Commit y push

```bash
cd ..
git add mobile/
git commit -m "feat: create complete folder structure with types, stores, services, hooks, and placeholder screens"
git push
cd mobile
```

---

## Árbol final del proyecto

```
mobile/
├── app/
│   ├── _layout.tsx                      ← Root layout con providers
│   ├── index.tsx                        ← Redirector auth/tabs
│   ├── (auth)/
│   │   ├── _layout.tsx                  ← Stack layout para auth
│   │   ├── login.tsx                    ← Placeholder
│   │   └── register.tsx                 ← Placeholder
│   ├── (tabs)/
│   │   ├── _layout.tsx                  ← Tab layout con 4 tabs
│   │   ├── index.tsx                    ← Mapa placeholder
│   │   ├── reports.tsx                  ← Mis reportes placeholder
│   │   ├── create-report.tsx            ← Crear reporte placeholder
│   │   └── profile.tsx                  ← Perfil placeholder
│   └── report/
│       └── [id].tsx                     ← Detalle reporte placeholder
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx               ← TODO
│   │   │   ├── input.tsx                ← TODO
│   │   │   ├── card.tsx                 ← TODO
│   │   │   ├── badge.tsx                ← TODO
│   │   │   ├── loading-skeleton.tsx     ← TODO
│   │   │   ├── empty-state.tsx          ← TODO
│   │   │   ├── error-state.tsx          ← TODO
│   │   │   └── toast.tsx                ← TODO
│   │   ├── report/
│   │   │   ├── report-card.tsx          ← TODO
│   │   │   ├── report-status-badge.tsx  ← TODO
│   │   │   ├── report-map-marker.tsx    ← TODO
│   │   │   └── report-photo-picker.tsx  ← TODO
│   │   ├── map/
│   │   │   ├── map-view-wrapper.tsx     ← TODO
│   │   │   └── current-location-marker.tsx ← TODO
│   │   └── auth/
│   │       ├── login-form.tsx           ← TODO
│   │       ├── register-form.tsx        ← TODO
│   │       └── google-auth-button.tsx   ← TODO
│   ├── hooks/
│   │   ├── use-auth.ts                  ← TODO
│   │   ├── use-reports.ts               ← Implementado
│   │   ├── use-location.ts              ← TODO
│   │   ├── use-camera.ts               ← TODO
│   │   ├── use-connectivity.ts          ← TODO
│   │   └── use-offline-sync.ts          ← TODO
│   ├── stores/
│   │   ├── auth-store.ts               ← Implementado
│   │   ├── report-store.ts             ← Implementado
│   │   └── offline-store.ts            ← Implementado
│   ├── services/
│   │   ├── auth-service.ts             ← Implementado
│   │   └── report-service.ts           ← Implementado
│   ├── lib/
│   │   ├── api-client.ts              ← Implementado (sin interceptores)
│   │   ├── offline-db.ts              ← Implementado (esquema base)
│   │   ├── format-date.ts            ← Implementado
│   │   ├── compress-image.ts          ← Implementado
│   │   └── constants.ts              ← Implementado
│   ├── types/
│   │   ├── report-types.ts            ← Implementado
│   │   ├── user-types.ts             ← Implementado
│   │   ├── api-types.ts              ← Implementado
│   │   ├── map-types.ts              ← Implementado
│   │   └── common-types.ts           ← Implementado
│   └── config/
│       ├── theme.ts                   ← Implementado
│       └── query-client.ts           ← Implementado
├── assets/
│   ├── images/
│   └── animations/
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── .env.example                       ← Crear cuando se configure backend
├── app.json
├── babel.config.js
├── global.css
├── metro.config.js
├── nativewind-env.d.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## Siguiente paso

El Nivel 1 está completo. Ahora proceder a los documentos de **Nivel 2 — Pantallas** para especificar cada pantalla a detalle y empezar a implementarlas.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Listo para ejecución
