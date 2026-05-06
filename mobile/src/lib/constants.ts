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
