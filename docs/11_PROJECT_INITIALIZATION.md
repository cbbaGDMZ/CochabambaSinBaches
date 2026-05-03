# 11 — Project Initialization: Cochabamba Sin Baches

> **Documento ejecutable.** Contiene los comandos exactos para crear el proyecto Expo, instalar todas las dependencias, configurar NativeWind, Zustand, React Query, y dejar el proyecto listo para empezar a codear pantallas. Ejecutar en orden, sin saltarse ningún paso.

---

## Requisitos previos

- `10_SETUP_ENVIRONMENT.md` completado exitosamente.
- Node.js LTS, npm, Expo CLI funcionando.
- Repositorio `cochabamba-sin-baches` clonado en la máquina.
- Terminal abierta en la raíz del repositorio.

---

## Paso 1: Crear el proyecto Expo

Desde la raíz del repositorio (`cochabamba-sin-baches/`):

```bash
npx create-expo-app@latest mobile --template blank-typescript
```

**Qué hace:** Crea una carpeta `mobile/` dentro del repo con un proyecto Expo en blanco usando TypeScript.

**Resultado esperado:** Carpeta `mobile/` creada con `package.json`, `tsconfig.json`, `app.json`, etc.

Entrar a la carpeta del proyecto:
```bash
cd mobile
```

**A partir de aquí, TODOS los comandos se ejecutan dentro de `mobile/`.**

---

## Paso 2: Verificar que el proyecto base funciona

```bash
npx expo start
```

Escanear el QR code con Expo Go en tu teléfono Android. Debe aparecer una pantalla blanca con texto "Open up App.tsx to start working on your app!"

**Presionar `Ctrl+C` para detener el servidor después de verificar.**

Si funciona, hacer commit del proyecto base:
```bash
cd ..
git add mobile/
git commit -m "feat: initialize expo project with blank-typescript template"
git push
cd mobile
```

---

## Paso 3: Instalar Expo Router y navegación

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler react-native-reanimated
```

### 3.1 Configurar expo-router en package.json

Abrir `mobile/package.json` y agregar el campo `"main"`:

```json
{
  "name": "mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  ...
}
```

**Importante:** Reemplazar cualquier valor existente de `"main"` con `"expo-router/entry"`.

### 3.2 Configurar app.json para expo-router

Abrir `mobile/app.json` y reemplazar TODO el contenido con:

```json
{
  "expo": {
    "name": "Cochabamba Sin Baches",
    "slug": "cochabamba-sin-baches",
    "version": "0.1.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "cochabamba-sin-baches",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#0A0A0A"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.cochabambasinbaches.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A0A0A"
      },
      "package": "com.cochabambasinbaches.app",
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Cochabamba Sin Baches necesita acceso a tu cámara para fotografiar baches."
        }
      ],
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Cochabamba Sin Baches necesita tu ubicación para geolocalizar los reportes de baches."
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "Cochabamba Sin Baches necesita acceso a tus fotos para adjuntar evidencia de baches."
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### 3.3 Eliminar App.tsx

Expo Router usa file-based routing. El archivo `App.tsx` ya no se necesita:

```bash
rm App.tsx
```

### 3.4 Crear el root layout

Crear la carpeta `app/` y el archivo `_layout.tsx`:

```bash
mkdir -p app
```

Crear archivo `app/_layout.tsx` con este contenido:

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A0A' },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}
```

### 3.5 Crear pantalla index temporal

Crear archivo `app/index.tsx` con este contenido:

```tsx
import { View, Text } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0A', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#F5F5F5', fontSize: 24 }}>Cochabamba Sin Baches</Text>
      <Text style={{ color: '#A0A0A0', fontSize: 14, marginTop: 8 }}>Setup completo ✓</Text>
    </View>
  );
}
```

### 3.6 Verificar que expo-router funciona

```bash
npx expo start -c
```

El flag `-c` limpia la caché. En Expo Go debe aparecer pantalla negra con texto "Cochabamba Sin Baches" y "Setup completo ✓".

**Presionar `Ctrl+C` para detener después de verificar.**

---

## Paso 4: Instalar y configurar NativeWind (Tailwind para RN)

### 4.1 Instalar dependencias

```bash
npx expo install nativewind tailwindcss@3.4.17
```

### 4.2 Crear archivo tailwind.config.js

Crear archivo `mobile/tailwind.config.js` con este contenido:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        'surface-elevated': '#1E1E1E',
        'surface-hover': '#282828',
        'border-default': '#2A2A2A',
        'border-strong': '#3A3A3A',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A0A0A0',
        'text-tertiary': '#666666',
        'text-disabled': '#4A4A4A',
        'text-inverse': '#0A0A0A',
        accent: '#FF6B2C',
        'accent-hover': '#E55A1F',
        'accent-subtle': 'rgba(255, 107, 44, 0.1)',
        'accent-text': '#FF8A5C',
        success: '#34C759',
        'success-subtle': 'rgba(52, 199, 89, 0.1)',
        warning: '#FFD60A',
        'warning-subtle': 'rgba(255, 214, 10, 0.1)',
        error: '#FF3B30',
        'error-subtle': 'rgba(255, 59, 48, 0.1)',
        info: '#5AC8FA',
        'info-subtle': 'rgba(90, 200, 250, 0.1)',
      },
      fontFamily: {
        'poppins': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
      },
    },
  },
  plugins: [],
};
```

