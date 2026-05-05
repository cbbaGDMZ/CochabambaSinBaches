/**
 * Componente de botón primario (CTA principal).
 */

import { View, Text, Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

interface PrimaryButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({
  label,
  isLoading,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled || isLoading}
      className="w-full rounded-xl bg-accent px-6 py-3 active:bg-accent-hover active:scale-98"
      {...props}
    >
      <Text className="text-center font-poppins-bold text-[16px] text-text-inverse">
        {isLoading ? 'Cargando...' : label}
      </Text>
    </Pressable>
  );
}