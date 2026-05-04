# 01 — Tech Stack: Cochabamba Sin Baches

> **Documento de referencia técnica obligatoria.** Define el stack tecnológico completo con **versiones específicas**. Cualquier IA o desarrollador que instale dependencias DEBE respetar estas versiones para evitar incompatibilidades.
>
> **ACTUALIZADO para Expo SDK 55** (mayo 2026). Versiones verificadas contra npm registry.

---

## 1. Filosofía del stack

- **Estabilidad sobre novedad**: usamos versiones LTS o estables, nunca betas o release candidates.
- **Free tier first**: todo el stack debe poder operar en planes gratuitos durante el desarrollo y la demo.
- **Expo Go obligatorio**: ninguna librería que requiera código nativo fuera del SDK oficial de Expo.
- **TypeScript estricto**: todo el código en TypeScript con `strict: true`.
- **Sin abandonware**: solo librerías con mantenimiento activo en los últimos 6 meses.

---

## 2. Entorno de desarrollo del estudiante

| Herramienta | Versión instalada |
|---|---|
| macOS | Big Sur 11.7.11 |
| Git | 2.51.0 |
| Node.js | 22.22.2 (LTS vía nvm) |
| npm | 10.9.7 |
| nvm | 0.39.7 |
| Expo CLI (npx) | 55.0.27 |
| EAS CLI | 18.9.1 |
| Cuenta Expo | diegogmz |

---

## 3. Stack global (resumen)

| Capa | Tecnología | Versión |
|---|---|---|
| App móvil | React Native + Expo | **SDK 55** |
| React | React | **19.x** |
| React Native | React Native | **0.85.x** |
| Lenguaje móvil | TypeScript | **6.x** |
| Estado global móvil | Zustand | 4.5.x |
| Estilos móvil | NativeWind | **4.2.x** |
| Storage local | expo-sqlite | SDK 55 compatible |
| Mapas | react-native-maps | **1.27.x** |
| Backend | FastAPI (Python) | 0.115.x |
| Lenguaje backend | Python | 3.11.x |
| ORM | SQLAlchemy | 2.0.x |
| Base de datos | PostgreSQL + PostGIS | 16 / PostGIS 3.4 |
| Cache / broker | Redis | 7.2.x |
| Storage objetos | MinIO | RELEASE.2024-x |
| Tareas async | Celery | 5.4.x |
| Push notifications | Expo Notifications | SDK 55 |
| Dashboard web (futuro) | React + Vite | 19.x / 6.x |

---

## 4. Aplicación móvil — Stack detallado

### 4.1 Core

| Paquete | Versión | Propósito |
|---|---|---|
| `expo` | `~55.0.0` | Framework base, runtime Expo Go |
| `react` | `^19.2.0` | Librería UI |
| `react-native` | `0.85.x` | Runtime nativo móvil |
| `typescript` | `~6.0.0` | Lenguaje |

> **Nota SDK 55:** Expo SDK 55 usa React 19 y React Native 0.85 (New Architecture habilitada por defecto).

### 4.2 Navegación

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-router` | `~55.0.0` | Navegación file-based (estándar Expo SDK 55) |
| `react-native-screens` | `~4.24.0` | Pantallas nativas optimizadas |
| `react-native-safe-area-context` | `~5.7.0` | Manejo de safe areas (notch, navbar) |
| `expo-linking` | `~55.0.0` | Deep linking |
| `react-native-gesture-handler` | `~2.31.0` | Gestos avanzados |
| `react-native-reanimated` | `~4.3.0` | Animaciones performantes |

**Decisión:** Usamos `expo-router` (no React Navigation tradicional) porque es el estándar oficial actual de Expo y es file-based como Next.js.

### 4.3 Estilos

| Paquete | Versión | Propósito |
|---|---|---|
| `nativewind` | `^4.2.3` | Tailwind CSS para React Native |
| `tailwindcss` | `^3.4.17` | Engine de Tailwind |

**Decisión:** Tailwind v3 (no v4). NativeWind 4 todavía no soporta Tailwind v4 de forma estable.

### 4.4 Estado y formularios

| Paquete | Versión | Propósito |
|---|---|---|
| `zustand` | `^4.5.5` | Estado global (sesión, reportes pendientes) |
| `react-hook-form` | `^7.54.0` | Formularios performantes |
| `zod` | `^3.24.1` | Validación de schemas (compartido con backend) |
| `@hookform/resolvers` | `^3.9.1` | Bridge entre react-hook-form y zod |

### 4.5 Networking

| Paquete | Versión | Propósito |
|---|---|---|
| `axios` | `^1.7.9` | Cliente HTTP |
| `@tanstack/react-query` | `^5.62.0` | Cache de queries y mutations |

### 4.6 Almacenamiento local

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-sqlite` | `~55.0.0` | Base de datos SQLite local (offline) |
| `expo-secure-store` | `~55.0.0` | Almacenamiento seguro de tokens JWT |
| `@react-native-async-storage/async-storage` | `~3.0.0` | Storage simple key-value (preferencias) |

