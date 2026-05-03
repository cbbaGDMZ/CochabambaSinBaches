# 02 — Design System: Cochabamba Sin Baches

> **Documento de referencia visual obligatoria.** Define colores, tipografía, espaciado, iconografía, componentes base y reglas de diseño. Cualquier IA que genere pantallas o componentes DEBE respetar este sistema sin improvisaciones. Si algo no está definido aquí, preguntar antes de inventar.

---

## 1. Filosofía de diseño

- **Dark-first**: toda la app opera en modo oscuro. No hay modo claro.
- **Minimalista**: mucho espacio en blanco (espacio negativo oscuro), poco texto, sin ruido visual.
- **Naranja estratégico**: el naranja NO es color secundario ni de fondo. Es un color de **acento quirúrgico** que destaca SOLO elementos de acción crítica (CTAs principales, badges urgentes, indicadores activos). Si todo es naranja, nada destaca.
- **iOS-inspired**: bordes redondeados suaves, transiciones fluidas, jerarquía visual clara.
- **Accesible**: contraste mínimo WCAG AA (4.5:1 para texto, 3:1 para elementos grandes).

---

## 2. Paleta de colores

### 2.1 Colores base (fondos y superficies)

| Token | Hex | Uso | Clase Tailwind |
|---|---|---|---|
| `background` | `#0A0A0A` | Fondo principal de la app | `bg-[#0A0A0A]` |
| `surface` | `#141414` | Fondo de cards, modals, bottom sheets | `bg-[#141414]` |
| `surface-elevated` | `#1E1E1E` | Fondo de inputs, elementos elevados | `bg-[#1E1E1E]` |
| `surface-hover` | `#282828` | Estado hover/pressed sobre superficies | `bg-[#282828]` |
| `border` | `#2A2A2A` | Bordes y separadores sutiles | `border-[#2A2A2A]` |
| `border-strong` | `#3A3A3A` | Bordes más visibles (inputs activos) | `border-[#3A3A3A]` |

### 2.2 Colores de texto

| Token | Hex | Uso | Clase Tailwind |
|---|---|---|---|
| `text-primary` | `#F5F5F5` | Texto principal (títulos, contenido) | `text-[#F5F5F5]` |
| `text-secondary` | `#A0A0A0` | Texto secundario (subtítulos, labels) | `text-[#A0A0A0]` |
| `text-tertiary` | `#666666` | Texto terciario (placeholders, hints) | `text-[#666666]` |
| `text-disabled` | `#4A4A4A` | Texto deshabilitado | `text-[#4A4A4A]` |
| `text-inverse` | `#0A0A0A` | Texto sobre fondos claros (botón naranja) | `text-[#0A0A0A]` |

### 2.3 Color de acento (naranja)

| Token | Hex | Uso | Clase Tailwind |
|---|---|---|---|
| `accent` | `#FF6B2C` | CTA principal, indicadores activos, badges urgentes | `bg-[#FF6B2C]` o `text-[#FF6B2C]` |
| `accent-hover` | `#E55A1F` | Estado pressed del acento | `bg-[#E55A1F]` |
| `accent-subtle` | `#FF6B2C1A` | Fondo sutil con acento (10% opacidad) | `bg-[#FF6B2C]/10` |
| `accent-text` | `#FF8A5C` | Texto naranja legible sobre fondos oscuros | `text-[#FF8A5C]` |

**Reglas estrictas del naranja:**
1. SOLO en botones primarios (CTA principal de la pantalla — máximo 1 por pantalla).
2. SOLO en badges de estado urgente (prioridad alta, reportes críticos).
3. SOLO en el indicador activo de la navegación inferior (tab activo).
4. SOLO en iconos que representan la acción principal.
5. NUNCA en fondos grandes, headers, backgrounds de secciones.
6. NUNCA en bordes decorativos.
7. NUNCA en más de 3 elementos visibles simultáneamente en una pantalla.

### 2.4 Colores semánticos (estados)

