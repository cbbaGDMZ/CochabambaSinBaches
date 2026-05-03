# 03 — Coding Standards: Cochabamba Sin Baches

> **Documento de convenciones obligatorias.** Cualquier IA o desarrollador que escriba código para este proyecto DEBE seguir estas reglas sin excepción. La consistencia del código es más importante que las preferencias individuales. Si una regla no cubre un caso específico, seguir el patrón más cercano documentado aquí y documentar la decisión.

---

## 1. Idiomas

| Contexto | Idioma | Ejemplo |
|---|---|---|
| Variables, funciones, clases, interfaces | Inglés | `createReport`, `UserProfile`, `isLoading` |
| Nombres de archivos y carpetas | Inglés | `report-card.tsx`, `auth-store.ts` |
| Comentarios técnicos en el código | Inglés | `// Calculate IPB score asynchronously` |
| Comentarios de negocio/dominio | Español | `// Severidad del daño según clasificación municipal` |
| Strings visibles al usuario (UI copy) | Español | `"Reporta un bache"`, `"Sin conexión"` |
| Commits | Inglés | `feat: add report creation screen` |
| Documentación (.md) | Español | Este documento |
| Nombres de branches | Inglés | `feature/report-creation` |

---

## 2. Naming conventions

### 2.1 Archivos y carpetas

| Tipo | Convención | Ejemplo |
|---|---|---|
| Componentes React | `kebab-case.tsx` | `report-card.tsx` |
| Pantallas (expo-router) | `kebab-case.tsx` o `index.tsx` | `app/(tabs)/index.tsx` |
| Hooks custom | `kebab-case.ts` con prefijo `use-` | `use-auth.ts` |
| Stores (Zustand) | `kebab-case.ts` con sufijo `-store` | `auth-store.ts` |
| Tipos/interfaces | `kebab-case.ts` con sufijo `-types` | `report-types.ts` |
| Servicios API | `kebab-case.ts` con sufijo `-service` | `report-service.ts` |
| Utilidades | `kebab-case.ts` | `format-date.ts` |
| Constantes | `kebab-case.ts` | `colors.ts`, `api-routes.ts` |
| Carpetas | `kebab-case` | `report-card/`, `auth/` |

### 2.2 Variables y funciones

| Tipo | Convención | Ejemplo |
|---|---|---|
| Variables locales | `camelCase` | `reportList`, `isLoading`, `userName` |
| Funciones | `camelCase` | `createReport()`, `fetchUserReports()` |
| Funciones booleanas | `camelCase` con prefijo `is/has/can/should` | `isAuthenticated`, `hasConnection`, `canSubmit` |
| Event handlers | `camelCase` con prefijo `handle` | `handleSubmit`, `handlePressReport` |
| Callbacks como props | `camelCase` con prefijo `on` | `onPress`, `onSubmit`, `onRefresh` |
| Constantes globales | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_PHOTOS_PER_REPORT` |
| Enum values | `UPPER_SNAKE_CASE` | `ReportStatus.PENDING`, `DamageType.POTHOLE` |

### 2.3 Tipos e interfaces TypeScript

| Tipo | Convención | Ejemplo |
|---|---|---|
| Interfaces | `PascalCase` sin prefijo `I` | `Report`, `User`, `CreateReportPayload` |
| Types | `PascalCase` | `ReportStatus`, `DamageType` |
| Props de componentes | `PascalCase` con sufijo `Props` | `ReportCardProps`, `ButtonProps` |
| Respuestas de API | `PascalCase` con sufijo `Response` | `LoginResponse`, `ReportsListResponse` |
| Payloads de API | `PascalCase` con sufijo `Payload` | `CreateReportPayload`, `LoginPayload` |
| Params de navegación | `PascalCase` con sufijo `Params` | `ReportDetailParams` |

### 2.4 Componentes React

| Tipo | Convención | Ejemplo |
|---|---|---|
| Nombre del componente | `PascalCase` | `ReportCard`, `PrimaryButton` |
| Archivo del componente | `kebab-case.tsx` | `report-card.tsx` |
| Export | `named export` (nunca default excepto en pantallas) | `export function ReportCard()` |
| Pantallas (expo-router) | `default export` (requerido por expo-router) | `export default function HomeScreen()` |

---

## 3. Estructura de componentes

### 3.1 Orden interno de un componente

Todo componente debe seguir este orden exacto, separado por líneas en blanco:

```tsx
// 1. Imports (agrupados y ordenados)
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';

