/**
 * Componente de badge reutilizable.
 * Soporta variantes con colores semánticos y mapeo automático de estados.
 * Ver 02_DESIGN_SYSTEM.md sección 8.6.
 */

import { View, Text } from 'react-native';
import { COLORS } from '@/config/theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  success: {
    bg: COLORS['success-subtle'],
    text: COLORS.success,
  },
  warning: {
    bg: COLORS['warning-subtle'],
    text: COLORS.warning,
  },
  error: {
    bg: COLORS['error-subtle'],
    text: COLORS.error,
  },
  info: {
    bg: COLORS['info-subtle'],
    text: COLORS.info,
  },
};

const sizeClasses = {
  sm: 'px-2 py-1',
  md: 'px-3 py-1.5',
  lg: 'px-4 py-2',
};

const textSizeClasses = {
  sm: 'text-[10px]',
  md: 'text-[12px]',
  lg: 'text-[14px]',
};

export function Badge({ label, variant = 'info', size = 'md' }: BadgeProps) {
  const colors = variantColors[variant];

  return (
    <View
      className={`rounded-lg ${sizeClasses[size]}`}
      style={{ backgroundColor: colors.bg }}
    >
      <Text
        className={`font-poppins-medium ${textSizeClasses[size]}`}
        style={{ color: colors.text }}
      >
        {label}
      </Text>
    </View>
  );
}