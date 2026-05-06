/**
 * Componente de input de texto reutilizable.
 * Integrado con react-hook-form y soporta validación con Zod.
 * Ver 02_DESIGN_SYSTEM.md sección 8.4.
 */

import { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import type { TextInputProps } from 'react-native';
import { COLORS } from '@/config/theme';

interface InputProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  helperText,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor =
    error ? COLORS.error : isFocused ? COLORS.accent : COLORS['border-strong'];

  return (
    <View className="w-full">
      {label && (
        <Text className="mb-2 font-poppins-medium text-[12px] text-text-secondary">
          {label}
        </Text>
      )}

      <View
        className="flex-row items-center rounded-xl border bg-surface-elevated px-4 py-3"
        style={{
          borderColor,
          borderWidth: 1,
          opacity: editable ? 1 : 0.5,
        }}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <TextInput
          className="flex-1 font-poppins text-[14px] text-text-primary"
          placeholderTextColor={COLORS['text-tertiary']}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>

      {error && (
        <Text className="mt-1 font-poppins-medium text-[12px] text-error">
          {error}
        </Text>
      )}

      {helperText && !error && (
        <Text className="mt-1 font-poppins text-[12px] text-text-tertiary">
          {helperText}
        </Text>
      )}
    </View>
  );
}