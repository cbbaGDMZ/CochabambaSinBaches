# 00 — Project Brief: Cochabamba Sin Baches

> **Documento de contexto fundamental.** Cualquier IA, desarrollador o colaborador que trabaje en este proyecto debe leer este documento ANTES de cualquier otro. Define qué se construye, para quién, por qué y con qué límites.

---

## 1. Identidad del proyecto

| Campo | Valor |
|---|---|
| **Nombre** | Cochabamba Sin Baches |
| **Tipo** | Aplicación móvil de reporte ciudadano |
| **Plataforma objetivo** | Android (iOS fuera de alcance en esta fase) |
| **Modalidad** | Proyecto Integrador académico — Universidad Privada Franz Tamayo |
| **Audiencia de validación** | Usuarios reales en demo controlada + tribunal académico |
| **Estudiante responsable** | Gaston Diego Mancilla Zurita |
| **Tutora académica** | Monica Liz Uztariz Vasquez |

---

## 2. Problema que resuelve

El municipio de Cercado (Cochabamba, Bolivia) enfrenta una crisis estructural en la gestión del mantenimiento vial. Las vías presentan deterioro acelerado y la respuesta institucional de la Alcaldía es **reactiva, desorganizada y opaca**. Los mecanismos actuales de reporte ciudadano (llamadas telefónicas, redes sociales, WhatsApp) presentan estos problemas:

- No generan registros geolocalizados.
- No tienen trazabilidad ni retroalimentación al ciudadano.
- No alimentan ningún sistema de gestión.
- Las reparaciones se ejecutan por presión política o mediática, no por criterios técnicos.
- Zonas periféricas como la Zona Sur quedan sistemáticamente desatendidas.

El ciudadano reporta, pero no sabe qué pasó con su reporte. Esta desconexión erosiona la confianza institucional y multiplica los costos correctivos.

---

## 3. Solución propuesta (visión completa del producto)

Plataforma informática compuesta por dos sistemas:

1. **Aplicación móvil ciudadana** (alcance de esta fase).
2. **Dashboard web para la Alcaldía** (alcance de fases futuras).

La aplicación móvil permite al ciudadano reportar baches mediante fotografía geolocalizada, dar seguimiento a sus reportes y visualizar daños cercanos en su zona. El backend procesa los reportes aplicando un algoritmo de priorización (IPB — Índice de Prioridad de Bache) y los expone al dashboard de la Alcaldía para gestión operativa.

---

## 4. Alcance de ESTA fase (MVP — semestre actual)

### ✅ Dentro del alcance

- **Aplicación móvil React Native + Expo Go** para ciudadanos.
- **Backend FastAPI** que reciba reportes, los persista y exponga endpoints REST.
- **Autenticación** email/contraseña + Google OAuth2.
- **Persistencia local SQLite** para modo offline.
- **Notificaciones push** vía Expo Notifications.
- **Despliegue de demo** funcional para defensa académica con usuarios reales.

### ❌ Fuera del alcance (fases futuras)

- Dashboard web para la Alcaldía.
- Roles OPERADOR y ADMIN (en esta fase solo existe rol CIUDADANO en la app).
- Mapa de calor, métricas y gestión de estados por operadores.
- Integración con SEMAPA, POA, OTBs.
- Inteligencia Artificial para mantenimiento predictivo.
- Versión iOS de la aplicación.

---

## 5. Zona geográfica cubierta

**Municipio de Cercado, Cochabamba, Bolivia.**

Coordenadas centrales aproximadas: **-17.3895, -66.1568**.

La aplicación filtrará reportes y mostrará el mapa centrado en esta región.

---

## 6. Usuarios objetivo

### Usuario primario: Ciudadano

| Atributo | Descripción |
|---|---|
| **Edad** | 18 a 60 años |
| **Perfil** | Conductor o residente del municipio de Cercado |
| **Dispositivo** | Smartphone Android (gama media o baja predominante) |
| **Conectividad** | Intermitente (3G/4G con zonas sin cobertura) |
| **Alfabetización digital** | Básica a media — usa WhatsApp, redes sociales, apps de delivery |
| **Motivación** | Frustración con baches que dañan su vehículo, pérdida de tiempo en tráfico |
| **Frecuencia de uso esperada** | Eventual (cuando encuentra un bache nuevo) |

### Usuario secundario: Operador municipal (NO en esta fase)

Se documenta solo como referencia. La app de esta fase no expone funcionalidad para este rol.

---

## 7. Requerimientos funcionales (RFs ajustados al MVP)

### Activos en esta fase

| ID | Nombre | Descripción breve |
|---|---|---|
| **RF-01** | Registro e inicio de sesión | Email/contraseña + Google OAuth2 con JWT y refresh token |
| **RF-02** | Creación de reportes viales | Foto + GPS + tipo de daño + descripción opcional |
| **RF-03** | Funcionamiento offline y sincronización | SQLite local + sync automática al recuperar conexión |
| **RF-05** | Notificaciones push al ciudadano | Estados: Pendiente, En revisión, Asignado, En progreso, Reparado |
| **RF-09** | Almacenamiento de fotografías | Subida al backend (que las persiste en MinIO) |
| **RF-11** | Historial de reportes propios | Lista de reportes del usuario con estado y fecha |
| **RF-12** | Detalle de reporte propio | Foto, ubicación, estado, timeline de cambios |
| **RF-13** | Mapa de reportes cercanos | Mapa con reportes propios + reportes de la zona |
| **RF-14** | Edición de perfil | Nombre, foto de perfil, datos básicos |

