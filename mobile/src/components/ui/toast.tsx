/**
 * Sistema de toast/snackbar.
 * Ver 02_DESIGN_SYSTEM.md sección 8.12.
 * Implementado con Reanimated para animaciones fluidas.
 */

import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react-native';
import { COLORS } from '@/config/theme';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible?: boolean;
  onHide?: () => void;
  duration?: number;
}

const variantConfig: Record<ToastVariant, { bg: string; text: string; icon: React.ReactNode }> = {
  success: {
    bg: COLORS['success-subtle'],
    text: COLORS.success,
    icon: <CheckCircle2 size={20} color={COLORS.success} strokeWidth={1.5} />,
  },
  error: {
    bg: COLORS['error-subtle'],
    text: COLORS.error,
    icon: <AlertCircle size={20} color={COLORS.error} strokeWidth={1.5} />,
  },
  warning: {
    bg: COLORS['warning-subtle'],
    text: COLORS.warning,
    icon: <AlertTriangle size={20} color={COLORS.warning} strokeWidth={1.5} />,
  },
  info: {
    bg: COLORS['info-subtle'],
    text: COLORS.info,
    icon: <Info size={20} color={COLORS.info} strokeWidth={1.5} />,
  },
};

export function Toast({
  message,
  variant = 'info',
  visible = true,
  onHide,
  duration = 3000,
}: ToastProps) {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, { duration: 300 });

      const timer = setTimeout(() => {
        translateY.value = withTiming(100, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        onHide?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, translateY, opacity, duration, onHide]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) {
    return null;
  }

  const config = variantConfig[variant];

  return (
    <Animated.View
      style={[animatedStyle, { position: 'absolute', bottom: 32, left: 16, right: 16 }]}
    >
      <View
        className="flex-row items-center gap-3 rounded-lg px-4 py-3"
        style={{ backgroundColor: config.bg }}
      >
        {config.icon}
        <Text
          className="flex-1 font-poppins text-[14px]"
          style={{ color: config.text }}
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}