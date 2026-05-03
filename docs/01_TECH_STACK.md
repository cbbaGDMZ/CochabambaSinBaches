# 01 — Tech Stack: Cochabamba Sin Baches

> **Documento de referencia técnica obligatoria.** Define el stack tecnológico completo con **versiones específicas**. Cualquier IA o desarrollador que instale dependencias DEBE respetar estas versiones para evitar incompatibilidades.

---

## 1. Filosofía del stack

- **Estabilidad sobre novedad**: usamos versiones LTS o estables, nunca betas o release candidates.
- **Free tier first**: todo el stack debe poder operar en planes gratuitos durante el desarrollo y la demo.
- **Expo Go obligatorio**: ninguna librería que requiera código nativo fuera del SDK oficial de Expo.
- **TypeScript estricto**: todo el código en TypeScript con `strict: true`.
- **Sin abandonware**: solo librerías con mantenimiento activo en los últimos 6 meses.

---

## 2. Stack global (resumen)

| Capa | Tecnología | Versión |
|---|---|---|
| App móvil | React Native + Expo | SDK 52 |
| Lenguaje móvil | TypeScript | 5.3.x |
| Estado global móvil | Zustand | 4.5.x |
| Estilos móvil | NativeWind | 4.1.x |
| Storage local | expo-sqlite | SDK 52 compatible |
| Mapas | react-native-maps | SDK 52 compatible |
| Backend | FastAPI (Python) | 0.115.x |
| Lenguaje backend | Python | 3.11.x |
| ORM | SQLAlchemy | 2.0.x |
| Base de datos | PostgreSQL + PostGIS | 16 / PostGIS 3.4 |
| Cache / broker | Redis | 7.2.x |
| Storage objetos | MinIO | RELEASE.2024-x |
| Tareas async | Celery | 5.4.x |
| Push notifications | Expo Notifications | SDK 52 |
| Dashboard web (futuro) | React + Vite | 18.3.x / 5.x |

---

## 3. Aplicación móvil — Stack detallado

### 3.1 Core

| Paquete | Versión | Propósito |
|---|---|---|
| `expo` | `~52.0.0` | Framework base, runtime Expo Go |
| `react` | `18.3.1` | Librería UI |
| `react-native` | `0.76.x` | Runtime nativo móvil |
| `typescript` | `~5.3.3` | Lenguaje |
| `@types/react` | `~18.3.12` | Tipos para React |

### 3.2 Navegación

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-router` | `~4.0.0` | Navegación file-based (estándar Expo SDK 52) |
| `react-native-screens` | `~4.4.0` | Pantallas nativas optimizadas |
| `react-native-safe-area-context` | `4.12.0` | Manejo de safe areas (notch, navbar) |

**Decisión:** Usamos `expo-router` (no React Navigation tradicional) porque es el estándar oficial actual de Expo y es file-based como Next.js.

### 3.3 Estilos

| Paquete | Versión | Propósito |
|---|---|---|
| `nativewind` | `^4.1.20` | Tailwind CSS para React Native |
| `tailwindcss` | `^3.4.17` | Engine de Tailwind |

**Decisión:** Tailwind v3 (no v4). NativeWind 4 todavía no soporta Tailwind v4 de forma estable.

### 3.4 Estado y formularios

| Paquete | Versión | Propósito |
|---|---|---|
| `zustand` | `^4.5.5` | Estado global (sesión, reportes pendientes) |
| `react-hook-form` | `^7.54.0` | Formularios performantes |
| `zod` | `^3.24.1` | Validación de schemas (compartido con backend) |
| `@hookform/resolvers` | `^3.9.1` | Bridge entre react-hook-form y zod |

### 3.5 Networking

| Paquete | Versión | Propósito |
|---|---|---|
| `axios` | `^1.7.9` | Cliente HTTP |
| `@tanstack/react-query` | `^5.62.0` | Cache de queries y mutations |

**Decisión:** Usamos React Query además de axios porque maneja automáticamente caché, reintentos, estados loading/error y actualizaciones optimistas.

### 3.6 Almacenamiento local

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-sqlite` | `~15.0.0` | Base de datos SQLite local (offline) |
| `expo-secure-store` | `~14.0.0` | Almacenamiento seguro de tokens JWT |
| `@react-native-async-storage/async-storage` | `1.23.1` | Storage simple key-value (preferencias) |

