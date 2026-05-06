/**
 * Hook de geolocalización.
 * Solicita permisos y obtiene la ubicación actual del usuario.
 * Usa expo-location para obtener coordenadas.
 */

import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import type { Coordinates } from '@/types/common-types';

interface UseLocationResult {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useLocation(): UseLocationResult {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permiso de ubicación denegado');
        setIsLoading(false);
        return;
      }

      await getCurrentLocation();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al obtener ubicación';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return {
    coordinates,
    isLoading,
    error,
    refresh: getCurrentLocation,
  };
}