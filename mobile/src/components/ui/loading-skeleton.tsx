/**
 * Componente de loading skeleton con animación pulse.
 * Ver 02_DESIGN_SYSTEM.md sección 9.2.
 */

import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '@/config/theme';

interface LoadingSkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export function LoadingSkeleton({
  width = 100,
  height = 20,
  borderRadius = 8,
}: LoadingSkeletonProps) {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width,
          height,
          borderRadius,
          backgroundColor: COLORS['surface-elevated'],
        },
      ]}
    />
  );
}