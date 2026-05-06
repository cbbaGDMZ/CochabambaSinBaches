/**
 * Componente de estado de error con botón de reintentar.
 */

import { View, Text } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { SecondaryButton } from '@/components/ui/secondary-button';
import { COLORS } from '@/config/theme';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export function ErrorState({
  title = 'Algo salió mal',
  message,
  onRetry,
  showRetryButton = true,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <AlertTriangle size={48} color={COLORS.error} strokeWidth={1.5} />

      <Text className="mb-2 mt-6 text-center font-poppins-semibold text-[20px] text-text-primary">
        {title}
      </Text>

      <Text className="mb-8 text-center font-poppins text-[14px] text-text-secondary">
        {message}
      </Text>

      {showRetryButton && onRetry && (
        <View className="w-full max-w-xs">
          <SecondaryButton label="Reintentar" onPress={onRetry} />
        </View>
      )}
    </View>
  );
}