import { useAuth } from '@/hooks/use-auth';
import { ReportCard } from '@/components/report-card';
import { formatDate } from '@/lib/format-date';
import type { Report } from '@/types/report-types';

// 2. Types/Interfaces (si son locales al componente)
interface ReportListProps {
  reports: Report[];
  onPressReport: (id: string) => void;
}

// 3. Constants (si son locales al componente)
const MAX_VISIBLE_REPORTS = 10;

// 4. Component function
export function ReportList({ reports, onPressReport }: ReportListProps) {
  // 4a. Hooks (siempre primero dentro del componente)
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 4b. Derived state (cálculos basados en state/props)
  const visibleReports = reports.slice(0, MAX_VISIBLE_REPORTS);
  const hasReports = reports.length > 0;

  // 4c. Effects
  useEffect(() => {
    // ...
  }, []);

  // 4d. Handlers
  function handleRefresh() {
    setIsRefreshing(true);
    // ...
  }

  // 4e. Render helpers (funciones que retornan JSX)
  function renderEmptyState() {
    return (
      <View>
        <Text>Aún no tienes reportes.</Text>
      </View>
    );
  }

  // 4f. Return (JSX principal)
  return (
    <View>
      {hasReports ? (
        visibleReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onPress={() => onPressReport(report.id)}
          />
        ))
      ) : (
        renderEmptyState()
      )}
    </View>
  );
}
```

### 3.2 Orden de imports

Los imports se organizan en 3 grupos, separados por una línea en blanco:

```tsx
// Grupo 1: Librerías externas (react, react-native, expo, third-party)
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';

// Grupo 2: Imports internos del proyecto (con alias @/)
import { useAuth } from '@/hooks/use-auth';
import { ReportCard } from '@/components/report-card';
import { reportService } from '@/services/report-service';
import { formatDate } from '@/lib/format-date';

// Grupo 3: Types (siempre al final, con "import type")
import type { Report } from '@/types/report-types';
import type { User } from '@/types/user-types';
```

### 3.3 Reglas de imports

- **Siempre** usar path alias `@/` para imports internos (nunca `../../`).
- **Siempre** usar `import type` para imports que solo son tipos.
- **Nunca** usar `import *` excepto en archivos barrel (`index.ts`).
- **Nunca** importar desde `react-native` lo que existe en Expo: usar `expo-image` no `Image`, usar `expo-linear-gradient` no el de community.

---

## 4. Patrones obligatorios

### 4.1 Componentes funcionales SIEMPRE

```tsx
// ✅ Correcto
export function ReportCard({ report }: ReportCardProps) {
  return <View>...</View>;
}

// ❌ Prohibido: arrow function para componentes
export const ReportCard = ({ report }: ReportCardProps) => {
  return <View>...</View>;
};

// ❌ Prohibido: class components
class ReportCard extends React.Component { }
```

**Excepción:** Los hooks custom SÍ pueden ser arrow functions:
```tsx
export const useAuth = () => { ... };
```

### 4.2 Función regular vs arrow function

| Contexto | Estilo | Ejemplo |
|---|---|---|
| Componentes | `function` declaration | `export function ReportCard() {}` |
| Hooks custom | `const` arrow function | `export const useAuth = () => {}` |
| Handlers dentro de componente | `function` declaration | `function handleSubmit() {}` |
| Callbacks inline | Arrow function | `onPress={() => navigate(id)}` |
| Utilidades exportadas | `export function` | `export function formatDate() {}` |

### 4.3 Props: destructuring en parámetro

```tsx
// ✅ Correcto
export function ReportCard({ report, onPress }: ReportCardProps) { }

// ❌ Incorrecto
export function ReportCard(props: ReportCardProps) {
  const { report, onPress } = props;
}
```

### 4.4 Condicionales en JSX

```tsx
// ✅ Correcto: && para mostrar/ocultar
{isLoading && <Spinner />}

// ✅ Correcto: ternario para dos opciones
{hasReports ? <ReportList /> : <EmptyState />}

// ❌ Prohibido: ternario con null
{isLoading ? <Spinner /> : null}
// Usar && en su lugar:
{isLoading && <Spinner />}

// ❌ Prohibido: if/else dentro del return
// Usar render helpers o early return en su lugar
```

### 4.5 Early returns

```tsx
// ✅ Correcto: early return para estados especiales
export function ReportDetailScreen() {
  const { data, isLoading, error } = useReport(id);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!data) return <EmptyState />;

  return (
    <View>
      {/* Contenido principal */}
    </View>
  );
}
```

### 4.6 Manejo de eventos táctiles

```tsx
// ✅ Correcto: usar Pressable (no TouchableOpacity)
<Pressable onPress={handlePress}>
  <Text>Presioname</Text>