**Decisión clave:**
- Tokens JWT y refresh tokens → **siempre** en `expo-secure-store` (cifrado en hardware).
- Reportes pendientes offline → **expo-sqlite** (queries estructuradas).
- Preferencias simples (idioma, tema) → **AsyncStorage**.

### 3.7 Cámara, geolocalización y media

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-camera` | `~16.0.0` | Captura desde cámara |
| `expo-image-picker` | `~16.0.0` | Selección desde galería |
| `expo-location` | `~18.0.0` | Geolocalización GPS |
| `expo-image` | `~2.0.0` | Componente de imágenes optimizado |
| `expo-image-manipulator` | `~13.0.0` | Compresión y resize de imágenes antes de subir |

### 3.8 Mapas

| Paquete | Versión | Propósito |
|---|---|---|
| `react-native-maps` | `1.18.0` | Mapas nativos |

**Decisión:** En Expo Go, `react-native-maps` usa el provider por defecto del sistema (Apple Maps en iOS, Google Maps en Android sin API key con limitaciones). No usamos Mapbox porque requiere Dev Client.

### 3.9 Notificaciones y conectividad

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-notifications` | `~0.29.0` | Push notifications |
| `expo-device` | `~7.0.0` | Info del dispositivo (necesario para push tokens) |
| `@react-native-community/netinfo` | `11.4.1` | Detección de cambios de conectividad |

### 3.10 Autenticación OAuth

| Paquete | Versión | Propósito |
|---|---|---|
| `expo-auth-session` | `~6.0.0` | OAuth2 genérico (Google, Facebook, etc.) |
| `expo-web-browser` | `~14.0.0` | Browser embebido para OAuth |
| `expo-crypto` | `~14.0.0` | Generación de PKCE para OAuth seguro |

### 3.11 Utilidades

| Paquete | Versión | Propósito |
|---|---|---|
| `date-fns` | `^4.1.0` | Manejo de fechas (más ligero que moment) |
| `expo-constants` | `~17.0.0` | Acceso a variables de entorno y manifest |
| `expo-status-bar` | `~2.0.0` | Control de status bar |
| `expo-splash-screen` | `~0.29.0` | Splash screen nativo |
| `react-native-gesture-handler` | `~2.20.0` | Gestos avanzados |
| `react-native-reanimated` | `~3.16.0` | Animaciones performantes |

### 3.12 Desarrollo (devDependencies)

| Paquete | Versión | Propósito |
|---|---|---|
| `@babel/core` | `^7.25.0` | Transpilador |
| `eslint` | `^9.17.0` | Linter |
| `eslint-config-expo` | `~8.0.1` | Reglas ESLint para Expo |
| `prettier` | `^3.4.2` | Formateo de código |
| `prettier-plugin-tailwindcss` | `^0.6.9` | Ordenado automático de clases Tailwind |

---

## 4. Backend — Stack detallado

> **Nota:** El backend no es alcance de esta fase pero se documenta para que la app tenga referencia clara del contrato.

### 4.1 Core

| Paquete | Versión | Propósito |
|---|---|---|
| `python` | `3.11.x` | Lenguaje |
| `fastapi` | `^0.115.0` | Framework web async |
| `uvicorn[standard]` | `^0.32.0` | Servidor ASGI |
| `pydantic` | `^2.10.0` | Validación de schemas |
| `pydantic-settings` | `^2.7.0` | Configuración por env vars |

### 4.2 Base de datos

| Paquete | Versión | Propósito |
|---|---|---|
| `sqlalchemy` | `^2.0.36` | ORM |
| `geoalchemy2` | `^0.16.0` | Extensión SQLAlchemy para PostGIS |
| `alembic` | `^1.14.0` | Migraciones |
| `asyncpg` | `^0.30.0` | Driver async PostgreSQL |
| `psycopg2-binary` | `^2.9.10` | Driver sync (para Alembic) |

### 4.3 Autenticación

| Paquete | Versión | Propósito |
|---|---|---|
| `python-jose[cryptography]` | `^3.3.0` | JWT |
| `passlib[bcrypt]` | `^1.7.4` | Hashing de contraseñas |
| `python-multipart` | `^0.0.20` | Form data y file uploads |

### 4.4 Tareas async y storage