### Modificados (delegados al backend o al rol CIUDADANO únicamente)

| ID | Cambio respecto al original |
|---|---|
| **RF-04** | El cálculo IPB lo hace el backend de forma asíncrona. La app solo consume el valor calculado. |
| **RF-10** | En esta fase la app solo gestiona el rol CIUDADANO. Los demás roles existen en el backend pero no tienen UI. |

### Fuera del alcance de esta fase

- RF-06 (panel con mapa interactivo de operadores)
- RF-07 (gestión de estados por OPERADOR/ADMIN)
- RF-08 (métricas y dashboards)

---

## 8. Requerimientos no funcionales

### Performance
- Tiempo de carga inicial de la app: ≤ 3 segundos en gama media.
- Tiempo de respuesta al crear un reporte (con conexión): ≤ 2 segundos.
- La app debe ser usable con conexión 3G.

### Disponibilidad
- La app debe funcionar 100% offline para crear reportes.
- La sincronización debe ser automática al recuperar conexión, sin acción del usuario.

### Usabilidad
- Idioma: español (Bolivia).
- Flujo de creación de reporte: máximo 3 toques desde el home.
- Tipografía mínima: 14px.
- La app debe seguir lineamientos del Material Design adaptados al diseño dark con acento naranja.

### Seguridad
- Tokens JWT almacenados en `expo-secure-store` (no en AsyncStorage).
- Contraseñas nunca se almacenan en el dispositivo.
- HTTPS obligatorio en todas las llamadas a la API.
- Refresh token con rotación.

### Privacidad
- La ubicación se solicita solo al momento de crear un reporte (no en background).
- Las fotos no se suben a servicios de terceros, solo al backend del proyecto.

---

## 9. Restricciones técnicas

- **Expo Go obligatorio** (no Expo Dev Client en esta fase). Esto limita los módulos nativos a los oficiales de Expo SDK.
- **Sin servicios pagos**: usar tiers gratuitos de hosting (Render, Railway), Firebase free tier, OpenStreetMap (no Google Maps con costo).
- **Solo Android** para esta fase (iOS fuera de alcance).

---

## 10. Criterios de éxito del MVP

El MVP se considera exitoso si en la demo final:

1. Un usuario puede registrarse, hacer login y cerrar sesión sin errores.
2. Un usuario puede crear un reporte con foto + GPS + tipo de daño en menos de 30 segundos.
3. Un reporte creado offline se sincroniza correctamente al recuperar conexión.
4. El usuario ve su reporte en el mapa y en su historial inmediatamente después de crearlo (online) o tras la sincronización (offline).
5. El usuario recibe una notificación push al cambiar el estado de su reporte.
6. La app no crashea en una sesión de uso de 5 minutos en un dispositivo Android gama media.
7. Al menos 5 usuarios reales completan el flujo completo en la demo controlada sin asistencia.

---

## 11. Glosario de términos del dominio

| Término | Definición |
|---|---|
| **Bache** | Daño en la superficie de la vía pública (hueco, hundimiento, grieta, ausencia de pavimento). |
| **Reporte** | Registro creado por un ciudadano que documenta un bache: foto + ubicación + tipo + descripción. |
| **IPB** | Índice de Prioridad de Bache. Fórmula: `IPB = (S × 0.40) + (T × 0.30) + (R × 0.20) + (I × 0.10)` donde S=severidad, T=tráfico, R=recurrencia/clima, I=impacto social. Lo calcula el backend, la app lo consume. |
| **Estado de reporte** | Pendiente → En revisión → Asignado → En progreso → Reparado. |
| **Cercado** | Municipio de la ciudad de Cochabamba donde opera la app. |
| **OTB** | Organización Territorial de Base. Asociación vecinal boliviana. (Referencia, no usada en esta fase.) |
| **SEMAPA** | Servicio Municipal de Agua Potable y Alcantarillado. (Referencia, no usada en esta fase.) |
| **Ciudadano** | Único rol de usuario presente en la app de esta fase. |

---

## 12. Convenciones del proyecto

- **Idioma de documentación**: español.
- **Idioma de código** (variables, funciones, comentarios técnicos): inglés.
- **Idioma de UI** (textos visibles para el usuario): español.
- **Nomenclatura de archivos de doc**: `NN_NOMBRE_DESCRIPTIVO.md` con prefijo numérico jerárquico.

---

## 13. Documentos relacionados

Este documento es de **Nivel 0**. Los documentos derivados son:

- `01_TECH_STACK.md` — Stack tecnológico con versiones específicas.
- `02_DESIGN_SYSTEM.md` — Paleta, tipografía, componentes base.
- `03_CODING_STANDARDS.md` — Convenciones de código.
- `10_SETUP_ENVIRONMENT.md` — Instalación de herramientas.
- `11_PROJECT_INITIALIZATION.md` — Creación del proyecto Expo.
- `12_FOLDER_STRUCTURE.md` — Estructura de carpetas.
- `2X_SCREEN_*.md` — Especificaciones de cada pantalla.
- `3X_*.md` — Arquitectura técnica (API, modelos, estado, navegación, offline).
- `TASK_*.md` — Tareas atómicas ejecutables por IA.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Aprobado para inicio de desarrollo
