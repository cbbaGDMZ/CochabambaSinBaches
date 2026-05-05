/**
 * Componente de botón secundario.
 */

import { View, Text, Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

interface SecondaryButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function SecondaryButton({
  label,
  isLoading,
  disabled,
  ...props
}: SecondaryButtonProps) {
  return (
    <Pressable
      disabled={disabled || isLoading}
      className="w-full rounded-xl border border-border-strong px-6 py-3 active:bg-surface-hover"
      {...props}
    >
      <Text className="text-center font-poppins-semibold text-[16px] text-text-primary">
        {isLoading ? 'Cargando...' : label}
      </Text>
    </Pressable>
  );
}