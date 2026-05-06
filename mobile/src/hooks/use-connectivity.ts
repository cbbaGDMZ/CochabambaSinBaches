/**
 * Hook de conectividad.
 * Monitorea el estado de la conexión a internet.
 * Usa @react-native-community/netinfo para detectar cambios.
 */

import { useEffect, useState } from 'react';
import * as NetInfo from '@react-native-community/netinfo';
import { useOfflineStore } from '@/stores/offline-store';

interface UseConnectivityResult {
  isOnline: boolean;
  isLoading: boolean;
}

export function useConnectivity(): UseConnectivityResult {
  const [isLoading, setIsLoading] = useState(true);
  const { isOnline, setIsOnline } = useOfflineStore();

  useEffect(() => {
    // Verificar conexión inicial
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      const connected = state.isConnected ?? false;
      setIsOnline(connected);
      setIsLoading(false);
    };

    checkConnection();

    // Suscribirse a cambios de conectividad
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      setIsOnline(connected);
    });

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [setIsOnline]);

  return {
    isOnline,
    isLoading,
  };
}