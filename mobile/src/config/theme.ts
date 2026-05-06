/**
 * Tema y configuración de colores de la aplicación.
 * Basado en 02_DESIGN_SYSTEM.md
 * Centraliza todos los tokens de color para uso en componentes.
 */

import type { ReportStatus } from '@/types/report-types';

/**
 * Paleta completa de colores del sistema
 */
export const COLORS = {
  // Fondos y superficies
  background: '#0A0A0A',
  surface: '#141414',
  'surface-elevated': '#1E1E1E',
  'surface-hover': '#282828',
  border: '#2A2A2A',
  'border-strong': '#3A3A3A',

  // Texto
  'text-primary': '#F5F5F5',
  'text-secondary': '#A0A0A0',
  'text-tertiary': '#666666',
  'text-disabled': '#4A4A4A',
  'text-inverse': '#0A0A0A',

  // Acento (naranja)
  accent: '#FF6B2C',
  'accent-hover': '#E55A1F',
  'accent-subtle': '#FF6B2C1A',
  'accent-text': '#FF8A5C',

  // Semánticos - Estados
  success: '#34C759',
  'success-subtle': '#34C7591A',
  warning: '#FFD60A',
  'warning-subtle': '#FFD60A1A',
  error: '#FF3B30',
  'error-subtle': '#FF3B301A',
  info: '#5AC8FA',
  'info-subtle': '#5AC8FA1A',
};

/**
 * Mapeo de estados de reporte a colores
 * Basado en tabla de 02_DESIGN_SYSTEM.md sección 2.5
 */
export const REPORT_STATUS_COLORS: Record<ReportStatus, { bg: string; text: string }> = {
  pending: {
    bg: COLORS['info-subtle'],
    text: COLORS.info,
  },
  in_review: {
    bg: COLORS['warning-subtle'],
    text: COLORS.warning,
  },
  assigned: {
    bg: `${COLORS.accent}1A`, // accent con 10% opacity
    text: COLORS['accent-text'],
  },
  in_progress: {
    bg: COLORS['warning-subtle'],
    text: COLORS.warning,
  },
  repaired: {
    bg: COLORS['success-subtle'],
    text: COLORS.success,
  },
};

/**
 * Mapeo de prioridades IPB (del sistema de gestión de baches) a colores
 * Usado en marcadores del mapa
 */
export const IPB_PRIORITY_COLORS = {
  high: {
    bg: COLORS.error,
    text: '#FFFFFF',
  },
  medium: {
    bg: COLORS.warning,
    text: COLORS['text-inverse'],
  },
  low: {
    bg: COLORS.info,
    text: '#FFFFFF',
  },
};

/**
 * Sombras para componentes
 * Para dark mode, usamos sombras sutiles + diferencia de superficie
 */
export const SHADOWS = {
  /**
   * Sombra para modals y bottom sheets
   * style={{ ...SHADOWS.modal }}
   */
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },

  /**
   * Sombra para cards flotantes
   * style={{ ...SHADOWS.card }}
   */
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },

  /**
   * Sombra sutil para elementos con hover
   * style={{ ...SHADOWS.subtle }}
   */
  subtle: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
};

/**
 * Espacios de padding/margin standarizados
 * Basados en sistema de espaciado 4px
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '8xl': 64,
};

/**
 * Border radius standarizados
 */
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

/**
 * Escala tipográfica
 * Usar con <Text style={{ fontSize: TYPOGRAPHY.body.lg.size, lineHeight: TYPOGRAPHY.body.lg.lineHeight }} />
 */
export const TYPOGRAPHY = {
  heading: {
    xl: { size: 28, weight: '700' as const, lineHeight: 36 },
    lg: { size: 24, weight: '600' as const, lineHeight: 32 },
    md: { size: 20, weight: '600' as const, lineHeight: 28 },
    sm: { size: 18, weight: '600' as const, lineHeight: 24 },
  },
  body: {
    lg: { size: 16, weight: '400' as const, lineHeight: 24 },
    md: { size: 14, weight: '400' as const, lineHeight: 20 },
    sm: { size: 12, weight: '500' as const, lineHeight: 16 },
    xs: { size: 10, weight: '500' as const, lineHeight: 14 },
  },
};

/**
 * Tamaños de iconos estándar
 */
export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * Animaciones y transiciones
 */
export const ANIMATIONS = {
  duration: {
    short: 150,
    normal: 300,
    long: 500,
  },
  easing: {
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
};