</Pressable>

// ❌ Prohibido: TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback
// Razón: Pressable es el componente oficial recomendado por React Native
```

---

## 5. TypeScript

### 5.1 Configuración estricta

`tsconfig.json` debe tener:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 5.2 Reglas de tipado

```tsx
// ✅ Correcto: tipar explícitamente props y retornos de funciones de servicio
interface CreateReportPayload {
  damageType: DamageType;
  description?: string;
  latitude: number;
  longitude: number;
  photos: string[];
}

export async function createReport(payload: CreateReportPayload): Promise<Report> { }

// ✅ Correcto: inferir tipos cuando es obvio
const [isLoading, setIsLoading] = useState(false);  // TypeScript infiere boolean
const reports = data?.reports ?? [];                  // TypeScript infiere del tipo de data

// ❌ Prohibido: usar "any"
function processData(data: any) { }     // NUNCA
// Usar "unknown" si realmente no se conoce el tipo:
function processData(data: unknown) { }

// ❌ Prohibido: usar "as" para castear tipos (excepto en casos muy justificados)
const user = response.data as User;     // EVITAR
// Usar type guards o validación con zod en su lugar

// ❌ Prohibido: non-null assertion operator (!)
const name = user!.name;                // NUNCA
// Usar optional chaining y nullish coalescing:
const name = user?.name ?? 'Sin nombre';
```

### 5.3 Enums

Usar `const enum` o union types de strings, NO enums regulares:

```tsx
// ✅ Preferido: union type
type ReportStatus = 'pending' | 'in_review' | 'assigned' | 'in_progress' | 'repaired';

// ✅ Aceptable: const object (si se necesitan valores en runtime)
export const REPORT_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  REPAIRED: 'repaired',
} as const;

export type ReportStatus = typeof REPORT_STATUS[keyof typeof REPORT_STATUS];

// ❌ Evitar: enum regular de TypeScript
enum ReportStatus {
  PENDING = 'pending',
}
```

### 5.4 Tipos compartidos

Los tipos que se usan en más de un archivo van en `src/types/`. Un archivo por dominio:

```
src/types/
├── report-types.ts    // Report, CreateReportPayload, ReportStatus, DamageType
├── user-types.ts      // User, LoginPayload, LoginResponse, AuthTokens
├── api-types.ts       // ApiError, PaginatedResponse, ApiResponse
├── map-types.ts       // MapMarker, MapRegion, Coordinates
└── common-types.ts    // Tipos compartidos genéricos
```

---

## 6. Zustand stores

### 6.1 Estructura de un store

```tsx
// src/stores/auth-store.ts
import { create } from 'zustand';
import type { User, AuthTokens } from '@/types/user-types';

// 1. Definir interface del state
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 2. Definir interface de las actions
interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// 3. Estado inicial (constante separada, para poder resetear)
const INITIAL_STATE: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
};

// 4. Crear store combinando State + Actions
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...INITIAL_STATE,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setTokens: (tokens) => set({ tokens }),
  logout: () => set(INITIAL_STATE),
  setLoading: (isLoading) => set({ isLoading }),
}));
```

### 6.2 Reglas de stores

- Un store por dominio: `auth-store`, `report-store`, `offline-store`.
- **Nunca** lógica de negocio compleja dentro del store. Los stores solo guardan y actualizan estado.
- La lógica de negocio va en hooks custom (`use-auth.ts`) o en services (`auth-service.ts`).
- **Siempre** definir `INITIAL_STATE` como constante separada para poder resetear.
- **Siempre** separar interfaces de State y Actions.

---

## 7. Servicios API (axios + React Query)

### 7.1 Estructura del cliente HTTP

```tsx
// src/lib/api-client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:8000';

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
    // Lógica de refresh token aquí
    return Promise.reject(error);
  }
);
```

### 7.2 Estructura de un servicio

```tsx
// src/services/report-service.ts
import { apiClient } from '@/lib/api-client';
import type { Report, CreateReportPayload } from '@/types/report-types';
import type { PaginatedResponse } from '@/types/api-types';