### 4.3 Crear archivo global.css

Crear archivo `mobile/global.css` con este contenido:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4.4 Configurar babel.config.js

Reemplazar el contenido de `mobile/babel.config.js` con:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

### 4.5 Configurar metro.config.js

Crear archivo `mobile/metro.config.js` con este contenido:

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### 4.6 Crear archivo nativewind-env.d.ts

Crear archivo `mobile/nativewind-env.d.ts` con este contenido:

```typescript
/// <reference types="nativewind/types" />
```

### 4.7 Importar global.css en el root layout

Actualizar `app/_layout.tsx` para importar los estilos globales:

```tsx
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A0A' },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}
```

### 4.8 Actualizar index.tsx para probar NativeWind

Reemplazar el contenido de `app/index.tsx` con:

```tsx
import { View, Text } from 'react-native';

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-4">
      <Text className="text-text-primary text-[24px] font-bold">
        Cochabamba Sin Baches
      </Text>
      <Text className="text-text-secondary text-[14px] mt-2">
        NativeWind configurado ✓
      </Text>
      <View className="mt-6 bg-accent rounded-xl px-6 py-3">
        <Text className="text-text-inverse text-[16px] font-bold">
          Botón de prueba
        </Text>
      </View>
    </View>
  );
}
```

### 4.9 Verificar NativeWind

```bash
npx expo start -c
```

