/**
 * Componente de estado vacío.
 * Ver 02_DESIGN_SYSTEM.md sección 8.11.
 */

import { View, Text } from 'react-native';
import { PrimaryButton } from '@/components/ui/primary-button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <View className="mb-6 flex-shrink-0">{icon}</View>

      <Text className="mb-2 text-center font-poppins-semibold text-[20px] text-text-primary">
        {title}
      </Text>

      <Text className="mb-8 text-center font-poppins text-[14px] text-text-secondary">
        {description}
      </Text>

      {actionLabel && onAction && (
        <View className="w-full max-w-xs">
          <PrimaryButton label={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}