export const reportService = {
  getMyReports: async (page: number = 1): Promise<PaginatedResponse<Report>> => {
    const { data } = await apiClient.get('/reports/me', { params: { page } });
    return data;
  },

  getReportById: async (id: string): Promise<Report> => {
    const { data } = await apiClient.get(`/reports/${id}`);
    return data;
  },

  createReport: async (payload: CreateReportPayload): Promise<Report> => {
    const { data } = await apiClient.post('/reports', payload);
    return data;
  },
};
```

### 7.3 Uso con React Query

```tsx
// src/hooks/use-reports.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '@/services/report-service';

// Query keys centralizadas
export const REPORT_KEYS = {
  all: ['reports'] as const,
  myReports: (page: number) => ['reports', 'mine', page] as const,
  detail: (id: string) => ['reports', 'detail', id] as const,
};

// Hook para listar mis reportes
export const useMyReports = (page: number = 1) => {
  return useQuery({
    queryKey: REPORT_KEYS.myReports(page),
    queryFn: () => reportService.getMyReports(page),
  });
};

// Hook para crear un reporte
export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.all });
    },
  });
};
```

### 7.4 Reglas de servicios y queries

- Un archivo de servicio por dominio: `report-service.ts`, `auth-service.ts`.
- Query keys centralizadas en cada hook file como `const` object.
- **Nunca** llamar `axios` o `apiClient` directamente desde un componente. Siempre pasar por un servicio y un hook.
- **Nunca** manejar loading/error manualmente si se puede usar React Query.

---

## 8. Hooks custom

### 8.1 Convención de archivos

```
src/hooks/
├── use-auth.ts          // Lógica de autenticación
├── use-reports.ts       // Queries y mutations de reportes
├── use-location.ts      // Geolocalización
├── use-camera.ts        // Captura de fotos
├── use-connectivity.ts  // Estado de conexión
├── use-offline-sync.ts  // Sincronización offline
```

### 8.2 Estructura de un hook

```tsx
// src/hooks/use-location.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import type { Coordinates } from '@/types/map-types';

interface UseLocationReturn {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useLocation = (): UseLocationReturn => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getLocation() {
    // ...implementación
  }

  useEffect(() => {
    getLocation();
  }, []);

  return { coordinates, isLoading, error, refresh: getLocation };
};
```

### 8.3 Reglas de hooks

- **Siempre** tipar el retorno del hook con una interface.
- **Siempre** retornar un objeto (no un array), para mayor legibilidad al desestructurar.
- Un hook debe tener UNA responsabilidad. Si hace muchas cosas, dividirlo.
- Los hooks NO deben contener JSX. Si necesita retornar JSX, es un componente.

---

## 9. Manejo de errores

### 9.1 En servicios API

```tsx
// ✅ Correcto: los servicios lanzan errores, los hooks los capturan
// El servicio NO hace try/catch — deja que el error suba
export const reportService = {
  createReport: async (payload: CreateReportPayload): Promise<Report> => {
    const { data } = await apiClient.post('/reports', payload);
    return data;
  },
};

// React Query captura el error automáticamente
const { error, isError } = useCreateReport();
```

### 9.2 En componentes

```tsx
// ✅ Correcto: usar estados de React Query
if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

// ✅ Correcto: try/catch solo para operaciones que no pasan por React Query
async function handleSaveOffline() {
  try {
    await offlineDb.saveReport(report);
    showToast('success', 'Reporte guardado offline');
  } catch (error) {
    showToast('error', 'No se pudo guardar el reporte');
  }
}
```

### 9.3 Mensajes de error al usuario

- **Nunca** mostrar mensajes técnicos al usuario (`Error 500`, `Network Error`, `TypeError`).
- **Siempre** mapear errores a mensajes amigables en español.
- **Siempre** incluir una acción: "Intenta de nuevo", "Verifica tu conexión", etc.

---

## 10. Estilos con NativeWind

### 10.1 Reglas generales

```tsx
// ✅ Correcto: clases de NativeWind en className
<View className="flex-1 bg-background px-4 pt-10">
  <Text className="text-text-primary text-[24px] font-poppins-semibold">Título</Text>
</View>

// ❌ Prohibido: StyleSheet.create()
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
});