Debe aparecer:
- Fondo negro (#0A0A0A)
- Texto blanco "Cochabamba Sin Baches"
- Texto gris "NativeWind configurado ✓"
- Botón naranja (#FF6B2C) con texto negro "Botón de prueba"

**Si el botón aparece naranja y el fondo es negro, NativeWind está funcionando correctamente.**

**Presionar `Ctrl+C` para detener.**

---

## Paso 5: Instalar Poppins (tipografía)

```bash
npx expo install @expo-google-fonts/poppins expo-font expo-splash-screen
```

### 5.1 Actualizar root layout con carga de fuentes

Reemplazar TODO el contenido de `app/_layout.tsx` con:

```tsx
import '../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

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
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A0A' },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}
```

### 5.2 Probar la fuente Poppins

Actualizar `app/index.tsx`:

```tsx
import { View, Text } from 'react-native';

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-4">
      <Text className="text-text-primary text-[28px] font-poppins-bold">
        Cochabamba Sin Baches
      </Text>
      <Text className="text-text-secondary text-[14px] mt-2 font-poppins">
        Poppins + NativeWind ✓
      </Text>
      <View className="mt-6 bg-accent rounded-xl px-6 py-3">
        <Text className="text-text-inverse text-[16px] font-poppins-bold">
          Botón de prueba
        </Text>
      </View>
    </View>
  );
}
```

```bash
npx expo start -c
```

**Verificar:** El texto se ve con tipografía Poppins (geométrica, redondeada), no con la fuente del sistema. La diferencia es visible especialmente en la "a" y la "e".

**Presionar `Ctrl+C` para detener.**

---

## Paso 6: Instalar dependencias de estado y networking

```bash
npm install zustand @tanstack/react-query axios
```

### 6.1 Crear configuración de React Query

Crear carpeta y archivo `src/config/query-client.ts`:

```bash
mkdir -p src/config
```

Archivo `src/config/query-client.ts`:

```tsx
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos (antes cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### 6.2 Agregar QueryClientProvider al root layout

Actualizar `app/_layout.tsx` — agregar el import y el provider:

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
      />
    </QueryClientProvider>
  );
}
```

### 6.3 Configurar path alias @/

Actualizar `mobile/tsconfig.json` — reemplazar TODO el contenido con:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
```

---

## Paso 7: Instalar dependencias de almacenamiento

```bash
npx expo install expo-sqlite expo-secure-store @react-native-async-storage/async-storage
```

---

## Paso 8: Instalar dependencias de cámara, ubicación y media

```bash
npx expo install expo-camera expo-image-picker expo-location expo-image expo-image-manipulator
```

---

## Paso 9: Instalar dependencias de mapas

```bash
npx expo install react-native-maps
```

---

## Paso 10: Instalar dependencias de notificaciones y conectividad

```bash
npx expo install expo-notifications expo-device @react-native-community/netinfo
```

---

## Paso 11: Instalar dependencias de autenticación OAuth

```bash
npx expo install expo-auth-session expo-web-browser expo-crypto
```

---

## Paso 12: Instalar dependencias de formularios y validación

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## Paso 13: Instalar dependencias de utilidades

```bash
npx expo install date-fns lucide-react-native react-native-svg
```

---

## Paso 14: Instalar dependencias de desarrollo

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

### 14.1 Crear configuración de Prettier

Crear archivo `mobile/.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "always",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 14.2 Crear configuración de VS Code para el proyecto

```bash
mkdir -p .vscode
```

Crear archivo `mobile/.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*[\"']([^\"']*)[\"']", ""],
    ["className\\s*=\\s*\\{[^}]*[\"']([^\"']*)[\"'][^}]*\\}", ""]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Crear archivo `mobile/.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "eamodio.gitlens",
    "usernamehw.errorlens"
  ]
}
```

---

## Paso 15: Verificación final completa

### 15.1 Verificar que el proyecto compila sin errores

```bash
npx tsc --noEmit
```

**Resultado esperado:** Sin errores. Si hay warnings menores de tipos, son aceptables en esta etapa.

### 15.2 Verificar que Expo inicia correctamente

```bash
npx expo start -c
```

Debe:
- Iniciar sin errores en la terminal.
- Mostrar QR code.
- En Expo Go: pantalla negra con "Cochabamba Sin Baches" en Poppins, botón naranja.

**Presionar `Ctrl+C` para detener.**

### 15.3 Verificar que todas las dependencias están instaladas

```bash
npx expo-doctor
```

**Resultado esperado:** Sin errores críticos. Puede haber warnings menores, eso está bien.

---

## Paso 16: Commit y push de todo el setup

```bash
cd ..
git add mobile/
git commit -m "feat: complete expo project setup with nativewind, poppins, react-query, and all dependencies"
git push
cd mobile
```

---

## Resumen de dependencias instaladas

### Dependencies (producción)

| Categoría | Paquetes |
|---|---|
| **Core** | `expo`, `react`, `react-native`, `expo-router` |
| **Navegación** | `react-native-screens`, `react-native-safe-area-context`, `expo-linking`, `react-native-gesture-handler`, `react-native-reanimated` |
| **Estilos** | `nativewind`, `tailwindcss` |
| **Estado** | `zustand` |
| **Networking** | `axios`, `@tanstack/react-query` |
| **Formularios** | `react-hook-form`, `zod`, `@hookform/resolvers` |
| **Storage** | `expo-sqlite`, `expo-secure-store`, `@react-native-async-storage/async-storage` |
| **Cámara/Media** | `expo-camera`, `expo-image-picker`, `expo-image`, `expo-image-manipulator` |
| **Ubicación** | `expo-location` |
| **Mapas** | `react-native-maps` |
| **Notificaciones** | `expo-notifications`, `expo-device` |
| **Conectividad** | `@react-native-community/netinfo` |
| **OAuth** | `expo-auth-session`, `expo-web-browser`, `expo-crypto` |
| **Iconos** | `lucide-react-native`, `react-native-svg` |
| **Utilidades** | `date-fns`, `expo-constants`, `expo-status-bar`, `expo-splash-screen`, `expo-font` |
| **Fuentes** | `@expo-google-fonts/poppins` |

### DevDependencies (desarrollo)

| Paquete | Propósito |
|---|---|
| `typescript` | Lenguaje |
| `@babel/core` | Transpilación |
| `prettier` | Formateo |
| `prettier-plugin-tailwindcss` | Orden de clases Tailwind |

---

## Archivos creados o modificados

| Archivo | Acción | Propósito |
|---|---|---|
| `app/_layout.tsx` | Creado | Root layout con providers |
| `app/index.tsx` | Creado | Pantalla temporal de verificación |
| `src/config/query-client.ts` | Creado | Configuración de React Query |
| `app.json` | Modificado | Config de Expo con plugins y permisos |
| `package.json` | Modificado | Entry point para expo-router |
| `tsconfig.json` | Modificado | Strict mode + path alias @/ |
| `babel.config.js` | Modificado | Preset de NativeWind |
| `metro.config.js` | Creado | Config de Metro para NativeWind |
| `tailwind.config.js` | Creado | Colores del design system |
| `global.css` | Creado | Tailwind directives |
| `nativewind-env.d.ts` | Creado | Types de NativeWind |
| `.prettierrc` | Creado | Config de Prettier |
| `.vscode/settings.json` | Creado | Config de VS Code |
| `.vscode/extensions.json` | Creado | Extensiones recomendadas |
| `App.tsx` | Eliminado | Ya no se necesita con expo-router |

---

## Siguiente paso

Proceder a `12_FOLDER_STRUCTURE.md` para crear toda la estructura de carpetas y archivos placeholder del proyecto.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Listo para ejecución
