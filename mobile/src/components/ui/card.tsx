/**
 * Componente de card reutilizable.
 * Ver 02_DESIGN_SYSTEM.md sección 8.5.
 */

import { Pressable, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { SHADOWS } from '@/config/theme';

interface CardProps extends Omit<PressableProps, 'children'> {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated';
}

export function Card({ children, variant = 'default', ...props }: CardProps) {
  const Component = props.onPress ? Pressable : View;

  return (
    <Component
      className="rounded-2xl bg-surface p-6"
      style={variant === 'elevated' ? SHADOWS.card : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}