| Token | Hex | Uso | Clase Tailwind |
|---|---|---|---|
| `success` | `#34C759` | Éxito, completado, "Reparado" | `text-[#34C759]` |
| `success-subtle` | `#34C7591A` | Fondo sutil de éxito | `bg-[#34C759]/10` |
| `warning` | `#FFD60A` | Advertencia, "En revisión", "En progreso" | `text-[#FFD60A]` |
| `warning-subtle` | `#FFD60A1A` | Fondo sutil de advertencia | `bg-[#FFD60A]/10` |
| `error` | `#FF3B30` | Error, validación fallida | `text-[#FF3B30]` |
| `error-subtle` | `#FF3B301A` | Fondo sutil de error | `bg-[#FF3B30]/10` |
| `info` | `#5AC8FA` | Información, "Pendiente" | `text-[#5AC8FA]` |
| `info-subtle` | `#5AC8FA1A` | Fondo sutil de info | `bg-[#5AC8FA]/10` |

### 2.5 Colores de estado de reporte (mapeo directo)

| Estado | Color | Badge bg | Badge text |
|---|---|---|---|
| Pendiente | `info` (#5AC8FA) | `bg-[#5AC8FA]/10` | `text-[#5AC8FA]` |
| En revisión | `warning` (#FFD60A) | `bg-[#FFD60A]/10` | `text-[#FFD60A]` |
| Asignado | `accent-text` (#FF8A5C) | `bg-[#FF6B2C]/10` | `text-[#FF8A5C]` |
| En progreso | `warning` (#FFD60A) | `bg-[#FFD60A]/10` | `text-[#FFD60A]` |
| Reparado | `success` (#34C759) | `bg-[#34C759]/10` | `text-[#34C759]` |

---

## 3. Tipografía

### 3.1 Familia tipográfica

**Poppins** (Google Fonts, licencia OFL — gratuita).

Instalación en Expo:
```
npx expo install @expo-google-fonts/poppins expo-font
```

Pesos a cargar (SOLO estos, no cargar más para no afectar performance):
- `Poppins_400Regular` — Texto body
- `Poppins_500Medium` — Labels, subtítulos
- `Poppins_600SemiBold` — Títulos de sección
- `Poppins_700Bold` — Títulos principales, CTAs

### 3.2 Escala tipográfica

| Token | Tamaño | Peso | Line Height | Uso |
|---|---|---|---|---|
| `heading-xl` | 28px | Bold (700) | 36px | Título de pantalla principal |
| `heading-lg` | 24px | SemiBold (600) | 32px | Títulos de sección |
| `heading-md` | 20px | SemiBold (600) | 28px | Subtítulos de sección |
| `heading-sm` | 18px | SemiBold (600) | 24px | Títulos de cards |
| `body-lg` | 16px | Regular (400) | 24px | Texto principal de contenido |
| `body-md` | 14px | Regular (400) | 20px | Texto secundario, descripciones |
| `body-sm` | 12px | Medium (500) | 16px | Labels, captions, badges |
| `body-xs` | 10px | Medium (500) | 14px | Timestamps, metadata mínima |

### 3.3 Clases Tailwind para tipografía

```
heading-xl → className="text-[28px] font-bold leading-[36px] font-poppins"
heading-lg → className="text-[24px] font-semibold leading-[32px] font-poppins"
heading-md → className="text-[20px] font-semibold leading-[28px] font-poppins"
heading-sm → className="text-[18px] font-semibold leading-[24px] font-poppins"
body-lg    → className="text-[16px] font-normal leading-[24px] font-poppins"
body-md    → className="text-[14px] font-normal leading-[20px] font-poppins"
body-sm    → className="text-[12px] font-medium leading-[16px] font-poppins"
body-xs    → className="text-[10px] font-medium leading-[14px] font-poppins"
```

### 3.4 Regla de tamaño mínimo

Ningún texto en la app debe ser menor a **12px** (body-sm). El token `body-xs` (10px) se usa SOLO para timestamps y metadata no esencial.

---

## 4. Espaciado

### 4.1 Sistema de espaciado (base 4px)

| Token | Valor | Uso común |
|---|---|---|
| `space-1` | 4px | Separación mínima entre elementos inline |
| `space-2` | 8px | Padding interno de badges, gap entre iconos y texto |
| `space-3` | 12px | Padding interno de inputs, separación de items en listas |
| `space-4` | 16px | Padding horizontal de pantallas, gap entre cards |
| `space-5` | 20px | Margen entre secciones pequeñas |
| `space-6` | 24px | Padding vertical de cards, margen entre secciones |
| `space-8` | 32px | Separación entre bloques principales |
| `space-10` | 40px | Margen superior de títulos de pantalla |
| `space-12` | 48px | Altura de botones, inputs |
| `space-16` | 64px | Altura de headers, separación mayor |

### 4.2 Reglas de padding de pantalla

- **Padding horizontal global**: 16px (`px-4`) en ambos lados.
- **Padding top**: varía según la pantalla (Safe Area + espacio).
- **Padding bottom**: mínimo 16px + alto del tab bar (si tiene).
- **ScrollView**: siempre `contentContainerStyle` con `paddingBottom: 100` para que el contenido no quede detrás del tab bar.

### 4.3 Reglas de espaciado entre elementos

- **Entre título de pantalla y primer contenido**: 24px (`mb-6`).
- **Entre cards en lista**: 12px (`gap-3` o `mb-3`).
- **Entre secciones**: 32px (`mb-8`).
- **Entre label y input**: 8px (`mb-2`).
- **Entre input e input (en formulario)**: 16px (`mb-4`).
- **Entre último input y botón submit**: 24px (`mt-6`).

---

## 5. Bordes y esquinas

### 5.1 Border radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8px | Badges, chips, tags |
| `radius-md` | 12px | Inputs, botones |
| `radius-lg` | 16px | Cards, modals |
| `radius-xl` | 24px | Bottom sheets, containers grandes |
| `radius-full` | 9999px | Avatares, indicadores circulares |

### 5.2 Clases Tailwind

```
radius-sm  → rounded-lg       (8px)
radius-md  → rounded-xl       (12px)
radius-lg  → rounded-2xl      (16px)
radius-xl  → rounded-3xl      (24px)
radius-full → rounded-full    (circle)
```

### 5.3 Bordes

- **Grosor estándar**: 1px (`border`).
- **Color por defecto**: `border-[#2A2A2A]`.
- **Bordes NO en todos los componentes**: solo en inputs, cards con separación necesaria y divisores.
- **Prefiero sombras o diferencia de superficie** sobre bordes visibles para separar elementos.

---

## 6. Sombras y elevación

En dark mode las sombras tradicionales no funcionan bien. Usamos **diferencia de superficie** como elevación principal y sombras sutiles solo para modals y bottom sheets.

| Nivel | Estrategia | Ejemplo |
|---|---|---|
| Nivel 0 (base) | `background` (#0A0A0A) | Fondo de pantalla |
| Nivel 1 (card) | `surface` (#141414) | Cards, list items |
| Nivel 2 (elevated) | `surface-elevated` (#1E1E1E) | Inputs, dropdowns |
| Nivel 3 (modal) | `surface-elevated` + sombra | Modals, bottom sheets |

Sombra para modals y bottom sheets:
```
style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.5, shadowRadius: 16, elevation: 12 }}
```

---

## 7. Iconografía

### 7.1 Librería

**Lucide Icons** vía `lucide-react-native`.

Instalación:
```
npm install lucide-react-native react-native-svg
```

**Decisión:** Lucide sobre Ionicons o MaterialIcons porque: es más consistente visualmente, tiene estilo outline que combina mejor con dark mode minimalista, y es la misma librería que shadcn/ui (consistencia con el dashboard futuro).

### 7.2 Tamaños de iconos

| Contexto | Tamaño | Stroke width |
|---|---|---|
| Tab bar | 24px | 1.5 |
| Botones con icono | 20px | 1.5 |
| Dentro de inputs | 20px | 1.5 |
| Headers / navegación | 24px | 2 |
| Ilustraciones vacías | 48px | 1 |
| Badges / indicadores | 16px | 2 |

### 7.3 Colores de iconos

- **Iconos normales**: `text-secondary` (#A0A0A0).
- **Iconos activos** (tab seleccionado): `accent` (#FF6B2C).
- **Iconos en botón primario**: `text-inverse` (#0A0A0A).
- **Iconos en botón secundario**: `text-primary` (#F5F5F5).
- **Iconos de estado**: usan el color semántico correspondiente.

---

## 8. Componentes base

### 8.1 Botón primario (CTA)

```
Fondo: accent (#FF6B2C)
Texto: text-inverse (#0A0A0A), body-lg, Bold
Altura: 48px
Padding horizontal: 24px
Border radius: radius-md (12px)
Estado pressed: accent-hover (#E55A1F) + scale(0.98)
Estado disabled: opacity 40%
Ancho: 100% del contenedor padre
Animación press: scale down a 0.98 con Reanimated (150ms, ease-out)

Clase completa:
className="w-full h-12 bg-[#FF6B2C] rounded-xl items-center justify-center active:bg-[#E55A1F]"
<Text className="text-[#0A0A0A] text-[16px] font-bold font-poppins">
```

**Regla:** máximo 1 botón primario (naranja) por pantalla. Si hay más acciones, usar botón secundario o ghost.

### 8.2 Botón secundario

```
Fondo: transparent
Borde: 1px border-strong (#3A3A3A)
Texto: text-primary (#F5F5F5), body-lg, SemiBold
Altura: 48px
Border radius: radius-md (12px)
Estado pressed: surface-hover (#282828) + scale(0.98)

Clase completa:
className="w-full h-12 border border-[#3A3A3A] rounded-xl items-center justify-center active:bg-[#282828]"
<Text className="text-[#F5F5F5] text-[16px] font-semibold font-poppins">
```

### 8.3 Botón ghost (texto)

```
Fondo: transparent
Texto: accent-text (#FF8A5C) o text-secondary (#A0A0A0), body-md, Medium
Sin borde
Estado pressed: opacity 70%

Clase completa:
className="py-2 px-4 active:opacity-70"
<Text className="text-[#FF8A5C] text-[14px] font-medium font-poppins">
```

### 8.4 Input de texto

```
Fondo: surface-elevated (#1E1E1E)
Borde: 1px border (#2A2A2A)
Borde enfocado: 1px accent (#FF6B2C)
Texto input: text-primary (#F5F5F5), body-lg
Placeholder: text-tertiary (#666666)
Label encima: text-secondary (#A0A0A0), body-sm, Medium
Altura: 48px
Padding horizontal: 16px
Border radius: radius-md (12px)
Error: borde error (#FF3B30), mensaje debajo en error (#FF3B30), body-sm

Clase completa (normal):
className="w-full h-12 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl px-4 text-[#F5F5F5] text-[16px] font-poppins"

Clase completa (enfocado):
className="w-full h-12 bg-[#1E1E1E] border border-[#FF6B2C] rounded-xl px-4 text-[#F5F5F5] text-[16px] font-poppins"

Clase completa (error):
className="w-full h-12 bg-[#1E1E1E] border border-[#FF3B30] rounded-xl px-4 text-[#F5F5F5] text-[16px] font-poppins"
```

### 8.5 Card

```
Fondo: surface (#141414)
Borde: 1px border (#2A2A2A)
Border radius: radius-lg (16px)
Padding: 16px
Estado pressed (si es tappable): surface-hover (#282828) + scale(0.99)

Clase completa:
className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4"
```

### 8.6 Badge de estado

```
Fondo: color semántico con 10% opacidad
Texto: color semántico, body-sm, Medium
Padding: 4px horizontal 8px
Border radius: radius-sm (8px)

Ejemplo "Pendiente":
className="bg-[#5AC8FA]/10 px-2 py-1 rounded-lg"
<Text className="text-[#5AC8FA] text-[12px] font-medium font-poppins">Pendiente</Text>

Ejemplo "Reparado":
className="bg-[#34C759]/10 px-2 py-1 rounded-lg"
<Text className="text-[#34C759] text-[12px] font-medium font-poppins">Reparado</Text>
```

### 8.7 Tab Bar (navegación inferior)

```
Fondo: surface (#141414)
Borde superior: 1px border (#2A2A2A)
Altura: 60px + Safe Area bottom
Ícono inactivo: text-tertiary (#666666), 24px
Ícono activo: accent (#FF6B2C), 24px
Label inactivo: text-tertiary (#666666), body-xs (10px)
Label activo: accent (#FF6B2C), body-xs (10px), Medium
Indicador activo: punto naranja debajo del ícono (4px, rounded-full, accent)
```

### 8.8 Header de pantalla

```
Fondo: background (#0A0A0A) — transparente, se funde con el fondo
Título: text-primary (#F5F5F5), heading-lg (24px), SemiBold
Botón back: ícono ChevronLeft, 24px, text-primary
Altura: 56px + Safe Area top
Sin borde inferior (minimalista)
```

### 8.9 Divisor / Separador

```
Color: border (#2A2A2A)
Grosor: 1px
Margen vertical: 16px

Clase: className="h-px bg-[#2A2A2A] my-4"
```

### 8.10 Loading spinner

```
Color: accent (#FF6B2C)
Tamaño estándar: 24px
Tamaño pantalla completa: 40px
Siempre centrado en su contenedor
```

### 8.11 Empty state (pantalla vacía)

```
Ícono: 48px, text-tertiary (#666666), stroke 1
Título: text-secondary (#A0A0A0), heading-sm (18px)
Descripción: text-tertiary (#666666), body-md (14px), centrado
CTA (si aplica): botón secundario, no primario
Todo centrado vertical y horizontalmente
```

### 8.12 Toast / Snackbar

```
Fondo: surface-elevated (#1E1E1E)
Borde izquierdo: 3px del color semántico (success, error, warning, info)
Texto: text-primary (#F5F5F5), body-md
Border radius: radius-md (12px)
Posición: bottom, 16px de margen horizontal, encima del tab bar
Duración: 3 segundos
Animación: slide up + fade in (300ms)
```

---

## 9. Animaciones

### 9.1 Librería

**react-native-reanimated** (ya incluido en Expo SDK 52).

### 9.2 Catálogo de animaciones

| Animación | Duración | Easing | Uso |
|---|---|---|---|
| **Fade in** | 300ms | ease-out | Aparición de contenido al cargar |
| **Fade out** | 200ms | ease-in | Desaparición de elementos |
| **Slide up** | 400ms | ease-out (spring) | Bottom sheets, toasts, modals |
| **Slide right** | 300ms | ease-out | Transición entre pantallas (push) |
| **Scale press** | 150ms | ease-out | Botones y cards al presionar (0.98) |
| **Scale card** | 150ms | ease-out | Cards al presionar (0.99) |
| **Skeleton pulse** | 1500ms | ease-in-out (loop) | Loading placeholders |

### 9.3 Reglas de animación

1. **Todas las animaciones usan Reanimated**, nunca `Animated` de React Native base.
2. Duración máxima de cualquier animación: 500ms. Nada debe sentirse lento.
3. No animar color de fondo (es costoso en RN). Animar opacidad y transform.
4. Loading skeletons en todas las pantallas que cargan datos de la API.
5. Las transiciones entre pantallas las maneja `expo-router` automáticamente (stack push = slide right).

---

## 10. Imágenes y fotos

### 10.1 Componente

Usar `expo-image` (no `<Image>` de React Native). Es más rápido, tiene caché y soporte para blurhash.

### 10.2 Fotos de reportes

| Propiedad | Valor |
|---|---|
| Aspect ratio en cards de lista | 16:9 |
| Aspect ratio en detalle | 4:3 |
| Border radius | radius-md (12px) |
| Placeholder mientras carga | Skeleton pulse con fondo surface-elevated (#1E1E1E) |
| Error de carga | Ícono ImageOff (Lucide), centrado, text-tertiary |

### 10.3 Fotos de perfil / avatar

| Propiedad | Valor |
|---|---|
| Tamaño en header | 36px × 36px |
| Tamaño en perfil | 80px × 80px |
| Border radius | radius-full (circle) |
| Placeholder | Iniciales del usuario sobre fondo accent-subtle (#FF6B2C1A), texto accent |
| Borde | 2px border (#2A2A2A) |

### 10.4 Compresión antes de subir

- Formato: JPEG.
- Calidad: 70%.
- Ancho máximo: 1200px (mantener aspect ratio).
- Usar `expo-image-manipulator` para resize y compresión.

---

## 11. Mapas

### 11.1 Estilo del mapa

Usar estilo oscuro para el mapa que sea consistente con el theme de la app. Configurar `customMapStyle` con un JSON style oscuro (Google Maps dark theme compatible).

### 11.2 Marcadores de reportes en mapa

| Prioridad IPB | Color del marcador | Tamaño |
|---|---|---|
| Alta (IPB ≥ 7) | `error` (#FF3B30) | 32px |
| Media (IPB 4-6.9) | `warning` (#FFD60A) | 28px |
| Baja (IPB < 4) | `info` (#5AC8FA) | 24px |
| Propio del usuario | `accent` (#FF6B2C) con borde blanco | 32px |

### 11.3 Marcador de ubicación actual

- Color: `accent` (#FF6B2C).
- Estilo: punto con pulso de animación (radio creciente con opacidad decreciente).
- Tamaño punto: 12px.
- Tamaño pulso máximo: 40px.

---

## 12. Patrones de pantalla

### 12.1 Estructura base de pantalla

```
<SafeAreaView> (fondo: background)
  <StatusBar style="light" />
  <ScrollView> (padding horizontal: 16px)
    <Header /> (si aplica)
    <Contenido />
  </ScrollView>
  <TabBar /> (si aplica)
</SafeAreaView>
```

### 12.2 Estados de pantalla

Toda pantalla que carga datos de la API debe manejar estos 4 estados:

| Estado | Qué muestra |
|---|---|
| **Loading** | Skeleton placeholders (nunca spinner en pantalla completa excepto splash) |
| **Success** | Contenido normal |
| **Empty** | Empty state (ícono + título + descripción + CTA opcional) |
| **Error** | Mensaje de error + botón "Reintentar" (botón secundario) |

### 12.3 Pull to refresh

Disponible en todas las pantallas con listas. Color del indicador: `accent` (#FF6B2C).

---

## 13. Textos de la app (UI copy)

Idioma: **español de Bolivia**.

### 13.1 Reglas de copy

- Tutear al usuario: "Reporta un bache" (no "Reporte un bache").
- Frases cortas y directas. Máximo 2 líneas por descripción.
- No usar jerga técnica. "Tu reporte está siendo revisado" (no "El ticket se encuentra en estado de triaje").
- Mensajes de error deben decir QUÉ pasó y QUÉ hacer: "No hay conexión. Tu reporte se guardó y se enviará automáticamente." (no solo "Error de red").

### 13.2 Textos estándar

| Contexto | Texto |
|---|---|
| Sin conexión | "Sin conexión. Tus reportes se guardarán y enviarán automáticamente." |
| Sin reportes propios | "Aún no tienes reportes. ¡Reporta tu primer bache!" |
| Sin reportes en zona | "No hay reportes en esta zona." |
| Error genérico | "Algo salió mal. Intenta de nuevo." |
| Reporte enviado | "¡Reporte enviado! Te notificaremos cuando haya novedades." |
| Reporte guardado offline | "Reporte guardado. Se enviará cuando tengas conexión." |
| Cargando | (no mostrar texto, usar skeletons) |

---

## 14. Configuración de Tailwind (tailwind.config.js)

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
        poppins: ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
      },
      borderRadius: {
        'sm-custom': '8px',
        'md-custom': '12px',
        'lg-custom': '16px',
        'xl-custom': '24px',
      },
    },
  },
  plugins: [],
};
```

---

## 15. Checklist de validación visual

Antes de marcar cualquier pantalla como terminada, la IA debe verificar:

- [ ] Fondo de la pantalla es `background` (#0A0A0A).
- [ ] Toda superficie elevada usa `surface` (#141414) o `surface-elevated` (#1E1E1E).
- [ ] El naranja (#FF6B2C) aparece en máximo 3 elementos de la pantalla.
- [ ] El botón primario naranja aparece máximo 1 vez en la pantalla.
- [ ] Todos los textos usan la familia Poppins.
- [ ] Ningún texto es menor a 12px.
- [ ] Los inputs tienen estado normal, enfocado y error definidos.
- [ ] La pantalla maneja los 4 estados: loading, success, empty, error.
- [ ] El padding horizontal de la pantalla es 16px.
- [ ] Los colores de texto respetan la jerarquía: primary > secondary > tertiary.
- [ ] Las imágenes usan `expo-image`, no `<Image>`.
- [ ] Los iconos son de Lucide y usan los tamaños correctos.
- [ ] Las animaciones usan Reanimated, no Animated base.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Aprobado — sistema de diseño congelado para desarrollo