**Decisión clave:**
- Tokens JWT y refresh tokens → **siempre** en `expo-secure-store` (cifrado en hardware).
- Reportes pendientes offline → **expo-sqlite** (queries estructuradas).
- Preferencias simples (idioma, tema) → **AsyncStorage**.

### 4.7 Cámara, geolocalización y media

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-camera` | `~55.0.0` | Captura desde cámara |
| `expo-image-picker` | `~55.0.0` | Selección desde galería |
| `expo-location` | `~55.0.0` | Geolocalización GPS |
| `expo-image` | `~55.0.0` | Componente de imágenes optimizado |
| `expo-image-manipulator` | `~55.0.0` | Compresión y resize de imágenes antes de subir |

### 4.8 Mapas

| Paquete | Versión | Propósito |
|---|---|---|
| `react-native-maps` | `^1.27.0` | Mapas nativos |

### 4.9 Notificaciones y conectividad

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-notifications` | `~55.0.0` | Push notifications |
| `expo-device` | `~55.0.0` | Info del dispositivo (necesario para push tokens) |
| `@react-native-community/netinfo` | `~12.0.0` | Detección de cambios de conectividad |

### 4.10 Autenticación OAuth

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-auth-session` | `~55.0.0` | OAuth2 genérico (Google, Facebook, etc.) |
| `expo-web-browser` | `~55.0.0` | Browser embebido para OAuth |
| `expo-crypto` | `~55.0.0` | Generación de PKCE para OAuth seguro |

### 4.11 Utilidades

| Paquete | Versión | Propósito |
|---|---|---|
| `date-fns` | `^4.1.0` | Manejo de fechas (más ligero que moment) |
| `expo-constants` | `~55.0.0` | Acceso a variables de entorno y manifest |
| `expo-status-bar` | `~55.0.0` | Control de status bar |
| `expo-splash-screen` | `~55.0.0` | Splash screen nativo |
| `expo-font` | `~55.0.0` | Carga de fuentes custom |
| `lucide-react-native` | `^1.14.0` | Iconos (Lucide) |
| `react-native-svg` | `~15.15.0` | Renderizado SVG (requerido por Lucide) |

### 4.12 Fuentes

| Paquete | Versión | Propósito |
|---|---|---|
| `@expo-google-fonts/poppins` | `^0.4.1` | Fuente Poppins |

### 4.13 Desarrollo (devDependencies)

| Paquete | Versión | Propósito |
|---|---|---|
| `@babel/core` | `^7.25.0` | Transpilador |
| `prettier` | `^3.4.2` | Formateo de código |
| `prettier-plugin-tailwindcss` | `^0.6.9` | Ordenado automático de clases Tailwind |

---

## 5. Backend — Stack detallado

> **Nota:** El backend no es alcance de esta fase pero se documenta para que la app tenga referencia clara del contrato.

### 5.1 Core

| Paquete | Versión | Propósito |
|---|---|---|
| `python` | `3.11.x` | Lenguaje |
| `fastapi` | `^0.115.0` | Framework web async |
| `uvicorn[standard]` | `^0.32.0` | Servidor ASGI |
| `pydantic` | `^2.10.0` | Validación de schemas |
| `pydantic-settings` | `^2.7.0` | Configuración por env vars |

### 5.2 Base de datos

| Paquete | Versión | Propósito |
|---|---|---|
| `sqlalchemy` | `^2.0.36` | ORM |
| `geoalchemy2` | `^0.16.0` | Extensión SQLAlchemy para PostGIS |
| `alembic` | `^1.14.0` | Migraciones |
| `asyncpg` | `^0.30.0` | Driver async PostgreSQL |
| `psycopg2-binary` | `^2.9.10` | Driver sync (para Alembic) |

### 5.3 Autenticación

| Paquete | Versión | Propósito |
|---|---|---|
| `python-jose[cryptography]` | `^3.3.0` | JWT |
| `passlib[bcrypt]` | `^1.7.4` | Hashing de contraseñas |
| `python-multipart` | `^0.0.20` | Form data y file uploads |

### 5.4 Tareas async y storage

| Paquete | Versión | Propósito |
|---|---|---|
| `celery[redis]` | `^5.4.0` | Tareas asíncronas |
| `redis` | `^5.2.1` | Cliente Redis |
| `minio` | `^7.2.10` | Cliente MinIO (S3) |

### 5.5 Notificaciones

| Paquete | Versión | Propósito |
|---|---|---|
| `httpx` | `^0.28.0` | Cliente HTTP async (para llamar Expo Push API) |
| `exponent-server-sdk` | `^2.1.0` | SDK oficial Expo Push |

### 5.6 Desarrollo backend

| Paquete | Versión | Propósito |
|---|---|---|
| `pytest` | `^8.3.0` | Testing |
| `pytest-asyncio` | `^0.25.0` | Tests async |
| `httpx` | `^0.28.0` | Cliente para tests |
| `ruff` | `^0.8.0` | Linter + formatter |
| `mypy` | `^1.13.0` | Type checking |

---

## 6. Infraestructura

| Servicio | Versión / Plan |
|---|---|
| PostgreSQL | 16 |
| PostGIS | 3.4 |
| Redis | 7.2 |
| MinIO | RELEASE.2024-12-x |
| Docker | 24.x+ |
| Docker Compose | v2.x |
| Nginx | 1.27 (alpine) |
| GitHub Actions | Plan free (2000 min/mes) |
| Render / Railway | Free tier para demo |

---

## 7. Versionado del proyecto

- **Convención de versiones**: [Semantic Versioning 2.0](https://semver.org/) (`MAJOR.MINOR.PATCH`).
- **Versión inicial del MVP**: `0.1.0`.
- **Versión de demo final**: `1.0.0`.
- **Branch strategy**: `main` (producción), `develop` (integración), `feature/*` (features), `fix/*` (bugs).

---

## 8. Reglas de actualización de dependencias

1. **Nunca actualizar versiones MAJOR** durante el desarrollo del MVP.
2. Las actualizaciones MINOR y PATCH se evalúan caso por caso.
3. Si Expo SDK lanza una nueva versión durante el desarrollo, **NO migrar** hasta entregar el MVP.
4. Nuevas dependencias deben pasar por revisión: ¿es estrictamente necesaria? ¿Tiene mantenimiento activo? ¿Funciona en Expo Go?
5. Toda dependencia agregada debe documentarse en este archivo con su propósito.

---

## 9. Lockfiles obligatorios

- `mobile/package-lock.json` → **debe versionarse en Git**.
- `backend/requirements.lock` o `backend/poetry.lock` → **debe versionarse en Git**.

Sin lockfiles, no hay reproducibilidad. La IA debe respetar los lockfiles existentes y nunca borrarlos.

---

## 10. Variables de entorno (referencia)

Todas las claves sensibles van en archivos `.env` que **NO se versionan**. Existirán archivos `.env.example` que sí se versionan, sin valores reales.

### App móvil (`mobile/.env`)
```
EXPO_PUBLIC_API_URL=https://api.cochabambasinbaches.com
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID_ANDROID=...
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID_WEB=...
```

### Backend (`backend/.env`)
```
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/csb
REDIS_URL=redis://localhost:6379/0
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=...
MINIO_SECRET_KEY=...
JWT_SECRET=...
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=30
EXPO_ACCESS_TOKEN=...
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
```

---

## 11. Decisiones técnicas explícitas (y por qué NO usamos otras alternativas)

| Decisión | Por qué SÍ | Por qué NO la alternativa |
|---|---|---|
| **React Native + Expo Go** sobre Flutter | Stack del estudiante, ecosistema npm | Flutter requería aprender Dart |
| **Expo Go** sobre Dev Client | Más simple, sin Android Studio | Dev Client necesita compilación nativa |
| **NativeWind** sobre StyleSheet | Consistente con dashboard React | StyleSheet más verboso, menos reutilizable |
| **Zustand** sobre Redux Toolkit | Menos boilerplate, ideal para alcance MVP | Redux Toolkit es overkill aquí |
| **expo-router** sobre React Navigation | Estándar oficial Expo SDK 55 | React Navigation requiere config manual |
| **expo-sqlite** sobre WatermelonDB | Sin dependencias nativas extras | WatermelonDB requiere Dev Client |
| **react-native-maps** sobre Mapbox | Funciona en Expo Go sin API key | Mapbox requiere Dev Client |
| **Expo Notifications** sobre Firebase Messaging directo | Funciona en Expo Go | FCM directo requiere Dev Client |
| **PostgreSQL + PostGIS** sobre MongoDB | Queries espaciales nativas | MongoDB no tiene PostGIS |
| **FastAPI** sobre Django | Async nativo, OpenAPI auto, ligero | Django es más pesado para REST puro |
| **MinIO** sobre AWS S3 | Self-hosted, gratis | S3 cobra desde el primer GB |

---

## 12. Notas sobre compatibilidad con macOS Big Sur 11.7

- macOS Big Sur 11.7 es el mínimo soportado por las herramientas instaladas.
- Node 22 LTS funciona correctamente en Big Sur.
- Expo Go en Android no depende de la versión de macOS.
- Si en algún momento se necesita build local (EAS Build local), puede requerir macOS más reciente. Para este proyecto usamos EAS Build en la nube, que no tiene esta limitación.

---

## 13. Documentos relacionados

- `00_PROJECT_BRIEF.md` — Contexto del proyecto.
- `02_DESIGN_SYSTEM.md` — Paleta y componentes visuales.
- `03_CODING_STANDARDS.md` — Convenciones de código.
- `10_SETUP_ENVIRONMENT.md` — Instalación de herramientas.
- `11_PROJECT_INITIALIZATION.md` — Comandos exactos de creación del proyecto Expo.

---

**Versión:** 2.0
**Fecha:** Mayo 2026
**Estado:** Aprobado — versiones actualizadas a Expo SDK 55, congeladas para desarrollo