| Paquete | Versión | Propósito |
|---|---|---|
| `celery[redis]` | `^5.4.0` | Tareas asíncronas |
| `redis` | `^5.2.1` | Cliente Redis |
| `minio` | `^7.2.10` | Cliente MinIO (S3) |

### 4.5 Notificaciones

| Paquete | Versión | Propósito |
|---|---|---|
| `httpx` | `^0.28.0` | Cliente HTTP async (para llamar Expo Push API) |
| `exponent-server-sdk` | `^2.1.0` | SDK oficial Expo Push |

### 4.6 Desarrollo backend

| Paquete | Versión | Propósito |
|---|---|---|
| `pytest` | `^8.3.0` | Testing |
| `pytest-asyncio` | `^0.25.0` | Tests async |
| `httpx` | `^0.28.0` | Cliente para tests |
| `ruff` | `^0.8.0` | Linter + formatter (reemplaza black + flake8) |
| `mypy` | `^1.13.0` | Type checking |

---

## 5. Infraestructura

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

## 6. Versionado del proyecto

- **Convención de versiones**: [Semantic Versioning 2.0](https://semver.org/) (`MAJOR.MINOR.PATCH`).
- **Versión inicial del MVP**: `0.1.0`.
- **Versión de demo final**: `1.0.0`.
- **Branch strategy**: `main` (producción), `develop` (integración), `feature/*` (features), `fix/*` (bugs).

---

## 7. Reglas de actualización de dependencias

1. **Nunca actualizar versiones MAJOR** durante el desarrollo del MVP.
2. Las actualizaciones MINOR y PATCH se evalúan caso por caso.
3. Si Expo SDK lanza una nueva versión durante el desarrollo, **NO migrar** hasta entregar el MVP.
4. Nuevas dependencias deben pasar por revisión: ¿es estrictamente necesaria? ¿Tiene mantenimiento activo? ¿Funciona en Expo Go?
5. Toda dependencia agregada debe documentarse en este archivo con su propósito.

---

## 8. Lockfiles obligatorios

- `mobile/package-lock.json` → **debe versionarse en Git**.
- `backend/requirements.lock` o `backend/poetry.lock` → **debe versionarse en Git**.

Sin lockfiles, no hay reproducibilidad. La IA debe respetar los lockfiles existentes y nunca borrarlos.

---

## 9. Variables de entorno (referencia)

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

## 10. Decisiones técnicas explícitas (y por qué NO usamos otras alternativas)

| Decisión | Por qué SÍ | Por qué NO la alternativa |
|---|---|---|
| **React Native + Expo Go** sobre Flutter | Stack del estudiante, ecosistema npm | Flutter requería aprender Dart |
| **Expo Go** sobre Dev Client | Más simple, sin Android Studio | Dev Client necesita compilación nativa |
| **NativeWind** sobre StyleSheet | Consistente con dashboard React | StyleSheet más verboso, menos reutilizable |
| **Zustand** sobre Redux Toolkit | Menos boilerplate, ideal para alcance MVP | Redux Toolkit es overkill aquí |
| **expo-router** sobre React Navigation | Estándar oficial Expo SDK 52+ | React Navigation requiere config manual |
| **expo-sqlite** sobre WatermelonDB | Sin dependencias nativas extras | WatermelonDB requiere Dev Client |
| **react-native-maps** sobre Mapbox | Funciona en Expo Go sin API key | Mapbox requiere Dev Client |
| **Expo Notifications** sobre Firebase Messaging directo | Funciona en Expo Go | FCM directo requiere Dev Client |
| **PostgreSQL + PostGIS** sobre MongoDB | Queries espaciales nativas | MongoDB no tiene PostGIS |
| **FastAPI** sobre Django | Async nativo, OpenAPI auto, ligero | Django es más pesado para REST puro |
| **MinIO** sobre AWS S3 | Self-hosted, gratis | S3 cobra desde el primer GB |

---

## 11. Documentos relacionados

- `00_PROJECT_BRIEF.md` — Contexto del proyecto.
- `02_DESIGN_SYSTEM.md` — Paleta y componentes visuales.
- `03_CODING_STANDARDS.md` — Convenciones de código.
- `10_SETUP_ENVIRONMENT.md` — Instalación de herramientas.
- `11_PROJECT_INITIALIZATION.md` — Comandos exactos de creación del proyecto Expo.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Aprobado — versiones congeladas para inicio de desarrollo