// ❌ Prohibido: inline styles para cosas que NativeWind puede hacer
<View style={{ flex: 1, backgroundColor: '#0A0A0A', paddingHorizontal: 16 }}>
```

### 10.2 Excepciones donde SÍ usar style prop

- **Sombras** (NativeWind no las maneja bien en RN): `style={{ shadowColor: ... }}`.
- **Valores dinámicos** calculados en runtime: `style={{ height: screenHeight * 0.5 }}`.
- **Animaciones con Reanimated**: `style={animatedStyle}`.
- **Posición absoluta con valores dinámicos**: `style={{ top: insets.top }}`.

### 10.3 Orden de clases Tailwind

Seguir este orden (Prettier plugin lo hace automáticamente):
1. Layout (`flex`, `flex-1`, `flex-row`)
2. Tamaño (`w-full`, `h-12`)
3. Espaciado (`px-4`, `py-2`, `mt-4`, `gap-3`)
4. Fondo (`bg-surface`)
5. Bordes (`border`, `border-border-default`, `rounded-xl`)
6. Texto (`text-text-primary`, `text-[16px]`, `font-poppins-bold`)
7. Estados (`active:bg-surface-hover`, `opacity-40`)

---

## 11. Git workflow

### 11.1 Branches

| Branch | Propósito | Se crea desde | Se mergea a |
|---|---|---|---|
| `main` | Producción, siempre estable | — | — |
| `develop` | Integración de features | `main` | `main` |
| `feature/*` | Nueva funcionalidad | `develop` | `develop` |
| `fix/*` | Corrección de bug | `develop` | `develop` |
| `docs/*` | Cambios de documentación | `develop` | `develop` |

### 11.2 Commits (Conventional Commits)

Formato: `tipo(scope): descripción breve en inglés`

| Tipo | Uso | Ejemplo |
|---|---|---|
| `feat` | Nueva funcionalidad | `feat(auth): add Google OAuth login` |
| `fix` | Corrección de bug | `fix(reports): fix offline sync losing photos` |
| `docs` | Documentación | `docs: add design system` |
| `style` | Formato de código (no lógica) | `style: fix indentation in report-card` |
| `refactor` | Refactorización sin cambio funcional | `refactor(stores): split auth store` |
| `chore` | Mantenimiento, dependencias | `chore: update expo sdk to 52` |
| `test` | Tests | `test(auth): add login flow tests` |

### 11.3 Reglas de commits

- Un commit = un cambio lógico. No mezclar feature + fix en el mismo commit.
- Descripción en inglés, imperative mood: "add", no "added" ni "adding".
- Máximo 72 caracteres en la primera línea.
- Si necesita más contexto, agregar body después de una línea en blanco.

---

## 12. Estructura de carpetas del proyecto móvil

```
mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── _layout.tsx              # Root layout (providers, font loading)
│   ├── index.tsx                # Entry point → redirect a splash o tabs
│   ├── (auth)/                  # Grupo de pantallas de autenticación
│   │   ├── _layout.tsx          # Stack layout para auth
│   │   ├── login.tsx            # Pantalla de login
│   │   ├── register.tsx         # Pantalla de registro
│   │   └── splash.tsx           # Pantalla de splash
│   ├── (tabs)/                  # Grupo de tabs (pantallas principales)
│   │   ├── _layout.tsx          # Tab layout con bottom tab bar
│   │   ├── index.tsx            # Tab 1: Home / Mapa
│   │   ├── reports.tsx          # Tab 2: Mis reportes
│   │   ├── create-report.tsx    # Tab 3: Crear reporte (o modal)
│   │   └── profile.tsx          # Tab 4: Perfil
│   └── report/                  # Pantallas de detalle (stack)
│       └── [id].tsx             # Detalle de un reporte
│
├── src/                          # Código fuente (todo lo que NO es routing)
│   ├── components/              # Componentes reutilizables
│   │   ├── ui/                  # Componentes base (Button, Input, Card, Badge)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── loading-skeleton.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-state.tsx
│   │   │   └── toast.tsx
│   │   ├── report/             # Componentes específicos de reportes
│   │   │   ├── report-card.tsx
│   │   │   ├── report-status-badge.tsx
│   │   │   ├── report-map-marker.tsx
│   │   │   └── report-photo-picker.tsx
│   │   ├── map/                # Componentes del mapa
│   │   │   ├── map-view.tsx
│   │   │   └── current-location-marker.tsx
│   │   └── auth/               # Componentes de autenticación
│   │       ├── login-form.tsx
│   │       ├── register-form.tsx
│   │       └── google-auth-button.tsx
│   │
│   ├── hooks/                   # Hooks custom
│   │   ├── use-auth.ts
│   │   ├── use-reports.ts
│   │   ├── use-location.ts
│   │   ├── use-camera.ts
│   │   ├── use-connectivity.ts
│   │   └── use-offline-sync.ts
│   │
│   ├── stores/                  # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── report-store.ts
│   │   └── offline-store.ts
│   │
│   ├── services/                # Servicios API
│   │   ├── auth-service.ts
│   │   └── report-service.ts
│   │
│   ├── lib/                     # Utilidades y configuración
│   │   ├── api-client.ts       # Instancia de axios configurada
│   │   ├── offline-db.ts       # Configuración de expo-sqlite
│   │   ├── format-date.ts      # Formateo de fechas
│   │   ├── compress-image.ts   # Compresión de imágenes
│   │   └── constants.ts        # Constantes globales
│   │
│   ├── types/                   # TypeScript types/interfaces
│   │   ├── report-types.ts
│   │   ├── user-types.ts
│   │   ├── api-types.ts
│   │   ├── map-types.ts
│   │   └── common-types.ts
│   │
│   └── config/                  # Configuración de la app
│       ├── theme.ts            # Tokens exportados (colores, spacing)
│       └── query-client.ts     # Config de React Query
│
├── assets/                      # Recursos estáticos
│   ├── fonts/                  # (si se precargan fuentes manualmente)
│   ├── images/                 # Imágenes estáticas (logo, splash, icons)
│   └── animations/             # Archivos Lottie (si se usan)
│
├── .env                         # Variables de entorno (NO en Git)
├── .env.example                 # Template de variables (SÍ en Git)
├── app.json                     # Configuración de Expo
├── babel.config.js              # Babel + NativeWind preset
├── tailwind.config.js           # Configuración de Tailwind
├── tsconfig.json                # TypeScript config
├── package.json
├── package-lock.json            # OBLIGATORIO en Git
└── .gitignore
```

### 12.1 Reglas de la estructura

1. **`app/`** solo contiene archivos de routing (pantallas y layouts). Nunca componentes, hooks o lógica.
2. **`src/`** contiene TODO lo que no es routing.
3. **`src/components/ui/`** son componentes genéricos sin lógica de negocio (Button, Input, Card).
4. **`src/components/{domain}/`** son componentes específicos de un dominio (report-card, map-marker).
5. **Un componente = un archivo.** No crear carpetas por componente a menos que tenga más de 100 líneas Y necesite subcomponentes.
6. **Nunca** más de 200 líneas por archivo. Si supera eso, refactorizar.

---

## 13. Performance

### 13.1 Reglas de rendimiento

- **Siempre** usar `expo-image` en lugar de `<Image>` de React Native.
- **Siempre** usar `FlatList` o `FlashList` para listas, nunca `ScrollView` con `.map()` para más de 10 items.
- **Siempre** comprimir imágenes antes de subir (máximo 1200px ancho, JPEG 70%).
- **Nunca** hacer console.log en producción. Usar `__DEV__` para logs de desarrollo.
- **Nunca** crear funciones dentro del render sin memoización si se pasan como props.
- Usar `React.memo()` solo cuando haya un problema medible de performance, no preventivamente.

### 13.2 Logs

```tsx
// ✅ Correcto: solo en desarrollo
if (__DEV__) {
  console.log('Report created:', report.id);
}

// ❌ Prohibido en producción
console.log('debug data:', data);
```

---

## 14. Testing (lineamientos para futuro)

No es alcance de esta fase implementar tests, pero la estructura está preparada para:

- **Unit tests**: hooks y utilidades con Jest.
- **Component tests**: componentes con React Native Testing Library.
- **E2E tests**: flujos con Detox o Maestro.

Los archivos de test van junto al archivo que testean: `use-auth.test.ts` junto a `use-auth.ts`.

---

## 15. Checklist de revisión de código

Antes de considerar cualquier código como terminado, verificar:

- [ ] TypeScript compila sin errores (`npx tsc --noEmit`).
- [ ] ESLint pasa sin warnings (`npx eslint .`).
- [ ] Prettier formatea correctamente (`npx prettier --check .`).
- [ ] No hay `any` en el código.
- [ ] No hay `console.log` fuera de `__DEV__`.
- [ ] No hay imports con rutas relativas (`../../`). Todo usa `@/`.
- [ ] Los componentes usan `function` declaration, no arrow function.
- [ ] Los stores siguen la estructura documentada (State + Actions separados).
- [ ] Los servicios no tienen try/catch (lo maneja React Query).
- [ ] Los handlers se nombran con prefijo `handle`.
- [ ] Las props callback se nombran con prefijo `on`.
- [ ] NativeWind se usa para estilos, no StyleSheet.create.
- [ ] El commit sigue Conventional Commits.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Aprobado — convenciones congeladas para desarrollo
